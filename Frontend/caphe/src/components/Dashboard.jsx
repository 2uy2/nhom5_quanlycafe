import { EMPLOYEE_STATUSES, ROLE_OPTIONS } from "../lib/constants";

const hourlyLoad = [38, 52, 68, 92, 78, 60, 42];

export default function Dashboard({ employees, loading }) {
  const total = employees.length;
  const active = employees.filter(
    (employee) => employee.status === EMPLOYEE_STATUSES.ACTIVE,
  ).length;
  const onLeave = total - active;
  const managers = employees.filter((employee) =>
    ROLE_OPTIONS.slice(0, 2).includes(employee.role),
  ).length;

  const roleBreakdown = ROLE_OPTIONS.map((role) => ({
    role,
    count: employees.filter((employee) => employee.role === role).length,
  }));

  const recentEmployees = [...employees]
    .sort((left, right) => new Date(right.createdAt || 0) - new Date(left.createdAt || 0))
    .slice(0, 4);

  const stats = [
    { label: "Tổng nhân sự", value: total, tone: "coffee" },
    { label: "Đang làm việc", value: active, tone: "success" },
    { label: "Tạm nghỉ", value: onLeave, tone: "warning" },
    { label: "Nhóm quản lý", value: managers, tone: "info" },
  ];

  return (
    <div className="stack-lg">
      <section className="stats-grid">
        {stats.map((item) => (
          <article key={item.label} className={`stat-card tone-${item.tone}`}>
            <p>{item.label}</p>
            <strong>{loading ? "--" : item.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-grid">
        <article className="panel">
          <p className="eyebrow">Vận hành theo khung giờ</p>
          <h3 className="section-title">
            Biểu đồ mô phỏng mật độ ca làm để nhìn nhanh điểm cao tải.
          </h3>

          <div className="bar-chart" aria-label="Mật độ nhân sự theo giờ">
            {hourlyLoad.map((height, index) => (
              <div key={`${height}-${index}`} className="bar-slot">
                <div
                  className="bar"
                  style={{
                    height: `${height}%`,
                    transitionDelay: `${index * 0.05}s`,
                  }}
                />
              </div>
            ))}
          </div>

          <div className="bar-labels">
            <span>6h</span>
            <span>9h</span>
            <span>12h</span>
            <span>15h</span>
            <span>18h</span>
            <span>21h</span>
            <span>23h</span>
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Gợi ý quản trị</p>
          <h3 className="section-title">
            Một số tín hiệu đáng chú ý từ dữ liệu hiện tại.
          </h3>

          <div className="insight-list">
            <div className="insight-item">
              <strong>{active}</strong>
              <span>nhân sự đang có trạng thái hoạt động.</span>
            </div>
            <div className="insight-item">
              <strong>{managers}</strong>
              <span>tài khoản đang thuộc nhóm quản trị hoặc quản lý.</span>
            </div>
            <div className="insight-item">
              <strong>{onLeave}</strong>
              <span>nhân sự cần kiểm tra lại kế hoạch ca nếu tạm nghỉ.</span>
            </div>
          </div>
        </article>
      </section>

      <section className="dashboard-grid dashboard-grid-balanced">
        <article className="panel">
          <p className="eyebrow">Cơ cấu đội ngũ</p>
          <h3 className="section-title">Tỷ trọng theo vai trò để cân đối staffing.</h3>

          <div className="role-breakdown">
            {roleBreakdown.map((item) => {
              const width = total ? `${Math.max((item.count / total) * 100, item.count ? 8 : 0)}%` : "0%";

              return (
                <div key={item.role} className="role-row">
                  <div className="role-row-meta">
                    <strong>{item.role}</strong>
                    <span>{item.count} người</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="panel">
          <p className="eyebrow">Hoạt động gần đây</p>
          <h3 className="section-title">Nhân sự mới thêm vào hệ thống gần nhất.</h3>

          {recentEmployees.length === 0 ? (
            <div className="empty-state">Chưa có dữ liệu nhân sự gần đây.</div>
          ) : (
            <div className="recent-list">
              {recentEmployees.map((employee) => (
                <div key={employee._id || employee.id} className="recent-item">
                  <div className="identity">
                    <img src={employee.avatar} alt={employee.name} className="avatar" />
                    <div>
                      <strong>{employee.name}</strong>
                      <p>{employee.role}</p>
                    </div>
                  </div>
                  <span className="muted-text">
                    {employee.createdAt
                      ? new Date(employee.createdAt).toLocaleDateString("vi-VN")
                      : "Chưa rõ"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>
    </div>
  );
}
