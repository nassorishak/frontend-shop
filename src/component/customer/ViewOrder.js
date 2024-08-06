import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewOrder = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const customerId = parseInt(localStorage.getItem("customerId")) ; // Set the customer ID to filter by

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/orders/get/orders', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const filteredData = response.data.filter((item) => item.customer.userId === customerId);
        setData(filteredData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [customerId]);

  return (
    <>
      <Navigation />
      <div className="main">
        <h1>Customer ViewOrder Page</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>OrderId</th>
                {/* <th>Name</th> */}
                <th>totalAmount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Update</th>
                <th>Cancel</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  {/* <td>{item.name}</td> */}
                  <td>{item.totalAmount}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button className="edit-btn">edit</button>
                  </td>
                  <td>
                    <button style={{ background: "red" }} className="edit-btn">cancel</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ViewOrder;