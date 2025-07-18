import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentTablePage from "./pages/StudentTablePage";
import TopPerformers from "./pages/TopPerformers";
import ExportPage from "./pages/ExportPage";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/PrivateRoute";
import { useState } from "react";

function AppWrapper() {
  const [, setIsLoggedIn] = useState(!!localStorage.getItem("auth_token"));
  const location = useLocation();
  const showNavbar = location.pathname !== "/login" && localStorage.getItem("auth_token");

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/students" element={<PrivateRoute><StudentTablePage /></PrivateRoute>} />
        <Route path="/top-performers" element={<PrivateRoute><TopPerformers /></PrivateRoute>} />
        <Route path="/export" element={<PrivateRoute><ExportPage /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
