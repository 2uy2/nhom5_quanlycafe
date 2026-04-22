# Backend - Quản Lý Menu

Backend Express + MySQL đơn giản cho chức năng quản lý menu.

## Chức năng đã thêm

- Kết nối MySQL bằng file `.env`.
- Tạo database `smart_cafe`.
- Tạo bảng `menu_items`.
- Thêm dữ liệu mẫu cho menu.
- Kiểm tra trạng thái backend và kết nối database.
- Lấy danh sách món.
- Xem chi tiết món theo `id`.
- Thêm món mới.
- Cập nhật thông tin món.
- Xóa món.
- Kiểm tra dữ liệu đầu vào cơ bản.
- Trả thông báo lỗi khi thao tác không hợp lệ.

## Cấu trúc thư mục BE

```text
BE/
|-- database/
|   `-- schema.sql              # File SQL tạo database, bảng và dữ liệu mẫu
|-- src/
|   |-- config/
|   |   `-- db.js               # Cấu hình kết nối MySQL
|   |-- controllers/
|   |   `-- menuController.js   # Logic xử lý API menu
|   |-- routes/
|   |   `-- menuRoutes.js       # Định nghĩa đường dẫn API
|   |-- scripts/
|   |   `-- setupDatabase.js    # Script tạo database bằng npm run db:setup
|   `-- server.js               # File khởi động server Express
|-- .env.example                # File mẫu cấu hình MySQL
|-- package.json                # Danh sách thư viện và lệnh chạy
|-- package-lock.json
`-- README.md
```

Ghi chú: file `.env` có mật khẩu MySQL nên chỉ để ở máy cá nhân, không đưa lên GitHub.

## Cấu hình MySQL

File `.env`:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=smart_cafe
```

## Tạo database

Mở XAMPP và bật MySQL, sau đó chạy:

```bash
npm install
npm run db:setup
```

Script sẽ tạo database `smart_cafe`, bảng `menu_items` và dữ liệu mẫu.

Nếu muốn import thủ công, dùng file:

```text
BE/database/schema.sql
```

## Chạy backend

```bash
npm run dev
```

Backend chạy tại:

```text
http://localhost:5000
```

## API

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/health` | Kiểm tra kết nối MySQL |
| GET | `/api/menu` | Lấy danh sách món |
| GET | `/api/menu/:id` | Xem chi tiết món |
| POST | `/api/menu` | Thêm món |
| PUT | `/api/menu/:id` | Cập nhật món |
| DELETE | `/api/menu/:id` | Xóa món |
