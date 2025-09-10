import express from "express";
import Product from "../models/Product.js";

const router = express.Router();

// GET /api/products - list with optional search
router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    const filter = q ? { name: { $regex: q, $options: "i" } } : {};
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST /api/products - create
router.post("/", async (req, res) => {
  try {
    const { name, price, description, category } = req.body;
    if (!name || price === undefined) return res.status(400).json({ error: "name and price required" });
    const p = await Product.create({ name, price, description, category });
    res.status(201).json(p);
  } catch (err) {
    res.status(500).json({ error: "Failed to create product" });
  }
});

// PUT /api/products/:id - update
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update product" });
  }
});

// DELETE /api/products/:id - delete
router.delete("/:id", async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: "Product not found" });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

export default router;
