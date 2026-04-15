// Utility functions for order management

// Format currency to VND
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Format date and time
export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
};

// Format date only
export const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date));
};

// Format time only
export const formatTime = (date) => {
  return new Intl.DateTimeFormat('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date));
};

// Calculate total price from items
export const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Get status badge color
export const getStatusColor = (status) => {
  const colorMap = {
    pending: '#ffc107',      // Yellow - Đang xử lý
    processing: '#2196f3',   // Blue - Đang chế biến
    completed: '#4caf50',    // Green - Đã hoàn thành
    cancelled: '#f44336',    // Red - Đã hủy
  };
  return colorMap[status] || '#9e9e9e';
};

// Get status label in Vietnamese
export const getStatusLabel = (status) => {
  const labels = {
    pending: 'Đang chờ xử lý',
    processing: 'Đang chế biến',
    completed: 'Đã hoàn thành',
    cancelled: 'Đã hủy',
  };
  return labels[status] || status;
};

// Validate order data
export const validateOrderData = (orderData) => {
  const errors = {};

  if (!orderData.customerName || orderData.customerName.trim() === '') {
    errors.customerName = 'Tên khách hàng không được để trống';
  }

  if (!orderData.items || orderData.items.length === 0) {
    errors.items = 'Đơn hàng phải có ít nhất một sản phẩm';
  }

  if (orderData.items) {
    orderData.items.forEach((item, index) => {
      if (!item.productName || item.productName.trim() === '') {
        errors[`item_${index}_name`] = 'Tên sản phẩm không được để trống';
      }
      if (item.quantity <= 0) {
        errors[`item_${index}_quantity`] = 'Số lượng phải lớn hơn 0';
      }
      if (item.price < 0) {
        errors[`item_${index}_price`] = 'Giá không được âm';
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Generate unique ID
export const generateId = () => {
  return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
};
