
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navigation from "../navigation/Navigation";

// const Purchase = () => {
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState({
//     supplier: "",
//     startDate: "",
//     endDate: ""
//   });

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editPurchase, setEditPurchase] = useState(null);

//   useEffect(() => {
//     fetchPurchases();
//   }, []);

//   const fetchPurchases = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get("http://localhost:8080/api/purchases");
//       setPurchases(response.data);
//       setError("");
//     } catch (err) {
//       console.error("Error fetching purchases:", err);
//       setError("Failed to fetch purchases. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filteredPurchases = purchases.filter(purchase => {
//     return (
//       (filter.supplier === "" ||
//         purchase.supplier.toLowerCase().includes(filter.supplier.toLowerCase())) &&
//       (filter.startDate === "" ||
//         new Date(purchase.purchaseDate) >= new Date(filter.startDate)) &&
//       (filter.endDate === "" ||
//         new Date(purchase.purchaseDate) <= new Date(filter.endDate))
//     );
//   });

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilter({ ...filter, [name]: value });
//   };

//   const clearFilters = () => {
//     setFilter({
//       supplier: "",
//       startDate: "",
//       endDate: ""
//     });
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this purchase?")) {
//       try {
//         await axios.delete(`http://localhost:8080/api/purchases/${id}`);
//         setPurchases(purchases.filter(p => p.purchaseId !== id));
//       } catch (err) {
//         console.error("Error deleting purchase:", err);
//         alert("Failed to delete purchase. Try again later.");
//       }
//     }
//   };

//   const openEditModal = (purchase) => {
//     setEditPurchase(purchase);
//     setIsModalOpen(true);
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditPurchase({ ...editPurchase, [name]: value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const { purchaseId, quantity, purchasePrice, supplier } = editPurchase;
//       await axios.put(`http://localhost:8080/api/purchases/${purchaseId}`, {
//         quantity,
//         purchasePrice,
//         supplier
//       });
//       fetchPurchases();
//       setIsModalOpen(false);
//       setEditPurchase(null);
//     } catch (err) {
//       console.error("Error updating purchase:", err);
//       alert("Failed to update purchase. Try again later.");
//     }
//   };

//   if (loading) {
//     return (
//       <div style={{
//         padding: "20px",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         minHeight: "100vh",
//         backgroundColor: "#f8f9fa"
//       }}>
//         <Navigation />
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//           <div style={{
//             display: "inline-block",
//             width: "50px",
//             height: "50px",
//             border: "5px solid #f3f3f3",
//             borderTop: "5px solid #3498db",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             marginBottom: "20px"
//           }}></div>
//           <p style={{ color: "#6c757d", fontSize: "18px" }}>Loading purchases...</p>
//         </div>
//         <style>
//           {`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}
//         </style>
//       </div>
//     );
//   }

//   return (
//     <div style={{
//       padding: "20px",
//       fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       minHeight: "100vh",
//       backgroundColor: "#f8f9fa"
//     }}>
//       <Navigation />

//       <div style={{ maxWidth: "1390px", margin: "0 auto", marginLeft: "230px" }}>
//         <h2 style={{
//           textAlign: "center",
//           marginBottom: "10px",
//           color: "#2c3e50",
//           fontWeight: "600",
//           marginTop: "60px",
//           fontSize: "28px",
//           paddingBottom: "10px",
//           borderBottom: "2px solid #eaeaea"
//         }}>
//           Purchase History
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
//             <button
//               onClick={() => setError("")}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#721c24",
//                 fontSize: "18px",
//                 cursor: "pointer"
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Filter Section */}
//         <div style={{
//           backgroundColor: "white",
//           padding: "20px",
//           borderRadius: "10px",
//           marginBottom: "40px",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//           border: "1px solid #e0e0e0"
//         }}>
//           <h3 style={{
//             margin: "0 0 15px 0",
//             color: "#2c3e50",
//             fontSize: "18px",
//             fontWeight: "600"
//           }}>Filters</h3>

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//             gap: "20px",
//             alignItems: "end"
//           }}>
//             <div>
//               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
//                 Supplier:
//               </label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={filter.supplier}
//                 onChange={handleFilterChange}
//                 placeholder="Filter by supplier"
//                 style={{
//                   padding: "10px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #ced4da",
//                   width: "100%",
//                   fontSize: "15px"
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
//                 Start Date:
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={filter.startDate}
//                 onChange={handleFilterChange}
//                 style={{
//                   padding: "10px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #ced4da",
//                   width: "100%",
//                   fontSize: "15px"
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
//                 End Date:
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={filter.endDate}
//                 onChange={handleFilterChange}
//                 style={{
//                   padding: "10px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #ced4da",
//                   width: "100%",
//                   fontSize: "15px"
//                 }}
//               />
//             </div>

//             <div>
//               <button
//                 onClick={clearFilters}
//                 style={{
//                   padding: "10px 18px",
//                   backgroundColor: "#6c757d",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "15px",
//                   fontWeight: "500",
//                   width: "100%"
//                 }}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Purchases Table (fixed header, scrollable body) */}
//         <div style={{
//           backgroundColor: "white",
//           borderRadius: "10px",
//           overflow: "hidden",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//           border: "1px solid #e0e0e0",
//           marginBottom: "20px"
//         }}>
//           <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//             <table style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               minWidth: "800px"
//             }}>
//               <thead>
//                 <tr style={{
//                   backgroundColor: "#f8f9fa",
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 10
//                 }}>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Product</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Quantity</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Buying Price/unit</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Total BuyingPrice</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Supplier</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Date</th>
//                   <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPurchases.length > 0 ? (
//                   filteredPurchases.map((purchase, index) => (
//                     <tr key={purchase.purchaseId} style={{
//                       borderBottom: "1px solid #eaeaea",
//                       backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9"
//                     }}>
//                       <td style={{ padding: "12px" }}>{purchase.product?.productName || "N/A"}</td>
//                       <td style={{ padding: "12px" }}>{purchase.quantity}</td>
//                       <td style={{ padding: "12px" }}>{purchase.purchasePrice?.toFixed(2)}Tsh</td>
//                       <td style={{ padding: "12px" }}>
//                          {(purchase.quantity * purchase.purchasePrice)?.toFixed(2)}Tsh
//                       </td>
//                       <td style={{ padding: "12px" }}>{purchase.supplier}</td>
//                       <td style={{ padding: "12px" }}>
//                         {new Date(purchase.purchaseDate).toLocaleDateString()}
//                       </td>
//                       <td style={{ padding: "12px", textAlign: "center" }}>
//                         <button
//                           onClick={() => openEditModal(purchase)}
//                           style={{
//                             marginRight: "8px",
//                             padding: "6px 12px",
//                             backgroundColor: "#3498db",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer"
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(purchase.purchaseId)}
//                           style={{
//                             padding: "6px 12px",
//                             backgroundColor: "#e74c3c",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer"
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="7" style={{ padding: "20px", textAlign: "center" }}>
//                       No purchases found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Summary */}
//         {filteredPurchases.length > 0 && (
//           <div style={{
//             padding: "16px 20px",
//             backgroundColor: "#e9ecef",
//             borderRadius: "8px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             flexWrap: "wrap",
//             gap: "10px",
//             fontWeight: "500",
//             fontSize: "16px",
//             color: "#2c3e50"
//           }}>
//             <div>
//               Total Purchases: <span style={{ color: "#3498db" }}>{filteredPurchases.length}</span>
//             </div>
//             <div>
//               Total Amount: <span style={{ color: "#27ae60" }}>
//                 TSH
//                 {filteredPurchases
//                   .reduce((sum, purchase) => sum + (purchase.quantity * purchase.purchasePrice), 0)
//                   .toFixed(2)}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && editPurchase && (
//         <div style={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           zIndex: 9999
//         }}>
//           <div style={{
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "10px",
//             width: "400px",
//             position: "relative"
//           }}>
//             <h3 style={{ marginBottom: "15px", color: "#2c3e50" }}>Edit Purchase</h3>
//             <label style={{ fontWeight: "500" }}>Quantity:</label>
//             <input
//               type="number"
//               name="quantity"
//               value={editPurchase.quantity}
//               onChange={handleEditChange}
//               style={{
//                 width: "100%",
//                 padding: "8px",
//                 margin: "8px 0",
//                 borderRadius: "6px",
//                 border: "1px solid #ced4da"
//               }}
//             />
//             <label style={{ fontWeight: "500" }}>Price:</label>
//             <input
//               type="number"
//               name="purchasePrice"
//               value={editPurchase.purchasePrice}
//               onChange={handleEditChange}
//               style={{
//                 width: "100%",
//                 padding: "8px",
//                 margin: "8px 0",
//                 borderRadius: "6px",
//                 border: "1px solid #ced4da"
//               }}
//             />
//             <label style={{ fontWeight: "500" }}>Supplier:</label>
//             <input
//               type="text"
//               name="supplier"
//               value={editPurchase.supplier}
//               onChange={handleEditChange}
//               style={{
//                 width: "100%",
//                 padding: "8px",
//                 margin: "8px 0",
//                 borderRadius: "6px",
//                 border: "1px solid #ced4da"
//               }}
//             />
//             <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   marginRight: "10px",
//                   padding: "6px 12px",
//                   borderRadius: "4px",
//                   border: "1px solid #ced4da",
//                   backgroundColor: "#101011ff",
//                   cursor: "pointer"
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 style={{
//                   padding: "6px 12px",
//                   borderRadius: "4px",
//                   border: "none",
//                   backgroundColor: "#27ae60",
//                   color: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 Update
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Purchase;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../navigation/Navigation";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    supplier: "",
    startDate: "",
    endDate: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/purchases");
      setPurchases(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching purchases:", err);
      setError("Failed to fetch purchases. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredPurchases = purchases.filter(purchase => {
    return (
      (filter.supplier === "" ||
        purchase.supplier.toLowerCase().includes(filter.supplier.toLowerCase())) &&
      (filter.startDate === "" ||
        new Date(purchase.purchaseDate) >= new Date(filter.startDate)) &&
      (filter.endDate === "" ||
        new Date(purchase.purchaseDate) <= new Date(filter.endDate))
    );
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const clearFilters = () => {
    setFilter({
      supplier: "",
      startDate: "",
      endDate: ""
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      try {
        await axios.delete(`http://localhost:8080/api/purchases/${id}`);
        setPurchases(purchases.filter(p => p.purchaseId !== id));
      } catch (err) {
        console.error("Error deleting purchase:", err);
        alert("Failed to delete purchase. Try again later.");
      }
    }
  };

  const openEditModal = (purchase) => {
    setEditPurchase(purchase);
    setIsModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPurchase({ ...editPurchase, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const { purchaseId, quantity, purchasePrice, sellingPrice, supplier } = editPurchase;
      await axios.put(`http://localhost:8080/api/purchases/${purchaseId}`, {
        quantity,
        purchasePrice,
        sellingPrice,
        supplier
      });
      fetchPurchases();
      setIsModalOpen(false);
      setEditPurchase(null);
    } catch (err) {
      console.error("Error updating purchase:", err);
      alert("Failed to update purchase. Try again later.");
    }
  };

  if (loading) {
    return (
      <div style={{
        padding: "20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa"
      }}>
        <Navigation />
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <div style={{
            display: "inline-block",
            width: "50px",
            height: "50px",
            border: "5px solid #f3f3f3",
            borderTop: "5px solid #3498db",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            marginBottom: "20px"
          }}></div>
          <p style={{ color: "#6c757d", fontSize: "18px" }}>Loading purchases...</p>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div style={{
      padding: "20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      minHeight: "100vh",
      backgroundColor: "#f8f9fa"
    }}>
      <Navigation />

      <div style={{ maxWidth: "1390px", margin: "0 auto", marginLeft: "230px" }}>
        <h2 style={{
          textAlign: "center",
          marginBottom: "10px",
          color: "#2c3e50",
          fontWeight: "600",
          marginTop: "60px",
          fontSize: "28px",
          paddingBottom: "10px",
          borderBottom: "2px solid #eaeaea"
        }}>
          Purchase History
        </h2>

        {error && (
          <div style={{
            color: "#721c24",
            backgroundColor: "#f8d7da",
            border: "1px solid #f5c6cb",
            padding: "12px",
            borderRadius: "6px",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}>
            <span>{error}</span>
            <button
              onClick={() => setError("")}
              style={{
                background: "none",
                border: "none",
                color: "#721c24",
                fontSize: "18px",
                cursor: "pointer"
              }}
            >
              ×
            </button>
          </div>
        )}

        {/* Filter Section */}
        <div style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "40px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e0e0e0"
        }}>
          <h3 style={{
            margin: "0 0 15px 0",
            color: "#2c3e50",
            fontSize: "18px",
            fontWeight: "600"
          }}>Filters</h3>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
            alignItems: "end"
          }}>
            <div>
              <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
                Supplier:
              </label>
              <input
                type="text"
                name="supplier"
                value={filter.supplier}
                onChange={handleFilterChange}
                placeholder="Filter by supplier"
                style={{
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ced4da",
                  width: "100%",
                  fontSize: "15px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
                Start Date:
              </label>
              <input
                type="date"
                name="startDate"
                value={filter.startDate}
                onChange={handleFilterChange}
                style={{
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ced4da",
                  width: "100%",
                  fontSize: "15px"
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "500", marginBottom: "8px", color: "#495057" }}>
                End Date:
              </label>
              <input
                type="date"
                name="endDate"
                value={filter.endDate}
                onChange={handleFilterChange}
                style={{
                  padding: "10px 12px",
                  borderRadius: "6px",
                  border: "1px solid #ced4da",
                  width: "100%",
                  fontSize: "15px"
                }}
              />
            </div>

            <div>
              <button
                onClick={clearFilters}
                style={{
                  padding: "10px 18px",
                  backgroundColor: "#6c757d",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "500",
                  width: "100%"
                }}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Purchases Table */}
        <div style={{
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
          border: "1px solid #e0e0e0",
          marginBottom: "20px"
        }}>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "900px"
            }}>
              <thead>
                <tr style={{
                  backgroundColor: "#f8f9fa",
                  position: "sticky",
                  top: 0,
                  zIndex: 10
                }}>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Product</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Quantity</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Buying Price/unit</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Selling Price/unit</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Total BuyingPrice</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Supplier</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Date</th>
                  <th style={{ padding: "12px", borderBottom: "2px solid #dee2e6", textAlign: "center" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.length > 0 ? (
                  filteredPurchases.map((purchase, index) => (
                    <tr key={purchase.purchaseId} style={{
                      borderBottom: "1px solid #eaeaea",
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9"
                    }}>
                      <td style={{ padding: "12px" }}>{purchase.product?.productName || "N/A"}</td>
                      <td style={{ padding: "12px" }}>{purchase.quantity}</td>
                      <td style={{ padding: "12px" }}>{purchase.purchasePrice?.toFixed(2)} Tsh</td>
                      <td style={{ padding: "12px" }}>{purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) + " Tsh" : "N/A"}</td>
                      <td style={{ padding: "12px" }}>
                        {(purchase.quantity * purchase.purchasePrice)?.toFixed(2)} Tsh
                      </td>
                      <td style={{ padding: "12px" }}>{purchase.supplier}</td>
                      <td style={{ padding: "12px" }}>
                        {new Date(purchase.purchaseDate).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "12px", textAlign: "center" }}>
                        <button
                          onClick={() => openEditModal(purchase)}
                          style={{
                            marginRight: "8px",
                            padding: "6px 12px",
                            backgroundColor: "#3498db",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(purchase.purchaseId)}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "#e74c3c",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" style={{ padding: "20px", textAlign: "center" }}>
                      No purchases found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        {filteredPurchases.length > 0 && (
          <div style={{
            padding: "16px 20px",
            backgroundColor: "#e9ecef",
            borderRadius: "8px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            fontWeight: "500",
            fontSize: "16px",
            color: "#2c3e50"
          }}>
            <div>
              Total Purchases: <span style={{ color: "#3498db" }}>{filteredPurchases.length}</span>
            </div>
            <div>
              Total Amount: <span style={{ color: "#27ae60" }}>
                TSH
                {filteredPurchases
                  .reduce((sum, purchase) => sum + (purchase.quantity * purchase.purchasePrice), 0)
                  .toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editPurchase && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            width: "400px",
            position: "relative"
          }}>
            <h3 style={{ marginBottom: "15px", color: "#2c3e50" }}>Edit Purchase</h3>
            <label style={{ fontWeight: "500" }}>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={editPurchase.quantity}
              onChange={handleEditChange}
              style={{
                width: "100%",
                padding: "8px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ced4da"
              }}
            />
            <label style={{ fontWeight: "500" }}>Buying Price:</label>
            <input
              type="number"
              name="purchasePrice"
              value={editPurchase.purchasePrice}
              onChange={handleEditChange}
              style={{
                width: "100%",
                padding: "8px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ced4da"
              }}
            />
            <label style={{ fontWeight: "500" }}>Selling Price:</label>
            <input
              type="number"
              name="sellingPrice"
              value={editPurchase.sellingPrice || ""}
              onChange={handleEditChange}
              style={{
                width: "100%",
                padding: "8px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ced4da"
              }}
            />
            <label style={{ fontWeight: "500" }}>Supplier:</label>
            <input
              type="text"
              name="supplier"
              value={editPurchase.supplier}
              onChange={handleEditChange}
              style={{
                width: "100%",
                padding: "8px",
                margin: "8px 0",
                borderRadius: "6px",
                border: "1px solid #ced4da"
              }}
            />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "15px" }}>
              <button
                onClick={() => setIsModalOpen(false)}
                style={{
                  marginRight: "10px",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                  backgroundColor: "#101011ff",
                  cursor: "pointer",
                  color: "white"
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                style={{
                  padding: "6px 12px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#27ae60",
                  color: "white",
                  cursor: "pointer"
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchase;
