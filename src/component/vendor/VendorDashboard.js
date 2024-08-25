import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const VendorDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [countOrder, setCountOrder] = useState(0);
  const [approvedOrder, setApprovedOrder] = useState(0);
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

        // Debugging: Log status values to console
        console.log(userOrders.map(order => order.status));

        // Calculate approved orders count
        const approvedOrders = userOrders.filter(order => order.status === "complete"); // Adjust this if needed
        setApprovedOrder(approvedOrders.length);

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
            style={{ backgroundColor: '#f8d7da' }}
          >
            <p><i className='fa fa-user'></i></p>
            <h3>{countOrder}</h3>
            <p>Total Orders</p>
          </div>
          <div
            className='card'
            style={{ backgroundColor: '#d4edda' }}
          >
            <p><i className='fa fa-check'></i></p>
            <h3>{canceledOrder}</h3>
            <p>canceledOrder</p>
          </div>
          <div
            className='card'
            style={{ backgroundColor: '#fff3cd' }}
          >
            <p><i className='fa fa-smile-o'></i></p>
            <h3>{canceledOrder}</h3>
            <p>Canceled Orders</p>
          </div>
          <div
            className='card'
            style={{ backgroundColor: '#cce5ff' }}
          >
            <p><i className='fa fa-coffee'></i></p>
            <h3>{totalPayment}</h3>
            <p>Total Payment</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default VendorDashboard;