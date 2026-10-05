import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);

    navigate("/");
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div
        className="logo"
        onClick={() => navigate("/")}
      >
        Home<span>Hero</span>
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        {/* Home */}
        <a href="/">
          Home
        </a>

        {/* Services */}
        <button
          className="nav-link-button"
          onClick={() => navigate("/services")}
        >
          Services
        </button>

        {/* About */}
        <a href="/#about">
          About
        </a>

        {/* Customer */}
        {user && user.role === "customer" && (
          <>
            <button
              className="nav-link-button"
              onClick={() => navigate("/customer-dashboard")}
            >
              Dashboard
            </button>

            <button
              className="nav-link-button"
              onClick={() => navigate("/my-bookings")}
            >
              My Bookings
            </button>
          </>
        )}

        {/* Provider */}
        {user && user.role === "provider" && (
          <>
            <button
              className="nav-link-button"
              onClick={() => navigate("/provider-dashboard")}
            >
              Dashboard
            </button>

            <button
              className="nav-link-button"
              onClick={() => navigate("/provider-bookings")}
            >
              Customer Bookings
            </button>
          </>
        )}

        {/* Admin */}
        {user && user.role === "admin" && (
          <button
            className="nav-link-button"
            onClick={() => navigate("/admin-dashboard")}
          >
            Dashboard
          </button>
        )}
      </div>

      {/* Login / User Section */}
      <div className="nav-buttons">
        {user ? (
          <>
            <span className="welcome-user">
              Hi, {user.name}
            </span>

            <button
              className="login-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              className="login-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;