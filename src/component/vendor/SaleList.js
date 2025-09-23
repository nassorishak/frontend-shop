// import React, { useEffect, useState } from "react";
// import Navigation from "../navigation/Navigation";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const SaleList = () => {
//   const [sales, setSales] = useState([]);
//   const [stocks, setStocks] = useState([]); // ✅ keep stock data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Filters
//   const [saleId, setSaleId] = useState("");
//   const [date, setDate] = useState("");
//   const [customerName, setCustomerName] = useState("");
//   const [productId, setProductId] = useState("");
//   const [totalAmount, setTotalAmount] = useState(null);
//   const [totalQuantity, setTotalQuantity] = useState(null);

//   // Fetch all sales & stocks
//   useEffect(() => {
//     fetchAllSales();
//     fetchStocks();
//   }, []);

//   const handleResponse = async (response) => {
//     if (!response.ok) {
//       const text = await response.text();
//       throw new Error(text || `Error: ${response.status}`);
//     }
//     return response.json();
//   };

//   const fetchAllSales = () => {
//     setLoading(true);
//     setError(null);
//     fetch("http://localhost:8080/api/sales/all-sales")
//       .then(handleResponse)
//       .then((data) => {
//         setSales(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   const fetchStocks = () => {
//     axios
//       .get("http://localhost:8080/api/stocks/all-stocks")
//       .then((res) => setStocks(res.data))
//       .catch((err) => console.error("Error fetching stocks:", err));
//   };

//   // Helper: find stock for a given productId
//   const getStockStatus = (product) => {
//     if (!product) return "N/A";

//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );

//     if (!stock) return "N/A";

//     return stock.currentStock > 0 ? (
//       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
//     ) : (
//       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
//     );
//   };

//   const deleteSale = (id) => {
//     fetch(`http://localhost:8080/api/sales/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to delete");
//         alert("Sale deleted!");
//         fetchAllSales();
//       })
//       .catch((err) => alert("Error deleting sale: " + err.message));
//   };

//   return (
//     <>
//       <Navigation />
//       <div style={{ padding: "20px",marginBottom:"200px" }}>
//         <div style={{ marginTop: "40px" }}>
//           <div style={{ display: "flex", flexDirection: "row" }}>
//             <h2 style={{ marginTop: "40px", marginLeft: "790px" }}>
//               Sales List
//             </h2>
//             <Link to="/add-sale">
//               <button
//                 style={{
//                   borderRadius: "10px",
//                   marginLeft: "350px",
//                   backgroundColor: "#4CAF50",
//                   color: "white",
//                   padding: "10px 20px",
//                   border: "none",
//                   cursor: "pointer",
//                   width: "100px",
//                 }}
//               >
//                 AddSale
//               </button>
//             </Link>
//           </div>
//         </div>

//         {error && <p style={{ color: "red" }}>Error: {error}</p>}

//         {loading ? (
//           <p>Loading...</p>
//         ) : sales.length === 0 ? (
//           <p>No sales found.</p>
//         ) : (
//           <div
//             style={{
//               marginTop: "10px",
//               width: "87%",
//               marginLeft: "216px",
//               marginBottom: "20px",
//               height: "400px",
//               overflow: "auto",
//             }}
//           >
//             <table
//               border="1"
//               cellPadding="8"
//               cellSpacing="0"
//               style={{
//                 borderCollapse: "collapse",
//                 width: "100%",
//                 tableLayout: "fixed",
//                 marginRight: "10px",
//               }}
//             >
//               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
//                 <tr style={{ background: "#f0f0f0" }}>
//                   <th style={{ width: "80px" }}>Sale ID</th>
//                   <th style={{ width: "120px" }}>Date</th>
//                   <th style={{ width: "150px" }}>Product Name</th>
//                   <th style={{ width: "100px" }}>Quantity</th>
//                   <th style={{ width: "100px" }}>Unit Price</th>
//                   <th style={{ width: "120px" }}>Total Price</th>
//                   <th style={{ width: "150px" }}>Customer</th>
//                   <th style={{ width: "120px" }}>Stock Status</th>
//                   <th style={{ width: "100px" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sales.map((sale) => (
//                   <tr key={sale.saleId}>
//                     <td>{sale.saleId}</td>
//                     <td>{sale.date}</td>
//                     <td>{sale.product ? sale.product.productName : "0"}</td>
//                     <td>{sale.quantity}</td>
//                     <td>{sale.unitPrice}</td>
//                     <td>{sale.totalPrice}</td>
//                     <td>{sale.customerName || "0"}</td>
//                     <td>{getStockStatus(sale.product)}</td>
//                     <td>
//                       <div style={{ display: "flex", flexDirection: "row" }}>
//                         <button
//                           onClick={() => alert(`Update sale ${sale.saleId}`)}
//                           style={{
//                             color: "blue",
//                             marginRight: "8px",
//                             borderRadius: "10px",
//                           }}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => deleteSale(sale.saleId)}
//                           style={{ color: "red", borderRadius: "10px" }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SaleList;
// import React, { useEffect, useState } from "react";
// import Navigation from "../navigation/Navigation";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const SaleList = () => {
//   const [sales, setSales] = useState([]);
//   const [stocks, setStocks] = useState([]); // ✅ keep stock data
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Modal state
//   const [showModal, setShowModal] = useState(false);
//   const [currentSale, setCurrentSale] = useState(null);

//   // Fetch all sales & stocks
//   useEffect(() => {
//     fetchAllSales();
//     fetchStocks();
//   }, []);

//   const handleResponse = async (response) => {
//     if (!response.ok) {
//       const text = await response.text();
//       throw new Error(text || `Error: ${response.status}`);
//     }
//     return response.json();
//   };

//   const fetchAllSales = () => {
//     setLoading(true);
//     setError(null);
//     fetch("http://localhost:8080/api/sales/all-sales")
//       .then(handleResponse)
//       .then((data) => {
//         setSales(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err.message);
//         setLoading(false);
//       });
//   };

//   const fetchStocks = () => {
//     axios
//       .get("http://localhost:8080/api/stocks/all-stocks")
//       .then((res) => setStocks(res.data))
//       .catch((err) => console.error("Error fetching stocks:", err));
//   };

//   // Helper: find stock for a given productId
//   const getStockStatus = (product) => {
//     if (!product) return "N/A";

//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );

//     if (!stock) return "N/A";

//     return stock.currentStock > 0 ? (
//       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
//     ) : (
//       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
//     );
//   };

//   const deleteSale = (id) => {
//     fetch(`http://localhost:8080/api/sales/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to delete");
//         alert("Sale deleted!");
//         fetchAllSales();
//       })
//       .catch((err) => alert("Error deleting sale: " + err.message));
//   };

//   // Open update modal
//   const openUpdateModal = (sale) => {
//     setCurrentSale({ ...sale });
//     setShowModal(true);
//   };

//   // Handle update form change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentSale((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Save update
//   const updateSale = () => {
//     fetch(`http://localhost:8080/api/sales/${currentSale.saleId}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(currentSale),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to update");
//         alert("Sale updated!");
//         setShowModal(false);
//         fetchAllSales();
//       })
//       .catch((err) => alert("Error updating sale: " + err.message));
//   };

//   return (
//     <>
//       <Navigation />
//       <div style={{ padding: "20px", marginBottom: "200px" }}>
//         <div style={{ marginTop: "40px" }}>
//           <div style={{ display: "flex", flexDirection: "row" }}>
//             <h2 style={{ marginTop: "40px", marginLeft: "790px" }}>
//               Sales List
//             </h2>
//             <Link to="/add-sale">
//               <button
//                 style={{
//                   borderRadius: "10px",
//                   marginLeft: "350px",
//                   backgroundColor: "#4CAF50",
//                   color: "white",
//                   padding: "10px 20px",
//                   border: "none",
//                   cursor: "pointer",
//                   width: "100px",
//                 }}
//               >
//                 AddSale
//               </button>
//             </Link>
//           </div>
//         </div>

//         {error && <p style={{ color: "red" }}>Error: {error}</p>}

//         {loading ? (
//           <p>Loading...</p>
//         ) : sales.length === 0 ? (
//           <p>No sales found.</p>
//         ) : (
//           <div
//             style={{
//               marginTop: "10px",
//               width: "87%",
//               marginLeft: "216px",
//               marginBottom: "20px",
//               height: "400px",
//               overflow: "auto",
//             }}
//           >
//             <table
//               border="1"
//               cellPadding="8"
//               cellSpacing="0"
//               style={{
//                 borderCollapse: "collapse",
//                 width: "100%",
//                 tableLayout: "fixed",
//                 marginRight: "10px",
//               }}
//             >
//               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
//                 <tr style={{ background: "#f0f0f0" }}>
//                   <th style={{ width: "80px" }}>Sale ID</th>
//                   <th style={{ width: "120px" }}>Date</th>
//                   <th style={{ width: "150px" }}>Product Name</th>
//                   <th style={{ width: "100px" }}>Quantity</th>
//                   <th style={{ width: "100px" }}>Unit Price</th>
//                   <th style={{ width: "120px" }}>Total Price</th>
//                   <th style={{ width: "150px" }}>Customer</th>
//                   <th style={{ width: "120px" }}>Stock Status</th>
//                   <th style={{ width: "100px" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sales.map((sale) => (
//                   <tr key={sale.saleId}>
//                     <td>{sale.saleId}</td>
//                     <td>{sale.date}</td>
//                     <td>{sale.product ? sale.product.productName : "0"}</td>
//                     <td>{sale.quantity}</td>
//                     <td>{sale.unitPrice}</td>
//                     <td>{sale.totalPrice}</td>
//                     <td>{sale.customerName || "0"}</td>
//                     <td>{getStockStatus(sale.product)}</td>
//                     <td>
//                       <div style={{ display: "flex", flexDirection: "row" }}>
//                         <button
//                           onClick={() => openUpdateModal(sale)}
//                           style={{
//                             color: "blue",
//                             marginRight: "8px",
//                             borderRadius: "10px",
//                           }}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => deleteSale(sale.saleId)}
//                           style={{ color: "red", borderRadius: "10px" }}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* ✅ Update Modal */}
//         {showModal && currentSale && (
//           <div
//             style={{
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               background: "rgba(0,0,0,0.5)",
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//             }}
//           >
//             <div
//               style={{
//                 background: "white",
//                 padding: "20px",
//                 borderRadius: "10px",
//                 width: "400px",
//               }}
//             >
//               <h3>Update Sale</h3>
//               <label>Date:</label>
//               <input
//                 type="date"
//                 name="date"
//                 value={currentSale.date}
//                 onChange={handleChange}
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />
//               <label>Quantity:</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={currentSale.quantity}
//                 onChange={handleChange}
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />
//               <label>Unit Price:</label>
//               <input
//                 type="number"
//                 name="unitPrice"
//                 value={currentSale.unitPrice}
//                 onChange={handleChange}
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />
//               <label>Customer:</label>
//               <input
//                 type="text"
//                 name="customerName"
//                 value={currentSale.customerName || ""}
//                 onChange={handleChange}
//                 style={{ width: "100%", marginBottom: "10px" }}
//               />

//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   style={{
//                     marginRight: "10px",
//                     borderRadius: "8px",
//                     background: "gray",
//                     color: "white",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={updateSale}
//                   style={{
//                     borderRadius: "8px",
//                     background: "green",
//                     color: "white",
//                   }}
//                 >
//                   Save
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default SaleList;

import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
import axios from "axios";

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);

  useEffect(() => {
    fetchAllSales();
    fetchStocks();
  }, []);

  const handleResponse = async (response) => {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Error: ${response.status}`);
    }
    return response.json();
  };

  const fetchAllSales = () => {
    setLoading(true);
    setError(null);
    fetch("http://localhost:8080/api/sales/all-sales")
      .then(handleResponse)
      .then((data) => {
        setSales(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const fetchStocks = () => {
    axios
      .get("http://localhost:8080/api/stocks/all-stocks")
      .then((res) => setStocks(res.data))
      .catch((err) => console.error("Error fetching stocks:", err));
  };

  const getStockStatus = (product) => {
    if (!product) return "N/A";
    const stock = stocks.find(
      (s) => s.product && s.product.productId === product.productId
    );
    if (!stock) return "N/A";
    return stock.currentStock > 0 ? (
      <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
    ) : (
      <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
    );
  };

  const deleteSale = (id) => {
    fetch(`http://localhost:8080/api/sales/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete");
        alert("Sale deleted!");
        fetchAllSales();
      })
      .catch((err) => alert("Error deleting sale: " + err.message));
  };

  const handleUpdateClick = (sale) => {
    setCurrentSale({ ...sale }); // clone to edit
    setShowModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCurrentSale((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUpdate = () => {
    if (!currentSale) return;
    axios
      .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, currentSale)
      .then(() => {
        alert("Sale updated successfully!");
        setShowModal(false);
        fetchAllSales();
      })
      .catch((err) => {
        alert("Error updating sale: " + err.message);
      });
  };

  return (
    <>
      <Navigation />
      <div style={{ padding: "20px", marginBottom: "200px" }}>
        <div style={{ marginTop: "40px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
              Sales List
            </h2>
            <Link to="/add-sale">
              <button
                style={{
                  borderRadius: "10px",
                  marginLeft: "350px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  cursor: "pointer",
                  width: "100px",
                }}
              >
                AddSale
              </button>
            </Link>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}

        {loading ? (
          <p>Loading...</p>
        ) : sales.length === 0 ? (
          <p>No sales found.</p>
        ) : (
          <div
            style={{
              marginTop: "10px",
              width: "87%",
              marginLeft: "216px",
              marginBottom: "20px",
              height: "400px",
              overflow: "auto",
            }}
          >
            <table
              border="1"
              cellPadding="8"
              cellSpacing="0"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "fixed",
                marginRight: "10px",
              }}
            >
              <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
                <tr style={{ background: "#f0f0f0" }}>
                  <th style={{ width: "80px" }}>Sale ID</th>
                  <th style={{ width: "120px" }}>Date</th>
                  <th style={{ width: "150px" }}>Product Name</th>
                  <th style={{ width: "100px" }}>Quantity</th>
                  <th style={{ width: "100px" }}>Unit Price</th>
                  <th style={{ width: "120px" }}>Total Price</th>
                  <th style={{ width: "150px" }}>Customer</th>
                  <th style={{ width: "120px" }}>Stock Status</th>
                  <th style={{ width: "100px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.saleId}>
                    <td>{sale.saleId}</td>
                    <td>{sale.date}</td>
                    <td>{sale.product ? sale.product.productName : "0"}</td>
                    <td>{sale.quantity}</td>
                    <td>{sale.unitPrice}</td>
                    <td>{sale.totalPrice}</td>
                    <td>{sale.customerName || "0"}</td>
                    <td>{getStockStatus(sale.product)}</td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <button
                          onClick={() => handleUpdateClick(sale)}
                          style={{
                            color: "blue",
                            marginRight: "8px",
                            borderRadius: "10px",
                          }}
                        >
                          Update
                        </button>
                        <button
                          onClick={() => deleteSale(sale.saleId)}
                          style={{ color: "red", borderRadius: "10px" }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ✅ Update Modal */}
        {showModal && currentSale && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                width: "400px",
              }}
            >
              <h3>Update Sale</h3>
              <label>Date:</label>
              <input
                type="date"
                name="date"
                value={currentSale.date || ""}
                onChange={handleUpdateChange}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <label>Customer Name:</label>
              <input
                type="text"
                name="customerName"
                value={currentSale.customerName || ""}
                onChange={handleUpdateChange}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <label>Quantity:</label>
              <input
                type="number"
                name="quantity"
                value={currentSale.quantity || ""}
                onChange={handleUpdateChange}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <label>Unit Price:</label>
              <input
                type="number"
                name="unitPrice"
                value={currentSale.unitPrice || ""}
                onChange={handleUpdateChange}
                style={{ width: "100%", marginBottom: "10px" }}
              />

              <button
                onClick={handleSaveUpdate}
                style={{
                  background: "green",
                  color: "white",
                  padding: "8px 15px",
                  marginRight: "10px",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                Save
              </button>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: "gray",
                  color: "white",
                  padding: "8px 15px",
                  borderRadius: "5px",
                  border: "none",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SaleList;

