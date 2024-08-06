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
    orderId: 0,
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
    setOrder({ ...order, [name]: value });
  };

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, customer: { ...order.customer, [name]: value } });
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, product: { ...order.product, [name]: value } });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Make API call to add order
    axios.post('http://localhost:8080/api/orders/add/orders', order)
      .then(response => {
        console.log(response.data);
        alert("Inserted Successfull")
        // Handle success response
      })
      .catch(error => {
        console.error(error);
        // Handle error response
      });
  };

  return (
    <div>
      <Navigation />
      <div className='main'>
        <h3 style={{textAlign:"center"}}>CUSTOMER MAKE ORDER  {productId}</h3>
        <p>Product Id {productId} and customerId is {customerId}</p>
        <form onSubmit={handleSubmit} style={{width:"400px",marginLeft:"300px"}}>
          <div>
            <label>Total Amount:</label>
            <input
              type="number"
              name="totalAmount"
              value={order.totalAmount}
              onChange={handleChange}
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