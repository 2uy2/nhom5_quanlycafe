# 🗄️ Database Setup Guide - Hướng Dẫn Cấu Hình Database

## 📋 Mục Lục
1. [Windows Setup](#windows-setup)
2. [macOS Setup](#macos-setup)
3. [Linux Setup](#linux-setup)
4. [Xác Minh Cài Đặt](#xác-minh-cài-đặt)
5. [Troubleshooting](#troubleshooting)

---

## 🪟 Windows Setup

### 1. Cài Đặt MySQL Server

#### Option A: MySQL Server (Recommended)
1. **Tải MySQL Community Server** từ [mysql.com](https://dev.mysql.com/downloads/mysql/)
2. **Chạy installer** và chọn:
   - Setup Type: "Developer Default"
   - MySQL Server (Port: 3306)
   - MySQL Workbench
3. **Configuration:**
   - Config Type: Development Machine
   - MySQL Port: 3306
   - MySQL Root Password: Ghi nhớ password này!
4. **Hoàn tất cài đặt**

#### Option B: XAMPP (Đơn Giản Hơn)
1. **Tải XAMPP** từ [apachefriends.org](https://www.apachefriends.org/)
2. **Chạy installer**
3. **Mở Control Panel:**
   - Nhấp "Start" cạnh Apache
   - Nhấp "Start" cạnh MySQL
4. **MySQL sẵn sàng** với user `root` và password rỗng

### 2. Tạo Database

**Cách 1: Sử dụng MySQL Workbench**
1. Mở MySQL Workbench
2. Kết nối đến MySQL server (double-click kết nối)
3. Mở tab "Query 1" (File > New Query Tab hoặc Ctrl+T)
4. Copy-paste lệnh dưới:
```sql
CREATE DATABASE IF NOT EXISTS coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
5. Nhấp "Execute" (Ctrl+Shift+Enter) hoặc nhấp nút ▶️ play

**Cách 2: Sử dụng Command Prompt**
```bash
# Mở Command Prompt
# Dẫn tới thư mục MySQL (ví dụ)
cd "C:\Program Files\MySQL\MySQL Server 8.0\bin"

# Kết nối tới MySQL
mysql -u root -p

# Nhập password (nếu có)

# Trong MySQL prompt, chạy:
CREATE DATABASE IF NOT EXISTS coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

# Thoát
exit
```

### 3. Cấu Hình .env

Mở file `BE/.env` và cập nhật:

```env
# Windows + MySQL (XAMPP)
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=coffee_shop_db
DB_PORT=3306

# Hoặc nếu cài MySQL Server với password
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password_here
DB_NAME=coffee_shop_db
DB_PORT=3306
```

---

## 🍎 macOS Setup

### 1. Cài Đặt MySQL (Homebrew)

```bash
# Cài Homebrew (nếu chưa có)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Cài MySQL
brew install mysql

# Khởi động MySQL service
brew services start mysql

# Tạo default user (tuỳ chọn)
mysql_secure_installation
```

### 2. Tạo Database

```bash
# Kết nối tới MySQL (không có password)
mysql -u root

# Hoặc với password
mysql -u root -p

# Chạy lệnh:
CREATE DATABASE IF NOT EXISTS coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Cấu Hình .env

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=coffee_shop_db
DB_PORT=3306
```

---

## 🐧 Linux Setup

### 1. Cài Đặt MySQL (Ubuntu/Debian)

```bash
# Cập nhật package list
sudo apt update

# Cài MySQL Server
sudo apt install mysql-server

# Khởi động MySQL
sudo systemctl start mysql

# Enable tự động khởi động (tuỳ chọn)
sudo systemctl enable mysql
```

### 2. Tạo Database

```bash
# Kết nối với sudo
sudo mysql

# Hoặc kết nối bình thường
mysql -u root

# Chạy lệnh:
CREATE DATABASE IF NOT EXISTS coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Cấu Hình .env

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=coffee_shop_db
DB_PORT=3306
```

---

## ✅ Xác Minh Cài Đặt

### 1. Kiểm Tra MySQL Chạy

**Windows (Command Prompt):**
```bash
# Kiểm tra port 3306 có mở không
netstat -an | findstr 3306
```

**macOS/Linux (Terminal):**
```bash
# Kiểm tra port 3306 có mở không
lsof -i :3306

# Hoặc kiểm tra MySQL service
sudo systemctl status mysql
```

### 2. Test Kết Nối

```bash
# Kiểm tra kết nối MySQL
mysql -h localhost -u root -p

# Nếu kế nối được, chạy:
SHOW DATABASES;

# Bạn sẽ thấy:
# - information_schema
# - mysql
# - performance_schema
# - sys
# - coffee_shop_db (database mới tạo)

exit
```

### 3. Test Backend Connection

```bash
# Từ thư mục BE
npm run dev

# Bạn sẽ thấy output:
# ✅ Database connected successfully!
# ✅ Database schema initialized successfully!
```

---

## 🐛 Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:3306"

**Nguyên Nhân:** MySQL server không chạy

**Giải Pháp:**

**Windows:**
```bash
# Mở Command Prompt as Administrator
net start MySQL80

# Nếu không biết version:
sc query | findstr MySQL
# Sau đó khởi động service tương ứng
```

**macOS (Homebrew):**
```bash
brew services start mysql
```

**Linux:**
```bash
sudo systemctl start mysql
```

---

### Error: "ER_ACCESS_DENIED_FOR_USER 'root'@'localhost'"

**Nguyên Nhân:** Username/password sai

**Giải Pháp:**
1. Kiểm tra lại `.env` file
2. Test kết nối MySQL trực tiếp:
   ```bash
   mysql -u root -p
   ```
3. Đảm bảo password đúng (có thể để trống nếu không đặt password)

---

### Error: "ER_BAD_DB_ERROR"

**Nguyên Nhân:** Database không tồn tại

**Giải Pháp:**
1. Tạo database thủ công:
   ```bash
   mysql -u root -p
   CREATE DATABASE coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```
2. Khởi động lại backend

---

### Error: "Can't create database"

**Nguyên Nhân:** User không có quyền CREATE

**Giải Pháp:**
```bash
mysql -u root -p

# Cấp quyền
GRANT ALL PRIVILEGES ON coffee_shop_db.* TO 'root'@'localhost';
FLUSH PRIVILEGES;
```

---

### Port 3306 Đã Được Sử Dụng

**Nguyên Nhân:** MySQL server khác đang chạy trên port 3306

**Giải Pháp:**

**Windows:**
```bash
# Tìm process dùng port 3306
netstat -ano | findstr :3306

# Tìm PID (Process ID) ở cột cuối cùng
# Rồi kill process đó
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Tìm process
lsof -i :3306

# Kill process
kill -9 <PID>
```

---

### MySQL Workbench Không Kết Nối

**Giải Pháp:**
1. Mở MySQL Workbench
2. Click "+" để tạo connection mới
3. Cấu Hình:
   - **Connection Name:** Local
   - **Hostname:** 127.0.0.1
   - **Port:** 3306
   - **Username:** root
   - **Password:** [để trống hoặc nhập password]
4. Click "Test Connection"
5. Nếu OK, click "Save and connect"

---

## 📚 Database Schema Details

Sau khi backend chạy, nó sẽ tự tạo các bảng:

### `orders` Table
```sql
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(20) PRIMARY KEY,
  customerName VARCHAR(255) NOT NULL,
  customerPhone VARCHAR(20) NOT NULL,
  totalPrice DECIMAL(10, 2) NOT NULL,
  status ENUM('pending', 'processing', 'completed', 'cancelled') DEFAULT 'pending',
  notes TEXT,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

### `order_items` Table
```sql
CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  orderId VARCHAR(20) NOT NULL,
  productName VARCHAR(255) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (orderId) REFERENCES orders(id) ON DELETE CASCADE,
  INDEX idx_orderId (orderId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
```

---

## 🔐 Reset Database

Nếu muốn xóa tất cả dữ liệu và bắt đầu lại:

```bash
mysql -u root -p

# Xóa database cũ
DROP DATABASE coffee_shop_db;

# Tạo lại database
CREATE DATABASE coffee_shop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

exit
```

Rồi khởi động lại backend (`npm run dev`), nó sẽ tạo schema mới.

---

## 📊 Xem Dữ Liệu Database

**Sử dụng MySQL Workbench:**
1. Khai triển database `coffee_shop_db`
2. Mở tables `orders` và `order_items`
3. Click nút "Table Data" để xem dữ liệu

**Sử dụng Command Line:**
```bash
mysql -u root -p

USE coffee_shop_db;

# Xem tất cả đơn hàng
SELECT * FROM orders;

# Xem tất cả items
SELECT * FROM order_items;

# Xem chi tiết một order
SELECT o.*, COUNT(oi.id) as itemCount 
FROM orders o 
LEFT JOIN order_items oi ON o.id = oi.orderId 
GROUP BY o.id;
```

---

## 💡 Tips

1. **Sử dụng MySQL Workbench:** Dễ dàng quản lý database với GUI
2. **Backup dữ liệu:**
   ```bash
   mysqldump -u root -p coffee_shop_db > backup.sql
   ```
3. **Restore dữ liệu:**
   ```bash
   mysql -u root -p coffee_shop_db < backup.sql
   ```
4. **UTF8 Encoding:** Luôn dùng `utf8mb4` để hỗ trợ emoji và ký tự đặc biệt

---

## ✨ Bước Tiếp Theo

Sau khi cấu Hình xong database:

1. ✅ Chạy backend: `npm run dev` (folder BE)
2. ✅ Chạy frontend: `npm start` (folder FE)
3. ✅ Test API từ Postman hoặc browser
4. ✅ Kết nối frontend với backend (xem README.md)
