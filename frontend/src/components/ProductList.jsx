import ProductCard from "./ProductCard";

export default function ProductList({ products, onDelete, onEdit }) {
  if (!products.length) return <p>No products yet.</p>;

  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard
          key={p._id}
          product={p}
          onDelete={onDelete} // pass directly
          onEdit={onEdit}     // matches ProductCard
        />
      ))}
    </div>
  );
}
