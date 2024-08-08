import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/product/get/product')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleUpdate = (item) => {
    console.log('Updating item:', item);
    axios.put(`http://localhost:8080/api/product/update/${item.productId}`, item)
      .then((response) => {
        console.log('Update response:', response);
        setData(data.map((product) => product.productId === item.productId ? item : product));
      })
      .catch((error) => {
        console.error('Update error:', error);
      });
  };

const handleDelete = (item) => {
  console.log('Deleting item:', item);
  axios.delete(`http://localhost:8080/api/product/delete/${item.productId}`)
    .then((response) => {
      console.log('Delete response:', response);
      setData(data.filter((product) => product.productId !== item.productId));
    })
    .catch((error) => {
      console.error('Delete error:', error);
      console.error(error.response.data); // Log the error response data
      console.error(error.response.status); // Log the error response status
      console.error(error.response.headers); // Log the error response headers
    });
};

  return (
    <>
      <Navigation />
      <div className="main">
        <h1 style={{ textAlign: "center", backgroundColor: "GrayText" }}>Vendor View Product</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ProductId</th>
                <th>productImage</th>
                <th>productName</th>
                <th>productDescription</th>
                <th>price</th>
                <th>Category</th>
                <th>action</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={`data:image/png;base64, ${item.image}`} alt="image2" style={{ width: '90px', height: 'auto' }} />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.productDescription}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleUpdate(item)}>Update</button>
                  </td>
                  <td>
                    <button className="edit-btn" style={{ backgroundColor: "red" }} onClick={() => handleDelete(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {data.length === 0 && !error ? (
          <p>No products found</p>
        ) : null}
      </div>
    </>
  );
};

export default ViewProducts;