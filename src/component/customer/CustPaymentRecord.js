// src/component/vendor/PaymentRecord.js

import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const CustPaymentRecord = () => {


  const [payment, setFilteredPayment] = useState([]);

  const custId = parseInt(localStorage.getItem('customerId'));

  useEffect(() => {
    axios.get('http://localhost:8080/api/payments/get/payments')
      .then((response) => {
        // setPayment(response.data);
        setFilteredPayment(response.data.filter((payment) => payment.order.customer.userId === custId));
      })
  }, []);

  return (
    <>
    <Navigation/>
    <div className='main'>
    <div>
      <h3 style={{marginTop:"15px",textAlign:"center"}}>Customer Payment Records</h3>
      <table>
        <thead>
          <tr>
          <th>Order ID</th>
          <th>OrderName</th>
          <th>CustomerName</th>
            <th>Email</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Price</th>
            
           </tr>
        </thead>
        <tbody>
          {payment.map((payment, index) => (
            <tr key={payment.paymentId}>
                <td>{payment.order.orderId}</td>
                <td>{payment.order.orderName}</td>
                 <td>{`${payment.order.customer.firstName} ${payment.order.customer.lastName}`}</td>
              <td>{payment.order.customer.email}</td>
              <td>{new Date(payment.paymentDate).toLocaleDateString()}</td>
              <td>{payment.status}</td>
              <td>{payment.amount.toFixed(2)}</td>
              

            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default CustPaymentRecord;
