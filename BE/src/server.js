import "dotenv/config";
import cors from "cors";
import express from "express";
import { testConnection } from "./config/db.js";
import menuRoutes from "./routes/menuRoutes.js";

const app = express();
const port = Number(process.env.PORT || 5000);

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send(`
    <h1>Smart Cafe Backend đang chạy</h1>
    <p>Đây là server API, không phải giao diện.</p>
    <ul>
      <li>Giao diện React: <a href="http://localhost:5173">http://localhost:5173</a></li>
      <li>Kiểm tra database: <a href="/api/health">/api/health</a></li>
      <li>Danh sách menu: <a href="/api/menu">/api/menu</a></li>
    </ul>
  `);
});

app.get("/api/health", async (_req, res, next) => {
  try {
    await testConnection();
    res.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    next(error);
  }
});

app.use("/api/menu", menuRoutes);

app.use((req, res) => {
  res.status(404).json({
    message: `Không tìm thấy route ${req.method} ${req.originalUrl}`,
  });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    message: "Lỗi server.",
    error: process.env.NODE_ENV === "production" ? undefined : error.message,
  });
});

app.listen(port, () => {
  console.log(`Smart Cafe Backend chạy tại http://localhost:${port}`);
});
