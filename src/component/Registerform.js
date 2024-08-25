import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '', // Password field
    firstName: '',
    lastName: '',
    phoneNo: '', // Phone number field
    custAddress: '', // Customer address field
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
      formData.firstName &&
      formData.lastName &&
      formData.phoneNo && // Include phone number in validation
      formData.custAddress // Include address in validation
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Please fill out all fields correctly.');
      return;
    }

    setLoading(true); // Indicate loading state

    try {
      const response = await fetch('http://localhost:8080/api/customer/add/customer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password, // Include password with user data
          firstName: formData.firstName,
          lastName: formData.lastName,
          phoneNo: formData.phoneNo, // Include phone number with user data
          custAddress: formData.custAddress, // Include address with user data
          role: formData.role // Include selected role
        })
      });

      if (response.ok) {
        alert('User registered successfully!');
        // Optionally, clear the form or redirect
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
      setLoading(false); // Stop loading indicator
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h2 style={{color:"green"}}>CUSTOMER REGISTRATION</h2>
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
          </div>
          <div className="form-row">
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
                type="text"
                id="firstName"
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
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group half-width">
              <input
                type="text"
                id="phoneNo"
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
                id="custAddress"
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
                disabled={loading || !isFormValid()} // Disable if loading or invalid
                style={{ paddingBottom: "35px" }}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
