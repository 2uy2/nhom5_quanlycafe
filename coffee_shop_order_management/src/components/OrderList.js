import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { formatDateTime, formatCurrency, getStatusLabel, getStatusColor } from '../utils/formatters';
import '../styles/OrderList.css';

const OrderList = ({ onOrderSelect, onCreateNew }) => {
  const { orders, loading, error } = useContext(OrderContext);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter orders based on status
  const filteredOrders = filterStatus === 'all'
    ? orders
    : orders.filter((order) => order.status === filterStatus);

  // Sort orders
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === 'newest') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    } else if (sortBy === 'price') {
      return b.totalPrice - a.totalPrice;
    }
    return 0;
  });

  if (loading) {
    return <div className="order-list-container loading">Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div className="order-list-container error">Lỗi: {error}</div>;
  }

  return (
    <div className="order-list-container">
      <div className="order-list-header">
        <h2>Danh Sách Đơn Hàng</h2>
        <button className="btn-create" onClick={onCreateNew}>
          + Tạo Đơn Hàng Mới
        </button>
      </div>

      <div className="filters-controls">
        <div className="filter-group">
          <label>Lọc theo trạng thái:</label>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">Tất cả</option>
            <option value="pending">Đang chờ xử lý</option>
            <option value="processing">Đang chế biến</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sắp xếp theo:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Mới nhất</option>
            <option value="oldest">Cũ nhất</option>
            <option value="price">Giá cao nhất</option>
          </select>
        </div>
      </div>

      {sortedOrders.length === 0 ? (
        <div className="no-orders">
          <p>Không có đơn hàng nào</p>
        </div>
      ) : (
        <div className="orders-grid">
          {sortedOrders.map((order) => (
            <div
              key={order.id}
              className="order-card"
              onClick={() => onOrderSelect(order)}
            >
              <div className="order-card-header">
                <h3>{order.id}</h3>
                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {getStatusLabel(order.status)}
                </span>
              </div>

              <div className="order-card-content">
                <p>
                  <strong>Khách hàng:</strong> {order.customerName}
                </p>
                <p>
                  <strong>Số lượng sản phẩm:</strong> {order.items.length}
                </p>
                <p>
                  <strong>Tổng tiền:</strong>{' '}
                  <span className="total-price">{formatCurrency(order.totalPrice)}</span>
                </p>
                <p>
                  <strong>Ngày tạo:</strong> {formatDateTime(order.createdAt)}
                </p>
              </div>

              <div className="order-card-footer">
                <button
                  className="btn-view"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOrderSelect(order);
                  }}
                >
                  Xem Chi Tiết
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderList;
