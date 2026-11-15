// One product: stock badge, image, name, price and the - quantity + controls
function ProductCard({ product, quantity, onIncrease, onDecrease })
{
  return (
    <div className="product-card">
      <span className="stock-badge" title="Stock disponible">
        {product.stock}
      </span>

      <img src={product.thumbnail} alt={product.title} />

      <h3>{product.title}</h3>
      <p className="price">${product.price}</p>

      <div className="quantity-controls">
        <button onClick={() => onDecrease(product)} disabled={quantity === 0}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => onIncrease(product)} disabled={quantity >= product.stock}>
          +
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
