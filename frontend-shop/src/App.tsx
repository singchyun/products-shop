
import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
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
  const [cart, setCart] = useState<{ [id: string]: number }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/public/products")
      .then((res) => setProducts(res.data))
  .catch(() => setError("Failed to load products."))
      .finally(() => setLoading(false));
  }, []);

  const addToCart = (id: string) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
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
              <main className="container">
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
                              <span className="fw-bold">${product.price.toFixed(2)}</span>
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
              {/* Sticky Cart Icon */}
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
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  cursor: "pointer"
                }}
              >
                <span style={{ position: "absolute", top: 8, right: 8, background: "#dc3545", color: "#fff", borderRadius: "50%", fontSize: 12, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {cartCount}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1h1a.5.5 0 0 1 .485.379L2.89 5H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 14H4a.5.5 0 0 1-.491-.408L1.01 2H.5a.5.5 0 0 1-.5-.5zm3.14 4l1.25 6.25A.5.5 0 0 0 4.87 12h7.26a.5.5 0 0 0 .48-.75L12.86 5H3.14zM5 16a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm7 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                </svg>
              </button>
            </>
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              products={products}
              cart={cart}
              onBack={() => navigate("/")}
            />
          }
        />
      </Routes>
      <div style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 32 }}>
        API Base URL: {import.meta.env.VITE_API_BASE_URL}
      </div>
    </div>
  );
}

export default App;
