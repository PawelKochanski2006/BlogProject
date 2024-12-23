import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [touchedFields, setTouchedFields] = useState({
    username: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = useCallback(() => {
    const newErrors = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (touchedFields.username && formData.username.length < 3) {
      newErrors.username = 'Nazwa użytkownika musi mieć minimum 3 znaki';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (touchedFields.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Podaj prawidłowy adres email';
    }

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (touchedFields.password && !passwordRegex.test(formData.password)) {
      newErrors.password = 'Hasło musi mieć minimum 8 znaków, zawierać literę i cyfrę';
    }

    if (touchedFields.confirmPassword && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Hasła nie są takie same';
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(error => error !== '');
    const isComplete = Object.values(formData).every(value => value !== '');

    return !hasErrors && isComplete;
  }, [formData, touchedFields]);

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData, touchedFields, validateForm]);

  const handleSubmit = async e => {
    e.preventDefault();

    setTouchedFields({
      username: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    if (!isFormValid) {
      return;
    }

    const { confirmPassword, ...dataToSubmit } = formData;
    const result = await onSubmit(dataToSubmit);

    if (!result.success) {
      setErrors(prev => ({
        ...prev,
        general: result.error
      }));
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBlur = e => {
    const { name } = e.target;
    setTouchedFields(prev => ({
      ...prev,
      [name]: true,
    }));
  };

  const renderInput = (name, label, type = 'text') => (
    <div className="mb-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        onBlur={handleBlur}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${touchedFields[name] && errors[name] ? 'border-red-500' : 'border-gray-300'}`}
        required
      />
      {touchedFields[name] && errors[name] && (
        <p className="text-red-500 text-sm mt-1">{errors[name]}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Rejestracja</h1>

      {renderInput('username', 'Nazwa użytkownika')}
      {renderInput('email', 'Email', 'email')}
      {renderInput('password', 'Hasło', 'password')}
      {renderInput('confirmPassword', 'Potwierdź hasło', 'password')}

      {errors.general && (
        <p className="text-red-600 mb-4">{errors.general}</p>
      )}

      <div className="mb-4">
        <Link to="/login" className="text-indigo-600 hover:underline">
          Masz już konto? Zaloguj się
        </Link>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-lg transition
          ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'}`}
      >
        {loading ? 'Rejestracja...' : 'Zarejestruj się'}
      </button>
    </form>
  );
};

export default RegisterForm;
