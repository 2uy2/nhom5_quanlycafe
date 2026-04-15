import React from "react";

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Điều hướng quản trị">
      <div className="brand">
        <div className="brand-mark">SC</div>
        <div>
          <strong>Smart Cafe</strong>
          <span>Giao diện admin</span>
        </div>
      </div>

      <nav className="nav-list">
        <a className="nav-item active" href="#menu-management">
          Quản lý menu
        </a>
        <a className="nav-item" href="#inventory">
          Tồn kho
        </a>
        <a className="nav-item" href="#orders">
          Đơn hàng
        </a>
        <a className="nav-item" href="#reports">
          Báo cáo
        </a>
      </nav>

      <div className="operator-panel">
        <span>Admin</span>
        <strong>Lê Ngô Quang Hiếu</strong>
        <small>Quyền quản lý menu đang hoạt động</small>
      </div>
    </aside>
  );
}

export default Sidebar;
