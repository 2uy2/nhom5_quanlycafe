# Smart Cafe - Quản Lý Menu Quán Cà Phê

Dự án của nhánh `QuangHieu`: giao diện ReactJS và backend Express + MySQL cho chức năng **PB01 - Quản lý menu**.

## Chức năng đã làm

- Hiển thị danh sách món trong menu.
- Thêm món mới.
- Cập nhật tên món, giá, mô tả, danh mục, hình ảnh, trạng thái.
- Xóa món.
- Xem chi tiết món.
- Lưu dữ liệu menu trong MySQL.

## Công nghệ sử dụng

- Frontend: ReactJS, Vite, CSS.
- Backend: NodeJS, ExpressJS.
- Database: MySQL.
- Công cụ database đang dùng: XAMPP + HeidiSQL.

## Cấu trúc thư mục

```text
nhom5_quanlycafe/
├── FE/                 # Giao diện ReactJS
├── BE/                 # Backend Express + MySQL
├── README.md
└── .gitignore
```

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
