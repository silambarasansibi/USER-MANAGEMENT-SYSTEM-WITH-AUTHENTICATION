import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, {
  approveUser,
  declineUser,
  deleteUser,
  updateUser,
  registerUser,
  getAllUsers,
  getPendingUsers,
} from "../api";
import {
  FaUserCheck,
  FaUserTimes,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [pending, setPending] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    password: "",
    age: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    country: "",
    approved: true,
  });

  const [editingUser, setEditingUser] = useState(null);

  // Fetch users on load
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const all = await getAllUsers();
      const pendingUsers = await getPendingUsers();
      setUsers(all.data || []);
      setPending(pendingUsers.data || []);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  // Add user
  const addUser = async () => {
    if (!newUser.name || !newUser.username || !newUser.password) {
      alert("Name, Username, and Password are required");
      return;
    }

    try {
      await registerUser({
        ...newUser,
        age: newUser.age ? Number(newUser.age) : 0,
        phone: newUser.phone || "",
      });
      setNewUser({
        name: "",
        username: "",
        password: "",
        age: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        approved: true,
      });
      fetchData();
    } catch (err) {
      console.error("Add user error:", err);
      alert("Failed to add user. Check server status or required fields.");
    }
  };

  // Approve / Decline / Delete
  const handleApprove = async (id) => {
    await approveUser(id);
    fetchData();
  };

  const handleDecline = async (id) => {
    if (window.confirm("Decline this user?")) {
      await declineUser(id);
      fetchData();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Delete this user permanently?")) {
      await deleteUser(id);
      fetchData();
    }
  };

  // Edit user
  const startEdit = (user) => setEditingUser({ ...user });

  const handleEditChange = (e) =>
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value || "" });

  const submitEdit = async () => {
    await updateUser(editingUser.id, {
      ...editingUser,
      age: editingUser.age ? Number(editingUser.age) : 0,
    });
    setEditingUser(null);
    fetchData();
  };

  const filteredUsers = users.filter((u) =>
    Object.values(u).some((val) =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleLogout = () => navigate("/");

  return (
    <div className={`admin-dashboard ${darkMode ? "dark-mode" : ""}`}>
      <div className="bg-overlay"></div>

      <div className="container py-5 flex-grow-1">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2 className="fw-bold text-white">Admin Dashboard</h2>
          <div className="d-flex gap-2">
            <button
              className={`btn btn-sm ${
                darkMode ? "btn-outline-light" : "btn-outline-secondary"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun className="me-1" /> : <FaMoon className="me-1" />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              <FaSignOutAlt className="me-1" /> Logout
            </button>
          </div>
        </div>

        {/* Add New User */}
        <div className="card mb-4 shadow professional-card">
          <div className="card-header bg-professional-card text-white fw-bold">
            Add New User
          </div>
          <div className="card-body">
            <div className="row g-3">
              {["name", "username", "password", "age", "phone", "city"].map(
                (field) => (
                  <div className="col-md-2" key={field}>
                    <input
                      name={field}
                      type={field === "password" ? "password" : "text"}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      className="form-control professional-input"
                      value={newUser[field] || ""}
                      onChange={(e) =>
                        setNewUser({ ...newUser, [field]: e.target.value })
                      }
                    />
                  </div>
                )
              )}
              <div className="col-md-2">
                <button className="btn btn-professional-add w-100" onClick={addUser}>
                  <FaPlus className="me-1" /> Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Users */}
        <div className="card mb-4 shadow professional-card">
          <div className="card-header bg-professional-warning text-white fw-bold">
            Pending Approvals
          </div>
          <div className="card-body">
            {pending.length === 0 ? (
              <p className="text-muted">No pending users</p>
            ) : (
              pending.map((user) => (
                <div
                  key={user.id}
                  className="d-flex justify-content-between align-items-center mb-2 p-3 rounded border professional-alert"
                >
                  <span>
                    {user.name} (<strong>{user.username}</strong>)
                  </span>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-professional-approve btn-sm"
                      onClick={() => handleApprove(user.id)}
                    >
                      <FaUserCheck className="me-1" /> Approve
                    </button>
                    <button
                      className="btn btn-professional-decline btn-sm"
                      onClick={() => handleDecline(user.id)}
                    >
                      <FaUserTimes className="me-1" /> Decline
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* All Users */}
        <div className="card shadow professional-card">
          <div className="card-header bg-professional-secondary text-white fw-bold">
            All Users
          </div>
          <div className="card-body">
            <input
              type="text"
              className="form-control mb-3 professional-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="table-responsive">
              <table className="table table-hover professional-table">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) =>
                    editingUser?.id === user.id ? (
                      <tr key={user.id}>
                        {[
                          "name",
                          "username",
                          "age",
                          "phone",
                          "address",
                          "city",
                          "state",
                          "country",
                        ].map((field) => (
                          <td key={field}>
                            <input
                              className="form-control professional-input"
                              name={field}
                              value={editingUser[field] || ""}
                              onChange={handleEditChange}
                            />
                          </td>
                        ))}
                        <td>
                          {user.approved ? (
                            <span className="badge bg-success">Approved</span>
                          ) : (
                            <span className="badge bg-warning text-dark">Pending</span>
                          )}
                        </td>
                        <td className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-professional-approve btn-sm"
                            onClick={submitEdit}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setEditingUser(null)}
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.username}</td>
                        <td>{user.age}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                        <td>{user.city}</td>
                        <td>{user.state}</td>
                        <td>{user.country}</td>
                        <td>
                          {user.approved ? (
                            <span className="badge bg-success">Approved</span>
                          ) : (
                            <span className="badge bg-warning text-dark">Pending</span>
                          )}
                        </td>
                        <td className="d-flex gap-2 justify-content-center">
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => startEdit(user)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDelete(user.id)}
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
