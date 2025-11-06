
// import React, { useEffect, useState } from "react";
// import Navigation from "../navigation/Navigation";

// const AddSale = () => {
//   // State for form fields
//   const [date, setDate] = useState('');
//   const [productId, setProductId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [unitPrice, setUnitPrice] = useState('');
//   const [customerName, setCustomerName] = useState('');

//   // Products list and stock data
//   const [products, setProducts] = useState([]);
//   const [stocks, setStocks] = useState([]);

//   // Feedback states
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch products and stocks from backend
//   useEffect(() => {
//     fetch('http://localhost:8080/api/product/get/product')
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch products');
//         return res.json();
//       })
//       .then((data) => setProducts(data))
//       .catch((err) => setError('❌ ' + err.message));

//     fetch('http://localhost:8080/api/stocks/all-stocks')
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch stocks');
//         return res.json();
//       })
//       .then((data) => setStocks(data))
//       .catch((err) => console.error('Error fetching stocks:', err));
//   }, []);

//   // Get current stock for selected product
//   const getCurrentStock = () => {
//     if (!productId) return 0;
//     const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
//     return stock ? stock.currentStock : 0;
//   };

//   // Get stock status for selected product
//   const getStockStatus = () => {
//     if (!productId) return '';
//     const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
//     return stock ? stock.status : 'Not Available';
//   };

//   // NEW: Get selling price from stock table
//   const getStockSellingPrice = () => {
//     if (!productId) return 0;
//     const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
//     return stock ? parseFloat(stock.sellingPrice) || 0 : 0;
//   };

//   // NEW: Check if stock has selling price
//   const hasStockSellingPrice = () => {
//     if (!productId) return false;
//     const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
//     return stock && stock.sellingPrice && parseFloat(stock.sellingPrice) > 0;
//   };

//   // NEW: Get product purchase price for profit calculation
//   const getProductPurchasePrice = () => {
//     if (!productId) return 0;
//     const product = products.find(p => p.productId === parseInt(productId));
//     return product ? parseFloat(product.latestPurchasePrice) || 0 : 0;
//   };

//   // NEW: Handle product selection change - get price from stock table
//   const handleProductChange = (selectedProductId) => {
//     setProductId(selectedProductId);
    
//     if (selectedProductId) {
//       const sellingPrice = getStockSellingPrice();
//       if (sellingPrice > 0) {
//         setUnitPrice(sellingPrice.toFixed(2));
//       } else {
//         setUnitPrice('');
//       }
//     } else {
//       setUnitPrice('');
//     }
//   };

//   // NEW: Calculate suggested selling price based on purchase price
//   const getSuggestedSellingPrice = () => {
//     const purchasePrice = getProductPurchasePrice();
//     if (purchasePrice <= 0) return 0;
    
//     // Apply 30% markup as suggested price
//     return purchasePrice * 1.3;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);
//     setError(null);

//     const qty = parseInt(quantity);
//     const price = parseFloat(unitPrice);
//     const currentStock = getCurrentStock();

//     // Validation
//     if (!productId) {
//       setError('❌ Please select a product');
//       setLoading(false);
//       return;
//     }

//     if (qty <= 0) {
//       setError('❌ Quantity must be greater than 0');
//       setLoading(false);
//       return;
//     }

//     if (price <= 0) {
//       setError('❌ Unit price must be greater than 0');
//       setLoading(false);
//       return;
//     }

//     if (qty > currentStock) {
//       setError(`❌ Insufficient stock! Available: ${currentStock}, Requested: ${qty}`);
//       setLoading(false);
//       return;
//     }

//     const totalPrice = qty * price;

//     const saleData = {
//       date: date,
//       product: { productId: parseInt(productId) },
//       quantity: qty,
//       unitPrice: price,
//       totalPrice: totalPrice,
//       customerName: customerName || 'Walk-in Customer',
//     };

//     fetch('http://localhost:8080/api/sales/add-sale', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(saleData),
//     })
//       .then(async (res) => {
//         const data = await res.json();
//         if (!res.ok) {
//           throw new Error(data.message || `Error: ${res.status}`);
//         }
//         return data;
//       })
//       .then(() => {
//         setMessage('✅ Sale added successfully! Stock updated automatically.');
//         // Reset form
//         setDate('');
//         setProductId('');
//         setQuantity('');
//         setUnitPrice('');
//         setCustomerName('');
        
//         // Refresh stocks to get updated quantities
//         return fetch('http://localhost:8080/api/stocks/all-stocks');
//       })
//       .then(res => res.json())
//       .then(updatedStocks => setStocks(updatedStocks))
//       .catch((err) => setError('❌ Failed to add sale: ' + err.message))
//       .finally(() => setLoading(false));
//   };

//   const inputStyle = {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '8px',
//     border: '1px solid #ccc',
//     fontSize: '14px',
//     boxSizing: 'border-box'
//   };

//   const labelStyle = {
//     fontWeight: 'bold',
//     display: 'block',
//     marginBottom: '6px',
//     color: '#2c3e50'
//   };

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Sold Out':
//         return { backgroundColor: '#f8d7da', color: 'red' };
//       case 'Partially Sold':
//         return { backgroundColor: '#fff3cd', color: '#856404' };
//       case 'In Stock':
//         return { backgroundColor: '#d4edda', color: '#155724' };
//       default:
//         return { backgroundColor: '#e9ecef', color: '#6c757d' };
//     }
//   };

//   return (
//     <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
//       <Navigation />

//       <div style={{ padding: '20px' }}>
//         <h2 style={{ 
//           textAlign: 'center', 
//           marginBottom: '10px', 
//           color: '#333',
//           marginTop: "100px",
//           fontWeight: '600',
//           fontSize: '28px'
//         }}>
//           ➕ Add New Sale
//         </h2>

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
//             ✅ {message}
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
//             ❌ {error}
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
//           {/* Date */}
//           <div>
//             <label style={labelStyle}>Date: *</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               required
//               style={inputStyle}
//             />
//           </div>

//           {/* Customer Name */}
//           <div>
//             <label style={labelStyle}>Customer Name:</label>
//             <input
//               type="text"
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               placeholder="Walk-in Customer"
//               style={inputStyle}
//             />
//           </div>

//           {/* Product Selection */}
//           <div style={{ gridColumn: '1 / span 2' }}>
//             <label style={labelStyle}>Product: *</label>
//             <select
//               value={productId}
//               onChange={(e) => handleProductChange(e.target.value)}
//               required
//               style={inputStyle}
//             >
//               <option value="">-- Select Product --</option>
//               {products.map((product) => {
//                 const stock = stocks.find(s => s.product && s.product.productId === product.productId);
//                 const sellingPrice = stock ? parseFloat(stock.sellingPrice) : 0;
//                 return (
//                   <option key={product.productId} value={product.productId}>
//                     {product.productName} 
//                     {product.productCode ? ` (${product.productCode})` : ''}
//                     {sellingPrice > 0 ? ` - $${sellingPrice.toFixed(2)}` : ' - Price not set'}
//                   </option>
//                 );
//               })}
//             </select>
//           </div>

//           {/* Stock Information */}
//           {productId && (
//             <>
//               <div>
//                 <label style={labelStyle}>Current Stock:</label>
//                 <input
//                   type="text"
//                   value={getCurrentStock()}
//                   readOnly
//                   style={{
//                     ...inputStyle,
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: getCurrentStock() === 0 ? 'red' : getCurrentStock() < 10 ? 'orange' : 'green'
//                   }}
//                 />
//               </div>

//               <div>
//                 <label style={labelStyle}>Stock Status:</label>
//                 <input
//                   type="text"
//                   value={getStockStatus()}
//                   readOnly
//                   style={{
//                     ...inputStyle,
//                     ...getStatusStyle(getStockStatus()),
//                     fontWeight: 'bold',
//                     textAlign: 'center'
//                   }}
//                 />
//               </div>

//               {/* Stock Selling Price */}
//               <div>
//                 <label style={labelStyle}>💡Stock Selling Price:</label>
//                 <input
//                   type="text"
//                   value={getStockSellingPrice() > 0 ? `$${getStockSellingPrice().toFixed(2)}` : 'No selling price set'}
//                   readOnly
//                   style={{
//                     ...inputStyle,
//                     backgroundColor: '#e9ecef',
//                     fontWeight: 'bold',
//                     color: hasStockSellingPrice() ? '#28a745' : '#ffc107'
//                   }}
//                 />
//                 {hasStockSellingPrice() && (
//                   <small style={{ color: '#28a745', fontSize: '12px' }}>
//                     ✅ From stock data
//                   </small>
//                 )}
//               </div>

//               {/* Suggested Selling Price */}
//               <div>
//                 <label style={labelStyle}>💡Expected Price:</label>
//                 <input
//                   type="text"
//                   value={getSuggestedSellingPrice() > 0 ? `${getSuggestedSellingPrice().toFixed(2)}` : 'N/A'}
//                   readOnly
//                   style={{
//                     ...inputStyle,
//                     backgroundColor: '#fff3cd',
//                     fontWeight: 'bold',
//                     color: '#856404'
//                   }}
//                 />
//                 <small style={{ color: '#856404', fontSize: '12px' }}>
              
//                 </small>
//               </div>
//             </>
//           )}

//           {/* Quantity */}
//           <div>
//             <label style={labelStyle}>Quantity: *</label>
//             <input
//               type="number"
//               min="1"
//               max={getCurrentStock()}
//               value={quantity}
//               onChange={(e) => setQuantity(e.target.value)}
//               required
//               style={{
//                 ...inputStyle,
//                 borderColor: quantity > getCurrentStock() ? 'red' : '#ccc'
//               }}
//               disabled={!productId || getCurrentStock() === 0}
//             />
//             {productId && getCurrentStock() > 0 && (
//               <small style={{ color: '#6c757d', fontSize: '12px' }}>
//                 Maximum available: {getCurrentStock()}
//               </small>
//             )}
//           </div>

//           {/* Unit Price - Now read-only and auto-filled from stock */}
//           <div>
//             <label style={labelStyle}>sellingPrice(Tsh)</label>
//             <input
//               type="text"
//               value={unitPrice ? `${unitPrice}` : ''}
//               readOnly
//               style={{
//                 ...inputStyle,
//                 backgroundColor: '#e9ecef',
//                 fontWeight: 'bold',
//                 color: hasStockSellingPrice() ? '#28a745' : '#dc3545'
//               }}
//               placeholder="filled automatically based on selected product "
//             />
//             {hasStockSellingPrice() ? (
//               <small style={{ color: '#28a745', fontSize: '12px' }}>
//                 ✅ Auto-filled from stock selling price
//               </small>
//             ) : (
//               <small style={{ color: '#dc3545', fontSize: '12px' }}>
//                 ⚠️ No selling price set in stock data
//               </small>
//             )}
//           </div>

//           {/* Profit Information */}
//           {productId && unitPrice && getProductPurchasePrice() > 0 && (
//             <div style={{ gridColumn: '1 / span 2', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                 <div>
//                   <strong>Profit Analysis:</strong>
//                 </div>
//                 <div style={{ 
//                   fontWeight: 'bold', 
//                   color: parseFloat(unitPrice) > getProductPurchasePrice() ? '#28a745' : '#dc3545' 
//                 }}>
//                   Profit: ${((parseFloat(unitPrice) - getProductPurchasePrice()) * (parseFloat(quantity) || 1)).toFixed(2)}
//                   <span style={{ fontSize: '12px', marginLeft: '5px' }}>
//                     (${(parseFloat(unitPrice) - getProductPurchasePrice()).toFixed(2)} per unit)
//                   </span>
//                 </div>
//                 <div style={{ 
//                   fontWeight: 'bold', 
//                   color: parseFloat(unitPrice) > getProductPurchasePrice() ? '#28a745' : '#dc3545' 
//                 }}>
//                   Margin: {getProductPurchasePrice() > 0 ? 
//                     `${(((parseFloat(unitPrice) - getProductPurchasePrice()) / getProductPurchasePrice()) * 100).toFixed(1)}%` : 
//                     'N/A'
//                   }
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Total Price (Calculated) */}
//           <div style={{ gridColumn: '1 / span 2' }}>
//             <label style={labelStyle}>Total Price:</label>
//             <input
//               type="text"
//               value={`$${((parseFloat(quantity) || 0) * (parseFloat(unitPrice) || 0)).toFixed(2)}`}
//               readOnly
//               style={{
//                 ...inputStyle,
//                 backgroundColor: '#e9ecef',
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//                 color: '#2c3e50'
//               }}
//             />
//           </div>

//           {/* Action Buttons */}
//           <div style={{ gridColumn: '1 / span 2', textAlign: 'center', marginTop: '10px' }}>
//             <button
//               type="submit"
//               disabled={loading || !productId || getCurrentStock() === 0}
//               style={{
//                 padding: '12px 30px',
//                 border: 'none',
//                 borderRadius: '10px',
//                 background: loading || !productId || getCurrentStock() === 0 ? '#999' : '#007bff',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 fontSize: '16px',
//                 width: '200px',
//                 cursor: loading || !productId || getCurrentStock() === 0 ? 'not-allowed' : 'pointer',
//                 transition: 'all 0.3s ease',
//               }}
//             >
//               {loading ? '⏳ Adding Sale...' : '✅ Add Sale'}
//             </button>
//           </div>

//           {/* Form Instructions */}
//           <div style={{ 
//             gridColumn: '1 / span 2', 
//             textAlign: 'center', 
//             color: '#6c757d', 
//             fontSize: '12px',
//             borderTop: '1px solid #e9ecef',
//             paddingTop: '15px',
//             marginTop: '10px'
//           }}>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddSale;

import React, { useEffect, useState } from "react";
import Navigation from "../navigation/Navigation";

const AddSale = () => {
  // State for form fields
  const [date, setDate] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Products list and stock data
  const [products, setProducts] = useState([]);
  const [stocks, setStocks] = useState([]);

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch products and stocks from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/product/get/product')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError('❌ ' + err.message));

    fetch('http://localhost:8080/api/stocks/all-stocks')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch stocks');
        return res.json();
      })
      .then((data) => setStocks(data))
      .catch((err) => console.error('Error fetching stocks:', err));
  }, []);

  // Get current stock for selected product
  const getCurrentStock = () => {
    if (!productId) return 0;
    const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
    return stock ? stock.currentStock : 0;
  };

  // Get stock status for selected product
  const getStockStatus = () => {
    if (!productId) return '';
    const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
    return stock ? stock.status : 'Not Available';
  };

  // NEW: Get selling price from stock table
  const getStockSellingPrice = () => {
    if (!productId) return 0;
    const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
    return stock ? parseFloat(stock.sellingPrice) || 0 : 0;
  };

  // NEW: Check if stock has selling price
  const hasStockSellingPrice = () => {
    if (!productId) return false;
    const stock = stocks.find(s => s.product && s.product.productId === parseInt(productId));
    return stock && stock.sellingPrice && parseFloat(stock.sellingPrice) > 0;
  };

  // NEW: Get product purchase price for profit calculation
  const getProductPurchasePrice = () => {
    if (!productId) return 0;
    const product = products.find(p => p.productId === parseInt(productId));
    return product ? parseFloat(product.latestPurchasePrice) || 0 : 0;
  };

  // NEW: Handle product selection change - get price from stock table
  const handleProductChange = (selectedProductId) => {
    setProductId(selectedProductId);
    
    if (selectedProductId) {
      const sellingPrice = getStockSellingPrice();
      if (sellingPrice > 0) {
        setUnitPrice(sellingPrice.toFixed(2));
      } else {
        setUnitPrice('');
      }
    } else {
      setUnitPrice('');
    }
  };

  // NEW: Calculate suggested selling price based on purchase price
  const getSuggestedSellingPrice = () => {
    const purchasePrice = getProductPurchasePrice();
    if (purchasePrice <= 0) return 0;
    
    // Apply 30% markup as suggested price
    return purchasePrice * 1.3;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const qty = parseInt(quantity);
    const price = parseFloat(unitPrice);
    const currentStock = getCurrentStock();

    // Validation
    if (!productId) {
      setError('❌ Please select a product');
      setLoading(false);
      return;
    }

    if (qty <= 0) {
      setError('❌ Quantity must be greater than 0');
      setLoading(false);
      return;
    }

    if (price <= 0) {
      setError('❌ Unit price must be greater than 0');
      setLoading(false);
      return;
    }

    if (qty > currentStock) {
      setError(`❌ Insufficient stock! Available: ${currentStock}, Requested: ${qty}`);
      setLoading(false);
      return;
    }

    const totalPrice = qty * price;

    const saleData = {
      date: date,
      product: { productId: parseInt(productId) },
      quantity: qty,
      unitPrice: price,
      totalPrice: totalPrice,
      customerName: customerName || 'Walk-in Customer',
    };

    fetch('http://localhost:8080/api/sales/add-sale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message || `Error: ${res.status}`);
        }
        return data;
      })
      .then(() => {
        setMessage('✅ Sale added successfully! Stock updated automatically.');
        // Reset form
        setDate('');
        setProductId('');
        setQuantity('');
        setUnitPrice('');
        setCustomerName('');
        
        // Refresh stocks to get updated quantities
        return fetch('http://localhost:8080/api/stocks/all-stocks');
      })
      .then(res => res.json())
      .then(updatedStocks => setStocks(updatedStocks))
      .catch((err) => setError('❌ Failed to add sale: ' + err.message))
      .finally(() => setLoading(false));
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '14px',
    boxSizing: 'border-box'
  };

  const labelStyle = {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '6px',
    color: '#2c3e50'
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Sold Out':
        return { backgroundColor: '#f8d7da', color: 'red' };
      case 'Partially Sold':
        return { backgroundColor: '#fff3cd', color: '#856404' };
      case 'In Stock':
        return { backgroundColor: '#d4edda', color: '#155724' };
      default:
        return { backgroundColor: '#e9ecef', color: '#6c757d' };
    }
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      <Navigation />

      <div style={{ padding: '20px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          marginBottom: '10px', 
          color: '#333',
          marginTop: "100px",
          fontWeight: '600',
          fontSize: '28px'
        }}>
          ➕ Add New Sale
        </h2>

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
            ✅ {message}
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
            ❌ {error}
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
          {/* Date */}
          <div>
            <label style={labelStyle}>Date: *</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={inputStyle}
            />
          </div>

          {/* Customer Name */}
          <div>
            <label style={labelStyle}>Customer Name:</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Walk-in Customer"
              style={inputStyle}
            />
          </div>

          {/* Product Selection */}
          <div style={{ gridColumn: '1 / span 2' }}>
            <label style={labelStyle}>Product: *</label>
            <select
              value={productId}
              onChange={(e) => handleProductChange(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">-- Select Product --</option>
              {products.map((product) => {
                const stock = stocks.find(s => s.product && s.product.productId === product.productId);
                const sellingPrice = stock ? parseFloat(stock.sellingPrice) : 0;
                return (
                  <option key={product.productId} value={product.productId}>
                    {product.productName} 
                    {product.productCode ? ` (${product.productCode})` : ''}
                    {sellingPrice > 0 ? ` - $${sellingPrice.toFixed(2)}` : ' - Price not set'}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Stock Information */}
          {productId && (
            <>
              <div>
                <label style={labelStyle}>Current Stock:</label>
                <input
                  type="text"
                  value={getCurrentStock()}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#e9ecef',
                    fontWeight: 'bold',
                    color: getCurrentStock() === 0 ? 'red' : getCurrentStock() < 10 ? 'orange' : 'green'
                  }}
                />
              </div>

              <div>
                <label style={labelStyle}>Stock Status:</label>
                <input
                  type="text"
                  value={getStockStatus()}
                  readOnly
                  style={{
                    ...inputStyle,
                    ...getStatusStyle(getStockStatus()),
                    fontWeight: 'bold',
                    textAlign: 'center'
                  }}
                />
              </div>

              {/* Stock Selling Price */}
              <div>
                <label style={labelStyle}>💡Stock Selling Price:</label>
                <input
                  type="text"
                  value={getStockSellingPrice() > 0 ? `$${getStockSellingPrice().toFixed(2)}` : 'No selling price set'}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#e9ecef',
                    fontWeight: 'bold',
                    color: hasStockSellingPrice() ? '#28a745' : '#ffc107'
                  }}
                />
                {hasStockSellingPrice() && (
                  <small style={{ color: '#28a745', fontSize: '12px' }}>
                    ✅ From stock data
                  </small>
                )}
              </div>

              {/* Suggested Selling Price */}
              <div>
                <label style={labelStyle}>💡Expected Price:</label>
                <input
                  type="text"
                  value={getSuggestedSellingPrice() > 0 ? `${getSuggestedSellingPrice().toFixed(2)}` : 'N/A'}
                  readOnly
                  style={{
                    ...inputStyle,
                    backgroundColor: '#fff3cd',
                    fontWeight: 'bold',
                    color: '#856404'
                  }}
                />
                <small style={{ color: '#856404', fontSize: '12px' }}>
              
                </small>
              </div>
            </>
          )}

          {/* Quantity */}
          <div>
            <label style={labelStyle}>Quantity: *</label>
            <input
              type="number"
              min="1"
              max={getCurrentStock()}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              style={{
                ...inputStyle,
                borderColor: quantity > getCurrentStock() ? 'red' : '#ccc'
              }}
              disabled={!productId || getCurrentStock() === 0}
            />
            {productId && getCurrentStock() > 0 && (
              <small style={{ color: '#6c757d', fontSize: '12px' }}>
                Maximum available: {getCurrentStock()}
              </small>
            )}
            
          </div>
        <button
              type="submit"
              disabled={loading || !productId || getCurrentStock() === 0}
              style={{
                padding: '12px 30px',
                border: 'none',
                borderRadius: '10px',
                background: loading || !productId || getCurrentStock() === 0 ? '#999' : '#007bff',
                color: 'white',
                fontWeight: 'bold',
                height:"50px",
                marginTop:"30px",
                marginLeft:"40px",
                fontSize: '16px',
                width: '200px',
                cursor: loading || !productId || getCurrentStock() === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              {loading ? '⏳ Adding Sale...' : '✅ Add Sale'}
            </button>

          {/* Unit Price - Now read-only and auto-filled from stock
          <div>
            <label style={labelStyle}>sellingPrice(Tsh)</label>
            <input
              type="text"
              value={unitPrice ? `${unitPrice}` : ''}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: '#e9ecef',
                fontWeight: 'bold',
                color: hasStockSellingPrice() ? '#28a745' : '#dc3545'
              }}
              placeholder="filled automatically based on selected product "
            />
            {hasStockSellingPrice() ? (
              <small style={{ color: '#28a745', fontSize: '12px' }}>
                ✅ Auto-filled from stock selling price
              </small>
            ) : (
              <small style={{ color: '#dc3545', fontSize: '12px' }}>
                ⚠️ No selling price set in stock data
              </small>
            )}
          </div> */}

          {/* Profit Information */}
          {productId && unitPrice && getProductPurchasePrice() > 0 && (
            <div style={{ gridColumn: '1 / span 2', padding: '10px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Profit Analysis:</strong>
                </div>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: parseFloat(unitPrice) > getProductPurchasePrice() ? '#28a745' : '#dc3545' 
                }}>
                  Profit: ${((parseFloat(unitPrice) - getProductPurchasePrice()) * (parseFloat(quantity) || 1)).toFixed(2)}
                  <span style={{ fontSize: '12px', marginLeft: '5px' }}>
                    (${(parseFloat(unitPrice) - getProductPurchasePrice()).toFixed(2)} per unit)
                  </span>
                </div>
                <div style={{ 
                  fontWeight: 'bold', 
                  color: parseFloat(unitPrice) > getProductPurchasePrice() ? '#28a745' : '#dc3545' 
                }}>
                  Margin: {getProductPurchasePrice() > 0 ? 
                    `${(((parseFloat(unitPrice) - getProductPurchasePrice()) / getProductPurchasePrice()) * 100).toFixed(1)}%` : 
                    'N/A'
                  }
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ gridColumn: '1 / span 2', textAlign: 'center', marginTop: '10px' }}>
           
          </div>

          {/* Form Instructions */}
          <div style={{ 
            gridColumn: '1 / span 2', 
            textAlign: 'center', 
            color: '#6c757d', 
            fontSize: '12px',
            borderTop: '1px solid #e9ecef',
            paddingTop: '15px',
            marginTop: '10px'
          }}>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSale;
