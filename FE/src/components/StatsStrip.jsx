import React from "react";
import { formatCurrency } from "../utils/menuHelpers";

function StatsStrip({ stats }) {
  return (
    <section className="insight-strip" aria-label="Chi so menu">
      <article className="metric-panel">
        <span>Tổng món</span>
        <strong>{stats.total}</strong>
      </article>
      <article className="metric-panel">
        <span>Đang bán</span>
        <strong>{stats.availableCount}</strong>
      </article>
      <article className="metric-panel">
        <span>Hết hàng</span>
        <strong>{stats.soldOutCount}</strong>
      </article>
      <article className="metric-panel">
        <span>Giá trung bình</span>
        <strong>{formatCurrency(stats.averagePrice)}</strong>
      </article>
    </section>
  );
}

export default StatsStrip;
