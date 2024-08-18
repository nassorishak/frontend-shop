import React, { useState } from 'react';
import axios from 'axios';  // Import axios

const SubscriptionForm = () => {
  // Define states for form inputs
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('MONTHLY'); // Default value set to 'MONTHLY'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('ACTIVE'); // Default value set to 'ACTIVE'
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('PENDING'); // Default value set to 'PENDING'
  const [type, setType] = useState('SERVICE');
  const [message, setMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Construct subscription object
    const subscription = {
      description,
      frequency,
      startDate,
      endDate,
      status,
      paymentMethod,
      paymentStatus,
      type
    };
    
    try {
      // Post request to the server
      const response = await axios.post('http://localhost:8080/api/subscriptions/', subscription, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Success message
      alert('Subscription created successfully.');
      // Reset form fields
      setDescription('');
      setFrequency('MONTHLY');
      setStartDate('');
      setEndDate('');
      setStatus('ACTIVE');
      setPaymentMethod('');
      setPaymentStatus('PENDING');
      setType('SERVICE');
    } catch (error) {
      // Error handling
      alert('Error creating subscription: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      <h1>Subscription Form</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Description:
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Frequency:
            <input 
              type="text" 
              value={frequency} 
              onChange={(e) => setFrequency(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Start Date:
            <input 
              type="date" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input 
              type="date" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Status:
            <input 
              type="text" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Payment Method:
            <input 
              type="text" 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Payment Status:
            <input 
              type="text" 
              value={paymentStatus} 
              onChange={(e) => setPaymentStatus(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div>
          <label>
            Subscription Type:
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="SERVICE">Service</option>
              <option value="PRODUCT">Product</option>
            </select>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SubscriptionForm;
