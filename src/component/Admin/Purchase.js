
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

// 

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
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState('day');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

//   // 🔹 NEW: Filter purchases based on report type and date
//   const getFilteredPurchasesForReport = () => {
//     if (!selectedDate) return filteredPurchases;

//     const currentDate = new Date(selectedDate);
    
//     switch (reportType) {
//       case 'day':
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate.toDateString() === currentDate.toDateString();
//         });
        
//       case 'week':
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//         startOfWeek.setHours(0, 0, 0, 0);
        
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfWeek && purchaseDate <= endOfWeek;
//         });
        
//       case 'month':
//         const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfMonth && purchaseDate <= endOfMonth;
//         });
        
//       default:
//         return filteredPurchases;
//     }
//   };

//   // 🔹 NEW: Get report title based on type and date
//   const getReportTitle = () => {
//     const date = new Date(selectedDate);
//     switch (reportType) {
//       case 'day':
//         return `Daily Purchase Report - ${date.toLocaleDateString()}`;
//       case 'week':
//         const startOfWeek = new Date(date);
//         startOfWeek.setDate(date.getDate() - date.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         return `Weekly Purchase Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
//       case 'month':
//         return `Monthly Purchase Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
//       default:
//         return 'Purchase Report';
//     }
//   };

//   // 🔹 NEW: Download PDF Report
//   const downloadPDFReport = () => {
//     setReportLoading(true);
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     // Create report data
//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
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
//       pdf.text('PURCHASE REPORT', 105, yPosition, { align: 'center' });
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
//       pdf.text(`Total Purchases: ${reportData.summary.totalPurchases}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Amount: Tsh ${reportData.summary.totalAmount.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Quantity: ${reportData.summary.totalQuantity}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Price per Unit: Tsh ${reportData.summary.averagePrice.toFixed(2)}`, 20, yPosition);
//       yPosition += 15;
      
//       // Add table headers
//       pdf.setFontSize(9);
      
//       // Table headers configuration
//       const headers = ['Purchase ID', 'Date', 'Product', 'Qty', 'Buy Price', 'Sell Price', 'Total', 'Supplier'];
//       const columnWidths = [22, 22, 35, 12, 20, 20, 20, 30];
      
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
      
//       reportData.purchases.forEach((purchase, index) => {
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
        
//         // Purchase ID
//         pdf.text(purchase.purchaseId.toString(), xPosition, yPosition);
//         xPosition += columnWidths[0];
        
//         // Date
//         pdf.text(purchase.date.substring(0, 10), xPosition, yPosition);
//         xPosition += columnWidths[1];
        
//         // Product Name
//         pdf.text(purchase.productName.substring(0, 18), xPosition, yPosition);
//         xPosition += columnWidths[2];
        
//         // Quantity
//         pdf.text(purchase.quantity.toString(), xPosition, yPosition);
//         xPosition += columnWidths[3];
        
//         // Purchase Price
//         pdf.text(purchase.purchasePrice, xPosition, yPosition);
//         xPosition += columnWidths[4];
        
//         // Selling Price
//         pdf.text(purchase.sellingPrice, xPosition, yPosition);
//         xPosition += columnWidths[5];
        
//         // Total Price
//         pdf.text(purchase.totalPrice, xPosition, yPosition);
//         xPosition += columnWidths[6];
        
//         // Supplier
//         pdf.text(purchase.supplier.substring(0, 15), xPosition, yPosition);
        
//         yPosition += 6;
//       });
      
//       // Add footer
//       const pageCount = pdf.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
//         pdf.text('Generated by Purchase Management System', 105, 290, { align: 'center' });
//       }
      
//       // Save PDF
//       const fileName = `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
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
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
//       }))
//     };

//     // Create CSV content
//     const csvContent = createCSVContent(reportData);
    
//     // Create and download file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
    
//     link.setAttribute('href', url);
//     link.setAttribute('download', `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     setReportLoading(false);
//   };

//   // 🔹 NEW: Create CSV content from report data
//   const createCSVContent = (reportData) => {
//     const headers = ['Purchase ID', 'Date', 'Product Name', 'Quantity', 'Purchase Price', 'Selling Price', 'Total Price', 'Supplier'];
//     const csvRows = [];
    
//     // Add header
//     csvRows.push(headers.join(','));
    
//     // Add data rows
//     reportData.purchases.forEach(purchase => {
//       const row = [
//         purchase.purchaseId,
//         `"${purchase.date}"`,
//         `"${purchase.productName}"`,
//         purchase.quantity,
//         purchase.purchasePrice,
//         purchase.sellingPrice,
//         purchase.totalPrice,
//         `"${purchase.supplier}"`
//       ];
//       csvRows.push(row.join(','));
//     });
    
//     // Add summary
//     csvRows.push('');
//     csvRows.push('SUMMARY');
//     csvRows.push(`Total Purchases,${reportData.summary.totalPurchases}`);
//     csvRows.push(`Total Amount,Tsh${reportData.summary.totalAmount.toFixed(2)}`);
//     csvRows.push(`Total Quantity,${reportData.summary.totalQuantity}`);
//     csvRows.push(`Average Price per Unit,Tsh${reportData.summary.averagePrice.toFixed(2)}`);
//     csvRows.push('');
//     csvRows.push(`Report Title,${reportData.title}`);
//     csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
//     return csvRows.join('\n');
//   };

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
//       const { purchaseId, quantity, purchasePrice, sellingPrice, supplier } = editPurchase;
//       await axios.put(`http://localhost:8080/api/purchases/${purchaseId}`, {
//         quantity,
//         purchasePrice,
//         sellingPrice,
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

//       <div style={{ maxWidth: "1590px", marginLeft: "230px"}}>
//         <h2 style={{
//           textAlign: "center",
//           marginBottom: "10px",
//           color: "#2c3e50",
//           fontWeight: "600",
//           marginTop: "100px",
//           fontSize: "28px",
//           paddingBottom: "3px",
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

//         {/* 🔹 NEW: Report Download Section */}
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '10px',
//           backgroundColor: '#f8f9fa',
//           padding: '15px 20px',
//           borderRadius: '8px',
//           border: '1px solid #dee2e6',
//           marginBottom: '20px',
//           justifyContent: 'flex-end'
//         }}>
//           {/* Date Selection */}
//           <div>
//             <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
//               Select Date:
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={{
//                 padding: '6px 10px',
//                 borderRadius: '5px',
//                 border: '1px solid #ced4da',
//                 backgroundColor: 'white',
//                 fontSize: '12px'
//               }}
//             />
//           </div>

//           {/* Report Type Selection */}
//           <div>
//             <label style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '2px', display: 'block' }}>
//               Report Type:
//             </label>
//             <select
//               value={reportType}
//               onChange={(e) => setReportType(e.target.value)}
//               style={{
//                 padding: '6px 10px',
//                 borderRadius: '5px',
//                 border: '1px solid #ced4da',
//                 backgroundColor: 'white',
//                 fontSize: '12px'
//               }}
//             >
//               <option value="day">Daily</option>
//               <option value="week">Weekly</option>
//               <option value="month">Monthly</option>
//             </select>
//           </div>
          
//           <button
//             onClick={downloadPDFReport}
//             disabled={reportLoading}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#dc3545',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: reportLoading ? 'not-allowed' : 'pointer',
//               fontWeight: 'bold',
//               fontSize: '14px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '5px',
//               opacity: reportLoading ? 0.7 : 1
//             }}
//           >
//             📄 {reportLoading ? 'Generating...' : 'PDF Report'}
//           </button>

//           <button
//             onClick={downloadCSVReport}
//             disabled={reportLoading}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#28a745',
//               color: 'white',
//               border: 'none',
//               borderRadius: '5px',
//               cursor: reportLoading ? 'not-allowed' : 'pointer',
//               fontWeight: 'bold',
//               fontSize: '14px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '5px',
//               opacity: reportLoading ? 0.7 : 1
//             }}
//           >
//             📊 {reportLoading ? 'Generating...' : 'CSV Report'}
//           </button>
//         </div>

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

//         {/* Purchases Table */}
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
//               minWidth: "900px"
//             }}>
//               <thead>
//                 <tr style={{
//                   backgroundColor: "#f8f9fa",
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 10
//                 }}>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Product</th>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Quantity</th>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Buying Price/unit</th>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Selling Price/unit</th>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Total BuyingPrice</th>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Supplier</th>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Date</th>
//                   <th style={{ padding: "15px 12px", borderBottom: "2px solid #dee2e6", textAlign: "center", fontSize: "14px", fontWeight: "600" }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPurchases.length > 0 ? (
//                   filteredPurchases.map((purchase, index) => (
//                     <tr key={purchase.purchaseId} style={{
//                       borderBottom: "1px solid #eaeaea",
//                       backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9"
//                     }}>
//                       <td style={{ padding: "12px 12px", fontSize: "14px" }}>{purchase.product?.productName || "N/A"}</td>
//                       <td style={{ padding: "12px 12px", fontSize: "14px", textAlign: "center" }}>{purchase.quantity}</td>
//                       <td style={{ padding: "12px 12px", fontSize: "14px" }}>{purchase.purchasePrice?.toFixed(2)} Tsh</td>
//                       <td style={{ padding: "12px 12px", fontSize: "14px" }}>{purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) + " Tsh" : "N/A"}</td>
//                       <td style={{ padding: "12px 12px", fontSize: "14px" }}>
//                         {(purchase.quantity * purchase.purchasePrice)?.toFixed(2)} Tsh
//                       </td>
//                       <td style={{ padding: "12px 12px", fontSize: "14px" }}>{purchase.supplier}</td>
//                       <td style={{ padding: "12px 12px", fontSize: "14px" }}>
//                         {new Date(purchase.purchaseDate).toLocaleDateString()}
//                       </td>
//                       <td style={{ padding: "12px 12px", textAlign: "center" }}>
//                         <button
//                           onClick={() => openEditModal(purchase)}
//                           style={{
//                             marginRight: "8px",
//                             padding: "8px 14px",
//                             backgroundColor: "#3498db",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             cursor: "pointer",
//                             fontSize: "13px",
//                             fontWeight: "500"
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(purchase.purchaseId)}
//                           style={{
//                             padding: "8px 14px",
//                             backgroundColor: "#e74c3c",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             cursor: "pointer",
//                             fontSize: "13px",
//                             fontWeight: "500"
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" style={{ padding: "20px", textAlign: "center", fontSize: "14px" }}>
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
//             <label style={{ fontWeight: "500" }}>Buying Price:</label>
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
//             <label style={{ fontWeight: "500" }}>Selling Price:</label>
//             <input
//               type="number"
//               name="sellingPrice"
//               value={editPurchase.sellingPrice || ""}
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
//                   cursor: "pointer",
//                   color: "white"
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
//     endDate: "",
//   });
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState("day");
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
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

//   const filteredPurchases = purchases.filter((purchase) => {
//     return (
//       (filter.supplier === "" ||
//         purchase.supplier
//           .toLowerCase()
//           .includes(filter.supplier.toLowerCase())) &&
//       (filter.startDate === "" ||
//         new Date(purchase.purchaseDate) >= new Date(filter.startDate)) &&
//       (filter.endDate === "" ||
//         new Date(purchase.purchaseDate) <= new Date(filter.endDate))
//     );
//   });

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <Navigation />
//         <div style={styles.loadingContent}>
//           <div style={styles.loader}></div>
//           <p style={styles.loadingText}>Loading purchases...</p>
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
//     <div style={styles.pageContainer}>
//       <Navigation />

//       <div style={styles.contentWrapper}>
//         <h2 style={styles.pageTitle}>Purchase History</h2>

//         {error && (
//           <div style={styles.errorBox}>
//             <span>{error}</span>
//             <button onClick={() => setError("")} style={styles.closeError}>
//               ×
//             </button>
//           </div>
//         )}

//         {/* Report buttons */}
//         <div style={styles.reportSection}>
//           <div>
//             <label style={styles.smallLabel}>Select Date:</label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={styles.smallInput}
//             />
//           </div>

//           <div>
//             <label style={styles.smallLabel}>Report Type:</label>
//             <select
//               value={reportType}
//               onChange={(e) => setReportType(e.target.value)}
//               style={styles.smallInput}
//             >
//               <option value="day">Daily</option>
//               <option value="week">Weekly</option>
//               <option value="month">Monthly</option>
//             </select>
//           </div>

//           <button
//             onClick={() => {}}
//             disabled={reportLoading}
//             style={{
//               ...styles.button,
//               backgroundColor: "#dc3545",
//             }}
//           >
//             📄 {reportLoading ? "Generating..." : "PDF Report"}
//           </button>

//           <button
//             onClick={() => {}}
//             disabled={reportLoading}
//             style={{
//               ...styles.button,
//               backgroundColor: "#28a745",
//             }}
//           >
//             📊 {reportLoading ? "Generating..." : "CSV Report"}
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div style={styles.filterContainer}>
//           <h3 style={styles.filterTitle}>Filters</h3>

//           <div style={styles.filterGrid}>
//             <div>
//               <label style={styles.label}>Supplier:</label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={filter.supplier}
//                 onChange={(e) =>
//                   setFilter({ ...filter, supplier: e.target.value })
//                 }
//                 placeholder="Filter by supplier"
//                 style={styles.input}
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Start Date:</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={filter.startDate}
//                 onChange={(e) =>
//                   setFilter({ ...filter, startDate: e.target.value })
//                 }
//                 style={styles.input}
//               />
//             </div>

//             <div>
//               <label style={styles.label}>End Date:</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={filter.endDate}
//                 onChange={(e) =>
//                   setFilter({ ...filter, endDate: e.target.value })
//                 }
//                 style={styles.input}
//               />
//             </div>

//             <div>
//               <button onClick={() => {}} style={styles.clearButton}>
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div style={styles.tableContainer}>
//           <div style={{ maxHeight: "480px", overflowY: "auto" }}>
//             <table style={styles.table}>
//               <thead>
//                 <tr style={styles.tableHeadRow}>
//                   {[
//                     "Product",
//                     "Quantity",
//                     "Buying Price/unit",
//                     "Selling Price/unit",
//                     "Total Buying Price",
//                     "Supplier",
//                     "Date",
//                     "Actions",
//                   ].map((head) => (
//                     <th key={head} style={styles.th}>
//                       {head}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPurchases.map((purchase, i) => (
//                   <tr
//                     key={purchase.purchaseId}
//                     style={{
//                       ...styles.tr,
//                       backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
//                     }}
//                   >
//                     <td style={styles.td}>
//                       {purchase.product?.productName || "N/A"}
//                     </td>
//                     <td style={styles.tdCenter}>{purchase.quantity}</td>
//                     <td style={styles.td}>Tsh {purchase.purchasePrice}</td>
//                     <td style={styles.td}>
//                       Tsh {purchase.sellingPrice || "N/A"}
//                     </td>
//                     <td style={styles.td}>
//                       Tsh {purchase.quantity * purchase.purchasePrice}
//                     </td>
//                     <td style={styles.td}>{purchase.supplier}</td>
//                     <td style={styles.td}>
//                       {purchase.purchaseDate?.substring(0, 10)}
//                     </td>
//                     <td style={styles.tdCenter}>
//                       <button style={styles.actionBtn}>✏️</button>
//                       <button style={{ ...styles.actionBtn, color: "red" }}>
//                         🗑
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     padding: "20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     minHeight: "100vh",
//     backgroundColor: "#f4f6f9",
//   },
//   contentWrapper: {
//     maxWidth: "1580px",
//     marginLeft: "230px",
//   },
//   pageTitle: {
//     textAlign: "center",
//     marginBottom: "15px",
//     color: "#2c3e50",
//     fontWeight: "700",
//     marginTop: "90px",
//     fontSize: "28px",
//     borderBottom: "3px solid #eaeaea",
//     paddingBottom: "8px",
//   },
//   reportSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     justifyContent: "flex-end",
//     backgroundColor: "#fff",
//     padding: "15px 20px",
//     borderRadius: "10px",
//     border: "1px solid #dee2e6",
//     marginBottom: "25px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   },
//   smallInput: {
//     padding: "7px 10px",
//     borderRadius: "6px",
//     border: "1px solid #ced4da",
//     fontSize: "13px",
//     backgroundColor: "#fff",
//   },
//   smallLabel: {
//     fontSize: "12px",
//     fontWeight: "bold",
//     marginBottom: "3px",
//     display: "block",
//   },
//   button: {
//     padding: "8px 18px",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "0.2s ease-in-out",
//   },
//   filterContainer: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     marginBottom: "40px",
//     border: "1px solid #e0e0e0",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   },
//   filterTitle: {
//     marginBottom: "15px",
//     color: "#2c3e50",
//     fontSize: "19px",
//     fontWeight: "600",
//   },
//   filterGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//     gap: "20px",
//     alignItems: "end",
//   },
//   label: {
//     display: "block",
//     fontWeight: "500",
//     marginBottom: "8px",
//     color: "#495057",
//   },
//   input: {
//     padding: "10px 12px",
//     borderRadius: "6px",
//     border: "1px solid #ced4da",
//     width: "100%",
//     fontSize: "15px",
//   },
//   clearButton: {
//     padding: "10px 18px",
//     backgroundColor: "#6c757d",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "500",
//     width: "100%",
//     transition: "0.2s ease",
//   },
//   tableContainer: {
//     backgroundColor: "white",
//     borderRadius: "10px",
//     overflow: "hidden",
//     border: "1px solid #e0e0e0",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//     minWidth: "950px",
//   },
//   th: {
//     padding: "14px 10px",
//     borderBottom: "2px solid #dee2e6",
//     backgroundColor: "#f1f3f5",
//     textAlign: "center",
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#495057",
//   },
//   tr: {
//     borderBottom: "1px solid #eaeaea",
//   },
//   td: {
//     padding: "12px",
//     fontSize: "14px",
//     color: "#333",
//   },
//   tdCenter: {
//     textAlign: "center",
//     padding: "12px",
//     fontSize: "14px",
//   },
//   actionBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     margin: "0 6px",
//     fontSize: "17px",
//   },
//   errorBox: {
//     color: "#721c24",
//     backgroundColor: "#f8d7da",
//     border: "1px solid #f5c6cb",
//     padding: "12px",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   closeError: {
//     background: "none",
//     border: "none",
//     fontSize: "20px",
//     color: "#721c24",
//     cursor: "pointer",
//   },
//   loadingContainer: {
//     backgroundColor: "#f8f9fa",
//     padding: "20px",
//     minHeight: "100vh",
//   },
//   loadingContent: {
//     textAlign: "center",
//     marginTop: "80px",
//   },
//   loader: {
//     display: "inline-block",
//     width: "55px",
//     height: "55px",
//     border: "5px solid #f3f3f3",
//     borderTop: "5px solid #007bff",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   },
//   loadingText: {
//     color: "#6c757d",
//     fontSize: "18px",
//     marginTop: "10px",
//   },
// };

// export default Purchase;

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
//     endDate: "",
//   });
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState("day");
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );

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

//   const filteredPurchases = purchases.filter((purchase) => {
//     return (
//       (filter.supplier === "" ||
//         purchase.supplier
//           .toLowerCase()
//           .includes(filter.supplier.toLowerCase())) &&
//       (filter.startDate === "" ||
//         new Date(purchase.purchaseDate) >= new Date(filter.startDate)) &&
//       (filter.endDate === "" ||
//         new Date(purchase.purchaseDate) <= new Date(filter.endDate))
//     );
//   });

//   if (loading) {
//     return (
//       <div style={styles.loadingContainer}>
//         <Navigation />
//         <div style={styles.loadingContent}>
//           <div style={styles.loader}></div>
//           <p style={styles.loadingText}>Loading purchases...</p>
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
//     <div style={styles.pageContainer}>
//       <Navigation />
//       <div style={styles.contentWrapper}>
//         <h2 style={styles.pageTitle}>Purchase History</h2>

//         {error && (
//           <div style={styles.errorBox}>
//             <span>{error}</span>
//             <button onClick={() => setError("")} style={styles.closeError}>
//               ×
//             </button>
//           </div>
//         )}

//         {/* Report buttons */}
//         <div style={styles.reportSection}>
//           <div>
//             <label style={styles.smallLabel}>Select Date:</label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={styles.smallInput}
//             />
//           </div>

//           <div>
//             <label style={styles.smallLabel}>Report Type:</label>
//             <select
//               value={reportType}
//               onChange={(e) => setReportType(e.target.value)}
//               style={styles.smallInput}
//             >
//               <option value="day">Daily</option>
//               <option value="week">Weekly</option>
//               <option value="month">Monthly</option>
//             </select>
//           </div>

//           <button
//             style={{ ...styles.button, backgroundColor: "#dc3545" }}
//             disabled={reportLoading}
//           >
//             📄 {reportLoading ? "Generating..." : "PDF Report"}
//           </button>

//           <button
//             style={{ ...styles.button, backgroundColor: "#28a745" }}
//             disabled={reportLoading}
//           >
//             📊 {reportLoading ? "Generating..." : "CSV Report"}
//           </button>
//         </div>

//         {/* Filter Section */}
//         <div style={styles.filterContainer}>
//           <h3 style={styles.filterTitle}>Filters</h3>

//           <div style={styles.filterGrid}>
//             <div>
//               <label style={styles.label}>Supplier:</label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={filter.supplier}
//                 onChange={(e) =>
//                   setFilter({ ...filter, supplier: e.target.value })
//                 }
//                 placeholder="Filter by supplier"
//                 style={styles.input}
//               />
//             </div>

//             <div>
//               <label style={styles.label}>Start Date:</label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={filter.startDate}
//                 onChange={(e) =>
//                   setFilter({ ...filter, startDate: e.target.value })
//                 }
//                 style={styles.input}
//               />
//             </div>

//             <div>
//               <label style={styles.label}>End Date:</label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={filter.endDate}
//                 onChange={(e) =>
//                   setFilter({ ...filter, endDate: e.target.value })
//                 }
//                 style={styles.input}
//               />
//             </div>

//             <div>
//               <button onClick={() => setFilter({ supplier: "", startDate: "", endDate: "" })} style={styles.clearButton}>
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Table */}
//         <div style={styles.tableContainer}>
//           <div style={styles.tableScroll}>
//             <table style={styles.table}>
//               <thead style={styles.tableHead}>
//                 <tr>
//                   {[
//                     "Product",
//                     "Quantity",
//                     "Buying Price/unit",
//                     "Selling Price/unit",
//                     "Total Buying Price",
//                     "Supplier",
//                     "Date",
//                     "Actions",
//                   ].map((head) => (
//                     <th key={head} style={styles.th}>
//                       {head}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPurchases.map((purchase, i) => (
//                   <tr
//                     key={purchase.purchaseId}
//                     style={{
//                       ...styles.tr,
//                       backgroundColor: i % 2 === 0 ? "#fff" : "#f9f9f9",
//                     }}
//                   >
//                     <td style={styles.td}>
//                       {purchase.product?.productName || "N/A"}
//                     </td>
//                     <td style={styles.tdCenter}>{purchase.quantity}</td>
//                     <td style={styles.td}>Tsh {purchase.purchasePrice}</td>
//                     <td style={styles.td}>
//                       Tsh {purchase.sellingPrice || "N/A"}
//                     </td>
//                     <td style={styles.td}>
//                       Tsh {purchase.quantity * purchase.purchasePrice}
//                     </td>
//                     <td style={styles.td}>{purchase.supplier}</td>
//                     <td style={styles.td}>
//                       {purchase.purchaseDate?.substring(0, 10)}
//                     </td>
//                     <td style={styles.tdCenter}>
//                       <button style={styles.actionBtn}>✏️</button>
//                       <button style={{ ...styles.actionBtn, color: "red" }}>
//                         🗑
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     padding: "20px",
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     minHeight: "100vh",
//     backgroundColor: "#f4f6f9",
//   },
//   contentWrapper: {
//     maxWidth: "1580px",
//     marginLeft: "230px",
//   },
//   pageTitle: {
//     textAlign: "center",
//     marginBottom: "15px",
//     color: "#2c3e50",
//     fontWeight: "700",
//     marginTop: "90px",
//     fontSize: "28px",
//     borderBottom: "3px solid #eaeaea",
//     paddingBottom: "8px",
//   },
//   reportSection: {
//     display: "flex",
//     alignItems: "center",
//     gap: "15px",
//     justifyContent: "flex-end",
//     backgroundColor: "#fff",
//     padding: "15px 20px",
//     borderRadius: "10px",
//     border: "1px solid #dee2e6",
//     marginBottom: "25px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   },
//   smallInput: {
//     padding: "7px 10px",
//     borderRadius: "6px",
//     border: "1px solid #ced4da",
//     fontSize: "13px",
//     backgroundColor: "#fff",
//   },
//   smallLabel: {
//     fontSize: "12px",
//     fontWeight: "bold",
//     marginBottom: "3px",
//     display: "block",
//   },
//   button: {
//     padding: "8px 18px",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     fontWeight: "600",
//     cursor: "pointer",
//     transition: "0.2s ease-in-out",
//   },
//   filterContainer: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     marginBottom: "40px",
//     border: "1px solid #e0e0e0",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   },
//   filterTitle: {
//     marginBottom: "15px",
//     color: "#2c3e50",
//     fontSize: "19px",
//     fontWeight: "600",
//   },
//   filterGrid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
//     gap: "20px",
//     alignItems: "end",
//   },
//   label: {
//     display: "block",
//     fontWeight: "500",
//     marginBottom: "8px",
//     color: "#495057",
//   },
//   input: {
//     padding: "10px 12px",
//     borderRadius: "6px",
//     border: "1px solid #ced4da",
//     width: "100%",
//     fontSize: "15px",
//   },
//   clearButton: {
//     padding: "10px 18px",
//     backgroundColor: "#6c757d",
//     color: "white",
//     border: "none",
//     borderRadius: "6px",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "500",
//     width: "100%",
//     transition: "0.2s ease",
//   },
//   tableContainer: {
//     backgroundColor: "white",
//     borderRadius: "10px",
//     border: "1px solid #e0e0e0",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//   },
//   tableScroll: {
//     maxHeight: "480px",
//     overflowY: "auto",
//     overflowX: "hidden",
//   },
//   table: {
//     width: "100%",
//     borderCollapse: "collapse",
//   },
//   tableHead: {
//     position: "sticky",
//     top: "0",
//     backgroundColor: "#f1f3f5",
//     zIndex: 2,
//   },
//   th: {
//     padding: "14px 10px",
//     borderBottom: "2px solid #dee2e6",
//     textAlign: "center",
//     fontSize: "14px",
//     fontWeight: "600",
//     color: "#495057",
//   },
//   tr: {
//     borderBottom: "1px solid #eaeaea",
//   },
//   td: {
//     padding: "12px",
//     fontSize: "14px",
//     color: "#333",
//   },
//   tdCenter: {
//     textAlign: "center",
//     padding: "12px",
//     fontSize: "14px",
//   },
//   actionBtn: {
//     background: "none",
//     border: "none",
//     cursor: "pointer",
//     margin: "0 6px",
//     fontSize: "17px",
//   },
//   errorBox: {
//     color: "#721c24",
//     backgroundColor: "#f8d7da",
//     border: "1px solid #f5c6cb",
//     padding: "12px",
//     borderRadius: "6px",
//     marginBottom: "20px",
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   closeError: {
//     background: "none",
//     border: "none",
//     fontSize: "20px",
//     color: "#721c24",
//     cursor: "pointer",
//   },
//   loadingContainer: {
//     backgroundColor: "#f8f9fa",
//     padding: "20px",
//     minHeight: "100vh",
//   },
//   loadingContent: {
//     textAlign: "center",
//     marginTop: "80px",
//   },
//   loader: {
//     display: "inline-block",
//     width: "55px",
//     height: "55px",
//     border: "5px solid #f3f3f3",
//     borderTop: "5px solid #007bff",
//     borderRadius: "50%",
//     animation: "spin 1s linear infinite",
//   },
//   loadingText: {
//     color: "#6c757d",
//     fontSize: "18px",
//     marginTop: "10px",
//   },
// };

// export default Purchase;

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
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState('day');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

//   // 🔹 NEW: Filter purchases based on report type and date
//   const getFilteredPurchasesForReport = () => {
//     if (!selectedDate) return filteredPurchases;

//     const currentDate = new Date(selectedDate);
    
//     switch (reportType) {
//       case 'day':
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate.toDateString() === currentDate.toDateString();
//         });
        
//       case 'week':
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//         startOfWeek.setHours(0, 0, 0, 0);
        
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfWeek && purchaseDate <= endOfWeek;
//         });
        
//       case 'month':
//         const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfMonth && purchaseDate <= endOfMonth;
//         });
        
//       default:
//         return filteredPurchases;
//     }
//   };

//   // 🔹 NEW: Get report title based on type and date
//   const getReportTitle = () => {
//     const date = new Date(selectedDate);
//     switch (reportType) {
//       case 'day':
//         return `Daily Purchase Report - ${date.toLocaleDateString()}`;
//       case 'week':
//         const startOfWeek = new Date(date);
//         startOfWeek.setDate(date.getDate() - date.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         return `Weekly Purchase Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
//       case 'month':
//         return `Monthly Purchase Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
//       default:
//         return 'Purchase Report';
//     }
//   };

//   // 🔹 NEW: Download PDF Report
//   const downloadPDFReport = () => {
//     setReportLoading(true);
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     // Create report data
//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
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
//       pdf.text('PURCHASE REPORT', 105, yPosition, { align: 'center' });
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
//       pdf.text(`Total Purchases: ${reportData.summary.totalPurchases}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Amount: Tsh ${reportData.summary.totalAmount.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Quantity: ${reportData.summary.totalQuantity}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Price per Unit: Tsh ${reportData.summary.averagePrice.toFixed(2)}`, 20, yPosition);
//       yPosition += 15;
      
//       // Add table headers
//       pdf.setFontSize(9);
      
//       // Table headers configuration
//       const headers = ['Purchase ID', 'Date', 'Product', 'Qty', 'Buy Price', 'Sell Price', 'Total', 'Supplier'];
//       const columnWidths = [22, 22, 35, 12, 20, 20, 20, 30];
      
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
      
//       reportData.purchases.forEach((purchase, index) => {
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
        
//         // Purchase ID
//         pdf.text(purchase.purchaseId.toString(), xPosition, yPosition);
//         xPosition += columnWidths[0];
        
//         // Date
//         pdf.text(purchase.date.substring(0, 10), xPosition, yPosition);
//         xPosition += columnWidths[1];
        
//         // Product Name
//         pdf.text(purchase.productName.substring(0, 18), xPosition, yPosition);
//         xPosition += columnWidths[2];
        
//         // Quantity
//         pdf.text(purchase.quantity.toString(), xPosition, yPosition);
//         xPosition += columnWidths[3];
        
//         // Purchase Price
//         pdf.text(purchase.purchasePrice, xPosition, yPosition);
//         xPosition += columnWidths[4];
        
//         // Selling Price
//         pdf.text(purchase.sellingPrice, xPosition, yPosition);
//         xPosition += columnWidths[5];
        
//         // Total Price
//         pdf.text(purchase.totalPrice, xPosition, yPosition);
//         xPosition += columnWidths[6];
        
//         // Supplier
//         pdf.text(purchase.supplier.substring(0, 15), xPosition, yPosition);
        
//         yPosition += 6;
//       });
      
//       // Add footer
//       const pageCount = pdf.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
//         pdf.text('Generated by Purchase Management System', 105, 290, { align: 'center' });
//       }
      
//       // Save PDF
//       const fileName = `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
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
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
//       }))
//     };

//     // Create CSV content
//     const csvContent = createCSVContent(reportData);
    
//     // Create and download file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
    
//     link.setAttribute('href', url);
//     link.setAttribute('download', `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     setReportLoading(false);
//   };

//   // 🔹 NEW: Create CSV content from report data
//   const createCSVContent = (reportData) => {
//     const headers = ['Purchase ID', 'Date', 'Product Name', 'Quantity', 'Purchase Price', 'Selling Price', 'Total Price', 'Supplier'];
//     const csvRows = [];
    
//     // Add header
//     csvRows.push(headers.join(','));
    
//     // Add data rows
//     reportData.purchases.forEach(purchase => {
//       const row = [
//         purchase.purchaseId,
//         `"${purchase.date}"`,
//         `"${purchase.productName}"`,
//         purchase.quantity,
//         purchase.purchasePrice,
//         purchase.sellingPrice,
//         purchase.totalPrice,
//         `"${purchase.supplier}"`
//       ];
//       csvRows.push(row.join(','));
//     });
    
//     // Add summary
//     csvRows.push('');
//     csvRows.push('SUMMARY');
//     csvRows.push(`Total Purchases,${reportData.summary.totalPurchases}`);
//     csvRows.push(`Total Amount,Tsh${reportData.summary.totalAmount.toFixed(2)}`);
//     csvRows.push(`Total Quantity,${reportData.summary.totalQuantity}`);
//     csvRows.push(`Average Price per Unit,Tsh${reportData.summary.averagePrice.toFixed(2)}`);
//     csvRows.push('');
//     csvRows.push(`Report Title,${reportData.title}`);
//     csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
//     return csvRows.join('\n');
//   };

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
//       const { purchaseId, quantity, purchasePrice, sellingPrice, supplier } = editPurchase;
//       await axios.put(`http://localhost:8080/api/purchases/${purchaseId}`, {
//         quantity,
//         purchasePrice,
//         sellingPrice,
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
//         fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         minHeight: "100vh",
//         backgroundColor: "#f8fafc",
//       }}>
//         <Navigation />
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//           <div style={{
//             display: "inline-block",
//             width: "50px",
//             height: "50px",
//             border: "4px solid rgba(59, 130, 246, 0.2)",
//             borderTop: "4px solid #3b82f6",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             marginBottom: "20px"
//           }}></div>
//           <p style={{ 
//             color: "#64748b", 
//             fontSize: "16px",
//             fontWeight: "500"
//           }}>Loading purchases...</p>
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
//       padding: "15px 20px",
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       minHeight: "100vh",
//       backgroundColor: "#f8fafc",
//     }}>
//       <Navigation />

//       <div style={{ 
//         maxWidth: "1590px", 
//         marginLeft: "230px",
//         padding: "0 15px"
//       }}>
//         {/* Header Section - Compact */}
//         <div style={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           borderRadius: "12px",
//           padding: "20px 25px",
//           marginBottom: "20px",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//           marginTop: "60px"
//         }}>
//           <h2 style={{
//             margin: "0",
//             fontSize: "24px",
//             fontWeight: "700",
//             marginBottom: "4px",
//           }}>
//             Purchase History
//           </h2>
//           <p style={{
//             margin: "0",
//             fontSize: "14px",
//             opacity: "0.9",
//             fontWeight: "400",
//           }}>
//             Manage and track all your purchase records
//           </p>
//         </div>

//         {error && (
//           <div style={{
//             color: "#721c24",
//             backgroundColor: "#fee2e2",
//             border: "1px solid #fecaca",
//             padding: "12px 16px",
//             borderRadius: "8px",
//             marginBottom: "20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <span style={{ fontWeight: "500" }}>{error}</span>
//             </div>
//             <button
//               onClick={() => setError("")}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#721c24",
//                 fontSize: "18px",
//                 cursor: "pointer",
//                 padding: "2px",
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Report Download Section - Compact */}
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '12px',
//           backgroundColor: 'white',
//           padding: '16px 20px',
//           borderRadius: "12px",
//           border: '1px solid #e2e8f0',
//           marginBottom: '20px',
//           justifyContent: 'flex-end',
//           boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
//         }}>
//           {/* Date Selection */}
//           <div>
//             <label style={{ 
//               fontSize: '12px', 
//               fontWeight: '600', 
//               marginBottom: '4px', 
//               display: 'block',
//               color: '#374151'
//             }}>
//               Date:
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={{
//                 padding: '6px 10px',
//                 borderRadius: '6px',
//                 border: '1px solid #d1d5db',
//                 backgroundColor: 'white',
//                 fontSize: '12px',
//                 fontWeight: '500',
//                 width: '140px'
//               }}
//             />
//           </div>

//           {/* Report Type Selection */}
//           <div>
//             <label style={{ 
//               fontSize: '12px', 
//               fontWeight: '600', 
//               marginBottom: '4px', 
//               display: 'block',
//               color: '#374151'
//             }}>
//               Type:
//             </label>
//             <select
//               value={reportType}
//               onChange={(e) => setReportType(e.target.value)}
//               style={{
//                 padding: '6px 10px',
//                 borderRadius: '6px',
//                 border: '1px solid #d1d5db',
//                 backgroundColor: 'white',
//                 fontSize: '12px',
//                 fontWeight: '500',
//                 width: '120px'
//               }}
//             >
//               <option value="day">Daily</option>
//               <option value="week">Weekly</option>
//               <option value="month">Monthly</option>
//             </select>
//           </div>
          
//           <button
//             onClick={downloadPDFReport}
//             disabled={reportLoading}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#dc2626',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: reportLoading ? 'not-allowed' : 'pointer',
//               fontWeight: '600',
//               fontSize: '13px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px',
//               opacity: reportLoading ? 0.7 : 1,
//             }}
//           >
//             📄 {reportLoading ? 'Generating...' : 'PDF'}
//           </button>

//           <button
//             onClick={downloadCSVReport}
//             disabled={reportLoading}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#059669',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: reportLoading ? 'not-allowed' : 'pointer',
//               fontWeight: '600',
//               fontSize: '13px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px',
//               opacity: reportLoading ? 0.7 : 1,
//             }}
//           >
//             📊 {reportLoading ? 'Generating...' : 'CSV'}
//           </button>
//         </div>

//         {/* Filter Section - Compact */}
//         <div style={{
//           backgroundColor: "white",
//           padding: "18px 20px",
//           borderRadius: "12px",
//           marginBottom: "20px",
//           boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
//           border: "1px solid #e2e8f0"
//         }}>
//           <h3 style={{
//             margin: "0 0 15px 0",
//             color: "#1f2937",
//             fontSize: "16px",
//             fontWeight: "600",
//           }}>
//             Filters
//           </h3>

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             gap: "15px",
//             alignItems: "end"
//           }}>
//             <div>
//               <label style={{ 
//                 display: "block", 
//                 fontWeight: "600", 
//                 marginBottom: "6px", 
//                 color: "#374151",
//                 fontSize: "13px"
//               }}>
//                 Supplier:
//               </label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={filter.supplier}
//                 onChange={handleFilterChange}
//                 placeholder="Filter by supplier..."
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   width: "100%",
//                   fontSize: "14px",
//                   backgroundColor: "#fafafa"
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{ 
//                 display: "block", 
//                 fontWeight: "600", 
//                 marginBottom: "6px", 
//                 color: "#374151",
//                 fontSize: "13px"
//               }}>
//                 Start Date:
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={filter.startDate}
//                 onChange={handleFilterChange}
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   width: "100%",
//                   fontSize: "14px",
//                   backgroundColor: "#fafafa"
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{ 
//                 display: "block", 
//                 fontWeight: "600", 
//                 marginBottom: "6px", 
//                 color: "#374151",
//                 fontSize: "13px"
//               }}>
//                 End Date:
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={filter.endDate}
//                 onChange={handleFilterChange}
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   width: "100%",
//                   fontSize: "14px",
//                   backgroundColor: "#fafafa"
//                 }}
//               />
//             </div>

//             <div>
//               <button
//                 onClick={clearFilters}
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#6b7280",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   width: "100%",
//                 }}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Purchases Table - Compact */}
//         <div style={{
//           backgroundColor: "white",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
//           border: "1px solid #e2e8f0",
//           marginBottom: "20px"
//         }}>
//           <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//             <table style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               minWidth: "900px"
//             }}>
//               <thead>
//                 <tr style={{
//                   backgroundColor: "#f8fafc",
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 10,
//                   borderBottom: "2px solid #e2e8f0"
//                 }}>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Product</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Qty</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Buy Price</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Sell Price</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Total</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Supplier</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Date</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPurchases.length > 0 ? (
//                   filteredPurchases.map((purchase, index) => (
//                     <tr key={purchase.purchaseId} style={{
//                       borderBottom: "1px solid #f1f5f9",
//                       backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
//                     }}>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#1f2937"
//                       }}>{purchase.product?.productName || "N/A"}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px", 
//                         textAlign: "center",
//                         fontWeight: "600",
//                         color: "#059669"
//                       }}>{purchase.quantity}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#dc2626"
//                       }}>{purchase.purchasePrice?.toFixed(2)} Tsh</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#059669"
//                       }}>{purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) + " Tsh" : "N/A"}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "600",
//                         color: "#1f2937"
//                       }}>
//                         {(purchase.quantity * purchase.purchasePrice)?.toFixed(2)} Tsh
//                       </td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#6b7280"
//                       }}>{purchase.supplier}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#6b7280"
//                       }}>
//                         {new Date(purchase.purchaseDate).toLocaleDateString()}
//                       </td>
//                       <td style={{ 
//                         padding: "12px", 
//                         textAlign: "center",
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "6px"
//                       }}>
//                         <button
//                           onClick={() => openEditModal(purchase)}
//                           style={{
//                             padding: "6px 12px",
//                             backgroundColor: "#3b82f6",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             cursor: "pointer",
//                             fontSize: "12px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(purchase.purchaseId)}
//                           style={{
//                             padding: "6px 12px",
//                             backgroundColor: "#dc2626",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             cursor: "pointer",
//                             fontSize: "12px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" style={{ 
//                       padding: "30px", 
//                       textAlign: "center", 
//                       fontSize: "14px",
//                       color: "#6b7280",
//                       fontWeight: "500"
//                     }}>
//                       <div style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         gap: "8px"
//                       }}>
//                         <span style={{ fontSize: "32px" }}>📦</span>
//                         <div>No purchases found</div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Summary - Compact */}
//         {filteredPurchases.length > 0 && (
//           <div style={{
//             padding: "15px 20px",
//             backgroundColor: "white",
//             borderRadius: "12px",
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//             gap: "15px",
//             fontWeight: "600",
//             fontSize: "14px",
//             color: "#1f2937",
//             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
//             border: "1px solid #e2e8f0"
//           }}>
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px"
//             }}>
//               <span style={{
//                 padding: "4px 10px",
//                 backgroundColor: "#3b82f6",
//                 color: "white",
//                 borderRadius: "16px",
//                 fontSize: "12px"
//               }}>
//                 {filteredPurchases.length}
//               </span>
//               Total Purchases
//             </div>
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               gap: "8px"
//             }}>
//               <span style={{
//                 padding: "4px 10px",
//                 backgroundColor: "#059669",
//                 color: "white",
//                 borderRadius: "16px",
//                 fontSize: "12px"
//               }}>
//                 TSH {filteredPurchases
//                   .reduce((sum, purchase) => sum + (purchase.quantity * purchase.purchasePrice), 0)
//                   .toFixed(2)}
//               </span>
//               Total Amount
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Edit Modal - Compact */}
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
//           zIndex: 9999,
//         }}>
//           <div style={{
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "12px",
//             width: "400px",
//             position: "relative",
//             boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
//           }}>
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               marginBottom: "15px"
//             }}>
//               <h3 style={{ 
//                 margin: 0, 
//                 color: "#1f2937", 
//                 fontSize: "18px",
//                 fontWeight: "600"
//               }}>
//                 Edit Purchase
//               </h3>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   color: "#6b7280",
//                   fontSize: "20px",
//                   cursor: "pointer",
//                 }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <div style={{ marginBottom: "12px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Quantity:
//               </label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={editPurchase.quantity}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "12px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Buying Price:
//               </label>
//               <input
//                 type="number"
//                 name="purchasePrice"
//                 value={editPurchase.purchasePrice}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "12px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Selling Price:
//               </label>
//               <input
//                 type="number"
//                 name="sellingPrice"
//                 value={editPurchase.sellingPrice || ""}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "20px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Supplier:
//               </label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={editPurchase.supplier}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   padding: "8px 16px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   backgroundColor: "white",
//                   color: "#374151",
//                   cursor: "pointer",
//                   fontWeight: "600",
//                   fontSize: "13px",
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 style={{
//                   padding: "8px 16px",
//                   borderRadius: "6px",
//                   border: "none",
//                   backgroundColor: "#059669",
//                   color: "white",
//                   cursor: "pointer",
//                   fontWeight: "600",
//                   fontSize: "13px",
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
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState('day');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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

//   // Calculate totals
//   const totalPurchases = filteredPurchases.length;
//   const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//     sum + (purchase.quantity * purchase.purchasePrice), 0
//   );

//   // 🔹 NEW: Filter purchases based on report type and date
//   const getFilteredPurchasesForReport = () => {
//     if (!selectedDate) return filteredPurchases;

//     const currentDate = new Date(selectedDate);
    
//     switch (reportType) {
//       case 'day':
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate.toDateString() === currentDate.toDateString();
//         });
        
//       case 'week':
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//         startOfWeek.setHours(0, 0, 0, 0);
        
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfWeek && purchaseDate <= endOfWeek;
//         });
        
//       case 'month':
//         const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfMonth && purchaseDate <= endOfMonth;
//         });
        
//       default:
//         return filteredPurchases;
//     }
//   };

//   // 🔹 NEW: Get report title based on type and date
//   const getReportTitle = () => {
//     const date = new Date(selectedDate);
//     switch (reportType) {
//       case 'day':
//         return `Daily Purchase Report - ${date.toLocaleDateString()}`;
//       case 'week':
//         const startOfWeek = new Date(date);
//         startOfWeek.setDate(date.getDate() - date.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         return `Weekly Purchase Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
//       case 'month':
//         return `Monthly Purchase Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
//       default:
//         return 'Purchase Report';
//     }
//   };

//   // 🔹 NEW: Download PDF Report
//   const downloadPDFReport = () => {
//     setReportLoading(true);
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     // Create report data
//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
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
//       pdf.text('PURCHASE REPORT', 105, yPosition, { align: 'center' });
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
//       pdf.text(`Total Purchases: ${reportData.summary.totalPurchases}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Amount: Tsh ${reportData.summary.totalAmount.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Quantity: ${reportData.summary.totalQuantity}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Price per Unit: Tsh ${reportData.summary.averagePrice.toFixed(2)}`, 20, yPosition);
//       yPosition += 15;
      
//       // Add table headers
//       pdf.setFontSize(9);
      
//       // Table headers configuration
//       const headers = ['Purchase ID', 'Date', 'Product', 'Qty', 'Buy Price', 'Sell Price', 'Total', 'Supplier'];
//       const columnWidths = [22, 22, 35, 12, 20, 20, 20, 30];
      
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
      
//       reportData.purchases.forEach((purchase, index) => {
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
        
//         // Purchase ID
//         pdf.text(purchase.purchaseId.toString(), xPosition, yPosition);
//         xPosition += columnWidths[0];
        
//         // Date
//         pdf.text(purchase.date.substring(0, 10), xPosition, yPosition);
//         xPosition += columnWidths[1];
        
//         // Product Name
//         pdf.text(purchase.productName.substring(0, 18), xPosition, yPosition);
//         xPosition += columnWidths[2];
        
//         // Quantity
//         pdf.text(purchase.quantity.toString(), xPosition, yPosition);
//         xPosition += columnWidths[3];
        
//         // Purchase Price
//         pdf.text(purchase.purchasePrice, xPosition, yPosition);
//         xPosition += columnWidths[4];
        
//         // Selling Price
//         pdf.text(purchase.sellingPrice, xPosition, yPosition);
//         xPosition += columnWidths[5];
        
//         // Total Price
//         pdf.text(purchase.totalPrice, xPosition, yPosition);
//         xPosition += columnWidths[6];
        
//         // Supplier
//         pdf.text(purchase.supplier.substring(0, 15), xPosition, yPosition);
        
//         yPosition += 6;
//       });
      
//       // Add footer
//       const pageCount = pdf.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
//         pdf.text('Generated by Purchase Management System', 105, 290, { align: 'center' });
//       }
      
//       // Save PDF
//       const fileName = `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
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
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
//       }))
//     };

//     // Create CSV content
//     const csvContent = createCSVContent(reportData);
    
//     // Create and download file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
    
//     link.setAttribute('href', url);
//     link.setAttribute('download', `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     setReportLoading(false);
//   };

//   // 🔹 NEW: Create CSV content from report data
//   const createCSVContent = (reportData) => {
//     const headers = ['Purchase ID', 'Date', 'Product Name', 'Quantity', 'Purchase Price', 'Selling Price', 'Total Price', 'Supplier'];
//     const csvRows = [];
    
//     // Add header
//     csvRows.push(headers.join(','));
    
//     // Add data rows
//     reportData.purchases.forEach(purchase => {
//       const row = [
//         purchase.purchaseId,
//         `"${purchase.date}"`,
//         `"${purchase.productName}"`,
//         purchase.quantity,
//         purchase.purchasePrice,
//         purchase.sellingPrice,
//         purchase.totalPrice,
//         `"${purchase.supplier}"`
//       ];
//       csvRows.push(row.join(','));
//     });
    
//     // Add summary
//     csvRows.push('');
//     csvRows.push('SUMMARY');
//     csvRows.push(`Total Purchases,${reportData.summary.totalPurchases}`);
//     csvRows.push(`Total Amount,Tsh${reportData.summary.totalAmount.toFixed(2)}`);
//     csvRows.push(`Total Quantity,${reportData.summary.totalQuantity}`);
//     csvRows.push(`Average Price per Unit,Tsh${reportData.summary.averagePrice.toFixed(2)}`);
//     csvRows.push('');
//     csvRows.push(`Report Title,${reportData.title}`);
//     csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
//     return csvRows.join('\n');
//   };

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
//       const { purchaseId, quantity, purchasePrice, sellingPrice, supplier } = editPurchase;
//       await axios.put(`http://localhost:8080/api/purchases/${purchaseId}`, {
//         quantity,
//         purchasePrice,
//         sellingPrice,
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
//         fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         minHeight: "100vh",
//         backgroundColor: "#f8fafc",
//       }}>
//         <Navigation />
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//           <div style={{
//             display: "inline-block",
//             width: "50px",
//             height: "50px",
//             border: "4px solid rgba(59, 130, 246, 0.2)",
//             borderTop: "4px solid #3b82f6",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             marginBottom: "20px"
//           }}></div>
//           <p style={{ 
//             color: "#64748b", 
//             fontSize: "16px",
//             fontWeight: "500"
//           }}>Loading purchases...</p>
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
//       padding: "15px 20px",
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       minHeight: "100vh",
//       backgroundColor: "#f8fafc",
//     }}>
//       <Navigation />

//       <div style={{ 
//         maxWidth: "1590px", 
//         marginLeft: "230px",
//         padding: "0 15px"
//       }}>
//         {/* Header Section - Updated with Total Purchases and Total Amount */}
//         <div style={{
//           background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//           borderRadius: "12px",
//           padding: "20px 25px",
//           marginBottom: "20px",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//           color: "white",
//           position: "relative",
//           overflow: "hidden",
//           marginTop: "60px"
//         }}>
//           <div style={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "flex-start",
//             flexWrap: "wrap",
//             gap: "15px"
//           }}>
//             <div>
//               <h2 style={{
//                 margin: "0",
//                 fontSize: "24px",
//                 fontWeight: "700",
//                 marginBottom: "4px",
//               }}>
//                 Purchase History
//               </h2>
//               <p style={{
//                 margin: "0",
//                 fontSize: "14px",
//                 opacity: "0.9",
//                 fontWeight: "400",
//                 marginBottom: "15px",
//               }}>
//                 Manage and track all your purchase records
//               </p>
//             </div>
            
//             {/* Total Purchases and Total Amount in the same div */}
//             <div style={{
//               display: "flex",
//               gap: "20px",
//               alignItems: "center",
//               flexWrap: "wrap"
//             }}>
//               <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 backgroundColor: "rgba(255, 255, 255, 0.2)",
//                 padding: "8px 15px",
//                 borderRadius: "8px",
//                 backdropFilter: "blur(10px)"
//               }}>
//                 <span style={{
//                   fontSize: "14px",
//                   fontWeight: "600"
//                 }}>
//                   Total Purchases:
//                 </span>
//                 <span style={{
//                   fontSize: "16px",
//                   fontWeight: "700",
//                   backgroundColor: "rgba(255, 255, 255, 0.3)",
//                   padding: "4px 10px",
//                   borderRadius: "6px"
//                 }}>
//                   {totalPurchases}
//                 </span>
//               </div>
              
//               <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 gap: "8px",
//                 backgroundColor: "rgba(255, 255, 255, 0.2)",
//                 padding: "8px 15px",
//                 borderRadius: "8px",
//                 backdropFilter: "blur(10px)"
//               }}>
//                 <span style={{
//                   fontSize: "14px",
//                   fontWeight: "600"
//                 }}>
//                   Total Amount:
//                 </span>
//                 <span style={{
//                   fontSize: "16px",
//                   fontWeight: "700",
//                   backgroundColor: "rgba(255, 255, 255, 0.3)",
//                   padding: "4px 10px",
//                   borderRadius: "6px"
//                 }}>
//                   TSH {totalAmount.toFixed(2)}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div style={{
//             color: "#721c24",
//             backgroundColor: "#fee2e2",
//             border: "1px solid #fecaca",
//             padding: "12px 16px",
//             borderRadius: "8px",
//             marginBottom: "20px",
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//           }}>
//             <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//               <span style={{ fontWeight: "500" }}>{error}</span>
//             </div>
//             <button
//               onClick={() => setError("")}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#721c24",
//                 fontSize: "18px",
//                 cursor: "pointer",
//                 padding: "2px",
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Report Download Section - Compact */}
//         <div style={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: '12px',
//           backgroundColor: 'white',
//           padding: '16px 20px',
//           borderRadius: "12px",
//           border: '1px solid #e2e8f0',
//           marginBottom: '20px',
//           justifyContent: 'flex-end',
//           boxShadow: '0 2px 6px rgba(0, 0, 0, 0.04)'
//         }}>
//           {/* Date Selection */}
//           <div>
//             <label style={{ 
//               fontSize: '12px', 
//               fontWeight: '600', 
//               marginBottom: '4px', 
//               display: 'block',
//               color: '#374151'
//             }}>
//               Date:
//             </label>
//             <input
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               style={{
//                 padding: '6px 10px',
//                 borderRadius: '6px',
//                 border: '1px solid #d1d5db',
//                 backgroundColor: 'white',
//                 fontSize: '12px',
//                 fontWeight: '500',
//                 width: '140px'
//               }}
//             />
//           </div>

//           {/* Report Type Selection */}
//           <div>
//             <label style={{ 
//               fontSize: '12px', 
//               fontWeight: '600', 
//               marginBottom: '4px', 
//               display: 'block',
//               color: '#374151'
//             }}>
//               Type:
//             </label>
//             <select
//               value={reportType}
//               onChange={(e) => setReportType(e.target.value)}
//               style={{
//                 padding: '6px 10px',
//                 borderRadius: '6px',
//                 border: '1px solid #d1d5db',
//                 backgroundColor: 'white',
//                 fontSize: '12px',
//                 fontWeight: '500',
//                 width: '120px'
//               }}
//             >
//               <option value="day">Daily</option>
//               <option value="week">Weekly</option>
//               <option value="month">Monthly</option>
//             </select>
//           </div>
          
//           <button
//             onClick={downloadPDFReport}
//             disabled={reportLoading}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#dc2626',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: reportLoading ? 'not-allowed' : 'pointer',
//               fontWeight: '600',
//               fontSize: '13px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px',
//               opacity: reportLoading ? 0.7 : 1,
//             }}
//           >
//             📄 {reportLoading ? 'Generating...' : 'PDF'}
//           </button>

//           <button
//             onClick={downloadCSVReport}
//             disabled={reportLoading}
//             style={{
//               padding: '8px 16px',
//               backgroundColor: '#059669',
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               cursor: reportLoading ? 'not-allowed' : 'pointer',
//               fontWeight: '600',
//               fontSize: '13px',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px',
//               opacity: reportLoading ? 0.7 : 1,
//             }}
//           >
//             📊 {reportLoading ? 'Generating...' : 'CSV'}
//           </button>
//         </div>

//         {/* Filter Section - Compact */}
//         <div style={{
//           backgroundColor: "white",
//           padding: "18px 20px",
//           borderRadius: "12px",
//           marginBottom: "20px",
//           boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
//           border: "1px solid #e2e8f0"
//         }}>
//           <h3 style={{
//             margin: "0 0 15px 0",
//             color: "#1f2937",
//             fontSize: "16px",
//             fontWeight: "600",
//           }}>
//             Filters
//           </h3>

//           <div style={{
//             display: "grid",
//             gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//             gap: "15px",
//             alignItems: "end"
//           }}>
//             <div>
//               <label style={{ 
//                 display: "block", 
//                 fontWeight: "600", 
//                 marginBottom: "6px", 
//                 color: "#374151",
//                 fontSize: "13px"
//               }}>
//                 Supplier:
//               </label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={filter.supplier}
//                 onChange={handleFilterChange}
//                 placeholder="Filter by supplier..."
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   width: "100%",
//                   fontSize: "14px",
//                   backgroundColor: "#fafafa"
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{ 
//                 display: "block", 
//                 fontWeight: "600", 
//                 marginBottom: "6px", 
//                 color: "#374151",
//                 fontSize: "13px"
//               }}>
//                 Start Date:
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 value={filter.startDate}
//                 onChange={handleFilterChange}
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   width: "100%",
//                   fontSize: "14px",
//                   backgroundColor: "#fafafa"
//                 }}
//               />
//             </div>

//             <div>
//               <label style={{ 
//                 display: "block", 
//                 fontWeight: "600", 
//                 marginBottom: "6px", 
//                 color: "#374151",
//                 fontSize: "13px"
//               }}>
//                 End Date:
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 value={filter.endDate}
//                 onChange={handleFilterChange}
//                 style={{
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   width: "100%",
//                   fontSize: "14px",
//                   backgroundColor: "#fafafa"
//                 }}
//               />
//             </div>

//             <div>
//               <button
//                 onClick={clearFilters}
//                 style={{
//                   padding: "8px 16px",
//                   backgroundColor: "#6b7280",
//                   color: "white",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   fontWeight: "600",
//                   width: "100%",
//                 }}
//               >
//                 Clear Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Purchases Table - Compact */}
//         <div style={{
//           backgroundColor: "white",
//           borderRadius: "12px",
//           overflow: "hidden",
//           boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
//           border: "1px solid #e2e8f0",
//           marginBottom: "20px"
//         }}>
//           <div style={{ maxHeight: "400px", overflowY: "auto" }}>
//             <table style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               minWidth: "900px"
//             }}>
//               <thead>
//                 <tr style={{
//                   backgroundColor: "#f8fafc",
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 10,
//                   borderBottom: "2px solid #e2e8f0"
//                 }}>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Product</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Qty</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Buy Price</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Sell Price</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Total</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Supplier</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Date</th>
//                   <th style={{ 
//                     padding: "14px 12px", 
//                     textAlign: "center", 
//                     fontSize: "13px", 
//                     fontWeight: "700",
//                     color: "#374151",
//                   }}>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredPurchases.length > 0 ? (
//                   filteredPurchases.map((purchase, index) => (
//                     <tr key={purchase.purchaseId} style={{
//                       borderBottom: "1px solid #f1f5f9",
//                       backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa",
//                     }}>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#1f2937"
//                       }}>{purchase.product?.productName || "N/A"}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px", 
//                         textAlign: "center",
//                         fontWeight: "600",
//                         color: "#059669"
//                       }}>{purchase.quantity}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#dc2626"
//                       }}>{purchase.purchasePrice?.toFixed(2)} Tsh</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#059669"
//                       }}>{purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) + " Tsh" : "N/A"}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "600",
//                         color: "#1f2937"
//                       }}>
//                         {(purchase.quantity * purchase.purchasePrice)?.toFixed(2)} Tsh
//                       </td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#6b7280"
//                       }}>{purchase.supplier}</td>
//                       <td style={{ 
//                         padding: "12px", 
//                         fontSize: "13px",
//                         fontWeight: "500",
//                         color: "#6b7280"
//                       }}>
//                         {new Date(purchase.purchaseDate).toLocaleDateString()}
//                       </td>
//                       <td style={{ 
//                         padding: "12px", 
//                         textAlign: "center",
//                         display: "flex",
//                         justifyContent: "center",
//                         gap: "6px"
//                       }}>
//                         <button
//                           onClick={() => openEditModal(purchase)}
//                           style={{
//                             padding: "6px 12px",
//                             backgroundColor: "#3b82f6",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             cursor: "pointer",
//                             fontSize: "12px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(purchase.purchaseId)}
//                           style={{
//                             padding: "6px 12px",
//                             backgroundColor: "#dc2626",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "6px",
//                             cursor: "pointer",
//                             fontSize: "12px",
//                             fontWeight: "600",
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" style={{ 
//                       padding: "30px", 
//                       textAlign: "center", 
//                       fontSize: "14px",
//                       color: "#6b7280",
//                       fontWeight: "500"
//                     }}>
//                       <div style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "center",
//                         gap: "8px"
//                       }}>
//                         <span style={{ fontSize: "32px" }}>📦</span>
//                         <div>No purchases found</div>
//                       </div>
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Edit Modal - Compact */}
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
//           zIndex: 9999,
//         }}>
//           <div style={{
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "12px",
//             width: "400px",
//             position: "relative",
//             boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
//           }}>
//             <div style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               marginBottom: "15px"
//             }}>
//               <h3 style={{ 
//                 margin: 0, 
//                 color: "#1f2937", 
//                 fontSize: "18px",
//                 fontWeight: "600"
//               }}>
//                 Edit Purchase
//               </h3>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   background: "none",
//                   border: "none",
//                   color: "#6b7280",
//                   fontSize: "20px",
//                   cursor: "pointer",
//                 }}
//               >
//                 ×
//               </button>
//             </div>
            
//             <div style={{ marginBottom: "12px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Quantity:
//               </label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={editPurchase.quantity}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "12px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Buying Price:
//               </label>
//               <input
//                 type="number"
//                 name="purchasePrice"
//                 value={editPurchase.purchasePrice}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "12px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Selling Price:
//               </label>
//               <input
//                 type="number"
//                 name="sellingPrice"
//                 value={editPurchase.sellingPrice || ""}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ marginBottom: "20px" }}>
//               <label style={{ 
//                 fontWeight: "600", 
//                 color: "#374151",
//                 fontSize: "13px",
//                 marginBottom: "4px",
//                 display: "block"
//               }}>
//                 Supplier:
//               </label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={editPurchase.supplier}
//                 onChange={handleEditChange}
//                 style={{
//                   width: "100%",
//                   padding: "8px 12px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   fontSize: "14px",
//                 }}
//               />
//             </div>

//             <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   padding: "8px 16px",
//                   borderRadius: "6px",
//                   border: "1px solid #d1d5db",
//                   backgroundColor: "white",
//                   color: "#374151",
//                   cursor: "pointer",
//                   fontWeight: "600",
//                   fontSize: "13px",
//                 }}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 style={{
//                   padding: "8px 16px",
//                   borderRadius: "6px",
//                   border: "none",
//                   backgroundColor: "#059669",
//                   color: "white",
//                   cursor: "pointer",
//                   fontWeight: "600",
//                   fontSize: "13px",
//                 }}
//               >
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Purchase;
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navigation from "../navigation/Navigation";
// import { Link } from "react-router-dom";
// import { width } from "@fortawesome/free-solid-svg-icons/fa0";

// const Purchase = () => {
//   const [purchases, setPurchases] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [filter, setFilter] = useState({
//     supplier: "",
//     startDate: "",
//     endDate: ""
//   });
//   const [reportLoading, setReportLoading] = useState(false);
//   const [reportType, setReportType] = useState('day');
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

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
//       setError("❌ Failed to fetch purchases. Please try again later.");
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

//   // Calculate totals
//   const totalPurchases = filteredPurchases.length;
//   const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//     sum + (purchase.quantity * purchase.purchasePrice), 0
//   );
//   const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//   // 🔹 Filter purchases for reports
//   const getFilteredPurchasesForReport = () => {
//     if (!selectedDate) return filteredPurchases;

//     const currentDate = new Date(selectedDate);
    
//     switch (reportType) {
//       case 'day':
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate.toDateString() === currentDate.toDateString();
//         });
        
//       case 'week':
//         const startOfWeek = new Date(currentDate);
//         startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
//         startOfWeek.setHours(0, 0, 0, 0);
        
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         endOfWeek.setHours(23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfWeek && purchaseDate <= endOfWeek;
//         });
        
//       case 'month':
//         const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
//         const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
//         return filteredPurchases.filter(purchase => {
//           if (!purchase.purchaseDate) return false;
//           const purchaseDate = new Date(purchase.purchaseDate);
//           return purchaseDate >= startOfMonth && purchaseDate <= endOfMonth;
//         });
        
//       default:
//         return filteredPurchases;
//     }
//   };

//   // 🔹 Get report title
//   const getReportTitle = () => {
//     const date = new Date(selectedDate);
//     switch (reportType) {
//       case 'day':
//         return `Daily Purchase Report - ${date.toLocaleDateString()}`;
//       case 'week':
//         const startOfWeek = new Date(date);
//         startOfWeek.setDate(date.getDate() - date.getDay());
//         const endOfWeek = new Date(startOfWeek);
//         endOfWeek.setDate(startOfWeek.getDate() + 6);
//         return `Weekly Purchase Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
//       case 'month':
//         return `Monthly Purchase Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
//       default:
//         return 'Purchase Report';
//     }
//   };

//   // 🔹 Download PDF Report
//   const downloadPDFReport = () => {
//     setReportLoading(true);
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     // Create report data
//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
//       }))
//     };

//     // Generate PDF
//     generatePDF(reportData);
//   };

//   // 🔹 Generate PDF using jsPDF
//   const generatePDF = (reportData) => {
//     import('jspdf').then((jsPDFModule) => {
//       const { jsPDF } = jsPDFModule;
//       const pdf = new jsPDF();
      
//       // Set initial y position
//       let yPosition = 20;
      
//       // Add title
//       pdf.setFontSize(16);
//       pdf.setTextColor(40, 40, 40);
//       pdf.text('PURCHASE REPORT', 105, yPosition, { align: 'center' });
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
//       pdf.text(`Total Purchases: ${reportData.summary.totalPurchases}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Amount: Tsh ${reportData.summary.totalAmount.toFixed(2)}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Total Quantity: ${reportData.summary.totalQuantity}`, 20, yPosition);
//       yPosition += 5;
//       pdf.text(`Average Price per Unit: Tsh ${reportData.summary.averagePrice.toFixed(2)}`, 20, yPosition);
//       yPosition += 15;
      
//       // Add table headers
//       pdf.setFontSize(9);
      
//       // Table headers configuration
//       const headers = ['Purchase ID', 'Date', 'Product', 'Qty', 'Buy Price', 'Sell Price', 'Total', 'Supplier'];
//       const columnWidths = [22, 22, 35, 12, 20, 20, 20, 30];
      
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
      
//       reportData.purchases.forEach((purchase, index) => {
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
        
//         // Purchase ID
//         pdf.text(purchase.purchaseId.toString(), xPosition, yPosition);
//         xPosition += columnWidths[0];
        
//         // Date
//         pdf.text(purchase.date.substring(0, 10), xPosition, yPosition);
//         xPosition += columnWidths[1];
        
//         // Product Name
//         pdf.text(purchase.productName.substring(0, 18), xPosition, yPosition);
//         xPosition += columnWidths[2];
        
//         // Quantity
//         pdf.text(purchase.quantity.toString(), xPosition, yPosition);
//         xPosition += columnWidths[3];
        
//         // Purchase Price
//         pdf.text(purchase.purchasePrice, xPosition, yPosition);
//         xPosition += columnWidths[4];
        
//         // Selling Price
//         pdf.text(purchase.sellingPrice, xPosition, yPosition);
//         xPosition += columnWidths[5];
        
//         // Total Price
//         pdf.text(purchase.totalPrice, xPosition, yPosition);
//         xPosition += columnWidths[6];
        
//         // Supplier
//         pdf.text(purchase.supplier.substring(0, 15), xPosition, yPosition);
        
//         yPosition += 6;
//       });
      
//       // Add footer
//       const pageCount = pdf.internal.getNumberOfPages();
//       for (let i = 1; i <= pageCount; i++) {
//         pdf.setPage(i);
//         pdf.setFontSize(8);
//         pdf.setTextColor(100, 100, 100);
//         pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
//         pdf.text('Generated by Purchase Management System', 105, 290, { align: 'center' });
//       }
      
//       // Save PDF
//       const fileName = `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
//       pdf.save(fileName);
//       setReportLoading(false);
//     }).catch(error => {
//       console.error('Error generating PDF:', error);
//       alert('Failed to generate PDF report');
//       setReportLoading(false);
//     });
//   };

//   // 🔹 Download CSV Report
//   const downloadCSVReport = () => {
//     setReportLoading(true);
    
//     const filteredPurchases = getFilteredPurchasesForReport();
    
//     // Calculate totals for filtered data
//     const totalPurchases = filteredPurchases.length;
//     const totalAmount = filteredPurchases.reduce((sum, purchase) => 
//       sum + (purchase.quantity * purchase.purchasePrice), 0
//     );
//     const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

//     const reportData = {
//       title: getReportTitle(),
//       generatedAt: new Date().toLocaleString(),
//       summary: {
//         totalPurchases: totalPurchases,
//         totalAmount: totalAmount,
//         totalQuantity: totalQuantity,
//         averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
//       },
//       purchases: filteredPurchases.map(purchase => ({
//         purchaseId: purchase.purchaseId,
//         date: purchase.purchaseDate || 'N/A',
//         productName: purchase.product?.productName || 'N/A',
//         quantity: purchase.quantity,
//         purchasePrice: purchase.purchasePrice?.toFixed(2),
//         sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
//         totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
//         supplier: purchase.supplier
//       }))
//     };

//     // Create CSV content
//     const csvContent = createCSVContent(reportData);
    
//     // Create and download file
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
    
//     link.setAttribute('href', url);
//     link.setAttribute('download', `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
//     link.style.visibility = 'hidden';
    
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
    
//     setReportLoading(false);
//   };

//   // 🔹 Create CSV content from report data
//   const createCSVContent = (reportData) => {
//     const headers = ['Purchase ID', 'Date', 'Product Name', 'Quantity', 'Purchase Price', 'Selling Price', 'Total Price', 'Supplier'];
//     const csvRows = [];
    
//     // Add header
//     csvRows.push(headers.join(','));
    
//     // Add data rows
//     reportData.purchases.forEach(purchase => {
//       const row = [
//         purchase.purchaseId,
//         `"${purchase.date}"`,
//         `"${purchase.productName}"`,
//         purchase.quantity,
//         purchase.purchasePrice,
//         purchase.sellingPrice,
//         purchase.totalPrice,
//         `"${purchase.supplier}"`
//       ];
//       csvRows.push(row.join(','));
//     });
    
//     // Add summary
//     csvRows.push('');
//     csvRows.push('SUMMARY');
//     csvRows.push(`Total Purchases,${reportData.summary.totalPurchases}`);
//     csvRows.push(`Total Amount,Tsh${reportData.summary.totalAmount.toFixed(2)}`);
//     csvRows.push(`Total Quantity,${reportData.summary.totalQuantity}`);
//     csvRows.push(`Average Price per Unit,Tsh${reportData.summary.averagePrice.toFixed(2)}`);
//     csvRows.push('');
//     csvRows.push(`Report Title,${reportData.title}`);
//     csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
//     return csvRows.join('\n');
//   };

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
//         alert("❌ Failed to delete purchase. Try again later.");
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
//       const { purchaseId, quantity, purchasePrice, sellingPrice, supplier } = editPurchase;
//       await axios.put(`http://localhost:8080/api/purchases/${purchaseId}`, {
//         quantity,
//         purchasePrice,
//         sellingPrice,
//         supplier
//       });
//       fetchPurchases();
//       setIsModalOpen(false);
//       setEditPurchase(null);
//     } catch (err) {
//       console.error("Error updating purchase:", err);
//       alert("❌ Failed to update purchase. Try again later.");
//     }
//   };

//   // Styling matching the Stock component
//   const tableContainerStyle = {
//     maxWidth: '1595px',
//     margin: '20px auto',
//     background: 'white',
//     padding: '25px',
//     width:"1700px",
//     borderRadius: '15px',
//     marginLeft: "210px",
//     boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
//     maxHeight: '450px',
//     overflowY: 'auto',
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '8px',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     marginBottom: '15px',
//     fontSize: '14px'
//   };

//   if (loading) {
//     return (
//       <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
//         <Navigation />
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//           <div style={{
//             display: "inline-block",
//             width: "50px",
//             height: "50px",
//             border: "4px solid rgba(59, 130, 246, 0.2)",
//             borderTop: "4px solid #3b82f6",
//             borderRadius: "50%",
//             animation: "spin 1s linear infinite",
//             marginBottom: "20px"
//           }}></div>
//           <p style={{ 
//             color: "#64748b", 
//             fontSize: "16px",
//             fontWeight: "500"
//           }}>⏳ Loading purchases...</p>
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
//     <div style={{ background: '#f4f6f9', minHeight: '100vh',backgroundColor:"#e9e7e7ff"}}>
//       <Navigation />

//       <div style={{ padding: '20px', marginLeft: "20px", width: "1250px" }}>
//         <div  style={{ marginLeft: "200px"}}> 
//           <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: '600', marginTop: "50px", marginLeft:"70px"}}>
//             🛒 PURCHASE HISTORY
//           </h2>
          
//           {/* All in One Line Section */}
//           <div style={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'space-between',
//             marginBottom: '20px',
//             marginLeft: "390px",
//             gap: '20px',
//             flexWrap: 'nowrap'
//           }}>
//             {/* Summary Cards */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '20px',
//               flex: 1
//             }}>
//               <div style={{
//                 backgroundColor: '#e7f3ff',
//                 padding: '15px 20px',
//                 borderRadius: '10px',
//                 textAlign: 'center',
//                 border: '2px solid #007bff',
//                 minWidth: '140px'
//               }}>
//                 <h4 style={{ margin: '0 0 5px 0', color: '#007bff', fontSize: '14px' }}>Total Purchases</h4>
//                 <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#0056b3' }}>
//                   {totalPurchases}
//                 </p>
//               </div>
              
//               <div style={{
//                 backgroundColor: '#d4edda',
//                 padding: '15px 20px',
//                 borderRadius: '10px',
//                 textAlign: 'center',
//                 border: '2px solid #28a745',
//                 minWidth: '180px'
//               }}>
//                 <h4 style={{ margin: '0 0 5px 0', color: '#155724', fontSize: '14px' }}>Total Amount</h4>
//                 <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#155724' }}>
//                   Tsh{totalAmount.toFixed(2)}
//                 </p>
//               </div>
              
//               <div style={{
//                 backgroundColor: '#fff3cd',
//                 padding: '15px 20px',
//                 borderRadius: '10px',
//                 textAlign: 'center',
//                 border: '2px solid #ffc107',
//                 minWidth: '140px'
//               }}>
//                 <h4 style={{ margin: '0 0 5px 0', color: '#856404', fontSize: '14px' }}>Total Quantity</h4>
//                 <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#856404' }}>
//                   {totalQuantity}
//                 </p>
//               </div>
//             </div>

//             {/* Report Controls */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '15px',
//               flexWrap: 'nowrap'
//             }}>
//               {/* Date Selection */}
//               <div>
//                 <label style={{ 
//                   fontSize: '12px', 
//                   fontWeight: '600', 
//                   marginBottom: '4px', 
//                   display: 'block',
//                   color: '#374151'
//                 }}>
//                   Date:
//                 </label>
//                 <input
//                   type="date"
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                   style={{
//                     padding: '8px 12px',
//                     borderRadius: '6px',
//                     border: '1px solid #d1d5db',
//                     backgroundColor: 'white',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     width: '140px'
//                   }}
//                 />
//               </div>

//               {/* Report Type Selection */}
//               <div>
//                 <label style={{ 
//                   fontSize: '12px', 
//                   fontWeight: '600', 
//                   marginBottom: '4px', 
//                   display: 'block',
//                   color: '#374151'
//                 }}>
//                   Type:
//                 </label>
//                 <select
//                   value={reportType}
//                   onChange={(e) => setReportType(e.target.value)}
//                   style={{
//                     padding: '8px 12px',
//                     borderRadius: '6px',
//                     border: '1px solid #d1d5db',
//                     backgroundColor: 'white',
//                     fontSize: '12px',
//                     fontWeight: '500',
//                     width: '120px'
//                   }}
//                 >
//                   <option value="day">Daily</option>
//                   <option value="week">Weekly</option>
//                   <option value="month">Monthly</option>
//                 </select>
//               </div>
              
//               {/* Report Buttons */}
//               <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
//                 <button
//                   onClick={downloadPDFReport}
//                   disabled={reportLoading}
//                   style={{
//                     padding: '8px 16px',
//                     backgroundColor: '#dc2626',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: reportLoading ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: '13px',
//                     display: 'flex',
//                     alignItems: 'center',
//                      paddingBottom:"40px",
//                     paddingTop:"20px",
//                     gap: '6px',
//                     opacity: reportLoading ? 0.7 : 1,
//                     height: '36px'
//                   }}
//                 >
//                   📄 {reportLoading ? 'Generating...' : 'PDF'}
//                 </button>

//                 <button
//                   onClick={downloadCSVReport}
//                   disabled={reportLoading}
//                   style={{
//                     padding: '8px 16px',
//                     backgroundColor: '#059669',
//                     color: 'white',
//                      paddingBottom:"40px",
//                     paddingTop:"20px",
//                     border: 'none',
//                     borderRadius: '6px',
//                     cursor: reportLoading ? 'not-allowed' : 'pointer',
//                     fontWeight: '600',
//                     fontSize: '13px',
//                     display: 'flex',
//                     width:"70px",
//                     alignItems: 'center',
//                     gap: '6px',
//                     opacity: reportLoading ? 0.7 : 1,
//                     height: '36px'
//                   }}
//                 >
//                   📊 {reportLoading ? 'Generating...' : 'EXCEL'}
//                 </button>
//               </div>
//             </div>

//             {/* Add Purchase Button */}
//             <div>
//               {/* <Link to="/add-purchase">
//                 <button style={{ 
//                   width: "160px", 
//                   backgroundColor: "#28a745", 
//                   color: "white", 
//                   borderRadius: "5px", 
//                   padding: "10px", 
//                   border: "none", 
//                   cursor: "pointer",
//                   fontWeight: 'bold',
//                    paddingBottom:"40px",
//                     paddingTop:"20px",
//                   height: '36px'
//                 }}>
//                   ➕ Add Purchase
//                 </button>
//               </Link> */}
//             </div>
//           </div>

//           {/* Filter Section */}
//           <div style={{
//             backgroundColor: "white",
//             padding: "18px 20px",
//             borderRadius: "12px",
//             marginBottom: "20px",
//             boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
//             border: "1px solid #e2e8f0",
//             marginLeft: "10px",
//             width: "1600px"
//           }}>
//             <h3 style={{
//               margin: "0 0 15px 0",
//               color: "#1f2937",
//               fontSize: "16px",
//               fontWeight: "600",
              
//             }}>
//               🔍 Filters
//             </h3>

//             <div style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//               gap: "15px",
//               alignItems: "end"
//             }}>
//               <div>
//                 <label style={{ 
//                   display: "block", 
//                   fontWeight: "600", 
//                   marginBottom: "6px", 
//                   color: "#374151",
//                   fontSize: "13px"
//                 }}>
//                   Supplier:
//                 </label>
//                 <input
//                   type="text"
//                   name="supplier"
//                   value={filter.supplier}
//                   onChange={handleFilterChange}
//                   placeholder="Filter by supplier..."
//                   style={{
//                     padding: "8px 12px",
//                     borderRadius: "6px",
//                     border: "1px solid #d1d5db",
//                     width: "100%",
//                     fontSize: "14px",
//                     backgroundColor: "#fafafa"
//                   }}
//                 />
//               </div>

//               <div>
//                 <label style={{ 
//                   display: "block", 
//                   fontWeight: "600", 
//                   marginBottom: "6px", 
//                   color: "#374151",
//                   fontSize: "13px"
//                 }}>
//                   Start Date:
//                 </label>
//                 <input
//                   type="date"
//                   name="startDate"
//                   value={filter.startDate}
//                   onChange={handleFilterChange}
//                   style={{
//                     padding: "8px 12px",
//                     borderRadius: "6px",
//                     border: "1px solid #d1d5db",
//                     width: "100%",
//                     fontSize: "14px",
//                     backgroundColor: "#fafafa"
//                   }}
//                 />
//               </div>

//               <div>
//                 <label style={{ 
//                   display: "block", 
//                   fontWeight: "600", 
//                   marginBottom: "6px", 
//                   color: "#374151",
//                   fontSize: "13px"
//                 }}>
//                   End Date:
//                 </label>
//                 <input
//                   type="date"
//                   name="endDate"
//                   value={filter.endDate}
//                   onChange={handleFilterChange}
//                   style={{
//                     padding: "8px 12px",
//                     borderRadius: "6px",
//                     border: "1px solid #d1d5db",
//                     width: "100%",
//                     fontSize: "14px",
//                     backgroundColor: "#fafafa"
//                   }}
//                 />
//               </div>

//               <div>
//                 <button
//                   onClick={clearFilters}
//                   style={{
//                     padding: "8px 16px",
//                     backgroundColor: "#6b7280",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "6px",
//                     cursor: "pointer",
//                     fontSize: "14px",
//                     fontWeight: "600",
//                     width: "100%",
//                   }}
//                 >
//                   🗑️ Clear Filters
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {error && (
//           <div style={{ 
//             color: 'red', 
//             textAlign: 'center', 
//             backgroundColor: '#f8d7da',
//             padding: '10px',
//             borderRadius: '5px',
//             margin: '10px auto',
//             maxWidth: '500px'
//           }}>
//             {error}
//           </div>
//         )}

//         <div style={tableContainerStyle}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixedam'}}>
//             <thead style={{ position: 'sticky', top: 0, background: '#2c3e50', zIndex: 10 }}>
//               <tr>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'left' }}>Product Name</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Quantity</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Buying Price</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Selling Price</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Total Amount</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Supplier</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Purchase Date</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredPurchases.map((purchase, index) => (
//                 <tr key={purchase.purchaseId} style={{ 
//                   borderBottom: '1px solid #ddd',
//                   backgroundColor: index % 2 === 0 ? '#fff' : '#f8f9fa'
//                 }}>
//                   <td style={{ padding: '10px', fontWeight: '500' }}>
//                     {purchase.product?.productName || 'N/A'}
//                   </td>
//                   <td style={{ 
//                     padding: '10px', 
//                     textAlign: 'center',
//                     fontWeight: 'bold',
//                     color: '#059669'
//                   }}>{purchase.quantity}</td>
//                   <td style={{ 
//                     padding: '10px', 
//                     textAlign: 'center', 
//                     fontFamily: 'monospace',
//                     color: '#dc2626'
//                   }}>
//                     Tsh{parseFloat(purchase.purchasePrice || 0).toFixed(2)}
//                   </td>
//                   <td style={{ 
//                     padding: '10px', 
//                     textAlign: 'center', 
//                     fontFamily: 'monospace',
//                     color: '#059669'
//                   }}>
//                     {purchase.sellingPrice ? `Tsh${parseFloat(purchase.sellingPrice).toFixed(2)}` : 'N/A'}
//                   </td>
//                   <td style={{ 
//                     padding: '10px', 
//                     textAlign: 'center', 
//                     fontFamily: 'monospace',
//                     fontWeight: 'bold',
//                     color: '#1f2937'
//                   }}>
//                     Tsh{(purchase.quantity * purchase.purchasePrice)?.toFixed(2)}
//                   </td>
//                   <td style={{ 
//                     padding: '10px', 
//                     textAlign: 'center',
//                     color: '#6b7280'
//                   }}>{purchase.supplier}</td>
//                   <td style={{ 
//                     padding: '10px', 
//                     textAlign: 'center',
//                     color: '#6b7280'
//                   }}>
//                     {new Date(purchase.purchaseDate).toLocaleDateString()}
//                   </td>
//                   <td style={{ padding: '10px', textAlign: 'center' }}>
//                     <button
//                       onClick={() => openEditModal(purchase)}
//                       style={{
//                         marginRight: '5px',
//                         borderRadius: '5px',
//                         padding: '6px 12px',
//                         backgroundColor: '#007bff',
//                         color: 'white',
//                         border: 'none',
//                         cursor: 'pointer',
//                         fontSize: '12px'
//                       }}
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(purchase.purchaseId)}
//                       style={{
//                         borderRadius: '5px',
//                         padding: '6px 12px',
//                         backgroundColor: '#dc3545',
//                         color: 'white',
//                         border: 'none',
//                         cursor: 'pointer',
//                         fontSize: '12px'
//                       }}
//                     >
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//               {filteredPurchases.length === 0 && !loading && (
//                 <tr>
//                   <td colSpan="8" style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '16px' }}>
//                     📭 No purchases found. <Link to="/add-purchase" style={{color: '#007bff'}}>Add some purchases</Link> to get started.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Edit Modal */}
//       {isModalOpen && editPurchase && (
//         <div
//           style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000,
//           }}
//         >
//           <div style={{ 
//             background: 'white', 
//             padding: '25px', 
//             borderRadius: '15px', 
//             width: '450px', 
//             maxHeight: '90vh', 
//             overflowY: 'auto',
//             boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
//           }}>
//             <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
//               ✏️ Update Purchase
//             </h3>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Product:</label>
//               <input
//                 type="text"
//                 value={editPurchase.product?.productName || 'N/A'}
//                 readOnly
//                 style={{...inputStyle, backgroundColor: '#e9ecef', color: '#6c757d' }}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Quantity:</label>
//               <input
//                 type="number"
//                 name="quantity"
//                 value={editPurchase.quantity}
//                 onChange={handleEditChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Buying Price:</label>
//               <input
//                 type="number"
//                 name="purchasePrice"
//                 value={editPurchase.purchasePrice}
//                 onChange={handleEditChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Selling Price:</label>
//               <input
//                 type="number"
//                 name="sellingPrice"
//                 value={editPurchase.sellingPrice || ""}
//                 onChange={handleEditChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Supplier:</label>
//               <input
//                 type="text"
//                 name="supplier"
//                 value={editPurchase.supplier}
//                 onChange={handleEditChange}
//                 style={inputStyle}
//               />
//             </div>

//             <div style={{ marginBottom: '15px' }}>
//               <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Total Amount:</label>
//               <input
//                 type="text"
//                 value={(editPurchase.quantity * editPurchase.purchasePrice)?.toFixed(2)}
//                 readOnly
//                 style={{ 
//                   ...inputStyle, 
//                   backgroundColor: '#e9ecef',
//                   fontWeight: 'bold',
//                   color: '#1f2937'
//                 }}
//               />
//             </div>

//             <div style={{ textAlign: 'center', marginTop: '20px' }}>
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 style={{
//                   marginRight: '10px',
//                   padding: '10px 20px',
//                   borderRadius: '8px',
//                   border: 'none',
//                   backgroundColor: '#6c757d',
//                   color: 'white',
//                   cursor: 'pointer'
//                 }}
//               >
//                 ❌ Cancel
//               </button>
//               <button
//                 onClick={handleUpdate}
//                 style={{
//                   padding: '10px 20px',
//                   borderRadius: '8px',
//                   border: 'none',
//                   backgroundColor: '#007bff',
//                   color: 'white',
//                   cursor: 'pointer'
//                 }}
//               >
//                 ✅ Update Purchase
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
import { Link } from "react-router-dom";

const Purchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState({
    supplier: "",
    startDate: "",
    endDate: ""
  });
  const [reportLoading, setReportLoading] = useState(false);
  const [reportType, setReportType] = useState('day');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPurchase, setEditPurchase] = useState(null);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/purchases");
      setPurchases(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching purchases:", err);
      setError("❌ Failed to fetch purchases. Please try again later.");
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

  // Calculate totals
  const totalPurchases = filteredPurchases.length;
  const totalAmount = filteredPurchases.reduce((sum, purchase) => 
    sum + (purchase.quantity * purchase.purchasePrice), 0
  );
  const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

  // 🔹 Filter purchases for reports
  const getFilteredPurchasesForReport = () => {
    if (!selectedDate) return filteredPurchases;

    const currentDate = new Date(selectedDate);
    
    switch (reportType) {
      case 'day':
        return filteredPurchases.filter(purchase => {
          if (!purchase.purchaseDate) return false;
          const purchaseDate = new Date(purchase.purchaseDate);
          return purchaseDate.toDateString() === currentDate.toDateString();
        });
        
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);
        
        return filteredPurchases.filter(purchase => {
          if (!purchase.purchaseDate) return false;
          const purchaseDate = new Date(purchase.purchaseDate);
          return purchaseDate >= startOfWeek && purchaseDate <= endOfWeek;
        });
        
      case 'month':
        const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59, 999);
        
        return filteredPurchases.filter(purchase => {
          if (!purchase.purchaseDate) return false;
          const purchaseDate = new Date(purchase.purchaseDate);
          return purchaseDate >= startOfMonth && purchaseDate <= endOfMonth;
        });
        
      default:
        return filteredPurchases;
    }
  };

  // 🔹 Get report title
  const getReportTitle = () => {
    const date = new Date(selectedDate);
    switch (reportType) {
      case 'day':
        return `Daily Purchase Report - ${date.toLocaleDateString()}`;
      case 'week':
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        return `Weekly Purchase Report - ${startOfWeek.toLocaleDateString()} to ${endOfWeek.toLocaleDateString()}`;
      case 'month':
        return `Monthly Purchase Report - ${date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`;
      default:
        return 'Purchase Report';
    }
  };

  // 🔹 Download PDF Report
  const downloadPDFReport = () => {
    setReportLoading(true);
    
    const filteredPurchases = getFilteredPurchasesForReport();
    
    // Calculate totals for filtered data
    const totalPurchases = filteredPurchases.length;
    const totalAmount = filteredPurchases.reduce((sum, purchase) => 
      sum + (purchase.quantity * purchase.purchasePrice), 0
    );
    const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

    // Create report data
    const reportData = {
      title: getReportTitle(),
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalPurchases: totalPurchases,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
      },
      purchases: filteredPurchases.map(purchase => ({
        purchaseId: purchase.purchaseId,
        date: purchase.purchaseDate || 'N/A',
        productName: purchase.product?.productName || 'N/A',
        quantity: purchase.quantity,
        purchasePrice: purchase.purchasePrice?.toFixed(2),
        sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
        totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
        supplier: purchase.supplier
      }))
    };

    // Generate PDF
    generatePDF(reportData);
  };

  // 🔹 Generate PDF using jsPDF
  const generatePDF = (reportData) => {
    import('jspdf').then((jsPDFModule) => {
      const { jsPDF } = jsPDFModule;
      const pdf = new jsPDF();
      
      // Set initial y position
      let yPosition = 20;
      
      // Add title
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('PURCHASE REPORT', 105, yPosition, { align: 'center' });
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
      pdf.text(`Total Purchases: ${reportData.summary.totalPurchases}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Amount: Tsh ${reportData.summary.totalAmount.toFixed(2)}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Total Quantity: ${reportData.summary.totalQuantity}`, 20, yPosition);
      yPosition += 5;
      pdf.text(`Average Price per Unit: Tsh ${reportData.summary.averagePrice.toFixed(2)}`, 20, yPosition);
      yPosition += 15;
      
      // Add table headers
      pdf.setFontSize(9);
      
      // Table headers configuration
      const headers = ['Purchase ID', 'Date', 'Product', 'Qty', 'Buy Price', 'Sell Price', 'Total', 'Supplier'];
      const columnWidths = [22, 22, 35, 12, 20, 20, 20, 30];
      
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
      
      reportData.purchases.forEach((purchase, index) => {
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
        
        // Purchase ID
        pdf.text(purchase.purchaseId.toString(), xPosition, yPosition);
        xPosition += columnWidths[0];
        
        // Date
        pdf.text(purchase.date.substring(0, 10), xPosition, yPosition);
        xPosition += columnWidths[1];
        
        // Product Name
        pdf.text(purchase.productName.substring(0, 18), xPosition, yPosition);
        xPosition += columnWidths[2];
        
        // Quantity
        pdf.text(purchase.quantity.toString(), xPosition, yPosition);
        xPosition += columnWidths[3];
        
        // Purchase Price
        pdf.text(purchase.purchasePrice, xPosition, yPosition);
        xPosition += columnWidths[4];
        
        // Selling Price
        pdf.text(purchase.sellingPrice, xPosition, yPosition);
        xPosition += columnWidths[5];
        
        // Total Price
        pdf.text(purchase.totalPrice, xPosition, yPosition);
        xPosition += columnWidths[6];
        
        // Supplier
        pdf.text(purchase.supplier.substring(0, 15), xPosition, yPosition);
        
        yPosition += 6;
      });
      
      // Add footer
      const pageCount = pdf.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(100, 100, 100);
        pdf.text(`Page ${i} of ${pageCount}`, 105, 285, { align: 'center' });
        pdf.text('Generated by Purchase Management System', 105, 290, { align: 'center' });
      }
      
      // Save PDF
      const fileName = `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.pdf`;
      pdf.save(fileName);
      setReportLoading(false);
    }).catch(error => {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF report');
      setReportLoading(false);
    });
  };

  // 🔹 Download CSV Report
  const downloadCSVReport = () => {
    setReportLoading(true);
    
    const filteredPurchases = getFilteredPurchasesForReport();
    
    // Calculate totals for filtered data
    const totalPurchases = filteredPurchases.length;
    const totalAmount = filteredPurchases.reduce((sum, purchase) => 
      sum + (purchase.quantity * purchase.purchasePrice), 0
    );
    const totalQuantity = filteredPurchases.reduce((sum, purchase) => sum + parseInt(purchase.quantity), 0);

    const reportData = {
      title: getReportTitle(),
      generatedAt: new Date().toLocaleString(),
      summary: {
        totalPurchases: totalPurchases,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        averagePrice: totalPurchases > 0 ? totalAmount / totalQuantity : 0
      },
      purchases: filteredPurchases.map(purchase => ({
        purchaseId: purchase.purchaseId,
        date: purchase.purchaseDate || 'N/A',
        productName: purchase.product?.productName || 'N/A',
        quantity: purchase.quantity,
        purchasePrice: purchase.purchasePrice?.toFixed(2),
        sellingPrice: purchase.sellingPrice ? purchase.sellingPrice.toFixed(2) : 'N/A',
        totalPrice: (purchase.quantity * purchase.purchasePrice)?.toFixed(2),
        supplier: purchase.supplier
      }))
    };

    // Create CSV content
    const csvContent = createCSVContent(reportData);
    
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `purchase_report_${reportType}_${selectedDate.replace(/-/g, '')}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    setReportLoading(false);
  };

  // 🔹 Create CSV content from report data
  const createCSVContent = (reportData) => {
    const headers = ['Purchase ID', 'Date', 'Product Name', 'Quantity', 'Purchase Price', 'Selling Price', 'Total Price', 'Supplier'];
    const csvRows = [];
    
    // Add header
    csvRows.push(headers.join(','));
    
    // Add data rows
    reportData.purchases.forEach(purchase => {
      const row = [
        purchase.purchaseId,
        `"${purchase.date}"`,
        `"${purchase.productName}"`,
        purchase.quantity,
        purchase.purchasePrice,
        purchase.sellingPrice,
        purchase.totalPrice,
        `"${purchase.supplier}"`
      ];
      csvRows.push(row.join(','));
    });
    
    // Add summary
    csvRows.push('');
    csvRows.push('SUMMARY');
    csvRows.push(`Total Purchases,${reportData.summary.totalPurchases}`);
    csvRows.push(`Total Amount,Tsh${reportData.summary.totalAmount.toFixed(2)}`);
    csvRows.push(`Total Quantity,${reportData.summary.totalQuantity}`);
    csvRows.push(`Average Price per Unit,Tsh${reportData.summary.averagePrice.toFixed(2)}`);
    csvRows.push('');
    csvRows.push(`Report Title,${reportData.title}`);
    csvRows.push(`Report Generated,${reportData.generatedAt}`);
    
    return csvRows.join('\n');
  };

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
        alert("❌ Failed to delete purchase. Try again later.");
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
      alert("❌ Failed to update purchase. Try again later.");
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return 'Tsh 0';
    return `Tsh ${parseInt(amount).toLocaleString()}`;
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
            <h3 style={{ color: '#2c3e50', margin: 0 }}>Loading Purchases...</h3>
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
        marginTop: "130px" 
      }}>
        <h1 style={{ 
          textAlign: "center", 
          overflow: "hidden",
          backgroundColor: "#e2e6e9ff", 
          color: "black", 
          padding: "12px", 
          borderRadius: "12px", 
          marginBottom: "10px",
          marginTop: "40px" 
        }}>
          PURCHASE HISTORY
        </h1>

        {/* Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '15px',
          marginBottom: '20px'
        }}>
          <div style={{
            backgroundColor: '#e7f3ff',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #007bff',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#007bff', fontSize: '14px' }}>Total Purchases</h4>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#0056b3' }}>
              {totalPurchases}
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#d4edda',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #28a745',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#155724', fontSize: '14px' }}>Total Amount</h4>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#155724' }}>
              {formatCurrency(totalAmount)}
            </p>
          </div>
          
          <div style={{
            backgroundColor: '#fff3cd',
            padding: '15px',
            borderRadius: '8px',
            textAlign: 'center',
            border: '2px solid #ffc107',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h4 style={{ margin: '0 0 5px 0', color: '#856404', fontSize: '14px' }}>Total Quantity</h4>
            <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#856404' }}>
              {totalQuantity}
            </p>
          </div>

          {/* Report Controls */}
          <div style={{
            backgroundColor: 'white',
            padding: '15px',
            borderRadius: '8px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #dee2e6',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div>
              <label style={{ display: "block", fontWeight: "500", marginBottom: "5px", fontSize: '12px' }}>Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                style={{ 
                  padding: "6px", 
                  borderRadius: "4px", 
                  border: "1px solid #ced4da",
                  fontSize: '12px'
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontWeight: "500", marginBottom: "5px", fontSize: '12px' }}>Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                style={{ 
                  padding: "6px", 
                  borderRadius: "4px", 
                  border: "1px solid #ced4da",
                  fontSize: '12px'
                }}
              >
                <option value="day">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
              </select>
            </div>

            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <button
                onClick={downloadPDFReport}
                disabled={reportLoading}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#dc2626",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: reportLoading ? 'not-allowed' : 'pointer',
                  fontWeight: "500",
                  fontSize: "12px",
                  opacity: reportLoading ? 0.7 : 1
                }}
              >
                📄 {reportLoading ? 'Generating...' : 'PDF'}
              </button>

              <button
                onClick={downloadCSVReport}
                disabled={reportLoading}
                style={{
                  padding: "6px 12px",
                  backgroundColor: "#059669",
                  color: "white",
                  border: "none",
                  borderRadius: "4px",
                  cursor: reportLoading ? 'not-allowed' : 'pointer',
                  fontWeight: "500",
                  fontSize: "12px",
                  opacity: reportLoading ? 0.7 : 1
                }}
              >
                📊 {reportLoading ? 'Generating...' : 'Excel'}
              </button>
            </div>
          </div>
        </div>

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
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Supplier</label>
            <input 
              type="text" 
              name="supplier" 
              value={filter.supplier} 
              onChange={handleFilterChange} 
              placeholder="Search by supplier"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Start Date</label>
            <input 
              type="date" 
              name="startDate" 
              value={filter.startDate} 
              onChange={handleFilterChange} 
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
            />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>End Date</label>
            <input 
              type="date" 
              name="endDate" 
              value={filter.endDate} 
              onChange={handleFilterChange} 
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} 
            />
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
          <div>
            <Link to="/add-purchase">
              <button style={{ 
                padding: "10px 15px", 
                backgroundColor: "#28a745", 
                color: "white", 
                border: "none", 
                borderRadius: "6px", 
                cursor: "pointer", 
                width: "100%",
                fontWeight: "500"
              }}>
                ➕ Add New Purchase
              </button>
            </Link>
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
              onClick={fetchPurchases}
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

        {/* Purchases Table */}
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
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Purchase ID</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Product</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Quantity</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Buy Price</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Sell Price</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Total</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Supplier</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Purchase Date</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPurchases.length > 0 ? filteredPurchases.map((purchase, index) => (
                  <tr 
                    key={purchase.purchaseId} 
                    style={{ 
                      backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", 
                      borderBottom: "1px solid #eaeaea" 
                    }}
                  >
                    <td style={{ padding: "8px", fontSize: "12px", fontFamily: "monospace", fontWeight: "600" }}>
                      {purchase.purchaseId}
                    </td>
                    <td style={{ padding: "8px", fontSize: "12px" }}>
                      {purchase.product?.productName || 'Unknown Product'}
                    </td>
                    <td style={{ padding: "8px", textAlign: "center", fontSize: "12px", fontWeight: "600" }}>
                      {purchase.quantity || '0'}
                    </td>
                    <td style={{ padding: "8px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#dc2626" }}>
                      {formatCurrency(purchase.purchasePrice)}
                    </td>
                    <td style={{ padding: "8px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#059669" }}>
                      {purchase.sellingPrice ? formatCurrency(purchase.sellingPrice) : 'N/A'}
                    </td>
                    <td style={{ padding: "8px", textAlign: "right", fontSize: "12px", fontWeight: "600", color: "#1f2937" }}>
                      {formatCurrency(purchase.quantity * purchase.purchasePrice)}
                    </td>
                    <td style={{ padding: "8px", fontSize: "12px" }}>
                      {purchase.supplier}
                    </td>
                    <td style={{ padding: "8px", fontSize: "11px", color: "#6c757d" }}>
                      {formatDate(purchase.purchaseDate)}
                    </td>
                    <td style={{ padding: "8px" }}>
                      <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
                        <button 
                          onClick={() => openEditModal(purchase)} 
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
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(purchase.purchaseId)} 
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
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center", padding: "20px" }}>
                      No purchases found. <Link to="/add-purchase" style={{color: '#007bff'}}>Add some purchases</Link> to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Purchase Modal */}
        {isModalOpen && editPurchase && (
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
              <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>Edit Purchase</h2>
              
              <div style={{ marginBottom: "15px" }}>
                <strong>Product:</strong> 
                <div style={{ 
                  padding: "8px", 
                  backgroundColor: "#f8f9fa", 
                  borderRadius: "4px", 
                  marginTop: "5px"
                }}>
                  {editPurchase.product?.productName || 'N/A'}
                </div>
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={editPurchase.quantity}
                  onChange={handleEditChange}
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    borderRadius: "6px", 
                    border: "1px solid #ced4da" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Buying Price</label>
                <input
                  type="number"
                  name="purchasePrice"
                  value={editPurchase.purchasePrice}
                  onChange={handleEditChange}
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    borderRadius: "6px", 
                    border: "1px solid #ced4da" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Selling Price</label>
                <input
                  type="number"
                  name="sellingPrice"
                  value={editPurchase.sellingPrice || ""}
                  onChange={handleEditChange}
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    borderRadius: "6px", 
                    border: "1px solid #ced4da" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "15px" }}>
                <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Supplier</label>
                <input
                  type="text"
                  name="supplier"
                  value={editPurchase.supplier}
                  onChange={handleEditChange}
                  style={{ 
                    width: "100%", 
                    padding: "8px", 
                    borderRadius: "6px", 
                    border: "1px solid #ced4da" 
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <strong>Total Amount:</strong>
                <div style={{ 
                  padding: "8px", 
                  backgroundColor: "#e7f3ff", 
                  borderRadius: "4px", 
                  marginTop: "5px",
                  fontWeight: "600",
                  color: "#007bff"
                }}>
                  {formatCurrency(editPurchase.quantity * editPurchase.purchasePrice)}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{ 
                    padding: "8px 16px", 
                    borderRadius: "6px", 
                    border: "1px solid #6c757d", 
                    backgroundColor: "#6c757d", 
                    color: "white", 
                    cursor: "pointer" 
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  style={{ 
                    padding: "8px 16px", 
                    borderRadius: "6px", 
                    border: "none", 
                    backgroundColor: "#007bff", 
                    color: "white", 
                    cursor: "pointer" 
                  }}
                >
                  Update Purchase
                </button>
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

export default Purchase;