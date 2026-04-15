# 🚀 Quick Start Guide - Bắt Đầu Nhanh

## 1️⃣ Cài Đặt Dependencies

```bash
cd coffee_shop_order_management
npm install
```

**⏱️ Thời gian**: ~2-5 phút (tùy tốc độ internet)

## 2️⃣ Khởi Động Development Server

```bash
npm start
```

- Ứng dụng sẽ mở tự động ở: **http://localhost:3000**
- Nếu không mở, tự mở trong trình duyệt

## 3️⃣ Kiểm Tra Ứng Dụng Hoạt Động

✅ Nếu thấy giao diện với header "☕ Quản Lý Đơn Hàng" → **Thành công!**

## 4️⃣ Tính Năng Để Test

### 📋 Test 1: Xem Danh Sách Mặc Định
1. Mở `http://localhost:3000`
2. Màn hình sẽ hiển thị 3 đơn hàng mẫu
3. ✅ Nếu thấy đơn hàng → OK

### 📝 Test 2: Tạo Đơn Hàng Mới
1. Nhấp **"➕ Tạo Đơn Hàng"** 
2. Điền thông tin:
   - Tên khách: "Tester"
   - Chọn sản phẩm (nhấp nút "Cà Phê Đen")
3. Nhấp **"Tạo Đơn Hàng"**
4. ✅ Nếu quay lại danh sách → OK

### 👁️ Test 3: Xem Chi Tiết
1. Nhấp "Xem Chi Tiết" trên một đơn hàng
2. Modal sẽ mở ra
3. ✅ Thấy thông tin đơn hàng → OK

### ✏️ Test 4: Chỉnh Sửa Đơn Hàng
1. Từ chi tiết, nhấp "Chỉnh Sửa Đơn Hàng"
2. Sửa thông tin (thêm sản phẩm, đổi số lượng)
3. Nhấp "Cập Nhật Đơn Hàng"
4. ✅ Dữ liệu cập nhật → OK

### ❌ Test 5: Hủy Đơn Hàng
1. Mở chi tiết đơn hàng (status chưa "Hoàn thành")
2. Nhấp "Hủy Bỏ Đơn Hàng"
3. Nhấp lần thứ 2 để xác nhận
4. ✅ Trạng thái = "Đã hủy" → OK

### 📊 Test 6: Theo Dõi Trạng Thái
1. Nhấp **"📊 Theo Dõi Trạng Thái"**
2. Xem thống kê doanh thu, phân bố trạng thái
3. ✅ Thấy biểu đồ & số liệu → OK

## 5️⃣ Lệnh Hay Dùng

| Lệnh | Mục Đích |
|------|---------|
| `npm start` | Chạy dev server |
| `npm run build` | Build cho production |
| `npm test` | Chạy unit tests |
| `npm run eject` | Eject CRA (không thể undo!) |

## 🔧 Cấu Hình Cơ Bản

### Thay Đổi Port (mặc định 3000)
```bash
PORT=3001 npm start
```

### Xóa Mock Data (Reset localStorage)
Mở DevTools (F12) → Console:
```javascript
localStorage.clear();
location.reload();
```

## 📁 File Cần Biết

| File | Mục Đích |
|------|---------|
| `src/App.js` | Component chính |
| `src/context/OrderContext.js` | State management |
| `src/components/` | Tất cả components |
| `src/services/orderService.js` | API calls |
| `src/styles/` | CSS files |
| `package.json` | Dependencies |

## ⚠️ Troubleshooting

### ❌ Lỗi: "npm: command not found"
```bash
# Cài Node.js từ https://nodejs.org/
# Sau đó khởi động lại terminal
node --version
npm --version
```

### ❌ Port 3000 đã bị chiếm
```bash
# Chạy ở port khác
PORT=3001 npm start
```

### ❌ Node modules lỗi
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ Ứng dụng không mở tự động
```bash
# Tự mở bằng tay
# Trên Windows:
start http://localhost:3000

# Trên Mac:
open http://localhost:3000

# Trên Linux:
xdg-open http://localhost:3000
```

## 📚 Tài Liệu Thêm

- **[README.md](./README.md)** - Hướng dẫn chi tiết
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Kiến trúc ứng dụng
- **[API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)** - Kết nối backend

## ✨ Tiếp Theo

### Nếu muốn **kết nối backend**:
1. Đọc [API_INTEGRATION_GUIDE.md](./API_INTEGRATION_GUIDE.md)
2. Cập nhật `src/services/orderService.js`

### Nếu muốn **sửa giao diện**:
1. Sửa files trong `src/components/`
2. Cập nhật CSS trong `src/styles/`

### Nếu muốn **deploy**:
```bash
npm run build
# Upload thư mục 'build' lên web server
```

---

## 🎯 Summary - Tóm Tắt

| Bước | Câu Lệnh | Kết Quả |
|------|----------|---------|
| 1 | `npm install` | Cài dependencies |
| 2 | `npm start` | Mở app ở localhost:3000 |
| 3 | Thử các feature | Test toàn bộ chức năng |
| 4 | Sửa code (nếu cần) | Auto reload |
| 5 | Kết nối backend | Tham khảo guide riêng |

**🎉 Chúc bạn thành công! Happy Coding!**

---

**Liên hệ hỗ trợ**: Tạo issue hoặc liên hệ với team  
**Phiên bản**: 1.0.0  
**Cập nhật**: Tháng 4, 2024
