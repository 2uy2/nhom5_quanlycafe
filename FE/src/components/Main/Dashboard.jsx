import { useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import "./Dashboard.css";

const FALLBACK_REPORT = {
  summary: {
    totalRevenue: 184500000,
    totalOrders: 1268,
    avgOrderValue: 145500,
  },
  trend: [
    { date: "2026-04-21", revenue: 18500000, orders: 122 },
    { date: "2026-04-22", revenue: 21400000, orders: 138 },
    { date: "2026-04-23", revenue: 20500000, orders: 131 },
    { date: "2026-04-24", revenue: 26200000, orders: 174 },
    { date: "2026-04-25", revenue: 28900000, orders: 188 },
    { date: "2026-04-26", revenue: 31100000, orders: 202 },
    { date: "2026-04-27", revenue: 37900000, orders: 313 },
  ],
  topProducts: [
    { name: "Tai nghe Bluetooth TWS", quantity: 248, revenue: 37600000 },
    { name: "Ban phim co RGB", quantity: 182, revenue: 29120000 },
    { name: "Chuot khong day", quantity: 301, revenue: 25083000 },
    { name: "Man hinh 27 inch", quantity: 66, revenue: 20790000 },
    { name: "Webcam Full HD", quantity: 144, revenue: 16128000 },
  ],
  range: "7d",
};

const RANGE_OPTIONS = [
  { value: "7d", label: "7 ngay" },
  { value: "30d", label: "30 ngay" },
  { value: "90d", label: "90 ngay" },
  { value: "custom", label: "Tuy chinh" },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value || 0);

const formatNumber = (value) => new Intl.NumberFormat("vi-VN").format(value || 0);

const getTodayISO = () => {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60 * 1000);
  return localDate.toISOString().slice(0, 10);
};

const subtractDaysISO = (isoDate, daysToSubtract) => {
  const date = new Date(`${isoDate}T00:00:00`);
  date.setDate(date.getDate() - daysToSubtract);
  return date.toISOString().slice(0, 10);
};

const Dashboard = () => {
  const [range, setRange] = useState("7d");
  const [chartMode, setChartMode] = useState("revenue");
  const [isExporting, setIsExporting] = useState(false);
  const [todayISO] = useState(getTodayISO);
  const [fromDate, setFromDate] = useState(() => subtractDaysISO(getTodayISO(), 6));
  const [toDate, setToDate] = useState(getTodayISO);
  const [report, setReport] = useState(FALLBACK_REPORT);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;

    const fetchReport = async () => {
      setLoading(true);
      setError("");

      try {
        const query = new URLSearchParams({ range });
        if (range === "custom") {
          query.set("from", fromDate);
          query.set("to", toDate);
        }
        const response = await fetch(`http://localhost:4000/api/admin/revenue-report?${query.toString()}`);

        if (!response.ok) {
          throw new Error("API response is not ok");
        }

        const payload = await response.json();
        if (!isCancelled) {
          setReport(payload);
        }
      } catch (fetchError) {
        if (!isCancelled) {
          setReport(FALLBACK_REPORT);
          setError("Khong ket noi duoc backend, dang hien thi du lieu mau.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    if (range === "custom" && fromDate > toDate) {
      setError("Ngay bat dau phai nho hon hoac bang ngay ket thuc.");
      setLoading(false);
      return () => {
        isCancelled = true;
      };
    }

    fetchReport();

    return () => {
      isCancelled = true;
    };
  }, [range, fromDate, toDate]);

  const chartData = useMemo(() => {
    return (report.trend || []).map((item) => ({
      ...item,
      shortDate: item.date?.slice(5) || "",
    }));
  }, [report]);

  const handleExportCSV = async () => {
    try {
      setIsExporting(true);
      setError("");

      const query = new URLSearchParams({ range });
      if (range === "custom") {
        query.set("from", fromDate);
        query.set("to", toDate);
      }

      const response = await fetch(`http://localhost:4000/api/admin/revenue-report/export-csv?${query.toString()}`);
      if (!response.ok) {
        throw new Error("Cannot export csv");
      }

      const csvText = await response.text();
      const blob = new Blob([csvText], { type: "text/csv;charset=utf-8;" });
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `revenue-report-${range}-${todayISO}.csv`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(downloadUrl);
    } catch (exportError) {
      setError("Khong the xuat file CSV luc nay.");
    } finally {
      setIsExporting(false);
    }
  };

  const chartValueKey = chartMode === "orders" ? "orders" : "revenue";
  const chartTitle = chartMode === "orders" ? "So don hang theo ngay" : "Doanh thu theo ngay";
  const tooltipFormatter = (value) => {
    if (chartMode === "orders") {
      return [formatNumber(value), "Don hang"];
    }
    return [formatCurrency(value), "Doanh thu"];
  };

  return (
    <section className="dashboard">
      <div className="dashboard-topbar">
        <h2 className="dashboard-title">Tong quan doanh thu</h2>
        <div className="dashboard-toolbar">
          <div className="dashboard-filter">
            <label htmlFor="range">Khoang thoi gian</label>
            <select id="range" value={range} onChange={(event) => setRange(event.target.value)}>
              {RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <button className="btn btn-secondary" type="button" onClick={handleExportCSV} disabled={isExporting}>
            {isExporting ? "Dang xuat..." : "Xuat CSV"}
          </button>
        </div>
      </div>

      {range === "custom" ? (
        <div className="custom-range-wrap">
          <div className="dashboard-filter">
            <label htmlFor="from-date">Tu ngay</label>
            <input
              id="from-date"
              type="date"
              value={fromDate}
              max={todayISO}
              onChange={(event) => setFromDate(event.target.value)}
            />
          </div>
          <div className="dashboard-filter">
            <label htmlFor="to-date">Den ngay</label>
            <input
              id="to-date"
              type="date"
              value={toDate}
              max={todayISO}
              onChange={(event) => setToDate(event.target.value)}
            />
          </div>
        </div>
      ) : null}

      {error ? <p className="dashboard-alert">{error}</p> : null}

      <div className="dashboard-grid">
        <article className="kpi-card">
          <p className="kpi-label">Tong doanh thu</p>
          <p className="kpi-value">{formatCurrency(report.summary?.totalRevenue)}</p>
        </article>

        <article className="kpi-card">
          <p className="kpi-label">Tong don hang</p>
          <p className="kpi-value">{(report.summary?.totalOrders || 0).toLocaleString("vi-VN")}</p>
        </article>

        <article className="kpi-card">
          <p className="kpi-label">Gia tri trung binh / don</p>
          <p className="kpi-value">{formatCurrency(report.summary?.avgOrderValue)}</p>
        </article>
      </div>

      <article className="panel">
        <div className="panel-header">
          <h3>{chartTitle}</h3>
          <div className="toggle-group">
            <button
              type="button"
              className={`btn btn-toggle ${chartMode === "revenue" ? "is-active" : ""}`}
              onClick={() => setChartMode("revenue")}
            >
              Doanh thu
            </button>
            <button
              type="button"
              className={`btn btn-toggle ${chartMode === "orders" ? "is-active" : ""}`}
              onClick={() => setChartMode("orders")}
            >
              Don hang
            </button>
          </div>
        </div>
        <div className="chart-wrap">
          {loading ? (
            <p className="loading-text">Dang tai du lieu...</p>
          ) : (
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="shortDate" />
                <YAxis tickFormatter={(value) => (chartMode === "orders" ? formatNumber(value) : `${Math.round(value / 1000000)}M`)} />
                <Tooltip formatter={tooltipFormatter} labelFormatter={(label) => `Ngay ${label}`} />
                <Bar dataKey={chartValueKey} fill={chartMode === "orders" ? "#0284c7" : "#0ea5a4"} radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </article>

      <article className="panel">
        <h3>Top san pham theo doanh thu</h3>
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>San pham</th>
                <th>So luong</th>
                <th>Doanh thu</th>
              </tr>
            </thead>
            <tbody>
              {(report.topProducts || []).map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.quantity.toLocaleString("vi-VN")}</td>
                  <td>{formatCurrency(item.revenue)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </section>
  );
};

export default Dashboard;
