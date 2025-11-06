// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { Link } from "react-router-dom";
// // // import Navigation from "../navigation/Navigation";

// // // const ViewOrders = () => {
// // //   const [orders, setOrders] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [filter, setFilter] = useState({
// // //     status: "",
// // //     startDate: "",
// // //     endDate: ""
// // //   });

// // //   useEffect(() => {
// // //     fetchOrders();
// // //   }, []);

// // //   const fetchOrders = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const customerId = localStorage.getItem("customerId");
// // //       if (!customerId) {
// // //         setError("Customer ID not found. Please log in again.");
// // //         setLoading(false);
// // //         return;
// // //       }
      
// // //       const response = await axios.get(`http://localhost:8080/api/orders/customer/${customerId}`);
// // //       setOrders(response.data);
// // //       setError("");
// // //     } catch (err) {
// // //       console.error("Error fetching orders:", err);
// // //       setError("Failed to fetch orders. Please try again later.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const filteredOrders = orders.filter(order => {
// // //     return (
// // //       (filter.status === "" || order.status.toLowerCase() === filter.status.toLowerCase()) &&
// // //       (filter.startDate === "" || new Date(order.date) >= new Date(filter.startDate)) &&
// // //       (filter.endDate === "" || new Date(order.date) <= new Date(filter.endDate))
// // //     );
// // //   });

// // //   const handleFilterChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFilter({ ...filter, [name]: value });
// // //   };

// // //   const clearFilters = () => {
// // //     setFilter({
// // //       status: "",
// // //       startDate: "",
// // //       endDate: ""
// // //     });
// // //   };

// // //   const handleDelete = async (orderId) => {
// // //     if (!window.confirm("Are you sure you want to delete this order?")) return;
    
// // //     try {
// // //       await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
// // //       setOrders(orders.filter((order) => order.orderId !== orderId));
// // //       alert("Order deleted successfully.");
// // //     } catch (err) {
// // //       console.error("Error deleting order:", err);
// // //       alert("Failed to delete order. Please try again later.");
// // //     }
// // //   };

// // //   const handleCancel = async (orderId) => {
// // //     if (!window.confirm("Are you sure you want to cancel this order?")) return;
    
// // //     try {
// // //       await axios.patch(`http://localhost:8080/api/orders/cancel/${orderId}`);
// // //       setOrders(orders.map((order) => 
// // //         order.orderId === orderId ? { ...order, status: "canceled" } : order
// // //       ));
// // //       alert("Order canceled successfully.");
// // //     } catch (err) {
// // //       console.error("Error canceling order:", err);
// // //       alert("Failed to cancel order. Please try again later.");
// // //     }
// // //   };

// // //   const getStatusStyle = (status) => {
// // //     const styles = {
// // //       pending: { backgroundColor: "#fff3cd", color: "#856404" },
// // //       completed: { backgroundColor: "#d4edda", color: "#155724" },
// // //       canceled: { backgroundColor: "#f8d7da", color: "#721c24" },
// // //       processing: { backgroundColor: "#cce7ff", color: "#004085" }
// // //     };
// // //     return styles[status.toLowerCase()] || { backgroundColor: "#e2e3e5", color: "#383d41" };
// // //   };

// // //   if (loading) {
// // //     return (
// // //       <div style={{
// // //         padding: "20px",
// // //         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// // //         minHeight: "100vh",
// // //         backgroundColor: "#f8f9fa"
// // //       }}>
// // //         <Navigation />
// // //         <div style={{ textAlign: "center", marginTop: "50px" }}>
// // //           <div style={{
// // //             display: "inline-block",
// // //             width: "50px",
// // //             height: "50px",
// // //             border: "5px solid #f3f3f3",
// // //             borderTop: "5px solid #3498db",
// // //             borderRadius: "50%",
// // //             animation: "spin 1s linear infinite",
// // //             marginBottom: "20px"
// // //           }}></div>
// // //           <p style={{ color: "#6c757d", fontSize: "18px" }}>Loading your orders...</p>
// // //         </div>
// // //         <style>
// // //           {`
// // //             @keyframes spin {
// // //               0% { transform: rotate(0deg); }
// // //               100% { transform: rotate(360deg); }
// // //             }
// // //           `}
// // //         </style>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div style={{
// // //       padding: "20px",
// // //       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// // //       minHeight: "100vh",
// // //       backgroundColor: "#f8f9fa"
// // //     }}>
// // //       <Navigation />

// // //       <div style={{ maxWidth: "1390px", margin: "0 auto", marginLeft: "239px" }}>
// // //         <h2 style={{
// // //           textAlign: "center",
// // //           marginBottom: "10px",
// // //           color: "#2c3e50",
// // //           fontWeight: "600",
// // //           marginTop: "60px",
// // //            overflow: "hidden",

// // //           fontSize: "28px",
// // //           paddingBottom: "10px",
// // //           borderBottom: "2px solid #eaeaea"
// // //         }}>
// // //           My Orders
// // //         </h2>

// // //         {error && (
// // //           <div style={{
// // //             color: "#721c24",
// // //             backgroundColor: "#f8d7da",
// // //             border: "1px solid #f5c6cb",
// // //             padding: "12px",
// // //             borderRadius: "6px",
// // //             marginBottom: "20px",
// // //             display: "flex",
// // //             alignItems: "center",
// // //             justifyContent: "space-between"
// // //           }}>
// // //             <span>{error}</span>
// // //             <button
// // //               onClick={() => setError("")}
// // //               style={{
// // //                 background: "none",
// // //                 border: "none",
// // //                 color: "#721c24",
// // //                 fontSize: "18px",
// // //                 cursor: "pointer"
// // //               }}
// // //             >
// // //               ×
// // //             </button>
// // //           </div>
// // //         )}

// // //         {/* Filter Section */}
// // //         <div style={{
// // //           backgroundColor: "white",
// // //           padding: "20px",
// // //           borderRadius: "10px",
// // //           marginBottom: "30px",
// // //           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
// // //           border: "1px solid #e0e0e0"
// // //         }}>
// // //           <h3 style={{
// // //             margin: "0 0 15px 0",
// // //             color: "#2c3e50",
// // //             fontSize: "18px",
// // //             fontWeight: "600"
// // //           }}>Filter Orders</h3>

// // //           <div style={{
// // //             display: "grid",
// // //             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
// // //             gap: "20px",
// // //             alignItems: "end"
// // //           }}>
// // //             <div>
// // //               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
// // //                 Status:
// // //               </label>
// // //               <select
// // //                 name="status"
// // //                 value={filter.status}
// // //                 onChange={handleFilterChange}
// // //                 style={{
// // //                   padding: "10px 12px",
// // //                   borderRadius: "6px",
// // //                   border: "1px solid #ced4da",
// // //                   width: "100%",
// // //                   fontSize: "15px",
// // //                   backgroundColor: "white"
// // //                 }}
// // //               >
// // //                 <option value="">All Statuses</option>
// // //                 <option value="pending">Pending</option>
// // //                 <option value="processing">Processing</option>
// // //                 <option value="completed">Completed</option>
// // //                 <option value="canceled">Canceled</option>
// // //               </select>
// // //             </div>

// // //             <div>
// // //               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
// // //                 Start Date:
// // //               </label>
// // //               <input
// // //                 type="date"
// // //                 name="startDate"
// // //                 value={filter.startDate}
// // //                 onChange={handleFilterChange}
// // //                 style={{
// // //                   padding: "10px 12px",
// // //                   borderRadius: "6px",
// // //                   border: "1px solid #ced4da",
// // //                   width: "100%",
// // //                   fontSize: "15px"
// // //                 }}
// // //               />
// // //             </div>

// // //             <div>
// // //               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
// // //                 End Date:
// // //               </label>
// // //               <input
// // //                 type="date"
// // //                 name="endDate"
// // //                 value={filter.endDate}
// // //                 onChange={handleFilterChange}
// // //                 style={{
// // //                   padding: "10px 12px",
// // //                   borderRadius: "6px",
// // //                   border: "1px solid #ced4da",
// // //                   width: "100%",
// // //                   fontSize: "15px"
// // //                 }}
// // //               />
// // //             </div>

// // //             <div>
// // //               <button
// // //                 onClick={clearFilters}
// // //                 style={{
// // //                   padding: "10px 18px",
// // //                   backgroundColor: "#6c757d",
// // //                   color: "white",
// // //                   border: "none",
// // //                   borderRadius: "6px",
// // //                   cursor: "pointer",
// // //                   fontSize: "15px",
// // //                   fontWeight: "500",
// // //                   width: "100%"
// // //                 }}
// // //               >
// // //                 Clear Filters
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {/* Orders Table */}
// // //         <div style={{
// // //           backgroundColor: "white",
// // //           borderRadius: "10px",
// // //           overflow: "hidden",
// // //           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
// // //           border: "1px solid #e0e0e0",
// // //           marginBottom: "20px"
// // //         }}>
// // //           <div style={{ maxHeight: "500px", overflowY: "auto" }}>
// // //             <table style={{
// // //               width: "100%",
// // //               borderCollapse: "collapse",
// // //               minWidth: "1200px"
// // //             }}>
// // //               <thead>
// // //                 <tr style={{
// // //                   backgroundColor: "#f8f9fa",
// // //                   position: "sticky",
// // //                   top: 0,
// // //                   zIndex: 10
// // //                 }}>
// // //                   <th style={thStyle}>Order ID</th>
// // //                   <th style={thStyle}>Control No</th>
// // //                   <th style={thStyle}>Date</th>
// // //                   <th style={thStyle}>Status</th>
// // //                   <th style={thStyle}>Product Name</th>
// // //                   <th style={thStyle}>Description</th>
// // //                   <th style={thStyle}>Quantity</th>
// // //                   <th style={thStyle}>Size</th>
// // //                   <th style={thStyle}>Price</th>
// // //                   <th style={thStyle}>Total</th>
// // //                   <th style={thStyle}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {filteredOrders.length > 0 ? (
// // //                   filteredOrders.map((order, index) => (
// // //                     <tr key={order.orderId} style={{
// // //                       borderBottom: "1px solid #eaeaea",
// // //                       backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9"
// // //                     }}>
// // //                       <td style={tdStyle}>{order.orderId}</td>
// // //                       <td style={tdStyle}>{order.controlNumber}</td>
// // //                       <td style={tdStyle}>{new Date(order.date).toLocaleDateString()}</td>
// // //                       <td style={tdStyle}>
// // //                         <span style={{
// // //                           padding: "4px 8px",
// // //                           borderRadius: "12px",
// // //                           fontSize: "12px",
// // //                           fontWeight: "500",
// // //                           ...getStatusStyle(order.status)
// // //                         }}>
// // //                           {order.status}
// // //                         </span>
// // //                       </td>
// // //                       <td style={tdStyle}>{order.product?.productName || "N/A"}</td>
// // //                       <td style={tdStyle}>
// // //                         {order.product?.productDescription ? 
// // //                           (order.product.productDescription.length > 30 
// // //                             ? order.product.productDescription.substring(0, 30) + "..." 
// // //                             : order.product.productDescription)
// // //                           : "N/A"
// // //                         }
// // //                       </td>
// // //                       <td style={tdStyle}>{order.quantity}</td>
// // //                       <td style={tdStyle}>{order.size}</td>
// // //                       <td style={priceStyle}>${order.product?.price?.toFixed(2) || "0.00"}</td>
// // //                       <td style={totalStyle}>
// // //                         ${((order.product?.price || 0) * order.quantity).toFixed(2)}
// // //                       </td>
// // //                       <td style={{ ...tdStyle, textAlign: "center" }}>
// // //                         <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
// // //                           <button 
// // //                             onClick={() => handleDelete(order.orderId)} 
// // //                             style={deleteBtnStyle}
// // //                             disabled={order.status === "completed"}
// // //                           >
// // //                             Delete
// // //                           </button>
// // //                           <button 
// // //                             onClick={() => handleCancel(order.orderId)} 
// // //                             style={cancelBtnStyle}
// // //                             disabled={order.status === "completed" || order.status === "canceled"}
// // //                           >
// // //                             Cancel
// // //                           </button>
// // //                           <Link to={`/make-payment/${order.orderId}`}>
// // //                             <button 
// // //                               style={paymentBtnStyle}
// // //                               disabled={order.status === "completed" || order.status === "canceled"}
// // //                             >
// // //                               Payment
// // //                             </button>
// // //                           </Link>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 ) : (
// // //                   <tr>
// // //                     <td colSpan="11" style={{ padding: "40px", textAlign: "center", color: "#6c757d" }}>
// // //                       {orders.length === 0 ? "No orders found" : "No orders match your filters"}
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         {/* Summary */}
// // //         {filteredOrders.length > 0 && (
// // //           <div style={{
// // //             padding: "16px 20px",
// // //             backgroundColor: "#e9ecef",
// // //             borderRadius: "8px",
// // //             display: "flex",
// // //             justifyContent: "space-between",
// // //             alignItems: "center",
// // //             flexWrap: "wrap",
// // //             gap: "10px",
// // //             fontWeight: "500",
// // //             fontSize: "16px",
// // //             color: "#2c3e50"
// // //           }}>
// // //             <div>
// // //               Total Orders: <span style={{ color: "#3498db" }}>{filteredOrders.length}</span>
// // //             </div>
// // //             <div>
// // //               Total Amount: <span style={{ color: "#27ae60" }}>
// // //                 ${filteredOrders
// // //                   .reduce((sum, order) => sum + ((order.product?.price || 0) * order.quantity), 0)
// // //                   .toFixed(2)}
// // //               </span>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // // Style constants
// // // const thStyle = { 
// // //   padding: "12px", 
// // //   borderBottom: "2px solid #dee2e6", 
// // //   textAlign: "center",
// // //   fontWeight: "600",
// // //   color: "#2c3e50"
// // // };

// // // const tdStyle = { 
// // //   padding: "12px", 
// // //   borderBottom: "1px solid #eaeaea", 
// // //   textAlign: "center",
// // //   fontSize: "14px"
// // // };

// // // const priceStyle = { 
// // //   ...tdStyle, 
// // //   textAlign: "right",
// // //   fontWeight: "500",
// // //   color: "#2c3e50"
// // // };

// // // const totalStyle = { 
// // //   ...priceStyle, 
// // //   fontWeight: "600", 
// // //   backgroundColor: "#dff0d8", 
// // //   color: "#2c662d" 
// // // };

// // // const baseButtonStyle = {
// // //   padding: "6px 12px",
// // //   border: "none",
// // //   borderRadius: "4px",
// // //   cursor: "pointer",
// // //   fontSize: "12px",
// // //   fontWeight: "500",
// // //   transition: "all 0.2s ease",
// // //   minWidth: "70px"
// // // };

// // // const deleteBtnStyle = {
// // //   ...baseButtonStyle,
// // //   backgroundColor: "#e74c3c",
// // //   color: "white",
// // // };

// // // const cancelBtnStyle = {
// // //   ...baseButtonStyle,
// // //   backgroundColor: "#f39c12",
// // //   color: "white",
// // // };

// // // const paymentBtnStyle = {
// // //   ...baseButtonStyle,
// // //   backgroundColor: "#27ae60",
// // //   color: "white",
// // // };

// // // // Add disabled state styles
// // // const disabledBtnStyle = {
// // //   opacity: 0.5,
// // //   cursor: "not-allowed"
// // // };

// // // // Apply disabled styles dynamically
// // // Object.assign(deleteBtnStyle, {
// // //   ':disabled': disabledBtnStyle
// // // });
// // // Object.assign(cancelBtnStyle, {
// // //   ':disabled': disabledBtnStyle
// // // });
// // // Object.assign(paymentBtnStyle, {
// // //   ':disabled': disabledBtnStyle
// // // });

// // // export default ViewOrders;
// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import Navigation from "../navigation/Navigation";

// // const ViewOrders = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [filter, setFilter] = useState({ status: "", startDate: "", endDate: "" });
// //   const [paymentModal, setPaymentModal] = useState({ visible: false, order: null });

// //   useEffect(() => {
// //     fetchOrders();
// //   }, []);

// //   const fetchOrders = async () => {
// //     try {
// //       setLoading(true);
// //       const customerId = localStorage.getItem("customerId");
// //       if (!customerId) {
// //         setError("Customer ID not found. Please log in again.");
// //         setLoading(false);
// //         return;
// //       }

// //       const response = await axios.get(`http://localhost:8080/api/orders/customer/${customerId}`);
// //       setOrders(response.data);
// //       setError("");
// //     } catch (err) {
// //       console.error("Error fetching orders:", err);
// //       setError("Failed to fetch orders. Please try again later.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const filteredOrders = orders.filter(order => {
// //     return (
// //       (filter.status === "" || order.status.toLowerCase() === filter.status.toLowerCase()) &&
// //       (filter.startDate === "" || new Date(order.date) >= new Date(filter.startDate)) &&
// //       (filter.endDate === "" || new Date(order.date) <= new Date(filter.endDate))
// //     );
// //   });

// //   const handleFilterChange = e => {
// //     const { name, value } = e.target;
// //     setFilter({ ...filter, [name]: value });
// //   };

// //   const clearFilters = () => setFilter({ status: "", startDate: "", endDate: "" });

// //   const handleDelete = async orderId => {
// //     if (!window.confirm("Are you sure you want to delete this order?")) return;
// //     try {
// //       await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
// //       setOrders(orders.filter(o => o.orderId !== orderId));
// //       alert("Order deleted successfully.");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to delete order.");
// //     }
// //   };

// //   const handleCancel = async orderId => {
// //     if (!window.confirm("Are you sure you want to cancel this order?")) return;
// //     try {
// //       await axios.patch(`http://localhost:8080/api/orders/cancel/${orderId}`);
// //       setOrders(orders.map(o => o.orderId === orderId ? { ...o, status: "canceled" } : o));
// //       alert("Order canceled successfully.");
// //     } catch (err) {
// //       console.error(err);
// //       alert("Failed to cancel order.");
// //     }
// //   };

// //   const openPaymentModal = order => setPaymentModal({ visible: true, order });
// //   const closePaymentModal = () => setPaymentModal({ visible: false, order: null });

// //   const getStatusStyle = status => {
// //     const styles = {
// //       pending: { backgroundColor: "#fff3cd", color: "#856404" },
// //       completed: { backgroundColor: "#d4edda", color: "#155724" },
// //       canceled: { backgroundColor: "#f8d7da", color: "#721c24" },
// //       processing: { backgroundColor: "#cce7ff", color: "#004085" }
// //     };
// //     return styles[status.toLowerCase()] || { backgroundColor: "#e2e3e5", color: "#383d41" };
// //   };

// //   if (loading) return <p>Loading orders...</p>;

// //   return (
// //     <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
// //       <Navigation />

// //       <div style={{
// //   padding: "20px",
// //   paddingTop: "120px", // <-- increase this to match your navbar height
// //   fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
// //   minHeight: "100vh",
// //   backgroundColor: "#f8f9fa",
// //   overflowX: "hidden"
// // }}>
// //   <Navigation />
  
// //   <div style={{ maxWidth: "1390px", margin: "0 auto" }}>
// //     <h2 style={{
// //       textAlign: "center",
// //       marginBottom: "20px",
// //       color: "#2c3e50",
// //       fontWeight: "600",
// //       fontSize: "28px",
// //       paddingBottom: "10px",
// //       borderBottom: "2px solid #eaeaea",
// //       position: "sticky",
// //       top: "120px", // <-- keeps heading sticky under navbar
// //       backgroundColor: "#f8f9fa",
// //       zIndex: 50
// //     }}>
// //       My Orders
// //     </h2>

// //         {/* Error */}
// //         {error && <div style={{ color: "#721c24", backgroundColor: "#f8d7da", border: "1px solid #f5c6cb", padding: "12px", borderRadius: "6px", marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
// //           {error} <button onClick={() => setError("")} style={{ border: "none", background: "none", cursor: "pointer" }}>×</button>
// //         </div>}

// //         {/* Filters */}
// //         <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "30px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #e0e0e0" }}>
// //           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
// //             <div>
// //               <label>Status:</label>
// //               <select name="status" value={filter.status} onChange={handleFilterChange} style={{ width: "100%" }}>
// //                 <option value="">All Statuses</option>
// //                 <option value="pending">Pending</option>
// //                 <option value="processing">Processing</option>
// //                 <option value="completed">Completed</option>
// //                 <option value="canceled">Canceled</option>
// //               </select>
// //             </div>
// //             <div>
// //               <label>Start Date:</label>
// //               <input type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} style={{ width: "100%" }} />
// //             </div>
// //             <div>
// //               <label>End Date:</label>
// //               <input type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} style={{ width: "100%" }} />
// //             </div>
// //             <div>
// //               <button onClick={clearFilters} style={{ width: "100%", backgroundColor: "#6c757d", color: "white" }}>Clear Filters</button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Orders Table */}
// //         <div style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #e0e0e0" }}>
// //           <table style={{ width: "100%", borderCollapse: "collapse" }}>
// //             <thead>
// //               <tr style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 10 }}>
// //                 {["Order ID","Control No","Date","Status","Product Name","Quantity","Price","Total","Actions"].map((h,i) => <th key={i} style={{padding:"12px", textAlign:"center"}}>{h}</th>)}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredOrders.length === 0 && <tr><td colSpan="9" style={{textAlign:"center", padding:"20px"}}>No orders found</td></tr>}
// //               {filteredOrders.map(order => (
// //                 <tr key={order.orderId}>
// //                   <td style={tdStyle}>{order.orderId}</td>
// //                   <td style={tdStyle}>{order.controlNumber}</td>
// //                   <td style={tdStyle}>{new Date(order.date).toLocaleDateString()}</td>
// //                   <td style={{...tdStyle,...getStatusStyle(order.status)}}>{order.status}</td>
// //                   <td style={tdStyle}>{order.product?.productName}</td>
// //                   <td style={tdStyle}>{order.quantity}</td>
// //                   <td style={tdStyle}>${order.product?.price.toFixed(2)}</td>
// //                   <td style={tdStyle}>${(order.product?.price * order.quantity).toFixed(2)}</td>
// //                   <td style={tdStyle}>
// //                     <button onClick={() => handleDelete(order.orderId)} disabled={order.status==="completed"}>Delete</button>
// //                     <button onClick={() => handleCancel(order.orderId)} disabled={order.status==="completed" || order.status==="canceled"}>Cancel</button>
// //                     <button onClick={() => openPaymentModal(order)} disabled={order.status==="completed" || order.status==="canceled"}>Payment</button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Payment Modal */}
// //         {paymentModal.visible && (
// //           <div style={{
// //             position: "fixed", top:0, left:0, width:"100%", height:"100%",
// //             backgroundColor:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:1000
// //           }}>
// //             <div style={{ backgroundColor:"white", padding:"30px", borderRadius:"10px", minWidth:"300px" }}>
// //               <h3>Payment Details</h3>
// //               <p><strong>Control Number:</strong> {paymentModal.order.controlNumber}</p>
// //               <p><strong>Amount:</strong> ${(paymentModal.order.product?.price * paymentModal.order.quantity).toFixed(2)}</p>
// //               <button onClick={closePaymentModal} style={{ marginTop:"20px", padding:"10px 20px" }}>Close</button>
// //             </div>
// //           </div>
// //         )}

// //       </div>
// //     </div>
// //   );
// // };

// // const tdStyle = { padding: "8px", textAlign: "center", borderBottom:"1px solid #eee" };

// // export default ViewOrders;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navigation from "../navigation/Navigation";
// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

// const ViewOrders = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState({ status: "", startDate: "", endDate: "" });
//   const [modalData, setModalData] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [paymentLoading, setPaymentLoading] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const customerId = localStorage.getItem("customerId");
//       if (!customerId) {
//         setError("Customer ID not found. Please log in again.");
//         setLoading(false);
//         return;
//       }
//       const response = await axios.get(`http://localhost:8080/api/orders/customer/${customerId}`);
//       setOrders(response.data);
//       setError("");
//     } catch (err) {
//       console.error("Error fetching orders:", err);
//       setError("Failed to fetch orders. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredOrders = orders.filter(order => {
//     return (
//       (filter.status === "" || order.status.toLowerCase() === filter.status.toLowerCase()) &&
//       (filter.startDate === "" || new Date(order.date) >= new Date(filter.startDate)) &&
//       (filter.endDate === "" || new Date(order.date) <= new Date(filter.endDate))
//     );
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const clearFilters = () => setFilter({ status: "", startDate: "", endDate: "" });

//   const handleDelete = async (orderId) => {
//     if (!window.confirm("Are you sure you want to delete this order?")) return;
//     try {
//       await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
//       setOrders(orders.filter((order) => order.orderId !== orderId));
//       alert("Order deleted successfully.");
//     } catch (err) {
//       console.error("Error deleting order:", err);
//       alert("Failed to delete order. Please try again later.");
//     }
//   };

//   const handleCancel = async (orderId) => {
//     if (!window.confirm("Are you sure you want to cancel this order?")) return;
//     try {
//       await axios.patch(`http://localhost:8080/api/orders/cancel/${orderId}`);
//       setOrders(orders.map((order) => 
//         order.orderId === orderId ? { ...order, status: "canceled" } : order
//       ));
//       alert("Order canceled successfully.");
//     } catch (err) {
//       console.error("Error canceling order:", err);
//       alert("Failed to cancel order. Please try again later.");
//     }
//   };

//   const getStatusStyle = (status) => {
//     const styles = {
//       pending: { backgroundColor: "#fff3cd", color: "#856404" },
//       completed: { backgroundColor: "#d4edda", color: "#155724" },
//       canceled: { backgroundColor: "#f8d7da", color: "#721c24" },
//       processing: { backgroundColor: "#cce7ff", color: "#004085" }
//     };
//     return styles[status.toLowerCase()] || { backgroundColor: "#e2e3e5", color: "#383d41" };
//   };

//   const openPaymentModal = (order) => {
//     setModalData({
//       controlNumber: order.controlNumber,
//       amount: ((order.product?.price || 0) * order.quantity).toFixed(2),
//       orderId: order.orderId
//     });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalData(null);
//     setIsModalOpen(false);
//   };

//  const handlePayment = async () => {
//   if (!modalData) return;
//   setPaymentLoading(true);
//   try {
//     const controlNumber = modalData.controlNumber;
//     const orderId = modalData.orderId;
    
//     // Use the correct endpoint that matches your backend
//     await axios.post(`http://localhost:8080/api/payments/orders/${orderId}/payment/${controlNumber}`, {
//       amount: parseFloat(modalData.amount) // Ensure it's a number, not string
//     }, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
    
//     alert("Payment successful!");
//     closeModal();
//     fetchOrders();
//   } catch (err) {
//     console.error("Payment error details:", err.response?.data || err.message);
    
//     if (err.code === 'NETWORK_ERROR' || err.message.includes('CORS')) {
//       alert("CORS error: Please check backend configuration");
//     } else if (err.response?.status === 404) {
//       alert("Order not found. Please refresh and try again.");
//     } else if (err.response?.status === 409) {
//       alert("Payment already completed for this order.");
//     } else {
//       alert("Payment failed. Please try again.");
//     }
//   } finally {
//     setPaymentLoading(false);
//   }
// };

//   if (loading) {
//     return (
//       <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
//         <Navigation />
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//           <div style={{ display: "inline-block", width: "50px", height: "50px", border: "5px solid #f3f3f3", borderTop: "5px solid #3498db", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }}></div>
//           <p style={{ color: "#6c757d", fontSize: "18px" }}>Loading your orders...</p>
//         </div>
//         <style>{`@keyframes spin {0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", paddingTop: "30px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fa" }}>
//       <Navigation />

//       <div style={{ maxWidth: "1390px", margin: "0 auto",marginLeft:"240px" }}>
//         {/* Top Heading */}
//         <h2 style={{
//           textAlign: "center",
//           marginBottom: "20px",
//           color: "#2c3e50",
//           fontWeight: "600",
//           fontSize: "28px",
//           paddingBottom: "10px",
//           borderBottom: "2px solid #eaeaea",
//           position: "sticky",
//           top: "80px",
//           backgroundColor: "#f8f9fa",
//           zIndex: 50
//         }}>
//           My Orders
//         </h2>

//         {error && (
//           <div style={{
//             color: "#721c24",
//             backgroundColor: "#f8d7da",
//             border: "1px solid #f5c6cb",
//             padding: "12px",
//             borderRadius: "6px",
//             marginBottom: "20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between"
//           }}>
//             <span>{error}</span>
//             <button onClick={() => setError("")} style={{ background: "none", border: "none", color: "#721c24", fontSize: "18px", cursor: "pointer" }}>×</button>
//           </div>
//         )}

//         {/* Filter Section (unchanged) */}
//         <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", marginBottom: "20px", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #e0e0e0", position: "sticky", top: "130px", zIndex: 40 }}>
//           <h3 style={{ margin: "0 0 15px 0", color: "#2c3e50", fontSize: "18px", fontWeight: "600" }}>Filter Orders</h3>
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px", alignItems: "end" }}>
//             <div>
//               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>Status:</label>
//               <select name="status" value={filter.status} onChange={handleFilterChange} style={{ padding: "10px 12px", borderRadius: "6px", border: "1px solid #ced4da", width: "100%", fontSize: "15px", backgroundColor: "white" }}>
//                 <option value="">All Statuses</option>
//                 <option value="pending">Pending</option>
//                 <option value="processing">Processing</option>
//                 <option value="completed">Completed</option>
//                 <option value="canceled">Canceled</option>
//               </select>
//             </div>
//             <div>
//               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>Start Date:</label>
//               <input type="date" name="startDate" value={filter.startDate} onChange={handleFilterChange} style={{ padding: "10px 12px", borderRadius: "6px", border: "1px solid #ced4da", width: "100%", fontSize: "15px" }} />
//             </div>
//             <div>
//               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>End Date:</label>
//               <input type="date" name="endDate" value={filter.endDate} onChange={handleFilterChange} style={{ padding: "10px 12px", borderRadius: "6px", border: "1px solid #ced4da", width: "100%", fontSize: "15px" }} />
//             </div>
//             <div>
//               <button onClick={clearFilters} style={{ padding: "10px 18px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "15px", fontWeight: "500", width: "100%" }}>Clear Filters</button>
//             </div>
//           </div>
//         </div>

//         {/* Table Container */}
//         <div style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)", border: "1px solid #e0e0e0", maxHeight: "500px", overflowY: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1200px"}}>
//             <thead style={{ position: "sticky", top: 0, backgroundColor: "#f8f9fa", zIndex: 30 }}>
//               <tr>
//                 <th style={thStyle}>Order ID</th>
//                 <th style={thStyle}>Control No</th>
//                 <th style={thStyle}>Date</th>
//                 <th style={thStyle}>Status</th>
//                 <th style={thStyle}>Product Name</th>
//                 <th style={thStyle}>Description</th>
//                 <th style={thStyle}>Quantity</th>
//                 <th style={thStyle}>Size</th>
//                 <th style={thStyle}>Price</th>
//                 <th style={thStyle}>Total</th>
//                 <th style={thStyle}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.length > 0 ? (
//                 filteredOrders.map((order, index) => (
//                   <tr key={order.orderId} style={{ borderBottom: "1px solid #eaeaea", backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" }}>
//                     <td style={tdStyle}>{order.orderId}</td>
//                     <td style={tdStyle}>{order.controlNumber}</td>
//                     <td style={tdStyle}>{new Date(order.date).toLocaleDateString()}</td>
//                     <td style={tdStyle}><span style={{ padding: "4px 8px", borderRadius: "12px", fontSize: "12px", fontWeight: "500", ...getStatusStyle(order.status) }}>{order.status}</span></td>
//                     <td style={tdStyle}>{order.product?.productName || "N/A"}</td>
//                     <td style={tdStyle}>{order.product?.productDescription?.substring(0, 30) || "N/A"}{order.product?.productDescription?.length > 30 ? "..." : ""}</td>
//                     <td style={tdStyle}>{order.quantity}</td>
//                     <td style={tdStyle}>{order.size}</td>
//                     <td style={priceStyle}>{order.product?.price?.toFixed(2) || "0.00"}Tsh</td>
//                     <td style={totalStyle}>{((order.product?.price || 0) * order.quantity).toFixed(2)}Tsh</td>
//                     <td style={{ ...tdStyle, textAlign: "center" }}>
//                       <div style={{ display: "flex", gap: "8px", justifyContent: "center", flexWrap: "wrap" }}>
//                         <button onClick={() => handleDelete(order.orderId)} style={deleteBtnStyle} disabled={order.status === "completed"}>Delete</button>
//                         <button onClick={() => handleCancel(order.orderId)} style={cancelBtnStyle} disabled={order.status === "completed" || order.status === "canceled"}>Cancel</button>
//                         <button onClick={() => openPaymentModal(order)} style={paymentBtnStyle} disabled={order.status === "completed" || order.status === "canceled"}>Payment</button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="11" style={{ padding: "40px", textAlign: "center", color: "#6c757d" }}>{orders.length === 0 ? "No orders found" : "No orders match your filters"}</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Payment Modal */}
//         {isModalOpen && modalData && (
//           <div style={{
//             position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
//             backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center",
//             zIndex: 100
//           }}>
//             <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "12px", minWidth: "320px", maxWidth: "400px", textAlign: "center" }}>
//               <h3 style={{ marginBottom: "20px", color: "#2c3e50" }}>Payment Details</h3>
//               <p><strong>Control Number:</strong> {modalData.controlNumber}</p>
//               <p><strong>Amount Payed:</strong> ${modalData.amount}</p>
//               <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>
//                 <button onClick={handlePayment} disabled={paymentLoading} style={{ padding: "10px 20px", borderRadius: "6px", border: "none", backgroundColor: "#27ae60", color: "white", cursor: "pointer",width:"140px" }}>{paymentLoading ? "Processing..." : "Pay Now"}</button>
//                 <button onClick={closeModal} style={{ padding: "10px 20px", borderRadius: "6px", border: "none", backgroundColor: "#6c757d", color: "white", cursor: "pointer",width:"140px" }}>Close</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Styles
// const thStyle = { padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontWeight: "600", color: "#2c3e50" };
// const tdStyle = { padding: "12px", borderBottom: "1px solid #eaeaea", textAlign: "center", fontSize: "14px" };
// const priceStyle = { ...tdStyle, textAlign: "right", fontWeight: "500", color: "#2c3e50" };
// const totalStyle = { ...priceStyle, fontWeight: "600", backgroundColor: "#dff0d8", color: "#2c662d" };
// const baseButtonStyle = { padding: "6px 12px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontWeight: "500", transition: "all 0.2s ease", minWidth: "70px" };
// const deleteBtnStyle = { ...baseButtonStyle, backgroundColor: "#e74c3c", color: "white" };
// const cancelBtnStyle = { ...baseButtonStyle, backgroundColor: "#f39c12", color: "white" };
// const paymentBtnStyle = { ...baseButtonStyle, backgroundColor: "#27ae60", color: "white" };

// export default ViewOrders;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navigation from "../navigation/Navigation";

// const ViewOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState({ 
//     controlNumber: '', 
//     customerName: '', 
//     customerEmail: '', 
//     customerPhone: '',
//     status: 'ALL'
//   });
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:8080/api/orders/all');
//       console.log('Orders data received:', response.data);
//       setOrders(response.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       setError('Failed to fetch orders. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const handleUpdateStatus = async (controlNumber, newStatus) => {
//     try {
//       await axios.put(`http://localhost:8080/api/orders/update/${controlNumber}`, null, {
//         params: {
//           status: newStatus
//         }
//       });
//       fetchOrders();
//     } catch (err) {
//       console.error('Error updating order status:', err);
//       alert('Failed to update order status');
//     }
//   };

//   const handleSendReminder = async (controlNumber) => {
//     try {
//       await axios.post(`http://localhost:8080/api/orders/reminder/${controlNumber}`);
//       alert('Payment reminder sent successfully!');
//     } catch (err) {
//       console.error('Error sending reminder:', err);
//       alert('Failed to send payment reminder');
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const clearFilters = () => setFilter({ 
//     controlNumber: '', 
//     customerName: '', 
//     customerEmail: '', 
//     customerPhone: '',
//     status: 'ALL'
//   });

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending' },
//       'CONFIRMED': { color: '#d1ecf1', textColor: '#0c5460', text: 'Confirmed' },
//       'PROCESSING': { color: '#ffe5d0', textColor: '#fd7e14', text: 'Processing' },
//       'SHIPPED': { color: '#cce7ff', textColor: '#0056b3', text: 'Shipped' },
//       'DELIVERED': { color: '#d4edda', textColor: '#155724', text: 'Delivered' },
//       'CANCELLED': { color: '#f8d7da', textColor: '#721c24', text: 'Cancelled' },
//       'COMPLETED': { color: '#d4edda', textColor: '#155724', text: 'Completed' }
//     };

//     const config = statusConfig[status] || { color: '#e2e3e5', textColor: '#383d41', text: status };
    
//     return (
//       <span style={{
//         padding: "4px 8px",
//         borderRadius: "12px",
//         fontSize: "12px",
//         fontWeight: "500",
//         backgroundColor: config.color,
//         color: config.textColor,
//         display: 'inline-block',
//         whiteSpace: 'nowrap'
//       }}>
//         {config.text}
//       </span>
//     );
//   };

//   const getPaymentStatusBadge = (paymentStatus) => {
//     const paymentConfig = {
//       'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending' },
//       'PAID': { color: '#d4edda', textColor: '#155724', text: 'Paid' },
//       'FAILED': { color: '#f8d7da', textColor: '#721c24', text: 'Failed' },
//       'REFUNDED': { color: '#e2e3e5', textColor: '#383d41', text: 'Refunded' }
//     };

//     const config = paymentConfig[paymentStatus] || { color: '#e2e3e5', textColor: '#383d41', text: paymentStatus };
    
//     return (
//       <span style={{
//         padding: "4px 8px",
//         borderRadius: "12px",
//         fontSize: "12px",
//         fontWeight: "500",
//         backgroundColor: config.color,
//         color: config.textColor,
//         display: 'inline-block',
//         whiteSpace: 'nowrap'
//       }}>
//         {config.text}
//       </span>
//     );
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const formatCurrency = (amount) => {
//     if (!amount) return 'Tsh 0';
//     return `Tsh ${parseInt(amount).toLocaleString()}`;
//   };

//   const getNetworkDisplayName = (network) => {
//     switch (network) {
//       case 'tigo': return 'Tigo Pesa';
//       case 'mpesa': return 'M-Pesa';
//       case 'airtel': return 'Airtel Money';
//       case 'halopesa': return 'Halotel Pesa';
//       default: return network || 'Not specified';
//     }
//   };

//   // Filtered orders
//   const filteredOrders = orders.filter(order => {
//     return (
//       (filter.controlNumber === '' || (order.controlNumber || '').toLowerCase().includes(filter.controlNumber.toLowerCase())) &&
//       (filter.customerName === '' || (order.customerName || '').toLowerCase().includes(filter.customerName.toLowerCase())) &&
//       (filter.customerEmail === '' || (order.customerEmail || '').toLowerCase().includes(filter.customerEmail.toLowerCase())) &&
//       (filter.customerPhone === '' || (order.customerPhone || '').includes(filter.customerPhone)) &&
//       (filter.status === 'ALL' || order.status === filter.status)
//     );
//   });

//   if (loading) {
//     return (
//       <>
//         <Navigation />
//         <div style={{ 
//           padding: "20px", 
//           fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
//           minHeight: "100vh", 
//           backgroundColor: "#d8dbddff",
//           marginLeft: "250px",
//           width: "85%",
//           marginTop: "20px",
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <div style={{ 
//             textAlign: 'center',
//             padding: '40px',
//             background: 'white',
//             borderRadius: '15px',
//             boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
//           }}>
//             <div style={{ 
//               width: '50px', 
//               height: '50px', 
//               border: '4px solid #f3f3f3',
//               borderTop: '4px solid #667eea',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               margin: '0 auto 20px'
//             }}></div>
//             <h3 style={{ color: '#2c3e50', margin: 0 }}>Loading Orders...</h3>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navigation />
//       <div style={{ 
//         padding: "20px", 
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
//         minHeight: "100vh", 
//         backgroundColor: "#d8dbddff",
//         marginLeft: "250px",
//         width: "85%",
//         marginTop: "20px" 
//       }}>
//         <h1 style={{ 
//           textAlign: "center", 
//           overflowY: "hidden",
//           backgroundColor: "#e2e6e9ff", 
//           color: "black", 
//           padding: "12px", 
//           borderRadius: "12px", 
//           marginBottom: "10px",
//           marginTop: "20px" 
//         }}>
//           ORDERS LIST
//         </h1>

//         {/* Filter Section */}
//         <div style={{
//           backgroundColor: "white",
//           padding: "15px 20px",
//           borderRadius: "10px",
//           marginBottom: "20px",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: "15px",
//           alignItems: "end"
//         }}>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Control Number</label>
//             <input 
//               type="text" 
//               name="controlNumber" 
//               value={filter.controlNumber} 
//               onChange={handleFilterChange} 
//               placeholder="Search by control number"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Name</label>
//             <input 
//               type="text" 
//               name="customerName" 
//               value={filter.customerName} 
//               onChange={handleFilterChange} 
//               placeholder="Search by customer name"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Email</label>
//             <input 
//               type="text" 
//               name="customerEmail" 
//               value={filter.customerEmail} 
//               onChange={handleFilterChange} 
//               placeholder="Search by email"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Phone</label>
//             <input 
//               type="text" 
//               name="customerPhone" 
//               value={filter.customerPhone} 
//               onChange={handleFilterChange} 
//               placeholder="Search by phone"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Status</label>
//             <select
//               name="status"
//               value={filter.status}
//               onChange={handleFilterChange}
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
//             >
//               <option value="ALL">All Status</option>
//               <option value="PENDING">Pending</option>
//               <option value="CONFIRMED">Confirmed</option>
//               <option value="PROCESSING">Processing</option>
//               <option value="SHIPPED">Shipped</option>
//               <option value="DELIVERED">Delivered</option>
//               <option value="COMPLETED">Completed</option>
//               <option value="CANCELLED">Cancelled</option>
//             </select>
//           </div>
//           <div>
//             <button 
//               onClick={clearFilters} 
//               style={{ 
//                 padding: "10px 15px", 
//                 backgroundColor: "#6c757d", 
//                 color: "white", 
//                 border: "none", 
//                 borderRadius: "6px", 
//                 cursor: "pointer", 
//                 width: "100%" 
//               }}
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div style={{
//             backgroundColor: "#f8d7da",
//             color: "#721c24",
//             padding: "12px 15px",
//             borderRadius: "6px",
//             marginBottom: "15px",
//             border: "1px solid #f5c6cb"
//           }}>
//             <strong>Error:</strong> {error}
//             <button 
//               onClick={fetchOrders}
//               style={{
//                 marginLeft: "15px",
//                 padding: "5px 10px",
//                 backgroundColor: "#dc3545",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "12px"
//               }}
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Orders Table */}
//         <div style={{ 
//           backgroundColor: "white", 
//           borderRadius: "10px", 
//           overflow: "hidden", 
//           boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//           height: "600px" 
//         }}>
//           <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//             <table style={{ 
//               width: "100%", 
//               borderCollapse: "collapse", 
//               minWidth: "1200px"
//             }}>
//               <thead style={{ 
//                 backgroundColor: "#f8f9fa", 
//                 position: "sticky", 
//                 top: 0, 
//                 zIndex: 10 
//               }}>
//                 <tr>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Order ID</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Control #</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Customer</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Product</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Qty</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Amount</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Status</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Payment</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Network</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Order Date</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
//                   <tr 
//                     key={order.orderId} 
//                     style={{ 
//                       backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", 
//                       borderBottom: "1px solid #eaeaea" 
//                     }}
//                   >
//                     <td style={{ padding: "8px", fontSize: "12px" }}>{order.orderId}</td>
//                     <td style={{ padding: "8px", fontSize: "12px", fontFamily: "monospace", fontWeight: "600" }}>
//                       {order.controlNumber || 'N/A'}
//                     </td>
//                     <td style={{ padding: "8px" }}>
//                       <div style={{ fontWeight: "600", fontSize: "12px" }}>{order.customerName || 'N/A'}</div>
//                       <div style={{ fontSize: "11px", color: "#6c757d" }}>{order.customerEmail || 'N/A'}</div>
//                       <div style={{ fontSize: "11px", color: "#6c757d" }}>{order.customerPhone || 'N/A'}</div>
//                     </td>
//                     <td style={{ padding: "8px", fontSize: "12px" }}>
//                       {order.product?.productName || 'Unknown Product'}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "600" }}>
//                       {order.quantity || '0'}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#28a745" }}>
//                       {formatCurrency(order.totalAmount)}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>
//                       {getStatusBadge(order.status)}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>
//                       {getPaymentStatusBadge(order.paymentStatus)}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center", fontSize: "11px" }}>
//                       {getNetworkDisplayName(order.preferredNetwork)}
//                     </td>
//                     <td style={{ padding: "8px", fontSize: "11px", color: "#6c757d" }}>
//                       {formatDate(order.orderDate)}
//                     </td>
//                     <td style={{ padding: "8px", display: "flex", gap: "5px", flexDirection: "column" }}>
//                       <button 
//                         onClick={() => handleViewDetails(order)} 
//                         style={{ 
//                           padding: "4px 8px", 
//                           borderRadius: "4px", 
//                           backgroundColor: "#007bff", 
//                           color: "white", 
//                           border: "none", 
//                           cursor: "pointer",
//                           fontSize: "11px"
//                         }}
//                       >
//                         View
//                       </button>
//                       {order.paymentStatus === 'PENDING' && (
//                         <button 
//                           onClick={() => handleSendReminder(order.controlNumber)} 
//                           style={{ 
//                             padding: "4px 8px", 
//                             borderRadius: "4px", 
//                             backgroundColor: "#ffc107", 
//                             color: "white", 
//                             border: "none", 
//                             cursor: "pointer",
//                             fontSize: "11px"
//                           }}
//                         >
//                           Remind
//                         </button>
//                       )}
//                       {order.status === 'PENDING' && (
//                         <button 
//                           onClick={() => handleUpdateStatus(order.controlNumber, 'CONFIRMED')} 
//                           style={{ 
//                             padding: "4px 8px", 
//                             borderRadius: "4px", 
//                             backgroundColor: "#28a745", 
//                             color: "white", 
//                             border: "none", 
//                             cursor: "pointer",
//                             fontSize: "11px"
//                           }}
//                         >
//                           Confirm
//                         </button>
//                       )}
//                       {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
//                         <button 
//                           onClick={() => handleUpdateStatus(order.controlNumber, 'CANCELLED')} 
//                           style={{ 
//                             padding: "4px 8px", 
//                             borderRadius: "4px", 
//                             backgroundColor: "#dc3545", 
//                             color: "white", 
//                             border: "none", 
//                             cursor: "pointer",
//                             fontSize: "11px"
//                           }}
//                         >
//                           Cancel
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>No orders found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Order Details Modal */}
//         {isModalOpen && selectedOrder && (
//           <div style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.6)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//             padding: "10px"
//           }}>
//             <div style={{
//               backgroundColor: "white",
//               borderRadius: "12px",
//               width: "500px",
//               maxWidth: "100%",
//               padding: "25px 20px",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
//               overflowY: "auto",
//               maxHeight: "90vh"
//             }}>
//               <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>Order Details</h2>
              
//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Control Number:</strong> 
//                 <div style={{ 
//                   padding: "8px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px",
//                   fontFamily: "monospace",
//                   fontWeight: "600"
//                 }}>
//                   {selectedOrder.controlNumber}
//                 </div>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
//                 <div>
//                   <strong>Order ID:</strong>
//                   <div style={{ padding: "4px 0" }}>{selectedOrder.orderId}</div>
//                 </div>
//                 <div>
//                   <strong>Status:</strong>
//                   <div style={{ padding: "4px 0" }}>{getStatusBadge(selectedOrder.status)}</div>
//                 </div>
//                 <div>
//                   <strong>Payment Status:</strong>
//                   <div style={{ padding: "4px 0" }}>{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
//                 </div>
//                 <div>
//                   <strong>Order Type:</strong>
//                   <div style={{ padding: "4px 0" }}>{selectedOrder.orderType || 'STANDARD'}</div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Customer Information:</strong>
//                 <div style={{ 
//                   padding: "10px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px" 
//                 }}>
//                   <div><strong>Name:</strong> {selectedOrder.customerName}</div>
//                   <div><strong>Email:</strong> {selectedOrder.customerEmail}</div>
//                   <div><strong>Phone:</strong> {selectedOrder.customerPhone}</div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Product Information:</strong>
//                 <div style={{ 
//                   padding: "10px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px" 
//                 }}>
//                   <div><strong>Product:</strong> {selectedOrder.product?.productName || 'Unknown Product'}</div>
//                   <div><strong>Quantity:</strong> {selectedOrder.quantity}</div>
//                   <div><strong>Unit Price:</strong> {formatCurrency(selectedOrder.product?.sellingPrice || selectedOrder.totalAmount / selectedOrder.quantity)}</div>
//                   <div><strong>Payment Network:</strong> {getNetworkDisplayName(selectedOrder.preferredNetwork)}</div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "20px" }}>
//                 <strong>Payment Summary:</strong>
//                 <div style={{ 
//                   padding: "10px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px" 
//                 }}>
//                   <div><strong>Total Amount:</strong> {formatCurrency(selectedOrder.totalAmount)}</div>
//                   <div><strong>Order Date:</strong> {formatDate(selectedOrder.orderDate)}</div>
//                 </div>
//               </div>

//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//                 <button
//                   onClick={handleCloseModal}
//                   style={{ 
//                     padding: "8px 16px", 
//                     borderRadius: "6px", 
//                     border: "1px solid #6c757d", 
//                     backgroundColor: "#6c757d", 
//                     color: "white", 
//                     cursor: "pointer" 
//                   }}
//                 >
//                   Close
//                 </button>
//                 {selectedOrder.paymentStatus === 'PENDING' && (
//                   <button
//                     onClick={() => {
//                       handleSendReminder(selectedOrder.controlNumber);
//                       handleCloseModal();
//                     }}
//                     style={{ 
//                       padding: "8px 16px", 
//                       borderRadius: "6px", 
//                       border: "none", 
//                       backgroundColor: "#ffc107", 
//                       color: "white", 
//                       cursor: "pointer" 
//                     }}
//                   >
//                     Send Reminder
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default ViewOrder;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navigation from "../navigation/Navigation";

// const ViewOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState({ 
//     controlNumber: '', 
//     customerName: '', 
//     customerEmail: '', 
//     customerPhone: '',
//     status: 'ALL'
//   });
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   const fetchOrders = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:8080/api/orders/all');
//       console.log('Orders data received:', response.data);
      
//       // Log the first order to check available date fields
//       if (response.data.length > 0) {
//         const firstOrder = response.data[0];
//         console.log('First order date fields:', {
//           date: firstOrder.date,
//           createdAt: firstOrder.createdAt,
//           orderDate: firstOrder.orderDate // This might be undefined
//         });
//       }
      
//       setOrders(response.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//       setError('Failed to fetch orders. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleViewDetails = (order) => {
//     setSelectedOrder(order);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   const handleUpdateStatus = async (controlNumber, newStatus) => {
//     try {
//       await axios.put(`http://localhost:8080/api/orders/update/${controlNumber}`, null, {
//         params: {
//           status: newStatus
//         }
//       });
//       fetchOrders();
//     } catch (err) {
//       console.error('Error updating order status:', err);
//       alert('Failed to update order status');
//     }
//   };

//   const handleSendReminder = async (controlNumber) => {
//     try {
//       await axios.post(`http://localhost:8080/api/orders/reminder/${controlNumber}`);
//       alert('Payment reminder sent successfully!');
//     } catch (err) {
//       console.error('Error sending reminder:', err);
//       alert('Failed to send payment reminder');
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const clearFilters = () => setFilter({ 
//     controlNumber: '', 
//     customerName: '', 
//     customerEmail: '', 
//     customerPhone: '',
//     status: 'ALL'
//   });

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending' },
//       'CONFIRMED': { color: '#d1ecf1', textColor: '#0c5460', text: 'Confirmed' },
//       'PROCESSING': { color: '#ffe5d0', textColor: '#fd7e14', text: 'Processing' },
//       'SHIPPED': { color: '#cce7ff', textColor: '#0056b3', text: 'Shipped' },
//       'DELIVERED': { color: '#d4edda', textColor: '#155724', text: 'Delivered' },
//       'CANCELLED': { color: '#f8d7da', textColor: '#721c24', text: 'Cancelled' },
//       'COMPLETED': { color: '#d4edda', textColor: '#155724', text: 'Completed' }
//     };

//     const config = statusConfig[status] || { color: '#e2e3e5', textColor: '#383d41', text: status };
    
//     return (
//       <span style={{
//         padding: "4px 8px",
//         borderRadius: "12px",
//         fontSize: "12px",
//         fontWeight: "500",
//         backgroundColor: config.color,
//         color: config.textColor,
//         display: 'inline-block',
//         whiteSpace: 'nowrap'
//       }}>
//         {config.text}
//       </span>
//     );
//   };

//   const getPaymentStatusBadge = (paymentStatus) => {
//     const paymentConfig = {
//       'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending' },
//       'PAID': { color: '#d4edda', textColor: '#155724', text: 'Paid' },
//       'FAILED': { color: '#f8d7da', textColor: '#721c24', text: 'Failed' },
//       'REFUNDED': { color: '#e2e3e5', textColor: '#383d41', text: 'Refunded' }
//     };

//     const config = paymentConfig[paymentStatus] || { color: '#e2e3e5', textColor: '#383d41', text: paymentStatus };
    
//     return (
//       <span style={{
//         padding: "4px 8px",
//         borderRadius: "12px",
//         fontSize: "12px",
//         fontWeight: "500",
//         backgroundColor: config.color,
//         color: config.textColor,
//         display: 'inline-block',
//         whiteSpace: 'nowrap'
//       }}>
//         {config.text}
//       </span>
//     );
//   };

//   const formatDate = (dateValue) => {
//     if (!dateValue) return 'No Date';
    
//     try {
//       let date;
      
//       // Handle different date types from database
//       if (dateValue instanceof Date) {
//         date = dateValue;
//       } else if (typeof dateValue === 'string') {
//         // Try parsing as ISO string
//         date = new Date(dateValue);
        
//         // If invalid, try other formats
//         if (isNaN(date.getTime())) {
//           // Try parsing as timestamp
//           date = new Date(parseInt(dateValue));
//         }
//       } else if (typeof dateValue === 'number') {
//         date = new Date(dateValue);
//       } else if (Array.isArray(dateValue)) {
//         // Handle LocalDateTime array format [2024, 12, 25, 10, 30, 0]
//         if (dateValue.length >= 3) {
//           date = new Date(dateValue[0], dateValue[1] - 1, dateValue[2], 
//                          dateValue[3] || 0, dateValue[4] || 0, dateValue[5] || 0);
//         }
//       }
      
//       // Check if we have a valid date
//       if (!date || isNaN(date.getTime())) {
//         console.log('Invalid date format:', dateValue);
//         return 'Invalid Date';
//       }
      
//       return date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric',
//         hour: '2-digit',
//         minute: '2-digit'
//       });
//     } catch (error) {
//       console.error('Error formatting date:', dateValue, error);
//       return 'Date Error';
//     }
//   };

//   // Get the correct date from order - prioritize createdAt, then date
//   const getOrderDate = (order) => {
//     // Try createdAt first (LocalDateTime with @CreationTimestamp)
//     if (order.createdAt) {
//       return order.createdAt;
//     }
//     // Fall back to date field (Date type)
//     if (order.date) {
//       return order.date;
//     }
//     // Fall back to orderDate if it exists (though it shouldn't in your entity)
//     if (order.orderDate) {
//       return order.orderDate;
//     }
//     return null;
//   };

//   const formatCurrency = (amount) => {
//     if (!amount) return 'Tsh 0';
//     return `Tsh ${parseInt(amount).toLocaleString()}`;
//   };

//   const getNetworkDisplayName = (network) => {
//     switch (network) {
//       case 'tigo': return 'Tigo Pesa';
//       case 'mpesa': return 'M-Pesa';
//       case 'airtel': return 'Airtel Money';
//       case 'halopesa': return 'Halotel Pesa';
//       default: return network || 'Not specified';
//     }
//   };

//   // Filtered orders
//   const filteredOrders = orders.filter(order => {
//     return (
//       (filter.controlNumber === '' || (order.controlNumber || '').toLowerCase().includes(filter.controlNumber.toLowerCase())) &&
//       (filter.customerName === '' || (order.customerName || '').toLowerCase().includes(filter.customerName.toLowerCase())) &&
//       (filter.customerEmail === '' || (order.customerEmail || '').toLowerCase().includes(filter.customerEmail.toLowerCase())) &&
//       (filter.customerPhone === '' || (order.customerPhone || '').includes(filter.customerPhone)) &&
//       (filter.status === 'ALL' || order.status === filter.status)
//     );
//   });

//   if (loading) {
//     return (
//       <>
//         <Navigation />
//         <div style={{ 
//           padding: "20px", 
//           fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
//           minHeight: "100vh", 
//           backgroundColor: "#d8dbddff",
//           marginLeft: "250px",
//           width: "85%",
//           marginTop: "20px",
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center'
//         }}>
//           <div style={{ 
//             textAlign: 'center',
//             padding: '40px',
//             background: 'white',
//             borderRadius: '15px',
//             boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
//           }}>
//             <div style={{ 
//               width: '50px', 
//               height: '50px', 
//               border: '4px solid #f3f3f3',
//               borderTop: '4px solid #667eea',
//               borderRadius: '50%',
//               animation: 'spin 1s linear infinite',
//               margin: '0 auto 20px'
//             }}></div>
//             <h3 style={{ color: '#2c3e50', margin: 0 }}>Loading Orders...</h3>
//           </div>
//         </div>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navigation />
//       <div style={{ 
//         padding: "20px", 
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
//         minHeight: "100vh", 
//         backgroundColor: "#d8dbddff",
//         marginLeft: "250px",
//         width: "85%",
//         marginTop: "20px" 
//       }}>
//         <h1 style={{ 
//           textAlign: "center", 
//           overflowY: "hidden",
//           backgroundColor: "#e2e6e9ff", 
//           color: "black", 
//           padding: "12px", 
//           borderRadius: "12px", 
//           marginBottom: "10px",
//           marginTop: "20px" 
//         }}>
//           ORDERS LIST
//         </h1>

//         {/* Filter Section */}
//         <div style={{
//           backgroundColor: "white",
//           padding: "15px 20px",
//           borderRadius: "10px",
//           marginBottom: "20px",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//           gap: "15px",
//           alignItems: "end"
//         }}>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Control Number</label>
//             <input 
//               type="text" 
//               name="controlNumber" 
//               value={filter.controlNumber} 
//               onChange={handleFilterChange} 
//               placeholder="Search by control number"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Name</label>
//             <input 
//               type="text" 
//               name="customerName" 
//               value={filter.customerName} 
//               onChange={handleFilterChange} 
//               placeholder="Search by customer name"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Email</label>
//             <input 
//               type="text" 
//               name="customerEmail" 
//               value={filter.customerEmail} 
//               onChange={handleFilterChange} 
//               placeholder="Search by email"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Customer Phone</label>
//             <input 
//               type="text" 
//               name="customerPhone" 
//               value={filter.customerPhone} 
//               onChange={handleFilterChange} 
//               placeholder="Search by phone"
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
//             />
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Status</label>
//             <select
//               name="status"
//               value={filter.status}
//               onChange={handleFilterChange}
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
//             >
//               <option value="ALL">All Status</option>
//               <option value="PENDING">Pending</option>
//               <option value="CONFIRMED">Confirmed</option>
//               <option value="PROCESSING">Processing</option>
//               <option value="SHIPPED">Shipped</option>
//               <option value="DELIVERED">Delivered</option>
//               <option value="COMPLETED">Completed</option>
//               <option value="CANCELLED">Cancelled</option>
//             </select>
//           </div>
//           <div>
//             <button 
//               onClick={clearFilters} 
//               style={{ 
//                 padding: "10px 15px", 
//                 backgroundColor: "#6c757d", 
//                 color: "white", 
//                 border: "none", 
//                 borderRadius: "6px", 
//                 cursor: "pointer", 
//                 width: "100%" 
//               }}
//             >
//               Clear Filters
//             </button>
//           </div>
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div style={{
//             backgroundColor: "#f8d7da",
//             color: "#721c24",
//             padding: "12px 15px",
//             borderRadius: "6px",
//             marginBottom: "15px",
//             border: "1px solid #f5c6cb"
//           }}>
//             <strong>Error:</strong> {error}
//             <button 
//               onClick={fetchOrders}
//               style={{
//                 marginLeft: "15px",
//                 padding: "5px 10px",
//                 backgroundColor: "#dc3545",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "4px",
//                 cursor: "pointer",
//                 fontSize: "12px"
//               }}
//             >
//               Retry
//             </button>
//           </div>
//         )}

//         {/* Orders Table */}
//         <div style={{ 
//           backgroundColor: "white", 
//           borderRadius: "10px", 
//           overflow: "hidden", 
//           boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//           height: "600px" 
//         }}>
//           <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//             <table style={{ 
//               width: "100%", 
//               borderCollapse: "collapse", 
//               minWidth: "1200px"
//             }}>
//               <thead style={{ 
//                 backgroundColor: "#f8f9fa", 
//                 position: "sticky", 
//                 top: 0, 
//                 zIndex: 10 
//               }}>
//                 <tr>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Order ID</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Control #</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Customer</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Product</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Qty</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Amount</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Status</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Payment</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Network</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Order Date</th>
//                   <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredOrders.length > 0 ? filteredOrders.map((order, index) => (
//                   <tr 
//                     key={order.orderId} 
//                     style={{ 
//                       backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", 
//                       borderBottom: "1px solid #eaeaea" 
//                     }}
//                   >
//                     <td style={{ padding: "8px", fontSize: "12px" }}>{order.orderId}</td>
//                     <td style={{ padding: "8px", fontSize: "12px", fontFamily: "monospace", fontWeight: "600" }}>
//                       {order.controlNumber || 'N/A'}
//                     </td>
//                     <td style={{ padding: "8px" }}>
//                       <div style={{ fontWeight: "600", fontSize: "12px" }}>{order.customerName || 'N/A'}</div>
//                       <div style={{ fontSize: "11px", color: "#6c757d" }}>{order.customerEmail || 'N/A'}</div>
//                       <div style={{ fontSize: "11px", color: "#6c757d" }}>{order.customerPhone || 'N/A'}</div>
//                     </td>
//                     <td style={{ padding: "8px", fontSize: "12px" }}>
//                       {order.product?.productName || 'Unknown Product'}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "600" }}>
//                       {order.quantity || '0'}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#28a745" }}>
//                       {formatCurrency(order.totalAmount)}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>
//                       {getStatusBadge(order.status)}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>
//                       {getPaymentStatusBadge(order.paymentStatus)}
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center", fontSize: "11px" }}>
//                       {getNetworkDisplayName(order.preferredNetwork)}
//                     </td>
//                     <td style={{ padding: "8px", fontSize: "11px", color: "#6c757d" }}>
//                       {formatDate(getOrderDate(order))}
//                     </td>
//                     <td style={{ padding: "8px" }}>
//                       <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
//                         <button 
//                           onClick={() => handleViewDetails(order)} 
//                           style={{ 
//                             padding: "4px 8px", 
//                             borderRadius: "4px", 
//                             backgroundColor: "#007bff", 
//                             color: "white", 
//                             border: "none", 
//                             cursor: "pointer",
//                             fontSize: "11px",
//                             whiteSpace: "nowrap"
//                           }}
//                         >
//                           View
//                         </button>
//                         {order.paymentStatus === 'PENDING' && (
//                           <button 
//                             onClick={() => handleSendReminder(order.controlNumber)} 
//                             style={{ 
//                               padding: "4px 8px", 
//                               borderRadius: "4px", 
//                               backgroundColor: "#ffc107", 
//                               color: "white", 
//                               border: "none", 
//                               cursor: "pointer",
//                               fontSize: "11px",
//                               whiteSpace: "nowrap"
//                             }}
//                           >
//                             Remind
//                           </button>
//                         )}
//                         {order.status === 'PENDING' && (
//                           <button 
//                             onClick={() => handleUpdateStatus(order.controlNumber, 'CONFIRMED')} 
//                             style={{ 
//                               padding: "4px 8px", 
//                               borderRadius: "4px", 
//                               backgroundColor: "#28a745", 
//                               color: "white", 
//                               border: "none", 
//                               cursor: "pointer",
//                               fontSize: "11px",
//                               whiteSpace: "nowrap"
//                             }}
//                           >
//                             Confirm
//                           </button>
//                         )}
//                         {order.status !== 'CANCELLED' && order.status !== 'COMPLETED' && (
//                           <button 
//                             onClick={() => handleUpdateStatus(order.controlNumber, 'CANCELLED')} 
//                             style={{ 
//                               padding: "4px 8px", 
//                               borderRadius: "4px", 
//                               backgroundColor: "#dc3545", 
//                               color: "white", 
//                               border: "none", 
//                               cursor: "pointer",
//                               fontSize: "11px",
//                               whiteSpace: "nowrap"
//                             }}
//                           >
//                             Cancel
//                           </button>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>No orders found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Order Details Modal */}
//         {isModalOpen && selectedOrder && (
//           <div style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0,0,0,0.6)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//             padding: "10px"
//           }}>
//             <div style={{
//               backgroundColor: "white",
//               borderRadius: "12px",
//               width: "500px",
//               maxWidth: "100%",
//               padding: "25px 20px",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
//               overflowY: "auto",
//               maxHeight: "90vh"
//             }}>
//               <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>Order Details</h2>
              
//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Control Number:</strong> 
//                 <div style={{ 
//                   padding: "8px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px",
//                   fontFamily: "monospace",
//                   fontWeight: "600"
//                 }}>
//                   {selectedOrder.controlNumber}
//                 </div>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
//                 <div>
//                   <strong>Order ID:</strong>
//                   <div style={{ padding: "4px 0" }}>{selectedOrder.orderId}</div>
//                 </div>
//                 <div>
//                   <strong>Status:</strong>
//                   <div style={{ padding: "4px 0" }}>{getStatusBadge(selectedOrder.status)}</div>
//                 </div>
//                 <div>
//                   <strong>Payment Status:</strong>
//                   <div style={{ padding: "4px 0" }}>{getPaymentStatusBadge(selectedOrder.paymentStatus)}</div>
//                 </div>
//                 <div>
//                   <strong>Order Type:</strong>
//                   <div style={{ padding: "4px 0" }}>{selectedOrder.orderType || 'STANDARD'}</div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Customer Information:</strong>
//                 <div style={{ 
//                   padding: "10px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px" 
//                 }}>
//                   <div><strong>Name:</strong> {selectedOrder.customerName}</div>
//                   <div><strong>Email:</strong> {selectedOrder.customerEmail}</div>
//                   <div><strong>Phone:</strong> {selectedOrder.customerPhone}</div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "15px" }}>
//                 <strong>Product Information:</strong>
//                 <div style={{ 
//                   padding: "10px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px" 
//                 }}>
//                   <div><strong>Product:</strong> {selectedOrder.product?.productName || 'Unknown Product'}</div>
//                   <div><strong>Quantity:</strong> {selectedOrder.quantity}</div>
//                   <div><strong>Unit Price:</strong> {formatCurrency(selectedOrder.product?.sellingPrice || selectedOrder.totalAmount / selectedOrder.quantity)}</div>
//                   <div><strong>Payment Network:</strong> {getNetworkDisplayName(selectedOrder.preferredNetwork)}</div>
//                 </div>
//               </div>

//               <div style={{ marginBottom: "20px" }}>
//                 <strong>Payment Summary:</strong>
//                 <div style={{ 
//                   padding: "10px", 
//                   backgroundColor: "#f8f9fa", 
//                   borderRadius: "4px", 
//                   marginTop: "5px" 
//                 }}>
//                   <div><strong>Total Amount:</strong> {formatCurrency(selectedOrder.totalAmount)}</div>
//                   <div><strong>Order Date:</strong> {formatDate(getOrderDate(selectedOrder))}</div>
//                 </div>
//               </div>

//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//                 <button
//                   onClick={handleCloseModal}
//                   style={{ 
//                     padding: "8px 16px", 
//                     borderRadius: "6px", 
//                     border: "1px solid #6c757d", 
//                     backgroundColor: "#6c757d", 
//                     color: "white", 
//                     cursor: "pointer" 
//                   }}
//                 >
//                   Close
//                 </button>
//                 {selectedOrder.paymentStatus === 'PENDING' && (
//                   <button
//                     onClick={() => {
//                       handleSendReminder(selectedOrder.controlNumber);
//                       handleCloseModal();
//                     }}
//                     style={{ 
//                       padding: "8px 16px", 
//                       borderRadius: "6px", 
//                       border: "none", 
//                       backgroundColor: "#ffc107", 
//                       color: "white", 
//                       cursor: "pointer" 
//                     }}
//                   >
//                     Send Reminder
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     </>
//   );
// };

// export default ViewOrder;


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