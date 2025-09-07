import "./App.css";

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h2>Welcome to the Admin Module. Please login here</h2>
      <a href="/admin/login" className="btn btn-primary" style={{ marginTop: 16 }}>
        Go to Admin Login
      </a>
    </div>
  );
}

export default App;
