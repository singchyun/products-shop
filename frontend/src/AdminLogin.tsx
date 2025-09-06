import axios from "axios";

function AdminLogin() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement)?.value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)?.value;
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
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
        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
