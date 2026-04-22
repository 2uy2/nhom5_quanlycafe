import React, { useContext, useEffect, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import { getStatusLabel, getStatusColor } from '../utils/formatters';
import '../styles/OrderStatusTracker.css';

const OrderStatusTracker = () => {
  const { orders } = useContext(OrderContext);
  const [statusStats, setStatusStats] = useState({
    pending: 0,
    processing: 0,
    completed: 0,
    cancelled: 0,
  });

  // Update status statistics whenever orders change
  useEffect(() => {
    const stats = {
      pending: 0,
      processing: 0,
      completed: 0,
      cancelled: 0,
    };

    orders.forEach((order) => {
      if (stats.hasOwnProperty(order.status)) {
        stats[order.status]++;
      }
    });

    setStatusStats(stats);
  }, [orders]);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  const getProgressPercentage = (status) => {
    if (totalOrders === 0) return 0;
    return (statusStats[status] / totalOrders) * 100;
  };

  return (
    <div className="status-tracker-container">
      <div className="tracker-header">
        <h2>Theo Dõi Trạng Thái Đơn Hàng</h2>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="summary-card total">
          <div className="card-content">
            <h3>Tổng Đơn Hàng</h3>
            <p className="card-number">{totalOrders}</p>
          </div>
          <div className="card-icon">📊</div>
        </div>

        <div className="summary-card revenue">
          <div className="card-content">
            <h3>Tổng Doanh Thu</h3>
            <p className="card-number">{totalRevenue.toLocaleString()}đ</p>
          </div>
          <div className="card-icon">💰</div>
        </div>

        <div className="summary-card pending">
          <div className="card-content">
            <h3>Đang Chờ Xử Lý</h3>
            <p className="card-number">{statusStats.pending}</p>
          </div>
          <div className="card-icon">⏳</div>
        </div>

        <div className="summary-card processing">
          <div className="card-content">
            <h3>Đang Chế Biến</h3>
            <p className="card-number">{statusStats.processing}</p>
          </div>
          <div className="card-icon">👨‍🍳</div>
        </div>

        <div className="summary-card completed">
          <div className="card-content">
            <h3>Đã Hoàn Thành</h3>
            <p className="card-number">{statusStats.completed}</p>
          </div>
          <div className="card-icon">✅</div>
        </div>

        <div className="summary-card cancelled">
          <div className="card-content">
            <h3>Đã Hủy</h3>
            <p className="card-number">{statusStats.cancelled}</p>
          </div>
          <div className="card-icon">❌</div>
        </div>
      </div>

      {/* Status Distribution */}
      <div className="status-distribution">
        <h3>Phân Bố Trạng Thái</h3>

        <div className="status-bars">
          {['pending', 'processing', 'completed', 'cancelled'].map((status) => (
            <div key={status} className="status-bar-item">
              <div className="bar-label">
                <span>{getStatusLabel(status)}</span>
                <span className="bar-count">
                  {statusStats[status]} ({getProgressPercentage(status).toFixed(0)}%)
                </span>
              </div>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{
                    width: `${getProgressPercentage(status)}%`,
                    backgroundColor: getStatusColor(status),
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status Flow Visualization */}
      <div className="status-flow">
        <h3>Quy Trình Xử Lý Đơn Hàng</h3>

        <div className="flow-diagram">
          <div className="flow-step pending-step">
            <div className="step-badge pending">📋</div>
            <div className="step-label">Đang Chờ</div>
            <div className="step-count">{statusStats.pending}</div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step processing-step">
            <div className="step-badge processing">👨‍🍳</div>
            <div className="step-label">Chế Biến</div>
            <div className="step-count">{statusStats.processing}</div>
          </div>

          <div className="flow-arrow">→</div>

          <div className="flow-step completed-step">
            <div className="step-badge completed">✅</div>
            <div className="step-label">Hoàn Thành</div>
            <div className="step-count">{statusStats.completed}</div>
          </div>
        </div>

        <div className="flow-cancel">
          <div className="cancel-label">Hủy Bỏ</div>
          <div className="cancel-badge">❌ {statusStats.cancelled}</div>
        </div>
      </div>

      {/* Real-time Status List */}
      <div className="recent-orders">
        <h3>Đơn Hàng Gần Đây</h3>

        {orders.length === 0 ? (
          <p className="no-data">Không có đơn hàng nào</p>
        ) : (
          <div className="orders-list">
            {orders.slice(0, 5).map((order) => (
              <div key={order.id} className="recent-order-item">
                <div className="order-info">
                  <div className="order-id">{order.id}</div>
                  <div className="order-customer">{order.customerName}</div>
                </div>
                <div className="order-status">
                  <span
                    className="status-label"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusLabel(order.status)}
                  </span>
                </div>
                <div className="order-price">{order.totalPrice.toLocaleString()}đ</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderStatusTracker;
