// src/components/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import './UserDashboard.css';

function UserDashboard() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/user/${username}`).then(res => {
      setUser(res.data);
      setFormData(res.data);
    });
  }, [username]);

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/user/${user.id}`, formData);
      setUser(formData);
      setEditing(false);
      alert('✅ Profile updated successfully!');
    } catch (error) {
      alert('❌ Failed to update profile.');
    }
  };

  const placeholderImage = "https://via.placeholder.com/150?text=Profile";

  return (
    <div className="user-dashboard-container">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>Welcome, <strong>{username}</strong></p>
        <button className="btn btn-secondary btn-back" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>

      {user ? (
        <div className="dashboard-main">
          {/* Sidebar */}
          <div className="profile-sidebar">
            <img
              src={user.profileImage || placeholderImage}
              alt="Profile"
              className="profile-image"
            />
            <h3>{user.name}</h3>
            <p className="text-muted">{user.username}</p>
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={() => setEditing(!editing)}
            >
              {editing ? 'Cancel Edit' : 'Edit Profile'}
            </button>
          </div>

          {/* Main Content */}
          <div className="profile-details-card">
            <h2>Profile Information</h2>
            <div className="profile-grid">
              {[
                { label: 'Full Name', key: 'name' },
                { label: 'Username', key: 'username' },
                { label: 'Age', key: 'age' },
                { label: 'Phone', key: 'phone' },
                { label: 'Email', key: 'email' },
                { label: 'Address', key: 'address' },
                { label: 'City', key: 'city' },
                { label: 'State', key: 'state' },
                { label: 'Country', key: 'country' }
              ].map(field => (
                <div key={field.key} className="profile-field">
                  <label>{field.label}</label>
                  {editing ? (
                    <input
                      type={field.key === 'age' ? 'number' : 'text'}
                      name={field.key}
                      value={formData[field.key] || ''}
                      onChange={handleChange}
                      className="profile-input"
                    />
                  ) : (
                    <span>{user[field.key]}</span>
                  )}
                </div>
              ))}
            </div>

            {editing && (
              <div className="profile-actions">
                <button className="btn btn-success me-2" onClick={handleUpdate}>Save Changes</button>
                <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="loading">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p>Loading profile data...</p>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
