
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminProducts() {

  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [products, setProducts] = useState<null | Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    enabled: boolean;
  }>>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setHasToken(!!token);
    if (!token) return;
    setLoading(true);
    setError(null);
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/private/products`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        let message = "Unknown error";
        if (err.response && err.response.data && err.response.data.message) {
          message = err.response.data.message;
        } else if (err.message) {
          message = err.message;
        }
        setError(message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (hasToken === false) {
    return (
      <div className="container" style={{ marginTop: "5rem", textAlign: "center" }}>
        <h2 style={{ color: 'red' }}>Access Denied</h2>
        <p>You must be logged in as admin to view this page.</p>
        <Link to="/admin/login" className="btn btn-primary">Go to Admin Login</Link>
      </div>
    );
  }

  if (hasToken === null || loading) {
    return null; // or a spinner/loading indicator
  }

  return (
    <div className="container" style={{ marginTop: "5rem", textAlign: "center" }}>
      <h2>Products</h2>
      {error && <div style={{ color: 'red', marginBottom: 16 }}>{error}</div>}
      {products && products.length > 0 ? (
        <table className="table table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Enabled</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stock_quantity}</td>
                <td>{p.enabled ? '✔️' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : !error && (
        <p>No products found.</p>
      )}
    </div>
  );
}
