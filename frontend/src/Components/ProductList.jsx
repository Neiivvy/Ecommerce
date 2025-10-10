import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import "./ProductList.css";

export const ProductList = ({ searchTerm }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const url = searchTerm
      ? `http://localhost:5000/products/search?q=${encodeURIComponent(searchTerm)}`
      : "http://localhost:5000/products";

    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [searchTerm]);

  return (
    <div className={`product-list ${products.length === 0 ? "empty" : ""}`}>
      {products.length === 0 ? (
        <p className="no-products">No products found.</p>
      ) : (
        products.map((product) => <ProductCard key={product.id} product={product} />)
      )}
    </div>
  );
};
