import React from "react";
import { formatCurrency, formatTime } from "../utils/menuHelpers";

function DetailDrawer({ item, onClose, onEdit }) {
  if (!item) {
    return null;
  }

  return (
    <div className="detail-backdrop" role="presentation" onClick={onClose}>
      <section
        className="detail-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Chi tiết món"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="drawer-close" type="button" aria-label="Đóng chi tiết" onClick={onClose}>
          x
        </button>
        <img src={item.image} alt={item.name} />
        <p className="eyebrow">{item.id}</p>
        <h2>{item.name}</h2>
        <p>{item.description}</p>
        <dl className="detail-list">
          <div>
                <dt>Giá bán</dt>
            <dd>{formatCurrency(item.price)}</dd>
          </div>
          <div>
                <dt>Danh mục</dt>
            <dd>{item.category}</dd>
          </div>
          <div>
                <dt>Trạng thái</dt>
                <dd>{item.status === "available" ? "Còn bán" : "Hết hàng"}</dd>
          </div>
          <div>
                <dt>Cập nhật gần nhất</dt>
            <dd>{formatTime(item.updatedAt)}</dd>
          </div>
        </dl>
        <button className="button primary" type="button" onClick={() => onEdit(item)}>
          Chỉnh sửa món này
        </button>
      </section>
    </div>
  );
}

export default DetailDrawer;
