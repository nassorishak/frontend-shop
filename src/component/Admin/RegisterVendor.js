import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';


const RegisterVendor = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    role: 'VENDOR',
    vendorType: '',
    address: '',
    vendorCompany: ''
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
      formData.password === formData.confirmPassword &&
      formData.vendorType &&
      formData.address &&
      formData.vendorCompany
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError('Please fill out all fields correctly and make sure passwords match.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/vendor/add/vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('Vendor registered successfully!');
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: '',
          role: 'VENDOR',
          vendorType: '',
          address: '',
          vendorCompany: ''
        });
      } else {
        throw new Error('Registration failed, please try again.');
      }
    } catch (error) {
      console.error('Error registering vendor:', error);
      alert('Failed to register vendor: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navigation />
      <div className='main' style={{backgroundColor:"floralwhite"}}>
        <div className="register-container">
          <div className="register-form">
            <h2>Vendor Registration</h2>
            <form onSubmit={handleSubmit}>
              {error && <div className="error">{error}</div>}
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="password"
                    id="confirm-password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    style={{width:"190px"}}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <select
                    id="vendorType"
                    name="vendorType"
                    value={formData.vendorType}
                    onChange={handleChange}
                    required
                    style={{width:"170px"}}
                  >
                    <option value="">SelectVendorType</option>
                    <option value="Supplier">Supplier</option>
                    <option value="Distributor">Distributor</option>
                    <option value="Manufacturer">Manufacturer</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{width:"100px"}}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    id="vendorCompany"
                    name="vendorCompany"
                    placeholder="Vendor Company"
                    value={formData.vendorCompany}
                    onChange={handleChange}
                    required
                    style={{width:"170px"}}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="submit"
                    value={loading ? 'Registering...' : 'Register'}
                    disabled={loading || !isFormValid()}
                    style={{width:"200px",paddingBottom:"30px",marginLeft:"140px"}}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterVendor;
