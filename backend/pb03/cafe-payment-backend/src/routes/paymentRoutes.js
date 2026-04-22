const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/paymentController');

// Lấy chi tiết đơn hàng (để hiển thị trước khi thanh toán)
router.get('/orders/:orderId', ctrl.getOrderDetail);

// Sinh mã QR VietQR
router.get('/qr/:orderId', ctrl.generateQR);

// Xử lý thanh toán
router.post('/process', ctrl.processPayment);

// Lấy hóa đơn để in
router.get('/bill/:paymentId', ctrl.getBill);

// Lịch sử thanh toán
router.get('/history', ctrl.getPaymentHistory);

module.exports = router;
