import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const userEmail = 'example@example.com';
    const userPassword = 'password123';

    if (email === userEmail && password === userPassword) {
      // No need to make API call if credentials are hardcoded
      const data = { role: 'admin' }; // Replace with actual user data
      setIsLoggedIn(true);
      setError(null);

      // Store user data in local storage
      localStorage.setItem('userData', JSON.stringify(data));
    } else {
      axios.post('http://localhost:8080/api/users/get/users', {
        email,
        password
      })
     .then(response => {
        const data = response.data;
        setIsLoggedIn(true);
        setError(null);

        // Store user data in local storage
        localStorage.setItem('userData', JSON.stringify(data));

        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (data.role === 'customer') {
          navigate('/customer-dashboard');
        } else if (data.role === 'endor') {
          navigate('/vendor-dashboard');
        } else {
          // Handle unknown role or additional roles as needed
          navigate('/');
        }
      })
     .catch(error => {
        setError('Invalid email or password');
      });
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <div className="error-message">{error}</div>}
        {isLoggedIn && <div className="logged-in-message">You are now logged in!</div>}
      </div>
    </div>
  );
};

export default Login;