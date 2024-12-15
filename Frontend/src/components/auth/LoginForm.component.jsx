import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../common/ErrorMessage.component';

const LoginForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    const result = await onSubmit(formData);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="mt-20">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Logowanie</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Email lub nazwa użytkownika</label>
          <input
            type="text"
            name="usernameOrEmail"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Hasło</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="mb-4">
          <Link to="/register" className="text-indigo-600 hover:underline">
            Nie masz jeszcze konta? Zarejestruj się
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Logowanie...' : 'Zaloguj się'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
