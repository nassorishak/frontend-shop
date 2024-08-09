import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MakeOrder = () => {
  const { productId } = useParams();
  const customerId = localStorage.getItem("customerId");

  console.log("customerId:", customerId);
  console.log("productId:", productId);

  const [order, setOrder] = useState({
    totalAmount: 0,
    date: "",
    status: "",
    quantity: "",
    size: "",
    customer: {
      userId: parseInt(customerId)
    },
    product: {
      productId: parseInt(productId)
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder(prevOrder => ({
      ...prevOrder,
      [name]: value // Directly updating the field at the first level
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure all required fields are filled
    if (!order.totalAmount || !order.date || !order.status || !order.quantity || !order.size) {
      alert("Please fill all the fields.");
      return;
    }

    // Make API call to add order
    axios.post('http://localhost:8080/api/orders/add/orders', order)
      .then(response => {
        console.log(response.data);
        alert("Inserted Successfully");
        // Reset the form after successful submission
        setOrder({
          totalAmount: 0,
          date: "",
          status: "",
          quantity: "",
          size: "",
          customer: {
            userId: parseInt(customerId)
          },
          product: {
            productId: parseInt(productId)
          }
        });
      })
      .catch(error => {
        console.error(error);
        alert("Error adding order");
      });
  };

  return (
    <div>
      <Navigation />
      <div className='main'>
        <h3 style={{ textAlign: "center" }}>CUSTOMER MAKE ORDER {productId}</h3>
        <p>Product Id {productId} and customerId is {customerId}</p>
        <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto" }}>
          <div>
            <label>Total Amount:</label>
            <input
              type="number"
              name="totalAmount"
              value={order.totalAmount}
              onChange={handleChange}
              min="0" // Prevent negative amounts
            />
          </div>
          <div>
            <label>Date:</label>
            <input
              type="date"
              name="date"
              value={order.date}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Status:</label>
            <input
              type="text"
              name="status"
              value={order.status}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Quantity:</label>
            <input
              type="text"
              name="quantity"
              value={order.quantity}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Size:</label>
            <input
              type="text"
              name="size"
              value={order.size}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default MakeOrder;