import { useEffect, useState } from "react";

import "./AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUsers(data.users);
      } else {
        alert(data.message || "Failed to fetch users");
      }
    } catch (error) {
      console.error("Fetch users error:", error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleUserStatus = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/users/${userId}/status`,
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

        // Refresh users after status change
        fetchUsers();
      } else {
        alert(data.message || "Failed to update user");
      }
    } catch (error) {
      console.error("Toggle user error:", error);
      alert("Server error");
    }
  };

  if (loading) {
    return (
      <h2 className="admin-users-loading">
        Loading users...
      </h2>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="admin-users-container">
        <h1>Manage Users</h1>

        <p className="admin-users-subtitle">
          View and manage HomeHero customers and providers.
        </p>

        <div className="users-table-wrapper">
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.phone}</td>

                  <td>
                    <span
                      className={`role-badge ${user.role}`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    {user.role === "admin" ? (
                      <span className="status-admin">
                        Admin
                      </span>
                    ) : user.isRestricted ? (
                      <span className="status-restricted">
                        Restricted
                      </span>
                    ) : (
                      <span className="status-active">
                        Active
                      </span>
                    )}
                  </td>

                  <td>
                    {user.role === "admin" ? (
                      <span className="no-action">
                        Not Allowed
                      </span>
                    ) : (
                      <button
                        className={
                          user.isRestricted
                            ? "unrestrict-btn"
                            : "restrict-btn"
                        }
                        onClick={() =>
                          toggleUserStatus(user._id)
                        }
                      >
                        {user.isRestricted
                          ? "Unrestrict"
                          : "Restrict"}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;