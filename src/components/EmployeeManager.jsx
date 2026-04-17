//employees
import React from "react";

export default function EmployeeManager({ employees, styles }) {
  return (
    <div className="page-container">
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>QUẢN LÝ NHÂN VIÊN</h1>
        <div style={styles.headerActions}>
          <div style={styles.searchInput}>
            <input
              type="text"
              placeholder="Tìm theo tên..."
              style={styles.inputReset}
            />
          </div>
          <button style={styles.addButton}>+ THÊM NHÂN SỰ</button>
        </div>
      </div>

      <div style={styles.tableCard}>
        {/* Tiêu đề bảng */}
        <div style={styles.tableHeader}>
          <div>HỌ VÀ TÊN</div>
          <div>CHỨC DANH</div>
          <div style={{ textAlign: "center" }}>TRẠNG THÁI</div>
          <div style={{ textAlign: "right" }}>XỬ LÝ</div>
        </div>

        {/* Danh sách nhân viên */}
        {employees.map((emp) => (
          <div key={emp.id} style={styles.tableRow}>
            {/* Cột 1: Thông tin & Avatar */}
            <div style={styles.employeeInfo}>
              <img src={emp.avatar} alt="avatar" style={styles.avatar} />
              <div>
                <div style={{ fontWeight: "bold", color: "#3C2A1A" }}>
                  {emp.name}
                </div>
                <div style={{ fontSize: "12px", color: "#8D6E63" }}>
                  {emp.id}
                </div>
              </div>
            </div>

            {/* Cột 2: Chức danh */}
            <div>
              <span style={styles.roleTag}>{emp.role}</span>
            </div>

            {/* Cột 3: Trạng thái */}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <span
                style={
                  emp.status === "ĐANG LÀM VIỆC"
                    ? styles.statusActive
                    : styles.statusLeave
                }
              >
                {emp.status}
              </span>
            </div>

            {/* Cột 4: Nút xóa/sửa */}
            <div style={{ textAlign: "right" }}>
              <button style={{ ...styles.iconButton, color: "#8D6E63" }}>
                <i className="fas fa-trash"></i> 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
