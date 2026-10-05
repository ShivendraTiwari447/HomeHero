import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {
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
          "http://localhost:5000/api/bookings/my",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch bookings");
        }

        setBookings(data.bookings || data);
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const totalBookings = bookings.length;

  const pendingBookings = bookings.filter(
    (booking) => booking.status === "pending"
  ).length;

  const acceptedBookings = bookings.filter(
    (booking) => booking.status === "accepted"
  ).length;

  const completedBookings = bookings.filter(
    (booking) => booking.status === "completed"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) => booking.status === "cancelled"
  ).length;

  if (loading) {
    return <h2 className="dashboard-loading">Loading Dashboard...</h2>;
  }

  return (
    <div className="customer-dashboard">
      <div className="dashboard-header">
        <h1>Customer Dashboard</h1>
        <p>Track your home service bookings</p>
      </div>

      <div className="dashboard-cards">

        <div className="dashboard-card">
          <h3>Total Bookings</h3>
          <p>{totalBookings}</p>
        </div>

        <div className="dashboard-card">
          <h3>Pending</h3>
          <p>{pendingBookings}</p>
        </div>

        <div className="dashboard-card">
          <h3>Accepted</h3>
          <p>{acceptedBookings}</p>
        </div>

        <div className="dashboard-card">
          <h3>Completed</h3>
          <p>{completedBookings}</p>
        </div>

        <div className="dashboard-card">
          <h3>Cancelled</h3>
          <p>{cancelledBookings}</p>
        </div>

      </div>

      <div className="dashboard-actions">
        <button onClick={() => navigate("/services")}>
          Book a Service
        </button>

        <button onClick={() => navigate("/my-bookings")}>
          View My Bookings
        </button>
      </div>
    </div>
  );
}

export default CustomerDashboard;