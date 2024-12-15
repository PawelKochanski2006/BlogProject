import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/register/RegisterForm.component';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async formData => {
    setLoading(true);
    try {
      const result = await register(formData);

      if (result.success) {
        navigate('/login');
        return { success: true };
      }

      return { success: false, error: result.error };
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20">
      <RegisterForm onSubmit={handleRegister} loading={loading} />
    </div>
  );
};

export default RegisterPage;
