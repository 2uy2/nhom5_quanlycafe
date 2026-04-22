# Smart Cafe - Quản Lý Menu Quán Cà Phê

Dự án của nhánh `QuangHieu`: giao diện ReactJS và backend Express + MySQL cho chức năng **PB01 - Quản lý menu**.

## Chức năng đã làm

- Hiển thị danh sách món trong menu.
- Thêm món mới.
- Cập nhật tên món, giá, mô tả, danh mục, hình ảnh, trạng thái.
- Xóa món.
- Xem chi tiết món.
- Lưu dữ liệu menu trong MySQL.

## Chức năng backend đã thêm

Backend trong thư mục `BE` được làm đơn giản để phục vụ phần giao diện quản lý menu:

- Kết nối MySQL bằng thông tin trong file `.env`.
- Tạo database `smart_cafe` và bảng `menu_items`.
- Thêm sẵn một số món mẫu để frontend có dữ liệu hiển thị.
- API kiểm tra kết nối database.
- API lấy danh sách món.
- API xem chi tiết một món.
- API thêm món mới.
- API cập nhật thông tin món.
- API xóa món.
- Kiểm tra dữ liệu đầu vào cơ bản như tên món, giá, danh mục và trạng thái.
- Trả thông báo lỗi nếu thiếu dữ liệu hoặc không tìm thấy món.

## Công nghệ sử dụng

- Frontend: ReactJS, Vite, CSS.
- Backend: NodeJS, ExpressJS.
- Database: MySQL.
- Công cụ database đang dùng: XAMPP + HeidiSQL.

## Cấu trúc thư mục

```text
nhom5_quanlycafe/
|-- BE/
|   |-- database/
|   |   `-- schema.sql              # File SQL tạo database, bảng và dữ liệu mẫu
|   |-- src/
|   |   |-- config/
|   |   |   `-- db.js               # Cấu hình kết nối MySQL
|   |   |-- controllers/
|   |   |   `-- menuController.js   # Xử lý logic thêm, sửa, xóa, lấy món
|   |   |-- routes/
|   |   |   `-- menuRoutes.js       # Khai báo các API /api/menu
|   |   |-- scripts/
|   |   |   `-- setupDatabase.js    # Script tạo database bằng npm run db:setup
|   |   `-- server.js               # File chạy server Express
|   |-- .env.example                # Mẫu cấu hình biến môi trường
|   |-- package.json                # Lệnh chạy và thư viện backend
|   |-- package-lock.json
|   `-- README.md                   # Hướng dẫn riêng cho backend
|-- FE/
|   |-- src/
|   |   |-- components/
|   |   |   |-- DetailDrawer.jsx     # Khung xem chi tiết món
|   |   |   |-- MenuForm.jsx         # Form thêm và cập nhật món
|   |   |   |-- MenuPreview.jsx      # Khu vực xem trước món đang chọn
|   |   |   |-- MenuTable.jsx        # Bảng danh sách món
|   |   |   |-- Sidebar.jsx          # Thanh menu bên trái
|   |   |   `-- StatsStrip.jsx       # Các ô thống kê nhanh
|   |   |-- data/
|   |   |   `-- menuSeed.js          # Dữ liệu mẫu dự phòng cho frontend
|   |   |-- services/
|   |   |   `-- menuStore.js         # Hàm gọi API backend
|   |   |-- utils/
|   |   |   `-- menuHelpers.js       # Hàm xử lý định dạng tiền, trạng thái
|   |   |-- App.jsx                  # Giao diện chính
|   |   |-- main.jsx                 # Điểm khởi chạy React
|   |   `-- styles.css              # CSS toàn bộ giao diện
|   |-- index.html
|   |-- package.json                # Lệnh chạy và thư viện frontend
|   |-- package-lock.json
|   |-- README.md                   # Hướng dẫn riêng cho frontend
|   `-- vite.config.js              # Cấu hình Vite và proxy API
|-- .gitignore
`-- README.md
```

Ghi chú: `node_modules/`, `dist/` và file `.env` không đưa lên GitHub nên không liệt kê trong cây thư mục.

## Cấu hình MySQL

Thông tin kết nối đang dùng:

```text
Connection name: CSDL Cafe
Server Address: localhost
Port: 3306
Database: smart_cafe
Username: root
Password: 123456
```

File cấu hình backend:

```text
BE/.env
```

Nội dung:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=smart_cafe
```

## Cách chạy backend

Mở XAMPP và bật MySQL trước.

Sau đó mở terminal:

```bash
cd BE
npm install
npm run db:setup
npm run dev
```

Backend chạy tại:

```text
http://localhost:5000
```

Link kiểm tra:

```text
http://localhost:5000/api/health
http://localhost:5000/api/menu
```

## Cách chạy frontend

Mở thêm terminal thứ hai:

```bash
cd FE
npm install
npm run dev
```

Giao diện chạy tại:

```text
http://localhost:5173
```

Lưu ý:

- `localhost:5000` là backend API nên sẽ hiện JSON hoặc trang thông báo backend.
- `localhost:5173` mới là giao diện ReactJS.

## API đã làm

| Method | Endpoint | Chức năng |
|---|---|---|
| GET | `/api/health` | Kiểm tra kết nối MySQL |
| GET | `/api/menu` | Lấy danh sách món |
| GET | `/api/menu/:id` | Lấy chi tiết món |
| POST | `/api/menu` | Thêm món |
| PUT | `/api/menu/:id` | Cập nhật món |
| DELETE | `/api/menu/:id` | Xóa món |

## Người thực hiện

| Họ tên | Mã chức năng | Tên chức năng |
|---|---|---|
| Lê Ngô Quang Hiếu | PB01 | Quản lý menu |
