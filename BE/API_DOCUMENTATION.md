# API Documentation - Chi Tiết Các Endpoint

## 📚 Danh Sách API Endpoints

### 1. Health Check
```
GET /health
```

**Mô tả:** Kiểm tra trạng thái server có đang chạy không

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-04-15T10:30:00.000Z"
}
```

---

### 2. API Documentation
```
GET /api
```

**Mô tả:** Xem danh sách tất cả endpoints

**Response:**
```json
{
  "name": "Coffee Shop Order Management API",
  "version": "1.0.0",
  "endpoints": {
    "orders": [...]
  }
}
```

---

## 🛒 Order Endpoints

### 3. Lấy Danh Sách Tất Cả Đơn Hàng
```
GET /api/orders
```

**Query Parameters (tuỳ chọn):**
| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `status` | string | Lọc theo trạng thái (pending, processing, completed, cancelled) |
| `customerName` | string | Tìm kiếm theo tên khách hàng (tìm kiếm mờ) |

**Ví dụ:**
```
GET /api/orders?status=pending
GET /api/orders?customerName=Nguyễn
GET /api/orders?status=processing&customerName=Nguyễn
```

**Response (Success - 200):**
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
      "items": [
        {
          "id": 1,
          "productName": "Cà Phê Đen",
          "quantity": 2,
          "price": 25000,
          "subtotal": 50000
        }
      ],
      "createdAt": "2024-04-15T10:30:00Z",
      "updatedAt": "2024-04-15T10:30:00Z"
    }
  ]
}
```

---

### 4. Lấy Chi Tiết Một Đơn Hàng
```
GET /api/orders/:orderId
```

**Path Parameters:**
| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `orderId` | string | ID của đơn hàng (ví dụ: ORD-2024-12345) |

**Ví dụ:**
```
GET /api/orders/ORD-2024-12345
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Order retrieved successfully",
  "data": {
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
}
```

**Response (Not Found - 404):**
```json
{
  "success": false,
  "message": "Order ORD-2024-99999 not found"
}
```

---

### 5. Tạo Đơn Hàng Mới
```
POST /api/orders
```

**Request Headers:**
```
Content-Type: application/json
```

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
    },
    {
      "productName": "Cappuccino",
      "quantity": 1,
      "price": 35000
    }
  ],
  "notes": "Không đường, thêm sữa"
}
```

**Validation Rules:**
| Field | Validation |
|-------|-----------|
| `customerName` | Bắt buộc, loại string |
| `customerPhone` | Bắt buộc, loại string |
| `items` | Bắt buộc, phải là array với ít nhất 1 item |
| `items[].productName` | Bắt buộc, loại string |
| `items[].quantity` | Bắt buộc, loại number, > 0 |
| `items[].price` | Bắt buộc, loại number, > 0 |
| `notes` | Tuỳ chọn, loại string |

**Response (Success - 201):**
```json
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": "ORD-2024-12345",
    "customerName": "Nguyễn Văn A",
    "customerPhone": "0912345678",
    "totalPrice": 85000,
    "status": "pending",
    "notes": "Không đường, thêm sữa",
    "items": [
      {
        "id": 1,
        "productName": "Cà Phê Đen",
        "quantity": 2,
        "price": 25000,
        "subtotal": 50000
      },
      {
        "id": 2,
        "productName": "Cappuccino",
        "quantity": 1,
        "price": 35000,
        "subtotal": 35000
      }
    ],
    "createdAt": "2024-04-15T10:30:00Z",
    "updatedAt": "2024-04-15T10:30:00Z"
  }
}
```

**Response (Bad Request - 400):**
```json
{
  "success": false,
  "message": "Customer name and phone are required"
}
```

---

### 6. Cập Nhật Đơn Hàng
```
PUT /api/orders/:orderId
```

**Path Parameters:**
| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `orderId` | string | ID của đơn hàng |

**Request Body (tất cả tuỳ chọn):**
```json
{
  "customerName": "Nguyễn Văn B",
  "customerPhone": "0987654321",
  "status": "processing",
  "items": [
    {
      "productName": "Cà Phê Đen",
      "quantity": 3,
      "price": 25000
    }
  ],
  "notes": "Ghi chú mới"
}
```

**Valid Status Values:**
- `pending` - Đang chờ xử lý
- `processing` - Đang chế biến
- `completed` - Đã hoàn thành
- `cancelled` - Đã hủy

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Order updated successfully",
  "data": {
    "id": "ORD-2024-12345",
    "customerName": "Nguyễn Văn B",
    "customerPhone": "0987654321",
    "totalPrice": 75000,
    "status": "processing",
    "notes": "Ghi chú mới",
    "items": [...],
    "createdAt": "2024-04-15T10:30:00Z",
    "updatedAt": "2024-04-15T11:00:00Z"
  }
}
```

---

### 7. Xoá/Hủy Đơn Hàng
```
DELETE /api/orders/:orderId
```

**Path Parameters:**
| Tham số | Kiểu | Mô tả |
|---------|------|-------|
| `orderId` | string | ID của đơn hàng |

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Order deleted successfully",
  "data": {
    "success": true,
    "message": "Order deleted successfully"
  }
}
```

---

### 8. Lấy Đơn Hàng Theo Trạng Thái
```
GET /api/orders/status/:status
```

**Path Parameters:**
| Tham số | Kiểu | Mô tả | Giá Trị Hợp Lệ |
|---------|------|-------|----------------|
| `status` | string | Trạng thái cần lọc | pending, processing, completed, cancelled |

**Ví dụ:**
```
GET /api/orders/status/pending
GET /api/orders/status/processing
GET /api/orders/status/completed
GET /api/orders/status/cancelled
```

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Orders with status \"pending\" retrieved successfully",
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

---

### 9. Lấy Thống Kê Đơn Hàng
```
GET /api/orders/stats/overview
```

**Mô tả:** Lấy thống kê tổng quan về đơn hàng (tổng đơn, doanh thu, v.v.)

**Response (Success - 200):**
```json
{
  "success": true,
  "message": "Statistics retrieved successfully",
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

---

## 🔄 Response Format

Tất cả API responses đều tuân theo format chung:

**Success (2xx):**
```json
{
  "success": true,
  "message": "Mô tả thành công",
  "data": { /* dữ liệu */ }
}
```

**Error (4xx, 5xx):**
```json
{
  "success": false,
  "message": "Mô tả lỗi",
  "error": "Chi tiết lỗi (development mode)"
}
```

---

## 📋 HTTP Status Codes

| Code | Meaning | Khi Sử Dụng |
|------|---------|-----------|
| 200 | OK | Request thành công |
| 201 | Created | Tạo resource thành công |
| 400 | Bad Request | Request không hợp lệ |
| 404 | Not Found | Resource không tìm thấy |
| 500 | Server Error | Lỗi server |

---

## 🧪 Testing Examples

### cURL Examples

**Lấy danh sách đơn hàng:**
```bash
curl http://localhost:5000/api/orders
```

**Tạo đơn hàng mới:**
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
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
  }'
```

**Cập nhật đơn hàng:**
```bash
curl -X PUT http://localhost:5000/api/orders/ORD-2024-12345 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "processing"
  }'
```

**Xoá đơn hàng:**
```bash
curl -X DELETE http://localhost:5000/api/orders/ORD-2024-12345
```

---

## ⚠️ Error Codes

### Validation Errors

| Message | HTTP Code | Nguyên Nhân |
|---------|-----------|-----------|
| Customer name and phone are required | 400 | Thiếu tên hoặc số điện thoại khách |
| At least one item is required | 400 | Đơn hàng phải có ít nhất 1 sản phẩm |
| Each item must have productName, quantity, and price | 400 | Item thiếu thông tin bắt buộc |
| Quantity and price must be greater than 0 | 400 | Số lượng hoặc giá <= 0 |
| Invalid status | 400 | Status không hợp lệ |
| Order not found | 404 | Không tìm thấy đơn hàng |

---

## 📞 Mặc Định Dữ Liệu

**Product Examples (nên có sẵn trong FE):**
- Cà Phê Đen: 25.000 VND
- Cappuccino: 35.000 VND
- Latte: 35.000 VND
- Mocha: 40.000 VND
- Iced Coffee: 30.000 VND

Backend không tồn trữ danh sách sản phẩm (product listing) - frontend quản lý danh sách sản phẩm có sẵn.
