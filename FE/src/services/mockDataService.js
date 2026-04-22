// Mock data and localStorage service for testing without backend

// Initialize mock data
const mockOrders = [
  {
    id: 'ORD-2024-001',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0912345678',
    items: [
      { productName: 'Cà Phê Đen', quantity: 2, price: 25000 },
      { productName: 'Cappuccino', quantity: 1, price: 45000 },
    ],
    totalPrice: 95000,
    status: 'completed',
    notes: 'Không đường',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'ORD-2024-002',
    customerName: 'Trần Thị B',
    customerPhone: '0987654321',
    items: [
      { productName: 'Latte', quantity: 2, price: 50000 },
      { productName: 'Trà Sữa', quantity: 1, price: 40000 },
    ],
    totalPrice: 140000,
    status: 'processing',
    notes: '',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    updatedAt: new Date(Date.now() - 900000).toISOString(),
  },
  {
    id: 'ORD-2024-003',
    customerName: 'Lê Văn C',
    customerPhone: '0934567890',
    items: [
      { productName: 'Espresso', quantity: 1, price: 35000 },
      { productName: 'Americano', quantity: 2, price: 40000 },
    ],
    totalPrice: 115000,
    status: 'pending',
    notes: 'Giao trong 30 phút',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Initialize localStorage with mock data if empty
export const initializeMockData = () => {
  if (!localStorage.getItem('coffeeShopOrders')) {
    localStorage.setItem('coffeeShopOrders', JSON.stringify(mockOrders));
  }
};

// Get all orders from localStorage
export const getAllOrders = () => {
  initializeMockData();
  const orders = localStorage.getItem('coffeeShopOrders');
  return orders ? JSON.parse(orders) : [];
};

// Get order by ID
export const getOrderById = (orderId) => {
  const orders = getAllOrders();
  return orders.find((order) => order.id === orderId);
};

// Save order (create or update)
export const saveOrder = (order) => {
  const orders = getAllOrders();
  const existingIndex = orders.findIndex((o) => o.id === order.id);

  if (existingIndex > -1) {
    // Update existing
    orders[existingIndex] = {
      ...orders[existingIndex],
      ...order,
      updatedAt: new Date().toISOString(),
    };
  } else {
    // Create new
    const newOrder = {
      ...order,
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    orders.unshift(newOrder);
  }

  localStorage.setItem('coffeeShopOrders', JSON.stringify(orders));
  return existingIndex > -1 ? orders[existingIndex] : orders[0];
};

// Delete/Cancel order (soft delete)
export const deleteOrder = (orderId) => {
  const orders = getAllOrders();
  const updatedOrders = orders.map((order) =>
    order.id === orderId ? { ...order, status: 'cancelled' } : order
  );
  localStorage.setItem('coffeeShopOrders', JSON.stringify(updatedOrders));
};

// Clear all data
export const clearAllData = () => {
  localStorage.removeItem('coffeeShopOrders');
  initializeMockData();
};

// Initialize on import
initializeMockData();
