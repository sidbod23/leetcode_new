import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔐 Login button clicked");

    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      localStorage.setItem("auth_token", res.data.token);
      onLogin();                    // ✅ update App.js state
      navigate("/dashboard");       // ✅ redirect
    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column" }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", width: "300px" }}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
