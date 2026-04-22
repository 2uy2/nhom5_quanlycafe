const Order = require('../models/Order');

// Get all orders with optional filters
exports.getAllOrders = async (req, res) => {
  try {
    const { status, customerName } = req.query;
    const filters = {};

    if (status) filters.status = status;
    if (customerName) filters.customerName = customerName;

    const orders = await Order.getAll(filters);
    res.status(200).json({
      success: true,
      message: 'Orders retrieved successfully',
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message,
    });
  }
};

// Get single order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.getById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: `Order ${orderId} not found`,
      });
    }

    res.status(200).json({
      success: true,
      message: 'Order retrieved successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message,
    });
  }
};

// Create new order
exports.createOrder = async (req, res) => {
  try {
    const { customerName, customerPhone, items, notes } = req.body;

    // Validation
    if (!customerName || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and phone are required',
      });
    }

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'At least one item is required',
      });
    }

    // Validate items
    for (let item of items) {
      if (!item.productName || !item.quantity || !item.price) {
        return res.status(400).json({
          success: false,
          message: 'Each item must have productName, quantity, and price',
        });
      }
      if (item.quantity <= 0 || item.price <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Quantity and price must be greater than 0',
        });
      }
    }

    const order = await Order.create({
      customerName,
      customerPhone,
      items,
      notes,
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: order,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating order',
      error: error.message,
    });
  }
};

// Update order
exports.updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updateData = req.body;

    // Validate items if provided
    if (updateData.items) {
      if (!Array.isArray(updateData.items) || updateData.items.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Items must be a non-empty array',
        });
      }

      for (let item of updateData.items) {
        if (!item.productName || !item.quantity || !item.price) {
          return res.status(400).json({
            success: false,
            message: 'Each item must have productName, quantity, and price',
          });
        }
        if (item.quantity <= 0 || item.price <= 0) {
          return res.status(400).json({
            success: false,
            message: 'Quantity and price must be greater than 0',
          });
        }
      }
    }

    // Validate status if provided
    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (updateData.status && !validStatuses.includes(updateData.status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const order = await Order.update(orderId, updateData);

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: order,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Error updating order:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message,
    });
  }
};

// Delete order (cancel)
exports.deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const result = await Order.delete(orderId);

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: result,
    });
  } catch (error) {
    if (error.message.includes('not found')) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    console.error('Error deleting order:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message,
    });
  }
};

// Get orders by status
exports.getOrdersByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const orders = await Order.getByStatus(status);

    res.status(200).json({
      success: true,
      message: `Orders with status "${status}" retrieved successfully`,
      data: orders,
    });
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching orders by status',
      error: error.message,
    });
  }
};

// Get order statistics
exports.getStatistics = async (req, res) => {
  try {
    const stats = await Order.getStatistics();

    res.status(200).json({
      success: true,
      message: 'Statistics retrieved successfully',
      data: stats,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message,
    });
  }
};
