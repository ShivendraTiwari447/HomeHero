import { useEffect, useState } from "react";
import "./AdminServices.css";

function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/services",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setServices(data.services);
      } else {
        alert(data.message || "Failed to fetch services");
      }
    } catch (error) {
      console.error("Fetch services error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const toggleServiceStatus = async (serviceId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${serviceId}/status`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchServices();
      } else {
        alert(data.message || "Failed to update service");
      }
    } catch (error) {
      console.error("Toggle service error:", error);
      alert("Server error");
    }
  };

  const deleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/services/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        fetchServices();
      } else {
        alert(data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Delete service error:", error);
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <h2 className="admin-services-loading">
        Loading services...
      </h2>
    );
  }

  return (
    <div className="admin-services-page">
      <div className="admin-services-container">
        <h1>Manage Services</h1>

        <p className="admin-services-subtitle">
          View and manage all HomeHero services.
        </p>

        <div className="services-table-wrapper">
          <table className="admin-services-table">
            <thead>
              <tr>
                <th>Service</th>
                <th>Provider</th>
                <th>Category</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {services.map((service) => (
                <tr key={service._id}>
                  <td>
                    <strong>{service.title}</strong>
                    <br />
                    <small>{service.description}</small>
                  </td>

                  <td>
                    {service.provider?.name || "Unknown"}
                    <br />
                    <small>
                      {service.provider?.email || ""}
                    </small>
                  </td>

                  <td>{service.category}</td>

                  <td>₹{service.price}</td>

                  <td>
                    {service.isActive ? (
                      <span className="service-active">
                        Active
                      </span>
                    ) : (
                      <span className="service-inactive">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td>
                    <button
                      className={
                        service.isActive
                          ? "deactivate-btn"
                          : "activate-btn"
                      }
                      onClick={() =>
                        toggleServiceStatus(service._id)
                      }
                    >
                      {service.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      className="delete-service-btn"
                      onClick={() =>
                        deleteService(service._id)
                      }
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {services.length === 0 && (
            <p className="no-services">
              No services found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminServices;