//Dashboard
import { motion } from "framer-motion";

export default function Dashboard({ employees, styles }) {
  // Tính toán dữ liệu thực tế
  const total = employees.length;
  const active = employees.filter((e) => e.status === "ĐANG LÀM VIỆC").length;
  const onLeave = total - active;

  const cards = [
    { title: "Tổng nhân sự", value: total, icon: "👥", color: "#3C2A1A" },
    { title: "Đang làm việc", value: active, icon: "✅", color: "#15803d" },
    { title: "Nghỉ phép", value: onLeave, icon: "🏖️", color: "#b45309" },
    { title: "Doanh thu ngày", value: "2.4M", icon: "💰", color: "#1d4ed8" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 style={styles.pageTitle}>TỔNG QUAN HỆ THỐNG</h1>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "#fff",
              padding: "20px",
              borderRadius: "20px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.02)",
              borderLeft: `6px solid ${card.color}`,
            }}
          >
            <div style={{ fontSize: "30px", marginBottom: "10px" }}>
              {card.icon}
            </div>
            <div style={{ fontSize: "14px", color: "#777", fontWeight: "600" }}>
              {card.title}
            </div>
            <div
              style={{ fontSize: "24px", fontWeight: "800", color: "#3C2A1A" }}
            >
              {card.value}
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "20px" }}
      >
        {/* Biểu đồ giả lập bằng CSS */}
        <div style={{ ...styles.tableCard, padding: "25px" }}>
          <h3 style={{ marginBottom: "20px" }}>📊 Mật độ nhân sự theo giờ</h3>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "15px",
              height: "150px",
              paddingBottom: "10px",
              borderBottom: "2px solid #eee",
            }}
          >
            {[40, 70, 90, 100, 80, 50, 30].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  backgroundColor: "#3C2A1A",
                  height: `${h}%`,
                  borderRadius: "5px 5px 0 0",
                  opacity: 0.8,
                }}
              ></div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
              fontSize: "12px",
              color: "#999",
            }}
          >
            <span>6h</span>
            <span>9h</span>
            <span>12h</span>
            <span>15h</span>
            <span>18h</span>
            <span>21h</span>
            <span>24h</span>
          </div>
        </div>

        {/* Thông báo nhanh */}
        <div style={{ ...styles.tableCard, padding: "25px" }}>
          <h3 style={{ marginBottom: "15px" }}>🔔 Thông báo</h3>
          <div style={{ fontSize: "13px", color: "#555" }}>
            <p style={{ padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
              • <b>Trần Thị Bình</b> xin nghỉ phép ngày mai.
            </p>
            <p style={{ padding: "10px 0", borderBottom: "1px solid #f5f5f5" }}>
              • Đã thêm <b>2 nhân sự</b> mới vào hệ thống.
            </p>
            <p style={{ padding: "10px 0" }}>
              • Cập nhật quyền hạn cho nhóm <b>Pha chế</b>.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
