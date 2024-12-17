import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm.component';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async credentials => {
    setLoading(true);
    const result = await login(credentials.usernameOrEmail, credentials.password);
    setLoading(false);

    if (result.success) {
      navigate(-1);
    }
    return result;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

export default Login;
