import { useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import ProductFormModal from "./ProductFormModal";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios, { isAxiosError } from "axios";

export default function AdminProducts() {
  const [showImageModal, setShowImageModal] = useState<{ url: string; alt: string } | null>(null);
  const [, setShowSuccess] = useState<null | string>(null);
  const [hasToken, setHasToken] = useState<boolean | null>(null);
  const [products, setProducts] = useState<null | Array<{
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    enabled: boolean;
    image_url?: string;
  }>>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [formProduct, setFormProduct] = useState<null | {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    enabled: boolean;
    image_url?: string;
  }>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = sessionStorage.getItem("access_token");
    setHasToken(!!token);
    if (token) {
      try {
        const decoded = jwtDecode<{ email?: string }>(token);
        setUserEmail(decoded.email || null);
      } catch {
        setUserEmail(null);
      }
    } else {
      setUserEmail(null);
    }
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

  function openCreateForm() {
    setFormMode("create");
    setFormProduct({ name: "", description: "", price: 0, stock_quantity: 0, enabled: true });
    setShowForm(true);
  }

  function openEditForm(product: {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    enabled: boolean;
    image_url?: string;
  }) {
    setFormMode("edit");
    setFormProduct({ ...product });
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setFormProduct(null);
    setError(null);
  }

  function showSuccessModal(message: string) {
    setShowSuccess(message);
    setTimeout(() => setShowSuccess(null), 2000);
  }

  async function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const token = sessionStorage.getItem("access_token");
    if (!token || !formProduct) return;
    try {
      if (formMode === "create") {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/private/products`, formProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prev) => (prev ? [...prev, res.data] : [res.data]));
        showSuccessModal("Product created successfully!");
      } else if (formMode === "edit" && formProduct.id) {
        const res = await axios.patch(`${import.meta.env.VITE_API_BASE_URL}/private/products/${formProduct.id}`, formProduct, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts((prev) => (prev ? prev.map((p) => (p.id === formProduct.id ? res.data : p)) : prev));
        showSuccessModal("Product updated successfully!");
      }
      closeForm();
    } catch (e) {
      const err = e as Error;
      let message = "Unknown error";
      if (isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    }
  }

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    setUserEmail(null);
    setHasToken(false);
    navigate("/admin/login");
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setError(null);
    const token = sessionStorage.getItem("access_token");
    if (!token) {
      setError("Not authenticated");
      return;
    }
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/private/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => (prev ? prev.filter((p) => p.id !== id) : prev));
      showSuccessModal("Product deleted successfully!");
    } catch (e) {
      const err = e as Error;
      let message = "Unknown error";
      if (isAxiosError(err) && err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
    }
  }

  if (hasToken === false) {
    return (
      <div className="container" style={{ marginTop: "5rem", textAlign: "center" }}>
        <h2 style={{ color: "red" }}>Access Denied</h2>
        <p>You must be logged in as admin to view this page.</p>
        <Link to="/admin/login" className="btn btn-primary">
          Login Here
        </Link>
      </div>
    );
  }

  if (hasToken === null || loading) {
    return null; // or a spinner/loading indicator
  }

  return (
    <>
      {/* Success Modal */}
      {showImageModal && <ImageModal url={showImageModal.url} alt={showImageModal.alt} onClose={() => setShowImageModal(null)} />}
      {/* Top-right user info and logout */}
      {userEmail && (
        <div style={{ position: "absolute", top: 16, right: 32, textAlign: "right", zIndex: 10 }}>
          <div style={{ fontSize: 14, color: "#333", marginBottom: 4 }}>
            Logged in as <span style={{ fontWeight: 500 }}>{userEmail}</span>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
      <div className="container" style={{ marginTop: "5rem", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2>Products</h2>
          <button className="btn btn-success" onClick={openCreateForm}>
            Create Product
          </button>
        </div>
        {error && <div style={{ color: "red", marginBottom: 16 }}>{error}</div>}
        {/* Quick Search Field */}
        <div style={{ maxWidth: 340, margin: "16px 0 0 0", position: "relative", textAlign: "left" }}>
          <input
            type="text"
            className="form-control"
            placeholder="Quick search by name or description..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingRight: 32 }}
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                border: "none",
                background: "transparent",
                fontSize: 18,
                color: "#888",
                cursor: "pointer",
                padding: 0,
                lineHeight: 1,
              }}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        {products && products.length > 0 ? (
          <table className="table table-bordered table-striped mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th className="d-none d-md-table-cell">Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Enabled</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter(
                  (p) =>
                    search.trim() === "" ||
                    p.name.toLowerCase().includes(search.toLowerCase()) ||
                    p.description.toLowerCase().includes(search.toLowerCase()),
                )
                .map((p) => {
                  const strike = !p.enabled || p.stock_quantity <= 0 ? { opacity: 0.3 } : {};
                  return (
                    <tr key={p.id}>
                      <td style={strike}>{p.id}</td>
                      <td style={{ ...strike, textAlign: "left" }}>
                        {p.image_url ? (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setShowImageModal({ url: p.image_url!, alt: p.name });
                            }}
                            tabIndex={0}
                            aria-label={`View image for ${p.name}`}
                          >
                            <img
                              src={p.image_url}
                              alt={p.name}
                              style={{
                                width: 48,
                                height: 48,
                                objectFit: "cover",
                                borderRadius: 4,
                                boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                              }}
                            />
                          </a>
                        ) : (
                          <div style={{ width: 48, height: 48, background: "#eee", borderRadius: 4 }} />
                        )}
                      </td>
                      <td style={strike}>
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            openEditForm(p);
                          }}
                          style={{ textDecoration: "underline", color: "#0d6efd", cursor: "pointer" }}
                        >
                          {p.name}
                        </a>
                      </td>
                      <td className="d-none d-md-table-cell" style={{ ...strike, textAlign: "left" }}>
                        {p.description}
                      </td>
                      <td style={{ ...strike, textAlign: "right" }}>${p.price.toFixed(2)}</td>
                      <td style={{ ...strike, textAlign: "right" }}>
                        {p.stock_quantity < 50 ? <span className="text-danger">{p.stock_quantity} (low)</span> : p.stock_quantity}
                      </td>
                      <td>{p.enabled ? "✔️" : "❌"}</td>
                      <td>
                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(p.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        ) : (
          !error && <p>No products found.</p>
        )}
        {/* Image Modal (moved outside table) */}
        {showImageModal && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.7)",
              zIndex: 4000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => setShowImageModal(null)}
          >
            <img
              src={showImageModal.url}
              alt={showImageModal.alt}
              style={{
                maxWidth: "90vw",
                maxHeight: "80vh",
                borderRadius: 8,
                background: "#fff",
                boxShadow: "0 2px 24px rgba(0,0,0,0.25)",
                padding: 8,
              }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </div>
      <ProductFormModal
        show={showForm}
        mode={formMode}
        product={formProduct}
        error={error}
        onChange={(p) => setFormProduct(p)}
        onSubmit={handleFormSubmit}
        onClose={closeForm}
      />
    </>
  );
}
