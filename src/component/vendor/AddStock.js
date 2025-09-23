// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddStock = () => {
//   // Form states
//   const [productId, setProductId] = useState('');
//   const [inStock, setInStock] = useState('');
//   const [outStock, setOutStock] = useState('');
//   const [currentStock, setCurrentStock] = useState(0);

//   // Products list
//   const [products, setProducts] = useState([]);

//   // Feedback states
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   // Fetch products for dropdown
//   useEffect(() => {
//     fetch('http://localhost:8080/api/product/get/product')
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch products');
//         return res.json();
//       })
//       .then((data) => setProducts(data))
//       .catch((err) => setError('❌ ' + err.message));
//   }, []);

//   // Auto-calculate currentStock
//   useEffect(() => {
//     const inQty = parseInt(inStock) || 0;
//     const outQty = parseInt(outStock) || 0;
//     setCurrentStock(inQty - outQty);
//   }, [inStock, outStock]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!productId) return setError('❌ Please select a product');

//     setLoading(true);
//     setMessage(null);
//     setError(null);

//     const stockData = {
//       product: { productId: parseInt(productId) },
//       inStock: parseInt(inStock),
//       outStock: parseInt(outStock),
//       currentStock: currentStock,
//     };

//     fetch('http://localhost:8080/api/stocks/add-stocks', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(stockData),
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error(`Error: ${res.status}`);
//         return res.json();
//       })
//       .then(() => {
//         setMessage('✅ Stock added successfully!');
//         setProductId('');
//         setInStock('');
//         setOutStock('');
//         setCurrentStock(0);
//       })
//       .catch((err) => setError('❌ Failed to add stock: ' + err.message))
//       .finally(() => setLoading(false));
//   };

//   return (
//     <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
//       <Navigation />
//       <div style={{ padding: '20px' }}>
//         <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333',marginTop:"40px" }}>
//           ➕ Add Stock
//         </h2>

//         {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//         <form
//           onSubmit={handleSubmit}
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '20px',
//             background: 'white',
//             padding: '25px',
//             marginLeft:"290px",
//             borderRadius: '15px',
//             boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
//             maxWidth: '1300px',
//             margin: '0 auto',
//           }}
//         >
//           {/* Product Selection */}
//           <div>
//             <label style={{ fontWeight: 'bold', display: 'block' }}>Product:</label>
//             <select
//               value={productId}
//               onChange={(e) => setProductId(e.target.value)}
//               required
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #ccc',
//               }}
//             >
//               <option value="">-- Select Product --</option>
//               {products.map((product) => (
//                 <option key={product.productId} value={product.productId}>
//                   {product.productName}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* In Stock */}
//           <div>
//             <label style={{ fontWeight: 'bold', display: 'block' }}>In Stock:</label>
//             <input
//               type="number"
//               min="0"
//               value={inStock}
//               onChange={(e) => setInStock(e.target.value)}
//               style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
//             />
//           </div>

//           {/* Out Stock */}
//           <div>
//             <label style={{ fontWeight: 'bold', display: 'block' }}>Out Stock:</label>
//             <input
//               type="number"
//               min="0"
//               value={outStock}
//               onChange={(e) => setOutStock(e.target.value)}
//               style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
//             />
//           </div>

//           {/* Current Stock */}
//           <div>
//             <label style={{ fontWeight: 'bold', display: 'block' }}>Current Stock:</label>
//             <input
//               type="number"
//               value={currentStock}
//               readOnly
//               style={{
//                 width: '100%',
//                 padding: '8px',
//                 borderRadius: '8px',
//                 border: '1px solid #ccc',
//                 backgroundColor: '#e9ecef',
//               }}
//             />
//           </div>

//           {/* Submit */}
//           <div style={{ textAlign: 'center' }}>
//             <button
//               type="submit"
//               disabled={loading}
//               style={{
//                 padding: '10px 25px',
//                 border: 'none',
//                 borderRadius: '10px',
//                 background: loading ? '#999' : '#007bff',
//                 color: 'white',
//                 fontWeight: 'bold',
//                 width:"180px",
//                 cursor: loading ? 'not-allowed' : 'pointer',
//               }}
//             >
//               {loading ? '⏳ Adding...' : '✅ Add Stock'}
//             </button>
//           </div>
//         </form>
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
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/product/get/product')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError('❌ ' + err.message));
  }, []);

  useEffect(() => {
    const inQty = parseInt(inStock) || 0;
    const outQty = parseInt(outStock) || 0;
    setCurrentStock(inQty - outQty);
  }, [inStock, outStock]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productId) return setError('❌ Please select a product');

    setLoading(true);
    setMessage(null);
    setError(null);

    const stockData = {
      product: { productId: parseInt(productId) },
      inStock: parseInt(inStock),
      outStock: parseInt(outStock),
      currentStock: currentStock,
    };

    fetch('http://localhost:8080/api/stocks/add-stocks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(stockData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setMessage('✅ Stock added successfully!');
        setProductId('');
        setInStock('');
        setOutStock('');
        setCurrentStock(0);
      })
      .catch((err) => setError('❌ Failed to add stock: ' + err.message))
      .finally(() => setLoading(false));
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    fontSize: '15px',
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
          }}
        >
          ➕ Add Stock
        </h2>

        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

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
          {/* Product Selection */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Product:
            </label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
              style={inputStyle}
            >
              <option value="">-- Select Product --</option>
              {products.map((product) => (
                <option key={product.productId} value={product.productId}>
                  {product.productName}
                </option>
              ))}
            </select>
          </div>

          {/* In Stock */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              In Stock:
            </label>
            <input
              type="number"
              min="0"
              value={inStock}
              onChange={(e) => setInStock(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Out Stock */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Out Stock:
            </label>
            <input
              type="number"
              min="0"
              value={outStock}
              onChange={(e) => setOutStock(e.target.value)}
              style={inputStyle}
            />
          </div>

          {/* Current Stock */}
          <div>
            <label style={{ fontWeight: 'bold', display: 'block', marginBottom: '6px' }}>
              Current Stock:
            </label>
            <input
              type="number"
              value={currentStock}
              readOnly
              style={{ ...inputStyle, backgroundColor: '#e9ecef' }}
            />
          </div>

          {/* Submit Button (full width across both columns) */}
          <div style={{ gridColumn: '1 / span 2', textAlign: 'center' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '12px 30px',
                border: 'none',
                borderRadius: '12px',
                background: loading ? '#999' : '#007bff',
                color: 'white',
                fontWeight: 'bold',
                fontSize: '16px',
                width: '220px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                if (!loading) e.currentTarget.style.background = '#0056b3';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.currentTarget.style.background = '#007bff';
              }}
            >
              {loading ? '⏳ Adding...' : '✅ Add Stock'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStock;
