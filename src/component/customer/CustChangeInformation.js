import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';

const CustChangeInformation = () => {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    address: '',
    contactNumber: '',
    email: '',
    customerType: '',
    priceLevel: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prevInfo) => ({ ...prevInfo, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add API call to update customer information
    console.log(customerInfo);
  };

  return (
    <>
      <Navigation />
      <div className="main">
        <h1>Customer Change Information Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              placeholder='custId'
              value={customerInfo.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="address"
              name="address"
                 placeholder='Name'
              value={customerInfo.address}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
                 placeholder='contactNumber'
              value={customerInfo.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
                 placeholder='email'
              value={customerInfo.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <select
              id="customerType"
              name="customerType"
                 placeholder='customertype'
              value={customerInfo.customerType}
              onChange={handleChange}
            >
              <option value="">Select vendor Type</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
         
          <button type="submit">Update Information</button>
          {error && <div className="error">{error}</div>}
        </form>
      </div>
    </>
  );
};

export default CustChangeInformation;