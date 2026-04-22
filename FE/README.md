# Frontend - Quản Lý Menu

Giao diện ReactJS cho chức năng quản lý menu quán cà phê.

## Chức năng giao diện

- Hiển thị danh sách món trong menu.
- Tìm kiếm món theo tên hoặc danh mục.
- Lọc món theo danh mục.
- Thêm món mới.
- Cập nhật thông tin món.
- Xóa món.
- Xem chi tiết món.
- Hiển thị thống kê nhanh cho menu.
- Gọi backend qua `/api/menu`.

## Cấu trúc thư mục FE

```text
FE/
|-- src/
|   |-- components/
|   |   |-- DetailDrawer.jsx     # Khung xem chi tiết món
|   |   |-- MenuForm.jsx         # Form thêm và cập nhật món
|   |   |-- MenuPreview.jsx      # Khu vực xem trước món đang chọn
|   |   |-- MenuTable.jsx        # Bảng danh sách món
|   |   |-- Sidebar.jsx          # Thanh menu bên trái
|   |   `-- StatsStrip.jsx       # Thống kê nhanh
|   |-- data/
|   |   `-- menuSeed.js          # Dữ liệu mẫu dự phòng
|   |-- services/
|   |   `-- menuStore.js         # Hàm gọi API backend
|   |-- utils/
|   |   `-- menuHelpers.js       # Hàm hỗ trợ định dạng dữ liệu
|   |-- App.jsx                  # Giao diện chính
|   |-- main.jsx                 # Điểm khởi chạy React
|   `-- styles.css              # CSS giao diện
|-- index.html
|-- package.json                # Danh sách thư viện và lệnh chạy
|-- package-lock.json
|-- README.md
`-- vite.config.js              # Cấu hình Vite và proxy API
```

Ghi chú: `node_modules/` và `dist/` không cần đưa lên GitHub.

## Chạy frontend

```bash
npm install
npm run dev
```

Mở trình duyệt:

```text
http://localhost:5173
```

## Ghi chú

- Frontend gọi backend qua `/api/menu`.
- Cần chạy backend ở `http://localhost:5000` trước khi thao tác thêm, sửa, xóa món.
- Nếu chỉ mở `localhost:5000` thì sẽ thấy backend API, không phải giao diện.
