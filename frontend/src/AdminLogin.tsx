import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    try {
      const res = await axios.post<{
        access_token: string;
      }>(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (res.data && res.data.access_token) {
        // Save token to sessionStorage
        sessionStorage.setItem("access_token", res.data.access_token);
        // JWT format: header.payload.signature
        const parts = res.data.access_token.split(".");
        if (parts.length === 3) {
          try {
            const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
            console.log("Decoded JWT payload:", payload);
          } catch (e) {
            console.error("Failed to decode JWT:", e);
          }
        }
        // Redirect to /admin/products
        navigate("/admin/products");
      }
      console.log(res.data);
    } catch (err: any) {
      let message = "Unknown error";
      if (err.response && err.response.data && err.response.data.message) {
        message = err.response.data.message;
      } else if (err.message) {
        message = err.message;
      }
      setError(message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="container" style={{ marginTop: "5rem", textAlign: "center" }}>
      <h2>Admin Login</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 400,
          margin: "2rem auto",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <input type="email" name="email" placeholder="Email" className="form-control" required />
        <input type="password" name="password" placeholder="Password" className="form-control" required />
        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" style={{ marginRight: 8 }}></span>
          ) : null}
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
      </form>
    </div>
  );
}

export default AdminLogin;
