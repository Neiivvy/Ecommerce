import "./ProductCard.css";

export const ProductCard = ({ product }) => {
  const imageSrc = product.image
    ? `http://localhost:5000${product.image}`  // backend URL
    : "https://via.placeholder.com/150";

  return (
    <div className="product-card">
      <img src={imageSrc} alt={product.name} className="product-image" />

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <p className="product-price">Price: ₹{product.price}</p>
        <p className="product-rating">
          Rating: {product.rating ? product.rating : "N/A"} ⭐
        </p>
        <p className="product-stock">
          {product.stock > 0 ? `In Stock: ${product.stock}` : "Out of Stock"}
        </p>
      </div>
    </div>
  );
};
