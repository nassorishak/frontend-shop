// import React, { useEffect, useState } from 'react'
// import Navigation from '../navigation/Navigation'
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const ViewProducts = () => {

//     const [data , setData] = useState([]);
//     const [error, setError] = useState(null);

//     useEffect(()=>{
//         axios.get('http://localhost:8080/api/product/get/product')
//         .then((response)=>{
//             setData(response.data);
//         })
//         .catch((error) => {
//             setError(error.message);
//         })
//     }, [])

//   return (
//     <>
//       <Navigation />
//       <div className='main' style={{marginBottom:"250px"}}>
//         <h1 style={{marginTop:"14px"}}>Customer View Product</h1>
//         {error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <div style={{ overflowX: 'auto', marginTop: '20px' }}>
//             <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '900px' }}>
//               <thead>
//                   <tr style={{ background: '#f0f0f0' }}>
//                       <th>ProductId</th>
//                       <th>Product Code</th>
//                       <th>Product Image</th>
//                       <th>Product Name</th>
//                       <th>Product Description</th>
//                       <th>Price</th>
//                       <th>Category</th>
//                       <th>productCompany</th>
//                       <th>ProductUnit</th>
//                       <th>Stock Quantity</th>
//                       <th>Action</th>
//                   </tr>
//               </thead>
//               <tbody>
//                   {data.map((item, index)=>(
//                       <tr key={index} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
//                           <td>{item.productId}</td>
//                           <td>{item.productCode || 'N/A'}</td>
//                           <td>
//                             {item.image ? (
//                               <img 
//                                 src={`data:image/png;base64, ${item.image}`} 
//                                 alt="product" 
//                                 style={{ width: '100px', height: 'auto' }} 
//                               />
//                             ) : 'No Image'}
//                           </td>
//                           <td>{item.productName}</td>
//                           <td>{item.productDescription}</td>
//                           <td>{item.price}</td>
//                           <td>{item.category || 'N/A'}</td>
//                           <td>{item.productCompany || 'N/A'}</td>
//                           <td>{item.productUnit || 'N/A'}</td>
//                           <td>{item.stockQuantity != null ? item.stockQuantity : 'N/A'}</td>
//                           <td>
//                             <Link to={`/makeorder/${item.productId}`}>
//                               <button 
//                                 className="edit-btn" 
//                                 style={{
//                                   backgroundColor:"green",
//                                   borderRadius:"5px",
//                                   color:"white",
//                                   padding:"5px 10px",
//                                   border:"none",
//                                   cursor:"pointer"
//                                 }}
//                               >
//                                 Order
//                               </button>
//                             </Link>
//                           </td>
//                       </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {data.length === 0 && !error ? (
//           <p>No products found</p>
//         ) : null}
//       </div>
//     </>
//   )
// }

// export default ViewProducts


import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import axios from "axios";
import { Link } from "react-router-dom";

const ViewProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product/get/product")
      .then((response) => {
        setData(response.data);
        setError("");
      })
      .catch((err) => setError("Failed to fetch products."));
  }, []);

  return (
    <div style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f3f5f7ff",width:"1420px" }}>
      <Navigation />

      <div style={{ maxWidth: "1500px", margin: "0 auto", marginLeft: "235px", padding: "20px", backgroundColor:"whitesmoke", }}>
        <h2
          style={{
            textAlign: "center",
            marginTop:"50px",
            marginBottom: "10px",
            color: "#2c3e50",
            backgroundColor:"whitesmoke",
            borderRadius:"7px",
            fontWeight: "600",
            fontSize: "28px",
            paddingBottom: "10px",
            borderBottom: "2px solid #eaeaea",
          }}
        >
          Customer View Products
        </h2>

        {error && (
          <div
            style={{
              color: "#721c24",
              backgroundColor: "#f8d7da",
              border: "1px solid #f5c6cb",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              style={{
                background: "none",
                border: "none",
                color: "#721c24",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ×
            </button>
          </div>
        )}

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "10px",
            overflow: "hidden",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            border: "1px solid #e0e0e0",
            
          }}
        >
          {/* Scrollable Table Body */}
          <div style={{ maxHeight: "600px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
              <thead>
                <tr
                  style={{
                    backgroundColor: "#f8f9fa",
                    position: "sticky",
                    top: 0,
                    zIndex: 10,
                  }}
                >
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>ProductId</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Product Code</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Product Image</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Product Name</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Description</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Price</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Category</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Company</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Unit</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Stock Qty</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.length > 0 ? (
                  data.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid #eaeaea", backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", textAlign: "center" }}>
                      <td>{item.productId}</td>
                      <td>{item.productCode || "N/A"}</td>
                      <td>
                        {item.image ? (
                          <img src={`data:image/png;base64, ${item.image}`} alt="product" style={{ width: "100px", height: "auto" }} />
                        ) : (
                          "No Image"
                        )}
                      </td>
                      <td>{item.productName}</td>
                      <td>{item.productDescription}</td>
                      <td>{item.price}</td>
                      <td>{item.category || "N/A"}</td>
                      <td>{item.productCompany || "N/A"}</td>
                      <td>{item.productUnit || "N/A"}</td>
                      <td>{item.stockQuantity != null ? item.stockQuantity : "N/A"}</td>
                      <td>
                        <Link to={`/makeorder/${item.productId}`}>
                          <button
                            style={{
                              backgroundColor: "green",
                              borderRadius: "5px",
                              color: "white",
                              padding: "5px 10px",
                              border: "none",
                              cursor: "pointer",
                            }}
                          >
                            Order
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" style={{ padding: "20px", textAlign: "center" }}>
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;

