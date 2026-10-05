import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Services.css";

function Services() {
  const navigate = useNavigate();

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getServiceIcon = (category) => {
    const icons = {
      electrician: "⚡",
      plumber: "🔧",
      carpenter: "🪚",
      "ac-repair": "❄️",
      tutor: "📚",
    };

    return icons[category] || "🏠";
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/services"
        );

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Unable to load services");
          return;
        }

        setServices(data.services || data);
      } catch (error) {
        console.error("Services error:", error);
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <div className="services-page-header">
        <p>HOMEHERO SERVICES</p>

        <h1>Find the Right Service for Your Home</h1>

        <span>
          Choose from trusted professionals for your home service needs.
        </span>
      </div>

      {loading && (
        <p className="services-message">
          Loading services...
        </p>
      )}

      {error && (
        <p className="services-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="services-page-grid">
          {services.map((service) => (
            <div
              className="services-page-card"
              key={service._id}
            >
              <div className="services-page-icon">
                {getServiceIcon(service.category)}
              </div>

              <div className="service-category">
                {service.category}
              </div>

              <h2>{service.title}</h2>

              <p>{service.description}</p>

              <div className="service-bottom">
                <strong>₹{service.price}</strong>

                <button
                  onClick={() =>
                    navigate(`/services/${service._id}`)
                  }
                >
                  View Details →
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && services.length === 0 && (
        <p className="services-message">
          No services available right now.
        </p>
      )}
    </div>
  );
}

export default Services;