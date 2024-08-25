// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Navigation from '../navigation/Navigation';

// // const ViewOrder = () => {
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [isModalOpen, setIsModalOpen] = useState(false);
// //   const [selectedOrder, setSelectedOrder] = useState(null);
// //   const [date, setDate] = useState('');
// //   const [status, setStatus] = useState('');
// //   const [quantity, setQuantity] = useState('');
// //   const [size, setSize] = useState('');

// //   useEffect(() => {
// //     const fetchOrders = async () => {
// //       try {
// //         const userId = localStorage.getItem('customerId');
// //         if (userId) {
// //           const response = await axios.get(`http://localhost:8080/api/orders/customer/${userId}`);
// //           setOrders(response.data);
// //         } else {
// //           setError('User ID not found in local storage.');
// //         }
// //       } catch (err) {
// //         setError('An error occurred while fetching orders: ' + err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchOrders();
// //   }, []);

// //   const handleDelete = async (orderId) => {
// //     const confirmDelete = window.confirm("Are you sure you want to delete this order?");
// //     if (confirmDelete) {
// //       try {
// //         await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
// //         setOrders(orders.filter(order => order.orderId !== orderId));
// //         alert('Order deleted successfully.');
// //       } catch (err) {
// //         alert('Failed to delete order: ' + err.message);
// //       }
// //     }
// //   };

// //   const handleCancel = async (orderId) => {
// //     try {
// //       const response = await axios.patch(`http://localhost:8080/api/orders/cancel/${orderId}`);
// //       setOrders(orders.map(order => 
// //         order.orderId === orderId ? { ...order, status: 'canceled' } : order
// //       ));
// //       alert(response.data);
// //     } catch (err) {
// //       alert('Failed to cancel order: ' + err.message);
// //     }
// //   };

// //   const handleModalClose = () => {
// //     setIsModalOpen(false);
// //     setSelectedOrder(null);
// //   };

// //   if (loading) return <p>Loading...</p>;
// //   if (error) return <p>{error}</p>;

// //   return (
// //     <>
// //       <Navigation />
// //       <div className='main' style={{ padding: '20px' }}>
// //         <h1 style={{ marginTop: "20px", textAlign: 'center' }}>Customer View Orders</h1>
// //         <table className='orders-table' style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
// //           <thead>
// //             <tr style={{ backgroundColor: '#f2f2f2' }}>
// //               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Order ID</th>
// //               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
// //               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
// //               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
// //               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Size</th>
// //               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
// //               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {orders.map((order) => (
// //               <tr key={order.orderId}>
// //                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.orderId}</td>
// //                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(order.date).toLocaleDateString()}</td>
// //                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.status}</td>
// //                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.quantity}</td>
// //                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.size}</td>
// //                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.customer ? order.customer.email : 'N/A'}</td>
// //                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>
// //                   <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
// //                     <button 
// //                       style={{ background: "red", color: 'white', padding: '5px 10px', borderRadius: "5px", border: 'none', cursor: 'pointer' }} 
// //                       onClick={() => handleDelete(order.orderId)}
// //                     >
// //                       Delete
// //                     </button>
// //                     <button 
// //                       style={{ background: "brown", color: 'white', padding: '5px 10px', borderRadius: "5px", border: 'none', cursor: 'pointer' }} 
// //                       onClick={() => handleCancel(order.orderId)}
// //                     >
// //                       Cancel
// //                     </button>
// //                   </div>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>

// //         {isModalOpen && (
// //           <div className="modal" style={{
// //             position: 'fixed',
// //             top: 0,
// //             left: 0,
// //             width: '100%',
// //             height: '100%',
// //             backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //             display: 'flex',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             zIndex: 1000,
// //           }}>
// //             <div className="modal-content" style={{
// //               backgroundColor: 'white',
// //               padding: '20px',
// //               borderRadius: '8px',
// //               boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
// //               width: '400px',
// //               maxWidth: '90%',
// //             }}>
// //               <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Order Details</h2>
// //               <div style={{ marginBottom: '10px' }}>
// //                 <strong>Date:</strong> {date}
// //               </div>
// //               <div style={{ marginBottom: '10px' }}>
// //                 <strong>Status:</strong> {status}
// //               </div>
// //               <div style={{ marginBottom: '10px' }}>
// //                 <strong>Quantity:</strong> {quantity}
// //               </div>
// //               <div style={{ marginBottom: '10px' }}>
// //                 <strong>Size:</strong> {size}
// //               </div>
// //               <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
// //                 <button 
// //                   type="button" 
// //                   onClick={handleModalClose} 
// //                   style={{ backgroundColor: "red", color: 'white', padding: '10px 20px', borderRadius: "5px", border: 'none', cursor: 'pointer' }}
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default ViewOrder;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navigation from '../navigation/Navigation';
// import { Link } from 'react-router-dom';

// const ViewOrder = () => {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [date, setDate] = useState('');
//   const [status, setStatus] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [size, setSize] = useState('');
//   const [controlNumber, setControlNumber] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const userId = localStorage.getItem('customerId');
//         if (userId) {
//           const response = await axios.get(`http://localhost:8080/api/orders/customer/${userId}`);
//           setOrders(response.data);
//         } else {
//           setError('User ID not found in local storage.');
//         }
//       } catch (err) {
//         setError('An error occurred while fetching orders: ' + err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, []);

//   const handleDelete = async (orderId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this order?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
//         setOrders(orders.filter(order => order.orderId !== orderId));
//         alert('Order deleted successfully.');
//       } catch (err) {
//         alert('Failed to delete order: ' + err.message);
//       }
//     }
//   };

//   const handleCancel = async (orderId) => {
//     try {
//       const response = await axios.patch(`http://localhost:8080/api/orders/cancel/${orderId}`);
//       setOrders(orders.map(order => 
//         order.orderId === orderId ? { ...order, status: 'canceled' } : order
//       ));
//       alert(response.data);
//     } catch (err) {
//       alert('Failed to cancel order: ' + err.message);
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalOpen(false);
//     setSelectedOrder(null);
//   };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <>
//       <Navigation />
//       <div className='main' style={{ padding: '20px'}}>
//         <h1 style={{ marginTop: "20px", textAlign: 'center'}}>Customer View Orders</h1>
//         <table className='orders-table' style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
//           <thead>
//             <tr style={{ backgroundColor: '#f2f2f2' }}>
//               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Order ID</th>
//               <th style={{ padding: '10px', border: '1px solid #ddd',width:'330px' }} >Control Number</th>
//               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
//               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
//               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
//               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Size</th>
//               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
//               <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {orders.map((order) => (
//               <tr key={order.orderId}>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.orderId}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.controlNumber}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(order.date).toLocaleDateString()}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.status}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.quantity}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.size}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.customer ? order.customer.email : 'N/A'}</td>
//                 <td style={{ padding: '10px', border: '1px solid #ddd' }}>
//                   <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
    
//         <td> <Link to={`/make-payment/${item.orderId}`} > <button class="edit-btn" style={{backgroundColor:"green",borderRadius:"5px"}}>Payment</button></Link></td>

//                     <button 
//                       style={{ background: "red", color: 'white',height:"40px", padding: '5px 10px', borderRadius: "5px", border: 'none', cursor: 'pointer' }} 
//                       onClick={() => handleDelete(order.orderId)}
//                     >
//                       Delete
//                     </button>
//                     <button 
//                       style={{ background: "brown", color: 'white',height:"40px", padding: '5px 10px', borderRadius: "5px", border: 'none', cursor: 'pointer' }} 
//                       onClick={() => handleCancel(order.orderId)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {isModalOpen && (
//           <div className="modal" style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0, 0, 0, 0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000,
//           }}>
//             <div className="modal-content" style={{
//               backgroundColor: 'white',
//               padding: '20px',
//               borderRadius: '8px',
//               boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
//               width: '400px',
//               maxWidth: '90%',
//             }}>
//               <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Order Details</h2>
//               <div style={{ marginBottom: '10px' }}>
//                 <strong>Date:</strong> {date}
//               </div>
//               <div style={{ marginBottom: '10px' }}>
//                 <strong>Status:</strong> {status}
//               </div>
//               <div style={{ marginBottom: '10px' }}>
//                 <strong>Quantity:</strong> {quantity}
//               </div>
//               <div style={{ marginBottom: '10px' }}>
//                 <strong>Size:</strong> {size}
//               </div>
//               <div style={{ marginBottom: '10px' }}>
//                 <strong>Control Number:</strong> {controlNumber}
//               </div>
//               <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
//                 <button 
//                   type="button" 
//                   onClick={handleModalClose} 
//                   style={{ backgroundColor: "red", color: 'white', padding: '10px 20px', borderRadius: "5px", border: 'none', cursor: 'pointer' }}
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default ViewOrder;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Link } from 'react-router-dom';

const ViewOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [quantity, setQuantity] = useState('');
  const [size, setSize] = useState('');
  const [controlNumber, setControlNumber] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem('customerId');
        if (userId) {
          const response = await axios.get(`http://localhost:8080/api/orders/customer/${userId}`);
          setOrders(response.data);
        } else {
          setError('User ID not found in local storage.');
        }
      } catch (err) {
        setError('An error occurred while fetching orders: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleDelete = async (orderId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this order?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
        setOrders(orders.filter(order => order.orderId !== orderId));
        alert('Order deleted successfully.');
      } catch (err) {
        alert('Failed to delete order: ' + err.message);
      }
    }
  };

  const handleCancel = async (orderId) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/orders/cancel/${orderId}`);
      setOrders(orders.map(order => 
        order.orderId === orderId ? { ...order, status: 'canceled' } : order
      ));
      alert(response.data);
    } catch (err) {
      alert('Failed to cancel order: ' + err.message);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navigation />
      <div className='main' style={{ padding: '20px' }}>
        <h1 style={{ marginTop: "20px", textAlign: 'center' }}>Customer View Orders</h1>
        <table className='orders-table' style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Order ID</th>
              <th style={{ padding: '10px', border: '1px solid #ddd', width: '330px' }}>Control Number</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Size</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.orderId}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.orderId}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.controlNumber}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(order.date).toLocaleDateString()}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.status}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.quantity}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.size}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{order.customer ? order.customer.email : 'N/A'}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button 
                      style={{ background: "red", color: 'white', padding: '5px 10px', borderRadius: "5px", border: 'none', cursor: 'pointer' }} 
                      onClick={() => handleDelete(order.orderId)}
                    >
                      Delete
                    </button>
                    <button 
                      style={{ background: "brown", color: 'white', padding: '5px 10px', borderRadius: "5px", border: 'none', cursor: 'pointer' }} 
                      onClick={() => handleCancel(order.orderId)}
                    >
                      Cancel
                    </button>
                    <Link to={`/make-payment/${order.orderId}`}>
                      <button 
                        style={{ background: "green", color: 'white', padding: '5px 10px', borderRadius: "5px", border: 'none', cursor: 'pointer' }} 
                      >
                        Payment
                      </button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <div className="modal" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
          }}>
            <div className="modal-content" style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
              width: '400px',
              maxWidth: '90%',
            }}>
              <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Order Details</h2>
              <div style={{ marginBottom: '10px' }}>
                <strong>Date:</strong> {date}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Status:</strong> {status}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Quantity:</strong> {quantity}
              </div>
              <div style={{ marginBottom: '10px' }}>
                <strong>Size:</strong> {size}
              </div>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
                <button 
                  type="button" 
                  onClick={handleModalClose} 
                  style={{ backgroundColor: "red", color: 'white', padding: '10px 20px', borderRadius: "5px", border: 'none', cursor: 'pointer' }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewOrder;


