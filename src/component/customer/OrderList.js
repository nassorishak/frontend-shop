import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Retrieve userId from local storage
        const userId = localStorage.getItem('userId');
        
        if (userId) {
          // Fetch orders using the userId
          const response = await axios.get(`/customer/${userId}`);
          setOrders(response.data);
        } else {
          setError('User ID not found in local storage.');
        }
      } catch (err) {
        setError('An error occurred while fetching orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Orders List</h1>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.orderId}>
              <td>{order.orderId}</td>
              <td>{order.totalAmount}</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>{order.status}</td>
              <td>{order.quantity}</td>
              <td>{order.size}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
