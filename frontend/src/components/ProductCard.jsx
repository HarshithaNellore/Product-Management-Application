import { useState } from "react";

export default function ProductCard({ product, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...product });

  const save = () => {
    if (!form.name || form.price === "") return alert("📛 Name & Price required");
    onEdit(product._id, { ...form, price: Number(form.price) });
    setEditing(false);
  };

  return (
    <div className="card">
      {!editing ? (
        <>
          <h4>📦 {product.name}</h4>
          {product.category && <span className="badge">🏷️ {product.category}</span>}
          <p className="price">💲 {product.price}</p>
          {product.description && <p className="small">📝 {product.description}</p>}

          <div className="actions">
            <button onClick={() => setEditing(true)}>✏️ Edit</button>
            <button onClick={() => onDelete(product._id)}>🗑️ Delete</button>
          </div>
        </>
      ) : (
        <>
          <label>
            📦 Name
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </label>

          <label>
            💲 Price
            <input
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
          </label>

          <label>
            🏷️ Category
            <select
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            >
              <option value="Electronics">Electronics</option>
              <option value="Skincare">Skincare</option>
              <option value="Clothing">Clothing</option>
              <option value="Others">Others</option>
            </select>
          </label>

          <label>
            📝 Description
            <textarea
              rows="3"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </label>

          <div className="actions">
            <button onClick={save}>💾 Save</button>
            <button onClick={() => setEditing(false)}>❌ Cancel</button>
          </div>
        </>
      )}
    </div>
  );
}
