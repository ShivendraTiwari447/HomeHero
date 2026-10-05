import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./ProviderBookings.css";

function ProviderBookings() {
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
        "http://localhost:5000/api/bookings/provider",
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
      console.error("Provider bookings error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateBookingStatus = async (bookingId, action) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/${action}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Unable to update booking");
        return;
      }

      alert(data.message || "Booking updated successfully!");

      fetchBookings();
    } catch (error) {
      console.error("Booking status error:", error);
      alert("Unable to connect to server");
    }
  };

  if (loading) {
    return (
      <div className="provider-bookings-page">
        <p className="provider-bookings-message">
          Loading bookings...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="provider-bookings-page">
        <p className="provider-bookings-error">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className="provider-bookings-page">
      <div className="provider-bookings-header">
        <p>HOMEHERO PROVIDER</p>

        <h1>Customer Bookings</h1>

        <span>
          View and manage service bookings from customers.
        </span>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-provider-bookings">
          <div className="provider-empty-icon">
            📋
          </div>

          <h2>No Bookings Yet</h2>

          <p>
            You don't have any customer bookings right now.
          </p>

          <button
            onClick={() => navigate("/services")}
          >
            View Services
          </button>
        </div>
      ) : (
        <div className="provider-bookings-grid">
          {bookings.map((booking) => (
            <div
              className="provider-booking-card"
              key={booking._id}
            >
              <div className="provider-booking-top">
                <div className="provider-booking-icon">
                  🏠
                </div>

                <span
                  className={`provider-status status-${booking.status}`}
                >
                  {booking.status}
                </span>
              </div>

              <h2>
                {booking.service?.title ||
                  "Home Service"}
              </h2>

              <p className="provider-category">
                {booking.service?.category ||
                  "Service"}
              </p>

              <div className="customer-section">
                <h3>Customer</h3>

                <p>
                  <strong>Name:</strong>{" "}
                  {booking.customer?.name || "N/A"}
                </p>

                <p>
                  <strong>Email:</strong>{" "}
                  {booking.customer?.email || "N/A"}
                </p>

                <p>
                  <strong>Phone:</strong>{" "}
                  {booking.customer?.phone || "N/A"}
                </p>
              </div>

              <div className="provider-booking-info">
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

              <div className="provider-booking-detail">
                <span>Address</span>
                <p>{booking.address}</p>
              </div>

              {booking.description && (
                <div className="provider-booking-detail">
                  <span>Description</span>
                  <p>{booking.description}</p>
                </div>
              )}

              {booking.status === "pending" && (
                <div className="booking-actions">
                  <button
                    className="accept-btn"
                    onClick={() =>
                      updateBookingStatus(
                        booking._id,
                        "accept"
                      )
                    }
                  >
                    Accept
                  </button>

                  <button
                    className="reject-btn"
                    onClick={() =>
                      updateBookingStatus(
                        booking._id,
                        "reject"
                      )
                    }
                  >
                    Reject
                  </button>
                </div>
              )}

              {booking.status === "accepted" && (
                <button
                  className="complete-btn"
                  onClick={() =>
                    updateBookingStatus(
                      booking._id,
                      "complete"
                    )
                  }
                >
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProviderBookings;