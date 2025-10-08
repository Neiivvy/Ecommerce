// src/Components/ProductList.jsx
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import "./ProductList.css";

export const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div className={`product-list ${products.length === 0 ? "empty" : ""}`}>
      {products.length === 0 ? (
        <p className="no-products">No products available yet.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};
