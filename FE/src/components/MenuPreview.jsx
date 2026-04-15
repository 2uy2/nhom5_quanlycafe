import React from "react";

const fallbackImage =
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80";

function MenuPreview({ form, selectedItem }) {
  return (
    <section className="preview-panel" aria-label="Xem trước sản phẩm">
      <img
        src={form.image || selectedItem?.image || fallbackImage}
        alt="Ảnh xem trước món trong menu"
      />
      <div>
        <p className="eyebrow">Đồng bộ thời gian thực</p>
        <h2>{form.name || selectedItem?.name || "Chọn hoặc tạo một món"}</h2>
        <p>
          {form.description ||
            selectedItem?.description ||
            "Thông tin sẽ được cập nhật vào danh sách ngay sau khi admin lưu thay đổi."}
        </p>
      </div>
    </section>
  );
}

export default MenuPreview;
