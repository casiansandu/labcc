import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { useAuth } from '../context/AuthContext';
import { isMockApiError, mockLoginEndpoint } from '../mocks/mockApi';

const Login = () => {
  const navigate = useNavigate();
  const { refreshAuth } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await mockLoginEndpoint({ email, password });
      await refreshAuth();
      navigate('/home');
    } catch (error) {
      if (isMockApiError(error)) {
        setError(error.message);
        return;
      }

      setError('Mock endpoint error');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="login-alt-link">
        Don&apos;t have an account? <Link to="/register">Register now</Link>
      </p>
    </div>
  );
};

export default Login;