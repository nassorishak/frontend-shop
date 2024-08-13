import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';

const ControlNumber = () => {
  const [orderId, setOrderId] = useState('');
  const [controlNumber, setControlNumber] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchControlNumber = async () => {
      if (orderId) {
        try {
          const response = await axios.get(`http://localhost:8080/api/payments/control-number/${orderId}`);
          setControlNumber(response.data);
        } catch (error) {
          setError("No order with that ID");
        }
      }
    };
    fetchControlNumber();
  }, [orderId]);

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <><Navigation/>
    <div className='main'style={{backgroundColor:"gray"}}>
    <div>
      <h1 style={{marginTop:"10px"}}>Control Number Page</h1>
      <form onSubmit={handleSubmit}>
        <label style={{width:"850px",marginLeft:"14px"}}>
          Order ID:
          <input type="text" value={orderId} onChange={handleOrderIdChange} 
         style={{width:"1022px",marginLeft:"4px"}}  placeholder='enter orderId to generate control number'/>
        </label>
        <button type="submit" style={{width:"200px",marginLeft:"400px",marginTop:"7px",backgroundColor:"white",color:"black"}}>Generate control number</button>
      </form>
      {controlNumber && <p>Dear Customer take this control number to make payment for your order: {controlNumber}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
    </>
  );
};

export default ControlNumber;