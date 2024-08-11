import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MakeOrder = () => {
  const { productId } = useParams();
  const customerId = localStorage.getItem("customerId"); // Customer ID from local storage

  const [order, setOrder] = useState({
    totalAmount: 0,
    date: "",
    status: "",
    quantity: 1, // Init with 1 to prevent zero or negative input
    size: "",
    customer: {
      userId: parseInt(customerId) // Ensure this is an integer
    },
    product: {
      productId: parseInt(productId)
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevOrder => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!order.totalAmount || !order.date || !order.status || !order.quantity || !order.size) {
      alert("Please fill all the fields.");
      return;
    }

    const orderToSend = {
      totalAmount: parseFloat(order.totalAmount),
      date: order.date,
      status: order.status,
      quantity: parseInt(order.quantity),
      size: order.size,
      customer: { userId: parseInt(customerId) },
      product: { productId: parseInt(productId) }
    };

    console.log("Order being sent:", orderToSend);

    // Make API call to add order
    try {
      const response = await axios.post('http://localhost:8080/api/orders/add/orders', orderToSend);
      console.log(response.data);
      alert("Inserted Successfully");
      // Reset the form after successful submission
      setOrder({
        totalAmount: 0,
        date: "",
        status: "",
        quantity: 1,
        size: "",
        customer: { userId: parseInt(customerId) },
        product: { productId: parseInt(productId) }
      });
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Error adding order: " + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div>
      <Navigation />
      <div className='main'>
        <h3 style={{ textAlign: "center" }}>CUSTOMER MAKE ORDER {productId}</h3>
        <p>Product Id: {productId}, Customer Id: {customerId}</p>
        <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto" }}>
          {/* Input fields for order details */}
          <div>
            <label>Total Amount:</label>
            <input
              type="number"
              name="totalAmount"
              value={order.totalAmount}
              onChange={handleChange}
              min="0"
              required
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={order.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={order.status}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={order.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>
          <div>
            <label>Size:</label>
            <input
              type="text"
              name="size"
              value={order.size}
              onChange={handleChange}
              required
            />
          </div>
          <button 
            type="submit"
            disabled={!order.totalAmount || !order.date || !order.status || !order.quantity || !order.size}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeOrder;