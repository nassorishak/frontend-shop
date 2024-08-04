import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const data = response.data;
      localStorage.setItem('storedRole', response.data);
      localStorage.setItem('storedRole', data.role);
      localStorage.setItem('email', data.email);
      
      navigate('/vendor-dashboard'); // Navigate to dashboard on successful login
    } catch (error) {
      setError('Invalid email or password'); // Set error message
      console.error('login error', error);
    }
  };

  useEffect(() => {
    localStorage.removeItem('email');
    localStorage.removeItem('storedRole');
  }, []);

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input 
            type="submit" 
            value="Login" 
            className='new' 
          />
        </form>
        {error && <div className="error-message">{error}</div>}
        <Link to="/registerform">
                <input type="submit" value="Add customer" /><br></br><br></br>
              </Link>
        <button onClick={handleForgotPassword}>Forgot Password</button>
      </div>
    </div>
  );
};

export default Login;
