import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Import các file con
import Dashboard from "./components/Dashboard";
import EmployeeManager from "./components/EmployeeManager";
import AccountManager from "./components/AccountManager";
import RolePermission from "./components/RolePermission";

export default function App() {
  // 1. Quản lý trạng thái chuyển Tab
  const [activeTab, setActiveTab] = useState("dashboard");

  // 2. Dữ liệu dùng chung (Global State)
  const [employees, setEmployees] = useState([
    {
      id: "#001",
      name: "Nguyễn Văn An",
      role: "Quản lý",
      status: "ĐANG LÀM VIỆC",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=An",
    },
    {
      id: "#002",
      name: "Trần Thị Bình",
      role: "Pha chế",
      status: "ĐANG LÀM VIỆC",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Binh",
    },
    {
      id: "#003",
      name: "Lê Minh Cường",
      role: "Phục vụ",
      status: "NGHỈ PHÉP",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Cuong",
    },
  ]);

  // Hiệu ứng chuyển trang mượt mà
  const pageVariants = {
    initial: { opacity: 0, x: 10 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -10 },
  };

  return (
    <div style={styles.appContainer}>
      {/* SIDEBAR */}
      <aside style={styles.sidebar}>
        <div style={styles.logoSection}>
          <span style={{ marginRight: "10px" }}>☕</span> TÍN COFFEE
        </div>

        <nav style={{ flex: 1 }}>
          <div
            onClick={() => setActiveTab("dashboard")}
            style={{
              ...styles.navItem,
              ...(activeTab === "dashboard" ? styles.navActive : {}),
            }}
          >
            📊 Tổng quan
          </div>
          <div
            onClick={() => setActiveTab("employees")}
            style={{
              ...styles.navItem,
              ...(activeTab === "employees" ? styles.navActive : {}),
            }}
          >
            👥 Quản lý nhân viên
          </div>
          <div
            onClick={() => setActiveTab("accounts")}
            style={{
              ...styles.navItem,
              ...(activeTab === "accounts" ? styles.navActive : {}),
            }}
          >
            👤 Quản lý tài khoản
          </div>
          <div
            onClick={() => setActiveTab("roles")}
            style={{
              ...styles.navItem,
              ...(activeTab === "roles" ? styles.navActive : {}),
            }}
          >
            🛡️ Phân quyền
          </div>
        </nav>

        {/* Thông tin Admin */}
        <div style={styles.adminProfile}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div style={styles.miniAvatar}>T</div>
            <div>
              <div
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  color: "#3C2A1A",
                }}
              >
                Thanh Tín
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#8D6E63",
                  fontWeight: "bold",
                }}
              >
                QUẢN TRỊ VIÊN
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT - Phần này đã được bó lại để mất thanh cuộn ngang */}
      <main style={styles.mainContent}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={{ duration: 0.2 }}
            style={{ width: "100%" }}
          >
            {activeTab === "dashboard" && (
              <Dashboard employees={employees} styles={styles} />
            )}

            {activeTab === "employees" && (
              <EmployeeManager
                employees={employees}
                setEmployees={setEmployees}
                styles={styles}
              />
            )}

            {activeTab === "accounts" && <AccountManager styles={styles} />}
            {activeTab === "roles" && <RolePermission styles={styles} />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// HỆ THỐNG STYLES ĐÃ CÂN ĐỐI LẠI
const styles = {
  appContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#F8F1EA",
    overflow: "hidden", // Chặn thanh cuộn toàn trang
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  sidebar: {
    width: "260px", // Giảm nhẹ chiều rộng sidebar
    backgroundColor: "#E7D8C9",
    padding: "25px 15px",
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #DCC9B8",
    boxShadow: "4px 0 15px rgba(0,0,0,0.03)",
    zIndex: 10,
  },
  logoSection: {
    fontSize: "20px",
    fontWeight: "800",
    marginBottom: "35px",
    color: "#3C2A1A",
    textAlign: "center",
    letterSpacing: "1px",
  },
  navItem: {
    display: "flex",
    alignItems: "center",
    padding: "12px 18px",
    borderRadius: "12px",
    marginBottom: "8px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#5D4037",
    fontSize: "14px",
    transition: "all 0.2s ease",
  },
  navActive: {
    backgroundColor: "#3C2A1A",
    color: "#FFFFFF",
    boxShadow: "0 4px 12px rgba(60, 42, 26, 0.15)",
  },
  mainContent: {
    flex: 1,
    padding: "25px 35px", // Giảm padding để tránh tràn card
    overflowY: "auto", // Chỉ cuộn dọc khi nội dung quá dài
    overflowX: "hidden", // Chặn tuyệt đối cuộn ngang
    display: "flex",
    flexDirection: "column",
  },
  adminProfile: {
    padding: "12px",
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    borderRadius: "15px",
    marginTop: "auto",
    border: "1px solid rgba(255, 255, 255, 0.6)",
  },
  miniAvatar: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    backgroundColor: "#3C2A1A",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  // STYLES CHUNG CHO CÁC TRANG
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "800",
    color: "#3C2A1A",
    margin: 0,
  },
  headerActions: {
    display: "flex",
    gap: "12px",
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: "8px 16px",
    borderRadius: "12px",
    border: "1px solid #DCC9B8",
    display: "flex",
    alignItems: "center",
  },
  inputReset: {
    border: "none",
    outline: "none",
    fontSize: "13px",
    backgroundColor: "transparent",
    width: "150px",
  },
  addButton: {
    backgroundColor: "#3C2A1A",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "13px",
  },

  // STYLES CHO TABLE
  tableCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 4px 20px rgba(0,0,0,0.02)",
    border: "1px solid #eee",
    width: "100%",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr 0.5fr",
    padding: "15px 25px",
    backgroundColor: "#F3EFEA",
    color: "#8D6E63",
    fontWeight: "bold",
    fontSize: "12px",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr 1fr 0.5fr",
    padding: "15px 25px",
    alignItems: "center",
    borderBottom: "1px solid #F5F5F5",
  },
  employeeInfo: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "12px",
    objectFit: "cover",
    backgroundColor: "#F3EFEA",
  },
  roleTag: {
    backgroundColor: "#F3EFEA",
    color: "#5D4037",
    padding: "5px 12px",
    borderRadius: "8px",
    fontSize: "11px",
    fontWeight: "600",
    width: "fit-content",
  },
  statusActive: {
    color: "#1B5E20",
    backgroundColor: "#C8E6C9",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "bold",
  },
  statusLeave: {
    color: "#E65100",
    backgroundColor: "#FFE0B2",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "10px",
    fontWeight: "bold",
  },
  iconButton: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
    color: "#8D6E63",
  },
};
