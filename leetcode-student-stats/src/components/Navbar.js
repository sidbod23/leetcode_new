import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth_token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/students">All Students</Link>
      <Link to="/top-performers">Top Performers</Link>
      <Link to="/export">Export</Link>
      <button onClick={logout} className="logout-button">Logout</button>
    </nav>
  );
};

export default Navbar;
