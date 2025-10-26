// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';
// import { Link } from 'react-router-dom';

// const Stock = () => {
//   const [stocks, setStocks] = useState([]);
//   const [shelves, setShelves] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [totalProfit, setTotalProfit] = useState(0);
//   const [totalInvestment, setTotalInvestment] = useState(0);

//   // Fetch all stocks
//   const fetchStocks = () => {
//     setLoading(true);
//     fetch('http://localhost:8080/api/stocks/all-stocks')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch stocks');
//         return res.json();
//       })
//       .then(data => {
//         setStocks(data);
//         setError(null);
//         calculateTotals(data);
//       })
//       .catch(err => {
//         setError('❌ ' + err.message);
//         console.error('Fetch stocks error:', err);
//       })
//       .finally(() => setLoading(false));
//   };

//   // Fetch shelves from backend
//   const fetchShelves = () => {
//     fetch('http://localhost:8080/api/shelves/list-shelves')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch shelves');
//         return res.json();
//       })
//       .then(data => {
//         setShelves(data);
//       })
//       .catch(err => {
//         console.error('Fetch shelves error:', err);
//         setError('❌ Failed to load shelves');
//       });
//   };

//   useEffect(() => {
//     fetchStocks();
//     fetchShelves();
//   }, []);

//   // Calculate total profit and investment
//   const calculateTotals = (stocksData) => {
//     let profit = 0;
//     let investment = 0;

//     stocksData.forEach(stock => {
//       const stockProfit = calculateProfit(stock);
//       profit += stockProfit;
      
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const currentStock = parseInt(stock.currentStock) || 0;
//       investment += buyingPrice * currentStock;
//     });

//     setTotalProfit(profit);
//     setTotalInvestment(investment);
//   };

//   // Delete stock
//   const handleDelete = (id) => {
//     if (!window.confirm('Are you sure you want to delete this stock?')) return;
    
//     fetch(`http://localhost:8080/api/stocks/${id}`, { method: 'DELETE' })
//       .then(res => { 
//         if (!res.ok) throw new Error(`Error: ${res.status}`); 
//         fetchStocks(); 
//       })
//       .catch(err => {
//         setError('❌ Failed to delete stock: ' + err.message);
//         console.error('Delete stock error:', err);
//       });
//   };

//   // Open modal
//   const handleEditOpen = (stock) => {
//     setSelectedStock({ 
//       ...stock,
//       inStock: stock.inStock || 0,
//       outStock: stock.outStock || 0,
//       latestPurchasePrice: stock.latestPurchasePrice || 0,
//       sellingPrice: stock.sellingPrice || 0,
//       shelfId: stock.shelf ? stock.shelf.id : null // ✅ Extract shelf ID for dropdown
//     });
//     setIsModalOpen(true);
//   };

//   // Update stock with shelf support
//   const handleUpdate = () => {
//     if (!selectedStock) return;

//     setLoading(true);
    
//     // Calculate current stock based on input
//     const currentStockCalc = (parseInt(selectedStock.inStock) || 0) - (parseInt(selectedStock.outStock) || 0);
    
//     const updatedStock = {
//       stockId: selectedStock.stockId,
//       product: selectedStock.product,
//       inStock: parseInt(selectedStock.inStock) || 0,
//       outStock: parseInt(selectedStock.outStock) || 0,
//       currentStock: currentStockCalc,
//       latestPurchasePrice: parseFloat(selectedStock.latestPurchasePrice) || 0,
//       sellingPrice: parseFloat(selectedStock.sellingPrice) || 0,
//       shelf: selectedStock.shelfId ? { id: selectedStock.shelfId } : null, // ✅ Include shelf relationship
//       status: currentStockCalc === 0 ? 'Sold Out' : 
//               (selectedStock.outStock > 0 ? 'Partially Sold' : 'In Stock')
//     };

//     console.log('Sending update:', updatedStock);

//     fetch(`http://localhost:8080/api/stocks/${selectedStock.stockId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedStock)
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.error || `Error: ${res.status}`);
//         }
//         return data;
//       })
//       .then(() => {
//         setIsModalOpen(false);
//         setSelectedStock(null);
//         fetchStocks();
//         setError(null);
//       })
//       .catch(err => {
//         console.error('Update stock error:', err);
//         setError('❌ Failed to update stock: ' + err.message);
//       })
//       .finally(() => setLoading(false));
//   };

//   // Enhanced profit calculation with better error handling
//   const calculateProfit = (stock) => {
//     try {
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const sellingPrice = parseFloat(stock.sellingPrice) || 0;
//       const quantitySold = parseInt(stock.outStock) || 0;
      
//       if (stock.profit !== undefined && stock.profit !== null) {
//         return parseFloat(stock.profit) || 0;
//       }
      
//       const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
//       return profitPerUnit * quantitySold;
//     } catch (error) {
//       console.error('Error calculating profit for stock:', stock.stockId, error);
//       return 0;
//     }
//   };

//   // Calculate profit margin percentage
//   const calculateProfitMargin = (stock) => {
//     try {
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const sellingPrice = parseFloat(stock.sellingPrice) || 0;
      
//       if (buyingPrice <= 0) return 0;
      
//       const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
//       return Math.max(0, margin);
//     } catch (error) {
//       return 0;
//     }
//   };

//   // Calculate potential profit for remaining stock
//   const calculatePotentialProfit = (stock) => {
//     try {
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const sellingPrice = parseFloat(stock.sellingPrice) || 0;
//       const currentStock = parseInt(stock.currentStock) || 0;
      
//       const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
//       return profitPerUnit * currentStock;
//     } catch (error) {
//       return 0;
//     }
//   };

//   // ✅ Get shelf name for display
//   const getShelfName = (stock) => {
//     if (!stock.shelf) return 'No Shelf Assigned';
//     return `${stock.shelf.shelfName} - ${stock.shelf.locationDescription}`;
//   };

//   // ✅ Get shelf by ID
//   const getShelfById = (shelfId) => {
//     return shelves.find(shelf => shelf.id === shelfId);
//   };

//   const tableContainerStyle = {
//     maxWidth: '1535px',
//     margin: '20px auto',
//     background: 'white',
//     padding: '25px',
//     borderRadius: '15px',
//     marginLeft: "200px",
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

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Sold Out':
//         return { backgroundColor: '#f8d7da', color: '#721c24' };
//       case 'Partially Sold':
//         return { backgroundColor: '#fff3cd', color: '#856404' };
//       case 'In Stock':
//         return { backgroundColor: '#d4edda', color: '#155724' };
//       default:
//         return { backgroundColor: '#e9ecef', color: '#495057' };
//     }
//   };

//   const getProfitColor = (profit) => {
//     if (profit > 0) return '#28a745';
//     if (profit < 0) return '#dc3545';
//     return '#6c757d';
//   };

//   const getMarginColor = (margin) => {
//     if (margin > 50) return '#e20d0dff';
//     if (margin > 20) return '#17a2b8';
//     if (margin > 0) return '#ffc107';
//     return '#dc3545';
//   };

//   return (
//     <div style={{ background: '#f4f6f9', minHeight: '100vh'}}>
//       <Navigation />

//       <div style={{ padding: '20px', marginLeft: "20px", width: "1550px" }}>
//         <div> 
//           <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: '600', marginTop: "50px", marginLeft:"130px"}}>
//             📦 Stock List
//           </h2>
          
//           {/* Summary Cards */}
//           <div style={{ 
//             marginLeft:"150px",
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             marginBottom: '20px',
//             gap: '15px'
//           }}>
//             <div style={{
//               flex: 1,
//               backgroundColor: '#e7f3ff',
//               padding: '15px',
//               borderRadius: '10px',
//               marginLeft:"60px",
//               textAlign: 'center',
//               border: '2px solid #007bff'
//             }}>
//               <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>Total Items</h4>
//               <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0056b3' }}>
//                 {stocks.length}
//               </p>
//             </div>
            
//             <div style={{
//               flex: 1,
//               backgroundColor: '#d4edda',
//               padding: '15px',
//               borderRadius: '10px',
//               textAlign: 'center',
//               border: '2px solid #28a745'
//             }}>
//               <h4 style={{ margin: '0 0 5px 0', color: '#155724' }}>Total Profit</h4>
//               <p style={{ 
//                 margin: 0, 
//                 fontSize: '24px', 
//                 fontWeight: 'bold', 
//                 color: getProfitColor(totalProfit) 
//               }}>
//                 ${totalProfit.toFixed(2)}
//               </p>
//             </div>
            
//             <div style={{
//               flex: 1,
//               backgroundColor: '#fff3cd',
//               padding: '15px',
//               borderRadius: '10px',
//               textAlign: 'center',
//               border: '2px solid #ffc107'
//             }}>
//               <h4 style={{ margin: '0 0 5px 0', color: '#856404' }}>Current Investment</h4>
//               <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>
//                 ${totalInvestment.toFixed(2)}
//               </p>
//             </div>
//           </div>

//           <Link to="/add-stock">
//             <button style={{ 
//               width: "160px", 
//               backgroundColor: "#28a745", 
//               color: "white", 
//               borderRadius: "5px", 
//               marginLeft: "1400px", 
//               padding: "10px", 
//               border: "none", 
//               cursor: "pointer",
//               fontWeight: 'bold',
//               marginBottom: '20px'
//             }}>
//               ➕ Add Stock
//             </button>
//           </Link>
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

//         {loading && (
//           <div style={{ textAlign: 'center', color: '#007bff', margin: '10px 0' }}>
//             ⏳ Loading...
//           </div>
//         )}

//         <div style={tableContainerStyle}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
//             <thead style={{ position: 'sticky', top: 0, background: '#2c3e50', zIndex: 10 }}>
//               <tr>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'left' }}>Product Name</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Shelf Location</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>In Stock</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Out Stock</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Current Stock</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Status</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Buying Price</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Selling Price</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Profit</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Margin</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stocks.map(stock => {
//                 const profit = calculateProfit(stock);
//                 const profitMargin = calculateProfitMargin(stock);
//                 const potentialProfit = calculatePotentialProfit(stock);
                
//                 return (
//                   <tr key={stock.stockId} style={{ borderBottom: '1px solid #ddd' }}>
//                     <td style={{ padding: '10px', fontWeight: '500' }}>
//                       {stock.product?.productName || 'N/A'}
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'center', fontSize: '12px' }}>
//                       {getShelfName(stock)}
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>{stock.inStock}</td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>{stock.outStock}</td>
//                     <td style={{ 
//                       padding: '10px', 
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: stock.currentStock === 0 ? 'red' : stock.currentStock < 10 ? 'orange' : 'green'
//                     }}>
//                       {stock.currentStock}
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>
//                       <span style={{
//                         padding: '4px 12px',
//                         borderRadius: '15px',
//                         fontSize: '12px',
//                         fontWeight: 'bold',
//                         ...getStatusStyle(stock.status)
//                       }}>
//                         {stock.status}
//                       </span>
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>
//                       Tsh{parseFloat(stock.latestPurchasePrice || 0).toFixed(2)}
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>
//                       Tsh{parseFloat(stock.sellingPrice || 0).toFixed(2)}
//                     </td>
//                     <td style={{ 
//                       padding: '10px', 
//                       textAlign: 'right', 
//                       fontFamily: 'monospace',
//                       fontWeight: 'bold',
//                       color: getProfitColor(profit)
//                     }}>
//                       Tsh{profit.toFixed(2)}
//                       {potentialProfit > 0 && (
//                         <div style={{ fontSize: '10px', color: '#6c757d' }}>
//                           +Tsh{potentialProfit.toFixed(2)} potential
//                         </div>
//                       )}
//                     </td>
//                     <td style={{ 
//                       padding: '10px', 
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: getMarginColor(profitMargin)
//                     }}>
//                       {profitMargin.toFixed(1)}%
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>
//                       <button
//                         onClick={() => handleEditOpen(stock)}
//                         style={{
//                           marginRight: '5px',
//                           borderRadius: '5px',
//                           padding: '6px 12px',
//                           backgroundColor: '#007bff',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer',
//                           fontSize: '12px'
//                         }}
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(stock.stockId)}
//                         style={{
//                           borderRadius: '5px',
//                           padding: '6px 12px',
//                           backgroundColor: '#dc3545',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer',
//                           fontSize: '12px'
//                         }}
//                       >
//                         🗑️ Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//               {stocks.length === 0 && !loading && (
//                 <tr>
//                   <td colSpan="11" style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '16px' }}>
//                     📭 No stock available. <Link to="/add-stock" style={{color: '#007bff'}}>Add some stock</Link> to get started.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Edit Modal */}
//         {isModalOpen && selectedStock && (
//           <div
//             style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               backgroundColor: 'rgba(0,0,0,0.5)',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               zIndex: 1000,
//             }}
//           >
//             <div style={{ 
//               background: 'white', 
//               padding: '25px', 
//               borderRadius: '15px', 
//               width: '450px', 
//               maxHeight: '90vh', 
//               overflowY: 'auto',
//               boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
//             }}>
//               <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
//                 ✏️ Update Stock
//               </h3>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Product:</label>
//                 <input
//                   type="text"
//                   value={selectedStock.product?.productName || 'N/A'}
//                   readOnly
//                   style={{...inputStyle, backgroundColor: '#e9ecef', color: '#6c757d' }}
//                 />
//               </div>

//               {/* ✅ Shelf Location Dropdown */}
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Shelf Location:</label>
//                 <select
//                   value={selectedStock.shelfId || ''}
//                   onChange={e => setSelectedStock({
//                     ...selectedStock,
//                     shelfId: e.target.value ? parseInt(e.target.value) : null
//                   })}
//                   style={inputStyle}
//                   disabled={loading}
//                 >
//                   <option value="">No Shelf Assigned</option>
//                   {shelves.map((shelf) => (
//                     <option key={shelf.id} value={shelf.id}>
//                       {shelf.shelfName} - {shelf.locationDescription}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>In Stock:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={selectedStock.inStock}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       inStock: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Out Stock:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={selectedStock.outStock}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       outStock: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Buying Price:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={selectedStock.latestPurchasePrice}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       latestPurchasePrice: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Selling Price:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={selectedStock.sellingPrice}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       sellingPrice: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Current Stock:</label>
//                 <input
//                   type="number"
//                   value={(selectedStock.inStock - selectedStock.outStock) || 0}
//                   readOnly
//                   style={{ 
//                     ...inputStyle, 
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: (selectedStock.inStock - selectedStock.outStock) === 0 ? 'red' : 'green'
//                   }}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Profit:</label>
//                 <input
//                   type="number"
//                   value={((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) * selectedStock.outStock).toFixed(2)}
//                   readOnly
//                   style={{ 
//                     ...inputStyle, 
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: getProfitColor((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) * selectedStock.outStock)
//                   }}
//                 />
//               </div>

//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Profit Margin:</label>
//                 <input
//                   type="text"
//                   value={selectedStock.latestPurchasePrice > 0 ? 
//                     `${(((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) / selectedStock.latestPurchasePrice) * 100).toFixed(1)}%` : 
//                     'N/A'
//                   }
//                   readOnly
//                   style={{ 
//                     ...inputStyle, 
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: getMarginColor(((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) / selectedStock.latestPurchasePrice) * 100)
//                   }}
//                 />
//               </div>

//               <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   disabled={loading}
//                   style={{
//                     marginRight: '10px',
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     backgroundColor: '#6c757d',
//                     color: 'white',
//                     cursor: loading ? 'not-allowed' : 'pointer',
//                     opacity: loading ? 0.6 : 1
//                   }}
//                 >
//                   ❌ Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdate}
//                   disabled={loading}
//                   style={{
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     backgroundColor: loading ? '#6c757d' : '#007bff',
//                     color: 'white',
//                     cursor: loading ? 'not-allowed' : 'pointer',
//                     opacity: loading ? 0.6 : 1
//                   }}
//                 >
//                   {loading ? '⏳ Updating...' : '✅ Update Stock'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Stock;

// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';
// import { Link } from 'react-router-dom';

// const Stock = () => {
//   const [stocks, setStocks] = useState([]);
//   const [shelves, setShelves] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [totalProfit, setTotalProfit] = useState(0);
//   const [totalInvestment, setTotalInvestment] = useState(0);

//   // Fetch all stocks
//   const fetchStocks = () => {
//     setLoading(true);
//     fetch('http://localhost:8080/api/stocks/all-stocks')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch stocks');
//         return res.json();
//       })
//       .then(data => {
//         console.log('Fetched stocks:', data); // Debug log
//         setStocks(data);
//         setError(null);
//         calculateTotals(data);
//       })
//       .catch(err => {
//         setError('❌ ' + err.message);
//         console.error('Fetch stocks error:', err);
//       })
//       .finally(() => setLoading(false));
//   };

//   // ✅ FIXED: Fetch shelves using consistent shelfId field
//   const fetchShelves = () => {
//     fetch('http://localhost:8080/api/stocks/available-shelves')
//       .then(res => {
//         if (!res.ok) throw new Error('Failed to fetch shelves');
//         return res.json();
//       })
//       .then(data => {
//         console.log('Fetched shelves:', data); // Debug log
//         setShelves(data);
//       })
//       .catch(err => {
//         console.error('Fetch shelves error:', err);
//         setError('❌ Failed to load shelves');
//       });
//   };

//   useEffect(() => {
//     fetchStocks();
//     fetchShelves();
//   }, []);

//   // Calculate total profit and investment
//   const calculateTotals = (stocksData) => {
//     let profit = 0;
//     let investment = 0;

//     stocksData.forEach(stock => {
//       const stockProfit = calculateProfit(stock);
//       profit += stockProfit;
      
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const currentStock = parseInt(stock.currentStock) || 0;
//       investment += buyingPrice * currentStock;
//     });

//     setTotalProfit(profit);
//     setTotalInvestment(investment);
//   };

//   // Delete stock
//   const handleDelete = (id) => {
//     if (!window.confirm('Are you sure you want to delete this stock?')) return;
    
//     fetch(`http://localhost:8080/api/stocks/${id}`, { method: 'DELETE' })
//       .then(res => { 
//         if (!res.ok) throw new Error(`Error: ${res.status}`); 
//         fetchStocks(); 
//       })
//       .catch(err => {
//         setError('❌ Failed to delete stock: ' + err.message);
//         console.error('Delete stock error:', err);
//       });
//   };

//   // ✅ FIXED: Open modal with consistent shelfId field
//   const handleEditOpen = (stock) => {
//     console.log('Editing stock:', stock); // Debug log
    
//     setSelectedStock({ 
//       ...stock,
//       inStock: stock.inStock || 0,
//       outStock: stock.outStock || 0,
//       latestPurchasePrice: stock.latestPurchasePrice || 0,
//       sellingPrice: stock.sellingPrice || 0,
//       // ✅ FIX: Use shelfId from shelf object (consistent field name)
//       shelfId: stock.shelf ? stock.shelf.shelfId : null
//     });
//     setIsModalOpen(true);
//   };

//   // ✅ FIXED: Update stock with proper shelf handling - don't default to shelf 2
//   const handleUpdate = () => {
//     if (!selectedStock) return;

//     setLoading(true);
    
//     // Calculate current stock based on input
//     const currentStockCalc = (parseInt(selectedStock.inStock) || 0) - (parseInt(selectedStock.outStock) || 0);
    
//     // ✅ FIXED: Only include shelf if explicitly selected, otherwise send null
//     const shelfData = selectedStock.shelfId ? { shelfId: selectedStock.shelfId } : null;
    
//     const updatedStock = {
//       stockId: selectedStock.stockId,
//       product: selectedStock.product,
//       inStock: parseInt(selectedStock.inStock) || 0,
//       outStock: parseInt(selectedStock.outStock) || 0,
//       currentStock: currentStockCalc,
//       latestPurchasePrice: parseFloat(selectedStock.latestPurchasePrice) || 0,
//       sellingPrice: parseFloat(selectedStock.sellingPrice) || 0,
//       // ✅ FIXED: Send null if no shelf is selected to prevent default assignment
//       shelf: shelfData,
//       status: currentStockCalc === 0 ? 'Sold Out' : 
//               (selectedStock.outStock > 0 ? 'Partially Sold' : 'In Stock')
//     };

//     console.log('Sending update with shelf:', updatedStock.shelf);

//     fetch(`http://localhost:8080/api/stocks/update/${selectedStock.stockId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(updatedStock)
//     })
//       .then(async (res) => {
//         if (!res.ok) {
//           const errorText = await res.text();
//           throw new Error(errorText || `Error: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log('Update successful:', data);
//         setIsModalOpen(false);
//         setSelectedStock(null);
//         fetchStocks(); // Refresh the list
//         setError(null);
//       })
//       .catch(err => {
//         console.error('Update stock error:', err);
//         setError('❌ Failed to update stock: ' + err.message);
//       })
//       .finally(() => setLoading(false));
//   };

//   // ✅ NEW: Function to remove default shelf from existing stocks
//   const removeDefaultShelves = () => {
//     if (!window.confirm('This will remove shelf assignments from all stocks that have shelf 2. Continue?')) return;
    
//     setLoading(true);
//     fetch('http://localhost:8080/api/stocks/remove-default-shelves', {
//       method: 'POST'
//     })
//       .then(async (res) => {
//         if (!res.ok) {
//           const errorText = await res.text();
//           throw new Error(errorText || `Error: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then((data) => {
//         console.log('Remove default shelves successful:', data);
//         fetchStocks(); // Refresh the list
//         setError(null);
//         alert(`✅ ${data.message}`);
//       })
//       .catch(err => {
//         console.error('Remove default shelves error:', err);
//         setError('❌ Failed to remove default shelves: ' + err.message);
//       })
//       .finally(() => setLoading(false));
//   };

//   // Enhanced profit calculation with better error handling
//   const calculateProfit = (stock) => {
//     try {
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const sellingPrice = parseFloat(stock.sellingPrice) || 0;
//       const quantitySold = parseInt(stock.outStock) || 0;
      
//       if (stock.profit !== undefined && stock.profit !== null) {
//         return parseFloat(stock.profit) || 0;
//       }
      
//       const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
//       return profitPerUnit * quantitySold;
//     } catch (error) {
//       console.error('Error calculating profit for stock:', stock.stockId, error);
//       return 0;
//     }
//   };

//   // Calculate profit margin percentage
//   const calculateProfitMargin = (stock) => {
//     try {
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const sellingPrice = parseFloat(stock.sellingPrice) || 0;
      
//       if (buyingPrice <= 0) return 0;
      
//       const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
//       return Math.max(0, margin);
//     } catch (error) {
//       return 0;
//     }
//   };

//   // Calculate potential profit for remaining stock
//   const calculatePotentialProfit = (stock) => {
//     try {
//       const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
//       const sellingPrice = parseFloat(stock.sellingPrice) || 0;
//       const currentStock = parseInt(stock.currentStock) || 0;
      
//       const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
//       return profitPerUnit * currentStock;
//     } catch (error) {
//       return 0;
//     }
//   };

//   // ✅ FIXED: Get shelf name for display with consistent shelfId field
//   const getShelfName = (stock) => {
//     if (!stock.shelf) return 'No Shelf Assigned';
//     return `${stock.shelf.shelfName} - ${stock.shelf.locationDescription}`;
//   };

//   // Count stocks with shelf 2 (default shelf)
//   const countStocksWithDefaultShelf = () => {
//     return stocks.filter(stock => stock.shelf && stock.shelf.shelfId === 2).length;
//   };

//   const tableContainerStyle = {
//     maxWidth: '1535px',
//     margin: '20px auto',
//     background: 'white',
//     padding: '25px',
//     borderRadius: '15px',
//     marginLeft: "200px",
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

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Sold Out':
//         return { backgroundColor: '#f8d7da', color: '#721c24' };
//       case 'Partially Sold':
//         return { backgroundColor: '#fff3cd', color: '#856404' };
//       case 'In Stock':
//         return { backgroundColor: '#d4edda', color: '#155724' };
//       default:
//         return { backgroundColor: '#e9ecef', color: '#495057' };
//     }
//   };

//   const getProfitColor = (profit) => {
//     if (profit > 0) return '#28a745';
//     if (profit < 0) return '#dc3545';
//     return '#6c757d';
//   };

//   const getMarginColor = (margin) => {
//     if (margin > 50) return '#e20d0dff';
//     if (margin > 20) return '#17a2b8';
//     if (margin > 0) return '#ffc107';
//     return '#dc3545';
//   };

//   return (
//     <div style={{ background: '#f4f6f9', minHeight: '100vh'}}>
//       <Navigation />

//       <div style={{ padding: '20px', marginLeft: "20px", width: "1550px" }}>
//         <div> 
//           <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: '600', marginTop: "50px", marginLeft:"130px"}}>
//             📦 Stock List
//           </h2>
          
//           {/* Summary Cards */}
//           <div style={{ 
//             marginLeft:"150px",
//             display: 'flex', 
//             justifyContent: 'space-between', 
//             marginBottom: '20px',
//             gap: '15px'
//           }}>
//             <div style={{
//               flex: 1,
//               backgroundColor: '#e7f3ff',
//               padding: '15px',
//               borderRadius: '10px',
//               marginLeft:"60px",
//               textAlign: 'center',
//               border: '2px solid #007bff'
//             }}>
//               <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>Total Items</h4>
//               <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0056b3' }}>
//                 {stocks.length}
//               </p>
//             </div>
            
//             <div style={{
//               flex: 1,
//               backgroundColor: '#d4edda',
//               padding: '15px',
//               borderRadius: '10px',
//               textAlign: 'center',
//               border: '2px solid #28a745'
//             }}>
//               <h4 style={{ margin: '0 0 5px 0', color: '#155724' }}>Total Profit</h4>
//               <p style={{ 
//                 margin: 0, 
//                 fontSize: '24px', 
//                 fontWeight: 'bold', 
//                 color: getProfitColor(totalProfit) 
//               }}>
//                 Tsh{totalProfit.toFixed(2)}
//               </p>
//             </div>
            
//             <div style={{
//               flex: 1,
//               backgroundColor: '#fff3cd',
//               padding: '15px',
//               borderRadius: '10px',
//               textAlign: 'center',
//               border: '2px solid #ffc107'
//             }}>
//               <h4 style={{ margin: '0 0 5px 0', color: '#856404' }}>Current Investment</h4>
//               <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>
//                 Tsh{totalInvestment.toFixed(2)}
//               </p>
//             </div>
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px', marginLeft: "1400px" }}>
//             {/* ✅ NEW: Button to remove default shelf assignments */}
//             {countStocksWithDefaultShelf() > 0 && (
//               <button
//                 onClick={removeDefaultShelves}
//                 style={{
//                   width: "220px",
//                   backgroundColor: "#ffc107",
//                   color: "black",
//                   borderRadius: "5px",
//                   padding: "10px",
//                   border: "none",
//                   cursor: "pointer",
//                   fontWeight: 'bold',
//                   fontSize: '12px'
//                 }}
//                 title={`Remove default shelf from ${countStocksWithDefaultShelf()} stocks`}
//               >
//                 🗑️ Remove Default Shelves ({countStocksWithDefaultShelf()})
//               </button>
//             )}
            
//             <Link to="/add-stock">
//               <button style={{ 
//                 width: "160px", 
//                 backgroundColor: "#28a745", 
//                 color: "white", 
//                 borderRadius: "5px", 
//                 padding: "10px", 
//                 border: "none", 
//                 cursor: "pointer",
//                 fontWeight: 'bold'
//               }}>
//                 ➕ Add Stock
//               </button>
//             </Link>
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

//         {loading && (
//           <div style={{ textAlign: 'center', color: '#007bff', margin: '10px 0' }}>
//             ⏳ Loading...
//           </div>
//         )}

//         <div style={tableContainerStyle}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
//             <thead style={{ position: 'sticky', top: 0, background: '#2c3e50', zIndex: 10 }}>
//               <tr>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'left' }}>Product Name</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Shelf Location</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>In Stock</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Out Stock</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Current Stock</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Status</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Buying Price</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Selling Price</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Profit</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Margin</th>
//                 <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {stocks.map(stock => {
//                 const profit = calculateProfit(stock);
//                 const profitMargin = calculateProfitMargin(stock);
//                 const potentialProfit = calculatePotentialProfit(stock);
                
//                 return (
//                   <tr key={stock.stockId} style={{ borderBottom: '1px solid #ddd' }}>
//                     <td style={{ padding: '10px', fontWeight: '500' }}>
//                       {stock.product?.productName || 'N/A'}
//                     </td>
//                     <td style={{ 
//                       padding: '10px', 
//                       textAlign: 'center', 
//                       fontSize: '12px',
//                       backgroundColor: !stock.shelf ? '#f8f9fa' : 'transparent',
//                       color: !stock.shelf ? '#6c757d' : 'inherit'
//                     }}>
//                       {getShelfName(stock)}
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>{stock.inStock}</td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>{stock.outStock}</td>
//                     <td style={{ 
//                       padding: '10px', 
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: stock.currentStock === 0 ? 'red' : stock.currentStock < 10 ? 'orange' : 'green'
//                     }}>
//                       {stock.currentStock}
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>
//                       <span style={{
//                         padding: '4px 12px',
//                         borderRadius: '15px',
//                         fontSize: '12px',
//                         fontWeight: 'bold',
//                         ...getStatusStyle(stock.status)
//                       }}>
//                         {stock.status}
//                       </span>
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>
//                       Tsh{parseFloat(stock.latestPurchasePrice || 0).toFixed(2)}
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>
//                       Tsh{parseFloat(stock.sellingPrice || 0).toFixed(2)}
//                     </td>
//                     <td style={{ 
//                       padding: '10px', 
//                       textAlign: 'right', 
//                       fontFamily: 'monospace',
//                       fontWeight: 'bold',
//                       color: getProfitColor(profit)
//                     }}>
//                       Tsh{profit.toFixed(2)}
//                       {potentialProfit > 0 && (
//                         <div style={{ fontSize: '10px', color: '#6c757d' }}>
//                           +Tsh{potentialProfit.toFixed(2)} potential
//                         </div>
//                       )}
//                     </td>
//                     <td style={{ 
//                       padding: '10px', 
//                       textAlign: 'center',
//                       fontWeight: 'bold',
//                       color: getMarginColor(profitMargin)
//                     }}>
//                       {profitMargin.toFixed(1)}%
//                     </td>
//                     <td style={{ padding: '10px', textAlign: 'center' }}>
//                       <button
//                         onClick={() => handleEditOpen(stock)}
//                         style={{
//                           marginRight: '5px',
//                           borderRadius: '5px',
//                           padding: '6px 12px',
//                           backgroundColor: '#007bff',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer',
//                           fontSize: '12px'
//                         }}
//                       >
//                         ✏️ Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(stock.stockId)}
//                         style={{
//                           borderRadius: '5px',
//                           padding: '6px 12px',
//                           backgroundColor: '#dc3545',
//                           color: 'white',
//                           border: 'none',
//                           cursor: 'pointer',
//                           fontSize: '12px'
//                         }}
//                       >
//                         🗑️ Delete
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//               {stocks.length === 0 && !loading && (
//                 <tr>
//                   <td colSpan="11" style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '16px' }}>
//                     📭 No stock available. <Link to="/add-stock" style={{color: '#007bff'}}>Add some stock</Link> to get started.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Edit Modal */}
//         {isModalOpen && selectedStock && (
//           <div
//             style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               width: '100%',
//               height: '100%',
//               backgroundColor: 'rgba(0,0,0,0.5)',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               zIndex: 1000,
//             }}
//           >
//             <div style={{ 
//               background: 'white', 
//               padding: '25px', 
//               borderRadius: '15px', 
//               width: '450px', 
//               maxHeight: '90vh', 
//               overflowY: 'auto',
//               boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
//             }}>
//               <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
//                 ✏️ Update Stock
//               </h3>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Product:</label>
//                 <input
//                   type="text"
//                   value={selectedStock.product?.productName || 'N/A'}
//                   readOnly
//                   style={{...inputStyle, backgroundColor: '#e9ecef', color: '#6c757d' }}
//                 />
//               </div>

//               {/* ✅ FIXED: Shelf Location Dropdown with consistent shelfId field */}
//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Shelf Location:</label>
//                 <select
//                   value={selectedStock.shelfId || ''}
//                   onChange={e => setSelectedStock({
//                     ...selectedStock,
//                     shelfId: e.target.value ? parseInt(e.target.value) : null
//                   })}
//                   style={inputStyle}
//                   disabled={loading}
//                 >
//                   <option value="">No Shelf Assigned</option>
//                   {shelves.map((shelf) => (
//                     <option key={shelf.shelfId} value={shelf.shelfId}>
//                       {shelf.shelfName} - {shelf.locationDescription}
//                     </option>
//                   ))}
//                 </select>
//                 <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
//                   ℹ️ Leave empty for no shelf assignment
//                 </div>
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>In Stock:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={selectedStock.inStock}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       inStock: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Out Stock:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   value={selectedStock.outStock}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       outStock: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Buying Price:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={selectedStock.latestPurchasePrice}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       latestPurchasePrice: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Selling Price:</label>
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={selectedStock.sellingPrice}
//                   onChange={e =>
//                     setSelectedStock({
//                       ...selectedStock,
//                       sellingPrice: e.target.value
//                     })
//                   }
//                   style={inputStyle}
//                   disabled={loading}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Current Stock:</label>
//                 <input
//                   type="number"
//                   value={(selectedStock.inStock - selectedStock.outStock) || 0}
//                   readOnly
//                   style={{ 
//                     ...inputStyle, 
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: (selectedStock.inStock - selectedStock.outStock) === 0 ? 'red' : 'green'
//                   }}
//                 />
//               </div>

//               <div style={{ marginBottom: '15px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Profit:</label>
//                 <input
//                   type="number"
//                   value={((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) * selectedStock.outStock).toFixed(2)}
//                   readOnly
//                   style={{ 
//                     ...inputStyle, 
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: getProfitColor((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) * selectedStock.outStock)
//                   }}
//                 />
//               </div>

//               <div style={{ marginBottom: '20px' }}>
//                 <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Profit Margin:</label>
//                 <input
//                   type="text"
//                   value={selectedStock.latestPurchasePrice > 0 ? 
//                     `${(((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) / selectedStock.latestPurchasePrice) * 100).toFixed(1)}%` : 
//                     'N/A'
//                   }
//                   readOnly
//                   style={{ 
//                     ...inputStyle, 
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: getMarginColor(((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) / selectedStock.latestPurchasePrice) * 100)
//                   }}
//                 />
//               </div>

//               <div style={{ textAlign: 'center', marginTop: '20px' }}>
//                 <button
//                   onClick={() => setIsModalOpen(false)}
//                   disabled={loading}
//                   style={{
//                     marginRight: '10px',
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     backgroundColor: '#6c757d',
//                     color: 'white',
//                     cursor: loading ? 'not-allowed' : 'pointer',
//                     opacity: loading ? 0.6 : 1
//                   }}
//                 >
//                   ❌ Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdate}
//                   disabled={loading}
//                   style={{
//                     padding: '10px 20px',
//                     borderRadius: '8px',
//                     border: 'none',
//                     backgroundColor: loading ? '#6c757d' : '#007bff',
//                     color: 'white',
//                     cursor: loading ? 'not-allowed' : 'pointer',
//                     opacity: loading ? 0.6 : 1
//                   }}
//                 >
//                   {loading ? '⏳ Updating...' : '✅ Update Stock'}
//                 </button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Stock;

import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/Navigation';
import { Link } from 'react-router-dom';

const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [products, setProducts] = useState([]); // Added products state
  const [error, setError] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [totalProfit, setTotalProfit] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);

  // Fetch all stocks
  const fetchStocks = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/stocks/all-stocks')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch stocks');
        return res.json();
      })
      .then(data => {
        console.log('Fetched stocks:', data); // Debug log
        setStocks(data);
        setError(null);
        calculateTotals(data);
      })
      .catch(err => {
        setError('❌ ' + err.message);
        console.error('Fetch stocks error:', err);
      })
      .finally(() => setLoading(false));
  };

  // ✅ UPDATED: Fetch products to get shelf information
  const fetchProducts = () => {
    fetch('http://localhost:8080/api/product/get/product')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then(data => {
        console.log('Fetched products:', data); // Debug log
        setProducts(data);
      })
      .catch(err => {
        console.error('Fetch products error:', err);
        setError('❌ Failed to load products');
      });
  };

  useEffect(() => {
    fetchStocks();
    fetchProducts(); // Fetch products instead of shelves
  }, []);

  // Calculate total profit and investment
  const calculateTotals = (stocksData) => {
    let profit = 0;
    let investment = 0;

    stocksData.forEach(stock => {
      const stockProfit = calculateProfit(stock);
      profit += stockProfit;
      
      const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
      const currentStock = parseInt(stock.currentStock) || 0;
      investment += buyingPrice * currentStock;
    });

    setTotalProfit(profit);
    setTotalInvestment(investment);
  };

  // Delete stock
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this stock?')) return;
    
    fetch(`http://localhost:8080/api/stocks/${id}`, { method: 'DELETE' })
      .then(res => { 
        if (!res.ok) throw new Error(`Error: ${res.status}`); 
        fetchStocks(); 
      })
      .catch(err => {
        setError('❌ Failed to delete stock: ' + err.message);
        console.error('Delete stock error:', err);
      });
  };

  // ✅ UPDATED: Open modal with product shelf data
  const handleEditOpen = (stock) => {
    console.log('Editing stock:', stock); // Debug log
    
    // Find the corresponding product to get shelf information
    const product = products.find(p => p.productId === stock.product?.productId);
    
    setSelectedStock({ 
      ...stock,
      inStock: stock.inStock || 0,
      outStock: stock.outStock || 0,
      latestPurchasePrice: stock.latestPurchasePrice || 0,
      sellingPrice: stock.sellingPrice || 0,
      // ✅ Get shelf information from product
      productShelf: product?.shelf || null
    });
    setIsModalOpen(true);
  };

  // ✅ UPDATED: Update stock - shelf info is now read-only from product
  const handleUpdate = () => {
    if (!selectedStock) return;

    setLoading(true);
    
    // Calculate current stock based on input
    const currentStockCalc = (parseInt(selectedStock.inStock) || 0) - (parseInt(selectedStock.outStock) || 0);
    
    const updatedStock = {
      stockId: selectedStock.stockId,
      product: selectedStock.product,
      inStock: parseInt(selectedStock.inStock) || 0,
      outStock: parseInt(selectedStock.outStock) || 0,
      currentStock: currentStockCalc,
      latestPurchasePrice: parseFloat(selectedStock.latestPurchasePrice) || 0,
      sellingPrice: parseFloat(selectedStock.sellingPrice) || 0,
      // ✅ Shelf information is not updated here as it comes from product table
      status: currentStockCalc === 0 ? 'Sold Out' : 
              (selectedStock.outStock > 0 ? 'Partially Sold' : 'In Stock')
    };

    console.log('Sending update:', updatedStock);

    fetch(`http://localhost:8080/api/stocks/update/${selectedStock.stockId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStock)
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || `Error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Update successful:', data);
        setIsModalOpen(false);
        setSelectedStock(null);
        fetchStocks(); // Refresh the list
        setError(null);
      })
      .catch(err => {
        console.error('Update stock error:', err);
        setError('❌ Failed to update stock: ' + err.message);
      })
      .finally(() => setLoading(false));
  };

  // ✅ UPDATED: Get shelf name from product data
  const getShelfName = (stock) => {
    // Find the product that matches this stock
    const product = products.find(p => p.productId === stock.product?.productId);
    
    if (!product || !product.shelf) return 'No Shelf Assigned';
    
    return `${product.shelf.shelfName} - ${product.shelf.locationDescription}`;
  };

  // ✅ UPDATED: Get unique shelves from products
  const getUniqueShelves = () => {
    const shelfMap = new Map();
    
    products.forEach(product => {
      if (product.shelf && product.shelf.shelfId) {
        shelfMap.set(product.shelf.shelfId, product.shelf);
      }
    });
    
    return Array.from(shelfMap.values());
  };

  // Enhanced profit calculation with better error handling
  const calculateProfit = (stock) => {
    try {
      const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
      const sellingPrice = parseFloat(stock.sellingPrice) || 0;
      const quantitySold = parseInt(stock.outStock) || 0;
      
      if (stock.profit !== undefined && stock.profit !== null) {
        return parseFloat(stock.profit) || 0;
      }
      
      const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
      return profitPerUnit * quantitySold;
    } catch (error) {
      console.error('Error calculating profit for stock:', stock.stockId, error);
      return 0;
    }
  };

  // Calculate profit margin percentage
  const calculateProfitMargin = (stock) => {
    try {
      const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
      const sellingPrice = parseFloat(stock.sellingPrice) || 0;
      
      if (buyingPrice <= 0) return 0;
      
      const margin = ((sellingPrice - buyingPrice) / buyingPrice) * 100;
      return Math.max(0, margin);
    } catch (error) {
      return 0;
    }
  };

  // Calculate potential profit for remaining stock
  const calculatePotentialProfit = (stock) => {
    try {
      const buyingPrice = parseFloat(stock.latestPurchasePrice) || 0;
      const sellingPrice = parseFloat(stock.sellingPrice) || 0;
      const currentStock = parseInt(stock.currentStock) || 0;
      
      const profitPerUnit = Math.max(0, sellingPrice - buyingPrice);
      return profitPerUnit * currentStock;
    } catch (error) {
      return 0;
    }
  };

  const tableContainerStyle = {
    maxWidth: '1535px',
    margin: '20px auto',
    background: 'white',
    padding: '25px',
    borderRadius: '15px',
    marginLeft: "200px",
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    maxHeight: '450px',
    overflowY: 'auto',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '15px',
    fontSize: '14px'
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Sold Out':
        return { backgroundColor: '#f8d7da', color: '#721c24' };
      case 'Partially Sold':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'In Stock':
        return { backgroundColor: '#d4edda', color: '#155724' };
      default:
        return { backgroundColor: '#e9ecef', color: '#495057' };
    }
  };

  const getProfitColor = (profit) => {
    if (profit > 0) return '#28a745';
    if (profit < 0) return '#dc3545';
    return '#6c757d';
  };

  const getMarginColor = (margin) => {
    if (margin > 50) return '#e20d0dff';
    if (margin > 20) return '#17a2b8';
    if (margin > 0) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh'}}>
      <Navigation />

      <div style={{ padding: '20px', marginLeft: "20px", width: "1550px" }}>
        <div> 
          <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: '600', marginTop: "50px", marginLeft:"130px"}}>
            📦 Stock List
          </h2>
          
          {/* Summary Cards */}
          <div style={{ 
            marginLeft:"150px",
            display: 'flex', 
            justifyContent: 'space-between', 
            marginBottom: '20px',
            gap: '15px'
          }}>
            <div style={{
              flex: 1,
              backgroundColor: '#e7f3ff',
              padding: '15px',
              borderRadius: '10px',
              marginLeft:"60px",
              textAlign: 'center',
              border: '2px solid #007bff'
            }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#007bff' }}>Total Items</h4>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#0056b3' }}>
                {stocks.length}
              </p>
            </div>
            
            <div style={{
              flex: 1,
              backgroundColor: '#d4edda',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #28a745'
            }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#155724' }}>Total Profit</h4>
              <p style={{ 
                margin: 0, 
                fontSize: '24px', 
                fontWeight: 'bold', 
                color: getProfitColor(totalProfit) 
              }}>
                Tsh{totalProfit.toFixed(2)}
              </p>
            </div>
            
            <div style={{
              flex: 1,
              backgroundColor: '#fff3cd',
              padding: '15px',
              borderRadius: '10px',
              textAlign: 'center',
              border: '2px solid #ffc107'
            }}>
              <h4 style={{ margin: '0 0 5px 0', color: '#856404' }}>Current Investment</h4>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#856404' }}>
                Tsh{totalInvestment.toFixed(2)}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginBottom: '20px', marginLeft: "1400px" }}>
            <Link to="/add-stock">
              <button style={{ 
                width: "160px", 
                backgroundColor: "#28a745", 
                color: "white", 
                borderRadius: "5px", 
                padding: "10px", 
                border: "none", 
                cursor: "pointer",
                fontWeight: 'bold'
              }}>
                ➕ Add Stock
              </button>
            </Link>
          </div>
        </div>

        {error && (
          <div style={{ 
            color: 'red', 
            textAlign: 'center', 
            backgroundColor: '#f8d7da',
            padding: '10px',
            borderRadius: '5px',
            margin: '10px auto',
            maxWidth: '500px'
          }}>
            {error}
          </div>
        )}

        {loading && (
          <div style={{ textAlign: 'center', color: '#007bff', margin: '10px 0' }}>
            ⏳ Loading...
          </div>
        )}

        <div style={tableContainerStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#2c3e50', zIndex: 10 }}>
              <tr>
                <th style={{ padding: '12px', color: 'black', textAlign: 'left' }}>Product Name</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Shelf Location</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>In Stock</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Out Stock</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Current Stock</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Buying Price</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Selling Price</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'right' }}>Profit</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Margin</th>
                <th style={{ padding: '12px', color: 'black', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(stock => {
                const profit = calculateProfit(stock);
                const profitMargin = calculateProfitMargin(stock);
                const potentialProfit = calculatePotentialProfit(stock);
                
                return (
                  <tr key={stock.stockId} style={{ borderBottom: '1px solid #ddd' }}>
                    <td style={{ padding: '10px', fontWeight: '500' }}>
                      {stock.product?.productName || 'N/A'}
                    </td>
                    <td style={{ 
                      padding: '10px', 
                      textAlign: 'center', 
                      fontSize: '12px',
                      backgroundColor: !getShelfName(stock).includes('No Shelf') ? 'transparent' : '#f8f9fa',
                      color: !getShelfName(stock).includes('No Shelf') ? 'inherit' : '#6c757d'
                    }}>
                      {getShelfName(stock)}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{stock.inStock}</td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>{stock.outStock}</td>
                    <td style={{ 
                      padding: '10px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: stock.currentStock === 0 ? 'red' : stock.currentStock < 10 ? 'orange' : 'green'
                    }}>
                      {stock.currentStock}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 12px',
                        borderRadius: '15px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        ...getStatusStyle(stock.status)
                      }}>
                        {stock.status}
                      </span>
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>
                      Tsh{parseFloat(stock.latestPurchasePrice || 0).toFixed(2)}
                    </td>
                    <td style={{ padding: '10px', textAlign: 'right', fontFamily: 'monospace' }}>
                      Tsh{parseFloat(stock.sellingPrice || 0).toFixed(2)}
                    </td>
                    <td style={{ 
                      padding: '10px', 
                      textAlign: 'right', 
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      color: getProfitColor(profit)
                    }}>
                      Tsh{profit.toFixed(2)}
                      {potentialProfit > 0 && (
                        <div style={{ fontSize: '10px', color: '#6c757d' }}>
                          +Tsh{potentialProfit.toFixed(2)} potential
                        </div>
                      )}
                    </td>
                    <td style={{ 
                      padding: '10px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: getMarginColor(profitMargin)
                    }}>
                      {profitMargin.toFixed(1)}%
                    </td>
                    <td style={{ padding: '10px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleEditOpen(stock)}
                        style={{
                          marginRight: '5px',
                          borderRadius: '5px',
                          padding: '6px 12px',
                          backgroundColor: '#007bff',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(stock.stockId)}
                        style={{
                          borderRadius: '5px',
                          padding: '6px 12px',
                          backgroundColor: '#dc3545',
                          color: 'white',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '12px'
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              {stocks.length === 0 && !loading && (
                <tr>
                  <td colSpan="11" style={{ padding: '20px', textAlign: 'center', color: '#6c757d', fontSize: '16px' }}>
                    📭 No stock available. <Link to="/add-stock" style={{color: '#007bff'}}>Add some stock</Link> to get started.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isModalOpen && selectedStock && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{ 
              background: 'white', 
              padding: '25px', 
              borderRadius: '15px', 
              width: '450px', 
              maxHeight: '90vh', 
              overflowY: 'auto',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}>
              <h3 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>
                ✏️ Update Stock
              </h3>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Product:</label>
                <input
                  type="text"
                  value={selectedStock.product?.productName || 'N/A'}
                  readOnly
                  style={{...inputStyle, backgroundColor: '#e9ecef', color: '#6c757d' }}
                />
              </div>

              {/* ✅ UPDATED: Shelf Location (Read-only from product) */}
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Shelf Location:</label>
                <input
                  type="text"
                  value={selectedStock.productShelf ? 
                    `${selectedStock.productShelf.shelfName} - ${selectedStock.productShelf.locationDescription}` : 
                    'No Shelf Assigned'
                  }
                  readOnly
                  style={{...inputStyle, backgroundColor: '#e9ecef', color: '#6c757d' }}
                />
                <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '5px' }}>
                  ℹ️ Shelf information is managed in Product Management
                </div>
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>In Stock:</label>
                <input
                  type="number"
                  min="0"
                  value={selectedStock.inStock}
                  onChange={e =>
                    setSelectedStock({
                      ...selectedStock,
                      inStock: e.target.value
                    })
                  }
                  style={inputStyle}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Out Stock:</label>
                <input
                  type="number"
                  min="0"
                  value={selectedStock.outStock}
                  onChange={e =>
                    setSelectedStock({
                      ...selectedStock,
                      outStock: e.target.value
                    })
                  }
                  style={inputStyle}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Buying Price:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={selectedStock.latestPurchasePrice}
                  onChange={e =>
                    setSelectedStock({
                      ...selectedStock,
                      latestPurchasePrice: e.target.value
                    })
                  }
                  style={inputStyle}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Selling Price:</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={selectedStock.sellingPrice}
                  onChange={e =>
                    setSelectedStock({
                      ...selectedStock,
                      sellingPrice: e.target.value
                    })
                  }
                  style={inputStyle}
                  disabled={loading}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Current Stock:</label>
                <input
                  type="number"
                  value={(selectedStock.inStock - selectedStock.outStock) || 0}
                  readOnly
                  style={{ 
                    ...inputStyle, 
                    backgroundColor: '#e9ecef',
                    fontWeight: 'bold',
                    color: (selectedStock.inStock - selectedStock.outStock) === 0 ? 'red' : 'green'
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Profit:</label>
                <input
                  type="number"
                  value={((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) * selectedStock.outStock).toFixed(2)}
                  readOnly
                  style={{ 
                    ...inputStyle, 
                    backgroundColor: '#e9ecef',
                    fontWeight: 'bold',
                    color: getProfitColor((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) * selectedStock.outStock)
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '5px', color: '#495057' }}>Profit Margin:</label>
                <input
                  type="text"
                  value={selectedStock.latestPurchasePrice > 0 ? 
                    `${(((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) / selectedStock.latestPurchasePrice) * 100).toFixed(1)}%` : 
                    'N/A'
                  }
                  readOnly
                  style={{ 
                    ...inputStyle, 
                    backgroundColor: '#e9ecef',
                    fontWeight: 'bold',
                    color: getMarginColor(((selectedStock.sellingPrice - selectedStock.latestPurchasePrice) / selectedStock.latestPurchasePrice) * 100)
                  }}
                />
              </div>

              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  disabled={loading}
                  style={{
                    marginRight: '10px',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#6c757d',
                    color: 'white',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  ❌ Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: loading ? '#6c757d' : '#007bff',
                    color: 'white',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.6 : 1
                  }}
                >
                  {loading ? '⏳ Updating...' : '✅ Update Stock'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stock;