import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin'); // Default role is admin
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form submission

    try {
      const response = await axios.post(
        'http://localhost:8080/login',
        { email: username, password },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const data = response.data;
      localStorage.setItem('role', data.role); // Store role in local storage

      // Make a second API call with userId
      const userId = data.userId; // Assuming your response contains userId
      const secondApiResponse = await axios.get(`http://localhost:8080/user/${userId}`);
      const userData = secondApiResponse.data;

      // Example redirect logic based on role
      if (data.role === 'admin') {
        navigate('/admin-dashboard');
      } else if (data.role === 'customer') {
        navigate('/customer-dashboard');
      } else if (data.role === 'vendor') {
        navigate('/vendor-dashboard');
      } else {
        // Handle unknown role or additional roles as needed
        navigate('/');
      }

    } catch (error) {
      console.error('Login error:', error);
      alert('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>
        
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
