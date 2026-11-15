// Cart view: list of chosen products with subtotal, total and clear button
function Cart({ products, cart, onIncrease, onDecrease, onRemove, onClear })
{
  // Turn { id: quantity } into a list of full products with their quantity
  const items = products
    .filter((product) => cart[product.id])
    .map((product) => ({ ...product, quantity: cart[product.id] }));

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0)
  {
    return (
      <section className="cart">
        <h2>Carrito</h2>
        <p className="message">El carrito está vacío</p>
      </section>
    );
  }

  return (
    <section className="cart">
      <h2>Carrito</h2>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.thumbnail} alt={item.title} />
          <span className="cart-item-name">{item.title}</span>

          <div className="quantity-controls">
            <button onClick={() => onDecrease(item)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onIncrease(item)} disabled={item.quantity >= item.stock}>
              +
            </button>
          </div>

          <span className="cart-item-subtotal">
            ${(item.price * item.quantity).toFixed(2)}
          </span>
          <button className="remove-button" onClick={() => onRemove(item.id)}>
            Quitar
          </button>
        </div>
      ))}

      <div className="cart-footer">
        <h3>Total: ${total.toFixed(2)}</h3>
        <button onClick={onClear}>Vaciar carrito</button>
      </div>
    </section>
  );
}

export default Cart;
