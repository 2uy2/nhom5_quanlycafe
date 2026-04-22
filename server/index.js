const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dữ liệu tạm (sau này thay bằng DB)
let items = [];
let idCounter = 1;

// GET all
app.get("/items", (req, res) => {
    res.json(items);
});

// POST create
app.post("/items", (req, res) => {
    const item = {
        id: idCounter++,
        name: req.body.name,
        qty: Number(req.body.qty),
        unit: req.body.unit
    };
    items.push(item);
    res.json(item);
});

// PUT update
app.put("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = items.findIndex(x => x.id === id);

    if (index === -1) return res.status(404).json({ message: "Not found" });

    items[index] = {
        id,
        name: req.body.name,
        qty: Number(req.body.qty),
        unit: req.body.unit
    };

    res.json(items[index]);
});

// DELETE
app.delete("/items/:id", (req, res) => {
    const id = Number(req.params.id);
    items = items.filter(x => x.id !== id);
    res.json({ message: "Deleted" });
});

app.listen(3000, () => {
    console.log("Server: http://localhost:3000");
});