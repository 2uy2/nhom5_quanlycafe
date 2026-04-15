import React, { createContext, useState, useCallback, useEffect } from 'react';
import { getOrders, createOrder, updateOrder, cancelOrder } from '../services/orderService';

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create new order
  const addOrder = useCallback(async (orderData) => {
    setLoading(true);
    setError(null);
    try {
      const newOrder = await createOrder(orderData);
      setOrders((prev) => [newOrder, ...prev]);
      return newOrder;
    } catch (err) {
      setError(err.message);
      console.error('Error creating order:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update existing order
  const editOrder = useCallback(async (orderId, updatedData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedOrder = await updateOrder(orderId, updatedData);
      setOrders((prev) =>
        prev.map((order) => (order.id === orderId ? updatedOrder : order))
      );
      return updatedOrder;
    } catch (err) {
      setError(err.message);
      console.error('Error updating order:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Cancel/Delete order
  const removeOrder = useCallback(async (orderId) => {
    setLoading(true);
    setError(null);
    try {
      await cancelOrder(orderId);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
    } catch (err) {
      setError(err.message);
      console.error('Error cancelling order:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Get single order
  const getOrderById = useCallback((orderId) => {
    return orders.find((order) => order.id === orderId);
  }, [orders]);

  // Get orders by status
  const getOrdersByStatus = useCallback((status) => {
    return orders.filter((order) => order.status === status);
  }, [orders]);

  // Initialize orders on mount
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const value = {
    orders,
    loading,
    error,
    fetchOrders,
    addOrder,
    editOrder,
    removeOrder,
    getOrderById,
    getOrdersByStatus,
  };

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};
