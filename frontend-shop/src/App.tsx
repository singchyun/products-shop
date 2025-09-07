import { useEffect, useState, useRef } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import api from "./api";
import Checkout from "./Checkout";
import "./App.css";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  image_url?: string;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<{ [id: string]: number }>(() => {
    try {
      const stored = localStorage.getItem("cart");
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch {}
  }, [cart]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    api
      .get("/public/products")
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const [cartFlash, setCartFlash] = useState(false);
  const cartFlashTimeout = useRef<number | null>(null);
  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
    setCartFlash(true);
    if (cartFlashTimeout.current) clearTimeout(cartFlashTimeout.current);
    cartFlashTimeout.current = window.setTimeout(
      () => setCartFlash(false),
      400,
    );
  };

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div style={{ minHeight: "100vh", paddingBottom: 40 }}>
      <header className="p-3 mb-4 border-bottom bg-light d-flex align-items-center">
        <h2 className="m-0">Shop</h2>
      </header>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <main className="container-lg">
                {loading && <div>Loading products...</div>}
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                  {products.map((product) => {
                    const imgSrc = product.image_url || product.imageUrl;
                    return (
                      <div className="col-md-3 mb-4" key={product.id}>
                        <div className="card h-100">
                          {imgSrc && (
                            <img
                              src={imgSrc}
                              className="card-img-top"
                              alt={product.name}
                              style={{ objectFit: "cover", height: 200 }}
                            />
                          )}
                          <div className="card-body d-flex flex-column text-start">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <div className="mt-auto d-flex justify-content-between align-items-center">
                              <span className="fw-bold">
                                ${product.price.toFixed(2)}
                              </span>
                              <button
                                className="btn btn-sm btn-success"
                                onClick={() => addToCart(product.id)}
                              >
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </main>
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              products={products}
              cart={cart}
              setCart={setCart}
              onBack={() => navigate("/")}
            />
          }
        />
      </Routes>

      {/* Sticky Cart Icon: show on all pages except /checkout */}
      {location.pathname !== "/checkout" && (
        <button
          onClick={() => navigate("/checkout")}
          style={{
            position: "fixed",
            bottom: 32,
            right: 32,
            zIndex: 10000,
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "50%",
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "box-shadow 0.2s, border-color 0.2s",
            boxShadow: cartFlash
              ? "0 0 0 6px #51cf66, 0 2px 8px rgba(0,0,0,0.08)"
              : "0 2px 8px rgba(0,0,0,0.08)",
            borderColor: cartFlash ? "#51cf66" : "#ddd",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 8,
              right: 8,
              background: "#dc3545",
              color: "#fff",
              borderRadius: "50%",
              fontSize: 12,
              width: 22,
              height: 22,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {cartCount}
          </span>
          <span style={{ fontSize: 28, lineHeight: 1 }} role="img" aria-label="cart">🧺</span>
        </button>
      )}
      <div
        style={{
          textAlign: "center",
          fontSize: 12,
          color: "#888",
          marginTop: 32,
        }}
      >
        API Base URL: {import.meta.env.VITE_API_BASE_URL}
      </div>
    </div>
  );
}

export default App;
