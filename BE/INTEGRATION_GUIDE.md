# 🔗 Frontend-Backend Integration Guide

## 📋 Mục Lục
1. [Chuẩn Bị](#chuẩn-bị)
2. [Cập Nhật Order Service](#cập-nhật-order-service)
3. [Test Integration](#test-integration)
4. [Troubleshooting](#troubleshooting)

---

## 🎯 Chuẩn Bị

### Bước 1: Khởi Động Backend
```bash
# Terminal 1 - Backend
cd BE
npm install
npm run dev
```

Chờ đến khi thấy:
```
✅ Database connected successfully!
✅ Database schema initialized successfully!
Server running at: http://localhost:5000
```

### Bước 2: Chuẩn Bị Frontend

```bash
# Terminal 2 - Frontend (chưa chạy npm start)
cd FE
npm install
```

---

## 🔄 Cập Nhật Order Service

### Vị Trí File
📁 Đường dẫn: `FE/src/services/orderService.js`

### Hiện Tại (Mock Data)
File hiện tại sử dụng mock data từ localStorage:
```javascript
import { getAllOrders, ... } from './mockDataService';
```

### Mới (Backend API)
Thay thế toàn bộ nội dung `orderService.js`:

```javascript
// Service for handling API calls related to orders
// Connected to Node.js + Express backend

const API_BASE_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }
  return response.json();
};

// Fetch all orders
export const getOrders = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`);
    const data = await handleResponse(response);
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error in getOrders:', error);
    throw error;
  }
};

// Fetch single order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`);
    const data = await handleResponse(response);
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch order');
    }
    return data.data;
  } catch (error) {
    console.error('Error in getOrderById:', error);
    throw error;
  }
};

// Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    const data = await handleResponse(response);
    if (!data.success) {
      throw new Error(data.message || 'Failed to create order');
    }
    return data.data;
  } catch (error) {
    console.error('Error in createOrder:', error);
    throw error;
  }
};

// Update existing order
export const updateOrder = async (orderId, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });
    const data = await handleResponse(response);
    if (!data.success) {
      throw new Error(data.message || 'Failed to update order');
    }
    return data.data;
  } catch (error) {
    console.error('Error in updateOrder:', error);
    throw error;
  }
};

// Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'DELETE',
    });
    const data = await handleResponse(response);
    if (!data.success) {
      throw new Error(data.message || 'Failed to cancel order');
    }
    return data.data;
  } catch (error) {
    console.error('Error in cancelOrder:', error);
    throw error;
  }
};

// Get orders by status
export const getOrdersByStatus = async (status) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/status/${status}`);
    const data = await handleResponse(response);
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch orders');
    }
    return data.data;
  } catch (error) {
    console.error('Error in getOrdersByStatus:', error);
    throw error;
  }
};

// Get order statistics
export const getStatistics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/stats/overview`);
    const data = await handleResponse(response);
    if (!data.success) {
      throw new Error(data.message || 'Failed to fetch statistics');
    }
    return data.data;
  } catch (error) {
    console.error('Error in getStatistics:', error);
    throw error;
  }
};

// Delete/cancel order
export const deleteOrder = async (orderId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      method: 'DELETE',
    });
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Error in deleteOrder:', error);
    throw error;
  }
};
```

---

## 🧪 Test Integration

### Bước 1: Khởi Động Frontend
```bash
# Terminal 2
cd FE
npm start
```

Ứng dụng sẽ mở ở `http://localhost:3000`

### Bước 2: Test Chức Năng

#### ✅ Test 1: Xem Danh Sách Đơn Hàng
1. Mở `http://localhost:3000`
2. Nên thấy danh sách đơn hàng đang trống (hoặc có nếu có dữ liệu cũ)
3. Mở DevTools (F12) → Console → không có lỗi CORS

#### ✅ Test 2: Tạo Đơn Hàng Mới
1. Nhấp "➕ Tạo Đơn Hàng"
2. Điền:
   - Tên khách: "Test Nguyễn"
   - Chọn sản phẩm: "Cà Phê Đen"
   - Số lượng: 2
3. Nhấp "Tạo Đơn Hàng"
4. ✅ Nên quay lại danh sách và thấy đơn hàng mới
5. Mở Database:
   - MySQL Workbench → coffee_shop_db → orders table
   - Nên thấy dòng dữ liệu mới

#### ✅ Test 3: Xem Chi Tiết
1. Nhấp "Xem Chi Tiết" trên đơn hàng
2. Modal mở ra với thông tin đầy đủ

#### ✅ Test 4: Chỉnh Sửa
1. Từ chi tiết, nhấp "Chỉnh Sửa Đơn Hàng"
2. Thêm sản phẩm hoặc đổi trạng thái
3. Nhấp "Cập Nhật"
4. ✅ Dữ liệu cập nhật trong database

#### ✅ Test 5: Xoá/Hủy
1. Từ danh sách, nhấp "Hủy Đơn Hàng"
2. ✅ Đơn hàng biến mất hoặc đánh dấu là cancelled

### Bước 3: Kiểm Tra Network

1. Mở DevTools (F12)
2. Tab "Network"
3. Tạo đơn hàng mới
4. Nên thấy request:
   - Method: `POST`
   - URL: `http://localhost:5000/api/orders`
   - Status: `201` (Created)

---

## 🔄 So Sánh: Mock Data vs Backend

| Tính Năng | Mock Data | Backend |
|-----------|-----------|---------|
| Dữ liệu lưu ở đâu | localStorage (trình duyệt) | MySQL Database |
| Dữ liệu khi close browser | Mất (nếu clear cache) | Giữ lại |
| Tốc độ | Cực nhanh (local) | Nhanh (cần network) |
| Dùng cho | Development/Demo | Production |
| Multiple users | Không (data tách biệt) | Có (shared database) |

---

## 🔐 Environment Variables

Nếu muốn thay đổi URL backend, sửa trong `FE/src/services/orderService.js`:

```javascript
// Hiện tại
const API_BASE_URL = 'http://localhost:5000/api';

// Production (ví dụ)
const API_BASE_URL = 'https://api.mycoffee.com/api';
```

Hoặc tạo `.env` file trong FE:
```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

Rồi sử dụng:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';
```

---

## ⚠️ Troubleshooting

### Error: CORS - "Access to XMLHttpRequest blocked"

**Nguyên Nhân:** Backend CORS config sai

**Giải Pháp:** Kiểm tra `BE/server.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000',  // Phải là URL frontend
  credentials: true,
}));
```

### Error: "Network request failed"

**Nguyên Nhân:** Backend không chạy

**Giải Pháp:**
```bash
# Kiểm tra backend chạy ở port 5000
http://localhost:5000/health

# Nếu lỗi, khởi động backend
cd BE
npm run dev
```

### Error: "Order created but not showing in list"

**Nguyên Nhân:** Frontend không refresh list sau create

**Giải Pháp:** Kiểm tra `OrderContext.js` gọi `getOrders()` sau create

### Frontend thấy dữ liệu cũ

**Giải Pháp:**
1. Xóa localStorage: DevTools → Application → Local Storage → xóa
2. Refresh browser (Ctrl+F5 - hard refresh)
3. Hoặc reset database (xem SETUP_GUIDE.md)

---

## 📊 Monitoring

### 1. Xem Backend Logs
```bash
# Terminal chạy backend (BE)
# Sẽ thấy tất cả requests
[POST] /api/orders
[GET] /api/orders
[PUT] /api/orders/:orderId
```

### 2. Xem Frontend Requests
```
DevTools (F12) → Network tab
Mỗi khi tạo/sửa/xóa đơn hàng
```

### 3. Xem Database
```
MySQL Workbench → coffee_shop_db
Thấy tất cả dữ liệu real-time
```

---

## ✨ Best Practices

1. **Kiểm tra Response:**
   ```javascript
   console.log(data); // Xem format response
   ```

2. **Error Handling:**
   ```javascript
   try {
     const order = await getOrderById(id);
   } catch (error) {
     console.error('Failed:', error.message);
   }
   ```

3. **Loading State:**
   ```javascript
   const [loading, setLoading] = useState(false);
   
   setLoading(true);
   const orders = await getOrders();
   setLoading(false);
   ```

4. **Validation ở Frontend:**
   ```javascript
   if (!customerName || !items.length) {
     throw new Error('Missing required fields');
   }
   ```

---

## 📝 Checklist

- [ ] Backend chạy ở `localhost:5000`
- [ ] Database `coffee_shop_db` được tạo
- [ ] Cập nhật `orderService.js` với code mới
- [ ] Frontend khởi động ở `localhost:3000`
- [ ] Tạo đơn hàng mới thành công
- [ ] Dữ liệu lưu trong MySQL database
- [ ] Edit/delete orders hoạt động
- [ ] Kiểm tra logs backend (DevTools Network)

---

## 📞 Tiếp Theo

- ✅ Tất cả tests pass?
- → Triển khai production
- → Thêm authentication
- → Thêm payment gateway
- → Thêm real-time notifications
