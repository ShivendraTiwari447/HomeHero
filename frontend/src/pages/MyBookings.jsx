import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./MyBookings.css";

function MyBookings() {
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        setError(data.message || "Unable to load bookings");
        return;
      }

      setBookings(data.bookings || data);
    } catch (error) {
      console.error("My bookings error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancel = async (bookingId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to cancel booking");
        return;
      }

      alert("Booking cancelled successfully!");

      fetchBookings();
    } catch (error) {
      console.error("Cancel booking error:", error);
      alert("Unable to connect to server");
    }
  };

  const getStatusClass = (status) => {
    return `booking-status status-${status}`;
  };

  if (loading) {
    return (
      <div className="my-bookings-page">
        <p className="my-bookings-message">
          Loading your bookings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-bookings-page">
        <p className="my-bookings-error">{error}</p>
      </div>
    );
  }

  return (
    <div className="my-bookings-page">
      <div className="my-bookings-header">
        <p>HOMEHERO</p>
        <h1>My Bookings</h1>
        <span>
          View and manage your home service bookings.
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-bookings">
          <div className="empty-icon">📋</div>

          <h2>No Bookings Yet</h2>

          <p>
            You haven't booked any services yet.
          </p>

          <button
            onClick={() => navigate("/services")}
          >
            Explore Services
          </button>
        </div>
      ) : (
        <div className="bookings-grid">
          {bookings.map((booking) => (
            <div
              className="booking-card"
              key={booking._id}
            >
              <div className="booking-card-top">
                <div className="booking-icon">
                  🏠
                </div>

                <span className={getStatusClass(booking.status)}>
                  {booking.status}
                </span>
              </div>

              <h2>
                {booking.service?.title ||
                  "Home Service"}
              </h2>

              <p className="booking-category">
                {booking.service?.category ||
                  "Service"}
              </p>

              <div className="booking-info">
                <div>
                  <span>Price</span>
                  <strong>
                    ₹{booking.service?.price || 0}
                  </strong>
                </div>

                <div>
                  <span>Date</span>
                  <strong>
                    {new Date(
                      booking.bookingDate
                    ).toLocaleDateString()}
                  </strong>
                </div>
              </div>

              <div className="booking-detail">
                <span>Address</span>
                <p>{booking.address}</p>
              </div>

              {booking.description && (
                <div className="booking-detail">
                  <span>Description</span>
                  <p>{booking.description}</p>
                </div>
              )}

              {booking.status === "pending" && (
                <button
                  className="cancel-booking-btn"
                  onClick={() =>
                    handleCancel(booking._id)
                  }
                >
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <button
        className="back-services-btn"
        onClick={() => navigate("/services")}
      >
        ← Browse Services
      </button>
    </div>
  );
}

export default MyBookings;