import React from "react";
import { categories } from "../data/menuSeed";
import { formatCurrency, formatTime } from "../utils/menuHelpers";

function MenuTable({
  filteredItems,
  isLoading,
  onDelete,
  onEdit,
  onSelect,
  searchTerm,
  selectedCategory,
  setSearchTerm,
  setSelectedCategory,
}) {
  return (
    <section className="table-section">
      <div className="section-heading row-heading">
        <div>
          <p className="eyebrow">Danh sách món ăn</p>
          <h2>Bảng menu hiện tại</h2>
        </div>
        <div className="filters">
          <input
            aria-label="Tìm kiếm món"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Tìm tên món hoặc mô tả"
          />
          <select
            aria-label="Lọc danh mục"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="menu-table-wrap">
        <table className="menu-table">
          <thead>
            <tr>
              <th>Hình ảnh</th>
              <th>Tên món</th>
              <th>Giá</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
              <th>Cập nhật</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  Đang tải menu...
                </td>
              </tr>
            ) : filteredItems.length === 0 ? (
              <tr>
                <td colSpan="7" className="empty-state">
                  Chưa có món phù hợp với bộ lọc.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img className="item-thumb" src={item.image} alt={item.name} />
                  </td>
                  <td>
                    <strong>{item.name}</strong>
                    <span className="muted">{item.category}</span>
                  </td>
                  <td>{formatCurrency(item.price)}</td>
                  <td className="description-cell">{item.description}</td>
                  <td>
                    <span className={`status-pill ${item.status}`}>
                      {item.status === "available" ? "Còn bán" : "Hết hàng"}
                    </span>
                  </td>
                  <td>{formatTime(item.updatedAt)}</td>
                  <td>
                    <div className="table-actions">
                      <button className="text-button" type="button" onClick={() => onSelect(item)}>
                        Xem chi tiết
                      </button>
                      <button className="text-button" type="button" onClick={() => onEdit(item)}>
                        Cập nhật
                      </button>
                      <button
                        className="text-button danger"
                        type="button"
                        onClick={() => onDelete(item)}
                      >
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MenuTable;
