//RolePermission
import { useState } from "react";
import { motion } from "framer-motion";

export default function RolePermission({ styles }) {
  // Danh sách các vai trò trong quán
  const roles = ["Quản trị viên", "Quản lý cửa hàng", "Pha chế", "Phục vụ"];

  // Danh sách các hành động có thể thực hiện
  const permissions = [
    { key: "view_emp", label: "Xem nhân viên" },
    { key: "edit_emp", label: "Sửa nhân viên" },
    { key: "delete_emp", label: "Xóa nhân viên" },
    { key: "view_acc", label: "Xem tài khoản" },
    { key: "manage_role", label: "Quản lý phân quyền" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0 }}
    >
      <div style={styles.header}>
        <h1 style={styles.pageTitle}>PHÂN QUYỀN HỆ THỐNG</h1>
        <button style={styles.addButton}>LƯU CẤU HÌNH</button>
      </div>

      <div style={styles.tableCard}>
        <table style={localStyles.table}>
          <thead>
            <tr style={styles.tableHeader}>
              <th style={localStyles.th}>QUYỀN HẠN / VAI TRÒ</th>
              {roles.map((role, i) => (
                <th key={i} style={{ ...localStyles.th, textAlign: "center" }}>
                  {role}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={index} style={styles.tableRow}>
                <td style={{ fontWeight: "600", color: "#3C2A1A" }}>
                  {perm.label}
                </td>
                {roles.map((role, i) => (
                  <td key={i} style={{ textAlign: "center" }}>
                    <input
                      type="checkbox"
                      defaultChecked={
                        role === "Quản trị viên" ||
                        (role === "Quản lý cửa hàng" && index < 3)
                      }
                      style={localStyles.checkbox}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

const localStyles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "20px 30px",
    fontSize: "13px",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
    accentColor: "#3C2A1A", // Màu nâu đồng bộ với quán cafe
  },
  notice: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#E7D8C9",
    borderRadius: "12px",
    fontSize: "13px",
    color: "#5D4037",
    display: "flex",
    alignItems: "center",
  },
};
