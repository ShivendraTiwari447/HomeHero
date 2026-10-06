import { useEffect, useState } from "react";
import "./ProviderServices.css";

function ProviderServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const predefinedCategories = [
    "tutor",
    "electrician",
    "plumber",
    "carpenter",
    "ac-repair",
  ];

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/services"
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch services"
        );
      }

      const myServices = data.services.filter(
        (service) =>
          service.provider?._id === user?.id ||
          service.provider?._id === user?._id
      );

      setServices(myServices);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      price: "",
    });

    setEditingService(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");

      const url = editingService
        ? `http://localhost:5000/api/services/${editingService._id}`
        : "http://localhost:5000/api/services";

      const method = editingService ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category.trim().toLowerCase(),
          price: Number(formData.price),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong"
        );
      }

      alert(
        editingService
          ? "Service updated successfully"
          : "Service created successfully"
      );

      resetForm();
      fetchServices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);

    setFormData({
      title: service.title,
      description: service.description,
      category: service.category,
      price: service.price,
    });

    setShowForm(true);
  };

  const handleDelete = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmDelete) return;

    try {
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/services/${serviceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete service"
        );
      }

      alert("Service deleted successfully");

      fetchServices();
    } catch (error) {
      setError(error.message);
    }
  };

  const handleToggleStatus = async (service) => {
    try {
      setError("");

      const response = await fetch(
        `http://localhost:5000/api/services/${service._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            isActive: !service.isActive,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update status"
        );
      }

      fetchServices();
    } catch (error) {
      setError(error.message);
    }
  };

  const isPredefinedCategory = predefinedCategories.includes(
    formData.category
  );

  return (
    <div className="provider-services-page">
      <div className="provider-services-header">
        <div>
          <h1>My Services</h1>
          <p>Manage the services you provide.</p>
        </div>

        <button
          className="add-service-btn"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          + Add Service
        </button>
      </div>

      {error && (
        <div className="service-error">
          {error}
        </div>
      )}

      {showForm && (
        <div className="service-form-card">
          <div className="form-header">
            <h2>
              {editingService
                ? "Edit Service"
                : "Add New Service"}
            </h2>

            <button
              onClick={resetForm}
              className="close-form-btn"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Service Title */}
            <div className="form-group">
              <label>Service Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Example: AC Repair Service"
                required
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label>Description</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your service..."
                rows="4"
                required
              />
            </div>

            {/* Category + Price */}
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>

                <select
                  value={
                    isPredefinedCategory
                      ? formData.category
                      : formData.category
                      ? "other"
                      : ""
                  }
                  onChange={(e) => {
                    if (e.target.value === "other") {
                      setFormData({
                        ...formData,
                        category: "",
                      });
                    } else {
                      setFormData({
                        ...formData,
                        category: e.target.value,
                      });
                    }
                  }}
                  required
                >
                  <option value="">
                    Select Category
                  </option>

                  <option value="tutor">
                    Tutor
                  </option>

                  <option value="electrician">
                    Electrician
                  </option>

                  <option value="plumber">
                    Plumber
                  </option>

                  <option value="carpenter">
                    Carpenter
                  </option>

                  <option value="ac-repair">
                    AC Repair
                  </option>

                  <option value="other">
                    Other / Custom
                  </option>
                </select>

                {/* Custom Category */}
                {!isPredefinedCategory && (
                  <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="Example: Painter, Cleaner, RO Repair"
                    required
                    style={{
                      marginTop: "10px",
                    }}
                  />
                )}
              </div>

              {/* Price */}
              <div className="form-group">
                <label>Price (₹)</label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="500"
                  min="0"
                  required
                />
              </div>
            </div>

            {/* Form Buttons */}
            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="save-service-btn"
              >
                {editingService
                  ? "Update Service"
                  : "Add Service"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Services */}
      <div className="services-section">
        <h2>Your Services</h2>

        {loading ? (
          <div className="empty-message">
            Loading services...
          </div>
        ) : services.length === 0 ? (
          <div className="empty-message">
            <h3>No services yet</h3>

            <p>
              Add your first service to start receiving
              bookings.
            </p>
          </div>
        ) : (
          <div className="services-grid">
            {services.map((service) => (
              <div
                className="service-card"
                key={service._id}
              >
                <div className="service-card-top">
                  <span
                    className={`service-status ${
                      service.isActive
                        ? "active"
                        : "inactive"
                    }`}
                  >
                    {service.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <h3>{service.title}</h3>

                <span className="service-category">
                  {service.category}
                </span>

                <p>{service.description}</p>

                <div className="service-price">
                  ₹{service.price}
                </div>

                <div className="service-actions">
                  <button
                    className="edit-btn"
                    onClick={() =>
                      handleEdit(service)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="toggle-btn"
                    onClick={() =>
                      handleToggleStatus(service)
                    }
                  >
                    {service.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(service._id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProviderServices;