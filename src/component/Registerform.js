import React, { useState } from 'react';

const Registerform = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/add/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: 'USER' // Assuming default role for new users
        })
      });

      if (response.ok) {
        alert('User registered successfully!');
        // Optionally, redirect or do something else after successful registration
      } else {
        throw new Error('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user');
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <input type="submit" value="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registerform;