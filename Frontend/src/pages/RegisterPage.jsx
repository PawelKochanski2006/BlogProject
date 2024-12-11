import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { Link, useNavigate } from 'react-router-dom';





const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/auth/register', formData);
      setMessage(response.data.message);
      setError(null);
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err.response?.data);
      setError(err.response?.data?.message || 'Registration failed');
      setMessage(null);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
        {message && <p className="text-green-600">{message}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Register</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>
        <Link to={`/login`} >
          <p className="text-indigo-600 hover:underline">Login in</p>
        </Link>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
