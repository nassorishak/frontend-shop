
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNo: '',
    custAddress: '',
    role: 'CUSTOMER'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.firstName &&
      formData.lastName &&
      formData.phoneNo &&
      formData.custAddress &&
      formData.role
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Please fill out all fields correctly.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/users/add/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          role: formData.role
        })
      });

      if (response.ok) {
        alert('User registered successfully!');
        setFormData({
          email: '',
          password: '',
          firstName: '',
          lastName: '',
          phoneNo: '',
          custAddress: '',
          role: 'CUSTOMER'
        });
      } else {
        throw new Error('Registration failed, please try again.');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      alert('Failed to register user: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 style={{ color: 'green', textAlign: 'center' }}>USER REGISTRATION</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error">{error}</div>}

          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="password"
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
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="form-row">
            <div className="form-group half-width">
              <label style={{ color: 'green', fontWeight: 'bold' }}>Select Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: '#f9f9f9'
                }}
              >
                <option value="CUSTOMER">Customer</option>
                <option value="VENDOR">Vendor</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          {/* Phone and Address */}
          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="text"
                name="phoneNo"
                placeholder="Enter your phone number"
                value={formData.phoneNo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group half-width">
              <input
                type="text"
                name="custAddress"
                placeholder="Enter your address"
                value={formData.custAddress}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="submit"
                value={loading ? 'Registering...' : 'Register'}
                disabled={loading || !isFormValid()}
                style={{
                  backgroundColor: 'green',
                  color: 'white',
                  padding: '12px',
                  border: 'none',
                  borderRadius: '8px',
                  width: '100%',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;

