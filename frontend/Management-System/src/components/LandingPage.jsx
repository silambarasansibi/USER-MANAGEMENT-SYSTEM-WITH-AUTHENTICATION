import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import './LandingPage.css';

function LandingPage() {
  const [admin, setAdmin] = useState({ username: '', password: '' });
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    if (admin.username === 'simbu' && admin.password === 'simbu2005') {
      navigate('/admin-dashboard');
    } else {
      alert('Invalid admin credentials.');
    }
  };

  const handleUserLogin = async () => {
    try {
      const res = await api.post('/login', user);
      if (res.data === 'not-approved') {
        alert('Your account is not approved yet.');
      } else if (res.data.username) {
        navigate(`/user-dashboard/${res.data.username}`);
      } else {
        alert('Invalid username or password.');
      }
    } catch (error) {
      alert('Login failed. Please try again later.');
    }
  };

  return (
    <div className="landing-page">
      <div className="background-pattern"></div>

      <div className="login-wrapper">
        <div className="login-card">
          <h2 className="login-title">Admin Login</h2>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={admin.username}
            onChange={(e) => setAdmin({ ...admin, username: e.target.value })}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={admin.password}
            onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
          />
          <button className="login-btn btn-primary" onClick={handleAdminLogin}>
            Sign In
          </button>
        </div>

        <div className="login-card">
          <h2 className="login-title">User Login</h2>
          <input
            type="text"
            className="login-input"
            placeholder="Username"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
          <input
            type="password"
            className="login-input"
            placeholder="Password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <button className="login-btn btn-success" onClick={handleUserLogin}>
            Sign In
          </button>
        </div>
      </div>

      <div className="register-link">
        <a href="/register">New user? Register here</a>
      </div>
    </div>
  );
}

export default LandingPage;
