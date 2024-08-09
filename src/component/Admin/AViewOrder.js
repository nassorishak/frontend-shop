import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AViewOrder = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);

  const [formValues, setFormValues] = useState({
    orderId: '',
    status: '',
    quantity: '',
    totalAmount: '',
    date: '',
  });

  const customerId = parseInt(localStorage.getItem("customerId")); // Set the customer ID to filter by

  const navigate = useNavigate();

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

  const handleCancel = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
      setData(data.filter((item) => item.orderId !== orderId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = (item) => {
    setFormValues({
      orderId: item.orderId,
      status: item.status,
      quantity: item.quantity,
      totalAmount: item.totalAmount,
      date: item.date,
    });
    setOrderIdToUpdate(item.orderId);
    setShowPopup(true);
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/orders/update/${orderIdToUpdate}`, formValues);
      if (response.status === 200) {
        setData(data.map((item) => {
          if (item.orderId === orderIdToUpdate) {
            return { ...item, ...formValues };
          }
          return item;
        }));
        setShowPopup(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navigation />
      <div className="main">
        <h1 style={{textAlign:"center", marginTop:"0px", marginBottom:"40px", backgroundColor:"gray", width:"1029px"}}>ADMIN VIEWORDER PAGE</h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>OrderId</th>
                <th>Total Amount</th>
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
                  <td>{item.totalAmount}</td>
                  <td>{item.date}</td>
                  <td>{item.status}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button type="button" onClick={() => handleUpdate(item)}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button style={{ background: "red" }} onClick={() => handleCancel(item.orderId)}>
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showPopup && (
          <div className="popup" style={{width:"400px", height:"auto", marginLeft:"200px", position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)", backgroundColor:"white", boxShadow:"0 0 10px rgba(0,0,0,0.2)"}}>
            <div className="popup-content" style={{padding:"20px"}}>
              <h2>Update Order</h2>
              <form onSubmit={e => e.preventDefault()}>
                <label>
                  OrderId:
                  <input 
                    type="text" 
                    name="orderId" 
                    value={formValues.orderId}
                    onChange={handleChange} 
                    disabled // if you want this to be editable, remove this line
                  />
                </label>
                <br />
                
                <label>
                  Total Amount:
                  <input 
                    type="text" 
                    name="totalAmount" 
                    value={formValues.totalAmount} 
                    onChange={handleChange} 
                  />
                </label>
                <br />
                
                <label>
                  Date:
                  <input 
                    type="text" 
                    name="date" 
                    value={formValues.date} 
                    onChange={handleChange} 
                  />
                </label>
                <br />
                
                <label>
                  Status:
                  <input 
                    type="text" 
                    name="status" 
                    value={formValues.status} 
                    onChange={handleChange} 
                  />
                </label>
                <br />
              
                <label>
                  Quantity:
                  <input 
                    type="text" 
                    name="quantity" 
                    value={formValues.quantity} 
                    onChange={handleChange} 
                  />
                </label>
                <br />
                <div>
                  <button type="button" onClick={handleUpdateOrder} style={{width:"100px",}}>
                    Submit
                  </button>
                  <button type="button" onClick={() => setShowPopup(false)} style={{marginLeft:"130px", width:"100px", marginTop:"7px"}}>
                    Close
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AViewOrder;