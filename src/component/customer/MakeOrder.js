import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const MakeOrder = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId"); // Customer ID from local storage

  const [order, setOrder] = useState({
    date: "",
    status: "pending", // Set status to "pending" automatically
    quantity: 1, // Init with 1 to prevent zero or negative input
    size: "",
    orderType: "", // Initialize orderType
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
    if (!order.date || !order.quantity || !order.size || !order.orderType) {
      alert("Please fill all the fields.");
      return;
    }

    const orderToSend = {
      date: order.date,
      status: order.status, // Status is set automatically
      quantity: parseInt(order.quantity),
      size: order.size,
      orderType: order.orderType,
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
        date: "",
        status: "pending", // Reset status to "pending"
        quantity: 1,
        size: "",
        orderType: "",
        customer: { userId: parseInt(customerId) },
        product: { productId: parseInt(productId) }
      });
      navigate("/viewOrder");
    } catch (error) {
      console.error("Error adding order:", error);
      alert("Error adding order: " + (error.response ? error.response.data : error.message));
    }
  };

  return (
    <div>
      <Navigation />
      <div className='main' style={{ backgroundColor: "whitesmoke" }}>
        <h3 style={{ textAlign: "center", marginTop: "15px" }}>CUSTOMER MAKE ORDER {productId}</h3>
        <p>Product Id: {productId}, Customer Id: {customerId}</p>
        <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto" }}>
          {/* Input fields for order details */}
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
            <label>Order Type:</label>
            <select 
              id="orderType" 
              name="orderType" 
              value={order.orderType}
              onChange={handleChange}
            >
              <option value="">Select Order Type</option>
              <option value="delivery">Delivery</option>
              <option value="nonDelivery">Non-Delivery</option>
            </select>
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
            disabled={!order.date || !order.quantity || !order.size || !order.orderType} 
            style={{ marginLeft: "140px", backgroundColor: "grey", color: "black", marginTop: "15px", width: "100px", borderRadius: "20px" }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeOrder;