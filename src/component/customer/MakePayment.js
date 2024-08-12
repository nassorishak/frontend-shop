import React, { useState } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';

const MakePayment = () => {
  const [controlNumber, setControlNumber] = useState('');
  const [amount, setAmount] = useState(0);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleControlNumberChange = (event) => {
    setControlNumber(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    makePayment();
  };

  const makePayment = async () => {
    try {
      const paymentRequest = {
        amount: amount,
      };
      const response = await axios.post(`http://localhost:8080/api/payments/payment/${controlNumber}`, paymentRequest);
      setPaymentResponse(response.data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <Navigation/>
    <div className='main'>
    <div>
      <h1 style={{marginTop:"15px"}}>Make Payment</h1>
      <form onSubmit={handleSubmit}  style={{marginLeft:"120px",width:"700px"}}>
        <label>
          Control Number
          <input type="text" value={controlNumber} onChange={handleControlNumberChange} placeholder='enter the control number' />
        </label>
        <br />   <br />
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} placeholder='enter payment amount' />
        </label>
        <br />
        <button type="submit" style={{marginLeft:"220px",width:"150px",marginTop:"15px",backgroundColor:"gray",color:"black"}} >Make Payment</button>
      </form>
      {paymentResponse && (
        <p style={{marginLeft:"205px"}}>
          Dear customer Customer you are successful make Payment<br/>If you need resete click the button bellow<br/><br/><br/>{paymentResponse.transactionId}
          <button type="submit" style={{marginLeft:"135px",width:"150px",marginTop:"15px",backgroundColor:"gray",color:"black"}} >Generate reccete</button>
        </p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
    </>
  );
};

export default MakePayment;