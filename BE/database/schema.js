const { pool } = require('../config/database');

// Initialize database schema
async function initializeDatabase() {
  const connection = await pool.getConnection();

  try {
    // Create orders table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id VARCHAR(20) PRIMARY KEY,
        customerName VARCHAR(255) NOT NULL,
        customerPhone VARCHAR(20) NOT NULL,
        totalPrice DECIMAL(10, 2) NOT NULL,
        status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
        notes TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    // Create order items table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        orderId VARCHAR(20) NOT NULL,
        productName VARCHAR(255) NOT NULL,
        quantity INT NOT NULL DEFAULT 1,
        price DECIMAL(10, 2) NOT NULL,
        subtotal DECIMAL(10, 2) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
        INDEX idx_orderId (orderId)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);

    console.log('✅ Database schema initialized successfully!');
  } catch (error) {
    if (error.code !== 'ER_TABLE_EXISTS_ERROR') {
      console.error('❌ Error initializing database:', error);
      throw error;
    }
  } finally {
    connection.release();
  }
}

module.exports = {
  initializeDatabase,
};
