import { useEffect, useMemo, useState } from "react";

import Dashboard from "./components/Dashboard";
import EmployeeManager from "./components/EmployeeManager";
import AccountManager from "./components/AccountManager";
import RolePermission from "./components/RolePermission";
import { employeeApi } from "./lib/api";
import { EMPLOYEE_STATUSES } from "./lib/constants";

const NAV_ITEMS = [
  { key: "dashboard", label: "Tổng quan", icon: "DG" },
  { key: "employees", label: "Nhân viên", icon: "NV" },
  { key: "accounts", label: "Tài khoản", icon: "TK" },
  { key: "roles", label: "Phân quyền", icon: "PQ" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const { data } = await employeeApi.getEmployees();
      setEmployees(data);
      setError("");
    } catch (fetchError) {
      console.error(fetchError);
      setError("Không thể tải dữ liệu nhân viên từ server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchEmployees();
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!notice) {
      return undefined;
    }

    const timer = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const summary = useMemo(() => {
    const activeEmployees = employees.filter(
      (employee) => employee.status === EMPLOYEE_STATUSES.ACTIVE,
    ).length;

    return {
      total: employees.length,
      active: activeEmployees,
      onLeave: employees.length - activeEmployees,
    };
  }, [employees]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <span className="brand-cup">☕</span>
          </div>
          <h1 className="brand-title">TÍN COFFEE</h1>
        </div>

        <nav className="nav-list" aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              type="button"
              className={`nav-item ${activeTab === item.key ? "is-active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="nav-icon" aria-hidden="true">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-card">
          <p className="sidebar-label">Tình hình hôm nay</p>
          <div className="sidebar-metric">
            <strong>{summary.total}</strong>
            <span>nhân sự trong hệ thống</span>
          </div>
          <div className="sidebar-split">
            <span>Đang làm việc</span>
            <strong>{summary.active}</strong>
          </div>
          <div className="sidebar-split">
            <span>Tạm nghỉ</span>
            <strong>{summary.onLeave}</strong>
          </div>
        </div>
      </aside>

      <main className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">Hệ thống điều hành</p>
            <h2 className="page-heading">
              {NAV_ITEMS.find((item) => item.key === activeTab)?.label}
            </h2>
          </div>

          <div className="topbar-meta" />
        </header>

        {notice ? <div className="notice success">{notice}</div> : null}
        {error ? <div className="notice danger">{error}</div> : null}

        <section key={activeTab} className="page-frame page-enter">
          {activeTab === "dashboard" && (
            <Dashboard employees={employees} loading={loading} />
          )}
          {activeTab === "employees" && (
            <EmployeeManager
              employees={employees}
              loading={loading}
              refreshEmployees={fetchEmployees}
              setNotice={setNotice}
            />
          )}
          {activeTab === "accounts" && (
            <AccountManager refreshEmployees={fetchEmployees} setNotice={setNotice} />
          )}
          {activeTab === "roles" && <RolePermission setNotice={setNotice} />}
        </section>
      </main>
    </div>
  );
}
