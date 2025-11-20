// // // import React, { useEffect, useState } from "react";
// // // import Navigation from "../navigation/Navigation";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const SaleList = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [stocks, setStocks] = useState([]); // ✅ keep stock data
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Filters
// // //   const [saleId, setSaleId] = useState("");
// // //   const [date, setDate] = useState("");
// // //   const [customerName, setCustomerName] = useState("");
// // //   const [productId, setProductId] = useState("");
// // //   const [totalAmount, setTotalAmount] = useState(null);
// // //   const [totalQuantity, setTotalQuantity] = useState(null);

// // //   // Fetch all sales & stocks
// // //   useEffect(() => {
// // //     fetchAllSales();
// // //     fetchStocks();
// // //   }, []);

// // //   const handleResponse = async (response) => {
// // //     if (!response.ok) {
// // //       const text = await response.text();
// // //       throw new Error(text || `Error: ${response.status}`);
// // //     }
// // //     return response.json();
// // //   };

// // //   const fetchAllSales = () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     fetch("http://localhost:8080/api/sales/all-sales")
// // //       .then(handleResponse)
// // //       .then((data) => {
// // //         setSales(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       });
// // //   };

// // //   const fetchStocks = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/stocks/all-stocks")
// // //       .then((res) => setStocks(res.data))
// // //       .catch((err) => console.error("Error fetching stocks:", err));
// // //   };

// // //   // Helper: find stock for a given productId
// // //   const getStockStatus = (product) => {
// // //     if (!product) return "N/A";

// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );

// // //     if (!stock) return "N/A";

// // //     return stock.currentStock > 0 ? (
// // //       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
// // //     ) : (
// // //       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
// // //     );
// // //   };

// // //   const deleteSale = (id) => {
// // //     fetch(`http://localhost:8080/api/sales/${id}`, {
// // //       method: "DELETE",
// // //     })
// // //       .then((response) => {
// // //         if (!response.ok) throw new Error("Failed to delete");
// // //         alert("Sale deleted!");
// // //         fetchAllSales();
// // //       })
// // //       .catch((err) => alert("Error deleting sale: " + err.message));
// // //   };

// // //   return (
// // //     <>
// // //       <Navigation />
// // //       <div style={{ padding: "20px",marginBottom:"200px" }}>
// // //         <div style={{ marginTop: "40px" }}>
// // //           <div style={{ display: "flex", flexDirection: "row" }}>
// // //             <h2 style={{ marginTop: "40px", marginLeft: "790px" }}>
// // //               Sales List
// // //             </h2>
// // //             <Link to="/add-sale">
// // //               <button
// // //                 style={{
// // //                   borderRadius: "10px",
// // //                   marginLeft: "350px",
// // //                   backgroundColor: "#4CAF50",
// // //                   color: "white",
// // //                   padding: "10px 20px",
// // //                   border: "none",
// // //                   cursor: "pointer",
// // //                   width: "100px",
// // //                 }}
// // //               >
// // //                 AddSale
// // //               </button>
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : sales.length === 0 ? (
// // //           <p>No sales found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               marginTop: "10px",
// // //               width: "87%",
// // //               marginLeft: "216px",
// // //               marginBottom: "20px",
// // //               height: "400px",
// // //               overflow: "auto",
// // //             }}
// // //           >
// // //             <table
// // //               border="1"
// // //               cellPadding="8"
// // //               cellSpacing="0"
// // //               style={{
// // //                 borderCollapse: "collapse",
// // //                 width: "100%",
// // //                 tableLayout: "fixed",
// // //                 marginRight: "10px",
// // //               }}
// // //             >
// // //               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
// // //                 <tr style={{ background: "#f0f0f0" }}>
// // //                   <th style={{ width: "80px" }}>Sale ID</th>
// // //                   <th style={{ width: "120px" }}>Date</th>
// // //                   <th style={{ width: "150px" }}>Product Name</th>
// // //                   <th style={{ width: "100px" }}>Quantity</th>
// // //                   <th style={{ width: "100px" }}>Unit Price</th>
// // //                   <th style={{ width: "120px" }}>Total Price</th>
// // //                   <th style={{ width: "150px" }}>Customer</th>
// // //                   <th style={{ width: "120px" }}>Stock Status</th>
// // //                   <th style={{ width: "100px" }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {sales.map((sale) => (
// // //                   <tr key={sale.saleId}>
// // //                     <td>{sale.saleId}</td>
// // //                     <td>{sale.date}</td>
// // //                     <td>{sale.product ? sale.product.productName : "0"}</td>
// // //                     <td>{sale.quantity}</td>
// // //                     <td>{sale.unitPrice}</td>
// // //                     <td>{sale.totalPrice}</td>
// // //                     <td>{sale.customerName || "0"}</td>
// // //                     <td>{getStockStatus(sale.product)}</td>
// // //                     <td>
// // //                       <div style={{ display: "flex", flexDirection: "row" }}>
// // //                         <button
// // //                           onClick={() => alert(`Update sale ${sale.saleId}`)}
// // //                           style={{
// // //                             color: "blue",
// // //                             marginRight: "8px",
// // //                             borderRadius: "10px",
// // //                           }}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => deleteSale(sale.saleId)}
// // //                           style={{ color: "red", borderRadius: "10px" }}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SaleList;
// // // import React, { useEffect, useState } from "react";
// // // import Navigation from "../navigation/Navigation";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const SaleList = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [stocks, setStocks] = useState([]); // ✅ keep stock data
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Modal state
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [currentSale, setCurrentSale] = useState(null);

// // //   // Fetch all sales & stocks
// // //   useEffect(() => {
// // //     fetchAllSales();
// // //     fetchStocks();
// // //   }, []);

// // //   const handleResponse = async (response) => {
// // //     if (!response.ok) {
// // //       const text = await response.text();
// // //       throw new Error(text || `Error: ${response.status}`);
// // //     }
// // //     return response.json();
// // //   };

// // //   const fetchAllSales = () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     fetch("http://localhost:8080/api/sales/all-sales")
// // //       .then(handleResponse)
// // //       .then((data) => {
// // //         setSales(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       });
// // //   };

// // //   const fetchStocks = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/stocks/all-stocks")
// // //       .then((res) => setStocks(res.data))
// // //       .catch((err) => console.error("Error fetching stocks:", err));
// // //   };

// // //   // Helper: find stock for a given productId
// // //   const getStockStatus = (product) => {
// // //     if (!product) return "N/A";

// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );

// // //     if (!stock) return "N/A";

// // //     return stock.currentStock > 0 ? (
// // //       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
// // //     ) : (
// // //       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
// // //     );
// // //   };

// // //   const deleteSale = (id) => {
// // //     fetch(`http://localhost:8080/api/sales/${id}`, {
// // //       method: "DELETE",
// // //     })
// // //       .then((response) => {
// // //         if (!response.ok) throw new Error("Failed to delete");
// // //         alert("Sale deleted!");
// // //         fetchAllSales();
// // //       })
// // //       .catch((err) => alert("Error deleting sale: " + err.message));
// // //   };

// // //   // Open update modal
// // //   const openUpdateModal = (sale) => {
// // //     setCurrentSale({ ...sale });
// // //     setShowModal(true);
// // //   };

// // //   // Handle update form change
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setCurrentSale((prev) => ({
// // //       ...prev,
// // //       [name]: value,
// // //     }));
// // //   };

// // //   // Save update
// // //   const updateSale = () => {
// // //     fetch(`http://localhost:8080/api/sales/${currentSale.saleId}`, {
// // //       method: "PUT",
// // //       headers: { "Content-Type": "application/json" },
// // //       body: JSON.stringify(currentSale),
// // //     })
// // //       .then((res) => {
// // //         if (!res.ok) throw new Error("Failed to update");
// // //         alert("Sale updated!");
// // //         setShowModal(false);
// // //         fetchAllSales();
// // //       })
// // //       .catch((err) => alert("Error updating sale: " + err.message));
// // //   };

// // //   return (
// // //     <>
// // //       <Navigation />
// // //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// // //         <div style={{ marginTop: "40px" }}>
// // //           <div style={{ display: "flex", flexDirection: "row" }}>
// // //             <h2 style={{ marginTop: "40px", marginLeft: "790px" }}>
// // //               Sales List
// // //             </h2>
// // //             <Link to="/add-sale">
// // //               <button
// // //                 style={{
// // //                   borderRadius: "10px",
// // //                   marginLeft: "350px",
// // //                   backgroundColor: "#4CAF50",
// // //                   color: "white",
// // //                   padding: "10px 20px",
// // //                   border: "none",
// // //                   cursor: "pointer",
// // //                   width: "100px",
// // //                 }}
// // //               >
// // //                 AddSale
// // //               </button>
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : sales.length === 0 ? (
// // //           <p>No sales found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               marginTop: "10px",
// // //               width: "87%",
// // //               marginLeft: "216px",
// // //               marginBottom: "20px",
// // //               height: "400px",
// // //               overflow: "auto",
// // //             }}
// // //           >
// // //             <table
// // //               border="1"
// // //               cellPadding="8"
// // //               cellSpacing="0"
// // //               style={{
// // //                 borderCollapse: "collapse",
// // //                 width: "100%",
// // //                 tableLayout: "fixed",
// // //                 marginRight: "10px",
// // //               }}
// // //             >
// // //               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
// // //                 <tr style={{ background: "#f0f0f0" }}>
// // //                   <th style={{ width: "80px" }}>Sale ID</th>
// // //                   <th style={{ width: "120px" }}>Date</th>
// // //                   <th style={{ width: "150px" }}>Product Name</th>
// // //                   <th style={{ width: "100px" }}>Quantity</th>
// // //                   <th style={{ width: "100px" }}>Unit Price</th>
// // //                   <th style={{ width: "120px" }}>Total Price</th>
// // //                   <th style={{ width: "150px" }}>Customer</th>
// // //                   <th style={{ width: "120px" }}>Stock Status</th>
// // //                   <th style={{ width: "100px" }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {sales.map((sale) => (
// // //                   <tr key={sale.saleId}>
// // //                     <td>{sale.saleId}</td>
// // //                     <td>{sale.date}</td>
// // //                     <td>{sale.product ? sale.product.productName : "0"}</td>
// // //                     <td>{sale.quantity}</td>
// // //                     <td>{sale.unitPrice}</td>
// // //                     <td>{sale.totalPrice}</td>
// // //                     <td>{sale.customerName || "0"}</td>
// // //                     <td>{getStockStatus(sale.product)}</td>
// // //                     <td>
// // //                       <div style={{ display: "flex", flexDirection: "row" }}>
// // //                         <button
// // //                           onClick={() => openUpdateModal(sale)}
// // //                           style={{
// // //                             color: "blue",
// // //                             marginRight: "8px",
// // //                             borderRadius: "10px",
// // //                           }}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => deleteSale(sale.saleId)}
// // //                           style={{ color: "red", borderRadius: "10px" }}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* ✅ Update Modal */}
// // //         {showModal && currentSale && (
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: 0,
// // //               left: 0,
// // //               right: 0,
// // //               bottom: 0,
// // //               background: "rgba(0,0,0,0.5)",
// // //               display: "flex",
// // //               justifyContent: "center",
// // //               alignItems: "center",
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 background: "white",
// // //                 padding: "20px",
// // //                 borderRadius: "10px",
// // //                 width: "400px",
// // //               }}
// // //             >
// // //               <h3>Update Sale</h3>
// // //               <label>Date:</label>
// // //               <input
// // //                 type="date"
// // //                 name="date"
// // //                 value={currentSale.date}
// // //                 onChange={handleChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />
// // //               <label>Quantity:</label>
// // //               <input
// // //                 type="number"
// // //                 name="quantity"
// // //                 value={currentSale.quantity}
// // //                 onChange={handleChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />
// // //               <label>Unit Price:</label>
// // //               <input
// // //                 type="number"
// // //                 name="unitPrice"
// // //                 value={currentSale.unitPrice}
// // //                 onChange={handleChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />
// // //               <label>Customer:</label>
// // //               <input
// // //                 type="text"
// // //                 name="customerName"
// // //                 value={currentSale.customerName || ""}
// // //                 onChange={handleChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />

// // //               <div style={{ display: "flex", justifyContent: "flex-end" }}>
// // //                 <button
// // //                   onClick={() => setShowModal(false)}
// // //                   style={{
// // //                     marginRight: "10px",
// // //                     borderRadius: "8px",
// // //                     background: "gray",
// // //                     color: "white",
// // //                   }}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   onClick={updateSale}
// // //                   style={{
// // //                     borderRadius: "8px",
// // //                     background: "green",
// // //                     color: "white",
// // //                   }}
// // //                 >
// // //                   Save
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SaleList;

// // // import React, { useEffect, useState } from "react";
// // // import Navigation from "../navigation/Navigation";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const SaleList = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [stocks, setStocks] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Modal state
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [currentSale, setCurrentSale] = useState(null);

// // //   useEffect(() => {
// // //     fetchAllSales();
// // //     fetchStocks();
// // //   }, []);

// // //   const handleResponse = async (response) => {
// // //     if (!response.ok) {
// // //       const text = await response.text();
// // //       throw new Error(text || `Error: ${response.status}`);
// // //     }
// // //     return response.json();
// // //   };

// // //   const fetchAllSales = () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     fetch("http://localhost:8080/api/sales/all-sales")
// // //       .then(handleResponse)
// // //       .then((data) => {
// // //         setSales(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       });
// // //   };

// // //   const fetchStocks = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/stocks/all-stocks")
// // //       .then((res) => setStocks(res.data))
// // //       .catch((err) => console.error("Error fetching stocks:", err));
// // //   };

// // //   const getStockStatus = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     if (!stock) return "N/A";
// // //     return stock.currentStock > 0 ? (
// // //       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
// // //     ) : (
// // //       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
// // //     );
// // //   };

// // //   const deleteSale = (id) => {
// // //     fetch(`http://localhost:8080/api/sales/${id}`, {
// // //       method: "DELETE",
// // //     })
// // //       .then((response) => {
// // //         if (!response.ok) throw new Error("Failed to delete");
// // //         alert("Sale deleted!");
// // //         fetchAllSales();
// // //       })
// // //       .catch((err) => alert("Error deleting sale: " + err.message));
// // //   };

// // //   const handleUpdateClick = (sale) => {
// // //     setCurrentSale({ ...sale }); // clone to edit
// // //     setShowModal(true);
// // //   };

// // //   const handleUpdateChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSaveUpdate = () => {
// // //     if (!currentSale) return;
// // //     axios
// // //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, currentSale)
// // //       .then(() => {
// // //         alert("Sale updated successfully!");
// // //         setShowModal(false);
// // //         fetchAllSales();
// // //       })
// // //       .catch((err) => {
// // //         alert("Error updating sale: " + err.message);
// // //       });
// // //   };

// // //   return (
// // //     <>
// // //       <Navigation />
// // //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// // //         <div style={{ marginTop: "40px" }}>
// // //           <div style={{ display: "flex", flexDirection: "row" }}>
// // //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// // //               Sales List
// // //             </h2>
// // //             <Link to="/add-sale">
// // //               <button
// // //                 style={{
// // //                   borderRadius: "10px",
// // //                   marginLeft: "350px",
// // //                   backgroundColor: "#4CAF50",
// // //                   color: "white",
// // //                   padding: "10px 20px",
// // //                   border: "none",
// // //                   cursor: "pointer",
// // //                   width: "100px",
// // //                 }}
// // //               >
// // //                 AddSale
// // //               </button>
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : sales.length === 0 ? (
// // //           <p>No sales found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               marginTop: "10px",
// // //               width: "87%",
// // //               marginLeft: "216px",
// // //               marginBottom: "20px",
// // //               height: "400px",
// // //               overflow: "auto",
// // //             }}
// // //           >
// // //             <table
// // //               border="1"
// // //               cellPadding="8"
// // //               cellSpacing="0"
// // //               style={{
// // //                 borderCollapse: "collapse",
// // //                 width: "100%",
// // //                 tableLayout: "fixed",
// // //                 marginRight: "10px",
// // //               }}
// // //             >
// // //               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
// // //                 <tr style={{ background: "#f0f0f0" }}>
// // //                   <th style={{ width: "80px" }}>Sale ID</th>
// // //                   <th style={{ width: "120px" }}>Date</th>
// // //                   <th style={{ width: "150px" }}>Product Name</th>
// // //                   <th style={{ width: "100px" }}>Quantity</th>
// // //                   <th style={{ width: "100px" }}>Unit Price</th>
// // //                   <th style={{ width: "120px" }}>Total Price</th>
// // //                   <th style={{ width: "150px" }}>Customer</th>
// // //                   <th style={{ width: "120px" }}>Stock Status</th>
// // //                   <th style={{ width: "100px" }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {sales.map((sale) => (
// // //                   <tr key={sale.saleId}>
// // //                     <td>{sale.saleId}</td>
// // //                     <td>{sale.date}</td>
// // //                     <td>{sale.product ? sale.product.productName : "0"}</td>
// // //                     <td>{sale.quantity}</td>
// // //                     <td>{sale.unitPrice}</td>
// // //                     <td>{sale.totalPrice}</td>
// // //                     <td>{sale.customerName || "0"}</td>
// // //                     <td>{getStockStatus(sale.product)}</td>
// // //                     <td>
// // //                       <div style={{ display: "flex", flexDirection: "row" }}>
// // //                         <button
// // //                           onClick={() => handleUpdateClick(sale)}
// // //                           style={{
// // //                             color: "blue",
// // //                             marginRight: "8px",
// // //                             borderRadius: "10px",
// // //                           }}
// // //                         >
// // //                           Update
// // //                         </button>
// // //                         <button
// // //                           onClick={() => deleteSale(sale.saleId)}
// // //                           style={{ color: "red", borderRadius: "10px" }}
// // //                         >
// // //                           Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* ✅ Update Modal */}
// // //         {showModal && currentSale && (
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: 0,
// // //               left: 0,
// // //               width: "100%",
// // //               height: "100%",
// // //               background: "rgba(0,0,0,0.5)",
// // //               display: "flex",
// // //               justifyContent: "center",
// // //               alignItems: "center",
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 background: "white",
// // //                 padding: "20px",
// // //                 borderRadius: "10px",
// // //                 width: "400px",
// // //               }}
// // //             >
// // //               <h3>Update Sale</h3>
// // //               <label>Date:</label>
// // //               <input
// // //                 type="date"
// // //                 name="date"
// // //                 value={currentSale.date || ""}
// // //                 onChange={handleUpdateChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />

// // //               <label>Customer Name:</label>
// // //               <input
// // //                 type="text"
// // //                 name="customerName"
// // //                 value={currentSale.customerName || ""}
// // //                 onChange={handleUpdateChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />

// // //               <label>Quantity:</label>
// // //               <input
// // //                 type="number"
// // //                 name="quantity"
// // //                 value={currentSale.quantity || ""}
// // //                 onChange={handleUpdateChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />

// // //               <label>Unit Price:</label>
// // //               <input
// // //                 type="number"
// // //                 name="unitPrice"
// // //                 value={currentSale.unitPrice || ""}
// // //                 onChange={handleUpdateChange}
// // //                 style={{ width: "100%", marginBottom: "10px" }}
// // //               />

// // //               <button
// // //                 onClick={handleSaveUpdate}
// // //                 style={{
// // //                   background: "green",
// // //                   color: "white",
// // //                   padding: "8px 15px",
// // //                   marginRight: "10px",
// // //                   borderRadius: "5px",
// // //                   border: "none",
// // //                 }}
// // //               >
// // //                 Save
// // //               </button>
// // //               <button
// // //                 onClick={() => setShowModal(false)}
// // //                 style={{
// // //                   background: "gray",
// // //                   color: "white",
// // //                   padding: "8px 15px",
// // //                   borderRadius: "5px",
// // //                   border: "none",
// // //                 }}
// // //               >
// // //                 Cancel
// // //               </button>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SaleList;

// // // import React, { useEffect, useState } from "react";
// // // import Navigation from "../navigation/Navigation";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const SaleList = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [stocks, setStocks] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Modal state
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [currentSale, setCurrentSale] = useState(null);

// // //   useEffect(() => {
// // //     fetchAllSales();
// // //     fetchStocks();
// // //   }, []);

// // //   const handleResponse = async (response) => {
// // //     if (!response.ok) {
// // //       const text = await response.text();
// // //       throw new Error(text || `Error: ${response.status}`);
// // //     }
// // //     return response.json();
// // //   };

// // //   const fetchAllSales = () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     fetch("http://localhost:8080/api/sales/all-sales")
// // //       .then(handleResponse)
// // //       .then((data) => {
// // //         setSales(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       });
// // //   };

// // //   const fetchStocks = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/stocks/all-stocks")
// // //       .then((res) => setStocks(res.data))
// // //       .catch((err) => console.error("Error fetching stocks:", err));
// // //   };

// // //   // Updated stock status function to match new stock structure
// // //   const getStockStatus = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     if (!stock) return "N/A";
    
// // //     // Use the new status field from stock
// // //     const statusStyle = {
// // //       'Sold Out': { color: "red", fontWeight: "bold" },
// // //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// // //       'In Stock': { color: "green", fontWeight: "bold" }
// // //     };
    
// // //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// // //     return <span style={style}>{stock.status || 'N/A'}</span>;
// // //   };

// // //   // Updated to show current stock quantity
// // //   const getCurrentStockQuantity = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     return stock ? stock.currentStock : "N/A";
// // //   };

// // //   const deleteSale = (id) => {
// // //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// // //     fetch(`http://localhost:8080/api/sales/${id}`, {
// // //       method: "DELETE",
// // //     })
// // //       .then((response) => {
// // //         if (!response.ok) throw new Error("Failed to delete");
// // //         alert("Sale deleted successfully!");
// // //         fetchAllSales();
// // //         fetchStocks(); // Refresh stocks to update quantities
// // //       })
// // //       .catch((err) => alert("Error deleting sale: " + err.message));
// // //   };

// // //   const handleUpdateClick = (sale) => {
// // //     setCurrentSale({ 
// // //       ...sale,
// // //       date: sale.date || ''
// // //     });
// // //     setShowModal(true);
// // //   };

// // //   const handleUpdateChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSaveUpdate = () => {
// // //     if (!currentSale) return;
    
// // //     // Recalculate total price before sending
// // //     const updatedSale = {
// // //       ...currentSale,
// // //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// // //     };

// // //     axios
// // //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// // //       .then(() => {
// // //         alert("Sale updated successfully!");
// // //         setShowModal(false);
// // //         fetchAllSales();
// // //         fetchStocks(); // Refresh stocks to update quantities
// // //       })
// // //       .catch((err) => {
// // //         alert("Error updating sale: " + err.message);
// // //       });
// // //   };

// // //   return (
// // //     <>
// // //       <Navigation />
// // //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// // //         <div style={{ marginTop: "40px" }}>
// // //           <div style={{ display: "flex", flexDirection: "row" }}>
// // //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// // //               Sales List
// // //             </h2>
// // //             <Link to="/add-sale">
// // //               <button
// // //                 style={{
// // //                   borderRadius: "10px",
// // //                   marginLeft: "350px",
// // //                   backgroundColor: "#4CAF50",
// // //                   color: "white",
// // //                   padding: "10px 20px",
// // //                   border: "none",
// // //                   cursor: "pointer",
// // //                   width: "100px",
// // //                 }}
// // //               >
// // //                 Add Sale
// // //               </button>
// // //             </Link>
// // //           </div>
// // //         </div>

// // //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : sales.length === 0 ? (
// // //           <p>No sales found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               marginTop: "10px",
// // //               width: "87%",
// // //               marginLeft: "216px",
// // //               marginBottom: "20px",
// // //               height: "400px",
// // //               overflow: "auto",
// // //             }}
// // //           >
// // //             <table
// // //               border="1"
// // //               cellPadding="8"
// // //               cellSpacing="0"
// // //               style={{
// // //                 borderCollapse: "collapse",
// // //                 width: "100%",
// // //                 tableLayout: "fixed",
// // //                 marginRight: "10px",
// // //               }}
// // //             >
// // //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// // //                 <tr>
// // //                   <th style={{ width: "80px" }}>Sale ID</th>
// // //                   <th style={{ width: "120px" }}>Date</th>
// // //                   <th style={{ width: "150px" }}>Product Name</th>
// // //                   <th style={{ width: "100px" }}>Quantity</th>
// // //                   <th style={{ width: "100px" }}>Unit Price</th>
// // //                   <th style={{ width: "120px" }}>Total Price</th>
// // //                   <th style={{ width: "150px" }}>Customer</th>
// // //                   <th style={{ width: "120px" }}>Stock Status</th>
// // //                   <th style={{ width: "100px" }}>Current Stock</th>
// // //                   <th style={{ width: "120px" }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {sales.map((sale) => (
// // //                   <tr key={sale.saleId}>
// // //                     <td>{sale.saleId}</td>
// // //                     <td>{sale.date}</td>
// // //                     <td>{sale.product ? sale.product.productName : "N/A"}</td>
// // //                     <td>{sale.quantity}</td>
// // //                     <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// // //                     <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// // //                     <td>{sale.customerName || "Walk-in"}</td>
// // //                     <td>{getStockStatus(sale.product)}</td>
// // //                     <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// // //                     <td>
// // //                       <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// // //                         <button
// // //                           onClick={() => handleUpdateClick(sale)}
// // //                           style={{
// // //                             background: "#007bff",
// // //                             color: "white",
// // //                             padding: "5px 10px",
// // //                             borderRadius: "5px",
// // //                             border: "none",
// // //                             cursor: "pointer",
// // //                             fontSize: "12px"
// // //                           }}
// // //                         >
// // //                           ✏️ Edit
// // //                         </button>
// // //                         <button
// // //                           onClick={() => deleteSale(sale.saleId)}
// // //                           style={{
// // //                             background: "#dc3545",
// // //                             color: "white",
// // //                             padding: "5px 10px",
// // //                             borderRadius: "5px",
// // //                             border: "none",
// // //                             cursor: "pointer",
// // //                             fontSize: "12px"
// // //                           }}
// // //                         >
// // //                           🗑️ Delete
// // //                         </button>
// // //                       </div>
// // //                     </td>
// // //                   </tr>
// // //                 ))}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* ✅ Update Modal */}
// // //         {showModal && currentSale && (
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: 0,
// // //               left: 0,
// // //               width: "100%",
// // //               height: "100%",
// // //               background: "rgba(0,0,0,0.5)",
// // //               display: "flex",
// // //               justifyContent: "center",
// // //               alignItems: "center",
// // //               zIndex: 1000
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 background: "white",
// // //                 padding: "25px",
// // //                 borderRadius: "15px",
// // //                 width: "450px",
// // //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// // //               }}
// // //             >
// // //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// // //                 ✏️ Update Sale
// // //               </h3>
              
// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// // //                 <input
// // //                   type="date"
// // //                   name="date"
// // //                   value={currentSale.date || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   name="customerName"
// // //                   value={currentSale.customerName || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="quantity"
// // //                   min="1"
// // //                   value={currentSale.quantity || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "20px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="unitPrice"
// // //                   min="0"
// // //                   step="0.01"
// // //                   value={currentSale.unitPrice || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ textAlign: "center" }}>
// // //                 <button
// // //                   onClick={handleSaveUpdate}
// // //                   style={{
// // //                     background: "#28a745",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     marginRight: "10px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   💾 Save Changes
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setShowModal(false)}
// // //                   style={{
// // //                     background: "#6c757d",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   ❌ Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SaleList;

// // // import React, { useEffect, useState } from "react";
// // // import Navigation from "../navigation/Navigation";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const SaleList = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [stocks, setStocks] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Modal state
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [currentSale, setCurrentSale] = useState(null);

// // //   useEffect(() => {
// // //     fetchAllSales();
// // //     fetchStocks();
// // //   }, []);

// // //   const handleResponse = async (response) => {
// // //     if (!response.ok) {
// // //       const text = await response.text();
// // //       throw new Error(text || `Error: ${response.status}`);
// // //     }
// // //     return response.json();
// // //   };

// // //   const fetchAllSales = () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     fetch("http://localhost:8080/api/sales/all-sales")
// // //       .then(handleResponse)
// // //       .then((data) => {
// // //         setSales(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       });
// // //   };

// // //   const fetchStocks = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/stocks/all-stocks")
// // //       .then((res) => setStocks(res.data))
// // //       .catch((err) => console.error("Error fetching stocks:", err));
// // //   };

// // //   // Calculate profit for each sale
// // //   const calculateSaleProfit = (sale) => {
// // //     if (!sale.product) return 0;
    
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === sale.product.productId
// // //     );
    
// // //     if (!stock) return 0;
    
// // //     const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
// // //     const sellingPrice = parseFloat(sale.unitPrice) || 0;
// // //     const quantity = parseFloat(sale.quantity) || 0;
    
// // //     return (sellingPrice - buyingPrice) * quantity;
// // //   };

// // //   // Calculate total profit across all sales
// // //   const calculateTotalProfit = () => {
// // //     return sales.reduce((total, sale) => {
// // //       return total + calculateSaleProfit(sale);
// // //     }, 0);
// // //   };

// // //   // Get buying price for a product
// // //   const getBuyingPrice = (product) => {
// // //     if (!product) return 0;
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// // //   };

// // //   const getStockStatus = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     if (!stock) return "N/A";
    
// // //     const statusStyle = {
// // //       'Sold Out': { color: "red", fontWeight: "bold" },
// // //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// // //       'In Stock': { color: "green", fontWeight: "bold" }
// // //     };
    
// // //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// // //     return <span style={style}>{stock.status || 'N/A'}</span>;
// // //   };

// // //   const getCurrentStockQuantity = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     return stock ? stock.currentStock : "N/A";
// // //   };

// // //   const deleteSale = (id) => {
// // //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// // //     fetch(`http://localhost:8080/api/sales/${id}`, {
// // //       method: "DELETE",
// // //     })
// // //       .then((response) => {
// // //         if (!response.ok) throw new Error("Failed to delete");
// // //         alert("Sale deleted successfully!");
// // //         fetchAllSales();
// // //         fetchStocks();
// // //       })
// // //       .catch((err) => alert("Error deleting sale: " + err.message));
// // //   };

// // //   const handleUpdateClick = (sale) => {
// // //     setCurrentSale({ 
// // //       ...sale,
// // //       date: sale.date || ''
// // //     });
// // //     setShowModal(true);
// // //   };

// // //   const handleUpdateChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSaveUpdate = () => {
// // //     if (!currentSale) return;
    
// // //     const updatedSale = {
// // //       ...currentSale,
// // //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// // //     };

// // //     axios
// // //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// // //       .then(() => {
// // //         alert("Sale updated successfully!");
// // //         setShowModal(false);
// // //         fetchAllSales();
// // //         fetchStocks();
// // //       })
// // //       .catch((err) => {
// // //         alert("Error updating sale: " + err.message);
// // //       });
// // //   };

// // //   return (
// // //     <>
// // //       <Navigation />
// // //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// // //         <div style={{ marginTop: "40px" }}>
// // //           <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
// // //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// // //               Sales List
// // //             </h2>
// // //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// // //               <div style={{
// // //                 backgroundColor: "#f8f9fa",
// // //                 padding: "10px 20px",
// // //                 borderRadius: "10px",
// // //                 border: "2px solid #28a745",
// // //                 fontWeight: "bold",
// // //                 color: "#28a745"
// // //               }}>
// // //                 Total Profit: ${calculateTotalProfit().toFixed(2)}
// // //               </div>
// // //               <Link to="/add-sale">
// // //                 <button
// // //                   style={{
// // //                     borderRadius: "10px",
// // //                     backgroundColor: "#4CAF50",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     width: "100px",
// // //                   }}
// // //                 >
// // //                   Add Sale
// // //                 </button>
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : sales.length === 0 ? (
// // //           <p>No sales found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               marginTop: "10px",
// // //               width: "87%",
// // //               marginLeft: "216px",
// // //               marginBottom: "20px",
// // //               height: "400px",
// // //               overflow: "auto",
// // //             }}
// // //           >
// // //             <table
// // //               border="1"
// // //               cellPadding="8"
// // //               cellSpacing="0"
// // //               style={{
// // //                 borderCollapse: "collapse",
// // //                 width: "100%",
// // //                 tableLayout: "fixed",
// // //                 marginRight: "10px",
// // //               }}
// // //             >
// // //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// // //                 <tr>
// // //                   <th style={{ width: "80px" }}>Sale ID</th>
// // //                   <th style={{ width: "120px" }}>Date</th>
// // //                   <th style={{ width: "150px" }}>Product Name</th>
// // //                   <th style={{ width: "100px" }}>Quantity</th>
// // //                   <th style={{ width: "100px" }}>Unit Price</th>
// // //                   <th style={{ width: "100px" }}>Buying Price</th>
// // //                   <th style={{ width: "120px" }}>Total Price</th>
// // //                   <th style={{ width: "120px" }}>Profit</th>
// // //                   <th style={{ width: "150px" }}>Customer</th>
// // //                   <th style={{ width: "120px" }}>Stock Status</th>
// // //                   <th style={{ width: "100px" }}>Current Stock</th>
// // //                   <th style={{ width: "120px" }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {sales.map((sale) => {
// // //                   const profit = calculateSaleProfit(sale);
// // //                   const buyingPrice = getBuyingPrice(sale.product);
                  
// // //                   return (
// // //                     <tr key={sale.saleId}>
// // //                       <td>{sale.saleId}</td>
// // //                       <td>{sale.date}</td>
// // //                       <td>{sale.product ? sale.product.productName : "N/A"}</td>
// // //                       <td>{sale.quantity}</td>
// // //                       <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// // //                       <td>${buyingPrice.toFixed(2)}</td>
// // //                       <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// // //                       <td style={{ 
// // //                         fontWeight: "bold", 
// // //                         color: profit >= 0 ? "green" : "red" 
// // //                       }}>
// // //                         ${profit.toFixed(2)}
// // //                       </td>
// // //                       <td>{sale.customerName || "Walk-in"}</td>
// // //                       <td>{getStockStatus(sale.product)}</td>
// // //                       <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// // //                       <td>
// // //                         <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// // //                           <button
// // //                             onClick={() => handleUpdateClick(sale)}
// // //                             style={{
// // //                               background: "#007bff",
// // //                               color: "white",
// // //                               padding: "5px 10px",
// // //                               borderRadius: "5px",
// // //                               border: "none",
// // //                               cursor: "pointer",
// // //                               fontSize: "12px"
// // //                             }}
// // //                           >
// // //                             ✏️ Edit
// // //                           </button>
// // //                           <button
// // //                             onClick={() => deleteSale(sale.saleId)}
// // //                             style={{
// // //                               background: "#dc3545",
// // //                               color: "white",
// // //                               padding: "5px 10px",
// // //                               borderRadius: "5px",
// // //                               border: "none",
// // //                               cursor: "pointer",
// // //                               fontSize: "12px"
// // //                             }}
// // //                           >
// // //                             🗑️ Delete
// // //                           </button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* Update Modal - Add buying price display */}
// // //         {showModal && currentSale && (
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: 0,
// // //               left: 0,
// // //               width: "100%",
// // //               height: "100%",
// // //               background: "rgba(0,0,0,0.5)",
// // //               display: "flex",
// // //               justifyContent: "center",
// // //               alignItems: "center",
// // //               zIndex: 1000
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 background: "white",
// // //                 padding: "25px",
// // //                 borderRadius: "15px",
// // //                 width: "450px",
// // //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// // //               }}
// // //             >
// // //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// // //                 ✏️ Update Sale
// // //               </h3>
              
// // //               {/* Show buying price information */}
// // //               <div style={{ 
// // //                 marginBottom: "15px", 
// // //                 padding: "10px", 
// // //                 backgroundColor: "#f8f9fa", 
// // //                 borderRadius: "8px",
// // //                 border: "1px solid #e9ecef"
// // //               }}>
// // //                 <div style={{ fontWeight: "bold", color: "#495057" }}>
// // //                   Product: {currentSale.product?.productName || "N/A"}
// // //                 </div>
// // //                 <div style={{ color: "#6c757d", fontSize: "14px" }}>
// // //                   Buying Price: ${getBuyingPrice(currentSale.product).toFixed(2)}
// // //                 </div>
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// // //                 <input
// // //                   type="date"
// // //                   name="date"
// // //                   value={currentSale.date || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   name="customerName"
// // //                   value={currentSale.customerName || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="quantity"
// // //                   min="1"
// // //                   value={currentSale.quantity || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "20px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="unitPrice"
// // //                   min="0"
// // //                   step="0.01"
// // //                   value={currentSale.unitPrice || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ textAlign: "center" }}>
// // //                 <button
// // //                   onClick={handleSaveUpdate}
// // //                   style={{
// // //                     background: "#28a745",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     marginRight: "10px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   💾 Save Changes
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setShowModal(false)}
// // //                   style={{
// // //                     background: "#6c757d",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   ❌ Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SaleList;

// // // import React, { useEffect, useState } from "react";
// // // import Navigation from "../navigation/Navigation";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const SaleList = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [stocks, setStocks] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Modal state
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [currentSale, setCurrentSale] = useState(null);

// // //   useEffect(() => {
// // //     fetchAllSales();
// // //     fetchStocks();
// // //   }, []);

// // //   const handleResponse = async (response) => {
// // //     if (!response.ok) {
// // //       const text = await response.text();
// // //       throw new Error(text || `Error: ${response.status}`);
// // //     }
// // //     return response.json();
// // //   };

// // //   const fetchAllSales = () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     fetch("http://localhost:8080/api/sales/all-sales")
// // //       .then(handleResponse)
// // //       .then((data) => {
// // //         setSales(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       });
// // //   };

// // //   const fetchStocks = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/stocks/all-stocks")
// // //       .then((res) => setStocks(res.data))
// // //       .catch((err) => console.error("Error fetching stocks:", err));
// // //   };

// // //   // FIXED: Calculate profit for each sale - UPDATED LOGIC
// // //   const calculateSaleProfit = (sale) => {
// // //     try {
// // //       if (!sale.product) return 0;
      
// // //       // Use the sale's original purchase price if available (most accurate)
// // //       if (sale.purchasePrice !== undefined && sale.purchasePrice !== null) {
// // //         const purchasePrice = parseFloat(sale.purchasePrice) || 0;
// // //         const sellingPrice = parseFloat(sale.unitPrice) || 0;
// // //         const quantity = parseFloat(sale.quantity) || 0;
        
// // //         return (sellingPrice - purchasePrice) * quantity;
// // //       }
      
// // //       // Fallback: Use current stock price (less accurate but better than nothing)
// // //       const stock = stocks.find(
// // //         (s) => s.product && s.product.productId === sale.product.productId
// // //       );
      
// // //       if (!stock) return 0;
      
// // //       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
// // //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
// // //       const quantity = parseFloat(sale.quantity) || 0;
      
// // //       // Ensure we don't calculate negative profit per unit
// // //       const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
// // //       return profitPerUnit * quantity;
// // //     } catch (error) {
// // //       console.error('Error calculating profit for sale:', sale.saleId, error);
// // //       return 0;
// // //     }
// // //   };

// // //   // Calculate total profit across all sales
// // //   const calculateTotalProfit = () => {
// // //     return sales.reduce((total, sale) => {
// // //       return total + calculateSaleProfit(sale);
// // //     }, 0);
// // //   };

// // //   // Calculate total revenue
// // //   const calculateTotalRevenue = () => {
// // //     return sales.reduce((total, sale) => {
// // //       return total + (parseFloat(sale.totalPrice) || 0);
// // //     }, 0);
// // //   };

// // //   // Get buying price for a product - IMPROVED
// // //   const getBuyingPrice = (sale) => {
// // //     try {
// // //       // First try to get the original purchase price from sale data
// // //       if (sale.purchasePrice !== undefined && sale.purchasePrice !== null) {
// // //         return parseFloat(sale.purchasePrice) || 0;
// // //       }
      
// // //       // Fallback to current stock price
// // //       if (!sale.product) return 0;
// // //       const stock = stocks.find(
// // //         (s) => s.product && s.product.productId === sale.product.productId
// // //       );
// // //       return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// // //     } catch (error) {
// // //       return 0;
// // //     }
// // //   };

// // //   const getStockStatus = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     if (!stock) return "N/A";
    
// // //     const statusStyle = {
// // //       'Sold Out': { color: "red", fontWeight: "bold" },
// // //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// // //       'In Stock': { color: "green", fontWeight: "bold" }
// // //     };
    
// // //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// // //     return <span style={style}>{stock.status || 'N/A'}</span>;
// // //   };

// // //   const getCurrentStockQuantity = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     return stock ? stock.currentStock : "N/A";
// // //   };

// // //   const deleteSale = (id) => {
// // //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// // //     fetch(`http://localhost:8080/api/sales/${id}`, {
// // //       method: "DELETE",
// // //     })
// // //       .then((response) => {
// // //         if (!response.ok) throw new Error("Failed to delete");
// // //         alert("Sale deleted successfully!");
// // //         fetchAllSales();
// // //         fetchStocks();
// // //       })
// // //       .catch((err) => alert("Error deleting sale: " + err.message));
// // //   };

// // //   const handleUpdateClick = (sale) => {
// // //     setCurrentSale({ 
// // //       ...sale,
// // //       date: sale.date || ''
// // //     });
// // //     setShowModal(true);
// // //   };

// // //   const handleUpdateChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSaveUpdate = () => {
// // //     if (!currentSale) return;
    
// // //     const updatedSale = {
// // //       ...currentSale,
// // //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// // //     };

// // //     axios
// // //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// // //       .then(() => {
// // //         alert("Sale updated successfully!");
// // //         setShowModal(false);
// // //         fetchAllSales();
// // //         fetchStocks();
// // //       })
// // //       .catch((err) => {
// // //         alert("Error updating sale: " + err.message);
// // //       });
// // //   };

// // //   // Calculate profit margin percentage
// // //   const calculateProfitMargin = (sale) => {
// // //     try {
// // //       const buyingPrice = getBuyingPrice(sale);
// // //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
      
// // //       if (buyingPrice <= 0) return 0;
      
// // //       const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
// // //       return Math.max(0, margin);
// // //     } catch (error) {
// // //       return 0;
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Navigation />
// // //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// // //         <div style={{ marginTop: "40px" }}>
// // //           <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
// // //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// // //               Sales List
// // //             </h2>
// // //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// // //               {/* Summary Cards */}
// // //               <div style={{ display: 'flex', gap: '15px' }}>
// // //                 <div style={{
// // //                   backgroundColor: "#e7f3ff",
// // //                   padding: "10px 15px",
// // //                   borderRadius: "10px",
// // //                   border: "2px solid #007bff",
// // //                   fontWeight: "bold",
// // //                   color: "#007bff",
// // //                   textAlign: 'center'
// // //                 }}>
// // //                   <div style={{ fontSize: '12px' }}>Total Revenue</div>
// // //                   <div>${calculateTotalRevenue().toFixed(2)}</div>
// // //                 </div>
// // //                 <div style={{
// // //                   backgroundColor: "#d4edda",
// // //                   padding: "10px 15px",
// // //                   borderRadius: "10px",
// // //                   border: "2px solid #28a745",
// // //                   fontWeight: "bold",
// // //                   color: "#28a745",
// // //                   textAlign: 'center'
// // //                 }}>
// // //                   <div style={{ fontSize: '12px' }}>Total Profit</div>
// // //                   <div>${calculateTotalProfit().toFixed(2)}</div>
// // //                 </div>
// // //                 <div style={{
// // //                   backgroundColor: "#fff3cd",
// // //                   padding: "10px 15px",
// // //                   borderRadius: "10px",
// // //                   border: "2px solid #ffc107",
// // //                   fontWeight: "bold",
// // //                   color: "#856404",
// // //                   textAlign: 'center'
// // //                 }}>
// // //                   <div style={{ fontSize: '12px' }}>Total Sales</div>
// // //                   <div>{sales.length}</div>
// // //                 </div>
// // //               </div>
              
// // //               <Link to="/add-sale">
// // //                 <button
// // //                   style={{
// // //                     borderRadius: "10px",
// // //                     backgroundColor: "#4CAF50",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     width: "100px",
// // //                   }}
// // //                 >
// // //                   Add Sale
// // //                 </button>
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : sales.length === 0 ? (
// // //           <p>No sales found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               marginTop: "10px",
// // //               width: "87%",
// // //               marginLeft: "216px",
// // //               marginBottom: "20px",
// // //               height: "400px",
// // //               overflow: "auto",
// // //             }}
// // //           >
// // //             <table
// // //               border="1"
// // //               cellPadding="8"
// // //               cellSpacing="0"
// // //               style={{
// // //                 borderCollapse: "collapse",
// // //                 width: "100%",
// // //                 tableLayout: "fixed",
// // //                 marginRight: "10px",
// // //               }}
// // //             >
// // //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// // //                 <tr>
// // //                   <th style={{ width: "80px" }}>Sale ID</th>
// // //                   <th style={{ width: "120px" }}>Date</th>
// // //                   <th style={{ width: "150px" }}>Product Name</th>
// // //                   <th style={{ width: "100px" }}>Quantity</th>
// // //                   <th style={{ width: "100px" }}>Unit Price</th>
// // //                   <th style={{ width: "100px" }}>Buying Price</th>
// // //                   <th style={{ width: "120px" }}>Total Price</th>
// // //                   <th style={{ width: "100px" }}>Profit</th>
// // //                   <th style={{ width: "80px" }}>Margin</th>
// // //                   <th style={{ width: "150px" }}>Customer</th>
// // //                   <th style={{ width: "120px" }}>Stock Status</th>
// // //                   <th style={{ width: "100px" }}>Current Stock</th>
// // //                   <th style={{ width: "120px" }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {sales.map((sale) => {
// // //                   const profit = calculateSaleProfit(sale);
// // //                   const buyingPrice = getBuyingPrice(sale);
// // //                   const profitMargin = calculateProfitMargin(sale);
// // //                   const profitColor = profit > 0 ? "green" : profit < 0 ? "red" : "#6c757d";
// // //                   const marginColor = profitMargin > 50 ? "green" : profitMargin > 20 ? "#17a2b8" : profitMargin > 0 ? "#ffc107" : "red";
                  
// // //                   return (
// // //                     <tr key={sale.saleId}>
// // //                       <td>{sale.saleId}</td>
// // //                       <td>{sale.date}</td>
// // //                       <td>{sale.product ? sale.product.productName : "N/A"}</td>
// // //                       <td>{sale.quantity}</td>
// // //                       <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// // //                       <td>${buyingPrice.toFixed(2)}</td>
// // //                       <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// // //                       <td style={{ 
// // //                         fontWeight: "bold", 
// // //                         color: profitColor
// // //                       }}>
// // //                         ${profit.toFixed(2)}
// // //                       </td>
// // //                       <td style={{ 
// // //                         fontWeight: "bold", 
// // //                         color: marginColor,
// // //                         fontSize: "12px"
// // //                       }}>
// // //                         {profitMargin.toFixed(1)}%
// // //                       </td>
// // //                       <td>{sale.customerName || "Walk-in"}</td>
// // //                       <td>{getStockStatus(sale.product)}</td>
// // //                       <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// // //                       <td>
// // //                         <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// // //                           <button
// // //                             onClick={() => handleUpdateClick(sale)}
// // //                             style={{
// // //                               background: "#007bff",
// // //                               color: "white",
// // //                               padding: "5px 10px",
// // //                               borderRadius: "5px",
// // //                               border: "none",
// // //                               cursor: "pointer",
// // //                               fontSize: "12px"
// // //                             }}
// // //                           >
// // //                             ✏️ Edit
// // //                           </button>
// // //                           <button
// // //                             onClick={() => deleteSale(sale.saleId)}
// // //                             style={{
// // //                               background: "#dc3545",
// // //                               color: "white",
// // //                               padding: "5px 10px",
// // //                               borderRadius: "5px",
// // //                               border: "none",
// // //                               cursor: "pointer",
// // //                               fontSize: "12px"
// // //                             }}
// // //                           >
// // //                             🗑️ Delete
// // //                           </button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* Update Modal - Add buying price display */}
// // //         {showModal && currentSale && (
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: 0,
// // //               left: 0,
// // //               width: "100%",
// // //               height: "100%",
// // //               background: "rgba(0,0,0,0.5)",
// // //               display: "flex",
// // //               justifyContent: "center",
// // //               alignItems: "center",
// // //               zIndex: 1000
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 background: "white",
// // //                 padding: "25px",
// // //                 borderRadius: "15px",
// // //                 width: "450px",
// // //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// // //               }}
// // //             >
// // //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// // //                 ✏️ Update Sale
// // //               </h3>
              
// // //               {/* Show buying price information */}
// // //               <div style={{ 
// // //                 marginBottom: "15px", 
// // //                 padding: "10px", 
// // //                 backgroundColor: "#f8f9fa", 
// // //                 borderRadius: "8px",
// // //                 border: "1px solid #e9ecef"
// // //               }}>
// // //                 <div style={{ fontWeight: "bold", color: "#495057" }}>
// // //                   Product: {currentSale.product?.productName || "N/A"}
// // //                 </div>
// // //                 <div style={{ color: "#6c757d", fontSize: "14px" }}>
// // //                   Buying Price: ${getBuyingPrice(currentSale).toFixed(2)}
// // //                 </div>
// // //                 <div style={{ color: "#6c757d", fontSize: "12px", fontStyle: "italic" }}>
// // //                   {currentSale.purchasePrice ? "Original purchase price" : "Current stock price"}
// // //                 </div>
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// // //                 <input
// // //                   type="date"
// // //                   name="date"
// // //                   value={currentSale.date || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   name="customerName"
// // //                   value={currentSale.customerName || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="quantity"
// // //                   min="1"
// // //                   value={currentSale.quantity || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "20px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="unitPrice"
// // //                   min="0"
// // //                   step="0.01"
// // //                   value={currentSale.unitPrice || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ textAlign: "center" }}>
// // //                 <button
// // //                   onClick={handleSaveUpdate}
// // //                   style={{
// // //                     background: "#28a745",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     marginRight: "10px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   💾 Save Changes
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setShowModal(false)}
// // //                   style={{
// // //                     background: "#6c757d",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   ❌ Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SaleList;

// // // import React, { useEffect, useState } from "react";
// // // import Navigation from "../navigation/Navigation";
// // // import { Link } from "react-router-dom";
// // // import axios from "axios";

// // // const SaleList = () => {
// // //   const [sales, setSales] = useState([]);
// // //   const [stocks, setStocks] = useState([]);
// // //   const [purchases, setPurchases] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   // Modal state
// // //   const [showModal, setShowModal] = useState(false);
// // //   const [currentSale, setCurrentSale] = useState(null);

// // //   useEffect(() => {
// // //     fetchAllSales();
// // //     fetchStocks();
// // //     fetchPurchases();
// // //   }, []);

// // //   const handleResponse = async (response) => {
// // //     if (!response.ok) {
// // //       const text = await response.text();
// // //       throw new Error(text || `Error: ${response.status}`);
// // //     }
// // //     return response.json();
// // //   };

// // //   const fetchAllSales = () => {
// // //     setLoading(true);
// // //     setError(null);
// // //     fetch("http://localhost:8080/api/sales/all-sales")
// // //       .then(handleResponse)
// // //       .then((data) => {
// // //         setSales(data);
// // //         setLoading(false);
// // //       })
// // //       .catch((err) => {
// // //         setError(err.message);
// // //         setLoading(false);
// // //       });
// // //   };

// // //   const fetchStocks = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/stocks/all-stocks")
// // //       .then((res) => setStocks(res.data))
// // //       .catch((err) => console.error("Error fetching stocks:", err));
// // //   };

// // //   const fetchPurchases = () => {
// // //     axios
// // //       .get("http://localhost:8080/api/purchases")
// // //       .then((res) => setPurchases(res.data))
// // //       .catch((err) => console.error("Error fetching purchases:", err));
// // //   };

// // //   // FIXED: Calculate profit based on actual purchase history
// // //   const calculateSaleProfit = (sale) => {
// // //     try {
// // //       if (!sale.product) return 0;
      
// // //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
// // //       const quantity = parseFloat(sale.quantity) || 0;
      
// // //       // Find the actual purchase price for this product
// // //       const purchasePrice = getActualPurchasePrice(sale);
      
// // //       return (sellingPrice - purchasePrice) * quantity;
// // //     } catch (error) {
// // //       console.error('Error calculating profit for sale:', sale.saleId, error);
// // //       return 0;
// // //     }
// // //   };

// // //   // NEW: Get actual purchase price from purchase history
// // //   const getActualPurchasePrice = (sale) => {
// // //     try {
// // //       if (!sale.product) return 0;
      
// // //       // Find purchases for this specific product
// // //       const productPurchases = purchases.filter(
// // //         purchase => purchase.product?.productId === sale.product.productId
// // //       );
      
// // //       if (productPurchases.length === 0) {
// // //         console.warn(`No purchase history found for product: ${sale.product.productName}`);
// // //         return getBuyingPriceFromStock(sale.product);
// // //       }
      
// // //       // Sort purchases by date (most recent first)
// // //       const sortedPurchases = productPurchases.sort((a, b) => 
// // //         new Date(b.purchaseDate) - new Date(a.purchaseDate)
// // //       );
      
// // //       // Use the most recent purchase price before the sale date
// // //       const saleDate = new Date(sale.date);
// // //       const relevantPurchase = sortedPurchases.find(purchase => 
// // //         new Date(purchase.purchaseDate) <= saleDate
// // //       );
      
// // //       // If no purchase before sale date, use most recent purchase
// // //       const purchaseToUse = relevantPurchase || sortedPurchases[0];
      
// // //       return parseFloat(purchaseToUse.purchasePrice) || 0;
      
// // //     } catch (error) {
// // //       console.error('Error getting actual purchase price:', error);
// // //       return getBuyingPriceFromStock(sale.product);
// // //     }
// // //   };

// // //   // Fallback: Get buying price from stock if no purchase history
// // //   const getBuyingPriceFromStock = (product) => {
// // //     if (!product) return 0;
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// // //   };

// // //   // Calculate total profit across all sales
// // //   const calculateTotalProfit = () => {
// // //     return sales.reduce((total, sale) => {
// // //       return total + calculateSaleProfit(sale);
// // //     }, 0);
// // //   };

// // //   // Calculate total revenue
// // //   const calculateTotalRevenue = () => {
// // //     return sales.reduce((total, sale) => {
// // //       return total + (parseFloat(sale.totalPrice) || 0);
// // //     }, 0);
// // //   };

// // //   // Calculate total cost of goods sold (COGS)
// // //   const calculateTotalCOGS = () => {
// // //     return sales.reduce((total, sale) => {
// // //       const purchasePrice = getActualPurchasePrice(sale);
// // //       const quantity = parseFloat(sale.quantity) || 0;
// // //       return total + (purchasePrice * quantity);
// // //     }, 0);
// // //   };

// // //   // Get buying price for display
// // //   const getBuyingPrice = (sale) => {
// // //     return getActualPurchasePrice(sale);
// // //   };

// // //   const getStockStatus = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     if (!stock) return "N/A";
    
// // //     const statusStyle = {
// // //       'Sold Out': { color: "red", fontWeight: "bold" },
// // //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// // //       'In Stock': { color: "green", fontWeight: "bold" }
// // //     };
    
// // //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// // //     return <span style={style}>{stock.status || 'N/A'}</span>;
// // //   };

// // //   const getCurrentStockQuantity = (product) => {
// // //     if (!product) return "N/A";
// // //     const stock = stocks.find(
// // //       (s) => s.product && s.product.productId === product.productId
// // //     );
// // //     return stock ? stock.currentStock : "N/A";
// // //   };

// // //   // Check if we have purchase history for a product
// // //   const hasPurchaseHistory = (product) => {
// // //     if (!product) return false;
// // //     return purchases.some(purchase => purchase.product?.productId === product.productId);
// // //   };

// // //   const deleteSale = (id) => {
// // //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// // //     fetch(`http://localhost:8080/api/sales/${id}`, {
// // //       method: "DELETE",
// // //     })
// // //       .then((response) => {
// // //         if (!response.ok) throw new Error("Failed to delete");
// // //         alert("Sale deleted successfully!");
// // //         fetchAllSales();
// // //         fetchStocks();
// // //       })
// // //       .catch((err) => alert("Error deleting sale: " + err.message));
// // //   };

// // //   const handleUpdateClick = (sale) => {
// // //     setCurrentSale({ 
// // //       ...sale,
// // //       date: sale.date || ''
// // //     });
// // //     setShowModal(true);
// // //   };

// // //   const handleUpdateChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleSaveUpdate = () => {
// // //     if (!currentSale) return;
    
// // //     const updatedSale = {
// // //       ...currentSale,
// // //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// // //     };

// // //     axios
// // //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// // //       .then(() => {
// // //         alert("Sale updated successfully!");
// // //         setShowModal(false);
// // //         fetchAllSales();
// // //         fetchStocks();
// // //       })
// // //       .catch((err) => {
// // //         alert("Error updating sale: " + err.message);
// // //       });
// // //   };

// // //   // Calculate profit margin percentage
// // //   const calculateProfitMargin = (sale) => {
// // //     try {
// // //       const buyingPrice = getActualPurchasePrice(sale);
// // //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
      
// // //       if (buyingPrice <= 0) return 0;
      
// // //       const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
// // //       return Math.max(0, margin);
// // //     } catch (error) {
// // //       return 0;
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       <Navigation />
// // //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// // //         <div style={{ marginTop: "40px" }}>
// // //           <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
// // //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// // //               Sales List
// // //             </h2>
// // //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// // //               {/* Summary Cards */}
// // //               <div style={{ display: 'flex', gap: '15px' }}>
// // //                 <div style={{
// // //                   backgroundColor: "#e7f3ff",
// // //                   padding: "10px 15px",
// // //                   borderRadius: "10px",
// // //                   border: "2px solid #007bff",
// // //                   fontWeight: "bold",
// // //                   color: "#007bff",
// // //                   textAlign: 'center'
// // //                 }}>
// // //                   <div style={{ fontSize: '12px' }}>Total Revenue</div>
// // //                   <div>${calculateTotalRevenue().toFixed(2)}</div>
// // //                 </div>
// // //                 <div style={{
// // //                   backgroundColor: "#d4edda",
// // //                   padding: "10px 15px",
// // //                   borderRadius: "10px",
// // //                   border: "2px solid #28a745",
// // //                   fontWeight: "bold",
// // //                   color: "#28a745",
// // //                   textAlign: 'center'
// // //                 }}>
// // //                   <div style={{ fontSize: '12px' }}>Total Profit</div>
// // //                   <div>${calculateTotalProfit().toFixed(2)}</div>
// // //                 </div>
// // //                 <div style={{
// // //                   backgroundColor: "#fff3cd",
// // //                   padding: "10px 15px",
// // //                   borderRadius: "10px",
// // //                   border: "2px solid #ffc107",
// // //                   fontWeight: "bold",
// // //                   color: "#856404",
// // //                   textAlign: 'center'
// // //                 }}>
// // //                   <div style={{ fontSize: '12px' }}>Total Sales</div>
// // //                   <div>{sales.length}</div>
// // //                 </div>
// // //                 <div style={{
// // //                   backgroundColor: "#f8d7da",
// // //                   padding: "10px 15px",
// // //                   borderRadius: "10px",
// // //                   border: "2px solid #dc3545",
// // //                   fontWeight: "bold",
// // //                   color: "#721c24",
// // //                   textAlign: 'center'
// // //                 }}>
// // //                   <div style={{ fontSize: '12px' }}>COGS</div>
// // //                   <div>${calculateTotalCOGS().toFixed(2)}</div>
// // //                 </div>
// // //               </div>
              
// // //               <Link to="/add-sale">
// // //                 <button
// // //                   style={{
// // //                     borderRadius: "10px",
// // //                     backgroundColor: "#4CAF50",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     width: "100px",
// // //                   }}
// // //                 >
// // //                   Add Sale
// // //                 </button>
// // //               </Link>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// // //         {loading ? (
// // //           <p>Loading...</p>
// // //         ) : sales.length === 0 ? (
// // //           <p>No sales found.</p>
// // //         ) : (
// // //           <div
// // //             style={{
// // //               marginTop: "10px",
// // //               width: "87%",
// // //               marginLeft: "216px",
// // //               marginBottom: "20px",
// // //               height: "400px",
// // //               overflow: "auto",
// // //             }}
// // //           >
// // //             <table
// // //               border="1"
// // //               cellPadding="8"
// // //               cellSpacing="0"
// // //               style={{
// // //                 borderCollapse: "collapse",
// // //                 width: "100%",
// // //                 tableLayout: "fixed",
// // //                 marginRight: "10px",
// // //               }}
// // //             >
// // //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// // //                 <tr>
// // //                   <th style={{ width: "80px" }}>Sale ID</th>
// // //                   <th style={{ width: "120px" }}>Date</th>
// // //                   <th style={{ width: "150px" }}>Product Name</th>
// // //                   <th style={{ width: "100px" }}>Quantity</th>
// // //                   <th style={{ width: "100px" }}>Unit Price</th>
// // //                   <th style={{ width: "100px" }}>Buying Price</th>
// // //                   <th style={{ width: "120px" }}>Total Price</th>
// // //                   <th style={{ width: "100px" }}>Profit</th>
// // //                   <th style={{ width: "80px" }}>Margin</th>
// // //                   <th style={{ width: "150px" }}>Customer</th>
// // //                   <th style={{ width: "120px" }}>Stock Status</th>
// // //                   <th style={{ width: "100px" }}>Current Stock</th>
// // //                   <th style={{ width: "120px" }}>Actions</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody>
// // //                 {sales.map((sale) => {
// // //                   const profit = calculateSaleProfit(sale);
// // //                   const buyingPrice = getBuyingPrice(sale);
// // //                   const profitMargin = calculateProfitMargin(sale);
// // //                   const hasPurchaseData = hasPurchaseHistory(sale.product);
// // //                   const profitColor = profit > 0 ? "green" : profit < 0 ? "red" : "#6c757d";
// // //                   const marginColor = profitMargin > 50 ? "green" : profitMargin > 20 ? "#17a2b8" : profitMargin > 0 ? "#ffc107" : "red";
                  
// // //                   return (
// // //                     <tr key={sale.saleId}>
// // //                       <td>{sale.saleId}</td>
// // //                       <td>{sale.date}</td>
// // //                       <td>
// // //                         {sale.product ? sale.product.productName : "N/A"}
// // //                         {!hasPurchaseData && (
// // //                           <div style={{ fontSize: "10px", color: "orange", fontStyle: "italic" }}>
// // //                             *No purchase data
// // //                           </div>
// // //                         )}
// // //                       </td>
// // //                       <td>{sale.quantity}</td>
// // //                       <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// // //                       <td>
// // //                         ${buyingPrice.toFixed(2)}
// // //                         {!hasPurchaseData && (
// // //                           <div style={{ fontSize: "9px", color: "orange" }}>est.</div>
// // //                         )}
// // //                       </td>
// // //                       <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// // //                       <td style={{ 
// // //                         fontWeight: "bold", 
// // //                         color: profitColor
// // //                       }}>
// // //                         ${profit.toFixed(2)}
// // //                         {!hasPurchaseData && (
// // //                           <div style={{ fontSize: "9px", color: "orange" }}>est.</div>
// // //                         )}
// // //                       </td>
// // //                       <td style={{ 
// // //                         fontWeight: "bold", 
// // //                         color: marginColor,
// // //                         fontSize: "12px"
// // //                       }}>
// // //                         {profitMargin.toFixed(1)}%
// // //                         {!hasPurchaseData && (
// // //                           <div style={{ fontSize: "9px", color: "orange" }}>est.</div>
// // //                         )}
// // //                       </td>
// // //                       <td>{sale.customerName || "Walk-in"}</td>
// // //                       <td>{getStockStatus(sale.product)}</td>
// // //                       <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// // //                       <td>
// // //                         <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// // //                           <button
// // //                             onClick={() => handleUpdateClick(sale)}
// // //                             style={{
// // //                               background: "#007bff",
// // //                               color: "white",
// // //                               padding: "5px 10px",
// // //                               borderRadius: "5px",
// // //                               border: "none",
// // //                               cursor: "pointer",
// // //                               fontSize: "12px"
// // //                             }}
// // //                           >
// // //                             ✏️ Edit
// // //                           </button>
// // //                           <button
// // //                             onClick={() => deleteSale(sale.saleId)}
// // //                             style={{
// // //                               background: "#dc3545",
// // //                               color: "white",
// // //                               padding: "5px 10px",
// // //                               borderRadius: "5px",
// // //                               border: "none",
// // //                               cursor: "pointer",
// // //                               fontSize: "12px"
// // //                             }}
// // //                           >
// // //                             🗑️ Delete
// // //                           </button>
// // //                         </div>
// // //                       </td>
// // //                     </tr>
// // //                   );
// // //                 })}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         )}

// // //         {/* Update Modal */}
// // //         {showModal && currentSale && (
// // //           <div
// // //             style={{
// // //               position: "fixed",
// // //               top: 0,
// // //               left: 0,
// // //               width: "100%",
// // //               height: "100%",
// // //               background: "rgba(0,0,0,0.5)",
// // //               display: "flex",
// // //               justifyContent: "center",
// // //               alignItems: "center",
// // //               zIndex: 1000
// // //             }}
// // //           >
// // //             <div
// // //               style={{
// // //                 background: "white",
// // //                 padding: "25px",
// // //                 borderRadius: "15px",
// // //                 width: "450px",
// // //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// // //               }}
// // //             >
// // //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// // //                 ✏️ Update Sale
// // //               </h3>
              
// // //               {/* Show buying price information */}
// // //               <div style={{ 
// // //                 marginBottom: "15px", 
// // //                 padding: "10px", 
// // //                 backgroundColor: "#f8f9fa", 
// // //                 borderRadius: "8px",
// // //                 border: "1px solid #e9ecef"
// // //               }}>
// // //                 <div style={{ fontWeight: "bold", color: "#495057" }}>
// // //                   Product: {currentSale.product?.productName || "N/A"}
// // //                 </div>
// // //                 <div style={{ color: "#6c757d", fontSize: "14px" }}>
// // //                   Actual Buying Price: ${getBuyingPrice(currentSale).toFixed(2)}
// // //                 </div>
// // //                 <div style={{ color: hasPurchaseHistory(currentSale.product) ? "#28a745" : "#ffc107", fontSize: "12px", fontStyle: "italic" }}>
// // //                   {hasPurchaseHistory(currentSale.product) ? "Based on purchase history" : "Estimated from current stock price"}
// // //                 </div>
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// // //                 <input
// // //                   type="date"
// // //                   name="date"
// // //                   value={currentSale.date || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// // //                 <input
// // //                   type="text"
// // //                   name="customerName"
// // //                   value={currentSale.customerName || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "15px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="quantity"
// // //                   min="1"
// // //                   value={currentSale.quantity || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ marginBottom: "20px" }}>
// // //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// // //                 <input
// // //                   type="number"
// // //                   name="unitPrice"
// // //                   min="0"
// // //                   step="0.01"
// // //                   value={currentSale.unitPrice || ""}
// // //                   onChange={handleUpdateChange}
// // //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// // //                 />
// // //               </div>

// // //               <div style={{ textAlign: "center" }}>
// // //                 <button
// // //                   onClick={handleSaveUpdate}
// // //                   style={{
// // //                     background: "#28a745",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     marginRight: "10px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   💾 Save Changes
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setShowModal(false)}
// // //                   style={{
// // //                     background: "#6c757d",
// // //                     color: "white",
// // //                     padding: "10px 20px",
// // //                     borderRadius: "8px",
// // //                     border: "none",
// // //                     cursor: "pointer",
// // //                     fontWeight: "bold"
// // //                   }}
// // //                 >
// // //                   ❌ Cancel
// // //                 </button>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     </>
// // //   );
// // // };

// // // export default SaleList;

// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [purchases, setPurchases] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   // cache purchase prices to avoid recomputation
// //   const priceCacheRef = useRef({});

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //     fetchPurchases();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   const fetchPurchases = () => {
// //     axios
// //       .get("http://localhost:8080/api/purchases")
// //       .then((res) => setPurchases(res.data))
// //       .catch((err) => console.error("Error fetching purchases:", err));
// //   };

// //   // 🔹 Fallback: get buying price from stock
// //   const getBuyingPriceFromStock = (product) => {
// //     if (!product) return 0;
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// //   };

// //   // 🔹 Compute actual purchase price using cache + history
// //   const getActualPurchasePrice = (sale) => {
// //     try {
// //       if (!sale?.product) return 0;
// //       const productId = sale.product.productId;

// //       // Check cache first
// //       if (priceCacheRef.current[productId]) {
// //         return priceCacheRef.current[productId];
// //       }

// //       const productPurchases = purchases.filter(
// //         (p) => p.product?.productId === productId
// //       );

// //       if (productPurchases.length === 0) {
// //         const fallback = getBuyingPriceFromStock(sale.product);
// //         priceCacheRef.current[productId] = fallback;
// //         return fallback;
// //       }

// //       const sortedPurchases = [...productPurchases].sort(
// //         (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
// //       );

// //       const saleDate = sale.date ? new Date(sale.date) : null;

// //       const relevantPurchase = saleDate
// //         ? sortedPurchases.find((p) => new Date(p.purchaseDate) <= saleDate)
// //         : sortedPurchases[0];

// //       const purchaseToUse = relevantPurchase || sortedPurchases[0];
// //       const purchasePrice = parseFloat(purchaseToUse.purchasePrice) || 0;

// //       priceCacheRef.current[productId] = purchasePrice;
// //       return purchasePrice;
// //     } catch (error) {
// //       console.error("Error getting actual purchase price:", error);
// //       return getBuyingPriceFromStock(sale.product);
// //     }
// //   };

// //   // 🔹 Precompute sale data (profit, margin, etc.)
// //   const saleData = useMemo(() => {
// //     return sales.map((sale) => {
// //       const purchasePrice = getActualPurchasePrice(sale);
// //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
// //       const quantity = parseFloat(sale.quantity) || 0;

// //       const totalPrice = sellingPrice * quantity;
// //       const profit = (sellingPrice - purchasePrice) * quantity;
// //       const cogs = purchasePrice * quantity;
// //       const margin =
// //         purchasePrice > 0
// //           ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
// //           : 0;

// //       return {
// //         ...sale,
// //         purchasePrice: parseFloat(purchasePrice.toFixed(2)),
// //         profit: parseFloat(profit.toFixed(2)),
// //         totalPrice: parseFloat(totalPrice.toFixed(2)),
// //         cogs: parseFloat(cogs.toFixed(2)),
// //         margin: parseFloat(Math.max(0, margin).toFixed(1)),
// //       };
// //     });
// //   }, [sales, purchases, stocks]);

// //   // 🔹 Totals (computed once per change)
// //   const totalRevenue = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.totalPrice, 0),
// //     [saleData]
// //   );

// //   const totalProfit = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.profit, 0),
// //     [saleData]
// //   );

// //   const totalCOGS = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.cogs, 0),
// //     [saleData]
// //   );

// //   // 🔹 Stock & helper functions
// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";

// //     const styleMap = {
// //       "Sold Out": { color: "red", fontWeight: "bold" },
// //       "Partially Sold": { color: "orange", fontWeight: "bold" },
// //       "In Stock": { color: "green", fontWeight: "bold" },
// //     };
// //     const style = styleMap[stock.status] || { color: "gray" };

// //     return <span style={style}>{stock.status || "N/A"}</span>;
// //   };

// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   const hasPurchaseHistory = (product) => {
// //     if (!product) return false;
// //     return purchases.some((p) => p.product?.productId === product.productId);
// //   };

// //   // 🔹 Delete sale
// //   const deleteSale = (id) => {
// //     if (!window.confirm("Are you sure you want to delete this sale?")) return;

// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   // 🔹 Edit sale
// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ ...sale, date: sale.date || "" });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;

// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice:
// //         (parseFloat(currentSale.quantity) || 0) *
// //         (parseFloat(currentSale.unitPrice) || 0),
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   // 🔹 UI
// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px",marginTop: "90px" }}>
// //         <div style={{ marginTop: "40px"}}>
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "row",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
            
// //           >
// //             <h2 style={{ marginTop: "40px", marginLeft: "590px" }}>
// //               Sales List
// //             </h2>
// //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //               {/* Summary Cards */}
// //               <div style={{ display: "flex", gap: "15px" }}>
// //                 <SummaryCard
// //                   title="Total Revenue"
// //                   color="#007bff"
// //                   bg="#e7f3ff"
// //                   value={`Tsh${totalRevenue.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Profit"
// //                   color="#28a745"
// //                   bg="#d4edda"
// //                   value={`Tsh${totalProfit.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Sales"
// //                   color="#856404"
// //                   bg="#fff3cd"
// //                   value={saleData.length}
// //                 />
// //                 <SummaryCard
// //                   title="COGS"
// //                   color="#721c24"
// //                   bg="#f8d7da"
// //                   value={`Tsh${totalCOGS.toFixed(2)}`}
// //                 />
// //               </div>

// //               <Link to="/add-sale">
// //                 <button
// //                   style={{
// //                     borderRadius: "10px",
// //                     backgroundColor: "#4CAF50",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     width: "100px",
// //                   }}
// //                 >
// //                   Add Sale
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : saleData.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //               }}
// //             >
// //               <thead
// //                 style={{
// //                   position: "sticky",
// //                   top: 0,
// //                   zIndex: 1,
// //                   background: "#2c3e50",
// //                   color: "black",
// //                 }}
// //               >
// //                 <tr>
// //                   <th>Sale ID</th>
// //                   <th>Selling Date</th>
// //                   <th>Product Name</th>
// //                   <th>Qty Sold</th>
// //                   <th>Selling Price/unit</th>
// //                   <th>Buying Price/unit</th>
// //                   <th>Total Selling Price</th>
// //                   <th>Profit</th>
// //                   <th>Margin</th>
// //                   <th>Customer</th>
// //                   <th>Stock Status</th>
// //                   <th>Qty Left  InStock</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {saleData.map((sale) => {
// //                   const hasPurchaseData = hasPurchaseHistory(sale.product);
// //                   const profitColor =
// //                     sale.profit > 0
// //                       ? "green"
// //                       : sale.profit < 0
// //                       ? "red"
// //                       : "#6c757d";
// //                   const marginColor =
// //                     sale.margin > 50
// //                       ? "green"
// //                       : sale.margin > 20
// //                       ? "#17a2b8"
// //                       : sale.margin > 0
// //                       ? "#ffc107"
// //                       : "red";

// //                   return (
// //                     <tr key={sale.saleId}>
// //                       <td>{sale.saleId}</td>
// //                       <td>{sale.date}</td>
// //                       <td>
// //                         {sale.product?.productName || "N/A"}
// //                         {!hasPurchaseData && (
// //                           <div
// //                             style={{
// //                               fontSize: "10px",
// //                               color: "orange",
// //                               fontStyle: "italic",
// //                             }}
// //                           >
// //                             *No purchase data
// //                           </div>
// //                         )}
// //                       </td>
// //                       <td>{sale.quantity}</td>
// //                       <td>Tsh{sale.unitPrice.toFixed(2)}</td>
// //                       <td>Tsh{sale.purchasePrice.toFixed(2)}</td>
// //                       <td>Tsh{sale.totalPrice.toFixed(2)}</td>
// //                       <td style={{ fontWeight: "bold", color: profitColor }}>
// //                         Tsh{sale.profit.toFixed(2)}
// //                       </td>
// //                       <td
// //                         style={{
// //                           fontWeight: "bold",
// //                           color: marginColor,
// //                           fontSize: "12px",
// //                         }}
// //                       >
// //                         {sale.margin.toFixed(1)}%
// //                       </td>
// //                       <td>{sale.customerName || "Walk-in"}</td>
// //                       <td>{getStockStatus(sale.product)}</td>
// //                       <td style={{ textAlign: "center" }}>
// //                         {getCurrentStockQuantity(sale.product)}
// //                       </td>
// //                       <td>
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             flexDirection: "row",
// //                             gap: "5px",
// //                           }}
// //                         >
// //                           <button
// //                             onClick={() => handleUpdateClick(sale)}
// //                             style={buttonStyle("#007bff")}
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => deleteSale(sale.saleId)}
// //                             style={buttonStyle("#dc3545")}
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Update Modal */}
// //         {showModal && currentSale && (
// //           <UpdateModal
// //             currentSale={currentSale}
// //             getBuyingPriceFromStock={getBuyingPriceFromStock}
// //             hasPurchaseHistory={hasPurchaseHistory}
// //             onSave={handleSaveUpdate}
// //             onChange={handleUpdateChange}
// //             onClose={() => setShowModal(false)}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // // 🔹 Reusable summary card
// // const SummaryCard = ({ title, value, color, bg }) => (
// //   <div
// //     style={{
// //       backgroundColor: bg,
// //       padding: "10px 15px",
// //       borderRadius: "10px",
// //       border: `2px solid ${color}`,
// //       fontWeight: "bold",
// //       color,
// //       textAlign: "center",
// //     }}
// //   >
// //     <div style={{ fontSize: "12px" }}>{title}</div>
// //     <div>{value}</div>
// //   </div>
// // );

// // // 🔹 Reusable button style
// // const buttonStyle = (bg) => ({
// //   background: bg,
// //   color: "white",
// //   padding: "5px 10px",
// //   borderRadius: "5px",
// //   border: "none",
// //   cursor: "pointer",
// //   fontSize: "12px",
// // });

// // // 🔹 Modal Component
// // const UpdateModal = ({
// //   currentSale,
// //   hasPurchaseHistory,
// //   getBuyingPriceFromStock,
// //   onSave,
// //   onChange,
// //   onClose,
// // }) => (
// //   <div
// //     style={{
// //       position: "fixed",
// //       top: 0,
// //       left: 0,
// //       width: "100%",
// //       height: "100%",
// //       background: "rgba(0,0,0,0.5)",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       zIndex: 1000,
// //     }}
// //   >
// //     <div
// //       style={{
// //         background: "white",
// //         padding: "25px",
// //         borderRadius: "15px",
// //         width: "450px",
// //         boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
// //       }}
// //     >
// //       <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //         ✏️ Update Sale
// //       </h3>

// //       <div
// //         style={{
// //           marginBottom: "15px",
// //           padding: "10px",
// //           backgroundColor: "#f8f9fa",
// //           borderRadius: "8px",
// //           border: "1px solid #e9ecef",
// //         }}
// //       >
// //         <div style={{ fontWeight: "bold", color: "#495057" }}>
// //           Product: {currentSale.product?.productName || "N/A"}
// //         </div>
// //         <div style={{ color: "#6c757d", fontSize: "14px" }}>
// //           Actual Buying Price: $
// //           {getBuyingPriceFromStock(currentSale.product).toFixed(2)}
// //         </div>
// //         <div
// //           style={{
// //             color: hasPurchaseHistory(currentSale.product)
// //               ? "#28a745"
// //               : "#ffc107",
// //             fontSize: "12px",
// //             fontStyle: "italic",
// //           }}
// //         >
// //           {hasPurchaseHistory(currentSale.product)
// //             ? "Based on purchase history"
// //             : "Estimated from current stock price"}
// //         </div>
// //       </div>

// //       <InputField
// //         label="Date"
// //         name="date"
// //         type="date"
// //         value={currentSale.date || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Customer Name"
// //         name="customerName"
// //         value={currentSale.customerName || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Quantity"
// //         name="quantity"
// //         type="number"
// //         value={currentSale.quantity || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Unit Price"
// //         name="unitPrice"
// //         type="number"
// //         value={currentSale.unitPrice || ""}
// //         onChange={onChange}
// //       />

// //       <div style={{ textAlign: "center" }}>
// //         <button
// //           onClick={onSave}
// //           style={{
// //             background: "#28a745",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             marginRight: "10px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           💾 Save
// //         </button>
// //         <button
// //           onClick={onClose}
// //           style={{
// //             background: "#dc3545",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             cursor: "pointer",
// //           }}
// //         >
// //           ❌ Cancel
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // 🔹 Input field reusable
// // const InputField = ({ label, name, value, onChange, type = "text" }) => (
// //   <div style={{ marginBottom: "10px" }}>
// //     <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
// //       {label}
// //     </label>
// //     <input
// //       type={type}
// //       name={name}
// //       value={value}
// //       onChange={onChange}
// //       style={{
// //         width: "100%",
// //         padding: "8px",
// //         borderRadius: "5px",
// //         border: "1px solid #ccc",
// //       }}
// //     />
// //   </div>
// // );

// // export default SaleList;

// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [purchases, setPurchases] = useState([]);
// //   const [products, setProducts] = useState([]); // Added products state
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   // cache purchase prices to avoid recomputation
// //   const priceCacheRef = useRef({});

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //     fetchPurchases();
// //     fetchProducts(); // Fetch products data
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   const fetchPurchases = () => {
// //     axios
// //       .get("http://localhost:8080/api/purchases")
// //       .then((res) => setPurchases(res.data))
// //       .catch((err) => console.error("Error fetching purchases:", err));
// //   };

// //   // 🔹 NEW: Fetch products from viewproducts table
// //   const fetchProducts = () => {
// //     axios
// //       .get("http://localhost:8080/api/product/get/product")
// //       .then((res) => setProducts(res.data))
// //       .catch((err) => console.error("Error fetching products:", err));
// //   };

// //   // 🔹 UPDATED: Get selling price from products table
// //   const getSellingPriceFromProduct = (product) => {
// //     if (!product) return 0;
// //     const productData = products.find(
// //       (p) => p.productId === product.productId
// //     );
// //     return productData ? parseFloat(productData.sellingPrice) || 0 : 0;
// //   };

// //   // 🔹 UPDATED: Get buying price from products table (latestPurchasePrice)
// //   const getBuyingPriceFromProduct = (product) => {
// //     if (!product) return 0;
// //     const productData = products.find(
// //       (p) => p.productId === product.productId
// //     );
// //     return productData ? parseFloat(productData.latestPurchasePrice) || 0 : 0;
// //   };

// //   // 🔹 Fallback: get buying price from stock (keep as backup)
// //   const getBuyingPriceFromStock = (product) => {
// //     if (!product) return 0;
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// //   };

// //   // 🔹 UPDATED: Compute actual purchase price using products table first, then cache + history as fallback
// //   const getActualPurchasePrice = (sale) => {
// //     try {
// //       if (!sale?.product) return 0;
      
// //       // First try to get from products table
// //       const productPrice = getBuyingPriceFromProduct(sale.product);
// //       if (productPrice > 0) {
// //         return productPrice;
// //       }

// //       const productId = sale.product.productId;

// //       // Check cache first
// //       if (priceCacheRef.current[productId]) {
// //         return priceCacheRef.current[productId];
// //       }

// //       const productPurchases = purchases.filter(
// //         (p) => p.product?.productId === productId
// //       );

// //       if (productPurchases.length === 0) {
// //         const fallback = getBuyingPriceFromStock(sale.product);
// //         priceCacheRef.current[productId] = fallback;
// //         return fallback;
// //       }

// //       const sortedPurchases = [...productPurchases].sort(
// //         (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
// //       );

// //       const saleDate = sale.date ? new Date(sale.date) : null;

// //       const relevantPurchase = saleDate
// //         ? sortedPurchases.find((p) => new Date(p.purchaseDate) <= saleDate)
// //         : sortedPurchases[0];

// //       const purchaseToUse = relevantPurchase || sortedPurchases[0];
// //       const purchasePrice = parseFloat(purchaseToUse.purchasePrice) || 0;

// //       priceCacheRef.current[productId] = purchasePrice;
// //       return purchasePrice;
// //     } catch (error) {
// //       console.error("Error getting actual purchase price:", error);
// //       return getBuyingPriceFromStock(sale.product);
// //     }
// //   };

// //   // 🔹 UPDATED: Precompute sale data with prices from products table
// //   const saleData = useMemo(() => {
// //     return sales.map((sale) => {
// //       // Use selling price from products table, fallback to sale.unitPrice
// //       const productSellingPrice = getSellingPriceFromProduct(sale.product);
// //       const sellingPrice = productSellingPrice > 0 ? productSellingPrice : parseFloat(sale.unitPrice) || 0;
      
// //       // Use buying price from products table, fallback to purchase history
// //       const productBuyingPrice = getBuyingPriceFromProduct(sale.product);
// //       const purchasePrice = productBuyingPrice > 0 ? productBuyingPrice : getActualPurchasePrice(sale);
      
// //       const quantity = parseFloat(sale.quantity) || 0;

// //       const totalPrice = sellingPrice * quantity;
// //       const profit = (sellingPrice - purchasePrice) * quantity;
// //       const cogs = purchasePrice * quantity;
// //       const margin =
// //         purchasePrice > 0
// //           ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
// //           : 0;

// //       return {
// //         ...sale,
// //         sellingPrice: parseFloat(sellingPrice.toFixed(2)), // Store the actual selling price used
// //         purchasePrice: parseFloat(purchasePrice.toFixed(2)),
// //         profit: parseFloat(profit.toFixed(2)),
// //         totalPrice: parseFloat(totalPrice.toFixed(2)),
// //         cogs: parseFloat(cogs.toFixed(2)),
// //         margin: parseFloat(Math.max(0, margin).toFixed(1)),
// //       };
// //     });
// //   }, [sales, purchases, stocks, products]); // Added products dependency

// //   // 🔹 Totals (computed once per change)
// //   const totalRevenue = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.totalPrice, 0),
// //     [saleData]
// //   );

// //   const totalProfit = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.profit, 0),
// //     [saleData]
// //   );

// //   const totalCOGS = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.cogs, 0),
// //     [saleData]
// //   );

// //   // 🔹 Stock & helper functions
// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";

// //     const styleMap = {
// //       "Sold Out": { color: "red", fontWeight: "bold" },
// //       "Partially Sold": { color: "orange", fontWeight: "bold" },
// //       "In Stock": { color: "green", fontWeight: "bold" },
// //     };
// //     const style = styleMap[stock.status] || { color: "gray" };

// //     return <span style={style}>{stock.status || "N/A"}</span>;
// //   };

// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   const hasPurchaseHistory = (product) => {
// //     if (!product) return false;
// //     return purchases.some((p) => p.product?.productId === product.productId);
// //   };

// //   // 🔹 NEW: Check if product has price data in products table
// //   const hasProductPriceData = (product) => {
// //     if (!product) return false;
// //     const productData = products.find((p) => p.productId === product.productId);
// //     return productData && (productData.sellingPrice > 0 || productData.latestPurchasePrice > 0);
// //   };

// //   // 🔹 Delete sale
// //   const deleteSale = (id) => {
// //     if (!window.confirm("Are you sure you want to delete this sale?")) return;

// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   // 🔹 Edit sale
// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ ...sale, date: sale.date || "" });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;

// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice:
// //         (parseFloat(currentSale.quantity) || 0) *
// //         (parseFloat(currentSale.unitPrice) || 0),
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   // 🔹 UI
// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "250px",marginTop: "0px" }}>
// //         <div style={{ marginTop: "40px"}}>
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "row",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
            
// //           >
// //             <h2 style={{ marginTop: "40px", marginLeft: "590px" }}>
// //               Sales List
// //             </h2>
// //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //               {/* Summary Cards */}
// //               <div style={{ display: "flex", gap: "15px" }}>
// //                 <SummaryCard
// //                   title="Total Revenue"
// //                   color="#007bff"
// //                   bg="#e7f3ff"
// //                   value={`Tsh${totalRevenue.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Profit"
// //                   color="#28a745"
// //                   bg="#d4edda"
// //                   value={`Tsh${totalProfit.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Sales"
// //                   color="#856404"
// //                   bg="#fff3cd"
// //                   value={saleData.length}
// //                 />
// //                 <SummaryCard
// //                   title="COGS"
// //                   color="#721c24"
// //                   bg="#f8d7da"
// //                   value={`Tsh${totalCOGS.toFixed(2)}`}
// //                 />
// //               </div>

// //               <Link to="/add-sale">
// //                 <button
// //                   style={{
// //                     borderRadius: "10px",
// //                     backgroundColor: "#4CAF50",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     width: "100px",
// //                   }}
// //                 >
// //                   Add Sale
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : saleData.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //               }}
// //             >
// //               <thead
// //                 style={{
// //                   position: "sticky",
// //                   top: 0,
// //                   zIndex: 1,
// //                   background: "#2c3e50",
// //                   color: "black",
// //                 }}
// //               >
// //                 <tr>
// //                   <th>Sale ID</th>
// //                   <th>Selling Date</th>
// //                   <th>Product Name</th>
// //                   <th>Qty Sold</th>
// //                   <th>Selling Price/unit</th>
// //                   <th>Buying Price/unit</th>
// //                   <th>Total Selling Price</th>
// //                   <th>Profit</th>
// //                   <th>Margin</th>
// //                   <th>Customer</th>
// //                   <th>Stock Status</th>
// //                   <th>Qty Left  InStock</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {saleData.map((sale) => {
// //                   const hasPurchaseData = hasPurchaseHistory(sale.product);
// //                   const hasProductData = hasProductPriceData(sale.product); // NEW: Check if product has price data
// //                   const profitColor =
// //                     sale.profit > 0
// //                       ? "green"
// //                       : sale.profit < 0
// //                       ? "red"
// //                       : "#6c757d";
// //                   const marginColor =
// //                     sale.margin > 50
// //                       ? "green"
// //                       : sale.margin > 20
// //                       ? "#17a2b8"
// //                       : sale.margin > 0
// //                       ? "#ffc107"
// //                       : "red";

// //                   return (
// //                     <tr key={sale.saleId}>
// //                       <td>{sale.saleId}</td>
// //                       <td>{sale.date}</td>
// //                       <td>
// //                         {sale.product?.productName || "N/A"}
// //                         {!hasProductData && ( // UPDATED: Show warning if no product price data
// //                           <div
// //                             style={{
// //                               fontSize: "10px",
// //                               color: "orange",
// //                               fontStyle: "italic",
// //                             }}
// //                           >
// //                             *Using calculated prices
// //                           </div>
// //                         )}
// //                         {hasProductData && !hasPurchaseData && (
// //                           <div
// //                             style={{
// //                               fontSize: "10px",
// //                               color: "green",
// //                               fontStyle: "italic",
// //                             }}
// //                           >
// //                             *Using product table prices
// //                           </div>
// //                         )}
// //                       </td>
// //                       <td>{sale.quantity}</td>
// //                       <td>Tsh{sale.sellingPrice.toFixed(2)}</td> {/* UPDATED: Use sellingPrice instead of unitPrice */}
// //                       <td>Tsh{sale.purchasePrice.toFixed(2)}</td>
// //                       <td>Tsh{sale.totalPrice.toFixed(2)}</td>
// //                       <td style={{ fontWeight: "bold", color: profitColor }}>
// //                         Tsh{sale.profit.toFixed(2)}
// //                       </td>
// //                       <td
// //                         style={{
// //                           fontWeight: "bold",
// //                           color: marginColor,
// //                           fontSize: "12px",
// //                         }}
// //                       >
// //                         {sale.margin.toFixed(1)}%
// //                       </td>
// //                       <td>{sale.customerName || "Walk-in"}</td>
// //                       <td>{getStockStatus(sale.product)}</td>
// //                       <td style={{ textAlign: "center" }}>
// //                         {getCurrentStockQuantity(sale.product)}
// //                       </td>
// //                       <td>
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             flexDirection: "row",
// //                             gap: "5px",
// //                           }}
// //                         >
// //                           <button
// //                             onClick={() => handleUpdateClick(sale)}
// //                             style={buttonStyle("#007bff")}
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => deleteSale(sale.saleId)}
// //                             style={buttonStyle("#dc3545")}
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Update Modal */}
// //         {showModal && currentSale && (
// //           <UpdateModal
// //             currentSale={currentSale}
// //             getBuyingPriceFromProduct={getBuyingPriceFromProduct} // UPDATED: Pass product-based function
// //             hasPurchaseHistory={hasPurchaseHistory}
// //             hasProductPriceData={hasProductPriceData} // NEW: Pass product data check
// //             onSave={handleSaveUpdate}
// //             onChange={handleUpdateChange}
// //             onClose={() => setShowModal(false)}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // // 🔹 Reusable summary card
// // const SummaryCard = ({ title, value, color, bg }) => (
// //   <div
// //     style={{
// //       backgroundColor: bg,
// //       padding: "10px 15px",
// //       borderRadius: "10px",
// //       border: `2px solid ${color}`,
// //       fontWeight: "bold",
// //       color,
// //       textAlign: "center",
// //     }}
// //   >
// //     <div style={{ fontSize: "12px" }}>{title}</div>
// //     <div>{value}</div>
// //   </div>
// // );

// // // 🔹 Reusable button style
// // const buttonStyle = (bg) => ({
// //   background: bg,
// //   color: "white",
// //   padding: "5px 10px",
// //   borderRadius: "5px",
// //   border: "none",
// //   cursor: "pointer",
// //   fontSize: "12px",
// // });

// // // 🔹 UPDATED: Modal Component with product price info
// // const UpdateModal = ({
// //   currentSale,
// //   hasPurchaseHistory,
// //   hasProductPriceData, // NEW: Product data check
// //   getBuyingPriceFromProduct, // UPDATED: Product-based function
// //   onSave,
// //   onChange,
// //   onClose,
// // }) => (
// //   <div
// //     style={{
// //       position: "fixed",
// //       top: 0,
// //       left: 0,
// //       width: "100%",
// //       height: "100%",
// //       background: "rgba(0,0,0,0.5)",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       zIndex: 1000,
// //     }}
// //   >
// //     <div
// //       style={{
// //         background: "white",
// //         padding: "25px",
// //         borderRadius: "15px",
// //         width: "450px",
// //         boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
// //       }}
// //     >
// //       <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //         ✏️ Update Sale
// //       </h3>

// //       <div
// //         style={{
// //           marginBottom: "15px",
// //           padding: "10px",
// //           backgroundColor: "#f8f9fa",
// //           borderRadius: "8px",
// //           border: "1px solid #e9ecef",
// //         }}
// //       >
// //         <div style={{ fontWeight: "bold", color: "#495057" }}>
// //           Product: {currentSale.product?.productName || "N/A"}
// //         </div>
// //         <div style={{ color: "#6c757d", fontSize: "14px" }}>
// //           Actual Buying Price: Tsh
// //           {getBuyingPriceFromProduct(currentSale.product).toFixed(2)}
// //         </div>
// //         <div
// //           style={{
// //             color: hasProductPriceData(currentSale.product) 
// //               ? "#28a745" 
// //               : hasPurchaseHistory(currentSale.product)
// //               ? "#17a2b8"
// //               : "#ffc107",
// //             fontSize: "12px",
// //             fontStyle: "italic",
// //           }}
// //         >
// //           {hasProductPriceData(currentSale.product)
// //             ? "Based on product table prices"
// //             : hasPurchaseHistory(currentSale.product)
// //             ? "Based on purchase history"
// //             : "Estimated from current stock price"}
// //         </div>
// //       </div>

// //       <InputField
// //         label="Date"
// //         name="date"
// //         type="date"
// //         value={currentSale.date || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Customer Name"
// //         name="customerName"
// //         value={currentSale.customerName || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Quantity"
// //         name="quantity"
// //         type="number"
// //         value={currentSale.quantity || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Unit Price"
// //         name="unitPrice"
// //         type="number"
// //         value={currentSale.unitPrice || ""}
// //         onChange={onChange}
// //       />

// //       <div style={{ textAlign: "center" }}>
// //         <button
// //           onClick={onSave}
// //           style={{
// //             background: "#28a745",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             marginRight: "10px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           💾 Save
// //         </button>
// //         <button
// //           onClick={onClose}
// //           style={{
// //             background: "#dc3545",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             cursor: "pointer",
// //           }}
// //         >
// //           ❌ Cancel
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // 🔹 Input field reusable
// // const InputField = ({ label, name, value, onChange, type = "text" }) => (
// //   <div style={{ marginBottom: "10px" }}>
// //     <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
// //       {label}
// //     </label>
// //     <input
// //       type={type}
// //       name={name}
// //       value={value}
// //       onChange={onChange}
// //       style={{
// //         width: "100%",
// //         padding: "8px",
// //         borderRadius: "5px",
// //         border: "1px solid #ccc",
// //       }}
// //     />
// //   </div>
// // );

// // export default SaleList;
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Navigation from "../navigation/Navigation";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const SaleList = () => {
//   const [sales, setSales] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [purchases, setPurchases] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState('day');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

//   const [showModal, setShowModal] = useState(false);
//   const [currentSale, setCurrentSale] = useState(null);

//   // cache purchase prices to avoid recomputation
//   const priceCacheRef = useRef({});

//   useEffect(() => {
//     fetchAllSales();
//     fetchStocks();
//     fetchPurchases();
//     fetchProducts();
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

//   const fetchPurchases = () => {
//     axios
//       .get("http://localhost:8080/api/purchases")
//       .then((res) => setPurchases(res.data))
//       .catch((err) => console.error("Error fetching purchases:", err));
//   };

//   const fetchProducts = () => {
//     axios
//       .get("http://localhost:8080/api/product/get/product")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   // 🔹 UPDATED: Get selling price from products table
//   const getSellingPriceFromProduct = (product) => {
//     if (!product) return 0;
//     const productData = products.find(
//       (p) => p.productId === product.productId
//     );
//     return productData ? parseFloat(productData.sellingPrice) || 0 : 0;
//   };

//   // 🔹 UPDATED: Get buying price from products table (latestPurchasePrice)
//   const getBuyingPriceFromProduct = (product) => {
//     if (!product) return 0;
//     const productData = products.find(
//       (p) => p.productId === product.productId
//     );
//     return productData ? parseFloat(productData.latestPurchasePrice) || 0 : 0;
//   };

//   // 🔹 Fallback: get buying price from stock (keep as backup)
//   const getBuyingPriceFromStock = (product) => {
//     if (!product) return 0;
//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );
//     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
//   };

//   // 🔹 UPDATED: Compute actual purchase price using products table first, then cache + history as fallback
//   const getActualPurchasePrice = (sale) => {
//     try {
//       if (!sale?.product) return 0;
      
//       // First try to get from products table
//       const productPrice = getBuyingPriceFromProduct(sale.product);
//       if (productPrice > 0) {
//         return productPrice;
//       }

//       const productId = sale.product.productId;

//       // Check cache first
//       if (priceCacheRef.current[productId]) {
//         return priceCacheRef.current[productId];
//       }

//       const productPurchases = purchases.filter(
//         (p) => p.product?.productId === productId
//       );

//       if (productPurchases.length === 0) {
//         const fallback = getBuyingPriceFromStock(sale.product);
//         priceCacheRef.current[productId] = fallback;
//         return fallback;
//       }

//       const sortedPurchases = [...productPurchases].sort(
//         (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
//       );

//       const saleDate = sale.date ? new Date(sale.date) : null;

//       const relevantPurchase = saleDate
//         ? sortedPurchases.find((p) => new Date(p.purchaseDate) <= saleDate)
//         : sortedPurchases[0];

//       const purchaseToUse = relevantPurchase || sortedPurchases[0];
//       const purchasePrice = parseFloat(purchaseToUse.purchasePrice) || 0;

//       priceCacheRef.current[productId] = purchasePrice;
//       return purchasePrice;
//     } catch (error) {
//       console.error("Error getting actual purchase price:", error);
//       return getBuyingPriceFromStock(sale.product);
//     }
//   };

//   // 🔹 UPDATED: Precompute sale data with prices from products table
//   const saleData = useMemo(() => {
//     return sales.map((sale) => {
//       // Use selling price from products table, fallback to sale.unitPrice
//       const productSellingPrice = getSellingPriceFromProduct(sale.product);
//       const sellingPrice = productSellingPrice > 0 ? productSellingPrice : parseFloat(sale.unitPrice) || 0;
      
//       // Use buying price from products table, fallback to purchase history
//       const productBuyingPrice = getBuyingPriceFromProduct(sale.product);
//       const purchasePrice = productBuyingPrice > 0 ? productBuyingPrice : getActualPurchasePrice(sale);
      
//       const quantity = parseFloat(sale.quantity) || 0;

//       const totalPrice = sellingPrice * quantity;
//       const profit = (sellingPrice - purchasePrice) * quantity;
//       const cogs = purchasePrice * quantity;
//       const margin =
//         purchasePrice > 0
//           ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
//           : 0;

//       return {
//         ...sale,
//         sellingPrice: parseFloat(sellingPrice.toFixed(2)),
//         purchasePrice: parseFloat(purchasePrice.toFixed(2)),
//         profit: parseFloat(profit.toFixed(2)),
//         totalPrice: parseFloat(totalPrice.toFixed(2)),
//         cogs: parseFloat(cogs.toFixed(2)),
//         margin: parseFloat(Math.max(0, margin).toFixed(1)),
//       };
//     });
//   }, [sales, purchases, stocks, products]);

//   // 🔹 Totals (computed once per change)
//   const totalRevenue = useMemo(
//     () => saleData.reduce((sum, s) => sum + s.totalPrice, 0),
//     [saleData]
//   );

//   const totalProfit = useMemo(
//     () => saleData.reduce((sum, s) => sum + s.profit, 0),
//     [saleData]
//   );

//   const totalCOGS = useMemo(
//     () => saleData.reduce((sum, s) => sum + s.cogs, 0),
//     [saleData]
//   );

//   // 🔹 NEW: Filter sales based on report type and date
//   const getFilteredSales = () => {
//     if (!selectedDate) return saleData;

//     const currentDate = new Date(selectedDate);
    
//     switch (reportType) {
//       case 'day':
//         return saleData.filter(sale => {
//           if (!sale.date) return false;
//           const saleDate = new Date(sale.date);
//           return saleDate.toDateString() === currentDate.toDateString();
//         });
        
//       case 'week':
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//         startOfWeek.setHours(0, 0, 0, 0);
        
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);
        
//         return saleData.filter(sale => {
//           if (!sale.date) return false;
//           const saleDate = new Date(sale.date);
//           return saleDate >= startOfWeek && saleDate <= endOfWeek;
//         });
        
//       case 'month':
//         const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
//         return saleData.filter(sale => {
//           if (!sale.date) return false;
//           const saleDate = new Date(sale.date);
//           return saleDate >= startOfMonth && saleDate <= endOfMonth;
//         });
        
//       default:
//         return saleData;
//     }
//   };

//   // 🔹 NEW: Get report title based on type and date
//   const getReportTitle = () => {
//     const date = new Date(selectedDate);
//     switch (reportType) {
//       case 'day':
//         return `Daily Sales Report - ${date.toLocaleDateString()}`;
//       case 'week':
//         const startOfWeek = new Date(date);
//         startOfWeek.setDate(date.getDate() - date.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         return `Weekly Sales Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
//       case 'month':
//         return `Monthly Sales Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
//       default:
//         return 'Sales Report';
//     }
//   };

//   // 🔹 NEW: Download PDF Report
//   const downloadPDFReport = () => {
//     setReportLoading(true);
    
//     const filteredSales = getFilteredSales();
    
//     // Calculate totals for filtered data
//     const filteredRevenue = filteredSales.reduce((sum, s) => sum + s.totalPrice, 0);
//     const filteredProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
//     const filteredCOGS = filteredSales.reduce((sum, s) => sum + s.cogs, 0);

//     // Create report data
//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalSales: filteredSales.length,
//         totalRevenue: filteredRevenue,
//         totalProfit: filteredProfit,
//         totalCOGS: filteredCOGS,
//         averageProfit: filteredSales.length > 0 ? filteredProfit / filteredSales.length : 0,
//         averageMargin: filteredSales.length > 0 ? filteredSales.reduce((sum, s) => sum + s.margin, 0) / filteredSales.length : 0
//       },
//       sales: filteredSales.map(sale => ({
//         saleId: sale.saleId,
//         date: sale.date || 'N/A',
//         productName: sale.product?.productName || 'N/A',
//         quantity: sale.quantity,
//         sellingPrice: sale.sellingPrice.toFixed(2),
//         buyingPrice: sale.purchasePrice.toFixed(2),
//         totalPrice: sale.totalPrice.toFixed(2),
//         profit: sale.profit.toFixed(2),
//         margin: sale.margin.toFixed(1) + '%',
//         customer: sale.customerName || 'Walk-in'
//       }))
//     };

//     // Generate PDF
//     generatePDF(reportData);
//   };

//   // 🔹 NEW: Generate PDF using jsPDF
//   const generatePDF = (reportData) => {
//     // Import jsPDF dynamically
//     import('jspdf').then((jsPDFModule) => {
//       const { jsPDF } = jsPDFModule;
//       const pdf = new jsPDF();
      
//       // Set initial y position
//       let yPosition = 20;
      
//       // Add title
//       pdf.setFontSize(16);
//       pdf.setTextColor(40, 40, 40);
//       pdf.text('SALES REPORT', 105, yPosition, { align: 'center' });
//       yPosition += 10;
      
//       // Add report details
//       pdf.setFontSize(10);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text(`Report: ${reportData.title}`, 20, yPosition);
//       yPosition += 6;
//       pdf.text(`Generated: ${reportData.generatedAt}`, 20, yPosition);
//       yPosition += 15;
      
//       // Add summary section
//       pdf.setFontSize(12);
//       pdf.setTextColor(40, 40, 40);
//       pdf.text('SUMMARY', 20, yPosition);
//       yPosition += 8;
      
//       pdf.setFontSize(9);
//       pdf.setTextColor(80, 80, 80);
//       pdf.text(`Total Sales: ${reportData.summary.totalSales}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Revenue: Tsh ${reportData.summary.totalRevenue.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Profit: Tsh ${reportData.summary.totalProfit.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total COGS: Tsh ${reportData.summary.totalCOGS.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Profit per Sale: Tsh ${reportData.summary.averageProfit.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Margin: ${reportData.summary.averageMargin.toFixed(1)}%`, 20, yPosition);
//       yPosition += 15;
      
//       // Add table headers
//       pdf.setFontSize(9);
      
//       // Table headers configuration
//       const headers = ['Sale ID', 'Date', 'Product', 'Qty', 'Sell Price', 'Buy Price', 'Total', 'Profit', 'Margin', 'Customer'];
//       const columnWidths = [18, 22, 30, 12, 18, 18, 18, 18, 15, 25];
      
//       // Draw header background
//       pdf.setFillColor(59, 89, 152);
//       pdf.rect(10, yPosition, 186, 8, 'F');
      
//       // Add header text
//       pdf.setTextColor(255, 255, 255);
//       let xPosition = 12;
      
//       headers.forEach((header, index) => {
//         pdf.text(header, xPosition, yPosition + 6);
//         xPosition += columnWidths[index];
//       });
      
//       yPosition += 12;
      
//       // Reset text color for data rows
//       pdf.setTextColor(0, 0, 0);
      
//       // Add table rows
//       pdf.setFontSize(8);
      
//       reportData.sales.forEach((sale, index) => {
//         // Check if we need a new page
//         if (yPosition > 270) {
//           pdf.addPage();
//           yPosition = 20;
          
//           // Add headers on new page
//           pdf.setFontSize(9);
//           pdf.setFillColor(59, 89, 152);
//           pdf.rect(10, yPosition, 186, 8, 'F');
          
//           pdf.setTextColor(255, 255, 255);
//           xPosition = 12;
//           headers.forEach((header, idx) => {
//             pdf.text(header, xPosition, yPosition + 6);
//             xPosition += columnWidths[idx];
//           });
          
//           yPosition = 32;
//           pdf.setFontSize(8);
//           pdf.setTextColor(0, 0, 0);
//         }
        
//         // Alternate row colors
//         if (index % 2 === 0) {
//           pdf.setFillColor(245, 245, 245);
//           pdf.rect(10, yPosition - 4, 186, 6, 'F');
//         }
        
//         // Reset fill color for text
//         pdf.setFillColor(255, 255, 255);
        
//         xPosition = 12;
        
//         // Sale ID
//         pdf.text(sale.saleId.toString(), xPosition, yPosition);
//         xPosition += columnWidths[0];
        
//         // Date
//         pdf.text(sale.date.substring(0, 10), xPosition, yPosition);
//         xPosition += columnWidths[1];
        
//         // Product Name
//         pdf.text(sale.productName.substring(0, 15), xPosition, yPosition);
//         xPosition += columnWidths[2];
        
//         // Quantity
//         pdf.text(sale.quantity.toString(), xPosition, yPosition);
//         xPosition += columnWidths[3];
        
//         // Selling Price
//         pdf.text(sale.sellingPrice, xPosition, yPosition);
//         xPosition += columnWidths[4];
        
//         // Buying Price
//         pdf.text(sale.buyingPrice, xPosition, yPosition);
//         xPosition += columnWidths[5];
        
//         // Total Price
//         pdf.text(sale.totalPrice, xPosition, yPosition);
//         xPosition += columnWidths[6];
        
//         // Profit
//         pdf.text(sale.profit, xPosition, yPosition);
//         xPosition += columnWidths[7];
        
//         // Margin
//         pdf.text(sale.margin, xPosition, yPosition);
//         xPosition += columnWidths[8];
        
//         // Customer
//         pdf.text(sale.customer.substring(0, 12), xPosition, yPosition);
        
//         yPosition += 6;
//       });
      
//       // Add footer
//       const pageCount = pdf.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
//         pdf.text('Generated by Sales Management System', 105, 290, { align: 'center' });
//       }
      
//       // Save PDF
//       const fileName = `sales_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
//       pdf.save(fileName);
//       setReportLoading(false);
//     }).catch(error => {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF report');
//       setReportLoading(false);
//     });
//   };

//   // 🔹 NEW: Download CSV Report
//   const downloadCSVReport = () => {
//     setReportLoading(true);
    
//     const filteredSales = getFilteredSales();
    
//     // Calculate totals for filtered data
//     const filteredRevenue = filteredSales.reduce((sum, s) => sum + s.totalPrice, 0);
//     const filteredProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
//     const filteredCOGS = filteredSales.reduce((sum, s) => sum + s.cogs, 0);

//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalSales: filteredSales.length,
//         totalRevenue: filteredRevenue,
//         totalProfit: filteredProfit,
//         totalCOGS: filteredCOGS,
//         averageProfit: filteredSales.length > 0 ? filteredProfit / filteredSales.length : 0,
//         averageMargin: filteredSales.length > 0 ? filteredSales.reduce((sum, s) => sum + s.margin, 0) / filteredSales.length : 0
//       },
//       sales: filteredSales.map(sale => ({
//         saleId: sale.saleId,
//         date: sale.date || 'N/A',
//         productName: sale.product?.productName || 'N/A',
//         quantity: sale.quantity,
//         sellingPrice: sale.sellingPrice.toFixed(2),
//         buyingPrice: sale.purchasePrice.toFixed(2),
//         totalPrice: sale.totalPrice.toFixed(2),
//         profit: sale.profit.toFixed(2),
//         margin: sale.margin.toFixed(1) + '%',
//         customer: sale.customerName || 'Walk-in'
//       }))
//     };

//     // Create CSV content
//     const csvContent = createCSVContent(reportData);
    
//     // Create and download file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
    
//     link.setAttribute('href', url);
//     link.setAttribute('download', `sales_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     setReportLoading(false);
//   };

//   // 🔹 NEW: Create CSV content from report data
//   const createCSVContent = (reportData) => {
//     const headers = ['Sale ID', 'Date', 'Product Name', 'Quantity', 'Selling Price', 'Buying Price', 'Total Price', 'Profit', 'Margin', 'Customer'];
//     const csvRows = [];
    
//     // Add header
//     csvRows.push(headers.join(','));
    
//     // Add data rows
//     reportData.sales.forEach(sale => {
//       const row = [
//         sale.saleId,
//         `"${sale.date}"`,
//         `"${sale.productName}"`,
//         sale.quantity,
//         sale.sellingPrice,
//         sale.buyingPrice,
//         sale.totalPrice,
//         sale.profit,
//         sale.margin,
//         `"${sale.customer}"`
//       ];
//       csvRows.push(row.join(','));
//     });
    
//     // Add summary
//     csvRows.push('');
//     csvRows.push('SUMMARY');
//     csvRows.push(`Total Sales,${reportData.summary.totalSales}`);
//     csvRows.push(`Total Revenue,Tsh${reportData.summary.totalRevenue.toFixed(2)}`);
//     csvRows.push(`Total Profit,Tsh${reportData.summary.totalProfit.toFixed(2)}`);
//     csvRows.push(`Total COGS,Tsh${reportData.summary.totalCOGS.toFixed(2)}`);
//     csvRows.push(`Average Profit per Sale,Tsh${reportData.summary.averageProfit.toFixed(2)}`);
//     csvRows.push(`Average Margin,${reportData.summary.averageMargin.toFixed(1)}%`);
//     csvRows.push('');
//     csvRows.push(`Report Title,${reportData.title}`);
//     csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
//     return csvRows.join('\n');
//   };

//   // 🔹 Stock & helper functions
//   const getStockStatus = (product) => {
//     if (!product) return "N/A";
//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );
//     if (!stock) return "N/A";

//     const styleMap = {
//       "Sold Out": { color: "red", fontWeight: "bold" },
//       "Partially Sold": { color: "orange", fontWeight: "bold" },
//       "In Stock": { color: "green", fontWeight: "bold" },
//     };
//     const style = styleMap[stock.status] || { color: "gray" };

//     return <span style={style}>{stock.status || "N/A"}</span>;
//   };

//   const getCurrentStockQuantity = (product) => {
//     if (!product) return "N/A";
//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );
//     return stock ? stock.currentStock : "N/A";
//   };

//   const hasPurchaseHistory = (product) => {
//     if (!product) return false;
//     return purchases.some((p) => p.product?.productId === product.productId);
//   };

//   // 🔹 NEW: Check if product has price data in products table
//   const hasProductPriceData = (product) => {
//     if (!product) return false;
//     const productData = products.find((p) => p.productId === product.productId);
//     return productData && (productData.sellingPrice > 0 || productData.latestPurchasePrice > 0);
//   };

//   // 🔹 Delete sale
//   const deleteSale = (id) => {
//     if (!window.confirm("Are you sure you want to delete this sale?")) return;

//     fetch(`http://localhost:8080/api/sales/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to delete");
//         alert("Sale deleted successfully!");
//         fetchAllSales();
//         fetchStocks();
//       })
//       .catch((err) => alert("Error deleting sale: " + err.message));
//   };

//   // 🔹 Edit sale
//   const handleUpdateClick = (sale) => {
//     setCurrentSale({ ...sale, date: sale.date || "" });
//     setShowModal(true);
//   };

//   const handleUpdateChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentSale((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveUpdate = () => {
//     if (!currentSale) return;

//     const updatedSale = {
//       ...currentSale,
//       totalPrice:
//         (parseFloat(currentSale.quantity) || 0) *
//         (parseFloat(currentSale.unitPrice) || 0),
//     };

//     axios
//       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
//       .then(() => {
//         alert("Sale updated successfully!");
//         setShowModal(false);
//         fetchAllSales();
//         fetchStocks();
//       })
//       .catch((err) => {
//         alert("Error updating sale: " + err.message);
//       });
//   };

//   // 🔹 UI
//   return (
//     <>
//       <Navigation />
//       <div style={{ padding: "20px", marginBottom: "200px", marginTop: "90px" }}>
//         <div style={{ marginTop: "40px"}}>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <h2 style={{ marginTop: "40px", marginLeft: "590px" }}>
//               Sales List
//             </h2>
//             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//               {/* Summary Cards */}
//               <div style={{ display: "flex", gap: "15px" }}>
//                 <SummaryCard
//                   title="Total Revenue"
//                   color="#007bff"
//                   bg="#e7f3ff"
//                   value={`Tsh${totalRevenue.toFixed(2)}`}
//                 />
//                 <SummaryCard
//                   title="Total Profit"
//                   color="#28a745"
//                   bg="#d4edda"
//                   value={`Tsh${totalProfit.toFixed(2)}`}
//                 />
//                 <SummaryCard
//                   title="Total Sales"
//                   color="#856404"
//                   bg="#fff3cd"
//                   value={saleData.length}
//                 />
//                 <SummaryCard
//                   title="COGS"
//                   color="#721c24"
//                   bg="#f8d7da"
//                   value={`Tsh${totalCOGS.toFixed(2)}`}
//                 />
//               </div>

//               {/* 🔹 UPDATED: Report Download Section */}
//               <div style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: '10px',
//                 backgroundColor: '#f8f9fa',
//                 padding: '13px 15px',
//                 borderRadius: '8px',
//                 border: '1px solid #dee2e6'
//               }}>
//                 {/* Date Selection */}
//                 <div>
//                   <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
//                     Select Date:
//                   </label>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     style={{
//                       padding: '6px 10px',
//                       borderRadius: '5px',
//                       border: '1px solid #ced4da',
//                       backgroundColor: 'white',
//                       fontSize: '12px'
//                     }}
//                   />
//                 </div>

//                 {/* Report Type Selection */}
//                 <div>
//                   <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
//                     Report Type:
//                   </label>
//                   <select
//                     value={reportType}
//                     onChange={(e) => setReportType(e.target.value)}
//                     style={{
//                       padding: '6px 10px',
//                       borderRadius: '5px',
//                       border: '1px solid #ced4da',
//                       backgroundColor: 'white',
//                       fontSize: '12px'
//                     }}
//                   >
//                     <option value="day">Daily</option>
//                     <option value="week">Weekly</option>
//                     <option value="month">Monthly</option>
//                   </select>
//                 </div>
                
//                 <button
//                   onClick={downloadPDFReport}
//                   disabled={reportLoading}
//                   style={{
//                     padding: '8px 16px',
//                     backgroundColor: '#dc3545',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: reportLoading ? 'not-allowed' : 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '5px',
//                     opacity: reportLoading ? 0.7 : 1
//                   }}
//                 >
//                   📄 {reportLoading ? 'Generating...' : 'PDF Report'}
//                 </button>

//                 <button
//                   onClick={downloadCSVReport}
//                   disabled={reportLoading}
//                   style={{
//                     padding: '8px 16px',
//                     backgroundColor: '#28a745',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: reportLoading ? 'not-allowed' : 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '5px',
//                     opacity: reportLoading ? 0.7 : 1
//                   }}
//                 >
//                   📊 {reportLoading ? 'Generating...' : 'CSV Report'}
//                 </button>
//               </div>

//               <Link to="/add-sale">
//                 <button
//                   style={{
//                     borderRadius: "10px",
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "10px 20px",
//                     border: "none",
//                     cursor: "pointer",
//                     width: "100px",
//                   }}
//                 >
//                   Add Sale
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {error && <p style={{ color: "red" }}>Error: {error}</p>}
//         {loading ? (
//           <p>Loading...</p>
//         ) : saleData.length === 0 ? (
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
//                 width: "150%",
//                 tableLayout: "fixed",
//               }}
//             >
//               <thead
//                 style={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 1,
//                   background: "#2c3e50",
//                   color: "white",
//                 }}
//               >
//                 <tr>
//                   <th>Sale ID</th>
//                   <th>Selling Date</th>
//                   <th>Product Name</th>
//                   <th>Qty Sold</th>
//                   <th>Selling Price/unit</th>
//                   <th>Buying Price/unit</th>
//                   <th>Total Selling Price</th>
//                   <th>Profit</th>
//                   <th>Margin</th>
//                   <th>Customer</th>
//                   <th>Stock Status</th>
//                   <th>Qty Left InStock</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {saleData.map((sale) => {
//                   const hasPurchaseData = hasPurchaseHistory(sale.product);
//                   const hasProductData = hasProductPriceData(sale.product);
//                   const profitColor =
//                     sale.profit > 0
//                       ? "green"
//                       : sale.profit < 0
//                       ? "red"
//                       : "#6c757d";
//                   const marginColor =
//                     sale.margin > 50
//                       ? "green"
//                       : sale.margin > 20
//                       ? "#17a2b8"
//                       : sale.margin > 0
//                       ? "#ffc107"
//                       : "red";

//                   return (
//                     <tr key={sale.saleId}>
//                       <td>{sale.saleId}</td>
//                       <td>{sale.date}</td>
//                       <td>
//                         {sale.product?.productName || "N/A"}
//                         {!hasProductData && (
//                           <div
//                             style={{
//                               fontSize: "10px",
//                               color: "orange",
//                               fontStyle: "italic",
//                             }}
//                           >
//                             *Using calculated prices
//                           </div>
//                         )}
//                         {hasProductData && !hasPurchaseData && (
//                           <div
//                             style={{
//                               fontSize: "10px",
//                               color: "green",
//                               fontStyle: "italic",
//                             }}
//                           >
//                             *Using product table prices
//                           </div>
//                         )}
//                       </td>
//                       <td>{sale.quantity}</td>
//                       <td>Tsh{sale.sellingPrice.toFixed(2)}</td>
//                       <td>Tsh{sale.purchasePrice.toFixed(2)}</td>
//                       <td>Tsh{sale.totalPrice.toFixed(2)}</td>
//                       <td style={{ fontWeight: "bold", color: profitColor }}>
//                         Tsh{sale.profit.toFixed(2)}
//                       </td>
//                       <td
//                         style={{
//                           fontWeight: "bold",
//                           color: marginColor,
//                           fontSize: "12px",
//                         }}
//                       >
//                         {sale.margin.toFixed(1)}%
//                       </td>
//                       <td>{sale.customerName || "Walk-in"}</td>
//                       <td>{getStockStatus(sale.product)}</td>
//                       <td style={{ textAlign: "center" }}>
//                         {getCurrentStockQuantity(sale.product)}
//                       </td>
//                       <td>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             gap: "5px",
//                           }}
//                         >
//                           <button
//                             onClick={() => handleUpdateClick(sale)}
//                             style={buttonStyle("#007bff")}
//                           >
//                             ✏️ Edit
//                           </button>
//                           <button
//                             onClick={() => deleteSale(sale.saleId)}
//                             style={buttonStyle("#dc3545")}
//                           >
//                             🗑️ Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Update Modal */}
//         {showModal && currentSale && (
//           <UpdateModal
//             currentSale={currentSale}
//             getBuyingPriceFromProduct={getBuyingPriceFromProduct}
//             hasPurchaseHistory={hasPurchaseHistory}
//             hasProductPriceData={hasProductPriceData}
//             onSave={handleSaveUpdate}
//             onChange={handleUpdateChange}
//             onClose={() => setShowModal(false)}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// // 🔹 Reusable summary card
// const SummaryCard = ({ title, value, color, bg }) => (
//   <div
//     style={{
//       backgroundColor: bg,
//       padding: "10px 15px",
//       borderRadius: "10px",
//       border: `2px solid ${color}`,
//       fontWeight: "bold",
//       color,
//       textAlign: "center",
//       minWidth: "120px"
//     }}
//   >
//     <div style={{ fontSize: "12px" }}>{title}</div>
//     <div style={{ fontSize: "14px" }}>{value}</div>
//   </div>
// );

// // 🔹 Reusable button style
// const buttonStyle = (bg) => ({
//   background: bg,
//   color: "white",
//   padding: "5px 10px",
//   borderRadius: "5px",
//   border: "none",
//   cursor: "pointer",
//   fontSize: "12px",
// });

// // 🔹 UPDATED: Modal Component with product price info
// const UpdateModal = ({
//   currentSale,
//   hasPurchaseHistory,
//   hasProductPriceData,
//   getBuyingPriceFromProduct,
//   onSave,
//   onChange,
//   onClose,
// }) => (
//   <div
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//     }}
//   >
//     <div
//       style={{
//         background: "white",
//         padding: "25px",
//         borderRadius: "15px",
//         width: "450px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//       }}
//     >
//       <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
//         ✏️ Update Sale
//       </h3>

//       <div
//         style={{
//           marginBottom: "15px",
//           padding: "10px",
//           backgroundColor: "#f8f9fa",
//           borderRadius: "8px",
//           border: "1px solid #e9ecef",
//         }}
//       >
//         <div style={{ fontWeight: "bold", color: "#495057" }}>
//           Product: {currentSale.product?.productName || "N/A"}
//         </div>
//         <div style={{ color: "#6c757d", fontSize: "14px" }}>
//           Actual Buying Price: Tsh
//           {getBuyingPriceFromProduct(currentSale.product).toFixed(2)}
//         </div>
//         <div
//           style={{
//             color: hasProductPriceData(currentSale.product) 
//               ? "#28a745" 
//               : hasPurchaseHistory(currentSale.product)
//               ? "#17a2b8"
//               : "#ffc107",
//             fontSize: "12px",
//             fontStyle: "italic",
//           }}
//         >
//           {hasProductPriceData(currentSale.product)
//             ? "Based on product table prices"
//             : hasPurchaseHistory(currentSale.product)
//             ? "Based on purchase history"
//             : "Estimated from current stock price"}
//         </div>
//       </div>

//       <InputField
//         label="Date"
//         name="date"
//         type="date"
//         value={currentSale.date || ""}
//         onChange={onChange}
//       />
//       <InputField
//         label="Customer Name"
//         name="customerName"
//         value={currentSale.customerName || ""}
//         onChange={onChange}
//       />
//       <InputField
//         label="Quantity"
//         name="quantity"
//         type="number"
//         value={currentSale.quantity || ""}
//         onChange={onChange}
//       />
//       <InputField
//         label="Unit Price"
//         name="unitPrice"
//         type="number"
//         value={currentSale.unitPrice || ""}
//         onChange={onChange}
//       />

//       <div style={{ textAlign: "center" }}>
//         <button
//           onClick={onSave}
//           style={{
//             background: "#28a745",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "8px",
//             border: "none",
//             marginRight: "10px",
//             cursor: "pointer",
//           }}
//         >
//           💾 Save
//         </button>
//         <button
//           onClick={onClose}
//           style={{
//             background: "#dc3545",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           ❌ Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // 🔹 Input field reusable
// const InputField = ({ label, name, value, onChange, type = "text" }) => (
//   <div style={{ marginBottom: "10px" }}>
//     <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       style={{
//         width: "100%",
//         padding: "8px",
//         borderRadius: "5px",
//         border: "1px solid #ccc",
//       }}
//     />
//   </div>
// );

// export default SaleList;

// // import React, { useEffect, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]); // ✅ keep stock data
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Filters
// //   const [saleId, setSaleId] = useState("");
// //   const [date, setDate] = useState("");
// //   const [customerName, setCustomerName] = useState("");
// //   const [productId, setProductId] = useState("");
// //   const [totalAmount, setTotalAmount] = useState(null);
// //   const [totalQuantity, setTotalQuantity] = useState(null);

// //   // Fetch all sales & stocks
// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   // Helper: find stock for a given productId
// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";

// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );

// //     if (!stock) return "N/A";

// //     return stock.currentStock > 0 ? (
// //       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
// //     ) : (
// //       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
// //     );
// //   };

// //   const deleteSale = (id) => {
// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted!");
// //         fetchAllSales();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px",marginBottom:"200px" }}>
// //         <div style={{ marginTop: "40px" }}>
// //           <div style={{ display: "flex", flexDirection: "row" }}>
// //             <h2 style={{ marginTop: "40px", marginLeft: "790px" }}>
// //               Sales List
// //             </h2>
// //             <Link to="/add-sale">
// //               <button
// //                 style={{
// //                   borderRadius: "10px",
// //                   marginLeft: "350px",
// //                   backgroundColor: "#4CAF50",
// //                   color: "white",
// //                   padding: "10px 20px",
// //                   border: "none",
// //                   cursor: "pointer",
// //                   width: "100px",
// //                 }}
// //               >
// //                 AddSale
// //               </button>
// //             </Link>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : sales.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //                 marginRight: "10px",
// //               }}
// //             >
// //               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
// //                 <tr style={{ background: "#f0f0f0" }}>
// //                   <th style={{ width: "80px" }}>Sale ID</th>
// //                   <th style={{ width: "120px" }}>Date</th>
// //                   <th style={{ width: "150px" }}>Product Name</th>
// //                   <th style={{ width: "100px" }}>Quantity</th>
// //                   <th style={{ width: "100px" }}>Unit Price</th>
// //                   <th style={{ width: "120px" }}>Total Price</th>
// //                   <th style={{ width: "150px" }}>Customer</th>
// //                   <th style={{ width: "120px" }}>Stock Status</th>
// //                   <th style={{ width: "100px" }}>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {sales.map((sale) => (
// //                   <tr key={sale.saleId}>
// //                     <td>{sale.saleId}</td>
// //                     <td>{sale.date}</td>
// //                     <td>{sale.product ? sale.product.productName : "0"}</td>
// //                     <td>{sale.quantity}</td>
// //                     <td>{sale.unitPrice}</td>
// //                     <td>{sale.totalPrice}</td>
// //                     <td>{sale.customerName || "0"}</td>
// //                     <td>{getStockStatus(sale.product)}</td>
// //                     <td>
// //                       <div style={{ display: "flex", flexDirection: "row" }}>
// //                         <button
// //                           onClick={() => alert(`Update sale ${sale.saleId}`)}
// //                           style={{
// //                             color: "blue",
// //                             marginRight: "8px",
// //                             borderRadius: "10px",
// //                           }}
// //                         >
// //                           Update
// //                         </button>
// //                         <button
// //                           onClick={() => deleteSale(sale.saleId)}
// //                           style={{ color: "red", borderRadius: "10px" }}
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default SaleList;
// // import React, { useEffect, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]); // ✅ keep stock data
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Modal state
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   // Fetch all sales & stocks
// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   // Helper: find stock for a given productId
// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";

// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );

// //     if (!stock) return "N/A";

// //     return stock.currentStock > 0 ? (
// //       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
// //     ) : (
// //       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
// //     );
// //   };

// //   const deleteSale = (id) => {
// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted!");
// //         fetchAllSales();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   // Open update modal
// //   const openUpdateModal = (sale) => {
// //     setCurrentSale({ ...sale });
// //     setShowModal(true);
// //   };

// //   // Handle update form change
// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({
// //       ...prev,
// //       [name]: value,
// //     }));
// //   };

// //   // Save update
// //   const updateSale = () => {
// //     fetch(`http://localhost:8080/api/sales/${currentSale.saleId}`, {
// //       method: "PUT",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify(currentSale),
// //     })
// //       .then((res) => {
// //         if (!res.ok) throw new Error("Failed to update");
// //         alert("Sale updated!");
// //         setShowModal(false);
// //         fetchAllSales();
// //       })
// //       .catch((err) => alert("Error updating sale: " + err.message));
// //   };

// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// //         <div style={{ marginTop: "40px" }}>
// //           <div style={{ display: "flex", flexDirection: "row" }}>
// //             <h2 style={{ marginTop: "40px", marginLeft: "790px" }}>
// //               Sales List
// //             </h2>
// //             <Link to="/add-sale">
// //               <button
// //                 style={{
// //                   borderRadius: "10px",
// //                   marginLeft: "350px",
// //                   backgroundColor: "#4CAF50",
// //                   color: "white",
// //                   padding: "10px 20px",
// //                   border: "none",
// //                   cursor: "pointer",
// //                   width: "100px",
// //                 }}
// //               >
// //                 AddSale
// //               </button>
// //             </Link>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : sales.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //                 marginRight: "10px",
// //               }}
// //             >
// //               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
// //                 <tr style={{ background: "#f0f0f0" }}>
// //                   <th style={{ width: "80px" }}>Sale ID</th>
// //                   <th style={{ width: "120px" }}>Date</th>
// //                   <th style={{ width: "150px" }}>Product Name</th>
// //                   <th style={{ width: "100px" }}>Quantity</th>
// //                   <th style={{ width: "100px" }}>Unit Price</th>
// //                   <th style={{ width: "120px" }}>Total Price</th>
// //                   <th style={{ width: "150px" }}>Customer</th>
// //                   <th style={{ width: "120px" }}>Stock Status</th>
// //                   <th style={{ width: "100px" }}>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {sales.map((sale) => (
// //                   <tr key={sale.saleId}>
// //                     <td>{sale.saleId}</td>
// //                     <td>{sale.date}</td>
// //                     <td>{sale.product ? sale.product.productName : "0"}</td>
// //                     <td>{sale.quantity}</td>
// //                     <td>{sale.unitPrice}</td>
// //                     <td>{sale.totalPrice}</td>
// //                     <td>{sale.customerName || "0"}</td>
// //                     <td>{getStockStatus(sale.product)}</td>
// //                     <td>
// //                       <div style={{ display: "flex", flexDirection: "row" }}>
// //                         <button
// //                           onClick={() => openUpdateModal(sale)}
// //                           style={{
// //                             color: "blue",
// //                             marginRight: "8px",
// //                             borderRadius: "10px",
// //                           }}
// //                         >
// //                           Update
// //                         </button>
// //                         <button
// //                           onClick={() => deleteSale(sale.saleId)}
// //                           style={{ color: "red", borderRadius: "10px" }}
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* ✅ Update Modal */}
// //         {showModal && currentSale && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               right: 0,
// //               bottom: 0,
// //               background: "rgba(0,0,0,0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "20px",
// //                 borderRadius: "10px",
// //                 width: "400px",
// //               }}
// //             >
// //               <h3>Update Sale</h3>
// //               <label>Date:</label>
// //               <input
// //                 type="date"
// //                 name="date"
// //                 value={currentSale.date}
// //                 onChange={handleChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />
// //               <label>Quantity:</label>
// //               <input
// //                 type="number"
// //                 name="quantity"
// //                 value={currentSale.quantity}
// //                 onChange={handleChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />
// //               <label>Unit Price:</label>
// //               <input
// //                 type="number"
// //                 name="unitPrice"
// //                 value={currentSale.unitPrice}
// //                 onChange={handleChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />
// //               <label>Customer:</label>
// //               <input
// //                 type="text"
// //                 name="customerName"
// //                 value={currentSale.customerName || ""}
// //                 onChange={handleChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />

// //               <div style={{ display: "flex", justifyContent: "flex-end" }}>
// //                 <button
// //                   onClick={() => setShowModal(false)}
// //                   style={{
// //                     marginRight: "10px",
// //                     borderRadius: "8px",
// //                     background: "gray",
// //                     color: "white",
// //                   }}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={updateSale}
// //                   style={{
// //                     borderRadius: "8px",
// //                     background: "green",
// //                     color: "white",
// //                   }}
// //                 >
// //                   Save
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default SaleList;

// // import React, { useEffect, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Modal state
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";
// //     return stock.currentStock > 0 ? (
// //       <span style={{ color: "green", fontWeight: "bold" }}>In Stock</span>
// //     ) : (
// //       <span style={{ color: "red", fontWeight: "bold" }}>Out of Stock</span>
// //     );
// //   };

// //   const deleteSale = (id) => {
// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted!");
// //         fetchAllSales();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ ...sale }); // clone to edit
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;
// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, currentSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// //         <div style={{ marginTop: "40px" }}>
// //           <div style={{ display: "flex", flexDirection: "row" }}>
// //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// //               Sales List
// //             </h2>
// //             <Link to="/add-sale">
// //               <button
// //                 style={{
// //                   borderRadius: "10px",
// //                   marginLeft: "350px",
// //                   backgroundColor: "#4CAF50",
// //                   color: "white",
// //                   padding: "10px 20px",
// //                   border: "none",
// //                   cursor: "pointer",
// //                   width: "100px",
// //                 }}
// //               >
// //                 AddSale
// //               </button>
// //             </Link>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : sales.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //                 marginRight: "10px",
// //               }}
// //             >
// //               <thead style={{ position: "sticky", top: 0, zIndex: 1 }}>
// //                 <tr style={{ background: "#f0f0f0" }}>
// //                   <th style={{ width: "80px" }}>Sale ID</th>
// //                   <th style={{ width: "120px" }}>Date</th>
// //                   <th style={{ width: "150px" }}>Product Name</th>
// //                   <th style={{ width: "100px" }}>Quantity</th>
// //                   <th style={{ width: "100px" }}>Unit Price</th>
// //                   <th style={{ width: "120px" }}>Total Price</th>
// //                   <th style={{ width: "150px" }}>Customer</th>
// //                   <th style={{ width: "120px" }}>Stock Status</th>
// //                   <th style={{ width: "100px" }}>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {sales.map((sale) => (
// //                   <tr key={sale.saleId}>
// //                     <td>{sale.saleId}</td>
// //                     <td>{sale.date}</td>
// //                     <td>{sale.product ? sale.product.productName : "0"}</td>
// //                     <td>{sale.quantity}</td>
// //                     <td>{sale.unitPrice}</td>
// //                     <td>{sale.totalPrice}</td>
// //                     <td>{sale.customerName || "0"}</td>
// //                     <td>{getStockStatus(sale.product)}</td>
// //                     <td>
// //                       <div style={{ display: "flex", flexDirection: "row" }}>
// //                         <button
// //                           onClick={() => handleUpdateClick(sale)}
// //                           style={{
// //                             color: "blue",
// //                             marginRight: "8px",
// //                             borderRadius: "10px",
// //                           }}
// //                         >
// //                           Update
// //                         </button>
// //                         <button
// //                           onClick={() => deleteSale(sale.saleId)}
// //                           style={{ color: "red", borderRadius: "10px" }}
// //                         >
// //                           Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* ✅ Update Modal */}
// //         {showModal && currentSale && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               width: "100%",
// //               height: "100%",
// //               background: "rgba(0,0,0,0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "20px",
// //                 borderRadius: "10px",
// //                 width: "400px",
// //               }}
// //             >
// //               <h3>Update Sale</h3>
// //               <label>Date:</label>
// //               <input
// //                 type="date"
// //                 name="date"
// //                 value={currentSale.date || ""}
// //                 onChange={handleUpdateChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />

// //               <label>Customer Name:</label>
// //               <input
// //                 type="text"
// //                 name="customerName"
// //                 value={currentSale.customerName || ""}
// //                 onChange={handleUpdateChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />

// //               <label>Quantity:</label>
// //               <input
// //                 type="number"
// //                 name="quantity"
// //                 value={currentSale.quantity || ""}
// //                 onChange={handleUpdateChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />

// //               <label>Unit Price:</label>
// //               <input
// //                 type="number"
// //                 name="unitPrice"
// //                 value={currentSale.unitPrice || ""}
// //                 onChange={handleUpdateChange}
// //                 style={{ width: "100%", marginBottom: "10px" }}
// //               />

// //               <button
// //                 onClick={handleSaveUpdate}
// //                 style={{
// //                   background: "green",
// //                   color: "white",
// //                   padding: "8px 15px",
// //                   marginRight: "10px",
// //                   borderRadius: "5px",
// //                   border: "none",
// //                 }}
// //               >
// //                 Save
// //               </button>
// //               <button
// //                 onClick={() => setShowModal(false)}
// //                 style={{
// //                   background: "gray",
// //                   color: "white",
// //                   padding: "8px 15px",
// //                   borderRadius: "5px",
// //                   border: "none",
// //                 }}
// //               >
// //                 Cancel
// //               </button>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default SaleList;

// // import React, { useEffect, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Modal state
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   // Updated stock status function to match new stock structure
// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";
    
// //     // Use the new status field from stock
// //     const statusStyle = {
// //       'Sold Out': { color: "red", fontWeight: "bold" },
// //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// //       'In Stock': { color: "green", fontWeight: "bold" }
// //     };
    
// //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// //     return <span style={style}>{stock.status || 'N/A'}</span>;
// //   };

// //   // Updated to show current stock quantity
// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   const deleteSale = (id) => {
// //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks(); // Refresh stocks to update quantities
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ 
// //       ...sale,
// //       date: sale.date || ''
// //     });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;
    
// //     // Recalculate total price before sending
// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks(); // Refresh stocks to update quantities
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// //         <div style={{ marginTop: "40px" }}>
// //           <div style={{ display: "flex", flexDirection: "row" }}>
// //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// //               Sales List
// //             </h2>
// //             <Link to="/add-sale">
// //               <button
// //                 style={{
// //                   borderRadius: "10px",
// //                   marginLeft: "350px",
// //                   backgroundColor: "#4CAF50",
// //                   color: "white",
// //                   padding: "10px 20px",
// //                   border: "none",
// //                   cursor: "pointer",
// //                   width: "100px",
// //                 }}
// //               >
// //                 Add Sale
// //               </button>
// //             </Link>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : sales.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //                 marginRight: "10px",
// //               }}
// //             >
// //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// //                 <tr>
// //                   <th style={{ width: "80px" }}>Sale ID</th>
// //                   <th style={{ width: "120px" }}>Date</th>
// //                   <th style={{ width: "150px" }}>Product Name</th>
// //                   <th style={{ width: "100px" }}>Quantity</th>
// //                   <th style={{ width: "100px" }}>Unit Price</th>
// //                   <th style={{ width: "120px" }}>Total Price</th>
// //                   <th style={{ width: "150px" }}>Customer</th>
// //                   <th style={{ width: "120px" }}>Stock Status</th>
// //                   <th style={{ width: "100px" }}>Current Stock</th>
// //                   <th style={{ width: "120px" }}>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {sales.map((sale) => (
// //                   <tr key={sale.saleId}>
// //                     <td>{sale.saleId}</td>
// //                     <td>{sale.date}</td>
// //                     <td>{sale.product ? sale.product.productName : "N/A"}</td>
// //                     <td>{sale.quantity}</td>
// //                     <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// //                     <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// //                     <td>{sale.customerName || "Walk-in"}</td>
// //                     <td>{getStockStatus(sale.product)}</td>
// //                     <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// //                     <td>
// //                       <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// //                         <button
// //                           onClick={() => handleUpdateClick(sale)}
// //                           style={{
// //                             background: "#007bff",
// //                             color: "white",
// //                             padding: "5px 10px",
// //                             borderRadius: "5px",
// //                             border: "none",
// //                             cursor: "pointer",
// //                             fontSize: "12px"
// //                           }}
// //                         >
// //                           ✏️ Edit
// //                         </button>
// //                         <button
// //                           onClick={() => deleteSale(sale.saleId)}
// //                           style={{
// //                             background: "#dc3545",
// //                             color: "white",
// //                             padding: "5px 10px",
// //                             borderRadius: "5px",
// //                             border: "none",
// //                             cursor: "pointer",
// //                             fontSize: "12px"
// //                           }}
// //                         >
// //                           🗑️ Delete
// //                         </button>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ))}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* ✅ Update Modal */}
// //         {showModal && currentSale && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               width: "100%",
// //               height: "100%",
// //               background: "rgba(0,0,0,0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               zIndex: 1000
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "25px",
// //                 borderRadius: "15px",
// //                 width: "450px",
// //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// //               }}
// //             >
// //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //                 ✏️ Update Sale
// //               </h3>
              
// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// //                 <input
// //                   type="date"
// //                   name="date"
// //                   value={currentSale.date || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// //                 <input
// //                   type="text"
// //                   name="customerName"
// //                   value={currentSale.customerName || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// //                 <input
// //                   type="number"
// //                   name="quantity"
// //                   min="1"
// //                   value={currentSale.quantity || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "20px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// //                 <input
// //                   type="number"
// //                   name="unitPrice"
// //                   min="0"
// //                   step="0.01"
// //                   value={currentSale.unitPrice || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ textAlign: "center" }}>
// //                 <button
// //                   onClick={handleSaveUpdate}
// //                   style={{
// //                     background: "#28a745",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     marginRight: "10px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   💾 Save Changes
// //                 </button>
// //                 <button
// //                   onClick={() => setShowModal(false)}
// //                   style={{
// //                     background: "#6c757d",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   ❌ Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default SaleList;

// // import React, { useEffect, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Modal state
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   // Calculate profit for each sale
// //   const calculateSaleProfit = (sale) => {
// //     if (!sale.product) return 0;
    
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === sale.product.productId
// //     );
    
// //     if (!stock) return 0;
    
// //     const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
// //     const sellingPrice = parseFloat(sale.unitPrice) || 0;
// //     const quantity = parseFloat(sale.quantity) || 0;
    
// //     return (sellingPrice - buyingPrice) * quantity;
// //   };

// //   // Calculate total profit across all sales
// //   const calculateTotalProfit = () => {
// //     return sales.reduce((total, sale) => {
// //       return total + calculateSaleProfit(sale);
// //     }, 0);
// //   };

// //   // Get buying price for a product
// //   const getBuyingPrice = (product) => {
// //     if (!product) return 0;
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// //   };

// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";
    
// //     const statusStyle = {
// //       'Sold Out': { color: "red", fontWeight: "bold" },
// //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// //       'In Stock': { color: "green", fontWeight: "bold" }
// //     };
    
// //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// //     return <span style={style}>{stock.status || 'N/A'}</span>;
// //   };

// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   const deleteSale = (id) => {
// //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ 
// //       ...sale,
// //       date: sale.date || ''
// //     });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;
    
// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// //         <div style={{ marginTop: "40px" }}>
// //           <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
// //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// //               Sales List
// //             </h2>
// //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //               <div style={{
// //                 backgroundColor: "#f8f9fa",
// //                 padding: "10px 20px",
// //                 borderRadius: "10px",
// //                 border: "2px solid #28a745",
// //                 fontWeight: "bold",
// //                 color: "#28a745"
// //               }}>
// //                 Total Profit: ${calculateTotalProfit().toFixed(2)}
// //               </div>
// //               <Link to="/add-sale">
// //                 <button
// //                   style={{
// //                     borderRadius: "10px",
// //                     backgroundColor: "#4CAF50",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     width: "100px",
// //                   }}
// //                 >
// //                   Add Sale
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : sales.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //                 marginRight: "10px",
// //               }}
// //             >
// //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// //                 <tr>
// //                   <th style={{ width: "80px" }}>Sale ID</th>
// //                   <th style={{ width: "120px" }}>Date</th>
// //                   <th style={{ width: "150px" }}>Product Name</th>
// //                   <th style={{ width: "100px" }}>Quantity</th>
// //                   <th style={{ width: "100px" }}>Unit Price</th>
// //                   <th style={{ width: "100px" }}>Buying Price</th>
// //                   <th style={{ width: "120px" }}>Total Price</th>
// //                   <th style={{ width: "120px" }}>Profit</th>
// //                   <th style={{ width: "150px" }}>Customer</th>
// //                   <th style={{ width: "120px" }}>Stock Status</th>
// //                   <th style={{ width: "100px" }}>Current Stock</th>
// //                   <th style={{ width: "120px" }}>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {sales.map((sale) => {
// //                   const profit = calculateSaleProfit(sale);
// //                   const buyingPrice = getBuyingPrice(sale.product);
                  
// //                   return (
// //                     <tr key={sale.saleId}>
// //                       <td>{sale.saleId}</td>
// //                       <td>{sale.date}</td>
// //                       <td>{sale.product ? sale.product.productName : "N/A"}</td>
// //                       <td>{sale.quantity}</td>
// //                       <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// //                       <td>${buyingPrice.toFixed(2)}</td>
// //                       <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// //                       <td style={{ 
// //                         fontWeight: "bold", 
// //                         color: profit >= 0 ? "green" : "red" 
// //                       }}>
// //                         ${profit.toFixed(2)}
// //                       </td>
// //                       <td>{sale.customerName || "Walk-in"}</td>
// //                       <td>{getStockStatus(sale.product)}</td>
// //                       <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// //                       <td>
// //                         <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// //                           <button
// //                             onClick={() => handleUpdateClick(sale)}
// //                             style={{
// //                               background: "#007bff",
// //                               color: "white",
// //                               padding: "5px 10px",
// //                               borderRadius: "5px",
// //                               border: "none",
// //                               cursor: "pointer",
// //                               fontSize: "12px"
// //                             }}
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => deleteSale(sale.saleId)}
// //                             style={{
// //                               background: "#dc3545",
// //                               color: "white",
// //                               padding: "5px 10px",
// //                               borderRadius: "5px",
// //                               border: "none",
// //                               cursor: "pointer",
// //                               fontSize: "12px"
// //                             }}
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Update Modal - Add buying price display */}
// //         {showModal && currentSale && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               width: "100%",
// //               height: "100%",
// //               background: "rgba(0,0,0,0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               zIndex: 1000
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "25px",
// //                 borderRadius: "15px",
// //                 width: "450px",
// //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// //               }}
// //             >
// //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //                 ✏️ Update Sale
// //               </h3>
              
// //               {/* Show buying price information */}
// //               <div style={{ 
// //                 marginBottom: "15px", 
// //                 padding: "10px", 
// //                 backgroundColor: "#f8f9fa", 
// //                 borderRadius: "8px",
// //                 border: "1px solid #e9ecef"
// //               }}>
// //                 <div style={{ fontWeight: "bold", color: "#495057" }}>
// //                   Product: {currentSale.product?.productName || "N/A"}
// //                 </div>
// //                 <div style={{ color: "#6c757d", fontSize: "14px" }}>
// //                   Buying Price: ${getBuyingPrice(currentSale.product).toFixed(2)}
// //                 </div>
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// //                 <input
// //                   type="date"
// //                   name="date"
// //                   value={currentSale.date || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// //                 <input
// //                   type="text"
// //                   name="customerName"
// //                   value={currentSale.customerName || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// //                 <input
// //                   type="number"
// //                   name="quantity"
// //                   min="1"
// //                   value={currentSale.quantity || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "20px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// //                 <input
// //                   type="number"
// //                   name="unitPrice"
// //                   min="0"
// //                   step="0.01"
// //                   value={currentSale.unitPrice || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ textAlign: "center" }}>
// //                 <button
// //                   onClick={handleSaveUpdate}
// //                   style={{
// //                     background: "#28a745",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     marginRight: "10px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   💾 Save Changes
// //                 </button>
// //                 <button
// //                   onClick={() => setShowModal(false)}
// //                   style={{
// //                     background: "#6c757d",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   ❌ Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default SaleList;

// // import React, { useEffect, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Modal state
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   // FIXED: Calculate profit for each sale - UPDATED LOGIC
// //   const calculateSaleProfit = (sale) => {
// //     try {
// //       if (!sale.product) return 0;
      
// //       // Use the sale's original purchase price if available (most accurate)
// //       if (sale.purchasePrice !== undefined && sale.purchasePrice !== null) {
// //         const purchasePrice = parseFloat(sale.purchasePrice) || 0;
// //         const sellingPrice = parseFloat(sale.unitPrice) || 0;
// //         const quantity = parseFloat(sale.quantity) || 0;
        
// //         return (sellingPrice - purchasePrice) * quantity;
// //       }
      
// //       // Fallback: Use current stock price (less accurate but better than nothing)
// //       const stock = stocks.find(
// //         (s) => s.product && s.product.productId === sale.product.productId
// //       );
      
// //       if (!stock) return 0;
      
// //       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
// //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
// //       const quantity = parseFloat(sale.quantity) || 0;
      
// //       // Ensure we don't calculate negative profit per unit
// //       const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
// //       return profitPerUnit * quantity;
// //     } catch (error) {
// //       console.error('Error calculating profit for sale:', sale.saleId, error);
// //       return 0;
// //     }
// //   };

// //   // Calculate total profit across all sales
// //   const calculateTotalProfit = () => {
// //     return sales.reduce((total, sale) => {
// //       return total + calculateSaleProfit(sale);
// //     }, 0);
// //   };

// //   // Calculate total revenue
// //   const calculateTotalRevenue = () => {
// //     return sales.reduce((total, sale) => {
// //       return total + (parseFloat(sale.totalPrice) || 0);
// //     }, 0);
// //   };

// //   // Get buying price for a product - IMPROVED
// //   const getBuyingPrice = (sale) => {
// //     try {
// //       // First try to get the original purchase price from sale data
// //       if (sale.purchasePrice !== undefined && sale.purchasePrice !== null) {
// //         return parseFloat(sale.purchasePrice) || 0;
// //       }
      
// //       // Fallback to current stock price
// //       if (!sale.product) return 0;
// //       const stock = stocks.find(
// //         (s) => s.product && s.product.productId === sale.product.productId
// //       );
// //       return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// //     } catch (error) {
// //       return 0;
// //     }
// //   };

// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";
    
// //     const statusStyle = {
// //       'Sold Out': { color: "red", fontWeight: "bold" },
// //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// //       'In Stock': { color: "green", fontWeight: "bold" }
// //     };
    
// //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// //     return <span style={style}>{stock.status || 'N/A'}</span>;
// //   };

// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   const deleteSale = (id) => {
// //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ 
// //       ...sale,
// //       date: sale.date || ''
// //     });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;
    
// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   // Calculate profit margin percentage
// //   const calculateProfitMargin = (sale) => {
// //     try {
// //       const buyingPrice = getBuyingPrice(sale);
// //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
      
// //       if (buyingPrice <= 0) return 0;
      
// //       const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
// //       return Math.max(0, margin);
// //     } catch (error) {
// //       return 0;
// //     }
// //   };

// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// //         <div style={{ marginTop: "40px" }}>
// //           <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
// //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// //               Sales List
// //             </h2>
// //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //               {/* Summary Cards */}
// //               <div style={{ display: 'flex', gap: '15px' }}>
// //                 <div style={{
// //                   backgroundColor: "#e7f3ff",
// //                   padding: "10px 15px",
// //                   borderRadius: "10px",
// //                   border: "2px solid #007bff",
// //                   fontWeight: "bold",
// //                   color: "#007bff",
// //                   textAlign: 'center'
// //                 }}>
// //                   <div style={{ fontSize: '12px' }}>Total Revenue</div>
// //                   <div>${calculateTotalRevenue().toFixed(2)}</div>
// //                 </div>
// //                 <div style={{
// //                   backgroundColor: "#d4edda",
// //                   padding: "10px 15px",
// //                   borderRadius: "10px",
// //                   border: "2px solid #28a745",
// //                   fontWeight: "bold",
// //                   color: "#28a745",
// //                   textAlign: 'center'
// //                 }}>
// //                   <div style={{ fontSize: '12px' }}>Total Profit</div>
// //                   <div>${calculateTotalProfit().toFixed(2)}</div>
// //                 </div>
// //                 <div style={{
// //                   backgroundColor: "#fff3cd",
// //                   padding: "10px 15px",
// //                   borderRadius: "10px",
// //                   border: "2px solid #ffc107",
// //                   fontWeight: "bold",
// //                   color: "#856404",
// //                   textAlign: 'center'
// //                 }}>
// //                   <div style={{ fontSize: '12px' }}>Total Sales</div>
// //                   <div>{sales.length}</div>
// //                 </div>
// //               </div>
              
// //               <Link to="/add-sale">
// //                 <button
// //                   style={{
// //                     borderRadius: "10px",
// //                     backgroundColor: "#4CAF50",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     width: "100px",
// //                   }}
// //                 >
// //                   Add Sale
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : sales.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //                 marginRight: "10px",
// //               }}
// //             >
// //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// //                 <tr>
// //                   <th style={{ width: "80px" }}>Sale ID</th>
// //                   <th style={{ width: "120px" }}>Date</th>
// //                   <th style={{ width: "150px" }}>Product Name</th>
// //                   <th style={{ width: "100px" }}>Quantity</th>
// //                   <th style={{ width: "100px" }}>Unit Price</th>
// //                   <th style={{ width: "100px" }}>Buying Price</th>
// //                   <th style={{ width: "120px" }}>Total Price</th>
// //                   <th style={{ width: "100px" }}>Profit</th>
// //                   <th style={{ width: "80px" }}>Margin</th>
// //                   <th style={{ width: "150px" }}>Customer</th>
// //                   <th style={{ width: "120px" }}>Stock Status</th>
// //                   <th style={{ width: "100px" }}>Current Stock</th>
// //                   <th style={{ width: "120px" }}>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {sales.map((sale) => {
// //                   const profit = calculateSaleProfit(sale);
// //                   const buyingPrice = getBuyingPrice(sale);
// //                   const profitMargin = calculateProfitMargin(sale);
// //                   const profitColor = profit > 0 ? "green" : profit < 0 ? "red" : "#6c757d";
// //                   const marginColor = profitMargin > 50 ? "green" : profitMargin > 20 ? "#17a2b8" : profitMargin > 0 ? "#ffc107" : "red";
                  
// //                   return (
// //                     <tr key={sale.saleId}>
// //                       <td>{sale.saleId}</td>
// //                       <td>{sale.date}</td>
// //                       <td>{sale.product ? sale.product.productName : "N/A"}</td>
// //                       <td>{sale.quantity}</td>
// //                       <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// //                       <td>${buyingPrice.toFixed(2)}</td>
// //                       <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// //                       <td style={{ 
// //                         fontWeight: "bold", 
// //                         color: profitColor
// //                       }}>
// //                         ${profit.toFixed(2)}
// //                       </td>
// //                       <td style={{ 
// //                         fontWeight: "bold", 
// //                         color: marginColor,
// //                         fontSize: "12px"
// //                       }}>
// //                         {profitMargin.toFixed(1)}%
// //                       </td>
// //                       <td>{sale.customerName || "Walk-in"}</td>
// //                       <td>{getStockStatus(sale.product)}</td>
// //                       <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// //                       <td>
// //                         <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// //                           <button
// //                             onClick={() => handleUpdateClick(sale)}
// //                             style={{
// //                               background: "#007bff",
// //                               color: "white",
// //                               padding: "5px 10px",
// //                               borderRadius: "5px",
// //                               border: "none",
// //                               cursor: "pointer",
// //                               fontSize: "12px"
// //                             }}
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => deleteSale(sale.saleId)}
// //                             style={{
// //                               background: "#dc3545",
// //                               color: "white",
// //                               padding: "5px 10px",
// //                               borderRadius: "5px",
// //                               border: "none",
// //                               cursor: "pointer",
// //                               fontSize: "12px"
// //                             }}
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Update Modal - Add buying price display */}
// //         {showModal && currentSale && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               width: "100%",
// //               height: "100%",
// //               background: "rgba(0,0,0,0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               zIndex: 1000
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "25px",
// //                 borderRadius: "15px",
// //                 width: "450px",
// //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// //               }}
// //             >
// //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //                 ✏️ Update Sale
// //               </h3>
              
// //               {/* Show buying price information */}
// //               <div style={{ 
// //                 marginBottom: "15px", 
// //                 padding: "10px", 
// //                 backgroundColor: "#f8f9fa", 
// //                 borderRadius: "8px",
// //                 border: "1px solid #e9ecef"
// //               }}>
// //                 <div style={{ fontWeight: "bold", color: "#495057" }}>
// //                   Product: {currentSale.product?.productName || "N/A"}
// //                 </div>
// //                 <div style={{ color: "#6c757d", fontSize: "14px" }}>
// //                   Buying Price: ${getBuyingPrice(currentSale).toFixed(2)}
// //                 </div>
// //                 <div style={{ color: "#6c757d", fontSize: "12px", fontStyle: "italic" }}>
// //                   {currentSale.purchasePrice ? "Original purchase price" : "Current stock price"}
// //                 </div>
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// //                 <input
// //                   type="date"
// //                   name="date"
// //                   value={currentSale.date || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// //                 <input
// //                   type="text"
// //                   name="customerName"
// //                   value={currentSale.customerName || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// //                 <input
// //                   type="number"
// //                   name="quantity"
// //                   min="1"
// //                   value={currentSale.quantity || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "20px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// //                 <input
// //                   type="number"
// //                   name="unitPrice"
// //                   min="0"
// //                   step="0.01"
// //                   value={currentSale.unitPrice || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ textAlign: "center" }}>
// //                 <button
// //                   onClick={handleSaveUpdate}
// //                   style={{
// //                     background: "#28a745",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     marginRight: "10px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   💾 Save Changes
// //                 </button>
// //                 <button
// //                   onClick={() => setShowModal(false)}
// //                   style={{
// //                     background: "#6c757d",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   ❌ Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default SaleList;

// // import React, { useEffect, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [purchases, setPurchases] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Modal state
// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //     fetchPurchases();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   const fetchPurchases = () => {
// //     axios
// //       .get("http://localhost:8080/api/purchases")
// //       .then((res) => setPurchases(res.data))
// //       .catch((err) => console.error("Error fetching purchases:", err));
// //   };

// //   // FIXED: Calculate profit based on actual purchase history
// //   const calculateSaleProfit = (sale) => {
// //     try {
// //       if (!sale.product) return 0;
      
// //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
// //       const quantity = parseFloat(sale.quantity) || 0;
      
// //       // Find the actual purchase price for this product
// //       const purchasePrice = getActualPurchasePrice(sale);
      
// //       return (sellingPrice - purchasePrice) * quantity;
// //     } catch (error) {
// //       console.error('Error calculating profit for sale:', sale.saleId, error);
// //       return 0;
// //     }
// //   };

// //   // NEW: Get actual purchase price from purchase history
// //   const getActualPurchasePrice = (sale) => {
// //     try {
// //       if (!sale.product) return 0;
      
// //       // Find purchases for this specific product
// //       const productPurchases = purchases.filter(
// //         purchase => purchase.product?.productId === sale.product.productId
// //       );
      
// //       if (productPurchases.length === 0) {
// //         console.warn(`No purchase history found for product: ${sale.product.productName}`);
// //         return getBuyingPriceFromStock(sale.product);
// //       }
      
// //       // Sort purchases by date (most recent first)
// //       const sortedPurchases = productPurchases.sort((a, b) => 
// //         new Date(b.purchaseDate) - new Date(a.purchaseDate)
// //       );
      
// //       // Use the most recent purchase price before the sale date
// //       const saleDate = new Date(sale.date);
// //       const relevantPurchase = sortedPurchases.find(purchase => 
// //         new Date(purchase.purchaseDate) <= saleDate
// //       );
      
// //       // If no purchase before sale date, use most recent purchase
// //       const purchaseToUse = relevantPurchase || sortedPurchases[0];
      
// //       return parseFloat(purchaseToUse.purchasePrice) || 0;
      
// //     } catch (error) {
// //       console.error('Error getting actual purchase price:', error);
// //       return getBuyingPriceFromStock(sale.product);
// //     }
// //   };

// //   // Fallback: Get buying price from stock if no purchase history
// //   const getBuyingPriceFromStock = (product) => {
// //     if (!product) return 0;
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// //   };

// //   // Calculate total profit across all sales
// //   const calculateTotalProfit = () => {
// //     return sales.reduce((total, sale) => {
// //       return total + calculateSaleProfit(sale);
// //     }, 0);
// //   };

// //   // Calculate total revenue
// //   const calculateTotalRevenue = () => {
// //     return sales.reduce((total, sale) => {
// //       return total + (parseFloat(sale.totalPrice) || 0);
// //     }, 0);
// //   };

// //   // Calculate total cost of goods sold (COGS)
// //   const calculateTotalCOGS = () => {
// //     return sales.reduce((total, sale) => {
// //       const purchasePrice = getActualPurchasePrice(sale);
// //       const quantity = parseFloat(sale.quantity) || 0;
// //       return total + (purchasePrice * quantity);
// //     }, 0);
// //   };

// //   // Get buying price for display
// //   const getBuyingPrice = (sale) => {
// //     return getActualPurchasePrice(sale);
// //   };

// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";
    
// //     const statusStyle = {
// //       'Sold Out': { color: "red", fontWeight: "bold" },
// //       'Partially Sold': { color: "orange", fontWeight: "bold" },
// //       'In Stock': { color: "green", fontWeight: "bold" }
// //     };
    
// //     const style = statusStyle[stock.status] || { color: "gray", fontWeight: "bold" };
    
// //     return <span style={style}>{stock.status || 'N/A'}</span>;
// //   };

// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   // Check if we have purchase history for a product
// //   const hasPurchaseHistory = (product) => {
// //     if (!product) return false;
// //     return purchases.some(purchase => purchase.product?.productId === product.productId);
// //   };

// //   const deleteSale = (id) => {
// //     if (!window.confirm('Are you sure you want to delete this sale?')) return;
    
// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ 
// //       ...sale,
// //       date: sale.date || ''
// //     });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;
    
// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice: (parseFloat(currentSale.quantity) || 0) * (parseFloat(currentSale.unitPrice) || 0)
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   // Calculate profit margin percentage
// //   const calculateProfitMargin = (sale) => {
// //     try {
// //       const buyingPrice = getActualPurchasePrice(sale);
// //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
      
// //       if (buyingPrice <= 0) return 0;
      
// //       const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
// //       return Math.max(0, margin);
// //     } catch (error) {
// //       return 0;
// //     }
// //   };

// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px" }}>
// //         <div style={{ marginTop: "40px" }}>
// //           <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
// //             <h2 style={{ marginTop: "40px", marginLeft: "790px"}}>
// //               Sales List
// //             </h2>
// //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //               {/* Summary Cards */}
// //               <div style={{ display: 'flex', gap: '15px' }}>
// //                 <div style={{
// //                   backgroundColor: "#e7f3ff",
// //                   padding: "10px 15px",
// //                   borderRadius: "10px",
// //                   border: "2px solid #007bff",
// //                   fontWeight: "bold",
// //                   color: "#007bff",
// //                   textAlign: 'center'
// //                 }}>
// //                   <div style={{ fontSize: '12px' }}>Total Revenue</div>
// //                   <div>${calculateTotalRevenue().toFixed(2)}</div>
// //                 </div>
// //                 <div style={{
// //                   backgroundColor: "#d4edda",
// //                   padding: "10px 15px",
// //                   borderRadius: "10px",
// //                   border: "2px solid #28a745",
// //                   fontWeight: "bold",
// //                   color: "#28a745",
// //                   textAlign: 'center'
// //                 }}>
// //                   <div style={{ fontSize: '12px' }}>Total Profit</div>
// //                   <div>${calculateTotalProfit().toFixed(2)}</div>
// //                 </div>
// //                 <div style={{
// //                   backgroundColor: "#fff3cd",
// //                   padding: "10px 15px",
// //                   borderRadius: "10px",
// //                   border: "2px solid #ffc107",
// //                   fontWeight: "bold",
// //                   color: "#856404",
// //                   textAlign: 'center'
// //                 }}>
// //                   <div style={{ fontSize: '12px' }}>Total Sales</div>
// //                   <div>{sales.length}</div>
// //                 </div>
// //                 <div style={{
// //                   backgroundColor: "#f8d7da",
// //                   padding: "10px 15px",
// //                   borderRadius: "10px",
// //                   border: "2px solid #dc3545",
// //                   fontWeight: "bold",
// //                   color: "#721c24",
// //                   textAlign: 'center'
// //                 }}>
// //                   <div style={{ fontSize: '12px' }}>COGS</div>
// //                   <div>${calculateTotalCOGS().toFixed(2)}</div>
// //                 </div>
// //               </div>
              
// //               <Link to="/add-sale">
// //                 <button
// //                   style={{
// //                     borderRadius: "10px",
// //                     backgroundColor: "#4CAF50",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     width: "100px",
// //                   }}
// //                 >
// //                   Add Sale
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}

// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : sales.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //                 marginRight: "10px",
// //               }}
// //             >
// //               <thead style={{ position: "sticky", top: 0, zIndex: 1, background: "#2c3e50", color: "white" }}>
// //                 <tr>
// //                   <th style={{ width: "80px" }}>Sale ID</th>
// //                   <th style={{ width: "120px" }}>Date</th>
// //                   <th style={{ width: "150px" }}>Product Name</th>
// //                   <th style={{ width: "100px" }}>Quantity</th>
// //                   <th style={{ width: "100px" }}>Unit Price</th>
// //                   <th style={{ width: "100px" }}>Buying Price</th>
// //                   <th style={{ width: "120px" }}>Total Price</th>
// //                   <th style={{ width: "100px" }}>Profit</th>
// //                   <th style={{ width: "80px" }}>Margin</th>
// //                   <th style={{ width: "150px" }}>Customer</th>
// //                   <th style={{ width: "120px" }}>Stock Status</th>
// //                   <th style={{ width: "100px" }}>Current Stock</th>
// //                   <th style={{ width: "120px" }}>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {sales.map((sale) => {
// //                   const profit = calculateSaleProfit(sale);
// //                   const buyingPrice = getBuyingPrice(sale);
// //                   const profitMargin = calculateProfitMargin(sale);
// //                   const hasPurchaseData = hasPurchaseHistory(sale.product);
// //                   const profitColor = profit > 0 ? "green" : profit < 0 ? "red" : "#6c757d";
// //                   const marginColor = profitMargin > 50 ? "green" : profitMargin > 20 ? "#17a2b8" : profitMargin > 0 ? "#ffc107" : "red";
                  
// //                   return (
// //                     <tr key={sale.saleId}>
// //                       <td>{sale.saleId}</td>
// //                       <td>{sale.date}</td>
// //                       <td>
// //                         {sale.product ? sale.product.productName : "N/A"}
// //                         {!hasPurchaseData && (
// //                           <div style={{ fontSize: "10px", color: "orange", fontStyle: "italic" }}>
// //                             *No purchase data
// //                           </div>
// //                         )}
// //                       </td>
// //                       <td>{sale.quantity}</td>
// //                       <td>${parseFloat(sale.unitPrice || 0).toFixed(2)}</td>
// //                       <td>
// //                         ${buyingPrice.toFixed(2)}
// //                         {!hasPurchaseData && (
// //                           <div style={{ fontSize: "9px", color: "orange" }}>est.</div>
// //                         )}
// //                       </td>
// //                       <td>${parseFloat(sale.totalPrice || 0).toFixed(2)}</td>
// //                       <td style={{ 
// //                         fontWeight: "bold", 
// //                         color: profitColor
// //                       }}>
// //                         ${profit.toFixed(2)}
// //                         {!hasPurchaseData && (
// //                           <div style={{ fontSize: "9px", color: "orange" }}>est.</div>
// //                         )}
// //                       </td>
// //                       <td style={{ 
// //                         fontWeight: "bold", 
// //                         color: marginColor,
// //                         fontSize: "12px"
// //                       }}>
// //                         {profitMargin.toFixed(1)}%
// //                         {!hasPurchaseData && (
// //                           <div style={{ fontSize: "9px", color: "orange" }}>est.</div>
// //                         )}
// //                       </td>
// //                       <td>{sale.customerName || "Walk-in"}</td>
// //                       <td>{getStockStatus(sale.product)}</td>
// //                       <td style={{ textAlign: "center" }}>{getCurrentStockQuantity(sale.product)}</td>
// //                       <td>
// //                         <div style={{ display: "flex", flexDirection: "row", gap: "5px" }}>
// //                           <button
// //                             onClick={() => handleUpdateClick(sale)}
// //                             style={{
// //                               background: "#007bff",
// //                               color: "white",
// //                               padding: "5px 10px",
// //                               borderRadius: "5px",
// //                               border: "none",
// //                               cursor: "pointer",
// //                               fontSize: "12px"
// //                             }}
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => deleteSale(sale.saleId)}
// //                             style={{
// //                               background: "#dc3545",
// //                               color: "white",
// //                               padding: "5px 10px",
// //                               borderRadius: "5px",
// //                               border: "none",
// //                               cursor: "pointer",
// //                               fontSize: "12px"
// //                             }}
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Update Modal */}
// //         {showModal && currentSale && (
// //           <div
// //             style={{
// //               position: "fixed",
// //               top: 0,
// //               left: 0,
// //               width: "100%",
// //               height: "100%",
// //               background: "rgba(0,0,0,0.5)",
// //               display: "flex",
// //               justifyContent: "center",
// //               alignItems: "center",
// //               zIndex: 1000
// //             }}
// //           >
// //             <div
// //               style={{
// //                 background: "white",
// //                 padding: "25px",
// //                 borderRadius: "15px",
// //                 width: "450px",
// //                 boxShadow: "0 10px 30px rgba(0,0,0,0.3)"
// //               }}
// //             >
// //               <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //                 ✏️ Update Sale
// //               </h3>
              
// //               {/* Show buying price information */}
// //               <div style={{ 
// //                 marginBottom: "15px", 
// //                 padding: "10px", 
// //                 backgroundColor: "#f8f9fa", 
// //                 borderRadius: "8px",
// //                 border: "1px solid #e9ecef"
// //               }}>
// //                 <div style={{ fontWeight: "bold", color: "#495057" }}>
// //                   Product: {currentSale.product?.productName || "N/A"}
// //                 </div>
// //                 <div style={{ color: "#6c757d", fontSize: "14px" }}>
// //                   Actual Buying Price: ${getBuyingPrice(currentSale).toFixed(2)}
// //                 </div>
// //                 <div style={{ color: hasPurchaseHistory(currentSale.product) ? "#28a745" : "#ffc107", fontSize: "12px", fontStyle: "italic" }}>
// //                   {hasPurchaseHistory(currentSale.product) ? "Based on purchase history" : "Estimated from current stock price"}
// //                 </div>
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Date:</label>
// //                 <input
// //                   type="date"
// //                   name="date"
// //                   value={currentSale.date || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Customer Name:</label>
// //                 <input
// //                   type="text"
// //                   name="customerName"
// //                   value={currentSale.customerName || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "15px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Quantity:</label>
// //                 <input
// //                   type="number"
// //                   name="quantity"
// //                   min="1"
// //                   value={currentSale.quantity || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ marginBottom: "20px" }}>
// //                 <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Unit Price:</label>
// //                 <input
// //                   type="number"
// //                   name="unitPrice"
// //                   min="0"
// //                   step="0.01"
// //                   value={currentSale.unitPrice || ""}
// //                   onChange={handleUpdateChange}
// //                   style={{ width: "100%", padding: "8px", borderRadius: "8px", border: "1px solid #ccc" }}
// //                 />
// //               </div>

// //               <div style={{ textAlign: "center" }}>
// //                 <button
// //                   onClick={handleSaveUpdate}
// //                   style={{
// //                     background: "#28a745",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     marginRight: "10px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   💾 Save Changes
// //                 </button>
// //                 <button
// //                   onClick={() => setShowModal(false)}
// //                   style={{
// //                     background: "#6c757d",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     borderRadius: "8px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     fontWeight: "bold"
// //                   }}
// //                 >
// //                   ❌ Cancel
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // export default SaleList;

// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [purchases, setPurchases] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   // cache purchase prices to avoid recomputation
// //   const priceCacheRef = useRef({});

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //     fetchPurchases();
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   const fetchPurchases = () => {
// //     axios
// //       .get("http://localhost:8080/api/purchases")
// //       .then((res) => setPurchases(res.data))
// //       .catch((err) => console.error("Error fetching purchases:", err));
// //   };

// //   // 🔹 Fallback: get buying price from stock
// //   const getBuyingPriceFromStock = (product) => {
// //     if (!product) return 0;
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// //   };

// //   // 🔹 Compute actual purchase price using cache + history
// //   const getActualPurchasePrice = (sale) => {
// //     try {
// //       if (!sale?.product) return 0;
// //       const productId = sale.product.productId;

// //       // Check cache first
// //       if (priceCacheRef.current[productId]) {
// //         return priceCacheRef.current[productId];
// //       }

// //       const productPurchases = purchases.filter(
// //         (p) => p.product?.productId === productId
// //       );

// //       if (productPurchases.length === 0) {
// //         const fallback = getBuyingPriceFromStock(sale.product);
// //         priceCacheRef.current[productId] = fallback;
// //         return fallback;
// //       }

// //       const sortedPurchases = [...productPurchases].sort(
// //         (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
// //       );

// //       const saleDate = sale.date ? new Date(sale.date) : null;

// //       const relevantPurchase = saleDate
// //         ? sortedPurchases.find((p) => new Date(p.purchaseDate) <= saleDate)
// //         : sortedPurchases[0];

// //       const purchaseToUse = relevantPurchase || sortedPurchases[0];
// //       const purchasePrice = parseFloat(purchaseToUse.purchasePrice) || 0;

// //       priceCacheRef.current[productId] = purchasePrice;
// //       return purchasePrice;
// //     } catch (error) {
// //       console.error("Error getting actual purchase price:", error);
// //       return getBuyingPriceFromStock(sale.product);
// //     }
// //   };

// //   // 🔹 Precompute sale data (profit, margin, etc.)
// //   const saleData = useMemo(() => {
// //     return sales.map((sale) => {
// //       const purchasePrice = getActualPurchasePrice(sale);
// //       const sellingPrice = parseFloat(sale.unitPrice) || 0;
// //       const quantity = parseFloat(sale.quantity) || 0;

// //       const totalPrice = sellingPrice * quantity;
// //       const profit = (sellingPrice - purchasePrice) * quantity;
// //       const cogs = purchasePrice * quantity;
// //       const margin =
// //         purchasePrice > 0
// //           ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
// //           : 0;

// //       return {
// //         ...sale,
// //         purchasePrice: parseFloat(purchasePrice.toFixed(2)),
// //         profit: parseFloat(profit.toFixed(2)),
// //         totalPrice: parseFloat(totalPrice.toFixed(2)),
// //         cogs: parseFloat(cogs.toFixed(2)),
// //         margin: parseFloat(Math.max(0, margin).toFixed(1)),
// //       };
// //     });
// //   }, [sales, purchases, stocks]);

// //   // 🔹 Totals (computed once per change)
// //   const totalRevenue = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.totalPrice, 0),
// //     [saleData]
// //   );

// //   const totalProfit = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.profit, 0),
// //     [saleData]
// //   );

// //   const totalCOGS = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.cogs, 0),
// //     [saleData]
// //   );

// //   // 🔹 Stock & helper functions
// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";

// //     const styleMap = {
// //       "Sold Out": { color: "red", fontWeight: "bold" },
// //       "Partially Sold": { color: "orange", fontWeight: "bold" },
// //       "In Stock": { color: "green", fontWeight: "bold" },
// //     };
// //     const style = styleMap[stock.status] || { color: "gray" };

// //     return <span style={style}>{stock.status || "N/A"}</span>;
// //   };

// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   const hasPurchaseHistory = (product) => {
// //     if (!product) return false;
// //     return purchases.some((p) => p.product?.productId === product.productId);
// //   };

// //   // 🔹 Delete sale
// //   const deleteSale = (id) => {
// //     if (!window.confirm("Are you sure you want to delete this sale?")) return;

// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   // 🔹 Edit sale
// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ ...sale, date: sale.date || "" });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;

// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice:
// //         (parseFloat(currentSale.quantity) || 0) *
// //         (parseFloat(currentSale.unitPrice) || 0),
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   // 🔹 UI
// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "200px",marginTop: "90px" }}>
// //         <div style={{ marginTop: "40px"}}>
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "row",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
            
// //           >
// //             <h2 style={{ marginTop: "40px", marginLeft: "590px" }}>
// //               Sales List
// //             </h2>
// //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //               {/* Summary Cards */}
// //               <div style={{ display: "flex", gap: "15px" }}>
// //                 <SummaryCard
// //                   title="Total Revenue"
// //                   color="#007bff"
// //                   bg="#e7f3ff"
// //                   value={`Tsh${totalRevenue.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Profit"
// //                   color="#28a745"
// //                   bg="#d4edda"
// //                   value={`Tsh${totalProfit.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Sales"
// //                   color="#856404"
// //                   bg="#fff3cd"
// //                   value={saleData.length}
// //                 />
// //                 <SummaryCard
// //                   title="COGS"
// //                   color="#721c24"
// //                   bg="#f8d7da"
// //                   value={`Tsh${totalCOGS.toFixed(2)}`}
// //                 />
// //               </div>

// //               <Link to="/add-sale">
// //                 <button
// //                   style={{
// //                     borderRadius: "10px",
// //                     backgroundColor: "#4CAF50",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     width: "100px",
// //                   }}
// //                 >
// //                   Add Sale
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : saleData.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //               }}
// //             >
// //               <thead
// //                 style={{
// //                   position: "sticky",
// //                   top: 0,
// //                   zIndex: 1,
// //                   background: "#2c3e50",
// //                   color: "black",
// //                 }}
// //               >
// //                 <tr>
// //                   <th>Sale ID</th>
// //                   <th>Selling Date</th>
// //                   <th>Product Name</th>
// //                   <th>Qty Sold</th>
// //                   <th>Selling Price/unit</th>
// //                   <th>Buying Price/unit</th>
// //                   <th>Total Selling Price</th>
// //                   <th>Profit</th>
// //                   <th>Margin</th>
// //                   <th>Customer</th>
// //                   <th>Stock Status</th>
// //                   <th>Qty Left  InStock</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {saleData.map((sale) => {
// //                   const hasPurchaseData = hasPurchaseHistory(sale.product);
// //                   const profitColor =
// //                     sale.profit > 0
// //                       ? "green"
// //                       : sale.profit < 0
// //                       ? "red"
// //                       : "#6c757d";
// //                   const marginColor =
// //                     sale.margin > 50
// //                       ? "green"
// //                       : sale.margin > 20
// //                       ? "#17a2b8"
// //                       : sale.margin > 0
// //                       ? "#ffc107"
// //                       : "red";

// //                   return (
// //                     <tr key={sale.saleId}>
// //                       <td>{sale.saleId}</td>
// //                       <td>{sale.date}</td>
// //                       <td>
// //                         {sale.product?.productName || "N/A"}
// //                         {!hasPurchaseData && (
// //                           <div
// //                             style={{
// //                               fontSize: "10px",
// //                               color: "orange",
// //                               fontStyle: "italic",
// //                             }}
// //                           >
// //                             *No purchase data
// //                           </div>
// //                         )}
// //                       </td>
// //                       <td>{sale.quantity}</td>
// //                       <td>Tsh{sale.unitPrice.toFixed(2)}</td>
// //                       <td>Tsh{sale.purchasePrice.toFixed(2)}</td>
// //                       <td>Tsh{sale.totalPrice.toFixed(2)}</td>
// //                       <td style={{ fontWeight: "bold", color: profitColor }}>
// //                         Tsh{sale.profit.toFixed(2)}
// //                       </td>
// //                       <td
// //                         style={{
// //                           fontWeight: "bold",
// //                           color: marginColor,
// //                           fontSize: "12px",
// //                         }}
// //                       >
// //                         {sale.margin.toFixed(1)}%
// //                       </td>
// //                       <td>{sale.customerName || "Walk-in"}</td>
// //                       <td>{getStockStatus(sale.product)}</td>
// //                       <td style={{ textAlign: "center" }}>
// //                         {getCurrentStockQuantity(sale.product)}
// //                       </td>
// //                       <td>
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             flexDirection: "row",
// //                             gap: "5px",
// //                           }}
// //                         >
// //                           <button
// //                             onClick={() => handleUpdateClick(sale)}
// //                             style={buttonStyle("#007bff")}
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => deleteSale(sale.saleId)}
// //                             style={buttonStyle("#dc3545")}
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Update Modal */}
// //         {showModal && currentSale && (
// //           <UpdateModal
// //             currentSale={currentSale}
// //             getBuyingPriceFromStock={getBuyingPriceFromStock}
// //             hasPurchaseHistory={hasPurchaseHistory}
// //             onSave={handleSaveUpdate}
// //             onChange={handleUpdateChange}
// //             onClose={() => setShowModal(false)}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // // 🔹 Reusable summary card
// // const SummaryCard = ({ title, value, color, bg }) => (
// //   <div
// //     style={{
// //       backgroundColor: bg,
// //       padding: "10px 15px",
// //       borderRadius: "10px",
// //       border: `2px solid ${color}`,
// //       fontWeight: "bold",
// //       color,
// //       textAlign: "center",
// //     }}
// //   >
// //     <div style={{ fontSize: "12px" }}>{title}</div>
// //     <div>{value}</div>
// //   </div>
// // );

// // // 🔹 Reusable button style
// // const buttonStyle = (bg) => ({
// //   background: bg,
// //   color: "white",
// //   padding: "5px 10px",
// //   borderRadius: "5px",
// //   border: "none",
// //   cursor: "pointer",
// //   fontSize: "12px",
// // });

// // // 🔹 Modal Component
// // const UpdateModal = ({
// //   currentSale,
// //   hasPurchaseHistory,
// //   getBuyingPriceFromStock,
// //   onSave,
// //   onChange,
// //   onClose,
// // }) => (
// //   <div
// //     style={{
// //       position: "fixed",
// //       top: 0,
// //       left: 0,
// //       width: "100%",
// //       height: "100%",
// //       background: "rgba(0,0,0,0.5)",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       zIndex: 1000,
// //     }}
// //   >
// //     <div
// //       style={{
// //         background: "white",
// //         padding: "25px",
// //         borderRadius: "15px",
// //         width: "450px",
// //         boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
// //       }}
// //     >
// //       <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //         ✏️ Update Sale
// //       </h3>

// //       <div
// //         style={{
// //           marginBottom: "15px",
// //           padding: "10px",
// //           backgroundColor: "#f8f9fa",
// //           borderRadius: "8px",
// //           border: "1px solid #e9ecef",
// //         }}
// //       >
// //         <div style={{ fontWeight: "bold", color: "#495057" }}>
// //           Product: {currentSale.product?.productName || "N/A"}
// //         </div>
// //         <div style={{ color: "#6c757d", fontSize: "14px" }}>
// //           Actual Buying Price: $
// //           {getBuyingPriceFromStock(currentSale.product).toFixed(2)}
// //         </div>
// //         <div
// //           style={{
// //             color: hasPurchaseHistory(currentSale.product)
// //               ? "#28a745"
// //               : "#ffc107",
// //             fontSize: "12px",
// //             fontStyle: "italic",
// //           }}
// //         >
// //           {hasPurchaseHistory(currentSale.product)
// //             ? "Based on purchase history"
// //             : "Estimated from current stock price"}
// //         </div>
// //       </div>

// //       <InputField
// //         label="Date"
// //         name="date"
// //         type="date"
// //         value={currentSale.date || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Customer Name"
// //         name="customerName"
// //         value={currentSale.customerName || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Quantity"
// //         name="quantity"
// //         type="number"
// //         value={currentSale.quantity || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Unit Price"
// //         name="unitPrice"
// //         type="number"
// //         value={currentSale.unitPrice || ""}
// //         onChange={onChange}
// //       />

// //       <div style={{ textAlign: "center" }}>
// //         <button
// //           onClick={onSave}
// //           style={{
// //             background: "#28a745",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             marginRight: "10px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           💾 Save
// //         </button>
// //         <button
// //           onClick={onClose}
// //           style={{
// //             background: "#dc3545",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             cursor: "pointer",
// //           }}
// //         >
// //           ❌ Cancel
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // 🔹 Input field reusable
// // const InputField = ({ label, name, value, onChange, type = "text" }) => (
// //   <div style={{ marginBottom: "10px" }}>
// //     <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
// //       {label}
// //     </label>
// //     <input
// //       type={type}
// //       name={name}
// //       value={value}
// //       onChange={onChange}
// //       style={{
// //         width: "100%",
// //         padding: "8px",
// //         borderRadius: "5px",
// //         border: "1px solid #ccc",
// //       }}
// //     />
// //   </div>
// // );

// // export default SaleList;

// // import React, { useEffect, useMemo, useRef, useState } from "react";
// // import Navigation from "../navigation/Navigation";
// // import { Link } from "react-router-dom";
// // import axios from "axios";

// // const SaleList = () => {
// //   const [sales, setSales] = useState([]);
// //   const [stocks, setStocks] = useState([]);
// //   const [purchases, setPurchases] = useState([]);
// //   const [products, setProducts] = useState([]); // Added products state
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const [showModal, setShowModal] = useState(false);
// //   const [currentSale, setCurrentSale] = useState(null);

// //   // cache purchase prices to avoid recomputation
// //   const priceCacheRef = useRef({});

// //   useEffect(() => {
// //     fetchAllSales();
// //     fetchStocks();
// //     fetchPurchases();
// //     fetchProducts(); // Fetch products data
// //   }, []);

// //   const handleResponse = async (response) => {
// //     if (!response.ok) {
// //       const text = await response.text();
// //       throw new Error(text || `Error: ${response.status}`);
// //     }
// //     return response.json();
// //   };

// //   const fetchAllSales = () => {
// //     setLoading(true);
// //     setError(null);
// //     fetch("http://localhost:8080/api/sales/all-sales")
// //       .then(handleResponse)
// //       .then((data) => {
// //         setSales(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         setError(err.message);
// //         setLoading(false);
// //       });
// //   };

// //   const fetchStocks = () => {
// //     axios
// //       .get("http://localhost:8080/api/stocks/all-stocks")
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error("Error fetching stocks:", err));
// //   };

// //   const fetchPurchases = () => {
// //     axios
// //       .get("http://localhost:8080/api/purchases")
// //       .then((res) => setPurchases(res.data))
// //       .catch((err) => console.error("Error fetching purchases:", err));
// //   };

// //   // 🔹 NEW: Fetch products from viewproducts table
// //   const fetchProducts = () => {
// //     axios
// //       .get("http://localhost:8080/api/product/get/product")
// //       .then((res) => setProducts(res.data))
// //       .catch((err) => console.error("Error fetching products:", err));
// //   };

// //   // 🔹 UPDATED: Get selling price from products table
// //   const getSellingPriceFromProduct = (product) => {
// //     if (!product) return 0;
// //     const productData = products.find(
// //       (p) => p.productId === product.productId
// //     );
// //     return productData ? parseFloat(productData.sellingPrice) || 0 : 0;
// //   };

// //   // 🔹 UPDATED: Get buying price from products table (latestPurchasePrice)
// //   const getBuyingPriceFromProduct = (product) => {
// //     if (!product) return 0;
// //     const productData = products.find(
// //       (p) => p.productId === product.productId
// //     );
// //     return productData ? parseFloat(productData.latestPurchasePrice) || 0 : 0;
// //   };

// //   // 🔹 Fallback: get buying price from stock (keep as backup)
// //   const getBuyingPriceFromStock = (product) => {
// //     if (!product) return 0;
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
// //   };

// //   // 🔹 UPDATED: Compute actual purchase price using products table first, then cache + history as fallback
// //   const getActualPurchasePrice = (sale) => {
// //     try {
// //       if (!sale?.product) return 0;
      
// //       // First try to get from products table
// //       const productPrice = getBuyingPriceFromProduct(sale.product);
// //       if (productPrice > 0) {
// //         return productPrice;
// //       }

// //       const productId = sale.product.productId;

// //       // Check cache first
// //       if (priceCacheRef.current[productId]) {
// //         return priceCacheRef.current[productId];
// //       }

// //       const productPurchases = purchases.filter(
// //         (p) => p.product?.productId === productId
// //       );

// //       if (productPurchases.length === 0) {
// //         const fallback = getBuyingPriceFromStock(sale.product);
// //         priceCacheRef.current[productId] = fallback;
// //         return fallback;
// //       }

// //       const sortedPurchases = [...productPurchases].sort(
// //         (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
// //       );

// //       const saleDate = sale.date ? new Date(sale.date) : null;

// //       const relevantPurchase = saleDate
// //         ? sortedPurchases.find((p) => new Date(p.purchaseDate) <= saleDate)
// //         : sortedPurchases[0];

// //       const purchaseToUse = relevantPurchase || sortedPurchases[0];
// //       const purchasePrice = parseFloat(purchaseToUse.purchasePrice) || 0;

// //       priceCacheRef.current[productId] = purchasePrice;
// //       return purchasePrice;
// //     } catch (error) {
// //       console.error("Error getting actual purchase price:", error);
// //       return getBuyingPriceFromStock(sale.product);
// //     }
// //   };

// //   // 🔹 UPDATED: Precompute sale data with prices from products table
// //   const saleData = useMemo(() => {
// //     return sales.map((sale) => {
// //       // Use selling price from products table, fallback to sale.unitPrice
// //       const productSellingPrice = getSellingPriceFromProduct(sale.product);
// //       const sellingPrice = productSellingPrice > 0 ? productSellingPrice : parseFloat(sale.unitPrice) || 0;
      
// //       // Use buying price from products table, fallback to purchase history
// //       const productBuyingPrice = getBuyingPriceFromProduct(sale.product);
// //       const purchasePrice = productBuyingPrice > 0 ? productBuyingPrice : getActualPurchasePrice(sale);
      
// //       const quantity = parseFloat(sale.quantity) || 0;

// //       const totalPrice = sellingPrice * quantity;
// //       const profit = (sellingPrice - purchasePrice) * quantity;
// //       const cogs = purchasePrice * quantity;
// //       const margin =
// //         purchasePrice > 0
// //           ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
// //           : 0;

// //       return {
// //         ...sale,
// //         sellingPrice: parseFloat(sellingPrice.toFixed(2)), // Store the actual selling price used
// //         purchasePrice: parseFloat(purchasePrice.toFixed(2)),
// //         profit: parseFloat(profit.toFixed(2)),
// //         totalPrice: parseFloat(totalPrice.toFixed(2)),
// //         cogs: parseFloat(cogs.toFixed(2)),
// //         margin: parseFloat(Math.max(0, margin).toFixed(1)),
// //       };
// //     });
// //   }, [sales, purchases, stocks, products]); // Added products dependency

// //   // 🔹 Totals (computed once per change)
// //   const totalRevenue = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.totalPrice, 0),
// //     [saleData]
// //   );

// //   const totalProfit = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.profit, 0),
// //     [saleData]
// //   );

// //   const totalCOGS = useMemo(
// //     () => saleData.reduce((sum, s) => sum + s.cogs, 0),
// //     [saleData]
// //   );

// //   // 🔹 Stock & helper functions
// //   const getStockStatus = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     if (!stock) return "N/A";

// //     const styleMap = {
// //       "Sold Out": { color: "red", fontWeight: "bold" },
// //       "Partially Sold": { color: "orange", fontWeight: "bold" },
// //       "In Stock": { color: "green", fontWeight: "bold" },
// //     };
// //     const style = styleMap[stock.status] || { color: "gray" };

// //     return <span style={style}>{stock.status || "N/A"}</span>;
// //   };

// //   const getCurrentStockQuantity = (product) => {
// //     if (!product) return "N/A";
// //     const stock = stocks.find(
// //       (s) => s.product && s.product.productId === product.productId
// //     );
// //     return stock ? stock.currentStock : "N/A";
// //   };

// //   const hasPurchaseHistory = (product) => {
// //     if (!product) return false;
// //     return purchases.some((p) => p.product?.productId === product.productId);
// //   };

// //   // 🔹 NEW: Check if product has price data in products table
// //   const hasProductPriceData = (product) => {
// //     if (!product) return false;
// //     const productData = products.find((p) => p.productId === product.productId);
// //     return productData && (productData.sellingPrice > 0 || productData.latestPurchasePrice > 0);
// //   };

// //   // 🔹 Delete sale
// //   const deleteSale = (id) => {
// //     if (!window.confirm("Are you sure you want to delete this sale?")) return;

// //     fetch(`http://localhost:8080/api/sales/${id}`, {
// //       method: "DELETE",
// //     })
// //       .then((response) => {
// //         if (!response.ok) throw new Error("Failed to delete");
// //         alert("Sale deleted successfully!");
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => alert("Error deleting sale: " + err.message));
// //   };

// //   // 🔹 Edit sale
// //   const handleUpdateClick = (sale) => {
// //     setCurrentSale({ ...sale, date: sale.date || "" });
// //     setShowModal(true);
// //   };

// //   const handleUpdateChange = (e) => {
// //     const { name, value } = e.target;
// //     setCurrentSale((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSaveUpdate = () => {
// //     if (!currentSale) return;

// //     const updatedSale = {
// //       ...currentSale,
// //       totalPrice:
// //         (parseFloat(currentSale.quantity) || 0) *
// //         (parseFloat(currentSale.unitPrice) || 0),
// //     };

// //     axios
// //       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
// //       .then(() => {
// //         alert("Sale updated successfully!");
// //         setShowModal(false);
// //         fetchAllSales();
// //         fetchStocks();
// //       })
// //       .catch((err) => {
// //         alert("Error updating sale: " + err.message);
// //       });
// //   };

// //   // 🔹 UI
// //   return (
// //     <>
// //       <Navigation />
// //       <div style={{ padding: "20px", marginBottom: "250px",marginTop: "0px" }}>
// //         <div style={{ marginTop: "40px"}}>
// //           <div
// //             style={{
// //               display: "flex",
// //               flexDirection: "row",
// //               justifyContent: "space-between",
// //               alignItems: "center",
// //             }}
            
// //           >
// //             <h2 style={{ marginTop: "40px", marginLeft: "590px" }}>
// //               Sales List
// //             </h2>
// //             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
// //               {/* Summary Cards */}
// //               <div style={{ display: "flex", gap: "15px" }}>
// //                 <SummaryCard
// //                   title="Total Revenue"
// //                   color="#007bff"
// //                   bg="#e7f3ff"
// //                   value={`Tsh${totalRevenue.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Profit"
// //                   color="#28a745"
// //                   bg="#d4edda"
// //                   value={`Tsh${totalProfit.toFixed(2)}`}
// //                 />
// //                 <SummaryCard
// //                   title="Total Sales"
// //                   color="#856404"
// //                   bg="#fff3cd"
// //                   value={saleData.length}
// //                 />
// //                 <SummaryCard
// //                   title="COGS"
// //                   color="#721c24"
// //                   bg="#f8d7da"
// //                   value={`Tsh${totalCOGS.toFixed(2)}`}
// //                 />
// //               </div>

// //               <Link to="/add-sale">
// //                 <button
// //                   style={{
// //                     borderRadius: "10px",
// //                     backgroundColor: "#4CAF50",
// //                     color: "white",
// //                     padding: "10px 20px",
// //                     border: "none",
// //                     cursor: "pointer",
// //                     width: "100px",
// //                   }}
// //                 >
// //                   Add Sale
// //                 </button>
// //               </Link>
// //             </div>
// //           </div>
// //         </div>

// //         {error && <p style={{ color: "red" }}>Error: {error}</p>}
// //         {loading ? (
// //           <p>Loading...</p>
// //         ) : saleData.length === 0 ? (
// //           <p>No sales found.</p>
// //         ) : (
// //           <div
// //             style={{
// //               marginTop: "10px",
// //               width: "87%",
// //               marginLeft: "216px",
// //               marginBottom: "20px",
// //               height: "400px",
// //               overflow: "auto",
// //             }}
// //           >
// //             <table
// //               border="1"
// //               cellPadding="8"
// //               cellSpacing="0"
// //               style={{
// //                 borderCollapse: "collapse",
// //                 width: "100%",
// //                 tableLayout: "fixed",
// //               }}
// //             >
// //               <thead
// //                 style={{
// //                   position: "sticky",
// //                   top: 0,
// //                   zIndex: 1,
// //                   background: "#2c3e50",
// //                   color: "black",
// //                 }}
// //               >
// //                 <tr>
// //                   <th>Sale ID</th>
// //                   <th>Selling Date</th>
// //                   <th>Product Name</th>
// //                   <th>Qty Sold</th>
// //                   <th>Selling Price/unit</th>
// //                   <th>Buying Price/unit</th>
// //                   <th>Total Selling Price</th>
// //                   <th>Profit</th>
// //                   <th>Margin</th>
// //                   <th>Customer</th>
// //                   <th>Stock Status</th>
// //                   <th>Qty Left  InStock</th>
// //                   <th>Actions</th>
// //                 </tr>
// //               </thead>
// //               <tbody>
// //                 {saleData.map((sale) => {
// //                   const hasPurchaseData = hasPurchaseHistory(sale.product);
// //                   const hasProductData = hasProductPriceData(sale.product); // NEW: Check if product has price data
// //                   const profitColor =
// //                     sale.profit > 0
// //                       ? "green"
// //                       : sale.profit < 0
// //                       ? "red"
// //                       : "#6c757d";
// //                   const marginColor =
// //                     sale.margin > 50
// //                       ? "green"
// //                       : sale.margin > 20
// //                       ? "#17a2b8"
// //                       : sale.margin > 0
// //                       ? "#ffc107"
// //                       : "red";

// //                   return (
// //                     <tr key={sale.saleId}>
// //                       <td>{sale.saleId}</td>
// //                       <td>{sale.date}</td>
// //                       <td>
// //                         {sale.product?.productName || "N/A"}
// //                         {!hasProductData && ( // UPDATED: Show warning if no product price data
// //                           <div
// //                             style={{
// //                               fontSize: "10px",
// //                               color: "orange",
// //                               fontStyle: "italic",
// //                             }}
// //                           >
// //                             *Using calculated prices
// //                           </div>
// //                         )}
// //                         {hasProductData && !hasPurchaseData && (
// //                           <div
// //                             style={{
// //                               fontSize: "10px",
// //                               color: "green",
// //                               fontStyle: "italic",
// //                             }}
// //                           >
// //                             *Using product table prices
// //                           </div>
// //                         )}
// //                       </td>
// //                       <td>{sale.quantity}</td>
// //                       <td>Tsh{sale.sellingPrice.toFixed(2)}</td> {/* UPDATED: Use sellingPrice instead of unitPrice */}
// //                       <td>Tsh{sale.purchasePrice.toFixed(2)}</td>
// //                       <td>Tsh{sale.totalPrice.toFixed(2)}</td>
// //                       <td style={{ fontWeight: "bold", color: profitColor }}>
// //                         Tsh{sale.profit.toFixed(2)}
// //                       </td>
// //                       <td
// //                         style={{
// //                           fontWeight: "bold",
// //                           color: marginColor,
// //                           fontSize: "12px",
// //                         }}
// //                       >
// //                         {sale.margin.toFixed(1)}%
// //                       </td>
// //                       <td>{sale.customerName || "Walk-in"}</td>
// //                       <td>{getStockStatus(sale.product)}</td>
// //                       <td style={{ textAlign: "center" }}>
// //                         {getCurrentStockQuantity(sale.product)}
// //                       </td>
// //                       <td>
// //                         <div
// //                           style={{
// //                             display: "flex",
// //                             flexDirection: "row",
// //                             gap: "5px",
// //                           }}
// //                         >
// //                           <button
// //                             onClick={() => handleUpdateClick(sale)}
// //                             style={buttonStyle("#007bff")}
// //                           >
// //                             ✏️ Edit
// //                           </button>
// //                           <button
// //                             onClick={() => deleteSale(sale.saleId)}
// //                             style={buttonStyle("#dc3545")}
// //                           >
// //                             🗑️ Delete
// //                           </button>
// //                         </div>
// //                       </td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}

// //         {/* Update Modal */}
// //         {showModal && currentSale && (
// //           <UpdateModal
// //             currentSale={currentSale}
// //             getBuyingPriceFromProduct={getBuyingPriceFromProduct} // UPDATED: Pass product-based function
// //             hasPurchaseHistory={hasPurchaseHistory}
// //             hasProductPriceData={hasProductPriceData} // NEW: Pass product data check
// //             onSave={handleSaveUpdate}
// //             onChange={handleUpdateChange}
// //             onClose={() => setShowModal(false)}
// //           />
// //         )}
// //       </div>
// //     </>
// //   );
// // };

// // // 🔹 Reusable summary card
// // const SummaryCard = ({ title, value, color, bg }) => (
// //   <div
// //     style={{
// //       backgroundColor: bg,
// //       padding: "10px 15px",
// //       borderRadius: "10px",
// //       border: `2px solid ${color}`,
// //       fontWeight: "bold",
// //       color,
// //       textAlign: "center",
// //     }}
// //   >
// //     <div style={{ fontSize: "12px" }}>{title}</div>
// //     <div>{value}</div>
// //   </div>
// // );

// // // 🔹 Reusable button style
// // const buttonStyle = (bg) => ({
// //   background: bg,
// //   color: "white",
// //   padding: "5px 10px",
// //   borderRadius: "5px",
// //   border: "none",
// //   cursor: "pointer",
// //   fontSize: "12px",
// // });

// // // 🔹 UPDATED: Modal Component with product price info
// // const UpdateModal = ({
// //   currentSale,
// //   hasPurchaseHistory,
// //   hasProductPriceData, // NEW: Product data check
// //   getBuyingPriceFromProduct, // UPDATED: Product-based function
// //   onSave,
// //   onChange,
// //   onClose,
// // }) => (
// //   <div
// //     style={{
// //       position: "fixed",
// //       top: 0,
// //       left: 0,
// //       width: "100%",
// //       height: "100%",
// //       background: "rgba(0,0,0,0.5)",
// //       display: "flex",
// //       justifyContent: "center",
// //       alignItems: "center",
// //       zIndex: 1000,
// //     }}
// //   >
// //     <div
// //       style={{
// //         background: "white",
// //         padding: "25px",
// //         borderRadius: "15px",
// //         width: "450px",
// //         boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
// //       }}
// //     >
// //       <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
// //         ✏️ Update Sale
// //       </h3>

// //       <div
// //         style={{
// //           marginBottom: "15px",
// //           padding: "10px",
// //           backgroundColor: "#f8f9fa",
// //           borderRadius: "8px",
// //           border: "1px solid #e9ecef",
// //         }}
// //       >
// //         <div style={{ fontWeight: "bold", color: "#495057" }}>
// //           Product: {currentSale.product?.productName || "N/A"}
// //         </div>
// //         <div style={{ color: "#6c757d", fontSize: "14px" }}>
// //           Actual Buying Price: Tsh
// //           {getBuyingPriceFromProduct(currentSale.product).toFixed(2)}
// //         </div>
// //         <div
// //           style={{
// //             color: hasProductPriceData(currentSale.product) 
// //               ? "#28a745" 
// //               : hasPurchaseHistory(currentSale.product)
// //               ? "#17a2b8"
// //               : "#ffc107",
// //             fontSize: "12px",
// //             fontStyle: "italic",
// //           }}
// //         >
// //           {hasProductPriceData(currentSale.product)
// //             ? "Based on product table prices"
// //             : hasPurchaseHistory(currentSale.product)
// //             ? "Based on purchase history"
// //             : "Estimated from current stock price"}
// //         </div>
// //       </div>

// //       <InputField
// //         label="Date"
// //         name="date"
// //         type="date"
// //         value={currentSale.date || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Customer Name"
// //         name="customerName"
// //         value={currentSale.customerName || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Quantity"
// //         name="quantity"
// //         type="number"
// //         value={currentSale.quantity || ""}
// //         onChange={onChange}
// //       />
// //       <InputField
// //         label="Unit Price"
// //         name="unitPrice"
// //         type="number"
// //         value={currentSale.unitPrice || ""}
// //         onChange={onChange}
// //       />

// //       <div style={{ textAlign: "center" }}>
// //         <button
// //           onClick={onSave}
// //           style={{
// //             background: "#28a745",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             marginRight: "10px",
// //             cursor: "pointer",
// //           }}
// //         >
// //           💾 Save
// //         </button>
// //         <button
// //           onClick={onClose}
// //           style={{
// //             background: "#dc3545",
// //             color: "white",
// //             padding: "8px 16px",
// //             borderRadius: "8px",
// //             border: "none",
// //             cursor: "pointer",
// //           }}
// //         >
// //           ❌ Cancel
// //         </button>
// //       </div>
// //     </div>
// //   </div>
// // );

// // // 🔹 Input field reusable
// // const InputField = ({ label, name, value, onChange, type = "text" }) => (
// //   <div style={{ marginBottom: "10px" }}>
// //     <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
// //       {label}
// //     </label>
// //     <input
// //       type={type}
// //       name={name}
// //       value={value}
// //       onChange={onChange}
// //       style={{
// //         width: "100%",
// //         padding: "8px",
// //         borderRadius: "5px",
// //         border: "1px solid #ccc",
// //       }}
// //     />
// //   </div>
// // );

// // export default SaleList;
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import Navigation from "../navigation/Navigation";
// import { Link } from "react-router-dom";
// import axios from "axios";

// const SaleList = () => {
//   const [sales, setSales] = useState([]);
//   const [stocks, setStocks] = useState([]);
//   const [purchases, setPurchases] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState('day');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

//   const [showModal, setShowModal] = useState(false);
//   const [currentSale, setCurrentSale] = useState(null);

//   // cache purchase prices to avoid recomputation
//   const priceCacheRef = useRef({});

//   useEffect(() => {
//     fetchAllSales();
//     fetchStocks();
//     fetchPurchases();
//     fetchProducts();
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

//   const fetchPurchases = () => {
//     axios
//       .get("http://localhost:8080/api/purchases")
//       .then((res) => setPurchases(res.data))
//       .catch((err) => console.error("Error fetching purchases:", err));
//   };

//   const fetchProducts = () => {
//     axios
//       .get("http://localhost:8080/api/product/get/product")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   };

//   // 🔹 UPDATED: Get selling price from products table
//   const getSellingPriceFromProduct = (product) => {
//     if (!product) return 0;
//     const productData = products.find(
//       (p) => p.productId === product.productId
//     );
//     return productData ? parseFloat(productData.sellingPrice) || 0 : 0;
//   };

//   // 🔹 UPDATED: Get buying price from products table (latestPurchasePrice)
//   const getBuyingPriceFromProduct = (product) => {
//     if (!product) return 0;
//     const productData = products.find(
//       (p) => p.productId === product.productId
//     );
//     return productData ? parseFloat(productData.latestPurchasePrice) || 0 : 0;
//   };

//   // 🔹 Fallback: get buying price from stock (keep as backup)
//   const getBuyingPriceFromStock = (product) => {
//     if (!product) return 0;
//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );
//     return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
//   };

//   // 🔹 UPDATED: Compute actual purchase price using products table first, then cache + history as fallback
//   const getActualPurchasePrice = (sale) => {
//     try {
//       if (!sale?.product) return 0;
      
//       // First try to get from products table
//       const productPrice = getBuyingPriceFromProduct(sale.product);
//       if (productPrice > 0) {
//         return productPrice;
//       }

//       const productId = sale.product.productId;

//       // Check cache first
//       if (priceCacheRef.current[productId]) {
//         return priceCacheRef.current[productId];
//       }

//       const productPurchases = purchases.filter(
//         (p) => p.product?.productId === productId
//       );

//       if (productPurchases.length === 0) {
//         const fallback = getBuyingPriceFromStock(sale.product);
//         priceCacheRef.current[productId] = fallback;
//         return fallback;
//       }

//       const sortedPurchases = [...productPurchases].sort(
//         (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
//       );

//       const saleDate = sale.date ? new Date(sale.date) : null;

//       const relevantPurchase = saleDate
//         ? sortedPurchases.find((p) => new Date(p.purchaseDate) <= saleDate)
//         : sortedPurchases[0];

//       const purchaseToUse = relevantPurchase || sortedPurchases[0];
//       const purchasePrice = parseFloat(purchaseToUse.purchasePrice) || 0;

//       priceCacheRef.current[productId] = purchasePrice;
//       return purchasePrice;
//     } catch (error) {
//       console.error("Error getting actual purchase price:", error);
//       return getBuyingPriceFromStock(sale.product);
//     }
//   };

//   // 🔹 UPDATED: Precompute sale data with prices from products table
//   const saleData = useMemo(() => {
//     return sales.map((sale) => {
//       // Use selling price from products table, fallback to sale.unitPrice
//       const productSellingPrice = getSellingPriceFromProduct(sale.product);
//       const sellingPrice = productSellingPrice > 0 ? productSellingPrice : parseFloat(sale.unitPrice) || 0;
      
//       // Use buying price from products table, fallback to purchase history
//       const productBuyingPrice = getBuyingPriceFromProduct(sale.product);
//       const purchasePrice = productBuyingPrice > 0 ? productBuyingPrice : getActualPurchasePrice(sale);
      
//       const quantity = parseFloat(sale.quantity) || 0;

//       const totalPrice = sellingPrice * quantity;
//       const profit = (sellingPrice - purchasePrice) * quantity;
//       const cogs = purchasePrice * quantity;
//       const margin =
//         purchasePrice > 0
//           ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
//           : 0;

//       return {
//         ...sale,
//         sellingPrice: parseFloat(sellingPrice.toFixed(2)),
//         purchasePrice: parseFloat(purchasePrice.toFixed(2)),
//         profit: parseFloat(profit.toFixed(2)),
//         totalPrice: parseFloat(totalPrice.toFixed(2)),
//         cogs: parseFloat(cogs.toFixed(2)),
//         margin: parseFloat(Math.max(0, margin).toFixed(1)),
//       };
//     });
//   }, [sales, purchases, stocks, products]);

//   // 🔹 Totals (computed once per change)
//   const totalRevenue = useMemo(
//     () => saleData.reduce((sum, s) => sum + s.totalPrice, 0),
//     [saleData]
//   );

//   const totalProfit = useMemo(
//     () => saleData.reduce((sum, s) => sum + s.profit, 0),
//     [saleData]
//   );

//   const totalCOGS = useMemo(
//     () => saleData.reduce((sum, s) => sum + s.cogs, 0),
//     [saleData]
//   );

//   // 🔹 NEW: Filter sales based on report type and date
//   const getFilteredSales = () => {
//     if (!selectedDate) return saleData;

//     const currentDate = new Date(selectedDate);
    
//     switch (reportType) {
//       case 'day':
//         return saleData.filter(sale => {
//           if (!sale.date) return false;
//           const saleDate = new Date(sale.date);
//           return saleDate.toDateString() === currentDate.toDateString();
//         });
        
//       case 'week':
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//         startOfWeek.setHours(0, 0, 0, 0);
        
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);
        
//         return saleData.filter(sale => {
//           if (!sale.date) return false;
//           const saleDate = new Date(sale.date);
//           return saleDate >= startOfWeek && saleDate <= endOfWeek;
//         });
        
//       case 'month':
//         const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
//         return saleData.filter(sale => {
//           if (!sale.date) return false;
//           const saleDate = new Date(sale.date);
//           return saleDate >= startOfMonth && saleDate <= endOfMonth;
//         });
        
//       default:
//         return saleData;
//     }
//   };

//   // 🔹 NEW: Get report title based on type and date
//   const getReportTitle = () => {
//     const date = new Date(selectedDate);
//     switch (reportType) {
//       case 'day':
//         return `Daily Sales Report - ${date.toLocaleDateString()}`;
//       case 'week':
//         const startOfWeek = new Date(date);
//         startOfWeek.setDate(date.getDate() - date.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         return `Weekly Sales Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
//       case 'month':
//         return `Monthly Sales Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
//       default:
//         return 'Sales Report';
//     }
//   };

//   // 🔹 NEW: Download PDF Report
//   const downloadPDFReport = () => {
//     setReportLoading(true);
    
//     const filteredSales = getFilteredSales();
    
//     // Calculate totals for filtered data
//     const filteredRevenue = filteredSales.reduce((sum, s) => sum + s.totalPrice, 0);
//     const filteredProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
//     const filteredCOGS = filteredSales.reduce((sum, s) => sum + s.cogs, 0);

//     // Create report data
//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalSales: filteredSales.length,
//         totalRevenue: filteredRevenue,
//         totalProfit: filteredProfit,
//         totalCOGS: filteredCOGS,
//         averageProfit: filteredSales.length > 0 ? filteredProfit / filteredSales.length : 0,
//         averageMargin: filteredSales.length > 0 ? filteredSales.reduce((sum, s) => sum + s.margin, 0) / filteredSales.length : 0
//       },
//       sales: filteredSales.map(sale => ({
//         saleId: sale.saleId,
//         date: sale.date || 'N/A',
//         productName: sale.product?.productName || 'N/A',
//         quantity: sale.quantity,
//         sellingPrice: sale.sellingPrice.toFixed(2),
//         buyingPrice: sale.purchasePrice.toFixed(2),
//         totalPrice: sale.totalPrice.toFixed(2),
//         profit: sale.profit.toFixed(2),
//         margin: sale.margin.toFixed(1) + '%',
//         customer: sale.customerName || 'Walk-in'
//       }))
//     };

//     // Generate PDF
//     generatePDF(reportData);
//   };

//   // 🔹 NEW: Generate PDF using jsPDF
//   const generatePDF = (reportData) => {
//     // Import jsPDF dynamically
//     import('jspdf').then((jsPDFModule) => {
//       const { jsPDF } = jsPDFModule;
//       const pdf = new jsPDF();
      
//       // Set initial y position
//       let yPosition = 20;
      
//       // Add title
//       pdf.setFontSize(16);
//       pdf.setTextColor(40, 40, 40);
//       pdf.text('SALES REPORT', 105, yPosition, { align: 'center' });
//       yPosition += 10;
      
//       // Add report details
//       pdf.setFontSize(10);
//       pdf.setTextColor(100, 100, 100);
//       pdf.text(`Report: ${reportData.title}`, 20, yPosition);
//       yPosition += 6;
//       pdf.text(`Generated: ${reportData.generatedAt}`, 20, yPosition);
//       yPosition += 15;
      
//       // Add summary section
//       pdf.setFontSize(12);
//       pdf.setTextColor(40, 40, 40);
//       pdf.text('SUMMARY', 20, yPosition);
//       yPosition += 8;
      
//       pdf.setFontSize(9);
//       pdf.setTextColor(80, 80, 80);
//       pdf.text(`Total Sales: ${reportData.summary.totalSales}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Revenue: Tsh ${reportData.summary.totalRevenue.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Profit: Tsh ${reportData.summary.totalProfit.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total COGS: Tsh ${reportData.summary.totalCOGS.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Profit per Sale: Tsh ${reportData.summary.averageProfit.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Margin: ${reportData.summary.averageMargin.toFixed(1)}%`, 20, yPosition);
//       yPosition += 15;
      
//       // Add table headers
//       pdf.setFontSize(9);
      
//       // Table headers configuration
//       const headers = ['Sale ID', 'Date', 'Product', 'Qty', 'Sell Price', 'Buy Price', 'Total', 'Profit', 'Margin', 'Customer'];
//       const columnWidths = [18, 22, 30, 12, 18, 18, 18, 18, 15, 25];
      
//       // Draw header background
//       pdf.setFillColor(59, 89, 152);
//       pdf.rect(10, yPosition, 186, 8, 'F');
      
//       // Add header text
//       pdf.setTextColor(255, 255, 255);
//       let xPosition = 12;
      
//       headers.forEach((header, index) => {
//         pdf.text(header, xPosition, yPosition + 6);
//         xPosition += columnWidths[index];
//       });
      
//       yPosition += 12;
      
//       // Reset text color for data rows
//       pdf.setTextColor(0, 0, 0);
      
//       // Add table rows
//       pdf.setFontSize(8);
      
//       reportData.sales.forEach((sale, index) => {
//         // Check if we need a new page
//         if (yPosition > 270) {
//           pdf.addPage();
//           yPosition = 20;
          
//           // Add headers on new page
//           pdf.setFontSize(9);
//           pdf.setFillColor(59, 89, 152);
//           pdf.rect(10, yPosition, 186, 8, 'F');
          
//           pdf.setTextColor(255, 255, 255);
//           xPosition = 12;
//           headers.forEach((header, idx) => {
//             pdf.text(header, xPosition, yPosition + 6);
//             xPosition += columnWidths[idx];
//           });
          
//           yPosition = 32;
//           pdf.setFontSize(8);
//           pdf.setTextColor(0, 0, 0);
//         }
        
//         // Alternate row colors
//         if (index % 2 === 0) {
//           pdf.setFillColor(245, 245, 245);
//           pdf.rect(10, yPosition - 4, 186, 6, 'F');
//         }
        
//         // Reset fill color for text
//         pdf.setFillColor(255, 255, 255);
        
//         xPosition = 12;
        
//         // Sale ID
//         pdf.text(sale.saleId.toString(), xPosition, yPosition);
//         xPosition += columnWidths[0];
        
//         // Date
//         pdf.text(sale.date.substring(0, 10), xPosition, yPosition);
//         xPosition += columnWidths[1];
        
//         // Product Name
//         pdf.text(sale.productName.substring(0, 15), xPosition, yPosition);
//         xPosition += columnWidths[2];
        
//         // Quantity
//         pdf.text(sale.quantity.toString(), xPosition, yPosition);
//         xPosition += columnWidths[3];
        
//         // Selling Price
//         pdf.text(sale.sellingPrice, xPosition, yPosition);
//         xPosition += columnWidths[4];
        
//         // Buying Price
//         pdf.text(sale.buyingPrice, xPosition, yPosition);
//         xPosition += columnWidths[5];
        
//         // Total Price
//         pdf.text(sale.totalPrice, xPosition, yPosition);
//         xPosition += columnWidths[6];
        
//         // Profit
//         pdf.text(sale.profit, xPosition, yPosition);
//         xPosition += columnWidths[7];
        
//         // Margin
//         pdf.text(sale.margin, xPosition, yPosition);
//         xPosition += columnWidths[8];
        
//         // Customer
//         pdf.text(sale.customer.substring(0, 12), xPosition, yPosition);
        
//         yPosition += 6;
//       });
      
//       // Add footer
//       const pageCount = pdf.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
//         pdf.text('Generated by Sales Management System', 105, 290, { align: 'center' });
//       }
      
//       // Save PDF
//       const fileName = `sales_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
//       pdf.save(fileName);
//       setReportLoading(false);
//     }).catch(error => {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF report');
//       setReportLoading(false);
//     });
//   };

//   // 🔹 NEW: Download CSV Report
//   const downloadCSVReport = () => {
//     setReportLoading(true);
    
//     const filteredSales = getFilteredSales();
    
//     // Calculate totals for filtered data
//     const filteredRevenue = filteredSales.reduce((sum, s) => sum + s.totalPrice, 0);
//     const filteredProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
//     const filteredCOGS = filteredSales.reduce((sum, s) => sum + s.cogs, 0);

//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalSales: filteredSales.length,
//         totalRevenue: filteredRevenue,
//         totalProfit: filteredProfit,
//         totalCOGS: filteredCOGS,
//         averageProfit: filteredSales.length > 0 ? filteredProfit / filteredSales.length : 0,
//         averageMargin: filteredSales.length > 0 ? filteredSales.reduce((sum, s) => sum + s.margin, 0) / filteredSales.length : 0
//       },
//       sales: filteredSales.map(sale => ({
//         saleId: sale.saleId,
//         date: sale.date || 'N/A',
//         productName: sale.product?.productName || 'N/A',
//         quantity: sale.quantity,
//         sellingPrice: sale.sellingPrice.toFixed(2),
//         buyingPrice: sale.purchasePrice.toFixed(2),
//         totalPrice: sale.totalPrice.toFixed(2),
//         profit: sale.profit.toFixed(2),
//         margin: sale.margin.toFixed(1) + '%',
//         customer: sale.customerName || 'Walk-in'
//       }))
//     };

//     // Create CSV content
//     const csvContent = createCSVContent(reportData);
    
//     // Create and download file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
    
//     link.setAttribute('href', url);
//     link.setAttribute('download', `sales_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     setReportLoading(false);
//   };

//   // 🔹 NEW: Create CSV content from report data
//   const createCSVContent = (reportData) => {
//     const headers = ['Sale ID', 'Date', 'Product Name', 'Quantity', 'Selling Price', 'Buying Price', 'Total Price', 'Profit', 'Margin', 'Customer'];
//     const csvRows = [];
    
//     // Add header
//     csvRows.push(headers.join(','));
    
//     // Add data rows
//     reportData.sales.forEach(sale => {
//       const row = [
//         sale.saleId,
//         `"${sale.date}"`,
//         `"${sale.productName}"`,
//         sale.quantity,
//         sale.sellingPrice,
//         sale.buyingPrice,
//         sale.totalPrice,
//         sale.profit,
//         sale.margin,
//         `"${sale.customer}"`
//       ];
//       csvRows.push(row.join(','));
//     });
    
//     // Add summary
//     csvRows.push('');
//     csvRows.push('SUMMARY');
//     csvRows.push(`Total Sales,${reportData.summary.totalSales}`);
//     csvRows.push(`Total Revenue,Tsh${reportData.summary.totalRevenue.toFixed(2)}`);
//     csvRows.push(`Total Profit,Tsh${reportData.summary.totalProfit.toFixed(2)}`);
//     csvRows.push(`Total COGS,Tsh${reportData.summary.totalCOGS.toFixed(2)}`);
//     csvRows.push(`Average Profit per Sale,Tsh${reportData.summary.averageProfit.toFixed(2)}`);
//     csvRows.push(`Average Margin,${reportData.summary.averageMargin.toFixed(1)}%`);
//     csvRows.push('');
//     csvRows.push(`Report Title,${reportData.title}`);
//     csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
//     return csvRows.join('\n');
//   };

//   // 🔹 Stock & helper functions
//   const getStockStatus = (product) => {
//     if (!product) return "N/A";
//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );
//     if (!stock) return "N/A";

//     const styleMap = {
//       "Sold Out": { color: "red", fontWeight: "bold" },
//       "Partially Sold": { color: "orange", fontWeight: "bold" },
//       "In Stock": { color: "green", fontWeight: "bold" },
//     };
//     const style = styleMap[stock.status] || { color: "gray" };

//     return <span style={style}>{stock.status || "N/A"}</span>;
//   };

//   const getCurrentStockQuantity = (product) => {
//     if (!product) return "N/A";
//     const stock = stocks.find(
//       (s) => s.product && s.product.productId === product.productId
//     );
//     return stock ? stock.currentStock : "N/A";
//   };

//   const hasPurchaseHistory = (product) => {
//     if (!product) return false;
//     return purchases.some((p) => p.product?.productId === product.productId);
//   };

//   // 🔹 NEW: Check if product has price data in products table
//   const hasProductPriceData = (product) => {
//     if (!product) return false;
//     const productData = products.find((p) => p.productId === product.productId);
//     return productData && (productData.sellingPrice > 0 || productData.latestPurchasePrice > 0);
//   };

//   // 🔹 Delete sale
//   const deleteSale = (id) => {
//     if (!window.confirm("Are you sure you want to delete this sale?")) return;

//     fetch(`http://localhost:8080/api/sales/${id}`, {
//       method: "DELETE",
//     })
//       .then((response) => {
//         if (!response.ok) throw new Error("Failed to delete");
//         alert("Sale deleted successfully!");
//         fetchAllSales();
//         fetchStocks();
//       })
//       .catch((err) => alert("Error deleting sale: " + err.message));
//   };

//   // 🔹 Edit sale
//   const handleUpdateClick = (sale) => {
//     setCurrentSale({ ...sale, date: sale.date || "" });
//     setShowModal(true);
//   };

//   const handleUpdateChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentSale((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSaveUpdate = () => {
//     if (!currentSale) return;

//     const updatedSale = {
//       ...currentSale,
//       totalPrice:
//         (parseFloat(currentSale.quantity) || 0) *
//         (parseFloat(currentSale.unitPrice) || 0),
//     };

//     axios
//       .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
//       .then(() => {
//         alert("Sale updated successfully!");
//         setShowModal(false);
//         fetchAllSales();
//         fetchStocks();
//       })
//       .catch((err) => {
//         alert("Error updating sale: " + err.message);
//       });
//   };

//   // 🔹 UI
//   return (
//     <>
//       <Navigation />
//       <div style={{ padding: "20px", marginBottom: "200px", marginTop: "90px" }}>
//         <div style={{ marginTop: "40px"}}>
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//             }}
//           >
//             <h2 style={{ marginTop: "40px", marginLeft: "590px" }}>
//               Sales List
//             </h2>
//             <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//               {/* Summary Cards */}
//               <div style={{ display: "flex", gap: "15px" }}>
//                 <SummaryCard
//                   title="Total Revenue"
//                   color="#007bff"
//                   bg="#e7f3ff"
//                   value={`Tsh${totalRevenue.toFixed(2)}`}
//                 />
//                 <SummaryCard
//                   title="Total Profit"
//                   color="#28a745"
//                   bg="#d4edda"
//                   value={`Tsh${totalProfit.toFixed(2)}`}
//                 />
//                 <SummaryCard
//                   title="Total Sales"
//                   color="#856404"
//                   bg="#fff3cd"
//                   value={saleData.length}
//                 />
//                 <SummaryCard
//                   title="COGS"
//                   color="#721c24"
//                   bg="#f8d7da"
//                   value={`Tsh${totalCOGS.toFixed(2)}`}
//                 />
//               </div>

//               {/* 🔹 UPDATED: Report Download Section */}
//               <div style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: '10px',
//                 backgroundColor: '#f8f9fa',
//                 padding: '13px 15px',
//                 borderRadius: '8px',
//                 border: '1px solid #dee2e6'
//               }}>
//                 {/* Date Selection */}
//                 <div>
//                   <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
//                     Select Date:
//                   </label>
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     style={{
//                       padding: '6px 10px',
//                       borderRadius: '5px',
//                       border: '1px solid #ced4da',
//                       backgroundColor: 'white',
//                       fontSize: '12px'
//                     }}
//                   />
//                 </div>

//                 {/* Report Type Selection */}
//                 <div>
//                   <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
//                     Report Type:
//                   </label>
//                   <select
//                     value={reportType}
//                     onChange={(e) => setReportType(e.target.value)}
//                     style={{
//                       padding: '6px 10px',
//                       borderRadius: '5px',
//                       border: '1px solid #ced4da',
//                       backgroundColor: 'white',
//                       fontSize: '12px'
//                     }}
//                   >
//                     <option value="day">Daily</option>
//                     <option value="week">Weekly</option>
//                     <option value="month">Monthly</option>
//                   </select>
//                 </div>
                
//                 <button
//                   onClick={downloadPDFReport}
//                   disabled={reportLoading}
//                   style={{
//                     padding: '8px 16px',
//                     backgroundColor: '#dc3545',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: reportLoading ? 'not-allowed' : 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '5px',
//                     opacity: reportLoading ? 0.7 : 1
//                   }}
//                 >
//                   📄 {reportLoading ? 'Generating...' : 'PDF Report'}
//                 </button>

//                 <button
//                   onClick={downloadCSVReport}
//                   disabled={reportLoading}
//                   style={{
//                     padding: '8px 16px',
//                     backgroundColor: '#28a745',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '5px',
//                     cursor: reportLoading ? 'not-allowed' : 'pointer',
//                     fontWeight: 'bold',
//                     fontSize: '14px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '5px',
//                     opacity: reportLoading ? 0.7 : 1
//                   }}
//                 >
//                   📊 {reportLoading ? 'Generating...' : 'CSV Report'}
//                 </button>
//               </div>

//               <Link to="/add-sale">
//                 <button
//                   style={{
//                     borderRadius: "10px",
//                     backgroundColor: "#4CAF50",
//                     color: "white",
//                     padding: "10px 20px",
//                     border: "none",
//                     cursor: "pointer",
//                     width: "100px",
//                   }}
//                 >
//                   Add Sale
//                 </button>
//               </Link>
//             </div>
//           </div>
//         </div>

//         {error && <p style={{ color: "red" }}>Error: {error}</p>}
//         {loading ? (
//           <p>Loading...</p>
//         ) : saleData.length === 0 ? (
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
//                 width: "150%",
//                 tableLayout: "fixed",
//               }}
//             >
//               <thead
//                 style={{
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 1,
//                   background: "#2c3e50",
//                   color: "white",
//                 }}
//               >
//                 <tr>
//                   <th>Sale ID</th>
//                   <th>Selling Date</th>
//                   <th>Product Name</th>
//                   <th>Qty Sold</th>
//                   <th>Selling Price/unit</th>
//                   <th>Buying Price/unit</th>
//                   <th>Total Selling Price</th>
//                   <th>Profit</th>
//                   <th>Margin</th>
//                   <th>Customer</th>
//                   <th>Stock Status</th>
//                   <th>Qty Left InStock</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {saleData.map((sale) => {
//                   const hasPurchaseData = hasPurchaseHistory(sale.product);
//                   const hasProductData = hasProductPriceData(sale.product);
//                   const profitColor =
//                     sale.profit > 0
//                       ? "green"
//                       : sale.profit < 0
//                       ? "red"
//                       : "#6c757d";
//                   const marginColor =
//                     sale.margin > 50
//                       ? "green"
//                       : sale.margin > 20
//                       ? "#17a2b8"
//                       : sale.margin > 0
//                       ? "#ffc107"
//                       : "red";

//                   return (
//                     <tr key={sale.saleId}>
//                       <td>{sale.saleId}</td>
//                       <td>{sale.date}</td>
//                       <td>
//                         {sale.product?.productName || "N/A"}
//                         {!hasProductData && (
//                           <div
//                             style={{
//                               fontSize: "10px",
//                               color: "orange",
//                               fontStyle: "italic",
//                             }}
//                           >
//                             *Using calculated prices
//                           </div>
//                         )}
//                         {hasProductData && !hasPurchaseData && (
//                           <div
//                             style={{
//                               fontSize: "10px",
//                               color: "green",
//                               fontStyle: "italic",
//                             }}
//                           >
//                             *Using product table prices
//                           </div>
//                         )}
//                       </td>
//                       <td>{sale.quantity}</td>
//                       <td>Tsh{sale.sellingPrice.toFixed(2)}</td>
//                       <td>Tsh{sale.purchasePrice.toFixed(2)}</td>
//                       <td>Tsh{sale.totalPrice.toFixed(2)}</td>
//                       <td style={{ fontWeight: "bold", color: profitColor }}>
//                         Tsh{sale.profit.toFixed(2)}
//                       </td>
//                       <td
//                         style={{
//                           fontWeight: "bold",
//                           color: marginColor,
//                           fontSize: "12px",
//                         }}
//                       >
//                         {sale.margin.toFixed(1)}%
//                       </td>
//                       <td>{sale.customerName || "Walk-in"}</td>
//                       <td>{getStockStatus(sale.product)}</td>
//                       <td style={{ textAlign: "center" }}>
//                         {getCurrentStockQuantity(sale.product)}
//                       </td>
//                       <td>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "row",
//                             gap: "5px",
//                           }}
//                         >
//                           <button
//                             onClick={() => handleUpdateClick(sale)}
//                             style={buttonStyle("#007bff")}
//                           >
//                             ✏️ Edit
//                           </button>
//                           <button
//                             onClick={() => deleteSale(sale.saleId)}
//                             style={buttonStyle("#dc3545")}
//                           >
//                             🗑️ Delete
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Update Modal */}
//         {showModal && currentSale && (
//           <UpdateModal
//             currentSale={currentSale}
//             getBuyingPriceFromProduct={getBuyingPriceFromProduct}
//             hasPurchaseHistory={hasPurchaseHistory}
//             hasProductPriceData={hasProductPriceData}
//             onSave={handleSaveUpdate}
//             onChange={handleUpdateChange}
//             onClose={() => setShowModal(false)}
//           />
//         )}
//       </div>
//     </>
//   );
// };

// // 🔹 Reusable summary card
// const SummaryCard = ({ title, value, color, bg }) => (
//   <div
//     style={{
//       backgroundColor: bg,
//       padding: "10px 15px",
//       borderRadius: "10px",
//       border: `2px solid ${color}`,
//       fontWeight: "bold",
//       color,
//       textAlign: "center",
//       minWidth: "120px"
//     }}
//   >
//     <div style={{ fontSize: "12px" }}>{title}</div>
//     <div style={{ fontSize: "14px" }}>{value}</div>
//   </div>
// );

// // 🔹 Reusable button style
// const buttonStyle = (bg) => ({
//   background: bg,
//   color: "white",
//   padding: "5px 10px",
//   borderRadius: "5px",
//   border: "none",
//   cursor: "pointer",
//   fontSize: "12px",
// });

// // 🔹 UPDATED: Modal Component with product price info
// const UpdateModal = ({
//   currentSale,
//   hasPurchaseHistory,
//   hasProductPriceData,
//   getBuyingPriceFromProduct,
//   onSave,
//   onChange,
//   onClose,
// }) => (
//   <div
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//     }}
//   >
//     <div
//       style={{
//         background: "white",
//         padding: "25px",
//         borderRadius: "15px",
//         width: "450px",
//         boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
//       }}
//     >
//       <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
//         ✏️ Update Sale
//       </h3>

//       <div
//         style={{
//           marginBottom: "15px",
//           padding: "10px",
//           backgroundColor: "#f8f9fa",
//           borderRadius: "8px",
//           border: "1px solid #e9ecef",
//         }}
//       >
//         <div style={{ fontWeight: "bold", color: "#495057" }}>
//           Product: {currentSale.product?.productName || "N/A"}
//         </div>
//         <div style={{ color: "#6c757d", fontSize: "14px" }}>
//           Actual Buying Price: Tsh
//           {getBuyingPriceFromProduct(currentSale.product).toFixed(2)}
//         </div>
//         <div
//           style={{
//             color: hasProductPriceData(currentSale.product) 
//               ? "#28a745" 
//               : hasPurchaseHistory(currentSale.product)
//               ? "#17a2b8"
//               : "#ffc107",
//             fontSize: "12px",
//             fontStyle: "italic",
//           }}
//         >
//           {hasProductPriceData(currentSale.product)
//             ? "Based on product table prices"
//             : hasPurchaseHistory(currentSale.product)
//             ? "Based on purchase history"
//             : "Estimated from current stock price"}
//         </div>
//       </div>

//       <InputField
//         label="Date"
//         name="date"
//         type="date"
//         value={currentSale.date || ""}
//         onChange={onChange}
//       />
//       <InputField
//         label="Customer Name"
//         name="customerName"
//         value={currentSale.customerName || ""}
//         onChange={onChange}
//       />
//       <InputField
//         label="Quantity"
//         name="quantity"
//         type="number"
//         value={currentSale.quantity || ""}
//         onChange={onChange}
//       />
//       <InputField
//         label="Unit Price"
//         name="unitPrice"
//         type="number"
//         value={currentSale.unitPrice || ""}
//         onChange={onChange}
//       />

//       <div style={{ textAlign: "center" }}>
//         <button
//           onClick={onSave}
//           style={{
//             background: "#28a745",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "8px",
//             border: "none",
//             marginRight: "10px",
//             cursor: "pointer",
//           }}
//         >
//           💾 Save
//         </button>
//         <button
//           onClick={onClose}
//           style={{
//             background: "#dc3545",
//             color: "white",
//             padding: "8px 16px",
//             borderRadius: "8px",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           ❌ Cancel
//         </button>
//       </div>
//     </div>
//   </div>
// );

// // 🔹 Input field reusable
// const InputField = ({ label, name, value, onChange, type = "text" }) => (
//   <div style={{ marginBottom: "10px" }}>
//     <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
//       {label}
//     </label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       style={{
//         width: "100%",
//         padding: "8px",
//         borderRadius: "5px",
//         border: "1px solid #ccc",
//       }}
//     />
//   </div>
// );

// export default SaleList;
import React, { useEffect, useMemo, useRef, useState } from "react";
import Navigation from "../navigation/Navigation";
import { Link } from "react-router-dom";
import axios from "axios";

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reportLoading, setReportLoading] = useState(false);
  const [reportType, setReportType] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [showModal, setShowModal] = useState(false);
  const [currentSale, setCurrentSale] = useState(null);

  // cache purchase prices to avoid recomputation
  const priceCacheRef = useRef({});

  useEffect(() => {
    fetchAllSales();
    fetchStocks();
    fetchPurchases();
    fetchProducts();
  }, []);

  const handleResponse = async (response) => {
    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || `Error: ${response.status}`);
    }
    return response.json();
  };

//   const fetchAllSales = () => {
//     setLoading(true);
//     setError(null);
//     fetch("http://localhost:8080api/sales/all-sales")
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

const fetchAllSales = () => {
  setLoading(true);
  setError(null);
  fetch("/api/sales/all-sales") // Added missing slash
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

  const fetchPurchases = () => {
    axios
      .get("http://localhost:8080/api/purchases")
      .then((res) => setPurchases(res.data))
      .catch((err) => console.error("Error fetching purchases:", err));
  };

  const fetchProducts = () => {
    axios
      .get("http://localhost:8080/api/product/get/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  };

  // 🔹 UPDATED: Get selling price from products table
  const getSellingPriceFromProduct = (product) => {
    if (!product) return 0;
    const productData = products.find(
      (p) => p.productId === product.productId
    );
    return productData ? parseFloat(productData.sellingPrice) || 0 : 0;
  };

  // 🔹 UPDATED: Get buying price from products table (latestPurchasePrice)
  const getBuyingPriceFromProduct = (product) => {
    if (!product) return 0;
    const productData = products.find(
      (p) => p.productId === product.productId
    );
    return productData ? parseFloat(productData.latestPurchasePrice) || 0 : 0;
  };

  // 🔹 Fallback: get buying price from stock (keep as backup)
  const getBuyingPriceFromStock = (product) => {
    if (!product) return 0;
    const stock = stocks.find(
      (s) => s.product && s.product.productId === product.productId
    );
    return stock ? parseFloat(stock.latestPurchasePrice) || 0 : 0;
  };

  // 🔹 UPDATED: Compute actual purchase price using products table first, then cache + history as fallback
  const getActualPurchasePrice = (sale) => {
    try {
      if (!sale?.product) return 0;
      
      // First try to get from products table
      const productPrice = getBuyingPriceFromProduct(sale.product);
      if (productPrice > 0) {
        return productPrice;
      }

      const productId = sale.product.productId;

      // Check cache first
      if (priceCacheRef.current[productId]) {
        return priceCacheRef.current[productId];
      }

      const productPurchases = purchases.filter(
        (p) => p.product?.productId === productId
      );

      if (productPurchases.length === 0) {
        const fallback = getBuyingPriceFromStock(sale.product);
        priceCacheRef.current[productId] = fallback;
        return fallback;
      }

      const sortedPurchases = [...productPurchases].sort(
        (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
      );

      const saleDate = sale.date ? new Date(sale.date) : null;

      const relevantPurchase = saleDate
        ? sortedPurchases.find((p) => new Date(p.purchaseDate) <= saleDate)
        : sortedPurchases[0];

      const purchaseToUse = relevantPurchase || sortedPurchases[0];
      const purchasePrice = parseFloat(purchaseToUse.purchasePrice) || 0;

      priceCacheRef.current[productId] = purchasePrice;
      return purchasePrice;
    } catch (error) {
      console.error("Error getting actual purchase price:", error);
      return getBuyingPriceFromStock(sale.product);
    }
  };

  // 🔹 UPDATED: Precompute sale data with prices from products table
//   const saleData = useMemo(() => {
//     return sales.map((sale) => {
//       // Use selling price from products table, fallback to sale.unitPrice
//       const productSellingPrice = getSellingPriceFromProduct(sale.product);
//       const sellingPrice = productSellingPrice > 0 ? productSellingPrice : parseFloat(sale.unitPrice) || 0;
      
//       // Use buying price from products table, fallback to purchase history
//       const productBuyingPrice = getBuyingPriceFromProduct(sale.product);
//       const purchasePrice = productBuyingPrice > 0 ? productBuyingPrice : getActualPurchasePrice(sale);
      
//       const quantity = parseFloat(sale.quantity) || 0;

//       const totalPrice = sellingPrice * quantity;
//       const profit = (sellingPrice - purchasePrice) * quantity;
//       const cogs = purchasePrice * quantity;
//       const margin =
//         purchasePrice > 0
//           ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
//           : 0;

//       return {
//         ...sale,
//         sellingPrice: parseFloat(sellingPrice.toFixed(2)),
//         purchasePrice: parseFloat(purchasePrice.toFixed(2)),
//         profit: parseFloat(profit.toFixed(2)),
//         totalPrice: parseFloat(totalPrice.toFixed(2)),
//         cogs: parseFloat(cogs.toFixed(2)),
//         margin: parseFloat(Math.max(0, margin).toFixed(1)),
//       };
//     });
//   }, [sales, purchases, stocks, products]);

// In the saleData computation in SaleList, ensure you're using the unitPrice from sale
const saleData = useMemo(() => {
  return sales.map((sale) => {
    // Use the actual selling price from sale.unitPrice (manually entered)
    const sellingPrice = parseFloat(sale.unitPrice) || 0;
    
    // Rest of your calculation logic remains the same...
    const purchasePrice = getActualPurchasePrice(sale);
    const quantity = parseFloat(sale.quantity) || 0;

    const totalPrice = sellingPrice * quantity;
    const profit = (sellingPrice - purchasePrice) * quantity;
    const cogs = purchasePrice * quantity;
    const margin =
      purchasePrice > 0
        ? ((sellingPrice - purchasePrice) / purchasePrice) * 100
        : 0;

    return {
      ...sale,
      sellingPrice: parseFloat(sellingPrice.toFixed(2)),
      purchasePrice: parseFloat(purchasePrice.toFixed(2)),
      profit: parseFloat(profit.toFixed(2)),
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      cogs: parseFloat(cogs.toFixed(2)),
      margin: parseFloat(Math.max(0, margin).toFixed(1)),
    };
  });
}, [sales, purchases, stocks, products]);

  // 🔹 Totals (computed once per change)
  const totalRevenue = useMemo(
    () => saleData.reduce((sum, s) => sum + s.totalPrice, 0),
    [saleData]
  );

  const totalProfit = useMemo(
    () => saleData.reduce((sum, s) => sum + s.profit, 0),
    [saleData]
  );

  const totalCOGS = useMemo(
    () => saleData.reduce((sum, s) => sum + s.cogs, 0),
    [saleData]
  );

  // 🔹 NEW: Filter sales based on report type and date
  const getFilteredSales = () => {
    if (!selectedDate) return saleData;

    const currentDate = new Date(selectedDate);
    
    switch (reportType) {
      case 'day':
        return saleData.filter(sale => {
          if (!sale.date) return false;
          const saleDate = new Date(sale.date);
          return saleDate.toDateString() === currentDate.toDateString();
        });
        
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        
        return saleData.filter(sale => {
          if (!sale.date) return false;
          const saleDate = new Date(sale.date);
          return saleDate >= startOfWeek && saleDate <= endOfWeek;
        });
        
      case 'month':
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
        return saleData.filter(sale => {
          if (!sale.date) return false;
          const saleDate = new Date(sale.date);
          return saleDate >= startOfMonth && saleDate <= endOfMonth;
        });
        
      default:
        return saleData;
    }
  };

  // 🔹 NEW: Get report title based on type and date
  const getReportTitle = () => {
    const date = new Date(selectedDate);
    switch (reportType) {
      case 'day':
        return `Daily Sales Report - ${date.toLocaleDateString()}`;
      case 'week':
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `Weekly Sales Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
      case 'month':
        return `Monthly Sales Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      default:
        return 'Sales Report';
    }
  };

  // 🔹 NEW: Download PDF Report
  const downloadPDFReport = () => {
    setReportLoading(true);
    
    const filteredSales = getFilteredSales();
    
    // Calculate totals for filtered data
    const filteredRevenue = filteredSales.reduce((sum, s) => sum + s.totalPrice, 0);
    const filteredProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
    const filteredCOGS = filteredSales.reduce((sum, s) => sum + s.cogs, 0);

    // Create report data
    const reportData = {
      title: getReportTitle(),
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalSales: filteredSales.length,
        totalRevenue: filteredRevenue,
        totalProfit: filteredProfit,
        totalCOGS: filteredCOGS,
        averageProfit: filteredSales.length > 0 ? filteredProfit / filteredSales.length : 0,
        averageMargin: filteredSales.length > 0 ? filteredSales.reduce((sum, s) => sum + s.margin, 0) / filteredSales.length : 0
      },
      sales: filteredSales.map(sale => ({
        saleId: sale.saleId,
        date: sale.date || 'N/A',
        productName: sale.product?.productName || 'N/A',
        quantity: sale.quantity,
        sellingPrice: sale.sellingPrice.toFixed(2),
        buyingPrice: sale.purchasePrice.toFixed(2),
        totalPrice: sale.totalPrice.toFixed(2),
        profit: sale.profit.toFixed(2),
        margin: sale.margin.toFixed(1) + '%',
        customer: sale.customerName || 'Walk-in'
      }))
    };

    // Generate PDF
    generatePDF(reportData);
  };

  // 🔹 NEW: Generate PDF using jsPDF
  const generatePDF = (reportData) => {
    // Import jsPDF dynamically
    import('jspdf').then((jsPDFModule) => {
      const { jsPDF } = jsPDFModule;
      const pdf = new jsPDF();
      
      // Set initial y position
      let yPosition = 20;
      
      // Add title
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('SALES REPORT', 105, yPosition, { align: 'center' });
      yPosition += 10;
      
      // Add report details
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Report: ${reportData.title}`, 20, yPosition);
      yPosition += 6;
      pdf.text(`Generated: ${reportData.generatedAt}`, 20, yPosition);
      yPosition += 15;
      
      // Add summary section
      pdf.setFontSize(12);
      pdf.setTextColor(40, 40, 40);
      pdf.text('SUMMARY', 20, yPosition);
      yPosition += 8;
      
      pdf.setFontSize(9);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`Total Sales: ${reportData.summary.totalSales}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Revenue: Tsh ${reportData.summary.totalRevenue.toFixed(2)}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Profit: Tsh ${reportData.summary.totalProfit.toFixed(2)}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total COGS: Tsh ${reportData.summary.totalCOGS.toFixed(2)}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Average Profit per Sale: Tsh ${reportData.summary.averageProfit.toFixed(2)}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Average Margin: ${reportData.summary.averageMargin.toFixed(1)}%`, 20, yPosition);
      yPosition += 15;
      
      // Add table headers
      pdf.setFontSize(9);
      
      // Table headers configuration
      const headers = ['Sale ID', 'Date', 'Product', 'Qty', 'Sell Price', 'Buy Price', 'Total', 'Profit', 'Margin', 'Customer'];
      const columnWidths = [15, 18, 20, 20, 25, 25, 25, 25, 30, 25];
      
      // Draw header background
      pdf.setFillColor(59, 89, 152);
      pdf.rect(10, yPosition, 186, 8, 'F');
      
      // Add header text
      pdf.setTextColor(255, 255, 255);
      let xPosition = 12;
      
      headers.forEach((header, index) => {
        pdf.text(header, xPosition, yPosition + 6);
        xPosition += columnWidths[index];
      });
      
      yPosition += 12;
      
      // Reset text color for data rows
      pdf.setTextColor(0, 0, 0);
      
      // Add table rows
      pdf.setFontSize(8);
      
      reportData.sales.forEach((sale, index) => {
        // Check if we need a new page
        if (yPosition > 270) {
          pdf.addPage();
          yPosition = 20;
          
          // Add headers on new page
          pdf.setFontSize(9);
          pdf.setFillColor(59, 89, 152);
          pdf.rect(10, yPosition, 186, 8, 'F');
          
          pdf.setTextColor(255, 255, 255);
          xPosition = 12;
          headers.forEach((header, idx) => {
            pdf.text(header, xPosition, yPosition + 6);
            xPosition += columnWidths[idx];
          });
          
          yPosition = 32;
          pdf.setFontSize(8);
          pdf.setTextColor(0, 0, 0);
        }
        
        // Alternate row colors
        if (index % 2 === 0) {
          pdf.setFillColor(245, 245, 245);
          pdf.rect(10, yPosition - 4, 186, 6, 'F');
        }
        
        // Reset fill color for text
        pdf.setFillColor(255, 255, 255);
        
        xPosition = 12;
        
        // Sale ID
        pdf.text(sale.saleId.toString(), xPosition, yPosition);
        xPosition += columnWidths[0];
        
        // Date
        pdf.text(sale.date.substring(0, 10), xPosition, yPosition);
        xPosition += columnWidths[1];
        
        // Product Name
        pdf.text(sale.productName.substring(0, 15), xPosition, yPosition);
        xPosition += columnWidths[2];
        
        // Quantity
        pdf.text(sale.quantity.toString(), xPosition, yPosition);
        xPosition += columnWidths[3];
        
        // Selling Price
        pdf.text(sale.sellingPrice, xPosition, yPosition);
        xPosition += columnWidths[4];
        
        // Buying Price
        pdf.text(sale.buyingPrice, xPosition, yPosition);
        xPosition += columnWidths[5];
        
        // Total Price
        pdf.text(sale.totalPrice, xPosition, yPosition);
        xPosition += columnWidths[6];
        
        // Profit
        pdf.text(sale.profit, xPosition, yPosition);
        xPosition += columnWidths[7];
        
        // Margin
        pdf.text(sale.margin, xPosition, yPosition);
        xPosition += columnWidths[8];
        
        // Customer
        pdf.text(sale.customer.substring(0, 12), xPosition, yPosition);
        
        yPosition += 6;
      });
      
      // Add footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
        pdf.text('Generated by Sales Management System', 105, 290, { align: 'center' });
      }
      
      // Save PDF
      const fileName = `sales_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
      pdf.save(fileName);
      setReportLoading(false);
    }).catch(error => {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report');
      setReportLoading(false);
    });
  };

  // 🔹 NEW: Download CSV Report
  const downloadCSVReport = () => {
    setReportLoading(true);
    
    const filteredSales = getFilteredSales();
    
    // Calculate totals for filtered data
    const filteredRevenue = filteredSales.reduce((sum, s) => sum + s.totalPrice, 0);
    const filteredProfit = filteredSales.reduce((sum, s) => sum + s.profit, 0);
    const filteredCOGS = filteredSales.reduce((sum, s) => sum + s.cogs, 0);

    const reportData = {
      title: getReportTitle(),
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalSales: filteredSales.length,
        totalRevenue: filteredRevenue,
        totalProfit: filteredProfit,
        totalCOGS: filteredCOGS,
        averageProfit: filteredSales.length > 0 ? filteredProfit / filteredSales.length : 0,
        averageMargin: filteredSales.length > 0 ? filteredSales.reduce((sum, s) => sum + s.margin, 0) / filteredSales.length : 0
      },
      sales: filteredSales.map(sale => ({
        saleId: sale.saleId,
        date: sale.date || 'N/A',
        productName: sale.product?.productName || 'N/A',
        quantity: sale.quantity,
        sellingPrice: sale.sellingPrice.toFixed(2),
        buyingPrice: sale.purchasePrice.toFixed(2),
        totalPrice: sale.totalPrice.toFixed(2),
        profit: sale.profit.toFixed(2),
        margin: sale.margin.toFixed(1) + '%',
        customer: sale.customerName || 'Walk-in'
      }))
    };

    // Create CSV content
    const csvContent = createCSVContent(reportData);
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `sales_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setReportLoading(false);
  };

  // 🔹 NEW: Create CSV content from report data
  const createCSVContent = (reportData) => {
    const headers = ['Sale ID', 'Date', 'Product Name', 'Quantity', 'Selling Price', 'Buying Price', 'Total Price', 'Profit', 'Margin', 'Customer'];
    const csvRows = [];
    
    // Add header
    csvRows.push(headers.join(','));
    
    // Add data rows
    reportData.sales.forEach(sale => {
      const row = [
        sale.saleId,
        `"${sale.date}"`,
        `"${sale.productName}"`,
        sale.quantity,
        sale.sellingPrice,
        sale.buyingPrice,
        sale.totalPrice,
        sale.profit,
        sale.margin,
        `"${sale.customer}"`
      ];
      csvRows.push(row.join(','));
    });
    
    // Add summary
    csvRows.push('');
    csvRows.push('SUMMARY');
    csvRows.push(`Total Sales,${reportData.summary.totalSales}`);
    csvRows.push(`Total Revenue,Tsh${reportData.summary.totalRevenue.toFixed(2)}`);
    csvRows.push(`Total Profit,Tsh${reportData.summary.totalProfit.toFixed(2)}`);
    csvRows.push(`Total COGS,Tsh${reportData.summary.totalCOGS.toFixed(2)}`);
    csvRows.push(`Average Profit per Sale,Tsh${reportData.summary.averageProfit.toFixed(2)}`);
    csvRows.push(`Average Margin,${reportData.summary.averageMargin.toFixed(1)}%`);
    csvRows.push('');
    csvRows.push(`Report Title,${reportData.title}`);
    csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
    return csvRows.join('\n');
  };

  // 🔹 Stock & helper functions
  const getStockStatus = (product) => {
    if (!product) return "N/A";
    const stock = stocks.find(
      (s) => s.product && s.product.productId === product.productId
    );
    if (!stock) return "N/A";

    const styleMap = {
      "Sold Out": { color: "red", fontWeight: "bold" },
      "Partially Sold": { color: "orange", fontWeight: "bold" },
      "In Stock": { color: "green", fontWeight: "bold" },
    };
    const style = styleMap[stock.status] || { color: "gray" };

    return <span style={style}>{stock.status || "N/A"}</span>;
  };

  const getCurrentStockQuantity = (product) => {
    if (!product) return "N/A";
    const stock = stocks.find(
      (s) => s.product && s.product.productId === product.productId
    );
    return stock ? stock.currentStock : "N/A";
  };

  const hasPurchaseHistory = (product) => {
    if (!product) return false;
    return purchases.some((p) => p.product?.productId === product.productId);
  };

  // 🔹 NEW: Check if product has price data in products table
  const hasProductPriceData = (product) => {
    if (!product) return false;
    const productData = products.find((p) => p.productId === product.productId);
    return productData && (productData.sellingPrice > 0 || productData.latestPurchasePrice > 0);
  };

  // 🔹 Delete sale
  const deleteSale = (id) => {
    if (!window.confirm("Are you sure you want to delete this sale?")) return;

    fetch(`http://localhost:8080/api/sales/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) throw new Error("Failed to delete");
        alert("Sale deleted successfully!");
        fetchAllSales();
        fetchStocks();
      })
      .catch((err) => alert("Error deleting sale: " + err.message));
  };

  // 🔹 Edit sale
  const handleUpdateClick = (sale) => {
    setCurrentSale({ ...sale, date: sale.date || "" });
    setShowModal(true);
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setCurrentSale((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveUpdate = () => {
    if (!currentSale) return;

    const updatedSale = {
      ...currentSale,
      totalPrice:
        (parseFloat(currentSale.quantity) || 0) *
        (parseFloat(currentSale.unitPrice) || 0),
    };

    axios
      .put(`http://localhost:8080/api/sales/${currentSale.saleId}`, updatedSale)
      .then(() => {
        alert("Sale updated successfully!");
        setShowModal(false);
        fetchAllSales();
        fetchStocks();
      })
      .catch((err) => {
        alert("Error updating sale: " + err.message);
      });
  };

  // 🔹 UI4
  return (
    <>
      <Navigation />
      <div style={{ padding: "20px", marginBottom: "240px", marginTop: "10px" }}>
        <div style={{ marginTop: "40px"}}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ marginTop: "40px", marginLeft: "260px" }}>
              Sales List
            </h2>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              {/* Summary Cards */}
              <div style={{ display: "flex", gap: "15px" }}>
                <SummaryCard
                  title="Total Revenue"
                  color="#007bff"
                  bg="#e7f3ff"
                  value={`Tsh${totalRevenue.toFixed(2)}`}
                />
                <SummaryCard
                  title="Total Profit"
                  color="#28a745"
                  bg="#d4edda"
                  value={`Tsh${totalProfit.toFixed(2)}`}
                />
                <SummaryCard
                  title="Total Sales"
                  color="#856404"
                  bg="#fff3cd"
                  value={saleData.length}
                />
                <SummaryCard
                  title="COGS"
                  color="#721c24"
                  bg="#f8d7da"
                  value={`Tsh${totalCOGS.toFixed(2)}`}
                />
              </div>

              {/* 🔹 UPDATED: Report Download Section */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px',
                backgroundColor: '#f8f9fa',
                padding: '10px 15px',
                borderRadius: '8px',
                border: '1px solid #dee2e6'
              }}>
                {/* Date Selection */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
                    Select Date:
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '5px',
                      border: '1px solid #ced4da',
                      backgroundColor: 'white',
                      fontSize: '12px'
                    }}
                  />
                </div>

                {/* Report Type Selection */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
                    Report Type:
                  </label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    style={{
                      padding: '6px 10px',
                      borderRadius: '5px',
                      border: '1px solid #ced4da',
                      backgroundColor: 'white',
                      fontSize: '12px'
                    }}
                  >
                    <option value="day">Daily</option>
                    <option value="week">Weekly</option>
                    <option value="month">Monthly</option>
                  </select>
                </div>
                
                <button
                  onClick={downloadPDFReport}
                  disabled={reportLoading}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: reportLoading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    opacity: reportLoading ? 0.7 : 1
                  }}
                >
                  📄 {reportLoading ? 'Generating...' : 'PDF Report'}
                </button>

                <button
                  onClick={downloadCSVReport}
                  disabled={reportLoading}
                  style={{
                    padding: '8px 16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: reportLoading ? 'not-allowed' : 'pointer',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    opacity: reportLoading ? 0.7 : 1
                  }}
                >
                  📊 {reportLoading ? 'Generating...' : 'CSV Report'}
                </button>
              </div>

              <Link to="/add-sale">
                <button
                  style={{
                    borderRadius: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                    width: "100px",
                  }}
                >
                  Add Sale
                </button>
              </Link>
            </div>
          </div>
        </div>

        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {loading ? (
          <p>Loading...</p>
        ) : saleData.length === 0 ? (
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
              cellPadding="12"
              cellSpacing="0"
              style={{
                borderCollapse: "collapse",
                width: "100%",
                tableLayout: "auto",
                fontSize: "14px",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                  background: "#2c3e50",
                  color: "black",
                }}
              >
                <tr>
                  <th style={{ padding: "15px 10px", minWidth: "90px", fontSize: "13px" }}>Sale ID</th>
                  <th style={{ padding: "15px 10px", minWidth: "120px", fontSize: "13px" }}>Selling Date</th>
                  <th style={{ padding: "15px 10px", minWidth: "180px", fontSize: "13px" }}>Product Name</th>
                  <th style={{ padding: "15px 10px", minWidth: "90px", fontSize: "13px" }}>Qty Sold</th>
                  <th style={{ padding: "15px 10px", minWidth: "140px", fontSize: "13px" }}>Actual Selling Price/unit</th>
                  <th style={{ padding: "15px 10px", minWidth: "140px", fontSize: "13px" }}>Buying Price/unit</th>
                  <th style={{ padding: "15px 10px", minWidth: "140px", fontSize: "13px" }}>Total Actual Selling Price</th>
                  <th style={{ padding: "15px 10px", minWidth: "120px", fontSize: "13px" }}>Profit</th>
                  <th style={{ padding: "15px 10px", minWidth: "90px", fontSize: "13px" }}>Margin</th>
                  <th style={{ padding: "15px 10px", minWidth: "140px", fontSize: "13px" }}>Customer</th>
                  <th style={{ padding: "15px 10px", minWidth: "120px", fontSize: "13px" }}>Stock Status</th>
                  <th style={{ padding: "15px 10px", minWidth: "120px", fontSize: "13px" }}>Qty Left InStock</th>
                  <th style={{ padding: "15px 10px", minWidth: "140px", fontSize: "13px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {saleData.map((sale) => {
                  const hasPurchaseData = hasPurchaseHistory(sale.product);
                  const hasProductData = hasProductPriceData(sale.product);
                  const profitColor =
                    sale.profit > 0
                      ? "green"
                      : sale.profit < 0
                      ? "red"
                      : "#6c757d";
                  const marginColor =
                    sale.margin > 50
                      ? "green"
                      : sale.margin > 20
                      ? "#17a2b8"
                      : sale.margin > 0
                      ? "#ffc107"
                      : "red";

                  return (
                    <tr key={sale.saleId}>
                      <td style={{ padding: "12px 10px", textAlign: "center" }}>{sale.saleId}</td>
                      <td style={{ padding: "12px 10px" }}>{sale.date}</td>
                      <td style={{ padding: "12px 10px" }}>
                        {sale.product?.productName || "N/A"}
                        {!hasProductData && (
                          <div
                            style={{
                              fontSize: "10px",
                              color: "orange",
                              fontStyle: "italic",
                              marginTop: "4px"
                            }}
                          >
                            *Using calculated prices
                          </div>
                        )}
                        {hasProductData && !hasPurchaseData && (
                          <div
                            style={{
                              fontSize: "10px",
                              color: "green",
                              fontStyle: "italic",
                              marginTop: "4px"
                            }}
                          >
                            *Using product table prices
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "12px 10px", textAlign: "center" }}>{sale.quantity}</td>
                      <td style={{ padding: "12px 10px" }}>Tsh{sale.sellingPrice.toFixed(2)}</td>
                      <td style={{ padding: "12px 10px" }}>Tsh{sale.purchasePrice.toFixed(2)}</td>
                      <td style={{ padding: "12px 10px" }}>Tsh{sale.totalPrice.toFixed(2)}</td>
                      <td style={{ padding: "12px 10px", fontWeight: "bold", color: profitColor }}>
                        Tsh{sale.profit.toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "12px 10px",
                          fontWeight: "bold",
                          color: marginColor,
                          fontSize: "13px",
                          textAlign: "center",
                        }}
                      >
                        {sale.margin.toFixed(1)}%
                      </td>
                      <td style={{ padding: "12px 10px" }}>{sale.customerName || "Customer Name"}</td>
                      <td style={{ padding: "12px 10px" }}>{getStockStatus(sale.product)}</td>
                      <td style={{ padding: "12px 10px", textAlign: "center" }}>
                        {getCurrentStockQuantity(sale.product)}
                      </td>
                      <td style={{ padding: "12px 10px" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "10px",
                            justifyContent: "center",
                          }}
                        >
                          <button
                            onClick={() => handleUpdateClick(sale)}
                            style={buttonStyle("#007bff")}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => deleteSale(sale.saleId)}
                            style={buttonStyle("#dc3545")}
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Update Modal */}
        {showModal && currentSale && (
          <UpdateModal
            currentSale={currentSale}
            getBuyingPriceFromProduct={getBuyingPriceFromProduct}
            hasPurchaseHistory={hasPurchaseHistory}
            hasProductPriceData={hasProductPriceData}
            onSave={handleSaveUpdate}
            onChange={handleUpdateChange}
            onClose={() => setShowModal(false)}
          />
        )}
      </div>
    </>
  );
};

// 🔹 Reusable summary card
const SummaryCard = ({ title, value, color, bg }) => (
  <div
    style={{
      backgroundColor: bg,
      padding: "12px 16px",
      borderRadius: "10px",
      border: `2px solid ${color}`,
      fontWeight: "bold",
      color,
      textAlign: "center",
      minWidth: "140px"
    }}
  >
    <div style={{ fontSize: "13px", marginBottom: "5px" }}>{title}</div>
    <div style={{ fontSize: "15px" }}>{value}</div>
  </div>
);

// 🔹 Reusable button style
const buttonStyle = (bg) => ({
  background: bg,
  color: "white",
  padding: "8px 14px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontSize: "12px",
  fontWeight: "bold",
  minWidth: "70px",
});

// 🔹 UPDATED: Modal Component with product price info
const UpdateModal = ({
  currentSale,
  hasPurchaseHistory,
  hasProductPriceData,
  getBuyingPriceFromProduct,
  onSave,
  onChange,
  onClose,
}) => (
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
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        width: "450px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>
        ✏️ Update Sale
      </h3>

      <div
        style={{
          marginBottom: "15px",
          padding: "10px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <div style={{ fontWeight: "bold", color: "#495057" }}>
          Product: {currentSale.product?.productName || "N/A"}
        </div>
        <div style={{ color: "#6c757d", fontSize: "14px" }}>
          Actual Buying Price: Tsh
          {getBuyingPriceFromProduct(currentSale.product).toFixed(2)}
        </div>
        <div
          style={{
            color: hasProductPriceData(currentSale.product) 
              ? "#28a745" 
              : hasPurchaseHistory(currentSale.product)
              ? "#17a2b8"
              : "#ffc107",
            fontSize: "12px",
            fontStyle: "italic",
          }}
        >
          {hasProductPriceData(currentSale.product)
            ? "Based on product table prices"
            : hasPurchaseHistory(currentSale.product)
            ? "Based on purchase history"
            : "Estimated from current stock price"}
        </div>
      </div>

      <InputField
        label="Date"
        name="date"
        type="date"
        value={currentSale.date || ""}
        onChange={onChange}
      />
      <InputField
        label="Customer Name"
        name="customerName"
        value={currentSale.customerName || ""}
        onChange={onChange}
      />
      <InputField
        label="Quantity"
        name="quantity"
        type="number"
        value={currentSale.quantity || ""}
        onChange={onChange}
      />
      <InputField
        label="Unit Price"
        name="unitPrice"
        type="number"
        value={currentSale.unitPrice || ""}
        onChange={onChange}
      />

      <div style={{ textAlign: "center" }}>
        <button
          onClick={onSave}
          style={{
            background: "#28a745",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            marginRight: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          💾 Save
        </button>
        <button
          onClick={onClose}
          style={{
            background: "#dc3545",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ❌ Cancel
        </button>
      </div>
    </div>
  </div>
);

// 🔹 Input field reusable
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div style={{ marginBottom: "12px" }}>
    <label style={{ display: "block", marginBottom: "6px", fontWeight: "bold", fontSize: "14px" }}>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "6px",
        border: "1px solid #ccc",
        fontSize: "14px",
      }}
    />
  </div>
);

export default SaleList;

