const pool  = require('../config/db');
const axios = require('axios');
require('dotenv').config();

// ─────────────────────────────────────────────
// GET /api/payments/orders/:orderId
// Lấy chi tiết đơn hàng cần thanh toán
// ─────────────────────────────────────────────
exports.getOrderDetail = async (req, res) => {
  const { orderId } = req.params;
  const conn = await pool.getConnection();
  try {
    // Lấy đơn hàng
    const [orders] = await conn.query(
      `SELECT o.*, ct.table_number, e.full_name AS employee_name,
              c.name AS customer_name, c.phone AS customer_phone,
              p.discount_percent
       FROM orders o
       LEFT JOIN cafe_tables  ct ON ct.id = o.table_id
       LEFT JOIN employees    e  ON e.id  = o.employee_id
       LEFT JOIN customers    c  ON c.id  = o.customer_id
       LEFT JOIN promotions   p  ON p.id  = o.promotion_id
       WHERE o.id = ? AND o.status = 'completed'`,
      [orderId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ message: 'Không tìm thấy đơn hoặc đơn chưa sẵn sàng thanh toán.' });
    }

    // Lấy các món trong đơn
    const [items] = await conn.query(
      `SELECT oi.*, pr.name AS product_name, pr.image_url
       FROM order_items oi
       JOIN products pr ON pr.id = oi.product_id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    res.json({ order: orders[0], items });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi lấy đơn hàng.' });
  } finally {
    conn.release();
  }
};

// ─────────────────────────────────────────────
// GET /api/payments/qr/:orderId
// Sinh mã QR VietQR cho đơn hàng
// ─────────────────────────────────────────────
exports.generateQR = async (req, res) => {
  const { orderId } = req.params;
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      'SELECT final_amount FROM orders WHERE id = ? AND status = ?',
      [orderId, 'completed']
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Đơn hàng không hợp lệ.' });

    const amount = rows[0].final_amount;

    // Gọi VietQR API
    const { data } = await axios.post(
      'https://api.vietqr.io/v2/generate',
      {
        accountNo:   process.env.ACCOUNT_NUMBER,
        accountName: process.env.ACCOUNT_NAME,
        acqId:       process.env.BANK_BIN,
        amount:      amount,
        addInfo:     `Thanh toan don #${orderId}`,
        format:      'text',
        template:    'compact',
      },
      {
        headers: {
          'x-client-id':  process.env.VIETQR_CLIENT_ID,
          'x-api-key':    process.env.VIETQR_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json({
      qrDataURL:     data.data?.qrDataURL,
      qrCode:        data.data?.qrCode,
      amount,
      accountNo:     process.env.ACCOUNT_NUMBER,
      accountName:   process.env.ACCOUNT_NAME,
      description:   `Thanh toan don #${orderId}`,
    });
  } catch (err) {
    console.error('VietQR error:', err?.response?.data || err.message);
    res.status(500).json({ message: 'Không tạo được mã QR.' });
  } finally {
    conn.release();
  }
};

// ─────────────────────────────────────────────
// POST /api/payments/process
// Xử lý thanh toán (cash | transfer)
// Body: { orderId, method, amountPaid }
// ─────────────────────────────────────────────
exports.processPayment = async (req, res) => {
  const { orderId, method, amountPaid } = req.body;

  // Validate input
  if (!orderId || !method || amountPaid == null) {
    return res.status(400).json({ message: 'Thiếu thông tin thanh toán.' });
  }
  if (!['cash', 'transfer', 'ewallet'].includes(method)) {
    return res.status(400).json({ message: 'Phương thức thanh toán không hợp lệ.' });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Kiểm tra đơn hàng
    const [orders] = await conn.query(
      `SELECT o.*, ct.id AS tableId
       FROM orders o
       LEFT JOIN cafe_tables ct ON ct.id = o.table_id
       WHERE o.id = ? AND o.status = 'completed'
       FOR UPDATE`,
      [orderId]
    );
    if (orders.length === 0) {
      await conn.rollback();
      return res.status(404).json({ message: 'Đơn hàng không tồn tại hoặc không ở trạng thái chờ thanh toán.' });
    }

    const order = orders[0];
    const finalAmount = Number(order.final_amount);
    const paid        = Number(amountPaid);

    // 2. Validate tiền đưa (chỉ áp dụng tiền mặt)
    if (method === 'cash' && paid < finalAmount) {
      await conn.rollback();
      return res.status(400).json({
        message: `Số tiền đưa (${paid.toLocaleString('vi-VN')}đ) không đủ. Cần tối thiểu ${finalAmount.toLocaleString('vi-VN')}đ.`,
      });
    }

    const changeGiven = method === 'cash' ? paid - finalAmount : 0;
    const now = new Date();

    // 3. Tạo bản ghi payments
    const [payResult] = await conn.query(
      `INSERT INTO payments (order_id, method, amount_paid, change_given, status, paid_at)
       VALUES (?, ?, ?, ?, 'paid', ?)`,
      [orderId, method, paid, changeGiven, now]
    );
    const paymentId = payResult.insertId;

    // 4. Lấy chi tiết đơn hàng để tạo snapshot hóa đơn
    const [items] = await conn.query(
      `SELECT oi.quantity, oi.unit_price, oi.subtotal, pr.name AS product_name
       FROM order_items oi
       JOIN products pr ON pr.id = oi.product_id
       WHERE oi.order_id = ?`,
      [orderId]
    );

    const billSnapshot = {
      cafe_name:     process.env.ACCOUNT_NAME || 'CAFE MANAGEMENT',
      order_id:      orderId,
      table_number:  order.table_number || 'Mang về',
      items,
      total_amount:  order.total_amount,
      discount_amount: order.discount_amount,
      final_amount:  finalAmount,
      method,
      amount_paid:   paid,
      change_given:  changeGiven,
      paid_at:       now.toISOString(),
    };

    // 5. Lưu hóa đơn (bill_logs)
    await conn.query(
      `INSERT INTO bill_logs (payment_id, bill_content) VALUES (?, ?)`,
      [paymentId, JSON.stringify(billSnapshot)]
    );

    // 6. Cập nhật trạng thái đơn hàng
    await conn.query(
      `UPDATE orders SET status = 'completed', updated_at = ? WHERE id = ?`,
      [now, orderId]
    );

    // 7. Giải phóng bàn
    if (order.tableId) {
      await conn.query(
        `UPDATE cafe_tables SET status = 'empty', updated_at = ? WHERE id = ?`,
        [now, order.tableId]
      );
    }

    await conn.commit();

    res.json({
      message:     'Thanh toán thành công.',
      paymentId,
      orderId,
      method,
      finalAmount,
      amountPaid:  paid,
      changeGiven,
      paidAt:      now,
    });
  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi xử lý thanh toán.' });
  } finally {
    conn.release();
  }
};

// ─────────────────────────────────────────────
// GET /api/payments/bill/:paymentId
// Lấy nội dung hóa đơn để in / xuất
// ─────────────────────────────────────────────
exports.getBill = async (req, res) => {
  const { paymentId } = req.params;
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT bl.*, py.method, py.amount_paid, py.change_given, py.paid_at
       FROM bill_logs bl
       JOIN payments py ON py.id = bl.payment_id
       WHERE bl.payment_id = ?`,
      [paymentId]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Không tìm thấy hóa đơn.' });

    const row = rows[0];
    res.json({
      paymentId:    row.payment_id,
      billContent:  row.bill_content, // JSON đã parse bởi mysql2
      issuedAt:     row.issued_at,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi lấy hóa đơn.' });
  } finally {
    conn.release();
  }
};

// ─────────────────────────────────────────────
// GET /api/payments/history?page=1&limit=20
// Lịch sử các giao dịch thanh toán
// ─────────────────────────────────────────────
exports.getPaymentHistory = async (req, res) => {
  const page  = Math.max(1, parseInt(req.query.page  || '1'));
  const limit = Math.min(100, parseInt(req.query.limit || '20'));
  const offset = (page - 1) * limit;
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT py.id, py.order_id, py.method, py.amount_paid,
              py.change_given, py.status, py.paid_at,
              o.final_amount, ct.table_number
       FROM payments py
       JOIN orders      o  ON o.id  = py.order_id
       LEFT JOIN cafe_tables ct ON ct.id = o.table_id
       ORDER BY py.paid_at DESC
       LIMIT ? OFFSET ?`,
      [limit, offset]
    );

    const [[{ total }]] = await conn.query('SELECT COUNT(*) AS total FROM payments');

    res.json({ data: rows, total, page, limit });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Lỗi server khi lấy lịch sử thanh toán.' });
  } finally {
    conn.release();
  }
};
