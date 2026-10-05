
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProviderDashboard.css";

function ProviderDashboard() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch(
          "http://localhost:5000/api/bookings/provider",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch provider bookings"
          );
        }

        setBookings(data.bookings || data);
      } catch (error) {
        console.error("Provider Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  // Dashboard Counts
  const totalRequests = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === "rejected"
  ).length;

  if (loading) {
    return (
      <h2 className="provider-dashboard-loading">
        Loading Dashboard...
      </h2>
    );
  }

  return (
    <div className="provider-dashboard">

      {/* Dashboard Header */}
      <div className="provider-dashboard-header">
        <h1>Provider Dashboard</h1>
        <p>Manage your customer service requests</p>
      </div>

      {/* Dashboard Cards */}
      <div className="provider-dashboard-cards">

        <div className="provider-dashboard-card">
          <h3>Total Requests</h3>
          <p>{totalRequests}</p>
        </div>

        <div className="provider-dashboard-card">
          <h3>Pending</h3>
          <p>{pendingBookings}</p>
        </div>

        <div className="provider-dashboard-card">
          <h3>Accepted</h3>
          <p>{acceptedBookings}</p>
        </div>

        <div className="provider-dashboard-card">
          <h3>Completed</h3>
          <p>{completedBookings}</p>
        </div>

        <div className="provider-dashboard-card">
          <h3>Rejected</h3>
          <p>{rejectedBookings}</p>
        </div>

      </div>

      {/* Dashboard Actions */}
      <div className="provider-dashboard-actions">

        <button
          onClick={() => navigate("/provider-bookings")}
        >
          View Customer Bookings
        </button>

        <button
          onClick={() => navigate("/services")}
        >
          View Services
        </button>

      </div>

    </div>
  );
}

export default ProviderDashboard;

