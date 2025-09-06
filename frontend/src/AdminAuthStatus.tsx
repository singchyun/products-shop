import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
function getEmailFromToken(token: string | null): string | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return payload.email || null;
  } catch {
    return null;
  }
}

export default function AdminAuthStatus() {
  const [email, setEmail] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function updateEmail() {
      const token = sessionStorage.getItem("access_token");
      setEmail(getEmailFromToken(token));
    }
    updateEmail();
    window.addEventListener('storage', updateEmail);
    window.addEventListener('authchange', updateEmail);
    return () => {
      window.removeEventListener('storage', updateEmail);
      window.removeEventListener('authchange', updateEmail);
    };
  }, []);

  if (!email) {
    return <Link to="/admin/login">Login as admin</Link>;
  }

  function handleLogout() {
    sessionStorage.removeItem("access_token");
    window.dispatchEvent(new Event('authchange'));
    navigate("/admin/login");
  }

  return (
    <span>
      Logged in as {email} {" "}
      <button type="button" className="btn btn-link p-0 align-baseline" style={{ color: '#0d6efd', textDecoration: 'underline', marginLeft: 8 }} onClick={handleLogout}>
        Logout
      </button>
    </span>
  );
}
