# Smart Cafe - Hệ Thống Quản Lý Quán Cà Phê Thông Minh

Website quản lý và tối ưu vận hành quán cà phê thông minh với đầy đủ chức năng từ quản lý menu, đơn hàng, bàn, khách hàng, nhân viên, kho nguyên liệu đến báo cáo thống kê cho quản trị viên.

## Mục Lục

- [Giới thiệu](#giới-thiệu)
- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cài đặt](#cài-đặt)
- [Cách chạy](#cách-chạy)
- [Tài khoản test](#tài-khoản-test)
- [Danh sách trang](#danh-sách-trang)
- [API Documentation](#api-documentation)
- [Dữ liệu mẫu](#dữ-liệu-mẫu)
- [Bảng màu](#bảng-màu)
- [Tính năng bảo mật](#tính-năng-bảo-mật)
- [Phát triển](#phát-triển)
- [Thành viên nhóm](#thành-viên-nhóm)

## Giới thiệu

**Smart Cafe** là hệ thống hỗ trợ quản lý và tối ưu vận hành quán cà phê. Dự án hướng đến việc số hóa các nghiệp vụ thường gặp trong quán như quản lý menu, đặt món, theo dõi đơn hàng, quản lý bàn, quản lý kho nguyên liệu, chăm sóc khách hàng và thống kê doanh thu.

Hệ thống được chia thành hai phần chính:

- **Frontend**: giao diện người dùng và giao diện quản trị.
- **Backend**: REST API xử lý dữ liệu, phân quyền, nghiệp vụ và kết nối database.

## Tính năng

### Khách hàng

- Xem danh sách món theo danh mục.
- Tìm kiếm món theo tên, mô tả hoặc danh mục.
- Xem chi tiết món với hình ảnh, giá bán, mô tả và trạng thái.
- Thêm món vào giỏ hàng.
- Cập nhật số lượng món trong giỏ hàng.
- Đặt hàng tại quán hoặc mang đi.
- Theo dõi trạng thái đơn hàng.
- Xem chương trình khuyến mãi.
- Tích điểm khách hàng thân thiết.
- Cập nhật thông tin cá nhân.

### Nhân viên

- Xem danh sách đơn hàng mới.
- Cập nhật trạng thái đơn hàng.
- Quản lý trạng thái bàn.
- Hỗ trợ tạo đơn tại quầy.
- Kiểm tra tình trạng món còn bán hoặc hết hàng.
- Ghi nhận thanh toán.

### Quản trị viên

- Dashboard thống kê doanh thu, đơn hàng, món bán chạy.
- Quản lý menu: thêm, sửa, xóa món; cập nhật giá và thông tin sản phẩm.
- Quản lý danh mục món.
- Quản lý đơn hàng.
- Quản lý bàn.
- Quản lý khách hàng.
- Quản lý nhân viên và phân quyền.
- Quản lý kho nguyên liệu.
- Quản lý khuyến mãi, voucher.
- Quản lý tích điểm khách hàng.
- Xem báo cáo doanh thu theo ngày, tháng, năm.
- Theo dõi hiệu suất vận hành quán.

## Công nghệ sử dụng

### Frontend

- **ReactJS** - Xây dựng giao diện người dùng.
- **Vite** - Công cụ build và chạy development server.
- **JavaScript ES6+** - Xử lý logic phía client.
- **CSS3** - Thiết kế giao diện responsive.
- **LocalStorage** - Lưu dữ liệu demo khi chưa kết nối backend.

### Backend

- **Node.js** - Môi trường chạy server.
- **Express.js** - Xây dựng REST API.
- **JWT** - Xác thực và phân quyền người dùng.
- **bcryptjs** - Mã hóa mật khẩu.
- **Multer** - Upload hình ảnh sản phẩm.

### Database

- **MySQL** - Lưu trữ dữ liệu hệ thống.
- **MySQL Workbench / phpMyAdmin** - Quản lý database trong quá trình phát triển.

### Tích hợp bên thứ ba

- **Cloudinary** - Lưu trữ hình ảnh món ăn, đồ uống.
- **Chart.js** - Hiển thị biểu đồ thống kê.
- **VNPay / Momo Sandbox** - Thanh toán online nếu triển khai thêm.

## Cấu trúc thư mục

```text
nhom5_quanlycafe/
├── FE/
│   ├── src/
│   │   ├── components/          # Component giao diện dùng chung
│   │   │   ├── Sidebar.jsx
│   │   │   ├── StatsStrip.jsx
│   │   │   ├── MenuForm.jsx
│   │   │   ├── MenuTable.jsx
│   │   │   ├── MenuPreview.jsx
│   │   │   └── DetailDrawer.jsx
│   │   ├── data/                # Dữ liệu mẫu cho giao diện
│   │   │   └── menuSeed.js
│   │   ├── services/            # Lớp xử lý dữ liệu phía frontend
│   │   │   └── menuStore.js
│   │   ├── utils/               # Hàm dùng chung
│   │   │   └── menuHelpers.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── BE/
│   ├── config/                  # Cấu hình database, upload, env
│   │   └── db.js
│   ├── controllers/             # Xử lý logic nghiệp vụ
│   │   ├── authController.js
│   │   ├── menuController.js
│   │   ├── categoryController.js
│   │   ├── orderController.js
│   │   ├── tableController.js
│   │   ├── inventoryController.js
│   │   ├── customerController.js
│   │   ├── employeeController.js
│   │   └── dashboardController.js
│   ├── middlewares/             # Middleware xác thực, phân quyền, lỗi
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/                  # Model hoặc query database
│   │   ├── userModel.js
│   │   ├── menuModel.js
│   │   ├── orderModel.js
│   │   ├── tableModel.js
│   │   ├── inventoryModel.js
│   │   └── customerModel.js
│   ├── routes/                  # Khai báo API routes
│   │   ├── authRoutes.js
│   │   ├── menuRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── tableRoutes.js
│   │   ├── inventoryRoutes.js
│   │   ├── customerRoutes.js
│   │   ├── employeeRoutes.js
│   │   └── dashboardRoutes.js
│   ├── utils/                   # Helper function
│   │   └── generateToken.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── database/
│   ├── schema.sql               # Script tạo database
│   └── seed.sql                 # Dữ liệu mẫu
│
├── README.md
└── .gitignore
```

> Lưu ý: Cấu trúc trên là cấu trúc mục tiêu để nhóm hoàn thiện dần. Một số thư mục hoặc file có thể chưa có trong giai đoạn đầu.

## Cài đặt

### Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x
- **MySQL** >= 8.x
- **Git**

### Bước 1: Clone repository

```bash
git clone https://github.com/2uy2/nhom5_quanlycafe.git
cd nhom5_quanlycafe
```

### Bước 2: Chọn nhánh làm việc

```bash
git branch
git switch <ten-nhanh-cua-ban>
```

Ví dụ:

```bash
git switch QuangHieu
```

### Bước 3: Cài đặt frontend

```bash
cd FE
npm install
```

### Bước 4: Cài đặt backend

```bash
cd BE
npm install
```

### Bước 5: Cấu hình môi trường backend

Tạo file `.env` trong thư mục `BE/`:

```env
PORT=5000
NODE_ENV=development

# MySQL
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=smart_cafe

# JWT
JWT_SECRET=smart_cafe_secret_key
JWT_EXPIRE=7d

# Upload
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Cách chạy

### 1. Chạy frontend

```bash
cd FE
npm run dev
```

Mở trình duyệt và truy cập:

```text
http://localhost:5173
```

### 2. Tạo database MySQL

```sql
CREATE DATABASE smart_cafe CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Sau đó import file:

```text
database/schema.sql
database/seed.sql
```

### 3. Chạy backend

```bash
cd BE
npm run dev
```

Backend chạy tại:

```text
http://localhost:5000
```

### 4. Kiểm tra API

```text
http://localhost:5000/api
```

## Tài khoản test

### Admin

```text
Email:    admin@smartcafe.vn
Mật khẩu: admin123
Vai trò:  Quản trị viên
```

### Nhân viên

```text
Email:    staff@smartcafe.vn
Mật khẩu: staff123
Vai trò:  Nhân viên
```

### Khách hàng

```text
Email:    user@smartcafe.vn
Mật khẩu: user123
Vai trò:  Khách hàng
```

## Danh sách trang

### Trang khách hàng

| Trang | URL |
|---|---|
| Trang chủ | `/` |
| Đăng nhập | `/login` |
| Đăng ký | `/register` |
| Danh sách menu | `/menu` |
| Chi tiết món | `/menu/:id` |
| Giỏ hàng | `/cart` |
| Đặt hàng | `/checkout` |
| Theo dõi đơn hàng | `/orders` |
| Tích điểm | `/loyalty` |
| Hồ sơ cá nhân | `/profile` |

### Trang nhân viên

| Trang | URL |
|---|---|
| Màn hình đơn hàng | `/staff/orders` |
| Tạo đơn tại quầy | `/staff/create-order` |
| Quản lý bàn | `/staff/tables` |
| Thanh toán | `/staff/payment` |

### Trang Admin

| Trang | URL |
|---|---|
| Dashboard | `/admin/dashboard` |
| Quản lý menu | `/admin/menu` |
| Quản lý danh mục | `/admin/categories` |
| Quản lý đơn hàng | `/admin/orders` |
| Quản lý bàn | `/admin/tables` |
| Quản lý khách hàng | `/admin/customers` |
| Quản lý nhân viên | `/admin/employees` |
| Quản lý kho | `/admin/inventory` |
| Quản lý khuyến mãi | `/admin/promotions` |
| Báo cáo thống kê | `/admin/reports` |

## API Documentation

Base URL:

```text
http://localhost:5000/api
```

### Authentication

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/auth/register` | Đăng ký tài khoản | - |
| POST | `/auth/login` | Đăng nhập | - |
| POST | `/auth/logout` | Đăng xuất | User |
| GET | `/auth/profile` | Xem hồ sơ | User |
| PUT | `/auth/profile` | Cập nhật hồ sơ | User |
| PUT | `/auth/change-password` | Đổi mật khẩu | User |

### Menu

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/menu` | Lấy danh sách món | - |
| GET | `/menu/:id` | Xem chi tiết món | - |
| POST | `/menu` | Thêm món mới | Admin |
| PUT | `/menu/:id` | Cập nhật món | Admin |
| DELETE | `/menu/:id` | Xóa món | Admin |
| PATCH | `/menu/:id/status` | Cập nhật trạng thái còn bán / hết hàng | Admin |

### Categories

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/categories` | Danh sách danh mục | - |
| POST | `/categories` | Thêm danh mục | Admin |
| PUT | `/categories/:id` | Sửa danh mục | Admin |
| DELETE | `/categories/:id` | Xóa danh mục | Admin |

### Orders

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| POST | `/orders` | Tạo đơn hàng | User |
| GET | `/orders/my-orders` | Đơn hàng của tôi | User |
| GET | `/orders/:id` | Chi tiết đơn hàng | User |
| PUT | `/orders/:id/cancel` | Hủy đơn hàng | User |
| GET | `/orders` | Tất cả đơn hàng | Staff/Admin |
| PUT | `/orders/:id/status` | Cập nhật trạng thái đơn hàng | Staff/Admin |

### Tables

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/tables` | Danh sách bàn | Staff/Admin |
| POST | `/tables` | Thêm bàn | Admin |
| PUT | `/tables/:id` | Cập nhật thông tin bàn | Admin |
| PATCH | `/tables/:id/status` | Cập nhật trạng thái bàn | Staff/Admin |
| DELETE | `/tables/:id` | Xóa bàn | Admin |

### Inventory

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/inventory` | Danh sách nguyên liệu | Admin |
| POST | `/inventory` | Thêm nguyên liệu | Admin |
| PUT | `/inventory/:id` | Cập nhật nguyên liệu | Admin |
| PATCH | `/inventory/:id/stock` | Cập nhật tồn kho | Admin |
| DELETE | `/inventory/:id` | Xóa nguyên liệu | Admin |

### Customers

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/customers` | Danh sách khách hàng | Admin |
| GET | `/customers/:id` | Chi tiết khách hàng | Admin |
| PUT | `/customers/:id` | Cập nhật khách hàng | Admin |
| PATCH | `/customers/:id/points` | Cập nhật điểm tích lũy | Admin |

### Employees

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/employees` | Danh sách nhân viên | Admin |
| POST | `/employees` | Thêm nhân viên | Admin |
| PUT | `/employees/:id` | Cập nhật nhân viên | Admin |
| PATCH | `/employees/:id/status` | Khóa / mở tài khoản nhân viên | Admin |
| DELETE | `/employees/:id` | Xóa nhân viên | Admin |

### Promotions

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/promotions` | Danh sách khuyến mãi | - |
| POST | `/promotions` | Tạo khuyến mãi | Admin |
| PUT | `/promotions/:id` | Cập nhật khuyến mãi | Admin |
| DELETE | `/promotions/:id` | Xóa khuyến mãi | Admin |

### Dashboard

| Method | Endpoint | Mô tả | Auth |
|---|---|---|---|
| GET | `/dashboard/stats` | Thống kê tổng quan | Admin |
| GET | `/dashboard/revenue` | Thống kê doanh thu | Admin |
| GET | `/dashboard/top-products` | Món bán chạy | Admin |
| GET | `/dashboard/orders` | Thống kê đơn hàng | Admin |

## Dữ liệu mẫu

Sau khi chạy seed database, hệ thống có thể có:

- **3 tài khoản test**: admin, nhân viên, khách hàng.
- **5 danh mục**: Cà phê, trà, đá xay, bánh ngọt, đồ ăn nhẹ.
- **15 món mẫu** với hình ảnh, giá bán, mô tả.
- **10 bàn** với trạng thái trống, đang sử dụng, đã đặt.
- **20 đơn hàng mẫu**.
- **10 nguyên liệu kho**.
- **5 mã khuyến mãi**.

## Bảng màu

| Tên | Mã |
|---|---|
| Primary | `#E44D37` |
| Primary Hover | `#C93E2C` |
| Primary Light | `#FFE7E2` |
| Accent Green | `#0F7D6C` |
| Dark Green | `#16362F` |
| Text Dark | `#17211F` |
| Text Gray | `#66736F` |
| Background | `#F5F7F4` |
| Background Light | `#FFFFFF` |
| Border | `#DCE6E0` |
| Success | `#10B981` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |

## Tính năng bảo mật

- Mật khẩu được hash bằng **bcryptjs**.
- Xác thực người dùng bằng **JWT token**.
- Phân quyền theo vai trò: khách hàng, nhân viên, admin.
- Middleware bảo vệ API cần đăng nhập.
- Middleware kiểm tra quyền admin.
- Validate dữ liệu đầu vào trước khi lưu database.
- Không commit file `.env` lên GitHub.
- Chặn upload file không hợp lệ.
- Xử lý lỗi tập trung để không lộ thông tin hệ thống.

## Phát triển

### Scripts frontend

```bash
npm run dev       # Chạy frontend ở môi trường development
npm run build     # Build frontend production
npm run preview   # Xem bản build production
```

### Scripts backend

```bash
npm run dev       # Chạy backend với nodemon
npm start         # Chạy backend production
npm run seed      # Seed dữ liệu mẫu
```

### Quy ước branch

Mỗi thành viên làm trên một nhánh riêng:

```bash
git switch -c TenThanhVien
git add .
git commit -m "Mo ta thay doi"
git push origin TenThanhVien
```

Không push code cá nhân trực tiếp lên `main` khi chưa thống nhất với nhóm.

### Quy ước code

- Text giao diện dùng tiếng Việt có dấu.
- Tên biến, tên hàm dùng tiếng Anh.
- Tên file dùng kebab-case hoặc camelCase theo loại file.
- Component React dùng PascalCase.
- API endpoint dùng danh từ số nhiều.
- Commit message ngắn gọn, mô tả đúng thay đổi.

### Tiến độ thực hiện

| Mã | Chức năng | Người thực hiện | Trạng thái |
|---|---|---|---|
| PB01 | Quản lý menu | Lê Ngô Quang Hiếu | Đang thực hiện |
| PB02 | Quản lý đơn hàng | Cập nhật sau | Chưa thực hiện |
| PB03 | Quản lý bàn | Cập nhật sau | Chưa thực hiện |
| PB04 | Quản lý khách hàng | Cập nhật sau | Chưa thực hiện |
| PB05 | Tích điểm khách hàng | Cập nhật sau | Đang thực hiện |
| PB06 | Quản lý kho | Cập nhật sau | Chưa thực hiện |
| PB07 | Báo cáo thống kê | Cập nhật sau | Chưa thực hiện |

## Thành viên nhóm

| Họ tên | Nhánh | Chức năng phụ trách |
|---|---|---|
| Lê Ngô Quang Hiếu | `QuangHieu` | Quản lý menu |
| Thành viên cập nhật sau | `Quang-Hoa` | Cập nhật sau |
| Thành viên cập nhật sau | `feature/TichDiemKhachHang` | Tích điểm khách hàng |

## License

Dự án phục vụ mục đích học tập.
