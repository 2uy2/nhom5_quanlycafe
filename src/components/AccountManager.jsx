//AccountManager
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AccountManager({ styles }) {
  // 1. Data State
  const [accounts, setAccounts] = useState([
    {
      id: 1,
      user: "an.nguyen",
      fullName: "Nguyễn Văn An",
      email: "an.nguyen@coffee.vn",
      phone: "0901 234 567",
      address: "123 Lê Lợi, TP.HCM",
      role: "Quản trị viên",
    },
    {
      id: 2,
      user: "binh.tran",
      fullName: "Trần Thị Bình",
      email: "binh.tran@coffee.vn",
      phone: "0988 777 666",
      address: "456 Nguyễn Huệ, TP.HCM",
      role: "Nhân viên",
    },
  ]);

  // 2. State lưu thay đổi tạm thời
  const [pendingRoles, setPendingRoles] = useState({});

  const roles = ["Quản trị viên", "Quản lý", "Nhân viên", "Pha chế", "Phục vụ"];

  const handleSelectRole = (id, newRole) => {
    setPendingRoles({ ...pendingRoles, [id]: newRole });
  };

  const confirmSaveRole = (id) => {
    const newRole = pendingRoles[id];
    setAccounts(
      accounts.map((acc) => (acc.id === id ? { ...acc, role: newRole } : acc)),
    );

    // Xóa trạng thái chờ
    const newPending = { ...pendingRoles };
    delete newPending[id];
    setPendingRoles(newPending);

    alert("Cập nhật chức vụ thành công!");
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div style={styles.header || { marginBottom: "30px" }}>
        <h1 style={styles.pageTitle || { fontSize: "26px" }}>
          QUẢN LÝ TÀI KHOẢN
        </h1>
      </div>

      <div style={localStyles.accountGrid}>
        {accounts.map((acc) => {
          const isChanging =
            pendingRoles[acc.id] !== undefined &&
            pendingRoles[acc.id] !== acc.role;

          return (
            <motion.div key={acc.id} style={localStyles.accountCard}>
              <div style={localStyles.cardHeader}>
                <div style={localStyles.avatarCircle}>
                  {acc.user.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 style={{ margin: 0 }}>{acc.fullName}</h3>
                  <span style={{ color: "#8D6E63", fontSize: "12px" }}>
                    @{acc.user}
                  </span>
                </div>
              </div>

              <div style={localStyles.divider}></div>

              <div style={localStyles.infoSection}>
                <div style={localStyles.infoItem}>
                  <span>📧</span> {acc.email}
                </div>
                <div style={localStyles.infoItem}>
                  <span>📞</span> {acc.phone}
                </div>
              </div>

              <div style={localStyles.divider}></div>

              <div style={localStyles.roleBox}>
                <label style={localStyles.label}>Thay đổi chức vụ</label>
                <select
                  value={pendingRoles[acc.id] || acc.role}
                  onChange={(e) => handleSelectRole(acc.id, e.target.value)}
                  style={{
                    ...localStyles.roleSelect,
                    borderColor: isChanging ? "#3C2A1A" : "#DCC9B8",
                  }}
                >
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>

                <AnimatePresence>
                  {isChanging && (
                    <motion.button
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        marginTop: "10px",
                      }}
                      exit={{ opacity: 0, height: 0 }}
                      onClick={() => confirmSaveRole(acc.id)}
                      style={localStyles.saveBtn}
                    >
                      Xác nhận lưu thay đổi
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Đảm bảo phần này nằm ngoài function nhưng trong cùng file
const localStyles = {
  accountGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "20px",
  },
  accountCard: {
    backgroundColor: "#fff",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    border: "1px solid #eee",
  },
  cardHeader: { display: "flex", alignItems: "center", gap: "12px" },
  avatarCircle: {
    width: "45px",
    height: "45px",
    borderRadius: "12px",
    backgroundColor: "#3C2A1A",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
  divider: { height: "1px", backgroundColor: "#f0f0f0", margin: "15px 0" },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "13px",
    color: "#555",
  },
  infoItem: { display: "flex", gap: "10px" },
  roleBox: { display: "flex", flexDirection: "column" },
  label: {
    fontSize: "10px",
    color: "#aaa",
    textTransform: "uppercase",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  roleSelect: {
    padding: "8px",
    borderRadius: "8px",
    border: "2px solid #DCC9B8",
    outline: "none",
    cursor: "pointer",
  },
  saveBtn: {
    backgroundColor: "#3C2A1A",
    color: "#fff",
    border: "none",
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    overflow: "hidden",
  },
};
