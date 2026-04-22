// ================================
// BACKEND PB04 - NODEJS + EXPRESS + MYSQL
// ================================

// ---------- FILE: package.json ----------
{
  "name": "pb04-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.9.0",
    "cors": "^2.8.5",
    "dotenv": "^16.4.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}

// ---------- FILE: .env ----------
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=coffee_db

// ---------- FILE: config/db.js ----------
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

export const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// ---------- FILE: models/tableModel.js ----------
import { db } from "../config/db.js";

export const getTables = async () => {
  const [rows] = await db.query("SELECT * FROM tables");
  return rows;
};

export const updateTableStatus = async (code, status) => {
  await db.query("UPDATE tables SET status=? WHERE code=?", [status, code]);
};

// ---------- FILE: models/orderModel.js ----------
import { db } from "../config/db.js";

export const createOrder = async (tableCode) => {
  const [result] = await db.query(
    "INSERT INTO orders (table_code, status) VALUES (?, 'active')",
    [tableCode]
  );
  return result.insertId;
};

// ---------- FILE: controllers/tableController.js ----------
import * as Table from "../models/tableModel.js";

export const getAllTables = async (req, res) => {
  const data = await Table.getTables();
  res.json(data);
};

export const changeStatus = async (req, res) => {
  const { code, status } = req.body;
  await Table.updateTableStatus(code, status);
  res.json({ message: "Updated" });
};

// ---------- FILE: controllers/orderController.js ----------
import * as Order from "../models/orderModel.js";
import * as Table from "../models/tableModel.js";

export const assignOrder = async (req, res) => {
  const { tableCode } = req.body;
  const orderId = await Order.createOrder(tableCode);
  await Table.updateTableStatus(tableCode, "Đang sử dụng");
  res.json({ orderId });
};

// ---------- FILE: routes/tableRoutes.js ----------
import express from "express";
import { getAllTables, changeStatus } from "../controllers/tableController.js";

const router = express.Router();

router.get("/", getAllTables);
router.put("/status", changeStatus);

export default router;

// ---------- FILE: routes/orderRoutes.js ----------
import express from "express";
import { assignOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/assign", assignOrder);

export default router;

// ---------- FILE: server.js ----------
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tableRoutes from "./routes/tableRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Backend PB04 running...");
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

// ---------- FILE: database.sql ----------
CREATE DATABASE coffee_db;
USE coffee_db;

CREATE TABLE tables (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10),
  seats INT,
  status VARCHAR(50)
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  table_code VARCHAR(10),
  status VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tables (code, seats, status) VALUES
('B01',2,'Trống'),
('B02',4,'Đang sử dụng'),
('B03',6,'Trống'),
('B04',2,'Trống');
