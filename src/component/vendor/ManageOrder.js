// import React, { useEffect, useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import axios from 'axios';

// const ViewOrder = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);

//   const [formValues, setFormValues] = useState({
//     orderId: '',
//     status: '',
//     quantity: '',
//     date: '',
//     orderName:''
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
//         setData(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

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
//       date: item.date,
//       orderName: item.orderName
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
//       <div className="main">
//         <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px', backgroundColor: 'gray', width: '1042px',marginLeft:"0px" }}>
//           Vendor Manage Order Page
//         </h1>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div>Error: {error}</div>
//         ) : (
//           <table style={{width:"1000px"}}>
//             <thead>
//               <tr>
//                 <th>OrderId</th>
//                 <th>OrderName</th>
//                 <th style={{width:"400px"}}>Date</th>
//                 <th>OrderType</th>
//                 <th>Status</th>
//                 <th>Quantity</th>
//                 <th>Update</th>
//                 <th>Delete</th>
//                 <th>Approve</th>
//                 <th>Cancel</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.orderId}>
//                   <td>{item.orderId}</td>
//                   <td style={{width:'700px'}}>{item.orderName}</td>
//                   <td style={{width:'700px'}}>{item.date}</td>
//                   <td>{item.orderType}</td>
//                   <td>{item.status}</td>
//                   <td>{item.quantity}</td>
//                   <td>
//                     <button type="button" onClick={() => handleUpdate(item)} style={{borderRadius:"5px"}}>
//                       Update
//                     </button>
//                   </td>
//                   <td>
//                     <button style={{ background: 'red',borderRadius:"5px" }} onClick={() => handleCancel(item.orderId)}>
//                       Delete
//                     </button>
//                   </td>
//                   <td>
                    
//                 <button class="button" style={{backgroundColor:"green",width:"80px",borderRadius:"5px"}}>Approved</button>
//                 </td>
//                 <td>
//                 <button class="button"  style={{backgroundColor:"red",width:"80px",borderRadius:"5px"}}>Cancel</button>
                
//             </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {showPopup && (
//           <div
//             className="popup"
//             style={{
//               width: '400px',
//               height: 'auto',
//               marginLeft: '200px',
//               position: 'fixed',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               backgroundColor: 'white',
//               boxShadow: '0 0 10px rgba(0,0,0,0.2)',
//             }}
//           >
//             <div className="popup-content" style={{ padding: '20px' }}>
//               <h2>Update Order</h2>
//               <form onSubmit={(e) => e.preventDefault()}>
//                 <label>
//                   OrderId:
//                   <input
//                     type="text"
//                     name="orderId"
//                     value={formValues.orderId}
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </label>
//                 <label>
//                   OrderName:
//                   <input
//                     type="text"
//                     name="orderName"
//                     value={formValues.orderName}
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
//                   :
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
//                   <button type="button" onClick={handleUpdateOrder} style={{ width: '90px' }}>
//                     Submit
//                   </button>
//                   <button type="button" onClick={() => setShowPopup(false)} style={{ marginLeft: '130px', width: '90px', marginTop: '7px' }}>
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

// export default ViewOrder;





// import React, { useEffect, useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import axios from 'axios';

// const ViewOrder = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [showPopup, setShowPopup] = useState(false);
//   const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);

//   const [formValues, setFormValues] = useState({
//     orderId: '',
//     status: '',
//     quantity: '',
//     date: '',
//     orderName: ''
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
//         setData(response.data);
//       } catch (error) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleCancel = async (orderId) => {
//     try {
//       await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
//       setData(data.filter((item) => item.orderId !== orderId));
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleApprove = async (orderId) => {
//     try {
//       const response = await axios.patch(`http://localhost:8080/api/orders/approve/${orderId}`);
//       if (response.status === 200) {
//         setData(data.map((item) =>
//           item.orderId === orderId ? { ...item, status: 'approved' } : item
//         ));
//       }
//     } catch (error) {
//       setError(error.message);
//     }
//   };

//   const handleUpdate = (item) => {
//     setFormValues({
//       orderId: item.orderId,
//       status: item.status,
//       quantity: item.quantity,
//       date: item.date,
//       orderName: item.orderName
//     });
//     setOrderIdToUpdate(item.orderId);
//     setShowPopup(true);
//   };

//   const handleUpdateOrder = async () => {
//     try {
//       const response = await axios.put(`http://localhost:8080/api/orders/update/${orderIdToUpdate}`, formValues);
//       if (response.status === 200) {
//         setData(data.map((item) =>
//           item.orderId === orderIdToUpdate ? { ...item, ...formValues } : item
//         ));
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
//       <div className="main">
//         <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px', backgroundColor: 'gray', width: '1042px', marginLeft: "0px" }}>
//           Vendor Manage Order Page
//         </h1>
//         {loading ? (
//           <div>Loading...</div>
//         ) : error ? (
//           <div>Error: {error}</div>
//         ) : (
//           <table style={{ width: "1000px" }}>
//             <thead>
//               <tr>
//                 <th>OrderId</th>
//                 <th>OrderName</th>
//                 <th style={{ width: "400px" }}>Date</th>
//                 <th>OrderType</th>
//                 <th>Status</th>
//                 <th>Quantity</th>
//                 <th>Update</th>
//                 <th>Delete</th>
//                 <th>Approve</th>
//                 <th>Cancel</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.orderId}>
//                   <td>{item.orderId}</td>
//                   <td style={{ width: '700px' }}>{item.orderName}</td>
//                   <td style={{ width: '700px' }}>{item.date}</td>
//                   <td>{item.orderType}</td>
//                   <td>{item.status}</td>
//                   <td>{item.quantity}</td>
//                   <td>
//                     <button type="button" onClick={() => handleUpdate(item)} style={{ borderRadius: "5px" }}>
//                       Update
//                     </button>
//                   </td>
//                   <td>
//                     <button style={{ background: 'red', borderRadius: "5px" }} onClick={() => handleCancel(item.orderId)}>
//                       Delete
//                     </button>
//                   </td>
//                   <td>
//                     <button className="button" style={{ backgroundColor: "green", width: "80px", borderRadius: "5px" }} onClick={() => handleApprove(item.orderId)}>
//                       Approve
//                     </button>
//                   </td>
//                   <td>
//                     <button className="button" style={{ backgroundColor: "red", width: "80px", borderRadius: "5px" }} onClick={() => handleCancel(item.orderId)}>
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//         {showPopup && (
//           <div
//             className="popup"
//             style={{
//               width: '400px',
//               height: 'auto',
//               marginLeft: '200px',
//               position: 'fixed',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -50%)',
//               backgroundColor: 'white',
//               boxShadow: '0 0 10px rgba(0,0,0,0.2)',
//             }}
//           >
//             <div className="popup-content" style={{ padding: '20px' }}>
//               <h2>Update Order</h2>
//               <form onSubmit={(e) => e.preventDefault()}>
//                 <label>
//                   OrderId:
//                   <input
//                     type="text"
//                     name="orderId"
//                     value={formValues.orderId}
//                     onChange={handleChange}
//                     disabled
//                   />
//                 </label>
//                 <label>
//                   OrderName:
//                   <input
//                     type="text"
//                     name="orderName"
//                     value={formValues.orderName}
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
//                   <button type="button" onClick={handleUpdateOrder} style={{ width: '90px' }}>
//                     Submit
//                   </button>
//                   <button type="button" onClick={() => setShowPopup(false)} style={{ marginLeft: '130px', width: '90px', marginTop: '7px' }}>
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

// export default ViewOrder;

import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const ViewOrder = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [orderIdToUpdate, setOrderIdToUpdate] = useState(null);

  const [formValues, setFormValues] = useState({
    orderId: '',
    status: '',
    quantity: '',
    date: '',
    orderName: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:8080/api/orders/get/orders', {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCancel = async (orderId) => {
    try {
      await axios.patch(`http://localhost:8080/api/orders/cancel/${orderId}`);
      setData(data.map((item) =>
        item.orderId === orderId ? { ...item, status: 'canceled' } : item
      ));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleApprove = async (orderId) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/orders/approve/${orderId}`);
      if (response.status === 200) {
        setData(data.map((item) =>
          item.orderId === orderId ? { ...item, status: 'approved' } : item
        ));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = (item) => {
    setFormValues({
      orderId: item.orderId,
      status: item.status,
      quantity: item.quantity,
      date: item.date,
      orderName: item.orderName
    });
    setOrderIdToUpdate(item.orderId);
    setShowPopup(true);
  };

  const handleUpdateOrder = async () => {
    try {
      const response = await axios.put(`http://localhost:8080/api/orders/update/${orderIdToUpdate}`, formValues);
      if (response.status === 200) {
        setData(data.map((item) =>
          item.orderId === orderIdToUpdate ? { ...item, ...formValues } : item
        ));
        setShowPopup(false);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/delete/${orderId}`);
      setData(data.filter((item) => item.orderId !== orderId));
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
        <h1 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '40px', backgroundColor: 'gray', width: '1042px', marginLeft: "0px" }}>
          Vendor Manage Order Page
        </h1>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>Error: {error}</div>
        ) : (
          <table style={{ width: "1000px" }}>
            <thead>
              <tr>
                <th>OrderId</th>
                <th>OrderName</th>
                <th style={{ width: "400px" }}>Date</th>
                <th>OrderType</th>
                <th>Status</th>
                <th>Quantity</th>
                <th>Update</th>
                <th>Approve</th>
                <th>Delete</th>
               
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.orderId}>
                  <td>{item.orderId}</td>
                  <td style={{ width: '700px' }}>{item.orderName}</td>
                  <td style={{ width: '700px' }}>{item.date}</td>
                  <td>{item.orderType}</td>
                  <td>{item.status}</td>
                  <td>{item.quantity}</td>
                  <td>
                    <button type="button" onClick={() => handleUpdate(item)} style={{ borderRadius: "5px",backgroundColor:"black" }}>
                      Update
                    </button>
                  </td>
                  <td>
                    <button className="button" style={{ backgroundColor: "green", width: "80px", borderRadius: "5px" }} onClick={() => handleApprove(item.orderId)}>
                      Approve
                    </button>
                  </td>
                  <td>
                    <button className="button" style={{ backgroundColor: "red", color: "white", width: "80px", borderRadius: "5px" }} onClick={() => handleDelete(item.orderId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {showPopup && (
          <div
            className="popup"
            style={{
              width: '400px',
              height: 'auto',
              marginLeft: '200px',
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'white',
              boxShadow: '0 0 10px rgba(0,0,0,0.2)',
            }}
          >
            <div className="popup-content" style={{ padding: '20px' }}>
              <h2>Update Order</h2>
              <form onSubmit={(e) => e.preventDefault()}>
                <label>
                  OrderId:
                  <input
                    type="text"
                    name="orderId"
                    value={formValues.orderId}
                    onChange={handleChange}
                    disabled
                  />
                </label>
                <label>
                  OrderName:
                  <input
                    type="text"
                    name="orderName"
                    value={formValues.orderName}
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
                  <button type="button" onClick={handleUpdateOrder} style={{ width: '90px' ,backgroundColor:"red",borderRadius:"5px"}}>
                    Submit
                  </button>
                  <button type="button" onClick={() => setShowPopup(false)} style={{ marginLeft: '130px', width: '90px', marginTop: '7px',backgroundColor:"green",borderRadius:"5px" }}>
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

export default ViewOrder;

