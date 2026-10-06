import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  // Logo -> Home
  const handleHome = () => {
    navigate("/");
    setMobileMenu(false);
  };

  // Services
  const handleServices = () => {
    if (location.pathname === "/") {
      document
        .getElementById("services")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      navigate("/services");
    }

    setMobileMenu(false);
  };

  // About
  const handleAbout = () => {
    if (location.pathname === "/") {
      document
        .getElementById("about")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } else {
      navigate("/#about");
    }

    setMobileMenu(false);
  };

  // Normal navigation
  const handleNavigate = (path) => {
    navigate(path);
    setMobileMenu(false);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setMobileMenu(false);

    navigate("/");
  };

  // User initial
  const getInitial = () => {
    if (!user?.name) {
      return "U";
    }

    return user.name.charAt(0).toUpperCase();
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">

        {/* LOGO */}
        <button
          className="navbar-logo"
          onClick={handleHome}
        >
          <span className="logo-mark">
            H
          </span>

          <span className="logo-text">
            Home<span>Hero</span>
          </span>
        </button>

        {/* DESKTOP NAVIGATION */}
        <div className="nav-links">

          <button
            className={
              location.pathname.startsWith("/services")
                ? "nav-item active"
                : "nav-item"
            }
            onClick={handleServices}
          >
            Services
          </button>

          <button
            className="nav-item"
            onClick={handleAbout}
          >
            About
          </button>

          {/* CUSTOMER LINKS */}
          {user?.role === "customer" && (
            <>
              <button
                className={
                  location.pathname ===
                  "/customer-dashboard"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  handleNavigate("/customer-dashboard")
                }
              >
                Dashboard
              </button>

              <button
                className={
                  location.pathname === "/my-bookings"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  handleNavigate("/my-bookings")
                }
              >
                My Bookings
              </button>
            </>
          )}

          {/* PROVIDER LINKS */}
          {user?.role === "provider" && (
            <>
              <button
                className={
                  location.pathname ===
                  "/provider-dashboard"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  handleNavigate("/provider-dashboard")
                }
              >
                Dashboard
              </button>

              <button
                className={
                  location.pathname ===
                  "/provider-bookings"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  handleNavigate("/provider-bookings")
                }
              >
                Bookings
              </button>

              <button
                className={
                  location.pathname ===
                  "/provider-services"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  handleNavigate("/provider-services")
                }
              >
                My Services
              </button>
            </>
          )}

          {/* ADMIN LINK */}
          {user?.role === "admin" && (
            <button
              className={
                location.pathname === "/admin-dashboard"
                  ? "nav-item active"
                  : "nav-item"
              }
              onClick={() =>
                handleNavigate("/admin-dashboard")
              }
            >
              Control Center
            </button>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-right">

          {user ? (
            <>
              <div className="navbar-user">

                <div className="user-avatar">
                  {getInitial()}
                </div>

                <div className="user-info">
                  <span className="user-name">
                    {user.name}
                  </span>

                  <span className="user-role">
                    {user.role}
                  </span>
                </div>

              </div>

              <button
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                className="login-btn"
                onClick={() =>
                  handleNavigate("/login")
                }
              >
                Login
              </button>

              <button
                className="register-btn"
                onClick={() =>
                  handleNavigate("/register")
                }
              >
                Get Started
              </button>
            </>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="mobile-menu-btn"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
          aria-label="Toggle menu"
        >
          {mobileMenu ? "✕" : "☰"}
        </button>

      </nav>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="mobile-menu">

          <button onClick={handleServices}>
            Services
          </button>

          <button onClick={handleAbout}>
            About
          </button>

          {/* CUSTOMER */}
          {user?.role === "customer" && (
            <>
              <button
                onClick={() =>
                  handleNavigate(
                    "/customer-dashboard"
                  )
                }
              >
                Dashboard
              </button>

              <button
                onClick={() =>
                  handleNavigate("/my-bookings")
                }
              >
                My Bookings
              </button>
            </>
          )}

          {/* PROVIDER */}
          {user?.role === "provider" && (
            <>
              <button
                onClick={() =>
                  handleNavigate(
                    "/provider-dashboard"
                  )
                }
              >
                Dashboard
              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/provider-bookings"
                  )
                }
              >
                Bookings
              </button>

              <button
                onClick={() =>
                  handleNavigate(
                    "/provider-services"
                  )
                }
              >
                My Services
              </button>
            </>
          )}

          {/* ADMIN */}
          {user?.role === "admin" && (
            <button
              onClick={() =>
                handleNavigate(
                  "/admin-dashboard"
                )
              }
            >
              Control Center
            </button>
          )}

          {/* AUTH */}
          {user ? (
            <button
              className="mobile-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={() =>
                  handleNavigate("/login")
                }
              >
                Login
              </button>

              <button
                className="mobile-register"
                onClick={() =>
                  handleNavigate("/register")
                }
              >
                Get Started
              </button>
            </>
          )}

        </div>
      )}
    </header>
  );
}

export default Navbar;
