const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Get all orders (with optional filters)
router.get('/', orderController.getAllOrders);

// Get order statistics
router.get('/stats/overview', orderController.getStatistics);

// Get orders by status
router.get('/status/:status', orderController.getOrdersByStatus);

// Get single order by ID
router.get('/:orderId', orderController.getOrderById);

// Create new order
router.post('/', orderController.createOrder);

// Update order
router.put('/:orderId', orderController.updateOrder);

// Delete order
router.delete('/:orderId', orderController.deleteOrder);

module.exports = router;
