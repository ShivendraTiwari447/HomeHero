import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./Booking.css";

function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bookingDate, setBookingDate] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();

    setError("");

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    if (!bookingDate || !address) {
      setError("Please fill booking date and address");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/bookings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            service: id,
            bookingDate,
            address,
            description,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Booking failed");
        return;
      }

      alert("Booking created successfully!");

      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      setError("Unable to connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-card">
        <div className="booking-header">
          <h1>Book Service</h1>
          <p>Enter your booking details</p>
        </div>

        <form onSubmit={handleBooking}>
          <div className="booking-form-group">
            <label>Booking Date & Time</label>

            <input
              type="datetime-local"
              value={bookingDate}
              onChange={(e) =>
                setBookingDate(e.target.value)
              }
            />
          </div>

          <div className="booking-form-group">
            <label>Address</label>

            <textarea
              placeholder="Enter your complete address"
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              rows="4"
            />
          </div>

          <div className="booking-form-group">
            <label>Description</label>

            <textarea
              placeholder="Describe your problem or requirement"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="4"
            />
          </div>

          {error && (
            <p className="booking-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="booking-submit-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Booking..."
              : "Confirm Booking"}
          </button>
        </form>

        <button
          className="booking-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>
    </div>
  );
}

export default Booking;