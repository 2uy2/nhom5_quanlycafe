import { pool } from "../config/db.js";

function normalizeMenuItem(row) {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    description: row.description,
    imageUrl: row.image_url,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function validateMenuPayload(payload) {
  const errors = [];

  if (!payload.name || !payload.name.trim()) {
    errors.push("Tên món không được để trống.");
  }

  if (!payload.price || Number(payload.price) <= 0) {
    errors.push("Giá món phải lớn hơn 0.");
  }

  if (!payload.category || !payload.category.trim()) {
    errors.push("Danh mục không được để trống.");
  }

  if (payload.status && !["available", "sold_out"].includes(payload.status)) {
    errors.push("Trạng thái chỉ nhận available hoặc sold_out.");
  }

  return errors;
}

export async function getMenuItems(_req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items ORDER BY updated_at DESC");
    res.json(rows.map(normalizeMenuItem));
  } catch (error) {
    next(error);
  }
}

export async function getMenuItemById(req, res, next) {
  try {
    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [req.params.id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy món." });
    }

    return res.json(normalizeMenuItem(rows[0]));
  } catch (error) {
    return next(error);
  }
}

export async function createMenuItem(req, res, next) {
  try {
    const errors = validateMenuPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ.", errors });
    }

    const { name, price, category, description = "", imageUrl = "", status = "available" } = req.body;
    const [result] = await pool.query(
      `INSERT INTO menu_items (name, price, category, description, image_url, status)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name.trim(), Number(price), category.trim(), description.trim(), imageUrl.trim(), status]
    );

    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [result.insertId]);
    return res.status(201).json(normalizeMenuItem(rows[0]));
  } catch (error) {
    return next(error);
  }
}

export async function updateMenuItem(req, res, next) {
  try {
    const errors = validateMenuPayload(req.body);

    if (errors.length > 0) {
      return res.status(400).json({ message: "Dữ liệu không hợp lệ.", errors });
    }

    const { name, price, category, description = "", imageUrl = "", status = "available" } = req.body;
    const [result] = await pool.query(
      `UPDATE menu_items
       SET name = ?, price = ?, category = ?, description = ?, image_url = ?, status = ?
       WHERE id = ?`,
      [name.trim(), Number(price), category.trim(), description.trim(), imageUrl.trim(), status, req.params.id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy món." });
    }

    const [rows] = await pool.query("SELECT * FROM menu_items WHERE id = ?", [req.params.id]);
    return res.json(normalizeMenuItem(rows[0]));
  } catch (error) {
    return next(error);
  }
}

export async function deleteMenuItem(req, res, next) {
  try {
    const [result] = await pool.query("DELETE FROM menu_items WHERE id = ?", [req.params.id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Không tìm thấy món." });
    }

    return res.json({ message: "Đã xóa món.", id: Number(req.params.id) });
  } catch (error) {
    return next(error);
  }
}
