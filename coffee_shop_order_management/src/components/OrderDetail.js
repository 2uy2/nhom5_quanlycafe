import React, { useContext, useState } from 'react';
import { OrderContext } from '../context/OrderContext';
import {
  formatDateTime,
  formatCurrency,
  getStatusLabel,
  getStatusColor,
} from '../utils/formatters';
import '../styles/OrderDetail.css';

const OrderDetail = ({ order, onEdit, onCancel, onClose }) => {
  const { removeOrder } = useContext(OrderContext);
  const [isConfirmingCancel, setIsConfirmingCancel] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const handleCancelOrder = async () => {
    if (!isConfirmingCancel) {
      setIsConfirmingCancel(true);
      return;
    }

    setIsCancelling(true);
    try {
      await removeOrder(order.id);
      if (onCancel) {
        onCancel();
      }
    } catch (error) {
      alert('Lỗi khi hủy đơn hàng: ' + error.message);
    } finally {
      setIsCancelling(false);
      setIsConfirmingCancel(false);
    }
  };

  return (
    <div className="order-detail-overlay">
      <div className="order-detail-modal">
        {/* Header */}
        <div className="detail-header">
          <div className="header-title">
            <h2>Chi Tiết Đơn Hàng</h2>
            <span className="order-code">{order.id}</span>
          </div>
          <button className="btn-close-modal" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="detail-body">
          {/* Status Card */}
          <div className="status-card">
            <div
              className="status-badge-large"
              style={{ backgroundColor: getStatusColor(order.status) }}
            >
              <span className="status-icon">
                {order.status === 'completed' && '✓'}
                {order.status === 'cancelled' && '✕'}
                {order.status === 'processing' && '⟳'}
                {order.status === 'pending' && '⏱'}
              </span>
              <div className="status-info">
                <div className="status-text">{getStatusLabel(order.status)}</div>
                <div className="status-time">{formatDateTime(order.createdAt)}</div>
              </div>
            </div>
          </div>

          {/* Customer Info Card */}
          <div className="info-card">
            <h3 className="card-title">👤 Thông Tin Khách Hàng</h3>
            <div className="card-content">
              <div className="info-row">
                <span className="info-label">Tên Khách:</span>
                <span className="info-value">{order.customerName}</span>
              </div>
              <div className="info-row">
                <span className="info-label">Số Điện Thoại:</span>
                <span className="info-value">{order.customerPhone || '—'}</span>
              </div>
            </div>
          </div>

          {/* Products Card */}
          <div className="info-card">
            <h3 className="card-title">🍵 Danh Sách Sản Phẩm</h3>
            <div className="products-table">
              <div className="products-header">
                <div className="col-name">Sản Phẩm</div>
                <div className="col-qty">SL</div>
                <div className="col-price">Đơn Giá</div>
                <div className="col-total">Thành Tiền</div>
              </div>

              {order.items.map((item, index) => (
                <div key={index} className="products-row">
                  <div className="col-name">{item.productName}</div>
                  <div className="col-qty">{item.quantity}</div>
                  <div className="col-price">{formatCurrency(item.price)}</div>
                  <div className="col-total">
                    {formatCurrency(item.quantity * item.price)}
                  </div>
                </div>
              ))}

              <div className="products-footer">
                <span>Tổng:</span>
                <span className="total-amount">{formatCurrency(order.totalPrice)}</span>
              </div>
            </div>
          </div>

          {/* Notes Card */}
          {order.notes && (
            <div className="info-card">
              <h3 className="card-title">📝 Ghi Chú</h3>
              <div className="notes-content">{order.notes}</div>
            </div>
          )}

          {/* Timeline Card */}
          <div className="info-card">
            <h3 className="card-title">📅 Lịch Sử</h3>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-time">{formatDateTime(order.createdAt)}</div>
                  <div className="timeline-desc">Đơn hàng được tạo</div>
                </div>
              </div>
              {order.updatedAt && order.updatedAt !== order.createdAt && (
                <div className="timeline-item">
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <div className="timeline-time">{formatDateTime(order.updatedAt)}</div>
                    <div className="timeline-desc">Cập nhật lần cuối</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="detail-footer">
          {order.status !== 'completed' && order.status !== 'cancelled' && (
            <>
              <button className="btn-edit-modal" onClick={onEdit}>
                ✏️ Chỉnh Sửa
              </button>
              <button
                className={`btn-cancel-modal ${isConfirmingCancel ? 'confirming' : ''}`}
                onClick={handleCancelOrder}
                disabled={isCancelling}
              >
                {isCancelling
                  ? '⏳ Đang hủy...'
                  : isConfirmingCancel
                  ? '⚠️ Xác nhận hủy?'
                  : '❌ Hủy Bỏ'}
              </button>
            </>
          )}
          <button className="btn-close-final" onClick={onClose}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
