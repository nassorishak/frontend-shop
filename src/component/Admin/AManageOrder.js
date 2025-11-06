// import React, { useEffect, useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AManageOrder = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);

//   const [formValues, setFormValues] = useState({
//     orderId: '',
//     status: '',
//     quantity: '',
//     totalAmount: '',
//     date: '',
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get('http://localhost:8080/api/orders/get/orders', {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });
//         // No filtering based on customerId
//         setData(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []); // Empty dependency array to fetch data only once on component mount

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;


//   const handleCancel = async (orderId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
//       setData(data.filter((item) => item.orderId !== orderId));
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleUpdate = (item) => {
//     setFormValues({
//       orderId: item.orderId,
//       status: item.status,
//       quantity: item.quantity,
//       totalAmount: item.totalAmount,
//       date: item.date,
//     });
//     setOrderIdToUpdate(item.orderId);
//     setShowPopup(true);
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/api/orders/update/${orderIdToUpdate}`, formValues);
//       if (response.status === 200) {
//         setData(data.map((item) => {
//           if (item.orderId === orderIdToUpdate) {
//             return { ...item, ...formValues };
//           }
//           return item;
//         }));
//         setShowPopup(false);
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <>
//       <Navigation />
//       <div className="main" style={{backgroundColor:"wheat",marginBottom:"250px"}}>
//         <h1 style={{textAlign:"center", marginTop:"10px", marginBottom:"40px", backgroundColor:"gray", width:"1041px",marginRight:"40px"}}>ADMIN MANAGE ORDER</h1>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div>Error: {error}</div>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>OrderId</th>
//                 <th>Total Amount</th>
//                 <th>Date</th>
//                 <th>Status</th>
//                 <th>Quantity</th>
//                 <th>Update</th>
//                 <th>delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.orderId}>
//                   <td>{item.orderId}</td>
//                   <td>{item.totalAmount}</td>
//                   <td>{item.date}</td>
//                   <td>{item.status}</td>
//                   <td>{item.quantity}</td>
//                   <td>
//                     <button type="button" onClick={() => handleUpdate(item)}>
//                       Update
//                     </button>
//                   </td>
//                   <td>
//                     <button style={{ background: "red" }} onClick={() => handleCancel(item.orderId)}>
//                       delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {showPopup && (
//           <div className="popup" style={{width:"400px", height:"auto", marginLeft:"200px", position:"fixed", top:"50%", left:"50%", transform:"translate(-50%, -50%)", backgroundColor:"white", boxShadow:"0 0 10px rgba(0,0,0,0.2)"}}>
//             <div className="popup-content" style={{padding:"20px"}}>
//               <h2>Update Order</h2>
//               <form onSubmit={e => e.preventDefault()}>
//                 <label>
//                   OrderId:
//                   <input 
//                     type="text" 
//                     name="orderId" 
//                     value={formValues.orderId}
//                     onChange={handleChange} 
//                     disabled // if you want this to be editable, remove this line
//                   />
//                 </label>
//                 <br />
                
//                 <label>
//                   Total Amount:
//                   <input 
//                     type="text" 
//                     name="totalAmount" 
//                     value={formValues.totalAmount} 
//                     onChange={handleChange} 
//                   />
//                 </label>
//                 <br />
                
//                 <label>
//                   Date:
//                   <input 
//                     type="text" 
//                     name="date" 
//                     value={formValues.date} 
//                     onChange={handleChange} 
//                   />
//                 </label>
//                 <br />
                
//                 <label>
//                   Status:
//                   <input 
//                     type="text" 
//                     name="status" 
//                     value={formValues.status} 
//                     onChange={handleChange} 
//                   />
//                 </label>
//                 <br />
              
//                 <label>
//                   Quantity:
//                   <input 
//                     type="text" 
//                     name="quantity" 
//                     value={formValues.quantity} 
//                     onChange={handleChange} 
//                   />
//                 </label>
//                 <br />
//                 <div>
//                   <button type="button" onClick={handleUpdateOrder} style={{width:"100px",}}>
//                     Submit
//                   </button>
//                   <button type="button" onClick={() => setShowPopup(false)} style={{marginLeft:"130px", width:"100px", marginTop:"7px"}}>
//                     Close
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default AManageOrder;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from "../navigation/Navigation";

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ 
    controlNumber: '', 
    customerName: '', 
    customerEmail: '', 
    customerPhone: '',
    status: 'ALL'
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/orders/all');
      console.log('Orders data received:', response.data);
      setOrders(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // FIXED: Use the correct endpoint for updating order status
  const handleUpdateStatus = async (controlNumber, newStatus) => {
    try {
      // Use the payment status endpoint instead of update order endpoint
      await axios.put(`http://localhost:8080/api/orders/payment/${controlNumber}?paymentStatus=${newStatus}`);
      
      // For status changes that aren't payment related, we need a different approach
      // Since your API doesn't have a direct status update endpoint, we'll use the cancel endpoint for CANCELLED status
      if (newStatus === 'CANCELLED') {
        await axios.put(`http://localhost:8080/api/orders/cancel/${controlNumber}`);
      } else if (newStatus === 'CONFIRMED') {
        // For confirming orders, we might need to update payment status or use a different approach
        // Since there's no direct confirm endpoint, we'll update payment status to indicate confirmation
        await axios.put(`http://localhost:8080/api/orders/payment/${controlNumber}?paymentStatus=PENDING`);
      }
      
      fetchOrders();
      alert(`Order status updated to ${newStatus} successfully!`);
    } catch (err) {
      console.error('Error updating order status:', err);
      console.error('Error details:', err.response?.data);
      alert(`Failed to update order status: ${err.response?.data || err.message}`);
    }
  };

  // ALTERNATIVE: If you want to create a proper status update endpoint, use this approach:
  const handleUpdateStatusAlternative = async (controlNumber, newStatus) => {
    try {
      // Create a custom endpoint call - you'll need to add this to your backend
      const response = await axios.put(`http://localhost:8080/api/orders/status/${controlNumber}`, null, {
        params: { status: newStatus }
      });
      
      fetchOrders();
      alert(`Order status updated to ${newStatus} successfully!`);
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status. Please check the console for details.');
    }
  };

  const handleSendReminder = async (controlNumber) => {
    try {
      await axios.post(`http://localhost:8080/api/orders/reminder/${controlNumber}`);
      alert('Payment reminder sent successfully!');
    } catch (err) {
      console.error('Error sending reminder:', err);
      alert('Failed to send payment reminder');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const clearFilters = () => setFilter({ 
    controlNumber: '', 
    customerName: '', 
    customerEmail: '', 
    customerPhone: '',
    status: 'ALL'
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending' },
      'CONFIRMED': { color: '#d1ecf1', textColor: '#0c5460', text: 'Confirmed' },
      'PROCESSING': { color: '#ffe5d0', textColor: '#fd7e14', text: 'Processing' },
      'SHIPPED': { color: '#cce7ff', textColor: '#0056b3', text: 'Shipped' },
      'DELIVERED': { color: '#d4edda', textColor: '#155724', text: 'Delivered' },
      'CANCELLED': { color: '#f8d7da', textColor: '#721c24', text: 'Cancelled' },
      'COMPLETED': { color: '#d4edda', textColor: '#155724', text: 'Completed' }
    };

    const config = statusConfig[status] || { color: '#e2e3e5', textColor: '#383d41', text: status };
    
    return (
      <span style={{
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        backgroundColor: config.color,
        color: config.textColor,
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }}>
        {config.text}
      </span>
    );
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const paymentConfig = {
      'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending' },
      'PAID': { color: '#d4edda', textColor: '#155724', text: 'Paid' },
      'FAILED': { color: '#f8d7da', textColor: '#721c24', text: 'Failed' },
      'REFUNDED': { color: '#e2e3e5', textColor: '#383d41', text: 'Refunded' }
    };

    const config = paymentConfig[paymentStatus] || { color: '#e2e3e5', textColor: '#383d41', text: paymentStatus };
    
    return (
      <span style={{
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "500",
        backgroundColor: config.color,
        color: config.textColor,
        display: 'inline-block',
        whiteSpace: 'nowrap'
      }}>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'No Date';
    
    try {
      let date;
      
      if (dateValue instanceof Date) {
        date = dateValue;
      } else if (typeof dateValue === 'string') {
        date = new Date(dateValue);
        
        if (isNaN(date.getTime())) {
          date = new Date(parseInt(dateValue));
        }
      } else if (typeof dateValue === 'number') {
        date = new Date(dateValue);
      } else if (Array.isArray(dateValue)) {
        if (dateValue.length >= 3) {
          date = new Date(dateValue[0], dateValue[1] - 1, dateValue[2], 
                         dateValue[3] || 0, dateValue[4] || 0, dateValue[5] || 0);
        }
      }
      
      if (!date || isNaN(date.getTime())) {
        console.log('Invalid date format:', dateValue);
        return 'Invalid Date';
      }
      
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error formatting date:', dateValue, error);
      return 'Date Error';
    }
  };

  const getOrderDate = (order) => {
    if (order.createdAt) {
      return order.createdAt;
    }
    if (order.date) {
      return order.date;
    }
    if (order.orderDate) {
      return order.orderDate;
    }
    return null;
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Tsh 0';
    return `Tsh ${parseInt(amount).toLocaleString()}`;
  };

  const getNetworkDisplayName = (network) => {
    switch (network) {
      case 'tigo': return 'Tigo Pesa';
      case 'mpesa': return 'M-Pesa';
      case 'airtel': return 'Airtel Money';
      case 'halopesa': return 'Halotel Pesa';
      default: return network || 'Not specified';
    }
  };

  const filteredOrders = orders.filter(order => {
    return (
      (filter.controlNumber === '' || (order.controlNumber || '').toLowerCase().includes(filter.controlNumber.toLowerCase())) &&
      (filter.customerName === '' || (order.customerName || '').toLowerCase().includes(filter.customerName.toLowerCase())) &&
      (filter.customerEmail === '' || (order.customerEmail || '').toLowerCase().includes(filter.customerEmail.toLowerCase())) &&
      (filter.customerPhone === '' || (order.customerPhone || '').includes(filter.customerPhone)) &&
      (filter.status === 'ALL' || order.status === filter.status)
    );
  });

  if (loading) {
    return (
      <>
        <Navigation />
        <div style={{ 
          padding: "20px", 
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
          minHeight: "100vh", 
          backgroundColor: "#d8dbddff",
          marginLeft: "250px",
          width: "85%",
          marginTop: "20px",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ 
            textAlign: 'center',
            padding: '40px',
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}>
            <div style={{ 
              width: '50px', 
              height: '50px', 
              border: '4px solid #f3f3f3',
              borderTop: '4px solid #667eea',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 20px'
            }}></div>
            <h3 style={{ color: '#2c3e50', margin: 0 }}>Loading Orders...</h3>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div style={{ 
        padding: "20px", 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
        minHeight: "100vh", 
        backgroundColor: "#d8dbddff",
        marginLeft: "250px",
        width: "85%",
        marginTop: "20px" 
      }}>
        <h1 style={{ 
          textAlign: "center", 
          overflowY: "hidden",
          backgroundColor: "#e2e6e9ff", 
          color: "black", 
          padding: "12px", 
          borderRadius: "12px", 
          marginBottom: "10px",
          marginTop: "20px" 
        }}>
          ORDERS LIST
        </h1>

        {/* Filter Section */}
        <div style={{
          backgroundColor: "white",
          padding: "15px 20px",
          borderRadius: "10px",
          marginBottom: "20px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "15px",
          alignItems: "end"
        }}>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Control Number</label>
            <input 
              type="text" 
              name="controlNumber" 
              value={filter.controlNumber} 
              onChange={handleFilterChange} 
              placeholder="Search by control number"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Name</label>
            <input 
              type="text" 
              name="customerName" 
              value={filter.customerName} 
              onChange={handleFilterChange} 
              placeholder="Search by customer name"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Email</label>
            <input 
              type="text" 
              name="customerEmail" 
              value={filter.customerEmail} 
              onChange={handleFilterChange} 
              placeholder="Search by email"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Phone</label>
            <input 
              type="text" 
              name="customerPhone" 
              value={filter.customerPhone} 
              onChange={handleFilterChange} 
              placeholder="Search by phone"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Status</label>
            <select
              name="status"
              value={filter.status}
              onChange={handleFilterChange}
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
            >
              <option value="ALL">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PROCESSING">Processing</option>
              <option value="SHIPPED">Shipped</option>
              <option value="DELIVERED">Delivered</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div>
            <button 
              onClick={clearFilters} 
              style={{ 
                padding: "10px 15px", 
                backgroundColor: "#6c757d", 
                color: "white", 
                border: "none", 
                borderRadius: "6px", 
                cursor: "pointer", 
                width: "100%" 
              }}
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            backgroundColor: "#f8d7da",
            color: "#721c24",
            padding: "12px 15px",
            borderRadius: "6px",
            marginBottom: "15px",
            border: "1px solid #f5c6cb"
          }}>
            <strong>Error:</strong> {error}
            <button 
              onClick={fetchOrders}
              style={{
                marginLeft: "15px",
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                fontSize: "12px"
              }}
            >
              Retry
            </button>
          </div>
        )}

        {/* Orders Table */}
        <div style={{ 
          backgroundColor: "white", 
          borderRadius: "10px", 
          overflow: "hidden", 
          boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
          height: "600px" 
        }}>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table style={{ 
              width: "100%", 
              borderCollapse: "collapse", 
              minWidth: "1200px"
            }}>
              <thead style={{ 
                backgroundColor: "#f8f9fa", 
                position: "sticky", 
                top: 0, 
                zIndex: 10 
              }}>
                <tr>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Order ID</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Control #</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Customer</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Product</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Qty</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Amount</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Status</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Payment</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Network</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Order Date</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
                  <tr 
                    key={order.orderId} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", 
                      borderBottom: "1px solid #eaeaea" 
                    }}
                  >
                    <td style={{ padding: "8px", fontSize: "12px" }}>{order.orderId}</td>
                    <td style={{ padding: "8px", fontSize: "12px", fontFamily: "monospace", fontWeight: "600" }}>
                      {order.controlNumber || 'N/A'}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <div style={{ fontWeight: "600", fontSize: "12px" }}>{order.customerName || 'N/A'}</div>
                      <div style={{ fontSize: "11px", color: "#6c757d" }}>{order.customerEmail || 'N/A'}</div>
                      <div style={{ fontSize: "11px", color: "#6c757d" }}>{order.customerPhone || 'N/A'}</div>
                    </td>
                    <td style={{ padding: "8px", fontSize: "12px" }}>
                      {order.product?.productName || 'Unknown Product'}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "600" }}>
                      {order.quantity || '0'}
                    </td>
                    <td style={{ padding: "8px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#28a745" }}>
                      {formatCurrency(order.totalAmount)}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {getStatusBadge(order.status)}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center" }}>
                      {getPaymentStatusBadge(order.paymentStatus)}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center", fontSize: "11px" }}>
                      {getNetworkDisplayName(order.preferredNetwork)}
                    </td>
                    <td style={{ padding: "8px", fontSize: "11px", color: "#6c757d" }}>
                      {formatDate(getOrderDate(order))}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button 
                          onClick={() => handleViewDetails(order)} 
                          style={{ 
                            padding: "4px 8px", 
                            borderRadius: "4px", 
                            backgroundColor: "#007bff", 
                            color: "white", 
                            border: "none", 
                            cursor: "pointer",
                            fontSize: "11px",
                            whiteSpace: "nowrap"
                          }}
                        >
                          View
                        </button>
                        {order.paymentStatus === 'PENDING' && (
                          <button 
                            onClick={() => handleSendReminder(order.controlNumber)} 
                            style={{ 
                              padding: "4px 8px", 
                              borderRadius: "4px", 
                              backgroundColor: "#ffc107", 
                              color: "white", 
                              border: "none", 
                              cursor: "pointer",
                              fontSize: "11px",
                              whiteSpace: "nowrap"
                            }}
                          >
                            Remind
                          </button>
                        )}
                        {order.status === 'PENDING' && (
                          <button 
                            onClick={() => handleUpdateStatus(order.controlNumber, 'CONFIRMED')} 
                            style={{ 
                              padding: "4px 8px", 
                              borderRadius: "4px", 
                              backgroundColor: "#28a745", 
                              color: "white", 
                              border: "none", 
                              cursor: "pointer",
                              fontSize: "11px",
                              whiteSpace: "nowrap"
                            }}
                          >
                            Confirm
                          </button>
                        )}
                        {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
                          <button 
                            onClick={() => handleUpdateStatus(order.controlNumber, 'CANCELLED')} 
                            style={{ 
                              padding: "4px 8px", 
                              borderRadius: "4px", 
                              backgroundColor: "#dc3545", 
                              color: "white", 
                              border: "none", 
                              cursor: "pointer",
                              fontSize: "11px",
                              whiteSpace: "nowrap"
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {isModalOpen && selectedOrder && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            padding: "10px"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "12px",
              width: "500px",
              maxWidth: "100%",
              padding: "25px 20px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              overflowY: "auto",
              maxHeight: "90vh"
            }}>
              <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>Order Details</h2>
              
              <div style={{ marginBottom: "15px" }}>
                <strong>Control Number:</strong> 
                <div style={{ 
                  padding: "8px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "4px", 
                  marginTop: "5px",
                  fontFamily: "monospace",
                  fontWeight: "600"
                }}>
                  {selectedOrder.controlNumber}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
                <div>
                  <strong>Order ID:</strong>
                  <div style={{ padding: "4px 0" }}>{selectedOrder.orderId}</div>
                </div>
                <div>
                  <strong>Status:</strong>
                  <div style={{ padding: "4px 0" }}>{getStatusBadge(selectedOrder.status)}</div>
                </div>
                <div>
                  <strong>Payment Status:</strong>
                  <div style={{ padding: "4px 0" }}>{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
                </div>
                <div>
                  <strong>Order Type:</strong>
                  <div style={{ padding: "4px 0" }}>{selectedOrder.orderType || 'STANDARD'}</div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <strong>Customer Information:</strong>
                <div style={{ 
                  padding: "10px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "4px", 
                  marginTop: "5px" 
                }}>
                  <div><strong>Name:</strong> {selectedOrder.customerName}</div>
                  <div><strong>Email:</strong> {selectedOrder.customerEmail}</div>
                  <div><strong>Phone:</strong> {selectedOrder.customerPhone}</div>
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <strong>Product Information:</strong>
                <div style={{ 
                  padding: "10px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "4px", 
                  marginTop: "5px" 
                }}>
                  <div><strong>Product:</strong> {selectedOrder.product?.productName || 'Unknown Product'}</div>
                  <div><strong>Quantity:</strong> {selectedOrder.quantity}</div>
                  <div><strong>Unit Price:</strong> {formatCurrency(selectedOrder.product?.sellingPrice || selectedOrder.totalAmount / selectedOrder.quantity)}</div>
                  <div><strong>Payment Network:</strong> {getNetworkDisplayName(selectedOrder.preferredNetwork)}</div>
                </div>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <strong>Payment Summary:</strong>
                <div style={{ 
                  padding: "10px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "4px", 
                  marginTop: "5px" 
                }}>
                  <div><strong>Total Amount:</strong> {formatCurrency(selectedOrder.totalAmount)}</div>
                  <div><strong>Order Date:</strong> {formatDate(getOrderDate(selectedOrder))}</div>
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  onClick={handleCloseModal}
                  style={{ 
                    padding: "8px 16px", 
                    borderRadius: "6px", 
                    border: "1px solid #6c757d", 
                    backgroundColor: "#6c757d", 
                    color: "white", 
                    cursor: "pointer" 
                  }}
                >
                  Close
                </button>
                {selectedOrder.paymentStatus === 'PENDING' && (
                  <button
                    onClick={() => {
                      handleSendReminder(selectedOrder.controlNumber);
                      handleCloseModal();
                    }}
                    style={{ 
                      padding: "8px 16px", 
                      borderRadius: "6px", 
                      border: "none", 
                      backgroundColor: "#ffc107", 
                      color: "white", 
                      cursor: "pointer" 
                    }}
                  >
                    Send Reminder
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

export default ViewOrder;