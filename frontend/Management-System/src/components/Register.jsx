// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {
  const [form, setForm] = useState({
    name: '',
    age: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    username: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await api.post('/register', form);
      alert('✅ Registered successfully. Wait for admin approval.');
      navigate('/');
    } catch (err) {
      console.error('Submit error:', err);
      alert('❌ Registration failed. Please check your details or try again.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4 col-md-8 offset-md-2">
        <h3 className="text-center text-success mb-4">📝 New User Registration</h3>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Full Name</label>
            <input className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Age</label>
            <input type="number" className="form-control" name="age" value={form.age} onChange={handleChange} required />
          </div>

          <div className="col-md-3 mb-3">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
          </div>

          <div className="col-12 mb-3">
            <label className="form-label">Address</label>
            <input className="form-control" name="address" value={form.address} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">City</label>
            <input className="form-control" name="city" value={form.city} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">State</label>
            <input className="form-control" name="state" value={form.state} onChange={handleChange} required />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Country</label>
            <input className="form-control" name="country" value={form.country} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Username</label>
            <input className="form-control" name="username" value={form.username} onChange={handleChange} required />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
          </div>

          <div className="text-center mt-3">
            <button className="btn btn-success px-4 me-3" onClick={handleSubmit}>
              ✅ Register
            </button>
            <button className="btn btn-secondary px-4" onClick={handleBackToHome}>
              🔙 Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
