import "dotenv/config";
import mysql from "mysql2/promise";

export const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "smart_cafe",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(dbConfig);

export async function testConnection() {
  const connection = await pool.getConnection();
  try {
    await connection.query("SELECT 1");
    return true;
  } finally {
    connection.release();
  }
}
