CREATE DATABASE IF NOT EXISTS `smart_cafe`
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE `smart_cafe`;

CREATE TABLE IF NOT EXISTS `menu_items` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `description` TEXT,
  `image_url` VARCHAR(500),
  `status` VARCHAR(20) NOT NULL DEFAULT 'available',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DELETE FROM `menu_items`
WHERE `name` IN (
  'Cold Brew Cam Vàng',
  'Latte Hạt Dẻ',
  'Bánh Mì Gà Xốt Nấm'
);

INSERT INTO `menu_items`
  (`name`, `price`, `category`, `description`, `image_url`, `status`)
VALUES
  (
    'Cold Brew Cam Vàng',
    59000,
    'Đồ uống',
    'Cà phê ủ lạnh kết hợp cam vàng, hậu vị tươi và nhẹ.',
    'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80',
    'available'
  ),
  (
    'Latte Hạt Dẻ',
    65000,
    'Đồ uống',
    'Espresso, sữa tươi và syrup hạt dẻ cho ca làm việc dài.',
    'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80',
    'available'
  ),
  (
    'Bánh Mì Gà Xốt Nấm',
    49000,
    'Đồ ăn',
    'Bánh mì nóng, gà xé, nấm áp chảo và xốt đặc trưng.',
    'https://images.unsplash.com/photo-1606755962773-d324e9a13086?auto=format&fit=crop&w=900&q=80',
    'available'
  );
