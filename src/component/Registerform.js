import React, { useState } from 'react';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'CUSTOMER' // Default role
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError(''); // Clear error when user types in the form
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.firstName &&
      formData.lastName &&
      formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Please fill out all fields correctly and make sure passwords match.');
      return;
    }

    setLoading(true); // Indicate loading state

    try {
      const response = await fetch('http://localhost:8080/api/users/add/users', { // Ensure correct API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role // Include selected role
        })
      });

      if (response.ok) {
        alert('User registered successfully!');
        // Optionally, clear the form or redirect
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          role: 'CUSTOMER' // Reset role to default
        });
      } else {
        throw new Error('Registration failed, please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user: ' + error.message);
    } finally {
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}
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
              <label htmlFor="role">Select Role:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="VENDOR">Vendor</option>
                <option value="CUSTOMER">Customer</option>
              </select>
            </div>
            <div className="form-group half-width">
              <input 
                type="submit"
                value={loading ? 'Registering...' : 'Register'}
                disabled={loading || !isFormValid()} // Disable if loading or invalid
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;