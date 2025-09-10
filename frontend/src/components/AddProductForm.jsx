import { useState } from "react";

export default function AddProductForm({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "Others",
    description: ""
  });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || form.price === "") return alert("📛 Name & Price required");

    const productData = {
      ...form,
      price: Number(form.price)
    };

    onAdd(productData);
    setForm({ name: "", price: "", category: "Others", description: "" });
  };

  return (
    <form onSubmit={submit} className="sidebar form polished-form">
      {/* Removed h3 heading */}

      <div className="form-group">
        <label>📦 Product Name</label>
        <input
          placeholder="Enter product name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>💲 Price</label>
        <input
          type="number"
          placeholder="Enter price"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label>🏷️ Category</label>
        <select
          value={form.category}
          onChange={e => setForm({ ...form, category: e.target.value })}
        >
          <option value="Electronics">Electronics</option>
          <option value="Skincare">Skincare</option>
          <option value="Clothing">Clothing</option>
          <option value="Others">Others</option>
        </select>
      </div>

      <div className="form-group">
        <label>📝 Description</label>
        <textarea
          rows="4"
          placeholder="Enter product description"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
      </div>

      <button type="submit">➕ Add Product</button>
    </form>
  );
}
