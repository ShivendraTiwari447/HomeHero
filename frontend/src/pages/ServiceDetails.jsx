import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./ServiceDetails.css";

function ServiceDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/services/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          setError(
            data.message || "Service not found"
          );
          return;
        }

        setService(data.service || data);
      } catch (error) {
        console.error(
          "Service details error:",
          error
        );

        setError(
          "Unable to connect to server"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <p className="details-message">
        Loading service...
      </p>
    );
  }

  // Error
  if (error) {
    return (
      <p className="details-error">
        {error}
      </p>
    );
  }

  // Service not found
  if (!service) {
    return (
      <p className="details-error">
        Service not found
      </p>
    );
  }

  return (
    <div className="service-details-page">
      {/* Back Button */}
      <button
        className="back-btn"
        onClick={() => navigate("/services")}
      >
        ← Back to Services
      </button>

      <div className="service-details-card">
        {/* Icon */}
        <div className="details-icon">
          🏠
        </div>

        {/* Category */}
        <span className="details-category">
          {service.category}
        </span>

        {/* Title */}
        <h1>{service.title}</h1>

        {/* Description */}
        <p className="details-description">
          {service.description}
        </p>

        {/* Service Information */}
        <div className="details-info">
          <div>
            <span>Service Price</span>

            <strong>
              ₹{service.price}
            </strong>
          </div>

          <div>
            <span>Status</span>

            <strong>
              {service.isActive
                ? "Available"
                : "Unavailable"}
            </strong>
          </div>
        </div>

        {/* Booking Button */}
        {service.isActive ? (
          <button
            className="book-service-btn"
            onClick={() =>
              navigate(
                `/booking/${service._id}`
              )
            }
          >
            Book Service
          </button>
        ) : (
          <button
            className="book-service-btn"
            disabled
          >
            Service Unavailable
          </button>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;