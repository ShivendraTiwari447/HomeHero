import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    customers: 0,
    providers: 0,
    services: 0,
    bookings: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdminStats = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          "http://localhost:5000/api/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch admin statistics"
          );
        }

        setStats(data);
      } catch (error) {
        console.error("Admin dashboard error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminStats();
  }, []);

  if (loading) {
    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <p className="admin-loading">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <p className="admin-error">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-dashboard-header">
        <div>
          <h1>Admin Dashboard</h1>

          <p>
            Overview of your HomeHero platform
          </p>
        </div>
      </div>

      {/* Statistics */}

      <div className="admin-stats-grid">

        <div className="admin-stat-card">
          <div className="admin-stat-icon">👥</div>

          <div>
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">🧑</div>

          <div>
            <h3>Customers</h3>
            <p>{stats.customers}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">🛠️</div>

          <div>
            <h3>Providers</h3>
            <p>{stats.providers}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">🔧</div>

          <div>
            <h3>Services</h3>
            <p>{stats.services}</p>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon">📋</div>

          <div>
            <h3>Bookings</h3>
            <p>{stats.bookings}</p>
          </div>
        </div>

      </div>

      {/* Manage Users */}

      <div className="admin-management-section">

        <h2>User Management</h2>

        <p>
          View all customers and providers and manage
          their account status.
        </p>

        <button
          className="manage-users-btn"
          onClick={() => navigate("/admin-users")}
        >
          Manage Users
        </button>

      </div>

      {/* Manage Services */}

      <div className="admin-management-section">

        <h2>Service Management</h2>

        <p>
          View and manage all services available on
          the HomeHero platform.
        </p>

        <button
          className="manage-users-btn"
          onClick={() => navigate("/admin-services")}
        >
          Manage Services
        </button>

      </div>

    </div>
  );
}

export default AdminDashboard;