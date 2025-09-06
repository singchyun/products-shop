import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import AdminLogin from "./AdminLogin";

export default function RootLayout() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/admin/login" element={<AdminLogin />} />
          </Routes>
        </div>
        <footer
          style={{
            fontSize: "0.8em",
            color: "#888",
            textAlign: "center",
            margin: "2rem 0 1rem 0",
          }}
        >
          API Base URL: {import.meta.env.VITE_API_BASE_URL}
        </footer>
      </div>
    </BrowserRouter>
  );
}
