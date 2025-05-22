import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Login failed');
        return;
      }

      // Save logged-in user info in global App state
      setUser({
        id: data.id,
        role: data.role,
        staffNumber: data.staffNumber,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      // Navigate based on role
      if (data.role === 'warden') {
        navigate('/warden-dashboard');
      } else if (data.role === 'hstech') {
        navigate('/hst-dashboard');
      } else {
        setError('Unknown user role');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <div className="left-panel">
        <h1>Fire Warden Location Logging System</h1>
      </div>

      <div className="right-panel">
        <div className="right-content">
          <h2 className="login-heading">Login</h2>
          <div className="form-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign In</button>
              {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
