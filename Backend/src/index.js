const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const seedPermissions = require("./seed");
const { normalizeAccountPasswords } = require("./utils/accountPassword");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/TinCoffeeDB";

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/employees", require("./routes/employeeRoutes"));

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected successfully.");

    try {
      await seedPermissions();
      const normalizedCount = await normalizeAccountPasswords();

      if (normalizedCount > 0) {
        console.log(`Đã chuẩn hóa ${normalizedCount} mật khẩu tài khoản về dạng PIN 4 số.`);
      }
    } catch (seedError) {
      console.error("Lỗi khi khởi tạo dữ liệu:", seedError.message);
    }

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  });
