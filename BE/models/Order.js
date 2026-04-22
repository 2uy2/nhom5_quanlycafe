const { pool } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class Order {
  // Generate order ID in format ORD-YYYY-XXXXX
  static generateOrderId() {
    const year = new Date().getFullYear();
    const randomPart = String(Math.floor(Math.random() * 100000)).padStart(5, '0');
    return `ORD-${year}-${randomPart}`;
  }

  // Get all orders
  static async getAll(filters = {}) {
    let query = 'SELECT * FROM orders WHERE 1=1';
    const params = [];

    if (filters.status) {
      query += ' AND status = ?';
      params.push(filters.status);
    }

    if (filters.customerName) {
      query += ' AND customerName LIKE ?';
      params.push(`%${filters.customerName}%`);
    }

    query += ' ORDER BY createdAt DESC';

    const [rows] = await pool.query(query, params);

    // Get items for each order
    for (let order of rows) {
      const [items] = await pool.query(
        'SELECT id, productName, quantity, price, subtotal FROM order_items WHERE orderId = ?',
        [order.id]
      );
      order.items = items;
    }

    return rows;
  }

  // Get single order by ID
  static async getById(orderId) {
    const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [orderId]);

    if (orders.length === 0) {
      return null;
    }

    const order = orders[0];

    // Get order items
    const [items] = await pool.query(
      'SELECT id, productName, quantity, price, subtotal FROM order_items WHERE orderId = ?',
      [orderId]
    );

    order.items = items;
    return order;
  }

  // Create new order
  static async create(orderData) {
    const orderId = this.generateOrderId();
    const { customerName, customerPhone, items, notes } = orderData;

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Calculate total price
      let totalPrice = 0;
      items.forEach((item) => {
        totalPrice += item.price * item.quantity;
      });

      // Insert order
      await connection.query(
        'INSERT INTO orders (id, customerName, customerPhone, totalPrice, status, notes) VALUES (?, ?, ?, ?, ?, ?)',
        [orderId, customerName, customerPhone, totalPrice, 'pending', notes || null]
      );

      // Insert order items
      for (let item of items) {
        const subtotal = item.price * item.quantity;
        await connection.query(
          'INSERT INTO order_items (orderId, productName, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)',
          [orderId, item.productName, item.quantity, item.price, subtotal]
        );
      }

      await connection.commit();

      return await this.getById(orderId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Update order
  static async update(orderId, updateData) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      const order = await this.getById(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      const { customerName, customerPhone, items, status, notes } = updateData;

      // Update order
      let query = 'UPDATE orders SET';
      const updates = [];
      const params = [];

      if (customerName !== undefined) {
        updates.push(' customerName = ?');
        params.push(customerName);
      }
      if (customerPhone !== undefined) {
        updates.push(' customerPhone = ?');
        params.push(customerPhone);
      }
      if (status !== undefined) {
        updates.push(' status = ?');
        params.push(status);
      }
      if (notes !== undefined) {
        updates.push(' notes = ?');
        params.push(notes);
      }

      // If items are being updated, recalculate total
      if (items && items.length > 0) {
        let totalPrice = 0;
        items.forEach((item) => {
          totalPrice += item.price * item.quantity;
        });
        updates.push(' totalPrice = ?');
        params.push(totalPrice);
      }

      if (updates.length > 0) {
        query += updates.join(',') + ' WHERE id = ?';
        params.push(orderId);
        await connection.query(query, params);
      }

      // Update items if provided
      if (items) {
        // Delete old items
        await connection.query('DELETE FROM order_items WHERE orderId = ?', [orderId]);

        // Insert new items
        for (let item of items) {
          const subtotal = item.price * item.quantity;
          await connection.query(
            'INSERT INTO order_items (orderId, productName, quantity, price, subtotal) VALUES (?, ?, ?, ?, ?)',
            [orderId, item.productName, item.quantity, item.price, subtotal]
          );
        }
      }

      await connection.commit();

      return await this.getById(orderId);
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Delete order (cancel)
  static async delete(orderId) {
    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // Check if order exists
      const order = await this.getById(orderId);
      if (!order) {
        throw new Error(`Order ${orderId} not found`);
      }

      // Delete order items
      await connection.query('DELETE FROM order_items WHERE orderId = ?', [orderId]);

      // Delete order
      await connection.query('DELETE FROM orders WHERE id = ?', [orderId]);

      await connection.commit();

      return { success: true, message: 'Order deleted successfully' };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }

  // Get orders by status
  static async getByStatus(status) {
    const [rows] = await pool.query('SELECT * FROM orders WHERE status = ? ORDER BY createdAt DESC', [
      status,
    ]);

    // Get items for each order
    for (let order of rows) {
      const [items] = await pool.query(
        'SELECT id, productName, quantity, price, subtotal FROM order_items WHERE orderId = ?',
        [order.id]
      );
      order.items = items;
    }

    return rows;
  }

  // Get order statistics
  static async getStatistics() {
    const [stats] = await pool.query(`
      SELECT
        COUNT(*) as totalOrders,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pendingOrders,
        SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processingOrders,
        SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) as completedOrders,
        SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelledOrders,
        SUM(totalPrice) as totalRevenue,
        AVG(totalPrice) as averageOrderValue
      FROM orders
    `);

    return stats[0];
  }
}

module.exports = Order;
