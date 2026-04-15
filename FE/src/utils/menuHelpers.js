export function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatTime(value) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

export function validateForm(form) {
  const errors = {};
  const priceValue = Number(form.price);

  if (!form.name.trim()) {
    errors.name = "Vui lòng nhập tên món.";
  }

  if (!form.price || Number.isNaN(priceValue) || priceValue <= 0) {
    errors.price = "Giá phải lớn hơn 0.";
  }

  if (!form.description.trim()) {
    errors.description = "Vui lòng nhập mô tả sản phẩm.";
  }

  if (form.image && !/^https?:\/\/.+/i.test(form.image)) {
    errors.image = "Hình ảnh nên là URL bắt đầu bằng http hoặc https.";
  }

  return errors;
}
