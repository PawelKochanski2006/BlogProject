import React, { useState } from 'react';
import apiClient from '../api/apiClient';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: ''
  });
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
      const response = await apiClient.post('/auth/login', formData);
      const token = response.data.token;
      localStorage.setItem('token', token); // Zapisujemy token w localStorage
      setError(null);
      alert('Login successful!');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err.response?.data);
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
        {error && <p className="text-red-600">{error}</p>}

        <h1 className="text-2xl font-bold text-gray-800 mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Username or Email</label>
          <input
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
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
        <Link to={`/register`} >
          <p className="text-indigo-600 hover:underline">Create an account</p>
        </Link>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
