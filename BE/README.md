# Hệ Thống Quản Lý Đơn Hàng Quán Cafe Thông Minh - Backend API

## 📋 Giới Thiệu

Backend API cho hệ thống quản lý đơn hàng quán cafe, xây dựng bằng **Node.js + Express + MySQL**.

## 🚀 Yêu Cầu Hệ Thống

- **Node.js**: v14 hoặc cao hơn
- **npm**: v6 hoặc cao hơn
- **MySQL**: v5.7 hoặc cao hơn
- **Git**: (tuỳ chọn)

## 📦 Cài Đặt

### 1. Cài Đặt Dependencies

```bash
cd BE
npm install
```

**⏱️ Thời gian**: ~2-3 phút

### 2. Cấu Hình Môi Trường

Tạo/chỉnh sửa file `.env` trong thư mục BE:

```env
# Environment Configuration
NODE_ENV=development
PORT=5000

# Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=coffee_shop_db
DB_PORT=3306

# API Configuration
API_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:3000
```

### 3. Tạo Database (MySQL)

```sql
-- MySQL Command Line
CREATE DATABASE IF NOT EXISTS coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Hoặc sử dụng MySQL Workbench:
1. Mở MySQL Workbench
2. Kết nối đến MySQL server
3. Tạo schema mới: `coffee_shop_db`
4. Character Set: `utf8mb4`
5. Collation: `utf8mb4_unicode_ci`

### 4. Khởi Động Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Khi server khởi động thành công, bạn sẽ thấy:

```
╔════════════════════════════════════════════════════════╗
║  Coffee Shop Order Management API                      ║
║  Server running at: http://localhost:5000              ║
║  API Documentation: http://localhost:5000/api          ║
║  Health Check: http://localhost:5000/health           ║
╚════════════════════════════════════════════════════════╝
```

## 📁 Cấu Trúc Dự Án

```
BE/
├── config/
│   └── database.js           # MySQL connection configuration
├── controllers/
│   └── orderController.js    # Order business logic
├── database/
│   └── schema.js             # Database schema initialization
├── middleware/
│   └── errorHandler.js       # Error handling middleware
├── models/
│   └── Order.js              # Order data model
├── routes/
│   └── orderRoutes.js        # Order API routes
├── .env                      # Environment variables
├── .gitignore               # Git ignore file
├── package.json
├── server.js                # Main server file
└── README.md
```

## 🔌 API Endpoints

### GET /health
Kiểm tra trạng thái server

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-04-15T10:30:00.000Z"
}
```

### GET /api
Xem tài liệu API

### GET /api/orders
Lấy danh sách tất cả đơn hàng

**Query Parameters:**
- `status`: Lọc theo trạng thái (pending, processing, completed, cancelled)
- `customerName`: Tìm kiếm theo tên khách

**Response:**
```json
{
  "success": true,
  "message": "Orders retrieved successfully",
  "data": [
    {
      "id": "ORD-2024-12345",
      "customerName": "Nguyễn Văn A",
      "customerPhone": "0912345678",
      "totalPrice": 50000,
      "status": "pending",
      "notes": "Không đường",
      "items": [...],
      "createdAt": "2024-04-15T10:30:00Z",
      "updatedAt": "2024-04-15T10:30:00Z"
    }
  ]
}
```

### GET /api/orders/:orderId
Lấy chi tiết một đơn hàng

### POST /api/orders
Tạo đơn hàng mới

**Request Body:**
```json
{
  "customerName": "Nguyễn Văn A",
  "customerPhone": "0912345678",
  "items": [
    {
      "productName": "Cà Phê Đen",
      "quantity": 2,
      "price": 25000
    }
  ],
  "notes": "Không đường"
}
```

### PUT /api/orders/:orderId
Cập nhật đơn hàng

**Request Body:**
```json
{
  "status": "processing",
  "items": [...],
  "notes": "Ghi chú mới"
}
```

### DELETE /api/orders/:orderId
Xoá/hủy đơn hàng

### GET /api/orders/status/:status
Lấy đơn hàng theo trạng thái

### GET /api/orders/stats/overview
Lấy thống kê đơn hàng

**Response:**
```json
{
  "success": true,
  "data": {
    "totalOrders": 10,
    "pendingOrders": 2,
    "processingOrders": 3,
    "completedOrders": 4,
    "cancelledOrders": 1,
    "totalRevenue": 500000,
    "averageOrderValue": 50000
  }
}
```

## 🔗 Kết Nối Frontend

### 1. Cập Nhật Order Service

Sửa file `FE/src/services/orderService.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const getOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  return response.json();
};

export const getOrderById = async (orderId) => {
  const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
  return response.json();
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

// ... các hàm khác tương tự
```

### 2. Khởi Động Cả Frontend và Backend

**Terminal 1 - Backend:**
```bash
cd BE
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd FE
npm start
```

## 🧪 Test API

### Sử dụng Postman

1. **Cài đặt Postman** (nếu chưa có)
2. **Import collection** hoặc tạo request theo endpoints phía trên
3. **Test các API endpoints**

### Sử dụng cURL

```bash
# Lấy danh sách đơn hàng
curl http://localhost:5000/api/orders

# Tạo đơn hàng mới
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test",
    "customerPhone": "0123456789",
    "items": [{"productName": "Cà Phê", "quantity": 1, "price": 25000}]
  }'
```

## 📊 Database Schema

### orders table
```
- id (VARCHAR 20) - Order ID
- customerName (VARCHAR 255) - Customer name
- customerPhone (VARCHAR 20) - Customer phone
- totalPrice (DECIMAL 10,2) - Total amount
- status (ENUM) - pending, processing, completed, cancelled
- notes (TEXT) - Additional notes
- createdAt (TIMESTAMP) - Creation time
- updatedAt (TIMESTAMP) - Last update time
```

### order_items table
```
- id (INT) - Item ID (Auto increment)
- orderId (VARCHAR 20) - Foreign key to orders
- productName (VARCHAR 255) - Product name
- quantity (INT) - Quantity
- price (DECIMAL 10,2) - Unit price
- subtotal (DECIMAL 10,2) - Item total
- createdAt (TIMESTAMP) - Creation time
```

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:3306"
**Giải pháp:** MySQL server không chạy. Hãy khởi động MySQL:
```bash
# Windows
net start MySQL80

# macOS (Homebrew)
brew services start mysql

# Linux
sudo systemctl start mysql
```

### Error: "ER_ACCESS_DENIED_FOR_USER"
**Giải pháp:** Kiểm tra lại username/password trong `.env`

### Error: "ER_BAD_DB_ERROR"
**Giải pháp:** Database chưa được tạo. Chạy SQL command để tạo database.

### CORS error trên Frontend
**Giải pháp:** Kiểm tra `FRONTEND_URL` trong `.env` khớp với URL frontend

## 📝 Lưu Ý

- Backend sử dụng `mysql2/promise` cho async/await support
- Tất cả responses đều là JSON format
- Sử dụng transaction để đảm bảo data consistency khi tạo/cập nhật orders
- Các status hợp lệ: `pending`, `processing`, `completed`, `cancelled`

## 🔐 Security Tips

1. Không commit `.env` file (thêm vào `.gitignore`)
2. Sử dụng strong password cho MySQL
3. Validate input ở backend
4. Sử dụng HTTPS trong production
5. Implement authentication & authorization nếu cần

## 📞 Support

Nếu có vấn đề, kiểm tra:
- Console logs (terminal chạy server)
- MySQL connection settings
- Frontend fetch URLs
- CORS configuration
