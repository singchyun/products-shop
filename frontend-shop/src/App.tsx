
import { useEffect, useState } from "react";
import api from "./api";
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
      <header className="p-3 mb-4 border-bottom bg-light d-flex justify-content-between align-items-center">
        <h2 className="m-0">Shop</h2>
        <div>
          <span className="badge bg-primary">Cart: {cartCount}</span>
        </div>
      </header>
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
      <div style={{ textAlign: "center", fontSize: 12, color: "#888", marginTop: 32 }}>
        API Base URL: {import.meta.env.VITE_API_BASE_URL}
      </div>
    </div>
  );
}

export default App;
