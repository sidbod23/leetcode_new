import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <nav style={{ display: "flex", gap: "20px", padding: "10px", background: "#eee" }}>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/students">All Students</Link>
      <Link to="/top-performers">Top Performers</Link>
      <Link to="/inactive-users">Inactive Users</Link>
      <Link to="/export">Export</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
};

export default Navbar;