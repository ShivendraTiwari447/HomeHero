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
      <div className="logo">
        Home<span>Hero</span>
      </div>

      <div className="nav-links">
        <a href="/">Home</a>

        <button
          className="nav-link-button"
          onClick={() => navigate("/services")}
        >
          Services
        </button>

        <a href="/#about">About</a>
      </div>

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