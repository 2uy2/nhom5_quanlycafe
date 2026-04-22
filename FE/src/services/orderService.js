// Service for handling API calls related to orders
// This version uses localStorage/mock data for development
// Replace with actual API calls when backend is ready

import {
  getAllOrders,
  getOrderById as getOrderByIdMock,
  saveOrder,
  deleteOrder,
} from './mockDataService';

// Simulate API delay
const simulateDelay = (ms = 300) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Fetch all orders
export const getOrders = async () => {
  try {
    await simulateDelay();
    return getAllOrders();
  } catch (error) {
    console.error('Error in getOrders:', error);
    throw error;
  }
};

// Fetch single order by ID
export const getOrderById = async (orderId) => {
  try {
    await simulateDelay(200);
    const order = getOrderByIdMock(orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    return order;
  } catch (error) {
    console.error('Error in getOrderById:', error);
    throw error;
  }
};

// Create new order
export const createOrder = async (orderData) => {
  try {
    await simulateDelay();
    const newOrder = saveOrder({
      ...orderData,
      status: 'pending',
    });
    return newOrder;
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw error;
  }
};

// Update existing order
export const updateOrder = async (orderId, updatedData) => {
  try {
    await simulateDelay();
    const order = getOrderByIdMock(orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    const updatedOrder = saveOrder({
      ...order,
      ...updatedData,
    });
    return updatedOrder;
  } catch (error) {
    console.error('Error in updateOrder:', error);
    throw error;
  }
};

// Cancel order (soft delete - mark as cancelled instead of deleting)
export const cancelOrder = async (orderId) => {
  try {
    await simulateDelay();
    const order = getOrderByIdMock(orderId);
    if (!order) {
      throw new Error(`Order ${orderId} not found`);
    }
    deleteOrder(orderId);
    return { ...order, status: 'cancelled' };
  } catch (error) {
    console.error('Error in cancelOrder:', error);
    throw error;
  }
};

// Get orders by status
export const getOrdersByStatus = async (status) => {
  try {
    await simulateDelay(200);
    const orders = getAllOrders();
    return orders.filter((order) => order.status === status);
  } catch (error) {
    console.error('Error in getOrdersByStatus:', error);
    throw error;
  }
};

// INSTRUCTIONS FOR SWITCHING TO REAL API:
// 1. Keep the simulated API calls above as they are, or replace with fetch calls to your backend
// 2. Example replacement for getOrders:
/*
export const getOrders = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/orders');
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getOrders:', error);
    throw error;
  }
};
*/
// 3. Update the API_URL to match your backend configuration
// 4. Ensure your backend returns data in the expected format
