# cafe-payment-backend — PB03

Backend Node.js xử lý **thanh toán & in hóa đơn** cho hệ thống quản lý quán cà phê.  
Tác giả: Nguyễn Như Nguyên

---

## Cấu trúc thư mục

```
cafe-payment-backend/
├── index.js                        # Entry point
├── .env.example                    # Mẫu biến môi trường
├── src/
│   ├── config/
│   │   └── db.js                   # Kết nối MySQL pool
│   ├── controllers/
│   │   └── paymentController.js    # Toàn bộ business logic
│   ├── routes/
│   │   └── paymentRoutes.js        # Định nghĩa endpoints
│   └── middlewares/
│       └── errorHandler.js         # Xử lý lỗi tập trung
└── sql/
    └── (schema đã có ở file chung)
```

---

## Cài đặt & chạy

```bash
# 1. Clone repo
git clone https://github.com/<your-username>/cafe-payment-backend.git
cd cafe-payment-backend

# 2. Cài dependencies
npm install

# 3. Tạo file .env từ mẫu
cp .env.example .env
# Mở .env và điền thông tin DB + VietQR

# 4. Chạy dev (hot-reload)
npm run dev

# 5. Hoặc chạy production
npm start
```

---

## Biến môi trường (.env)

| Biến               | Mô tả                                         |
|--------------------|-----------------------------------------------|
| `PORT`             | Port server (default: 3000)                   |
| `DB_HOST`          | Host MySQL                                    |
| `DB_PORT`          | Port MySQL (default: 3306)                    |
| `DB_USER`          | Username MySQL                                |
| `DB_PASSWORD`      | Password MySQL                                |
| `DB_NAME`          | Tên database (`cafe_management`)              |
| `VIETQR_CLIENT_ID` | Client ID từ https://vietqr.io/               |
| `VIETQR_API_KEY`   | API Key từ VietQR                             |
| `BANK_BIN`         | BIN ngân hàng (vd: 970422 = MB Bank)          |
| `ACCOUNT_NUMBER`   | Số tài khoản nhận tiền                        |
| `ACCOUNT_NAME`     | Tên chủ tài khoản                             |

---

## API Endpoints

Base URL: `http://localhost:3000/api/payments`

### 1. Lấy chi tiết đơn hàng
```
GET /orders/:orderId
```
Trả về thông tin đơn hàng + danh sách món để hiển thị trước khi thanh toán.

**Response:**
```json
{
  "order": { "id": 5, "table_number": "A1", "final_amount": 85000, ... },
  "items": [{ "product_name": "Cà phê sữa", "quantity": 2, "subtotal": 50000 }]
}
```

---

### 2. Sinh mã QR VietQR
```
GET /qr/:orderId
```
Gọi VietQR API và trả về ảnh QR + thông tin chuyển khoản.

**Response:**
```json
{
  "qrDataURL": "data:image/png;base64,...",
  "amount": 85000,
  "accountNo": "1234567890",
  "accountName": "QUAN CAFE ABC",
  "description": "Thanh toan don #5"
}
```

---

### 3. Xử lý thanh toán ⭐
```
POST /process
Content-Type: application/json
```
**Body:**
```json
{
  "orderId": 5,
  "method": "cash",
  "amountPaid": 100000
}
```
`method`: `"cash"` | `"transfer"` | `"ewallet"`

**Response thành công:**
```json
{
  "message": "Thanh toán thành công.",
  "paymentId": 12,
  "orderId": 5,
  "method": "cash",
  "finalAmount": 85000,
  "amountPaid": 100000,
  "changeGiven": 15000,
  "paidAt": "2025-06-01T10:30:00.000Z"
}
```

**Lỗi tiền không đủ:**
```json
{ "message": "Số tiền đưa (50.000đ) không đủ. Cần tối thiểu 85.000đ." }
```

---

### 4. Lấy hóa đơn để in
```
GET /bill/:paymentId
```
Trả về snapshot JSON hóa đơn tại thời điểm thanh toán.

**Response:**
```json
{
  "paymentId": 12,
  "billContent": {
    "cafe_name": "QUAN CAFE ABC",
    "order_id": 5,
    "table_number": "A1",
    "items": [...],
    "total_amount": 90000,
    "discount_amount": 5000,
    "final_amount": 85000,
    "method": "cash",
    "amount_paid": 100000,
    "change_given": 15000,
    "paid_at": "2025-06-01T10:30:00.000Z"
  },
  "issuedAt": "2025-06-01T10:30:01.000Z"
}
```

---

### 5. Lịch sử thanh toán
```
GET /history?page=1&limit=20
```

---

## Luồng xử lý chính (`POST /process`)

```
Nhận request
    ↓
Validate input (orderId, method, amountPaid)
    ↓
Mở transaction MySQL
    ↓
Kiểm tra đơn hàng (status = 'completed', FOR UPDATE)
    ↓
[cash] Kiểm tra amountPaid >= finalAmount
    ↓
INSERT payments → lấy paymentId
    ↓
Tạo billSnapshot JSON (tên món, giá, giảm giá, ...)
    ↓
INSERT bill_logs (snapshot tĩnh)
    ↓
UPDATE orders.status → 'completed'
    ↓
UPDATE cafe_tables.status → 'empty'
    ↓
COMMIT → trả về kết quả
```

---

## Hướng dẫn Git từ A đến Z

### A. Lần đầu — push code lên GitHub

```bash
# 1. Khởi tạo Git trong thư mục dự án
cd cafe-payment-backend
git init

# 2. Thêm tất cả file (trừ những gì trong .gitignore)
git add .

# 3. Commit đầu tiên
git commit -m "feat: init PB03 payment backend"

# 4. Tạo repo trên GitHub
#    → Vào github.com → New repository → đặt tên "cafe-payment-backend"
#    → KHÔNG tick "Add README" (vì đã có sẵn)
#    → Copy URL repo (dạng: https://github.com/ten-ban/cafe-payment-backend.git)

# 5. Kết nối local với remote
git remote add origin https://github.com/<ten-ban>/cafe-payment-backend.git

# 6. Đặt branch chính là main
git branch -M main

# 7. Push lên GitHub
git push -u origin main
```

---

### B. Các lần sau — khi có thay đổi

```bash
# Kiểm tra file nào đã thay đổi
git status

# Thêm file muốn commit (hoặc dùng . để thêm tất cả)
git add src/controllers/paymentController.js
# hoặc
git add .

# Commit với message mô tả rõ
git commit -m "fix: validate tiền mặt khi thanh toán"

# Push lên GitHub
git push
```

---

### C. Làm việc nhóm — tạo branch riêng

```bash
# Tạo branch mới từ main
git checkout -b feature/payment-pb03

# Làm việc, commit như bình thường...
git add .
git commit -m "feat: thêm endpoint sinh QR VietQR"

# Push branch lên GitHub
git push -u origin feature/payment-pb03

# Vào GitHub → tạo Pull Request → để nhóm review → Merge vào main
```

---

### D. Kéo code từ GitHub về máy (clone lần đầu)

```bash
# Clone toàn bộ repo
git clone https://github.com/<ten-ban>/cafe-payment-backend.git
cd cafe-payment-backend

# Cài dependencies
npm install

# Tạo .env từ mẫu
cp .env.example .env
# Điền thông tin DB và VietQR vào .env

# Chạy
npm run dev
```

---

### E. Cập nhật code mới nhất từ GitHub (khi làm nhóm)

```bash
# Kéo về và merge với code local
git pull origin main
```

---

### F. Các lệnh Git hay dùng khác

```bash
# Xem lịch sử commit
git log --oneline

# Hoàn tác thay đổi chưa add
git checkout -- ten-file.js

# Hoàn tác lần add cuối (chưa commit)
git reset HEAD ten-file.js

# Xem khác biệt trước khi commit
git diff
```

---

## Ghi chú bảo mật

- **Không commit file `.env`** — file này đã có trong `.gitignore`
- Chỉ commit `.env.example` (không chứa thông tin thật)
- API Key VietQR và password DB chỉ lưu trong `.env` trên máy mỗi người
