# API Integration Guide
# Hướng Dẫn Kết Nối API Backend

## Mô Tả Hiện Tại
- Hiện tại ứng dụng sử dụng **localStorage** và **mock data** để lưu trữ dữ liệu
- Dữ liệu chỉ được lưu trong trình duyệt, sẽ bị xóa khi clear cache

## Chuẩn Bị Kết Nối Backend

### 1. Cấu Trúc API Yêu Cầu

Bạn cần xây dựng backend với các endpoint sau:

#### GET /api/orders
- Lấy danh sách tất cả đơn hàng
- Response:
```json
[
  {
    "id": "ORD-2024-001",
    "customerName": "Nguyễn Văn A",
    "customerPhone": "0912345678",
    "items": [
      {
        "productName": "Cà Phê Đen",
        "quantity": 2,
        "price": 25000
      }
    ],
    "totalPrice": 50000,
    "status": "pending",
    "notes": "Không đường",
    "createdAt": "2024-04-15T10:30:00Z",
    "updatedAt": "2024-04-15T10:30:00Z"
  }
]
```

#### POST /api/orders
- Tạo đơn hàng mới
- Request:
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
  "totalPrice": 50000,
  "notes": "Không đường"
}
```
- Response: Trả về object order như trên với id và timestamps

#### GET /api/orders/:id
- Lấy chi tiết một đơn hàng
- Response: Order object

#### PUT /api/orders/:id
- Cập nhật đơn hàng
- Request: Gửi các field cần cập nhật
- Response: Order object đã cập nhật

#### DELETE /api/orders/:id
- Hủy đơn hàng (soft delete - chỉ thay đổi status thành "cancelled")
- Response: Status 200 OK

### 2. Cập Nhật orderService.js

Mở file `src/services/orderService.js` và thay đổi:

```javascript
// Thay từ
import { ... } from './mockDataService';

// Sang
const API_URL = 'http://localhost:5000/api/orders'; // Thay bằng URL backend của bạn

export const getOrders = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return await response.json();
  } catch (error) {
    console.error('Error in getOrders:', error);
    throw error;
  }
};

// Tương tự cho các hàm khác...
```

### 3. Xử Lý CORS

Nếu backend chạy trên domain khác, cấu hình CORS trên backend:

```javascript
// Node.js/Express example
const cors = require('cors');
app.use(cors());

// Hoặc cấu hình cụ thể
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

### 4. Authentication (Tùy Chọn)

Nếu cần xác thực, thêm header:

```javascript
export const getOrders = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch(API_URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return await response.json();
};
```

## Các Công Cụ Backend Được Đề Xuất

### Option 1: Node.js + Express
```bash
npm init -y
npm install express cors body-parser mongoose
```

### Option 2: Django + DRF
```bash
pip install django djangorestframework django-cors-headers
```

### Option 3: Python + Flask
```bash
pip install flask flask-cors
```

### Option 4: Firebase/Firestore
Không cần backend, sử dụng Firebase console trực tiếp

## Các Bước Thực Hiện

### Bước 1: Chuẩn Bị Backend
1. Tạo project backend
2. Xây dựng các endpoint theo spec trên
3. Kiểm tra CORS settings

### Bước 2: Kiểm Tra API
```bash
# Test GET
curl http://localhost:5000/api/orders

# Test POST
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{"customerName":"Test","items":[],"totalPrice":0}'
```

### Bước 3: Cập Nhật Frontend
1. Mở `src/services/orderService.js`
2. Thay đổi `API_URL` thành URL backend
3. Happs toàn bộ code mock data nếu không cần

### Bước 4: Test Integration
1. Khởi động backend
2. Khởi động React app (`npm start`)
3. Test các tính năng (Create, Read, Update, Delete)

## Debugging Tips

### 1. Xem Network Requests
1. Mở DevTools (F12)
2. Vào tab Network
3. Xem request/response

### 2. Xem Console Errors
```javascript
// Thêm dòng này để log debugging
console.log('Fetching orders from:', API_URL);
```

### 3. Kiểm Tra CORS Errors
- Error: "No 'Access-Control-Allow-Origin' header"
- Giải pháp: Cấu hình CORS trên backend

## Data Format Validation

Đảm bảo dữ liệu trả về khớp format:

```javascript
const validatedOrder = {
  id: String,                    // Required
  customerName: String,          // Required
  customerPhone: String,         // Optional
  items: Array[                  // Required
    {
      productName: String,       // Required
      quantity: Number,          // Required, > 0
      price: Number              // Required, >= 0
    }
  ],
  totalPrice: Number,            // Required, >= 0
  status: String,                // Required: 'pending', 'processing', 'completed', 'cancelled'
  notes: String,                 // Optional
  createdAt: String,             // ISO Date format
  updatedAt: String              // ISO Date format
};
```

## Tham Khảo Thêm

- [Fetch API Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [Express API Design](https://expressjs.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [CORS Explanation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

---

Sau khi hoàn thành các bước trên, ứng dụng sẽ lưu và truy cập dữ liệu từ backend persistent database.
