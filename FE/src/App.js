import React, { useState } from 'react';
import { OrderProvider } from './context/OrderContext';
import OrderList from './components/OrderList';
import OrderForm from './components/OrderForm';
import OrderDetail from './components/OrderDetail';
import OrderStatusTracker from './components/OrderStatusTracker';
import './App.css';

const App = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'create', 'detail', 'tracker'
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleViewList = () => {
    setCurrentView('list');
    setSelectedOrder(null);
  };

  const handleCreateOrder = () => {
    setCurrentView('create');
    setSelectedOrder(null);
  };

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setCurrentView('detail');
  };

  const handleEditOrder = () => {
    setCurrentView('create');
  };

  const handleFormSubmit = () => {
    setCurrentView('list');
  };

  const handleFormCancel = () => {
    setCurrentView('list');
  };

  const handleCloseDetail = () => {
    setCurrentView('list');
    setSelectedOrder(null);
  };

  const handleCancelOrder = () => {
    setCurrentView('list');
    setSelectedOrder(null);
  };

  return (
    <OrderProvider>
      <div className="app-container">
        <header className="app-header">
          <div className="header-content">
            <div className="logo-section">
              <h1 className="app-title">☕ Quản Lý Đơn Hàng</h1>
              <p className="app-subtitle">Hệ thống quản lý và tối ưu vận hành quán cafe thông minh</p>
            </div>
            <nav className="app-nav">
              <button
                className={`nav-btn ${currentView === 'list' ? 'active' : ''}`}
                onClick={handleViewList}
              >
                📋 Danh Sách Đơn
              </button>
              <button
                className={`nav-btn ${currentView === 'tracker' ? 'active' : ''}`}
                onClick={() => setCurrentView('tracker')}
              >
                📊 Theo Dõi Trạng Thái
              </button>
              <button
                className="nav-btn create"
                onClick={handleCreateOrder}
              >
                ➕ Tạo Đơn Hàng
              </button>
            </nav>
          </div>
        </header>

        <main className="app-main">
          {currentView === 'list' && (
            <OrderList
              onOrderSelect={handleSelectOrder}
              onCreateNew={handleCreateOrder}
            />
          )}

          {currentView === 'create' && (
            <OrderForm
              existingOrder={selectedOrder}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
            />
          )}

          {currentView === 'detail' && selectedOrder && (
            <OrderDetail
              order={selectedOrder}
              onEdit={handleEditOrder}
              onCancel={handleCancelOrder}
              onClose={handleCloseDetail}
            />
          )}

          {currentView === 'tracker' && <OrderStatusTracker />}
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 Coffee Shop Order Management System. All rights reserved.</p>
        </footer>
      </div>
    </OrderProvider>
  );
};

export default App;
