# Backend - Quản Lý Menu

Backend Express + MySQL đơn giản cho chức năng quản lý menu.

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
