import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';


const CustomerDshboard = () => {
  const [countOrder, setCountOrder] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:8080/api/orders/count')
      .then((response) => {
        setCountOrder(response.data);
      });
  }, []);
  const [acceptedOrder, setAcceptedOrder] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:8080/api/orders/count')
      .then((response) => {
        setAcceptedOrder(response.data);
  
      });
  }, []);
  const [canceledOrder, setCanceledOrder] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:8080/api/orders/count')
      .then((response) => {
        setCanceledOrder(response.data);
        
      });
  }, []);
  const [totalPayment, setTotalPayment] = useState(0);
  useEffect(() => {
    axios.get('http://localhost:8080/api/orders/count')
      .then((response) => {
        setTotalPayment(response.data);
      });
  }, []);

  return (
    <>
      <Navigation />
      <div className='main'>
        <h1 style={{marginTop:"20px"}}>Customer Dashboard</h1>
        <div className='card-container'>
          <div className='card'>
            <p><i className='fa fa-user'></i></p>
            <h3>{countOrder}</h3>
            <p>Order</p>
          </div>
          <div className='card'>
            <p><i className='fa fa-check'></i></p>
            <h3>{acceptedOrder}</h3>
            <p>Accepted Orders</p>
          </div>
          <div className='card'>
            <p><i className='fa fa-smile-o'></i></p>
            <h3>{canceledOrder}</h3>
            <p>Canceled Orders</p>
          </div>
          <div className='card'>
            <p><i className='fa fa-coffee'></i></p>
            <h3>{totalPayment}</h3>
            <p>Total Payment</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomerDshboard;
