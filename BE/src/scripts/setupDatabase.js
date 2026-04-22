import "dotenv/config";
import mysql from "mysql2/promise";

const databaseName = process.env.DB_NAME || "smart_cafe";

const serverConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  multipleStatements: true,
};

const seedItems = [
  {
    name: "Cold Brew Cam Vàng",
    price: 59000,
    category: "Đồ uống",
    description: "Cà phê ủ lạnh kết hợp cam vàng, hậu vị tươi và nhẹ.",
    imageUrl:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    status: "available",
  },
  {
    name: "Latte Hạt Dẻ",
    price: 65000,
    category: "Đồ uống",
    description: "Espresso, sữa tươi và syrup hạt dẻ cho ca làm việc dài.",
    imageUrl:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=900&q=80",
    status: "available",
  },
  {
    name: "Bánh Mì Gà Xốt Nấm",
    price: 49000,
    category: "Đồ ăn",
    description: "Bánh mì nóng, gà xé, nấm áp chảo và xốt đặc trưng.",
    imageUrl:
      "https://images.unsplash.com/photo-1606755962773-d324e9a13086?auto=format&fit=crop&w=900&q=80",
    status: "available",
  },
];

async function setupDatabase() {
  let connection;

  try {
    connection = await mysql.createConnection(serverConfig);

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${databaseName}\`
       CHARACTER SET utf8mb4
       COLLATE utf8mb4_unicode_ci`
    );

    await connection.query(`USE \`${databaseName}\``);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS menu_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(150) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        description TEXT,
        image_url VARCHAR(500),
        status ENUM('available', 'sold_out') NOT NULL DEFAULT 'available',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    const [countRows] = await connection.query("SELECT COUNT(*) AS total FROM menu_items");

    if (countRows[0].total === 0) {
      await connection.query(
        `INSERT INTO menu_items (name, price, category, description, image_url, status)
         VALUES ?`,
        [
          seedItems.map((item) => [
            item.name,
            item.price,
            item.category,
            item.description,
            item.imageUrl,
            item.status,
          ]),
        ]
      );
    }

    console.log(`Database "${databaseName}" đã sẵn sàng.`);
    console.log("Bảng menu_items đã được tạo.");
    console.log("Dữ liệu mẫu đã được kiểm tra.");
  } catch (error) {
    console.error("Không thể tạo database MySQL.");
    console.error({
      message: error.message,
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
    });
    process.exitCode = 1;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupDatabase();
