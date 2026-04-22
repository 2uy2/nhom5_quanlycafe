# 🚀 Quick Start - Backend

## ⚡ Cài Đặt Nhanh (5 phút)

### Bước 1: Cài Đặt Dependencies
```bash
cd BE
npm install
```

### Bước 2: Tạo Database (MySQL)

**Option A: Sử dụng Command Line**
```bash
mysql -u root -p
CREATE DATABASE coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
exit
```

**Option B: Sử dụng MySQL Workbench**
1. Mở MySQL Workbench
2. Kết nối MySQL
3. Chuột phải trên Schemas → Create Schema
4. Name: `coffee_shop_db`
5. Charset: `utf8mb4`
6. Collation: `utf8mb4_unicode_ci`
7. Apply

### Bước 3: Cấu Hình .env (nếu cần)

Mở `BE/.env` và đảm bảo cấu hình đúng:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          # Để trống nếu không có password
DB_NAME=coffee_shop_db
DB_PORT=3306
```

### Bước 4: Khởi Động Server
```bash
npm run dev
```

✅ Nếu thấy:
```
✅ Database connected successfully!
✅ Database schema initialized successfully!
Server running at: http://localhost:5000
```

**👉 Backend đã sẵn sàng!**

---

## 🧪 Test Nhanh

### 1. Mở Browser hoặc Postman
```
http://localhost:5000/health
```

Sẽ trả về:
```json
{
  "status": "ok",
  "timestamp": "2024-04-15T10:30:00.000Z"
}
```

### 2. Xem API Documentation
```
http://localhost:5000/api
```

### 3. Test Tạo Đơn Hàng (sử dụng cURL)
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test User",
    "customerPhone": "0123456789",
    "items": [
      {"productName": "Cà Phê Đen", "quantity": 1, "price": 25000}
    ]
  }'
```

---

## 🔗 Kết Nối Frontend

Sửa file `FE/src/services/orderService.js`:

**Thay đổi từ:**
```javascript
// sử dụng mock data
import { getAllOrders, ... } from './mockDataService';
```

**Thành:**
```javascript
const API_BASE_URL = 'http://localhost:5000/api';

export const getOrders = async () => {
  const response = await fetch(`${API_BASE_URL}/orders`);
  const data = await response.json();
  return data.success ? data.data : [];
};

export const createOrder = async (orderData) => {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  return response.json();
};

// ... tương tự cho các hàm khác
```

---

## 📁 Cấu Trúc Thư Mục

```
BE/
├── config/          → MySQL connection
├── controllers/     → API logic
├── models/          → Database operations
├── routes/          → API endpoints
├── middleware/      → Error handling
├── database/        → Schema
├── .env             → Configuration
├── server.js        → Main server
└── package.json
```

---

## ❌ Gặp Vấn Đề?

| Lỗi | Giải Pháp |
|-----|----------|
| "ECONNREFUSED" | MySQL không chạy → `net start MySQL80` (Windows) hoặc `brew services start mysql` (macOS) |
| "ER_ACCESS_DENIED" | Sai password → Kiểm tra `.env` |
| "ER_BAD_DB_ERROR" | Database không tồn tại → Tạo database |

Xem [SETUP_GUIDE.md](SETUP_GUIDE.md) để chi tiết.

---

## 📚 Tài Liệu

- **[README.md](README.md)** - Hướng dẫn chi tiết
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Chi tiết tất cả endpoints
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Cấu hình database

---

## 💡 Mẹo

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm start

# Kiểm tra logs
# Mở MySQL Workbench để xem dữ liệu

# Xem tất cả orders
# http://localhost:5000/api/orders

# Xem thống kê
# http://localhost:5000/api/orders/stats/overview
```

---

## ✨ Bước Tiếp Theo

1. ✅ Backend chạy? → Khởi động frontend: `npm start` (folder FE)
2. ✅ Frontend chạy? → Test tạo đơn hàng trong ứng dụng
3. ✅ Kiểm tra database: MySQL Workbench → coffee_shop_db → orders table
4. ✅ Hoàn tất! 🎉
