import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
          setError(
            data.message ||
              "Unable to load services"
          );
          return;
        }

        const allServices =
          data.services || data;

        const activeServices =
          allServices.filter(
            (service) =>
              service.isActive === true
          );

        setServices(activeServices);

      } catch (error) {
        console.error(
          "Services error:",
          error
        );

        setError(
          "Unable to connect to server"
        );

      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section
      className="services-section"
      id="services"
    >

      <div className="section-heading">

        <p>
          WHAT WE OFFER
        </p>

        <h2>
          Popular Services
        </h2>

        <span>
          Choose a service and connect
          with a trusted professional.
        </span>

      </div>

      {loading && (
        <p
          style={{
            textAlign: "center",
          }}
        >
          Loading services...
        </p>
      )}

      {error && (
        <p
          style={{
            textAlign: "center",
            color: "#dc2626",
          }}
        >
          {error}
        </p>
      )}

      {!loading &&
        !error &&
        services.length > 0 && (
          <div className="service-grid">

            {services.map((service) => (
              <div
                className="service-card"
                key={service._id}
              >

                <div className="service-icon">
                  {getServiceIcon(
                    service.category
                  )}
                </div>

                <h3>
                  {service.title}
                </h3>

                <p>
                  {service.description}
                </p>

                <p className="service-price">
                  Starting from ₹
                  {service.price}
                </p>

                <button
                  onClick={() =>
                    navigate(
                      `/services/${service._id}`
                    )
                  }
                >
                  View Details →
                </button>

              </div>
            ))}

          </div>
        )}

      {!loading &&
        !error &&
        services.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#64748b",
            }}
          >
            No services available right
            now.
          </p>
        )}

    </section>
  );
}

export default Services;