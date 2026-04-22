require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { testConnection } = require('./config/database');
const { initializeDatabase } = require('./database/schema');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Coffee Shop Order Management API',
    version: '1.0.0',
    endpoints: {
      orders: [
        { method: 'GET', path: '/api/orders', description: 'Get all orders' },
        { method: 'GET', path: '/api/orders/:orderId', description: 'Get single order' },
        { method: 'POST', path: '/api/orders', description: 'Create new order' },
        { method: 'PUT', path: '/api/orders/:orderId', description: 'Update order' },
        { method: 'DELETE', path: '/api/orders/:orderId', description: 'Delete order' },
        { method: 'GET', path: '/api/orders/status/:status', description: 'Get orders by status' },
        { method: 'GET', path: '/api/orders/stats/overview', description: 'Get statistics' },
      ],
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
    path: req.path,
  });
});

// Error handling middleware
app.use(errorHandler);

// Initialize and start server
async function startServer() {
  try {
    // Test database connection
    await testConnection();

    // Initialize database schema
    await initializeDatabase();

    // Start listening
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════════════════════╗
║  Coffee Shop Order Management API                      ║
║  Server running at: http://localhost:${PORT}              ║
║  API Documentation: http://localhost:${PORT}/api          ║
║  Health Check: http://localhost:${PORT}/health           ║
╚════════════════════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

startServer();
