import React from "react";
import { categories } from "../data/menuSeed";

function MenuForm({
  editingId,
  errors,
  form,
  isSaving,
  onCancel,
  onChange,
  onSubmit,
}) {
  return (
    <form className="menu-form" id="menu-form" onSubmit={onSubmit}>
      <div className="section-heading">
        <p className="eyebrow">{editingId ? "Cập nhật món" : "Thêm món mới"}</p>
        <h2>{editingId ? form.name || "Đang chỉnh sửa" : "Thông tin sản phẩm"}</h2>
      </div>

      <label>
        Tên món
        <input
          name="name"
          value={form.name}
          onChange={onChange}
          placeholder="Ví dụ: Latte hạt dẻ"
        />
        {errors.name && <span className="field-error">{errors.name}</span>}
      </label>

      <div className="form-row">
        <label>
          Giá bán
          <input
            name="price"
            type="number"
            min="0"
            value={form.price}
            onChange={onChange}
            placeholder="65000"
          />
          {errors.price && <span className="field-error">{errors.price}</span>}
        </label>

        <label>
          Danh mục
          <select name="category" value={form.category} onChange={onChange}>
            {categories
              .filter((category) => category !== "Tat ca")
              .map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
          </select>
        </label>
      </div>

      <label>
        Trạng thái
        <select name="status" value={form.status} onChange={onChange}>
          <option value="available">Còn bán</option>
          <option value="sold_out">Hết hàng</option>
        </select>
      </label>

      <label>
        Mô tả
        <textarea
          name="description"
          value={form.description}
          onChange={onChange}
          placeholder="Mô tả ngắn gọn về hương vị, thành phần, khuyến mãi..."
        />
        {errors.description && <span className="field-error">{errors.description}</span>}
      </label>

      <label>
        Hình ảnh
        <input name="image" value={form.image} onChange={onChange} placeholder="https://..." />
        {errors.image && <span className="field-error">{errors.image}</span>}
      </label>

      <div className="form-actions">
        <button className="button primary" disabled={isSaving} type="submit">
          {isSaving ? "Đang lưu..." : editingId ? "Cập nhật" : "Thêm mới"}
        </button>
        <button className="button ghost" type="button" onClick={onCancel}>
          Hủy
        </button>
      </div>
    </form>
  );
}

export default MenuForm;
