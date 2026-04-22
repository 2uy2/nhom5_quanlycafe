# Smart Cafe Backend

Backend đơn giản cho nhánh `QuangHieu`, dùng Express và MySQL để quản lý menu.

## Cài đặt

```bash
cd BE
npm install
```

## Cấu hình MySQL

Sửa file `.env` nếu MySQL của bạn không dùng tài khoản `root` hoặc có mật khẩu:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=smart_cafe
```

## Tạo database và dữ liệu mẫu

```bash
npm run db:setup
```

Script này sẽ tạo database `smart_cafe`, bảng `menu_items` và thêm vài món mẫu.

Nếu muốn import thủ công bằng MySQL Workbench hoặc phpMyAdmin, dùng file:

```text
BE/database/schema.sql
```

## Chạy server

```bash
npm run dev
```

API chạy tại:

```text
http://localhost:5000
```

## API đơn giản

| Method | Endpoint | Mô tả |
|---|---|---|
| GET | `/api/health` | Kiểm tra server |
| GET | `/api/menu` | Lấy danh sách món |
| GET | `/api/menu/:id` | Xem chi tiết món |
| POST | `/api/menu` | Thêm món |
| PUT | `/api/menu/:id` | Cập nhật món |
| DELETE | `/api/menu/:id` | Xóa món |
