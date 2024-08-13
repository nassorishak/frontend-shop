import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';


const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [totalAmount, setTotalAmount] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('customerId');
        if (userId) {
          const response = await axios.get(`http://localhost:8080/api/orders/customer/${userId}`);
          setOrders(response.data);
        } else {
          setError('User ID not found in local storage.');
        }
      } catch (err) {
        setError('An error occurred while fetching orders: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleUpdate = (order) => {
    setSelectedOrder(order);
    setTotalAmount(order.totalAmount);
    setDate(new Date(order.date).toISOString().substring(0, 10));
    setStatus(order.status);
    setQuantity(order.quantity);
    setSize(order.size);
    setIsModalOpen(true);
  };
  
  const handleCancel = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
        setOrders(orders.filter(order => order.orderId !== orderId));
        alert('Order deleted successfully.');
      } catch (err) {
        alert('Failed to delete order: ' + err.message);
      }
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleOrderUpdate = async (e) => {
    e.preventDefault();
    
    const updatedData = {
      totalAmount,
      date,
      status,
      quantity,
      size,
    };

    try {
      await axios.put(`http://localhost:8080/api/orders/update/${selectedOrder.orderId}`, updatedData);
      setOrders(orders.map(order => (order.orderId === selectedOrder.orderId ? { ...order, ...updatedData } : order)));
      alert('Order updated successfully.');
      handleModalClose(); // Close modal after updating
    } catch (err) {
      alert('Failed to update order: ' + err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navigation />
      <div className='main'>
        <h1 style={{marginTop:"20px"}}>Customer View Orders</h1>
        <table className='orders-table'>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>OrderName</th>
              <th>Date</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Email</th>
              <th>Actions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                 <td>{order.orderId}</td>
                <td>{order.orderName}</td>
                <td>{new Date(order.date).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>{order.quantity}</td>
                <td>{order.size}</td>
                {/* <td>{order.totalAmount}</td> */}
                <td>{order.customer ? order.customer.email : 'N/A'}</td>
                <td>
                  <button type="button" onClick={() => handleUpdate(order)}>
                    Update
                  </button>
                 
                </td>
                <td> <button 
                    style={{ background: "red", marginLeft: "10px" }} 
                    onClick={() => handleCancel(order.orderId)}
                  >
                    Delete
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal">
            <div className="modal-content">
              <h2>Update Order</h2>
              <form onSubmit={handleOrderUpdate}>
                <div>
                  <label>Total Amount:</label>
                  <input 
                    type="number" 
                    value={totalAmount} 
                    onChange={(e) => setTotalAmount(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label>Date:</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label>Status:</label>
                  <input 
                    type="text" 
                    value={status} 
                    onChange={(e) => setStatus(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label>Quantity:</label>
                  <input 
                    type="text" 
                    value={quantity} 
                    onChange={(e) => setQuantity(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <label>Size:</label>
                  <input 
                    type="text" 
                    value={size} 
                    onChange={(e) => setSize(e.target.value)} 
                    required 
                  />
                </div>
                <button type="submit">Update</button>
                <button type="button" onClick={handleModalClose}>Close</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewOrder;