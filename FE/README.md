# Hệ Thống Quản Lý Đơn Hàng Quán Cafe Thông Minh - Frontend

## Giới Thiệu
Ứng dụng web xây dựng với **React.js** để quản lý đơn hàng cho hệ thống quán cafe thông minh. Hệ thống cho phép quản lý đơn hàng (tạo, cập nhật, hủy) và theo dõi trạng thái xử lý đơn hàng theo thời gian thực.

## ✨ Các Tính Năng Chính

### 1. 📋 Quản Lý Đơn Hàng
- **Tạo đơn hàng mới** - Nhập thông tin khách hàng, chọn sản phẩm, tính tổng tiền tự động
- **Cập nhật đơn hàng** - Chỉnh sửa thông tin, thêm/xóa sản phẩm, thay đổi trạng thái
- **Hủy đơn hàng** - Hủy bỏ đơn hàng hoặc lưu trạng thái "đã hủy"
- **Xem danh sách đơn hàng** - Hiển thị tất cả đơn hàng với bộ lọc và sắp xếp

### 2. 📊 Theo Dõi Trạng Thái
- **Các trạng thái đơn hàng**:
  - 🕐 **Đang chờ xử lý (Pending)** - Đơn mới vừa được tạo
  - 👨‍🍳 **Đang chế biến (Processing)** - Đơn đang được chuẩn bị
  - ✅ **Đã hoàn thành (Completed)** - Đơn đã được giao
  - ❌ **Đã hủy (Cancelled)** - Đơn đã bị hủy

- **Thống kê trạng thái**:
  - Thống kê tổng đơn hàng
  - Tổng doanh thu
  - Phân bố trạng thái (biểu đồ)
  - Quy trình xử lý (workflow)
  - Danh sách đơn hàng gần đây

### 3. 🎯 Chức Năng Phụ Trợ
- **Lọc đơn hàng** - Theo trạng thái
- **Sắp xếp đơn hàng** - Theo ngày tạo, giá tiền
- **Tìm kiếm nhanh** - Thêm sản phẩm từ danh sách có sẵn
- **Ghi chú đơn hàng** - Thêm thông tin bổ sung
- **Thông tin thời gian** - Hiển thị ngày tạo, cập nhật

## 🚀 Bắt Đầu

### Yêu Cầu Hệ Thống
- Node.js v14 hoặc cao hơn
- npm v6 hoặc cao hơn
- Modern web browser

### Cài Đặt

1. **Clone project** (nếu từ git)
```bash
cd coffee_shop_order_management
```

2. **Cài đặt dependencies**
```bash
npm install
```

3. **Khởi động development server**
```bash
npm start
```

Ứng dụng sẽ mở tự động ở `http://localhost:3000`

### Build cho Production
```bash
npm run build
```

## 📁 Cấu Trúc Dự Án

```
coffee_shop_order_management/
├── public/                 # Static files
├── src/
│   ├── components/        # React components
│   │   ├── OrderList.js       # Danh sách đơn hàng
│   │   ├── OrderForm.js       # Form tạo/cập nhật
│   │   ├── OrderDetail.js     # Chi tiết đơn hàng
│   │   └── OrderStatusTracker.js # Theo dõi trạng thái
│   ├── context/           # React Context
│   │   └── OrderContext.js    # State management
│   ├── services/          # API & Services
│   │   ├── orderService.js    # Order API calls
│   │   └── mockDataService.js # Mock data (localStorage)
│   ├── styles/            # CSS files
│   │   ├── OrderList.css
│   │   ├── OrderForm.css
│   │   ├── OrderDetail.css
│   │   └── OrderStatusTracker.css
│   ├── utils/             # Utility functions
│   │   └── formatters.js  # Formatting & validation
│   ├── App.js             # Main component
│   ├── App.css            # App styles
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json
└── README.md
```

## 💻 Hướng Dẫn Sử Dụng

### Tạo Đơn Hàng Mới
1. Nhấp vào nút **"➕ Tạo Đơn Hàng"** trong header
2. Điền thông tin khách hàng
3. Chọn sản phẩm từ danh sách hoặc nhập thủ công
4. Thêm sản phẩm bằng cách nhấp vào nút sản phẩm nhanh
5. Nhấp **"Tạo Đơn Hàng"** để lưu

### Cập Nhật Đơn Hàng
1. Từ danh sách, nhấp **"Xem Chi Tiết"** trên một đơn hàng
2. Nhấp **"Chỉnh Sửa Đơn Hàng"** trong modal chi tiết
3. Thay đổi thông tin cần thiết
4. Nhấp **"Cập Nhật Đơn Hàng"** để lưu

### Hủy Đơn Hàng
1. Mở chi tiết đơn hàng
2. Nhấp **"Hủy Bỏ Đơn Hàng"**
3. Xác nhận hủy (nhấp lần thứ hai)
4. Đơn hàng sẽ được đánh dấu trạng thái "Đã hủy"

### Theo Dõi Trạng Thái
1. Nhấp tab **"📊 Theo Dõi Trạng Thái"** trong header
2. Xem thống kê tổng quan
3. Kiểm tra phân bố trạng thái của các đơn hàng
4. Xem danh sách đơn hàng gần đây

## 🔧 Cấu Hình

### Kết Nối Với Backend
Nếu bạn có backend API sẵn, hãy cập nhật `src/services/orderService.js`:

```javascript
// Thay đổi từ mock data sang real API calls
const API_URL = 'http://your-backend-url/api/orders';

export const getOrders = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};
```

### Lưu Trữ Dữ Liệu
Hiện tại, dữ liệu được lưu trong **localStorage** (trình duyệt). Khi kết nối backend, tất cả dữ liệu sẽ được lưu trên server.

## 🎨 Giao Diện

### Màu Sắc
- **Primary**: #3498db (Xanh)
- **Success**: #27ae60 (Xanh lá)
- **Danger**: #e74c3c (Đỏ)
- **Warning**: #f39c12 (Vàng)
- **Dark**: #2c3e50 (Xám đen)

### Responsive Design
Ứng dụng hoàn toàn responsive:
- 📱 Mobile (< 480px)
- 📱 Tablet (480px - 768px)
- 💻 Desktop (> 768px)

## 📚 Công Nghệ Sử Dụng

- **React 18** - UI library
- **React Context API** - State management
- **CSS3** - Styling
- **localStorage** - Data persistence (development)
- **HTML5 Fetch API** - HTTP requests

## 🐛 Xử Lý Lỗi

Ứng dụng có các xử lý lỗi cho:
- Validation form
- Lỗi API
- Tình huống dữ liệu thiếu
- Xác nhận hành động giới hạn

## 📋 Danh Sách Sản Phẩm Mặc Định

```javascript
const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Cà Phê Đen', price: 25000 },
  { id: 2, name: 'Cà Phê Sữa', price: 30000 },
  { id: 3, name: 'Cappuccino', price: 45000 },
  { id: 4, name: 'Latte', price: 50000 },
  { id: 5, name: 'Espresso', price: 35000 },
  { id: 6, name: 'Americano', price: 40000 },
  { id: 7, name: 'Macchiato', price: 45000 },
  { id: 8, name: 'Mocha', price: 50000 },
  { id: 9, name: 'Iced Coffee', price: 35000 },
  { id: 10, name: 'Trà Sữa', price: 40000 },
];
```

## 🔐 Bảo Mật

- Xác nhận hành động xóa (yêu cầu xác nhận 2 lần)
- Validation dữ liệu phía client
- Không lưu data nhạy cảm

## 📈 Kiến Nghị Nâng Cấp

1. **Authentication & Authorization** - Thêm login, phân quyền user
2. **Real Database** - Kết nối với backend (Node.js, Django, etc.)
3. **In Đơn Hàng** - Chức năng in/PDF
4. **Thông Báo** - Real-time notifications (WebSocket)
5. **Quản Lý Sản Phẩm** - CRUD sản phẩm, danh mục
6. **Phân Tích** - Báo cáo doanh thu, thống kê
7. **Hình Ảnh** - Thêm hình ảnh sản phẩm

## 📞 Liên Hệ & Hỗ Trợ

Nếu gặp vấn đề hoặc có câu hỏi, vui lòng tạo issue hoặc liên hệ với nhóm phát triển.

## 📄 Giấy Phép

Dự án này được phát hành dưới giấy phép MIT.

---

**Tác giả**: Coffee Shop Management Team  
**Phiên bản**: 1.0.0  
**Cập nhật**: Tháng 4, 2024
