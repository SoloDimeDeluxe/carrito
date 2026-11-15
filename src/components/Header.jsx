// Top orange bar: "Productos" link on the left, cart icon with badge on the right
function Header({ cartCount, onCartClick, onProductsClick })
{
  return (
    <header className="header">
      <button className="header-link" onClick={onProductsClick}>
        Productos
      </button>

      <button className="cart-button" onClick={onCartClick} aria-label="Ver carrito">
        🛒
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </header>
  );
}

export default Header;
