HỆ THỐNG QUẢN LÝ ĐƠN HÀNG QUÁN CAFE THÔNG MINH
📌 Giới Thiệu

Đây là hệ thống web Fullstack giúp quản lý đơn hàng cho quán cafe, được xây dựng với:

Frontend: React.js
Backend: Node.js + Express
Database: MySQL

Hệ thống hỗ trợ tạo – cập nhật – hủy đơn hàng và theo dõi trạng thái xử lý theo thời gian thực, phù hợp cho mô hình quán cafe hiện đại.

✨ Tính Năng Chính
1. 📋 Quản Lý Đơn Hàng
➕ Tạo đơn hàng (nhập khách hàng, chọn sản phẩm, tính tiền tự động)
✏️ Cập nhật đơn (sửa thông tin, thêm/xóa sản phẩm)
❌ Hủy đơn hàng (xác nhận 2 bước)
📄 Xem danh sách đơn (lọc, tìm kiếm, sắp xếp)
2. 📊 Theo Dõi Trạng Thái

Các trạng thái đơn hàng:

🕐 Pending – Đang chờ xử lý
👨‍🍳 Processing – Đang chế biến
✅ Completed – Đã hoàn thành
❌ Cancelled – Đã hủy

Chức năng:

Thống kê tổng đơn hàng
Tổng doanh thu
Biểu đồ phân bố trạng thái
Danh sách đơn gần đây
3. 🎯 Chức Năng Phụ
🔍 Lọc đơn theo trạng thái
🔃 Sắp xếp theo ngày / giá
⚡ Tìm kiếm nhanh sản phẩm
📝 Ghi chú đơn hàng
⏱️ Hiển thị thời gian tạo/cập nhật
🏗️ Kiến Trúc Hệ Thống
Frontend (React)
        ↓ API (HTTP - Fetch)
Backend (Node.js + Express)
        ↓
Database (MySQL)
💻 Công Nghệ Sử Dụng
Frontend
React 18
React Context API
CSS3
Fetch API
Backend
Node.js
Express.js
MySQL (mysql2/promise)
dotenv
🚀 Cài Đặt & Chạy Dự Án
1. Clone Project
git clone <your-repo>
cd coffee_shop_order_management
2. Chạy Backend
cd BE
npm install

Tạo file .env:

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=coffee_shop_db
DB_PORT=3306

Tạo database:

CREATE DATABASE coffee_shop_db;

Chạy server:

npm run dev

👉 API chạy tại:
http://localhost:5000

3. Chạy Frontend
cd FE
npm install
npm start

👉 Web chạy tại:
http://localhost:3000

🔌 API Endpoints
📥 Orders
Method	Endpoint	Mô tả
GET	/api/orders	Lấy danh sách đơn
GET	/api/orders/:id	Chi tiết đơn
POST	/api/orders	Tạo đơn
PUT	/api/orders/:id	Cập nhật
DELETE	/api/orders/:id	Hủy đơn
📊 Thống Kê
GET /api/orders/stats/overview
❤️ Health Check
GET /health
🗄️ Database Schema
orders
id
customerName
customerPhone
totalPrice
status
notes
createdAt
updatedAt
order_items
id
orderId
productName
quantity
price
subtotal
🔗 Kết Nối Frontend ↔ Backend

Cập nhật file:

FE/src/services/orderService.js
const API_BASE_URL = 'http://localhost:5000/api';
🧪 Test API
Postman
Test CRUD API dễ dàng
cURL
curl http://localhost:5000/api/orders
🐛 Xử Lý Lỗi
Lỗi	Nguyên nhân	Cách xử lý
ECONNREFUSED	MySQL chưa chạy	Start MySQL
ACCESS_DENIED	Sai password	Kiểm tra .env
BAD_DB_ERROR	Chưa tạo DB	Tạo database
CORS error	Sai URL FE	Kiểm tra config
🔐 Bảo Mật
Validate dữ liệu (FE + BE)
Không lưu thông tin nhạy cảm
Không commit .env
Xác nhận khi xóa dữ liệu
📈 Hướng Phát Triển
🔐 Login / phân quyền (JWT)
📦 CRUD sản phẩm
📊 Dashboard nâng cao
🔔 Realtime (WebSocket)
🖨️ In hóa đơn (PDF)
🖼️ Hình ảnh sản phẩm
