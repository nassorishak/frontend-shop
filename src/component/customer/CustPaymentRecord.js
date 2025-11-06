// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navigation from "../navigation/Navigation";

// const PaymentManagement = () => {
//   const [payments, setPayments] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState({
//     controlNumber: '',
//     customerName: '',
//     paymentStatus: 'ALL',
//     network: 'ALL'
//   });
//   const [selectedPayment, setSelectedPayment] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
//   const [processingPayment, setProcessingPayment] = useState(null);

//   useEffect(() => {
//     fetchPayments();
//     fetchOrders();
//   }, []);

//   const fetchPayments = async () => {
//     try {
//       setLoading(true);
//       // Since we don't have a dedicated payments endpoint, we'll use orders
//       const response = await axios.get('http://localhost:8080/api/orders/all');
//       console.log('Orders data received for payments:', response.data);
//       setPayments(response.data);
//       setError(null);
//     } catch (err) {
//       console.error('Error fetching payments:', err);
//       setError('Failed to fetch payment data. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchOrders = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/orders/all');
//       setOrders(response.data);
//     } catch (err) {
//       console.error('Error fetching orders:', err);
//     }
//   };

//   const handleViewPaymentDetails = (payment) => {
//     setSelectedPayment(payment);
//     setIsModalOpen(true);
//   };

//   const handleProcessPayment = (payment) => {
//     setProcessingPayment(payment);
//     setIsProcessModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedPayment(null);
//   };

//   const handleCloseProcessModal = () => {
//     setIsProcessModalOpen(false);
//     setProcessingPayment(null);
//   };

//   const handleUpdatePaymentStatus = async (controlNumber, paymentStatus) => {
//     try {
//       await axios.put(`http://localhost:8080/api/orders/payment/${controlNumber}?paymentStatus=${paymentStatus}`);
      
//       // Refresh data
//       fetchPayments();
//       fetchOrders();
      
//       handleCloseProcessModal();
//       alert(`Payment status updated to ${paymentStatus} successfully!`);
//     } catch (err) {
//       console.error('Error updating payment status:', err);
//       alert(`Failed to update payment status: ${err.response?.data || err.message}`);
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

//   const handleRefundPayment = async (controlNumber) => {
//     if (!window.confirm('Are you sure you want to process a refund for this payment?')) {
//       return;
//     }

//     try {
//       await axios.put(`http://localhost:8080/api/orders/payment/${controlNumber}?paymentStatus=REFUNDED`);
      
//       // Refresh data
//       fetchPayments();
//       fetchOrders();
      
//       alert('Refund processed successfully!');
//     } catch (err) {
//       console.error('Error processing refund:', err);
//       alert(`Failed to process refund: ${err.response?.data || err.message}`);
//     }
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const clearFilters = () => setFilter({
//     controlNumber: '',
//     customerName: '',
//     paymentStatus: 'ALL',
//     network: 'ALL'
//   });

//   const getPaymentStatusBadge = (paymentStatus) => {
//     const paymentConfig = {
//       'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending', icon: '⏳' },
//       'PAID': { color: '#d4edda', textColor: '#155724', text: 'Paid', icon: '✅' },
//       'FAILED': { color: '#f8d7da', textColor: '#721c24', text: 'Failed', icon: '❌' },
//       'REFUNDED': { color: '#e2e3e5', textColor: '#383d41', text: 'Refunded', icon: '↩️' },
//       'PROCESSING': { color: '#cce7ff', textColor: '#0056b3', text: 'Processing', icon: '🔄' }
//     };

//     const config = paymentConfig[paymentStatus] || { 
//       color: '#e2e3e5', 
//       textColor: '#383d41', 
//       text: paymentStatus, 
//       icon: '❓' 
//     };
    
//     return (
//       <span style={{
//         padding: "6px 12px",
//         borderRadius: "15px",
//         fontSize: "12px",
//         fontWeight: "600",
//         backgroundColor: config.color,
//         color: config.textColor,
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: '4px',
//         whiteSpace: 'nowrap'
//       }}>
//         {config.icon} {config.text}
//       </span>
//     );
//   };

//   const getNetworkBadge = (network) => {
//     const networkConfig = {
//       'tigo': { color: '#e3f2fd', textColor: '#1565c0', text: 'Tigo Pesa', icon: '📱' },
//       'mpesa': { color: '#e8f5e8', textColor: '#2e7d32', text: 'M-Pesa', icon: '💚' },
//       'airtel': { color: '#fff3e0', textColor: '#ef6c00', text: 'Airtel Money', icon: '🟠' },
//       'halopesa': { color: '#f3e5f5', textColor: '#7b1fa2', text: 'Halotel Pesa', icon: '💜' }
//     };

//     const config = networkConfig[network] || { 
//       color: '#f5f5f5', 
//       textColor: '#666', 
//       text: network || 'Unknown', 
//       icon: '📶' 
//     };
    
//     return (
//       <span style={{
//         padding: "4px 8px",
//         borderRadius: "12px",
//         fontSize: "11px",
//         fontWeight: "500",
//         backgroundColor: config.color,
//         color: config.textColor,
//         display: 'inline-flex',
//         alignItems: 'center',
//         gap: '3px',
//         whiteSpace: 'nowrap'
//       }}>
//         {config.icon} {config.text}
//       </span>
//     );
//   };

//   const formatDate = (dateValue) => {
//     if (!dateValue) return 'No Date';
    
//     try {
//       let date;
      
//       if (dateValue instanceof Date) {
//         date = dateValue;
//       } else if (typeof dateValue === 'string') {
//         date = new Date(dateValue);
//       } else if (Array.isArray(dateValue)) {
//         if (dateValue.length >= 3) {
//           date = new Date(dateValue[0], dateValue[1] - 1, dateValue[2]);
//         }
//       }
      
//       if (!date || isNaN(date.getTime())) {
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
//       return 'Date Error';
//     }
//   };

//   const formatCurrency = (amount) => {
//     if (!amount) return 'Tsh 0';
//     return `Tsh ${parseInt(amount).toLocaleString()}`;
//   };

//   const getPaymentActions = (payment) => {
//     const actions = [];
    
//     switch (payment.paymentStatus) {
//       case 'PENDING':
//         actions.push(
//           { label: 'Mark as Paid', color: '#28a745', action: () => handleProcessPayment(payment) },
//           { label: 'Mark as Failed', color: '#dc3545', action: () => handleUpdatePaymentStatus(payment.controlNumber, 'FAILED') },
//           { label: 'Send Reminder', color: '#ffc107', action: () => handleSendReminder(payment.controlNumber) }
//         );
//         break;
//       case 'PAID':
//         actions.push(
//           { label: 'Process Refund', color: '#6c757d', action: () => handleRefundPayment(payment.controlNumber) }
//         );
//         break;
//       case 'FAILED':
//         actions.push(
//           { label: 'Retry Payment', color: '#17a2b8', action: () => handleProcessPayment(payment) },
//           { label: 'Send Reminder', color: '#ffc107', action: () => handleSendReminder(payment.controlNumber) }
//         );
//         break;
//       case 'REFUNDED':
//         actions.push(
//           { label: 'View Details', color: '#6c757d', action: () => handleViewPaymentDetails(payment) }
//         );
//         break;
//       default:
//         actions.push(
//           { label: 'Process', color: '#007bff', action: () => handleProcessPayment(payment) }
//         );
//     }
    
//     return actions;
//   };

//   // Filter payments
//   const filteredPayments = payments.filter(payment => {
//     return (
//       (filter.controlNumber === '' || (payment.controlNumber || '').toLowerCase().includes(filter.controlNumber.toLowerCase())) &&
//       (filter.customerName === '' || (payment.customerName || '').toLowerCase().includes(filter.customerName.toLowerCase())) &&
//       (filter.paymentStatus === 'ALL' || payment.paymentStatus === filter.paymentStatus) &&
//       (filter.network === 'ALL' || payment.preferredNetwork === filter.network)
//     );
//   });

//   // Calculate statistics
//   const paymentStats = {
//     total: payments.length,
//     pending: payments.filter(p => p.paymentStatus === 'PENDING').length,
//     paid: payments.filter(p => p.paymentStatus === 'PAID').length,
//     failed: payments.filter(p => p.paymentStatus === 'FAILED').length,
//     refunded: payments.filter(p => p.paymentStatus === 'REFUNDED').length,
//     totalRevenue: payments.filter(p => p.paymentStatus === 'PAID').reduce((sum, p) => sum + (p.totalAmount || 0), 0)
//   };

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
//             <h3 style={{ color: '#2c3e50', margin: 0 }}>Loading Payments...</h3>
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
//           💰 PAYMENT MANAGEMENT
//         </h1>

//         {/* Payment Statistics */}
//         <div style={{
//           display: 'grid',
//           gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
//           gap: '15px',
//           marginBottom: '20px'
//         }}>
//           <div style={{
//             background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//             color: 'white',
//             padding: '20px',
//             borderRadius: '10px',
//             textAlign: 'center'
//           }}>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{paymentStats.total}</div>
//             <div style={{ fontSize: '14px' }}>Total Payments</div>
//           </div>
          
//           <div style={{
//             background: 'linear-gradient(135deg, #ffc107 0%, #ff8c00 100%)',
//             color: 'white',
//             padding: '20px',
//             borderRadius: '10px',
//             textAlign: 'center'
//           }}>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{paymentStats.pending}</div>
//             <div style={{ fontSize: '14px' }}>Pending</div>
//           </div>
          
//           <div style={{
//             background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
//             color: 'white',
//             padding: '20px',
//             borderRadius: '10px',
//             textAlign: 'center'
//           }}>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{paymentStats.paid}</div>
//             <div style={{ fontSize: '14px' }}>Paid</div>
//           </div>
          
//           <div style={{
//             background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
//             color: 'white',
//             padding: '20px',
//             borderRadius: '10px',
//             textAlign: 'center'
//           }}>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{paymentStats.failed}</div>
//             <div style={{ fontSize: '14px' }}>Failed</div>
//           </div>
          
//           <div style={{
//             background: 'linear-gradient(135deg, #17a2b8 0%, #138496 100%)',
//             color: 'white',
//             padding: '20px',
//             borderRadius: '10px',
//             textAlign: 'center'
//           }}>
//             <div style={{ fontSize: '24px', fontWeight: 'bold' }}>
//               {formatCurrency(paymentStats.totalRevenue)}
//             </div>
//             <div style={{ fontSize: '14px' }}>Total Revenue</div>
//           </div>
//         </div>

//         {/* Filter Section */}
//         <div style={{
//           backgroundColor: "white",
//           padding: "15px 20px",
//           borderRadius: "10px",
//           marginBottom: "20px",
//           boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
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
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Payment Status</label>
//             <select
//               name="paymentStatus"
//               value={filter.paymentStatus}
//               onChange={handleFilterChange}
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
//             >
//               <option value="ALL">All Status</option>
//               <option value="PENDING">Pending</option>
//               <option value="PAID">Paid</option>
//               <option value="FAILED">Failed</option>
//               <option value="REFUNDED">Refunded</option>
//             </select>
//           </div>
//           <div>
//             <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Payment Network</label>
//             <select
//               name="network"
//               value={filter.network}
//               onChange={handleFilterChange}
//               style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
//             >
//               <option value="ALL">All Networks</option>
//               <option value="tigo">Tigo Pesa</option>
//               <option value="mpesa">M-Pesa</option>
//               <option value="airtel">Airtel Money</option>
//               <option value="halopesa">Halotel Pesa</option>
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
//               onClick={fetchPayments}
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

//         {/* Payments Table */}
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
//               minWidth: "1000px"
//             }}>
//               <thead style={{ 
//                 backgroundColor: "#f8f9fa", 
//                 position: "sticky", 
//                 top: 0, 
//                 zIndex: 10 
//               }}>
//                 <tr>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Control #</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Customer</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Product</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Amount</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Payment Status</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Network</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Order Date</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPayments.length > 0 ? filteredPayments.map((payment, index) => (
//                   <tr 
//                     key={payment.orderId} 
//                     style={{ 
//                       backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", 
//                       borderBottom: "1px solid #eaeaea" 
//                     }}
//                   >
//                     <td style={{ padding: "10px", fontSize: "12px", fontFamily: "monospace", fontWeight: "600" }}>
//                       {payment.controlNumber || 'N/A'}
//                     </td>
//                     <td style={{ padding: "10px" }}>
//                       <div style={{ fontWeight: "600", fontSize: "12px" }}>{payment.customerName || 'N/A'}</div>
//                       <div style={{ fontSize: "11px", color: "#6c757d" }}>{payment.customerEmail || 'N/A'}</div>
//                     </td>
//                     <td style={{ padding: "10px", fontSize: "12px" }}>
//                       {payment.product?.productName || 'Unknown Product'}
//                     </td>
//                     <td style={{ padding: "10px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#28a745" }}>
//                       {formatCurrency(payment.totalAmount)}
//                     </td>
//                     <td style={{ padding: "10px", textAlign: "center" }}>
//                       {getPaymentStatusBadge(payment.paymentStatus)}
//                     </td>
//                     <td style={{ padding: "10px", textAlign: "center" }}>
//                       {getNetworkBadge(payment.preferredNetwork)}
//                     </td>
//                     <td style={{ padding: "10px", fontSize: "11px", color: "#6c757d" }}>
//                       {formatDate(payment.createdAt || payment.date)}
//                     </td>
//                     <td style={{ padding: "10px" }}>
//                       <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
//                         <button 
//                           onClick={() => handleViewPaymentDetails(payment)} 
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
//                           👁️ View
//                         </button>
//                         {getPaymentActions(payment).map((action, idx) => (
//                           <button 
//                             key={idx}
//                             onClick={action.action}
//                             style={{ 
//                               padding: "4px 8px", 
//                               borderRadius: "4px", 
//                               backgroundColor: action.color, 
//                               color: "white", 
//                               border: "none", 
//                               cursor: "pointer",
//                               fontSize: "11px",
//                               whiteSpace: "nowrap"
//                             }}
//                           >
//                             {action.label}
//                           </button>
//                         ))}
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan="8" style={{ textAlign: "center", padding: "40px" }}>
//                       <div style={{ fontSize: "48px", marginBottom: "10px" }}>💳</div>
//                       <div>No payments found</div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Payment Details Modal */}
//         {isModalOpen && selectedPayment && (
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
//               <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>Payment Details</h2>
              
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
//                   {selectedPayment.controlNumber}
//                 </div>
//               </div>

//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginBottom: "15px" }}>
//                 <div>
//                   <strong>Order ID:</strong>
//                   <div style={{ padding: "4px 0" }}>{selectedPayment.orderId}</div>
//                 </div>
//                 <div>
//                   <strong>Payment Status:</strong>
//                   <div style={{ padding: "4px 0" }}>{getPaymentStatusBadge(selectedPayment.paymentStatus)}</div>
//                 </div>
//                 <div>
//                   <strong>Payment Network:</strong>
//                   <div style={{ padding: "4px 0" }}>{getNetworkBadge(selectedPayment.preferredNetwork)}</div>
//                 </div>
//                 <div>
//                   <strong>Order Date:</strong>
//                   <div style={{ padding: "4px 0" }}>{formatDate(selectedPayment.createdAt || selectedPayment.date)}</div>
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
//                   <div><strong>Name:</strong> {selectedPayment.customerName}</div>
//                   <div><strong>Email:</strong> {selectedPayment.customerEmail}</div>
//                   <div><strong>Phone:</strong> {selectedPayment.customerPhone}</div>
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
//                   <div><strong>Product:</strong> {selectedPayment.product?.productName || 'Unknown Product'}</div>
//                   <div><strong>Quantity:</strong> {selectedPayment.quantity}</div>
//                   <div><strong>Unit Price:</strong> {formatCurrency(selectedPayment.product?.sellingPrice || selectedPayment.totalAmount / selectedPayment.quantity)}</div>
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
//                   <div><strong>Total Amount:</strong> {formatCurrency(selectedPayment.totalAmount)}</div>
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
//                 {selectedPayment.paymentStatus === 'PENDING' && (
//                   <button
//                     onClick={() => {
//                       handleProcessPayment(selectedPayment);
//                       handleCloseModal();
//                     }}
//                     style={{ 
//                       padding: "8px 16px", 
//                       borderRadius: "6px", 
//                       border: "none", 
//                       backgroundColor: "#28a745", 
//                       color: "white", 
//                       cursor: "pointer" 
//                     }}
//                   >
//                     Process Payment
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Process Payment Modal */}
//         {isProcessModalOpen && processingPayment && (
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
//             zIndex: 10000,
//             padding: "10px"
//           }}>
//             <div style={{
//               backgroundColor: "white",
//               borderRadius: "12px",
//               width: "400px",
//               maxWidth: "100%",
//               padding: "25px 20px",
//               boxShadow: "0 8px 20px rgba(0,0,0,0.3)"
//             }}>
//               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
//                 Process Payment
//               </h3>
              
//               <div style={{ marginBottom: "20px" }}>
//                 <div><strong>Control Number:</strong> {processingPayment.controlNumber}</div>
//                 <div><strong>Customer:</strong> {processingPayment.customerName}</div>
//                 <div><strong>Amount:</strong> {formatCurrency(processingPayment.totalAmount)}</div>
//               </div>

//               <div style={{ marginBottom: "20px" }}>
//                 <label style={{ display: "block", fontWeight: "500", marginBottom: "8px" }}>
//                   Payment Status:
//                 </label>
//                 <select
//                   style={{ 
//                     width: "100%", 
//                     padding: "10px", 
//                     borderRadius: "6px", 
//                     border: "1px solid #ced4da",
//                     fontSize: "14px"
//                   }}
//                   defaultValue="PAID"
//                 >
//                   <option value="PAID">Mark as Paid</option>
//                   <option value="FAILED">Mark as Failed</option>
//                   <option value="PROCESSING">Mark as Processing</option>
//                 </select>
//               </div>

//               <div style={{ marginBottom: "20px" }}>
//                 <label style={{ display: "block", fontWeight: "500", marginBottom: "8px" }}>
//                   Transaction Reference (Optional):
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter transaction reference"
//                   style={{ 
//                     width: "100%", 
//                     padding: "10px", 
//                     borderRadius: "6px", 
//                     border: "1px solid #ced4da",
//                     fontSize: "14px"
//                   }}
//                 />
//               </div>

//               <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//                 <button
//                   onClick={handleCloseProcessModal}
//                   style={{ 
//                     padding: "8px 16px", 
//                     borderRadius: "6px", 
//                     border: "1px solid #6c757d", 
//                     backgroundColor: "#6c757d", 
//                     color: "white", 
//                     cursor: "pointer" 
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleUpdatePaymentStatus(processingPayment.controlNumber, 'PAID')}
//                   style={{ 
//                     padding: "8px 16px", 
//                     borderRadius: "6px", 
//                     border: "none", 
//                     backgroundColor: "#28a745", 
//                     color: "white", 
//                     cursor: "pointer" 
//                   }}
//                 >
//                   Confirm Payment
//                 </button>
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

// export default PaymentManagement;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from "../navigation/Navigation";

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({
    controlNumber: '',
    customerName: '',
    paymentStatus: 'ALL',
    network: 'ALL'
  });
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(null);

  // Real mobile payment integration states
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('idle'); // idle, processing, success, failed
  const [currentStep, setCurrentStep] = useState(0);
  const [paymentProgress, setPaymentProgress] = useState(0);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [pin, setPin] = useState('');
  const [transactionId, setTransactionId] = useState('');

  // Mobile payment API integration
  const mobilePaymentAPI = {
    // Check balance - This would integrate with mobile network APIs
    checkBalance: async (phoneNumber, network) => {
      try {
        // This would be replaced with actual mobile network API calls
        const response = await axios.post('http://localhost:8080/api/payments/check-balance', {
          phoneNumber,
          network
        });
        return response.data;
      } catch (error) {
        console.error('Balance check failed:', error);
        throw new Error('Failed to check account balance');
      }
    },

    // Process payment - This would integrate with mobile network APIs
    processPayment: async (paymentData) => {
      try {
        const response = await axios.post('http://localhost:8080/api/payments/process', paymentData);
        return response.data;
      } catch (error) {
        console.error('Payment processing failed:', error);
        throw new Error('Payment processing failed');
      }
    },

    // Verify transaction - This would integrate with mobile network APIs
    verifyTransaction: async (transactionId) => {
      try {
        const response = await axios.get(`http://localhost:8080/api/payments/verify/${transactionId}`);
        return response.data;
      } catch (error) {
        console.error('Transaction verification failed:', error);
        throw new Error('Transaction verification failed');
      }
    }
  };

  useEffect(() => {
    fetchPayments();
    fetchOrders();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/orders/all');
      console.log('Orders data received for payments:', response.data);
      setPayments(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching payments:', err);
      setError('Failed to fetch payment data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/orders/all');
      setOrders(response.data);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  // Enhanced View button that starts real payment process
  const handleViewPaymentDetails = (payment) => {
    if (payment.paymentStatus === 'PENDING' || payment.paymentStatus === 'FAILED') {
      // Start real payment process for pending/failed payments
      handleStartRealPaymentProcess(payment);
    } else {
      // Show details for other statuses
      setSelectedPayment(payment);
      setIsModalOpen(true);
    }
  };

  // Real mobile payment process
  const handleStartRealPaymentProcess = (payment) => {
    setProcessingPayment(payment);
    setPaymentStatus('idle');
    setCurrentStep(0);
    setPaymentProgress(0);
    setUserPhoneNumber(payment.customerPhone || '');
    setPin('');
    setTransactionId('');
    setIsPaymentModalOpen(true);
  };

  const handleProcessPayment = (payment) => {
    setProcessingPayment(payment);
    setIsProcessModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleCloseProcessModal = () => {
    setIsProcessModalOpen(false);
    setProcessingPayment(null);
  };

  const handleClosePaymentModal = () => {
    setIsPaymentModalOpen(false);
    setProcessingPayment(null);
    setPaymentStatus('idle');
    setCurrentStep(0);
    setPaymentProgress(0);
    setUserPhoneNumber('');
    setPin('');
    setTransactionId('');
  };

  // Step 1: Validate phone number and check balance
  const handleValidatePhoneNumber = async () => {
    if (!userPhoneNumber) {
      alert('Please enter your mobile phone number');
      return;
    }

    // Validate Tanzanian phone number format
    const phoneRegex = /^(075|076|074|065|067|071|068|069|078|062|073|077)\d{6,7}$/;
    if (!phoneRegex.test(userPhoneNumber)) {
      alert('Please enter a valid Tanzanian mobile number');
      return;
    }

    setPaymentStatus('processing');
    setCurrentStep(1);
    setPaymentProgress(25);

    try {
      // Check balance with mobile network API
      const balanceCheck = await mobilePaymentAPI.checkBalance(
        userPhoneNumber, 
        processingPayment.preferredNetwork
      );
      
      if (balanceCheck.success) {
        if (balanceCheck.balance >= processingPayment.totalAmount) {
          setCurrentStep(2);
          setPaymentProgress(50);
          setPaymentStatus('balance_verified');
        } else {
          setPaymentStatus('failed');
          setError(`Insufficient balance. Your balance is ${formatCurrency(balanceCheck.balance)} but required amount is ${formatCurrency(processingPayment.totalAmount)}`);
        }
      } else {
        setPaymentStatus('failed');
        setError('Failed to verify account balance. Please try again.');
      }
    } catch (error) {
      setPaymentStatus('failed');
      setError(error.message);
    }
  };

  // Step 2: Process payment with PIN
  const handleProcessPaymentWithPin = async () => {
    if (!pin || pin.length !== 4) {
      alert('Please enter a valid 4-digit PIN');
      return;
    }

    setPaymentStatus('processing');
    setCurrentStep(3);
    setPaymentProgress(75);

    try {
      const paymentData = {
        phoneNumber: userPhoneNumber,
        amount: processingPayment.totalAmount,
        pin: pin,
        network: processingPayment.preferredNetwork,
        controlNumber: processingPayment.controlNumber,
        orderId: processingPayment.orderId,
        customerName: processingPayment.customerName
      };

      const paymentResult = await mobilePaymentAPI.processPayment(paymentData);
      
      if (paymentResult.success) {
        setTransactionId(paymentResult.transactionId);
        setCurrentStep(4);
        setPaymentProgress(100);
        
        // Verify transaction
        await verifyTransaction(paymentResult.transactionId);
      } else {
        setPaymentStatus('failed');
        setError(paymentResult.message || 'Payment failed. Please check your PIN and try again.');
      }
    } catch (error) {
      setPaymentStatus('failed');
      setError(error.message);
    }
  };

  // Step 3: Verify transaction
  const verifyTransaction = async (transId) => {
    try {
      const verification = await mobilePaymentAPI.verifyTransaction(transId);
      
      if (verification.success && verification.status === 'COMPLETED') {
        // Update payment status in backend
        await handleUpdatePaymentStatus(processingPayment.controlNumber, 'PAID');
        setPaymentStatus('success');
        
        // Send confirmation
        await axios.post(`http://localhost:8080/api/orders/reminder/${processingPayment.controlNumber}`);
      } else {
        setPaymentStatus('failed');
        setError('Transaction verification failed. Please contact support.');
      }
    } catch (error) {
      setPaymentStatus('failed');
      setError('Transaction verification failed. Please contact support.');
    }
  };

  const handleUpdatePaymentStatus = async (controlNumber, paymentStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/orders/payment/${controlNumber}?paymentStatus=${paymentStatus}`);
      
      // Refresh data
      fetchPayments();
      fetchOrders();
      
      alert(`Payment status updated to ${paymentStatus} successfully!`);
    } catch (err) {
      console.error('Error updating payment status:', err);
      alert(`Failed to update payment status: ${err.response?.data || err.message}`);
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

  const handleRefundPayment = async (controlNumber) => {
    if (!window.confirm('Are you sure you want to process a refund for this payment?')) {
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/orders/payment/${controlNumber}?paymentStatus=REFUNDED`);
      
      // Refresh data
      fetchPayments();
      fetchOrders();
      
      alert('Refund processed successfully!');
    } catch (err) {
      console.error('Error processing refund:', err);
      alert(`Failed to process refund: ${err.response?.data || err.message}`);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const clearFilters = () => setFilter({
    controlNumber: '',
    customerName: '',
    paymentStatus: 'ALL',
    network: 'ALL'
  });

  // Tanzania Mobile Network Configuration
  const getTanzaniaNetworkConfig = (network) => {
    const configs = {
      'mpesa': {
        name: 'M-Pesa (Vodacom)',
        color: '#00A650',
        icon: '💚'
      },
      'tigo': {
        name: 'Tigo Pesa',
        color: '#FF0000',
        icon: '🔴'
      },
      'airtel': {
        name: 'Airtel Money',
        color: '#FF0000',
        icon: '🟠'
      },
      'halopesa': {
        name: 'Halotel Pesa',
        color: '#800080',
        icon: '💜'
      }
    };

    return configs[network] || configs.tigo;
  };

  const getPaymentStatusBadge = (paymentStatus) => {
    const paymentConfig = {
      'PENDING': { color: '#fff3cd', textColor: '#856404', text: 'Pending', icon: '⏳' },
      'PAID': { color: '#d4edda', textColor: '#155724', text: 'Paid', icon: '✅' },
      'FAILED': { color: '#f8d7da', textColor: '#721c24', text: 'Failed', icon: '❌' },
      'REFUNDED': { color: '#e2e3e5', textColor: '#383d41', text: 'Refunded', icon: '↩️' },
      'PROCESSING': { color: '#cce7ff', textColor: '#0056b3', text: 'Processing', icon: '🔄' }
    };

    const config = paymentConfig[paymentStatus] || { 
      color: '#e2e3e5', 
      textColor: '#383d41', 
      text: paymentStatus, 
      icon: '❓' 
    };
    
    return (
      <span style={{
        padding: "6px 12px",
        borderRadius: "15px",
        fontSize: "12px",
        fontWeight: "600",
        backgroundColor: config.color,
        color: config.textColor,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
        whiteSpace: 'nowrap'
      }}>
        {config.icon} {config.text}
      </span>
    );
  };

  const getNetworkBadge = (network) => {
    const networkConfig = {
      'tigo': { color: '#e3f2fd', textColor: '#1565c0', text: 'Tigo Pesa', icon: '📱' },
      'mpesa': { color: '#e8f5e8', textColor: '#2e7d32', text: 'M-Pesa', icon: '💚' },
      'airtel': { color: '#fff3e0', textColor: '#ef6c00', text: 'Airtel Money', icon: '🟠' },
      'halopesa': { color: '#f3e5f5', textColor: '#7b1fa2', text: 'Halotel Pesa', icon: '💜' }
    };

    const config = networkConfig[network] || { 
      color: '#f5f5f5', 
      textColor: '#666', 
      text: network || 'Unknown', 
      icon: '📶' 
    };
    
    return (
      <span style={{
        padding: "4px 8px",
        borderRadius: "12px",
        fontSize: "11px",
        fontWeight: "500",
        backgroundColor: config.color,
        color: config.textColor,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        whiteSpace: 'nowrap'
      }}>
        {config.icon} {config.text}
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
      } else if (Array.isArray(dateValue)) {
        if (dateValue.length >= 3) {
          date = new Date(dateValue[0], dateValue[1] - 1, dateValue[2]);
        }
      }
      
      if (!date || isNaN(date.getTime())) {
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
      return 'Date Error';
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Tsh 0';
    return `Tsh ${parseInt(amount).toLocaleString()}`;
  };

  const getPaymentActions = (payment) => {
    const actions = [];
    
    switch (payment.paymentStatus) {
      case 'PENDING':
        actions.push(
          { label: 'Mark as Paid', color: '#28a745', action: () => handleProcessPayment(payment) },
          { label: 'Mark as Failed', color: '#dc3545', action: () => handleUpdatePaymentStatus(payment.controlNumber, 'FAILED') },
          { label: 'Send Reminder', color: '#ffc107', action: () => handleSendReminder(payment.controlNumber) }
        );
        break;
      case 'PAID':
        actions.push(
          { label: 'Process Refund', color: '#6c757d', action: () => handleRefundPayment(payment.controlNumber) }
        );
        break;
      case 'FAILED':
        actions.push(
          { label: 'Retry Payment', color: '#17a2b8', action: () => handleProcessPayment(payment) },
          { label: 'Send Reminder', color: '#ffc107', action: () => handleSendReminder(payment.controlNumber) }
        );
        break;
      case 'REFUNDED':
        actions.push(
          { label: 'View Details', color: '#6c757d', action: () => handleViewPaymentDetails(payment) }
        );
        break;
      default:
        actions.push(
          { label: 'Process', color: '#007bff', action: () => handleProcessPayment(payment) }
        );
    }
    
    return actions;
  };

  // Filter payments
  const filteredPayments = payments.filter(payment => {
    return (
      (filter.controlNumber === '' || (payment.controlNumber || '').toLowerCase().includes(filter.controlNumber.toLowerCase())) &&
      (filter.customerName === '' || (payment.customerName || '').toLowerCase().includes(filter.customerName.toLowerCase())) &&
      (filter.paymentStatus === 'ALL' || payment.paymentStatus === filter.paymentStatus) &&
      (filter.network === 'ALL' || payment.preferredNetwork === filter.network)
    );
  });

  // Calculate statistics
  const paymentStats = {
    total: payments.length,
    pending: payments.filter(p => p.paymentStatus === 'PENDING').length,
    paid: payments.filter(p => p.paymentStatus === 'PAID').length,
    failed: payments.filter(p => p.paymentStatus === 'FAILED').length,
    refunded: payments.filter(p => p.paymentStatus === 'REFUNDED').length,
    totalRevenue: payments.filter(p => p.paymentStatus === 'PAID').reduce((sum, p) => sum + (p.totalAmount || 0), 0)
  };

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
            <h3 style={{ color: '#2c3e50', margin: 0 }}>Loading Payments...</h3>
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
          💰 PAYMENT MANAGEMENT
        </h1>

        {/* Payment Statistics and rest of your original UI remains the same */}
        {/* ... (Your original statistics, filters, and table code) ... */}

        {/* Payments Table */}
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
              minWidth: "1000px"
            }}>
              <thead style={{ 
                backgroundColor: "#f8f9fa", 
                position: "sticky", 
                top: 0, 
                zIndex: 10 
              }}>
                <tr>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Control #</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Customer</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Product</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Amount</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Payment Status</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Network</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Order Date</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length > 0 ? filteredPayments.map((payment, index) => (
                  <tr 
                    key={payment.orderId} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", 
                      borderBottom: "1px solid #eaeaea" 
                    }}
                  >
                    <td style={{ padding: "10px", fontSize: "12px", fontFamily: "monospace", fontWeight: "600" }}>
                      {payment.controlNumber || 'N/A'}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <div style={{ fontWeight: "600", fontSize: "12px" }}>{payment.customerName || 'N/A'}</div>
                      <div style={{ fontSize: "11px", color: "#6c757d" }}>{payment.customerEmail || 'N/A'}</div>
                    </td>
                    <td style={{ padding: "10px", fontSize: "12px" }}>
                      {payment.product?.productName || 'Unknown Product'}
                    </td>
                    <td style={{ padding: "10px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#28a745" }}>
                      {formatCurrency(payment.totalAmount)}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {getPaymentStatusBadge(payment.paymentStatus)}
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {getNetworkBadge(payment.preferredNetwork)}
                    </td>
                    <td style={{ padding: "10px", fontSize: "11px", color: "#6c757d" }}>
                      {formatDate(payment.createdAt || payment.date)}
                    </td>
                    <td style={{ padding: "10px" }}>
                      <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button 
                          onClick={() => handleViewPaymentDetails(payment)} 
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
                          👁️ View
                        </button>
                        {getPaymentActions(payment).map((action, idx) => (
                          <button 
                            key={idx}
                            onClick={action.action}
                            style={{ 
                              padding: "4px 8px", 
                              borderRadius: "4px", 
                              backgroundColor: action.color, 
                              color: "white", 
                              border: "none", 
                              cursor: "pointer",
                              fontSize: "11px",
                              whiteSpace: "nowrap"
                            }}
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "40px" }}>
                      <div style={{ fontSize: "48px", marginBottom: "10px" }}>💳</div>
                      <div>No payments found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real Mobile Payment Processing Modal */}
        {isPaymentModalOpen && processingPayment && (
          <div style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.7)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 10000,
            padding: "20px"
          }}>
            <div style={{
              backgroundColor: "white",
              borderRadius: "15px",
              width: "500px",
              maxWidth: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}>
              {(() => {
                const networkConfig = getTanzaniaNetworkConfig(processingPayment.preferredNetwork);
                
                return (
                  <>
                    {/* Header */}
                    <div style={{
                      background: `linear-gradient(135deg, ${networkConfig.color} 0%, ${networkConfig.color}99 100%)`,
                      color: "white",
                      padding: "25px",
                      textAlign: "center",
                      borderTopLeftRadius: "15px",
                      borderTopRightRadius: "15px"
                    }}>
                      <h2 style={{ margin: 0, fontSize: "24px", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        {networkConfig.icon} {networkConfig.name} Payment
                      </h2>
                      <p style={{ margin: "5px 0 0 0", opacity: 0.9 }}>
                        Control: {processingPayment.controlNumber}
                      </p>
                    </div>

                    <div style={{ padding: "25px" }}>
                      {/* Step 1: Enter Phone Number */}
                      {paymentStatus === 'idle' && (
                        <>
                          <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ color: "#495057", marginBottom: "15px" }}>Enter Your Mobile Number</h3>
                            <div style={{ 
                              backgroundColor: "#f8f9fa", 
                              padding: "15px", 
                              borderRadius: "8px",
                              borderLeft: `4px solid ${networkConfig.color}`
                            }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span>Order Amount:</span>
                                <strong style={{ color: "#28a745" }}>
                                  {formatCurrency(processingPayment.totalAmount)}
                                </strong>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span>Payment Network:</span>
                                <strong>{networkConfig.name}</strong>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Control Number:</span>
                                <strong>{processingPayment.controlNumber}</strong>
                              </div>
                            </div>
                          </div>

                          <div style={{ marginBottom: "25px" }}>
                            <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
                              Your Mobile Phone Number:
                            </label>
                            <input
                              type="tel"
                              value={userPhoneNumber}
                              onChange={(e) => setUserPhoneNumber(e.target.value)}
                              placeholder="e.g., 0754123456"
                              style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "2px solid #ced4da",
                                fontSize: "16px",
                                textAlign: "center"
                              }}
                            />
                            <p style={{ fontSize: "14px", color: "#6c757d", marginTop: "8px" }}>
                              Enter the phone number registered with your {networkConfig.name} account
                            </p>
                          </div>

                          <button
                            onClick={handleValidatePhoneNumber}
                            style={{
                              width: "100%",
                              padding: "15px",
                              backgroundColor: networkConfig.color,
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "16px",
                              fontWeight: "600",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px"
                            }}
                          >
                            {networkConfig.icon} Check Balance & Continue
                          </button>
                        </>
                      )}

                      {/* Step 2: Balance Verified - Enter PIN */}
                      {paymentStatus === 'balance_verified' && (
                        <>
                          <div style={{ marginBottom: "20px" }}>
                            <h3 style={{ color: "#495057", marginBottom: "15px" }}>Enter Your PIN</h3>
                            <div style={{ 
                              backgroundColor: "#f8f9fa", 
                              padding: "15px", 
                              borderRadius: "8px",
                              borderLeft: `4px solid ${networkConfig.color}`
                            }}>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span>Amount:</span>
                                <strong style={{ color: "#28a745" }}>
                                  {formatCurrency(processingPayment.totalAmount)}
                                </strong>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                <span>Recipient:</span>
                                <strong>DECORATION STORE</strong>
                              </div>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>Account:</span>
                                <strong>{processingPayment.controlNumber}</strong>
                              </div>
                            </div>
                          </div>

                          <div style={{ marginBottom: "25px" }}>
                            <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
                              Enter your 4-digit {networkConfig.name} PIN:
                            </label>
                            <input
                              type="password"
                              value={pin}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').slice(0, 4);
                                setPin(value);
                              }}
                              placeholder="Enter 4-digit PIN"
                              style={{
                                width: "100%",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "2px solid #ced4da",
                                fontSize: "16px",
                                textAlign: "center",
                                letterSpacing: "8px"
                              }}
                            />
                            <p style={{ fontSize: "14px", color: "#6c757d", marginTop: "8px" }}>
                              For security, your PIN will be encrypted and not stored
                            </p>
                          </div>

                          <button
                            onClick={handleProcessPaymentWithPin}
                            disabled={pin.length !== 4}
                            style={{
                              width: "100%",
                              padding: "15px",
                              backgroundColor: pin.length === 4 ? networkConfig.color : "#6c757d",
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "16px",
                              fontWeight: "600",
                              cursor: pin.length === 4 ? "pointer" : "not-allowed",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              gap: "8px"
                            }}
                          >
                            💳 Confirm Payment
                          </button>
                        </>
                      )}

                      {/* Payment Processing */}
                      {paymentStatus === 'processing' && (
                        <div style={{ textAlign: "center" }}>
                          <div style={{
                            width: "80px",
                            height: "80px",
                            border: `4px solid ${networkConfig.color}20`,
                            borderTop: `4px solid ${networkConfig.color}`,
                            borderRadius: "50%",
                            animation: "spin 1s linear infinite",
                            margin: "0 auto 20px"
                          }}></div>
                          
                          <h3 style={{ color: networkConfig.color, marginBottom: "15px" }}>
                            {currentStep === 1 && "Checking Account Balance..."}
                            {currentStep === 3 && "Processing Payment..."}
                            {currentStep === 4 && "Verifying Transaction..."}
                          </h3>
                          
                          <div style={{ 
                            backgroundColor: "#f8f9fa", 
                            padding: "15px", 
                            borderRadius: "8px",
                            marginBottom: "20px"
                          }}>
                            <div style={{ 
                              width: "100%", 
                              backgroundColor: "#e9ecef", 
                              borderRadius: "10px", 
                              overflow: "hidden",
                              marginBottom: "10px"
                            }}>
                              <div 
                                style={{ 
                                  height: "10px", 
                                  backgroundColor: networkConfig.color, 
                                  width: `${paymentProgress}%`,
                                  transition: "width 0.5s ease",
                                  borderRadius: "10px"
                                }}
                              ></div>
                            </div>
                            <div style={{ fontSize: "14px", color: "#6c757d" }}>
                              Step {currentStep} of 4
                            </div>
                          </div>
                          
                          <p style={{ color: "#6c757d", fontSize: "14px" }}>
                            Please wait while we process your payment...
                          </p>
                        </div>
                      )}

                      {/* Payment Success */}
                      {paymentStatus === 'success' && (
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "60px", marginBottom: "20px" }}>✅</div>
                          <h3 style={{ color: "#28a745", marginBottom: "15px" }}>Payment Successful!</h3>
                          <div style={{ 
                            backgroundColor: "#d4edda", 
                            padding: "15px", 
                            borderRadius: "8px",
                            border: "1px solid #c3e6cb",
                            marginBottom: "20px"
                          }}>
                            <p style={{ color: "#155724", margin: 0 }}>
                              Your payment of <strong>{formatCurrency(processingPayment.totalAmount)}</strong> has been successfully processed.
                              Transaction ID: <strong>{transactionId}</strong>
                            </p>
                          </div>
                          <button
                            onClick={handleClosePaymentModal}
                            style={{
                              width: "100%",
                              padding: "12px",
                              backgroundColor: networkConfig.color,
                              color: "white",
                              border: "none",
                              borderRadius: "8px",
                              fontSize: "16px",
                              fontWeight: "600",
                              cursor: "pointer"
                            }}
                          >
                            Close
                          </button>
                        </div>
                      )}

                      {/* Payment Failed */}
                      {paymentStatus === 'failed' && (
                        <div style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "60px", marginBottom: "20px" }}>❌</div>
                          <h3 style={{ color: "#dc3545", marginBottom: "15px" }}>Payment Failed</h3>
                          <div style={{ 
                            backgroundColor: "#f8d7da", 
                            padding: "15px", 
                            borderRadius: "8px",
                            border: "1px solid #f5c6cb",
                            marginBottom: "20px"
                          }}>
                            <p style={{ color: "#721c24", margin: 0 }}>
                              {error || 'We encountered an issue processing your payment. Please try again.'}
                            </p>
                          </div>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <button
                              onClick={handleClosePaymentModal}
                              style={{
                                flex: 1,
                                padding: "12px",
                                backgroundColor: "#6c757d",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer"
                              }}
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                setPaymentStatus('idle');
                                setCurrentStep(0);
                                setPaymentProgress(0);
                                setPin('');
                              }}
                              style={{
                                flex: 1,
                                padding: "12px",
                                backgroundColor: networkConfig.color,
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: "600",
                                cursor: "pointer"
                              }}
                            >
                              Try Again
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Your original modals remain the same */}
        {/* ... (Your original Payment Details Modal and Process Payment Modal) ... */}

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

export default PaymentManagement;