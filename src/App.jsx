import { useEffect, useState } from "react";
import Header from "./components/Header";
import Filters from "./components/Filters";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import "./App.css";

// DummyJSON endpoint with the 27 grocery products
const API_URL = "https://dummyjson.com/products/category/groceries";

function App()
{
  // Data coming from the API
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // cart = { [productId]: quantity }  -> simple to read and update
  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  // Filter / sort state
  const [sortBy, setSortBy] = useState("name");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  // Fetch products once, when the component mounts
  useEffect(() =>
  {
    fetch(API_URL)
      .then((response) =>
      {
        if (!response.ok)
        {
          throw new Error("Error " + response.status);
        }
        return response.json();
      })
      .then((data) =>
      {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) =>
      {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Adds one unit, without going over the available stock
  function increase(product)
  {
    const current = cart[product.id] || 0;
    if (current >= product.stock)
    {
      return;
    }
    setCart({ ...cart, [product.id]: current + 1 });
  }

  // Removes one unit; deletes the entry when it reaches zero
  function decrease(product)
  {
    const current = cart[product.id] || 0;
    if (current <= 0)
    {
      return;
    }

    const newCart = { ...cart };
    if (current === 1)
    {
      delete newCart[product.id];
    }
    else
    {
      newCart[product.id] = current - 1;
    }
    setCart(newCart);
  }

  function removeFromCart(productId)
  {
    const newCart = { ...cart };
    delete newCart[productId];
    setCart(newCart);
  }

  function clearCart()
  {
    setCart({});
  }

  // Apply filters and sorting (computed on every render, no extra state needed)
  const visibleProducts = products
    .filter((product) => minPrice === "" || product.price >= Number(minPrice))
    .filter((product) => maxPrice === "" || product.price <= Number(maxPrice))
    .filter((product) =>
    {
      if (stockFilter === "inStock")
      {
        return product.stock > 0;
      }
      if (stockFilter === "lowStock")
      {
        return product.stock < 20;
      }
      return true;
    })
    .sort((a, b) =>
    {
      if (sortBy === "priceAsc")
      {
        return a.price - b.price;
      }
      if (sortBy === "priceDesc")
      {
        return b.price - a.price;
      }
      return a.title.localeCompare(b.title);
    });

  // Total units in the cart, for the badge on the cart icon
  const cartCount = Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);

  return (
    <div>
      <Header
        cartCount={cartCount}
        onCartClick={() => setShowCart(!showCart)}
        onProductsClick={() => setShowCart(false)}
      />

      {showCart ? (
        <Cart
          products={products}
          cart={cart}
          onIncrease={increase}
          onDecrease={decrease}
          onRemove={removeFromCart}
          onClear={clearCart}
        />
      ) : (
        <main>
          <Filters
            sortBy={sortBy}
            onSortChange={setSortBy}
            minPrice={minPrice}
            onMinPriceChange={setMinPrice}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
            stockFilter={stockFilter}
            onStockFilterChange={setStockFilter}
          />

          {loading && <p className="message">Cargando productos...</p>}
          {error && <p className="message">No se pudieron cargar los productos ({error})</p>}

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                quantity={cart[product.id] || 0}
                onIncrease={increase}
                onDecrease={decrease}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
