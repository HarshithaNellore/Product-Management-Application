import { useEffect, useState, useMemo } from "react";
import AddProductForm from "./components/AddProductForm";
import ProductList from "./components/ProductList";
import "./index.css";

const API = "http://localhost:5000/api/products";

export default function App() {
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState("asc");
  const [query, setQuery] = useState("");

  const fetchProducts = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      if (res.ok) fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      if (res.ok) setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const updateProduct = async (id, updated) => {
    try {
      const res = await fetch(`${API}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      const updatedProduct = await res.json();
      setProducts(prev => prev.map(p => p._id === id ? updatedProduct : p));
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const sorted = useMemo(() => {
    let filtered = products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase())
    );
    return [...filtered].sort((a, b) =>
      sort === "asc" ? a.price - b.price : b.price - a.price
    );
  }, [products, sort, query]);

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h3>📥 Add Product</h3>
        <AddProductForm onAdd={addProduct} />
      </aside>

      {/* Main content */}
      <section className="main-content">
        <header className="page-header">
          <h2>🛒 Product Management Application</h2>
        </header>

        <div className="list-header">
          <div className="search-box">
            <input
              placeholder="Search products 🔍"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={fetchProducts}>Search</button>
          </div>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="asc">Low → High</option>
            <option value="desc">High → Low</option>
          </select>
        </div>

        <ProductList
          products={sorted}
          onDelete={deleteProduct}
          onEdit={updateProduct} // ✅ Pass the update function here
        />
      </section>
    </div>
  );
}
