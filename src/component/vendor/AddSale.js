
// import React, { useState } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddSale = () => {
//   // State for form fields
//   const [date, setDate] = useState('');
//   const [productId, setProductId] = useState('');
//   const [quantity, setQuantity] = useState('');
//   const [unitPrice, setUnitPrice] = useState('');
//   const [customerName, setCustomerName] = useState('');

//   // Feedback states
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);
//     setError(null);

//     // Parse inputs and calculate totalPrice
//     const qty = parseInt(quantity);
//     const price = parseFloat(unitPrice);
//     const totalPrice = qty * price;

//     // Build the sale object
//     const saleData = {
//       date: date, // format: 'YYYY-MM-DD'
//       product: { productId: parseInt(productId) },
//       quantity: qty,
//       unitPrice: price,
//       totalPrice: totalPrice,
//       customerName: customerName,
//     };

//     fetch('http://localhost:8080/api/sales/add-sale', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(saleData),
//     })
//       .then((res) => {
//         if (!res.ok) {
//           throw new Error(`Error: ${res.status}`);
//         }
//         return res.json();
//       })
//       .then(() => {
//         setMessage('✅ Sale added successfully!');
//         // Reset form fields
//         setDate('');
//         setProductId('');
//         setQuantity('');
//         setUnitPrice('');
//         setCustomerName('');
//       })
//       .catch((err) => {
//         setError('❌ Failed to add sale: ' + err.message);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
//       {/* ✅ Navigation */}
//       <Navigation />

//       <div style={{ padding: '20px' }}>
//         <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>
//           ➕ Add New Sale
//         </h2>

//         {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
//         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

//         {/* ✅ 2 Row Layout */}
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '20px',
//             background: 'white',
//             padding: '25px',
//             borderRadius: '15px',
//             boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
//             maxWidth: '900px',
//             margin: '0 auto',
//           }}
//         >
//           {/* Row 1: Date, Product ID, Quantity */}
//           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//             <div style={{ flex: 1, minWidth: '200px' }}>
//               <label style={{ display: 'block', fontWeight: 'bold' }}>Date:</label>
//               <input
//                 type="date"
//                 value={date}
//                 onChange={(e) => setDate(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
//               />
//             </div>

//             <div style={{ flex: 1, minWidth: '200px' }}>
//               <label style={{ display: 'block', fontWeight: 'bold' }}>Product ID:</label>
//               <input
//                 type="number"
//                 value={productId}
//                 onChange={(e) => setProductId(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
//               />
//             </div>

//             <div style={{ flex: 1, minWidth: '200px' }}>
//               <label style={{ display: 'block', fontWeight: 'bold' }}>Quantity:</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={quantity}
//                 onChange={(e) => setQuantity(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
//               />
//             </div>
//           </div>

//           {/* Row 2: Unit Price, Customer Name */}
//           <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//             <div style={{ flex: 1, minWidth: '200px' }}>
//               <label style={{ display: 'block', fontWeight: 'bold' }}>Unit Price:</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 min="0"
//                 value={unitPrice}
//                 onChange={(e) => setUnitPrice(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
//               />
//             </div>

//             <div style={{ flex: 1, minWidth: '200px' }}>
//               <label style={{ display: 'block', fontWeight: 'bold' }}>Customer Name:</label>
//               <input
//                 type="text"
//                 value={customerName}
//                 onChange={(e) => setCustomerName(e.target.value)}
//                 required
//                 style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
//               />
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div style={{ textAlign: 'center', marginTop: '15px' }}>
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
//                 cursor: loading ? 'not-allowed' : 'pointer',
//                 transition: '0.3s',
//               }}
//             >
//               {loading ? '⏳ Adding...' : '✅ Add Sale'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddSale;
import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/Navigation';

const AddSale = () => {
  // State for form fields
  const [date, setDate] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [customerName, setCustomerName] = useState('');

  // Products list
  const [products, setProducts] = useState([]);

  // Feedback states
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch products from backend
  useEffect(() => {
    fetch('http://localhost:8080/api/product/get/product')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError('❌ ' + err.message));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    const qty = parseInt(quantity);
    const price = parseFloat(unitPrice);
    const totalPrice = qty * price;

    const saleData = {
      date: date,
      product: { productId: parseInt(productId) }, // ✅ send ID, not name
      quantity: qty,
      unitPrice: price,
      totalPrice: totalPrice,
      customerName: customerName,
    };

    fetch('http://localhost:8080/api/sales/add-sale', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(saleData),
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setMessage('✅ Sale added successfully!');
        setDate('');
        setProductId('');
        setQuantity('');
        setUnitPrice('');
        setCustomerName('');
      })
      .catch((err) => setError('❌ Failed to add sale: ' + err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      <Navigation />

      <div style={{ padding: '20px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333',marginTop:"100px" }}>
          ➕ Add New Sale
        </h2>

        {message && <p style={{ color: 'green', textAlign: 'center' }}>{message}</p>}
        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            background: 'white',
            padding: '25px',
            borderRadius: '15px',
            boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
            maxWidth: '900px',
            margin: '0 auto',
          }}
        >
          {/* Row 1: Date, Product, Quantity */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Date:</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>

            {/* ✅ Product Name Dropdown instead of productId input */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Product:</label>
              <select
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              >
                <option value="">-- Select Product --</option>
                {products.map((product) => (
                  <option key={product.productId} value={product.productId}>
                    {product.productName}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>
          </div>

          {/* Row 2: Unit Price, Customer Name */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Unit Price:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>

            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', fontWeight: 'bold' }}>Customer Name:</label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #ccc' }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: 'center', marginTop: '15px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                padding: '10px 25px',
                border: 'none',
                borderRadius: '10px',
                width:"200px",
                background: loading ? '#999' : '#007bff',
                color: 'white',
                fontWeight: 'bold',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: '0.3s',
              }}
            >
              {loading ? '⏳ Adding...' : '✅ Add Sale'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSale;
