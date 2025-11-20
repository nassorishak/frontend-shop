// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddStock = () => {
//   const [productId, setProductId] = useState('');
//   const [inStock, setInStock] = useState('');
//   const [outStock, setOutStock] = useState('');
//   const [currentStock, setCurrentStock] = useState(0);
//   const [status, setStatus] = useState('In Stock');
//   const [buyingPrice, setBuyingPrice] = useState('');
//   const [sellingPrice, setSellingPrice] = useState('');
//   const [products, setProducts] = useState([]);
//   const [existingStock, setExistingStock] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [fetchingStock, setFetchingStock] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch products
//   useEffect(() => {
//     fetch('http://localhost:8080/api/product/get/product')
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch products');
//         return res.json();
//       })
//       .then((data) => setProducts(data))
//       .catch((err) => setError('❌ ' + err.message));
//   }, []);

//   // Fetch existing stock data when product is selected
//   useEffect(() => {
//     const fetchExistingStock = async () => {
//       if (!productId) {
//         resetStockFields();
//         return;
//       }

//       setFetchingStock(true);
//       setError(null);
      
//       try {
//         console.log('Fetching stock for product ID:', productId);
        
//         // Try multiple possible endpoints
//         const endpoints = [
//           `http://localhost:8080/api/stocks/get-stocks-by-product/${productId}`,
//           `http://localhost:8080/api/stocks/product/${productId}`,
//           `http://localhost:8080/api/stocks/${productId}`,
//           `http://localhost:8080/api/stocks?productId=${productId}`
//         ];

//         let stockData = null;
        
//         for (const endpoint of endpoints) {
//           try {
//             console.log('Trying endpoint:', endpoint);
//             const response = await fetch(endpoint);
            
//             if (response.ok) {
//               const data = await response.json();
//               console.log('Stock data received:', data);
              
//               if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
//                 stockData = data;
//                 break;
//               }
//             }
//           } catch (err) {
//             console.log(`Endpoint ${endpoint} failed:`, err.message);
//             continue;
//           }
//         }

//         if (stockData) {
//           setExistingStock(stockData);
          
//           // Handle different response formats
//           let stockEntry;
//           if (Array.isArray(stockData)) {
//             stockEntry = stockData[0]; // Get the most recent entry
//           } else {
//             stockEntry = stockData; // Single object response
//           }

//           console.log('Stock entry to use:', stockEntry);

//           // Auto-fill form with existing stock data
//           setInStock(stockEntry.inStock?.toString() || stockEntry.quantity?.toString() || '');
//           setOutStock(stockEntry.outStock?.toString() || stockEntry.soldQuantity?.toString() || '');
//           setCurrentStock(stockEntry.currentStock || stockEntry.quantity || 0);
//           setStatus(stockEntry.status || 'In Stock');
//           setBuyingPrice(stockEntry.latestPurchasePrice?.toString() || stockEntry.buyingPrice?.toString() || stockEntry.purchasePrice?.toString() || '');
//           setSellingPrice(stockEntry.sellingPrice?.toString() || stockEntry.salePrice?.toString() || '');
          
//           setMessage('✅ Existing stock data loaded automatically');
//           setTimeout(() => setMessage(null), 3000);
//         } else {
//           console.log('No existing stock data found');
//           setExistingStock(null);
//           resetStockFields();
//           setMessage('🆕 No existing stock data - creating new entry');
//           setTimeout(() => setMessage(null), 3000);
//         }
//       } catch (err) {
//         console.error('Error fetching stock data:', err);
//         setError('⚠️ Could not fetch existing stock data. You can still add new stock.');
//         setExistingStock(null);
//         resetStockFields();
//       } finally {
//         setFetchingStock(false);
//       }
//     };

//     fetchExistingStock();
//   }, [productId]);

//   // Update current stock, status, and calculate profit
//   useEffect(() => {
//     const inQty = parseInt(inStock) || 0;
//     const outQty = parseInt(outStock) || 0;
//     const current = inQty - outQty;
//     setCurrentStock(current);

//     // Status logic
//     if (current === 0) setStatus('Sold Out');
//     else if (outQty > 0) setStatus('Partially Sold');
//     else setStatus('In Stock');
//   }, [inStock, outStock]);

//   const profit = ((parseFloat(sellingPrice) || 0) - (parseFloat(buyingPrice) || 0)) * (parseInt(outStock) || 0);

//   const resetStockFields = () => {
//     setInStock('');
//     setOutStock('');
//     setCurrentStock(0);
//     setStatus('In Stock');
//     setBuyingPrice('');
//     setSellingPrice('');
//   };

//   const resetForm = () => {
//     setProductId('');
//     setExistingStock(null);
//     resetStockFields();
//     setMessage(null);
//     setError(null);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Validation
//     if (!productId) {
//       setError('❌ Please select a product');
//       return;
//     }

//     if (!inStock || parseInt(inStock) < 0) {
//       setError('❌ Please enter a valid in-stock quantity');
//       return;
//     }

//     const outQty = parseInt(outStock) || 0;
//     const inQty = parseInt(inStock) || 0;
//     if (outQty > inQty) {
//       setError('❌ Out stock cannot be greater than in stock');
//       return;
//     }

//     setLoading(true);
//     setMessage(null);
//     setError(null);

//     const stockData = {
//       product: { productId: parseInt(productId) },
//       inStock: parseInt(inStock) || 0,
//       outStock: parseInt(outStock) || 0,
//       currentStock: currentStock,
//       status: status,
//       latestPurchasePrice: parseFloat(buyingPrice) || 0,
//       sellingPrice: parseFloat(sellingPrice) || 0,
//     };

//     console.log('Submitting stock data:', stockData);

//     fetch('http://localhost:8080/api/stocks/add-stocks', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(stockData),
//     })
//       .then(async (res) => {
//         const data = await res.json();
        
//         if (!res.ok) {
//           throw new Error(data.error || `Error: ${res.status}`);
//         }
//         return data;
//       })
//       .then((data) => {
//         setMessage('✅ Stock added successfully!');
//         resetForm();
//         setTimeout(() => setMessage(null), 3000);
//       })
//       .catch((err) => {
//         console.error('Add stock error:', err);
//         setError('❌ Failed to add stock: ' + err.message);
//         setTimeout(() => setError(null), 5000);
//       })
//       .finally(() => setLoading(false));
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '10px',
//     border: '1px solid #ccc',
//     fontSize: '15px',
//     boxSizing: 'border-box',
//   };

//   const labelStyle = {
//     fontWeight: 'bold',
//     display: 'block',
//     marginBottom: '6px',
//     color: '#2c3e50',
//   };

//   const getStatusStyle = () => {
//     switch (status) {
//       case 'Sold Out':
//         return { backgroundColor: '#f8d7da', color: 'red' };
//       case 'Partially Sold':
//         return { backgroundColor: '#fff3cd', color: '#856404' };
//       default:
//         return { backgroundColor: '#d4edda', color: '#155724' };
//     }
//   };

//   return (
//     <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
//       <Navigation />
//       <div style={{ padding: '20px' }}>
//         <h2
//           style={{
//             textAlign: 'center',
//             marginBottom: '20px',
//             marginTop: '40px',
//             color: '#2c3e50',
//             fontWeight: '700',
//             fontSize: '28px',
//           }}
//         >
//           ➕ Add Stock
//         </h2>

//         {/* Messages */}
//         {message && (
//           <div style={{
//             color: 'green',
//             textAlign: 'center',
//             backgroundColor: '#d4edda',
//             padding: '12px',
//             borderRadius: '8px',
//             margin: '10px auto',
//             maxWidth: '900px',
//             border: '1px solid #c3e6cb'
//           }}>
//             {message}
//           </div>
//         )}
//         {error && (
//           <div style={{
//             color: 'red',
//             textAlign: 'center',
//             backgroundColor: '#f8d7da',
//             padding: '12px',
//             borderRadius: '8px',
//             margin: '10px auto',
//             maxWidth: '900px',
//             border: '1px solid #f5c6cb'
//           }}>
//             {error}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           style={{
//             display: 'grid',
//             gridTemplateColumns: '1fr 1fr',
//             gap: '20px',
//             background: 'white',
//             padding: '30px',
//             borderRadius: '20px',
//             boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
//             maxWidth: '900px',
//             margin: '0 auto',
//           }}
//         >
//           {/* Product */}
//           <div style={{ gridColumn: '1 / span 2' }}>
//             <label style={labelStyle}>Product: *</label>
//             <select
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//               required
//               style={inputStyle}
//               disabled={loading}
//             >
//               <option value="">-- Select Product --</option>
//               {products.map((product) => (
//                 <option key={product.productId} value={product.productId}>
//                   {product.productName} {product.productCode ? `(${product.productCode})` : ''}
//                 </option>
//               ))}
//             </select>
//             {fetchingStock && (
//               <small style={{ color: '#007bff', fontSize: '12px', marginTop: '5px', display: 'block' }}>
//                 🔍 Searching for existing stock data...
//               </small>
//             )}
//             {productId && !fetchingStock && (
//               <small style={{ color: '#6c757d', fontSize: '12px', marginTop: '5px', display: 'block' }}>
//                 {existingStock ? '📊 Existing stock data loaded' : '🆕 No existing stock data - creating new entry'}
//               </small>
//             )}
//           </div>

//           {/* In Stock */}
//           <div>
//             <label style={labelStyle}>In Stock: *</label>
//             <input
//               type="number"
//               min="0"
//               value={inStock}
//               onChange={(e) => setInStock(e.target.value)}
//               style={inputStyle}
//               required
//               disabled={loading || fetchingStock}
//               placeholder="Enter quantity"
//             />
//           </div>

//           {/* Out Stock */}
//           <div>
//             <label style={labelStyle}>Out Stock:</label>
//             <input
//               type="number"
//               min="0"
//               value={outStock}
//               onChange={(e) => setOutStock(e.target.value)}
//               style={inputStyle}
//               disabled={loading || fetchingStock}
//               placeholder="Sold quantity"
//             />
//           </div>

//           {/* Current Stock */}
//           <div>
//             <label style={labelStyle}>Current Stock:</label>
//             <input
//               type="number"
//               value={currentStock}
//               readOnly
//               style={{ 
//                 ...inputStyle, 
//                 backgroundColor: '#e9ecef',
//                 fontWeight: 'bold',
//                 color: currentStock === 0 ? 'red' : currentStock < 10 ? 'orange' : 'green'
//               }}
//             />
//           </div>

//           {/* Status */}
//           <div>
//             <label style={labelStyle}>Status:</label>
//             <input
//               type="text"
//               value={status}
//               readOnly
//               style={{
//                 ...inputStyle,
//                 ...getStatusStyle(),
//                 fontWeight: 'bold',
//                 textAlign: 'center'
//               }}
//             />
//           </div>

//           {/* Buying Price */}
//           <div>
//             <label style={labelStyle}>Buying Price: *</label>
//             <input
//               type="number"
//               min="0"
//               step="0.01"
//               value={buyingPrice}
//               onChange={(e) => setBuyingPrice(e.target.value)}
//               style={inputStyle}
//               required
//               disabled={loading || fetchingStock}
//               placeholder="0.00"
//             />
//           </div>

//           {/* Selling Price */}
//           <div>
//             <label style={labelStyle}>Selling Price: *</label>
//             <input
//               type="number"
//               min="0"
//               step="0.01"
//               value={sellingPrice}
//               onChange={(e) => setSellingPrice(e.target.value)}
//               style={inputStyle}
//               required
//               disabled={loading || fetchingStock}
//               placeholder="0.00"
//             />
//           </div>

//           {/* Profit (readonly) */}
//           <div style={{ gridColumn: '1 / span 2' }}>
//             <label style={labelStyle}>Estimated Profit:</label>
//             <input
//               type="number"
//               value={profit.toFixed(2)}
//               readOnly
//               style={{ 
//                 ...inputStyle, 
//                 backgroundColor: profit < 0 ? '#f8d7da' : profit === 0 ? '#e9ecef' : '#d4edda', 
//                 color: profit < 0 ? 'red' : profit === 0 ? '#6c757d' : 'green',
//                 fontWeight: 'bold',
//                 fontSize: '16px'
//               }}
//             />
//             <small style={{ color: '#6c757d', fontSize: '12px' }}>
//               Profit = (Selling Price - Buying Price) × Out Stock
//             </small>
//           </div>

//           {/* Action Buttons */}
//           <div style={{ gridColumn: '1 / span 2', textAlign: 'center', display: 'flex', gap: '15px', justifyContent: 'center' }}>
//             <button
//               type="button"
//               onClick={resetForm}
//               disabled={loading || fetchingStock}
//               style={{
//                 padding: '12px 30px',
//                 border: '2px solid #6c757d',
//                 borderRadius: '12px',
//                 background: 'white',
//                 color: '#6c757d',
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//                 width: '150px',
//                 cursor: (loading || fetchingStock) ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//                 opacity: (loading || fetchingStock) ? 0.6 : 1
//               }}
//             >
//               🔄 Reset
//             </button>
//             <button
//               type="submit"
//               disabled={loading || fetchingStock}
//               style={{
//                 padding: '12px 30px',
//                 border: 'none',
//                 borderRadius: '12px',
//                 background: (loading || fetchingStock) ? '#999' : '#007bff',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//                 width: '220px',
//                 cursor: (loading || fetchingStock) ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//                 boxShadow: (loading || fetchingStock) ? 'none' : '0 4px 8px rgba(0,123,255,0.3)'
//               }}
//             >
//               {fetchingStock ? '🔍 Searching...' : loading ? '⏳ Adding Stock...' : '✅ Add Stock'}
//             </button>
//           </div>

//           {/* Debug Info - Remove in production */}
//           <div style={{ 
//             gridColumn: '1 / span 2', 
//             textAlign: 'center', 
//             color: '#6c757d', 
//             fontSize: '10px',
//             borderTop: '1px solid #e9ecef',
//             paddingTop: '15px',
//             marginTop: '10px',
//             fontFamily: 'monospace'
//           }}>
//             <p>Debug: ProductID: {productId} | Existing Stock: {existingStock ? 'Yes' : 'No'} | Fetching: {fetchingStock ? 'Yes' : 'No'}</p>
//           </div>
//         </form>

//         {/* Loading Overlay */}
//         {(loading || fetchingStock) && (
//           <div style={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100%',
//             height: '100%',
//             backgroundColor: 'rgba(0,0,0,0.5)',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             zIndex: 1000
//           }}>
//             <div style={{
//               background: 'white',
//               padding: '30px',
//               borderRadius: '15px',
//               textAlign: 'center',
//               boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
//             }}>
//               <div style={{ fontSize: '24px', marginBottom: '15px' }}>
//                 {fetchingStock ? '🔍' : '⏳'}
//               </div>
//               <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
//                 {fetchingStock ? 'Searching Stock Data...' : 'Adding Stock...'}
//               </h3>
//               <p style={{ margin: 0, color: '#6c757d' }}>
//                 {fetchingStock ? 'Checking for existing stock information' : 'Please wait while we save your stock information'}
//               </p>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AddStock;

import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/Navigation';

const AddStock = () => {
  const [productId, setProductId] = useState('');
  const [inStock, setInStock] = useState('');
  const [outStock, setOutStock] = useState('');
  const [currentStock, setCurrentStock] = useState(0);
  const [status, setStatus] = useState('In Stock');
  const [buyingPrice, setBuyingPrice] = useState('');
  const [sellingPrice, setSellingPrice] = useState('');
  const [products, setProducts] = useState([]);
  const [existingStock, setExistingStock] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetchingStock, setFetchingStock] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch products
  useEffect(() => {
    fetch('/api/product/get/product')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError('❌ ' + err.message));
  }, []);

  // When product is selected, fetch its details and auto-fill prices
  useEffect(() => {
    if (!productId) {
      resetStockFields();
      setSelectedProduct(null);
      return;
    }

    // Find the selected product from the products list
    const product = products.find(p => p.productId === parseInt(productId));
    if (product) {
      setSelectedProduct(product);
      
      // Auto-fill buying price and selling price from product data
      if (product.latestPurchasePrice) {
        setBuyingPrice(product.latestPurchasePrice.toString());
      }
      if (product.sellingPrice) {
        setSellingPrice(product.sellingPrice.toString());
      } else if (product.price) {
        // If no selling price, use the main price as selling price
        setSellingPrice(product.price.toString());
      }
      
      console.log('Selected Product:', product);
    }

    // Fetch existing stock data
    fetchExistingStock();
  }, [productId, products]);

  const fetchExistingStock = async () => {
    if (!productId) return;

    setFetchingStock(true);
    setError(null);
    
    try {
      console.log('Fetching stock for product ID:', productId);
      
      // Try multiple possible endpoints
      const endpoints = [
        `http://localhost:8080/api/stocks/get-stocks-by-product/${productId}`,
        `http://localhost:8080/api/stocks/product/${productId}`,
        `http://localhost:8080/api/stocks/${productId}`,
        `http://localhost:8080/api/stocks?productId=${productId}`
      ];

      let stockData = null;
      
      for (const endpoint of endpoints) {
        try {
          console.log('Trying endpoint:', endpoint);
          const response = await fetch(endpoint);
          
          if (response.ok) {
            const data = await response.json();
            console.log('Stock data received:', data);
            
            if (data && (Array.isArray(data) ? data.length > 0 : Object.keys(data).length > 0)) {
              stockData = data;
              break;
            }
          }
        } catch (err) {
          console.log(`Endpoint ${endpoint} failed:`, err.message);
          continue;
        }
      }

      if (stockData) {
        setExistingStock(stockData);
        
        // Handle different response formats
        let stockEntry;
        if (Array.isArray(stockData)) {
          stockEntry = stockData[0]; // Get the most recent entry
        } else {
          stockEntry = stockData; // Single object response
        }

        console.log('Stock entry to use:', stockEntry);

        // Auto-fill form with existing stock data
        setInStock(stockEntry.inStock?.toString() || stockEntry.quantity?.toString() || '');
        setOutStock(stockEntry.outStock?.toString() || stockEntry.soldQuantity?.toString() || '');
        setCurrentStock(stockEntry.currentStock || stockEntry.quantity || 0);
        setStatus(stockEntry.status || 'In Stock');
        
        // Only set prices from stock data if they exist, otherwise keep product prices
        if (stockEntry.latestPurchasePrice) {
          setBuyingPrice(stockEntry.latestPurchasePrice.toString());
        }
        if (stockEntry.sellingPrice) {
          setSellingPrice(stockEntry.sellingPrice.toString());
        }
        
        setMessage('✅ Existing stock data loaded automatically');
        setTimeout(() => setMessage(null), 3000);
      } else {
        console.log('No existing stock data found');
        setExistingStock(null);
        setMessage('🆕 No existing stock data - creating new entry');
        setTimeout(() => setMessage(null), 3000);
      }
    } catch (err) {
      console.error('Error fetching stock data:', err);
      setError('⚠️ Could not fetch existing stock data. You can still add new stock.');
      setExistingStock(null);
    } finally {
      setFetchingStock(false);
    }
  };

  // Update current stock, status, and calculate profit
  useEffect(() => {
    const inQty = parseInt(inStock) || 0;
    const outQty = parseInt(outStock) || 0;
    const current = inQty - outQty;
    setCurrentStock(current);

    // Status logic
    if (current === 0) setStatus('Sold Out');
    else if (outQty > 0) setStatus('Partially Sold');
    else setStatus('In Stock');
  }, [inStock, outStock]);

  const profit = ((parseFloat(sellingPrice) || 0) - (parseFloat(buyingPrice) || 0)) * (parseInt(outStock) || 0);

  const resetStockFields = () => {
    setInStock('');
    setOutStock('');
    setCurrentStock(0);
    setStatus('In Stock');
    setBuyingPrice('');
    setSellingPrice('');
  };

  const resetForm = () => {
    setProductId('');
    setSelectedProduct(null);
    setExistingStock(null);
    resetStockFields();
    setMessage(null);
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!productId) {
      setError('❌ Please select a product');
      return;
    }

    if (!inStock || parseInt(inStock) < 0) {
      setError('❌ Please enter a valid in-stock quantity');
      return;
    }

    const outQty = parseInt(outStock) || 0;
    const inQty = parseInt(inStock) || 0;
    if (outQty > inQty) {
      setError('❌ Out stock cannot be greater than in stock');
      return;
    }

    if (!buyingPrice || parseFloat(buyingPrice) < 0) {
      setError('❌ Please enter a valid buying price');
      return;
    }

    if (!sellingPrice || parseFloat(sellingPrice) < 0) {
      setError('❌ Please enter a valid selling price');
      return;
    }

    setLoading(true);
    setMessage(null);
    setError(null);

    const stockData = {
      product: { productId: parseInt(productId) },
      inStock: parseInt(inStock) || 0,
      outStock: parseInt(outStock) || 0,
      currentStock: currentStock,
      status: status,
      latestPurchasePrice: parseFloat(buyingPrice) || 0,
      sellingPrice: parseFloat(sellingPrice) || 0,
    };

    console.log('Submitting stock data:', stockData);

    fetch('http://localhost:8080/api/stocks/add-stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stockData),
    })
      .then(async (res) => {
        const data = await res.json();
        
        if (!res.ok) {
          throw new Error(data.error || `Error: ${res.status}`);
        }
        return data;
      })
      .then((data) => {
        setMessage('✅ Stock added successfully!');
        resetForm();
        setTimeout(() => setMessage(null), 3000);
      })
      .catch((err) => {
        console.error('Add stock error:', err);
        setError('❌ Failed to add stock: ' + err.message);
        setTimeout(() => setError(null), 5000);
      })
      .finally(() => setLoading(false));
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '15px',
    boxSizing: 'border-box',
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '6px',
    color: '#2c3e50',
  };

  const getStatusStyle = () => {
    switch (status) {
      case 'Sold Out':
        return { backgroundColor: '#f8d7da', color: 'red' };
      case 'Partially Sold':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      default:
        return { backgroundColor: '#d4edda', color: '#155724' };
    }
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      <Navigation />
      <div style={{ padding: '20px' }}>
        <h2
          style={{
            textAlign: 'center',
            marginBottom: '20px',
            marginTop: '40px',
            color: '#2c3e50',
            fontWeight: '700',
            fontSize: '28px',
          }}
        >
          ➕ Add Stock
        </h2>

        {/* Messages */}
        {message && (
          <div style={{
            color: 'green',
            textAlign: 'center',
            backgroundColor: '#d4edda',
            padding: '12px',
            borderRadius: '8px',
            margin: '10px auto',
            maxWidth: '900px',
            border: '1px solid #c3e6cb'
          }}>
            {message}
          </div>
        )}
        {error && (
          <div style={{
            color: 'red',
            textAlign: 'center',
            backgroundColor: '#f8d7da',
            padding: '12px',
            borderRadius: '8px',
            margin: '10px auto',
            maxWidth: '900px',
            border: '1px solid #f5c6cb'
          }}>
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            background: 'white',
            padding: '30px',
            borderRadius: '20px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Product */}
          <div style={{ gridColumn: '1 / span 2' }}>
            <label style={labelStyle}>Product: *</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              style={inputStyle}
              disabled={loading}
            >
              <option value="">-- Select Product --</option>
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.productName} {product.productCode ? `(${product.productCode})` : ''}
                </option>
              ))}
            </select>
            {fetchingStock && (
              <small style={{ color: '#007bff', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                🔍 Searching for existing stock data...
              </small>
            )}
            {productId && !fetchingStock && (
              <small style={{ color: '#6c757d', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                {existingStock ? '📊 Existing stock data loaded' : '🆕 No existing stock data - creating new entry'}
              </small>
            )}
            {selectedProduct && (
              <div style={{ marginTop: '10px', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px', fontSize: '14px' }}>
                <strong>Product Details:</strong><br />
                Code: {selectedProduct.productCode} | 
                Category: {selectedProduct.category} | 
                Company: {selectedProduct.productCompany}
              </div>
            )}
          </div>

          {/* In Stock */}
          <div>
            <label style={labelStyle}>In Stock: *</label>
            <input
              type="number"
              min="0"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              style={inputStyle}
              required
              disabled={loading || fetchingStock}
              placeholder="Enter quantity"
            />
          </div>

          {/* Out Stock */}
          <div>
            <label style={labelStyle}>Out Stock:</label>
            <input
              type="number"
              min="0"
              value={outStock}
              onChange={(e) => setOutStock(e.target.value)}
              style={inputStyle}
              disabled={loading || fetchingStock}
              placeholder="Sold quantity"
            />
          </div>

          {/* Current Stock */}
          <div>
            <label style={labelStyle}>Current Stock:</label>
            <input
              type="number"
              value={currentStock}
              readOnly
              style={{ 
                ...inputStyle, 
                backgroundColor: '#e9ecef',
                fontWeight: 'bold',
                color: currentStock === 0 ? 'red' : currentStock < 10 ? 'orange' : 'green'
              }}
            />
          </div>

          {/* Status */}
          <div>
            <label style={labelStyle}>Status:</label>
            <input
              type="text"
              value={status}
              readOnly
              style={{
                ...inputStyle,
                ...getStatusStyle(),
                fontWeight: 'bold',
                textAlign: 'center'
              }}
            />
          </div>

          {/* Buying Price */}
          <div>
            <label style={labelStyle}>Buying Price: *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={buyingPrice}
              onChange={(e) => setBuyingPrice(e.target.value)}
              style={inputStyle}
              required
              disabled={loading || fetchingStock}
              placeholder="0.00"
            />
            {selectedProduct && selectedProduct.latestPurchasePrice && (
              <small style={{ color: '#28a745', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                💰 Auto-filled from product: {selectedProduct.latestPurchasePrice}
              </small>
            )}
          </div>

          {/* Selling Price */}
          <div>
            <label style={labelStyle}>Selling Price: *</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={sellingPrice}
              onChange={(e) => setSellingPrice(e.target.value)}
              style={inputStyle}
              required
              disabled={loading || fetchingStock}
              placeholder="0.00"
            />
            {selectedProduct && (selectedProduct.sellingPrice || selectedProduct.price) && (
              <small style={{ color: '#28a745', fontSize: '12px', marginTop: '5px', display: 'block' }}>
                💰 Auto-filled from product: {selectedProduct.sellingPrice || selectedProduct.price}
              </small>
            )}
          </div>

          {/* Profit (readonly) */}
          <div style={{ gridColumn: '1 / span 2' }}>
            <label style={labelStyle}>Profit:</label>
            <input
              type="number"
              value={profit.toFixed(2)}
              readOnly
              style={{ 
                ...inputStyle, 
                backgroundColor: profit < 0 ? '#f8d7da' : profit === 0 ? '#e9ecef' : '#d4edda', 
                color: profit < 0 ? 'red' : profit === 0 ? '#6c757d' : 'green',
                fontWeight: 'bold',
                fontSize: '16px'
              }}
            />
            <small style={{ color: '#6c757d', fontSize: '12px' }}>
              Profit = (Selling Price - Buying Price) × Out Stock
            </small>
          </div>

          {/* Action Buttons */}
          <div style={{ gridColumn: '1 / span 2', textAlign: 'center', display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={resetForm}
              disabled={loading || fetchingStock}
              style={{
                padding: '12px 30px',
                border: '2px solid #6c757d',
                borderRadius: '12px',
                background: 'white',
                color: '#6c757d',
                fontWeight: 'bold',
                fontSize: '16px',
                width: '150px',
                cursor: (loading || fetchingStock) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                opacity: (loading || fetchingStock) ? 0.6 : 1
              }}
            >
              🔄 Reset
            </button>
            <button
              type="submit"
              disabled={loading || fetchingStock}
              style={{
                padding: '12px 30px',
                border: 'none',
                borderRadius: '12px',
                background: (loading || fetchingStock) ? '#999' : '#007bff',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                width: '220px',
                cursor: (loading || fetchingStock) ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: (loading || fetchingStock) ? 'none' : '0 4px 8px rgba(0,123,255,0.3)'
              }}
            >
              {fetchingStock ? '🔍 Searching...' : loading ? '⏳ Adding Stock...' : '✅ Add Stock'}
            </button>
          </div>

          {/* Debug Info - Remove in production */}
          <div style={{ 
            gridColumn: '1 / span 2', 
            textAlign: 'center', 
            color: '#6c757d', 
            fontSize: '10px',
            borderTop: '1px solid #e9ecef',
            paddingTop: '15px',
            marginTop: '10px',
            fontFamily: 'monospace'
          }}>
            <p>Debug: ProductID: {productId} | Existing Stock: {existingStock ? 'Yes' : 'No'} | Fetching: {fetchingStock ? 'Yes' : 'No'}</p>
          </div>
        </form>

        {/* Loading Overlay */}
        {(loading || fetchingStock) && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '15px',
              textAlign: 'center',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}>
              <div style={{ fontSize: '24px', marginBottom: '15px' }}>
                {fetchingStock ? '🔍' : '⏳'}
              </div>
              <h3 style={{ margin: '0 0 10px 0', color: '#2c3e50' }}>
                {fetchingStock ? 'Searching Stock Data...' : 'Adding Stock...'}
              </h3>
              <p style={{ margin: 0, color: '#6c757d' }}>
                {fetchingStock ? 'Checking for existing stock information' : 'Please wait while we save your stock information'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddStock;