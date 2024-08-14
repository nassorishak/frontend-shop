import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const VendorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [countOrder, setCountOrder] = useState(0);
  const [acceptedOrder, setAcceptedOrder] = useState(0);
  const [canceledOrder, setCanceledOrder] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Get userId from localStorage
  const userId = parseInt(localStorage.getItem('customerId'), 10);

  useEffect(() => {
    axios.get('http://localhost:8080/api/orders/get/orders')
      .then((response) => {
        const orders = response.data;
        setOrders(orders);

        // Filter orders based on userId
        const userOrders = orders.filter(order => order.customer.userId === userId);

        // Calculate total orders count
        setCountOrder(userOrders.length);

        // Calculate accepted orders count
        const acceptedOrders = userOrders.filter(order => order.status === "complete");
        setAcceptedOrder(acceptedOrders.length);

        // Calculate canceled orders count
        const canceledOrders = userOrders.filter(order => order.status === "canceled");
        setCanceledOrder(canceledOrders.length);

        // Calculate total payment amount
        const totalPaymentAmount = userOrders.reduce((total, order) => total + (order.totalAmount || 0), 0);
        setTotalPayment(totalPaymentAmount);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  }, [userId]);

  return (
    <>
      <Navigation />
      <div className='main'>
        <h1 style={{ marginTop: "20px" }}>Vendor Dashboard</h1>
        <div className='card-container'>
          <div
            className='card'
            style={{ backgroundColor: '#f8d7da' }} // Example background color for card
          >
            <p><i className='fa fa-user'></i></p>
            <h3>{countOrder}</h3>
            <p>Order</p>
          </div>
          <div
            className='card'
            style={{ backgroundColor: '#d4edda' }} // Example background color for card
          >
            <p><i className='fa fa-check'></i></p>
            <h3>{acceptedOrder}</h3>
            <p>Accepted Orders</p>
          </div>
          <div
            className='card'
            style={{ backgroundColor: '#fff3cd' }} // Example background color for card
          >
            <p><i className='fa fa-smile-o'></i></p>
            <h3>{canceledOrder}</h3>
            <p>Canceled Orders</p>
          </div>
          <div
            className='card'
            style={{ backgroundColor: '#cce5ff' }} // Example background color for card
          >
            <p><i className='fa fa-coffee'></i></p>
            <h3>{totalPayment}</h3>
            <p>Total Payment</p>
          </div>
          <div>
            <h1 style={{ backgroundColor: '#cce5ff',color:"black",width:"1005px",marginLeft:"9px",marginRight:"100px",height:"260px",borderRadius:"5px"}}></h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorDashboard;
