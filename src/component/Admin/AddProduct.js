// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     productCode: '',
//     productName: '',
//     productDescription: '',
//     price: '',
//     latestPurchasePrice: '',
//     sellingPrice: '',
//     category: '',
//     productCompany: '',
//     productUnit: '',
//     stockQuantity: '',
//   });
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [shelves, setShelves] = useState([]);
//   const [selectedShelf, setSelectedShelf] = useState('');
//   const [loading, setLoading] = useState(false);

//   // ✅ FIX: Changed from 'vendorId' to 'userId'
//   const role = localStorage.getItem('role');
//   const userId = localStorage.getItem('userId'); // This was the problem!

//   useEffect(() => {
//     console.log('🔍 Fixed - localStorage:');
//     console.log('  role:', role);
//     console.log('  userId:', userId);
//     console.log('  All items:', { ...localStorage });
//   }, []);

//   // Fetch shelves from backend
//   useEffect(() => {
//     const fetchShelves = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/shelves/list-shelves');
//         if (!response.ok) throw new Error('Failed to fetch shelves');
//         const data = await response.json();
//         setShelves(data);
//       } catch (err) {
//         setError('Could not load shelves. Please try again later.');
//       }
//     };
//     fetchShelves();
//   }, []);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     console.log('🚀 FORM SUBMISSION - Fixed Version');
//     console.log('  Role:', role);
//     console.log('  User ID:', userId);

//     // Validation
//     if (!selectedShelf) {
//       setError('Please select a shelf.');
//       setLoading(false);
//       return;
//     }

//     if (!formData.productCode || !formData.productName || !formData.price) {
//       setError('Please fill in all required fields (marked with *).');
//       setLoading(false);
//       return;
//     }

//     const shelfId = parseInt(selectedShelf);
//     if (isNaN(shelfId)) {
//       setError('Invalid shelf selection. Please select a valid shelf.');
//       setLoading(false);
//       return;
//     }

//     const formDataToSend = new FormData();
    
//     // ✅ FIX: Now using the correct userId from localStorage
//     if (userId) {
//       formDataToSend.append('userId', userId);
//       console.log('✅ SENDING userId:', userId);
//     } else {
//       console.log('ℹ️ No userId found in localStorage');
//     }

//     // Add product data
//     Object.keys(formData).forEach(key => {
//       const value = formData[key];
//       let finalValue;
      
//       if (value || value === 0) {
//         if (key.includes('Price') || key === 'price') {
//           finalValue = parseFloat(value) || 0;
//         } else if (key === 'stockQuantity') {
//           finalValue = parseInt(value) || 0;
//         } else {
//           finalValue = value;
//         }
//       } else {
//         if (key.includes('Price') || key === 'price') {
//           finalValue = 0;
//         } else if (key === 'stockQuantity') {
//           finalValue = 0;
//         } else {
//           finalValue = '';
//         }
//       }
      
//       formDataToSend.append(key, finalValue);
//     });

//     formDataToSend.append('shelfId', shelfId);
//     if (image) formDataToSend.append('image', image);

//     // Debug final form data
//     console.log('📤 FINAL FORM DATA:');
//     for (let [key, value] of formDataToSend.entries()) {
//       console.log(`  ${key}: ${value}`);
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/product/add/product', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       console.log('📥 Response status:', response.status);

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Request failed');
//       }

//       const result = await response.json();
//       console.log('✅ SUCCESS! Product:', result);
      
//       setSuccess('✅ Product added successfully with User ID!');
      
//       // Reset form
//       setFormData({
//         productCode: '', productName: '', productDescription: '', price: '',
//         latestPurchasePrice: '', sellingPrice: '', category: '', productCompany: '',
//         productUnit: '', stockQuantity: '',
//       });
//       setImage(null);
//       setSelectedShelf('');
      
//     } catch (err) {
//       console.error('💥 ERROR:', err);
//       setError(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getShelfDisplayName = (shelf) => {
//     if (shelf.shelfName && shelf.locationDescription) {
//       return `${shelf.shelfName} - ${shelf.locationDescription}`;
//     }
//     return shelf.shelfName || shelf.locationDescription || `Shelf ${shelf.id || 'Unknown'}`;
//   };

//   const getShelfId = (shelf) => shelf.id || shelf.shelfId;

//   return (
//     <>
//       <Navigation />
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <div style={styles.header}>
//             <h1 style={styles.title}>➕ Add Product</h1>
//             <div style={styles.userInfo}>
//               <strong>Role:</strong> {role} | <strong>User ID:</strong> {userId}
//             </div>
//           </div>

//           {success && <div style={styles.successAlert}>✅ {success}</div>}
//           {error && <div style={styles.errorAlert}>⚠️ {error}</div>}

//           <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//             <div style={styles.formGrid}>
//               <FormField label="Product Code *" value={formData.productCode} onChange={(v) => handleInputChange('productCode', v)} required disabled={loading} />
//               <FormField label="Product Name *" value={formData.productName} onChange={(v) => handleInputChange('productName', v)} required disabled={loading} />
//               <FormField label="Category" value={formData.category} onChange={(v) => handleInputChange('category', v)} disabled={loading} />
//               <FormField label="Company *" value={formData.productCompany} onChange={(v) => handleInputChange('productCompany', v)} required disabled={loading} />
//               <FormField label="Unit" value={formData.productUnit} onChange={(v) => handleInputChange('productUnit', v)} disabled={loading} />
//               <FormField label="Stock Quantity" type="number" value={formData.stockQuantity} onChange={(v) => handleInputChange('stockQuantity', v)} disabled={loading} />
//               <FormField label="Purchase Price" type="number" step="0.01" value={formData.latestPurchasePrice} onChange={(v) => handleInputChange('latestPurchasePrice', v)} disabled={loading} />
//               <FormField label="Selling Price" type="number" step="0.01" value={formData.sellingPrice} onChange={(v) => handleInputChange('sellingPrice', v)} disabled={loading} />
//               <FormField label="Price *" type="number" step="0.01" value={formData.price} onChange={(v) => handleInputChange('price', v)} required disabled={loading} />
//             </div>

//             <div style={styles.fieldGroup}>
//               <label style={styles.label}>Description</label>
//               <textarea
//                 value={formData.productDescription}
//                 onChange={(e) => handleInputChange('productDescription', e.target.value)}
//                 disabled={loading}
//                 style={styles.textarea}
//               />
//             </div>

//             <div style={styles.fieldGroup}>
//               <label style={styles.label}>Shelf Location *</label>
//               <select
//                 value={selectedShelf}
//                 onChange={(e) => setSelectedShelf(e.target.value)}
//                 required
//                 disabled={loading}
//                 style={styles.select}
//               >
//                 <option value="">-- Select Shelf --</option>
//                 {shelves.map((shelf) => (
//                   <option key={getShelfId(shelf)} value={getShelfId(shelf)}>
//                     {getShelfDisplayName(shelf)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div style={styles.fieldGroup}>
//               <label style={styles.label}>Product Image</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//                 disabled={loading}
//                 style={styles.fileInput}
//               />
//             </div>

//             <div style={styles.submitContainer}>
//               <button type="submit" disabled={loading} style={styles.submitButton}>
//                 {loading ? '⏳ Adding...' : '➕ Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// const FormField = ({ label, type = 'text', value, onChange, required = false, disabled = false, step }) => (
//   <div style={styles.fieldGroup}>
//     <label style={styles.label}>{label}{required && <span style={styles.required}> *</span>}</label>
//     <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} disabled={disabled} step={step} style={styles.input} />
//   </div>
// );

// const styles = {
//   container: { backgroundColor: '#f8f9fa', padding: '30px 20px', marginLeft: '250px', minHeight: '100vh', fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" },
//   card: { maxWidth: '1200px', margin: '0 auto', backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '40px' },
//   header: { textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #e9ecef', paddingBottom: '20px' },
//   title: { color: '#2c3e50', fontSize: '32px', fontWeight: '700', margin: '0 0 10px 0' },
//   userInfo: { color: '#6c757d', fontSize: '16px', margin: '10px 0' },
//   formGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' },
//   fieldGroup: { marginBottom: '20px' },
//   label: { display: 'block', fontWeight: '600', marginBottom: '8px', color: '#495057' },
//   required: { color: '#dc3545' },
//   input: { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '15px' },
//   textarea: { width: '100%', padding: '12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '15px', minHeight: '100px', resize: 'vertical' },
//   select: { width: '100%', maxWidth: '400px', padding: '12px', borderRadius: '6px', border: '1px solid #ced4da', fontSize: '15px' },
//   fileInput: { width: '100%', maxWidth: '400px' },
//   submitContainer: { textAlign: 'center', marginTop: '40px' },
//   submitButton: { backgroundColor: '#007bff', color: 'white', padding: '15px 40px', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '600', cursor: 'pointer', minWidth: '200px' },
//   successAlert: { backgroundColor: '#d4edda', color: '#155724', padding: '15px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #c3e6cb' },
//   errorAlert: { backgroundColor: '#f8d7da', color: '#721c24', padding: '15px', borderRadius: '6px', marginBottom: '20px', border: '1px solid #f5c6cb' },
// };

// export default AddProduct;

// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     productCode: '',
//     productName: '',
//     productDescription: '',
//     price: '',
//     latestPurchasePrice: '',
//     sellingPrice: '',
//     category: '',
//     productCompany: '',
//     productUnit: '',
//     stockQuantity: '',
//   });
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [shelves, setShelves] = useState([]);
//   const [selectedShelf, setSelectedShelf] = useState('');
//   const [loading, setLoading] = useState(false);

//   const role = localStorage.getItem('role');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchShelves = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/shelves/list-shelves');
//         if (!response.ok) throw new Error('Failed to fetch shelves');
//         const data = await response.json();
//         setShelves(data);
//       } catch (err) {
//         setError('Could not load shelves. Please try again later.');
//       }
//     };
//     fetchShelves();
//   }, []);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     if (!selectedShelf) {
//       setError('Please select a shelf.');
//       setLoading(false);
//       return;
//     }

//     if (!formData.productCode || !formData.productName || !formData.price) {
//       setError('Please fill in all required fields (marked with *).');
//       setLoading(false);
//       return;
//     }

//     const shelfId = parseInt(selectedShelf);
//     if (isNaN(shelfId)) {
//       setError('Invalid shelf selection. Please select a valid shelf.');
//       setLoading(false);
//       return;
//     }

//     const formDataToSend = new FormData();
//     if (userId) formDataToSend.append('userId', userId);

//     Object.keys(formData).forEach(key => {
//       const value = formData[key];
//       let finalValue =
//         key.includes('Price') || key === 'price'
//           ? parseFloat(value) || 0
//           : key === 'stockQuantity'
//           ? parseInt(value) || 0
//           : value || '';
//       formDataToSend.append(key, finalValue);
//     });

//     formDataToSend.append('shelfId', shelfId);
//     if (image) formDataToSend.append('image', image);

//     try {
//       const response = await fetch('http://localhost:8080/api/product/add/product', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Request failed');
//       }

//       const result = await response.json();
//       setSuccess('✅ Product added successfully!');
//       setFormData({
//         productCode: '', productName: '', productDescription: '', price: '',
//         latestPurchasePrice: '', sellingPrice: '', category: '', productCompany: '',
//         productUnit: '', stockQuantity: '',
//       });
//       setImage(null);
//       setSelectedShelf('');
//     } catch (err) {
//       setError(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getShelfDisplayName = (shelf) =>
//     shelf.shelfName && shelf.locationDescription
//       ? `${shelf.shelfName} - ${shelf.locationDescription}`
//       : shelf.shelfName || shelf.locationDescription || `Shelf ${shelf.id || 'Unknown'}`;

//   const getShelfId = (shelf) => shelf.id || shelf.shelfId;

//   return (
//     <>
//       <Navigation />
//       <div style={styles.container}>
//         <div style={styles.card}>
//           <h1 style={styles.title}>➕ Add Product</h1>
//           <p style={styles.userInfo}>
//             <strong>Role:</strong> {role} | <strong>User ID:</strong> {userId}
//           </p>

//           {success && <div style={styles.successAlert}>{success}</div>}
//           {error && <div style={styles.errorAlert}>{error}</div>}

//           <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//             <div style={styles.formGrid}>
//               <FormField label="Product Code *" value={formData.productCode} onChange={(v) => handleInputChange('productCode', v)} required />
//               <FormField label="Product Name *" value={formData.productName} onChange={(v) => handleInputChange('productName', v)} required />
//               <FormField label="Category" value={formData.category} onChange={(v) => handleInputChange('category', v)} />
//               <FormField label="Company *" value={formData.productCompany} onChange={(v) => handleInputChange('productCompany', v)} required />
//               <FormField label="Unit" value={formData.productUnit} onChange={(v) => handleInputChange('productUnit', v)} />
//               <FormField label="Stock Quantity" type="number" value={formData.stockQuantity} onChange={(v) => handleInputChange('stockQuantity', v)} />
//               <FormField label="Purchase Price" type="number" step="0.01" value={formData.latestPurchasePrice} onChange={(v) => handleInputChange('latestPurchasePrice', v)} />
//               <FormField label="Selling Price" type="number" step="0.01" value={formData.sellingPrice} onChange={(v) => handleInputChange('sellingPrice', v)} />
//               <FormField label="Price *" type="number" step="0.01" value={formData.price} onChange={(v) => handleInputChange('price', v)} required />
//             </div>

//             <div style={styles.fieldGroup}>
//               <label style={styles.label}>Description</label>
//               <textarea
//                 value={formData.productDescription}
//                 onChange={(e) => handleInputChange('productDescription', e.target.value)}
//                 style={styles.textarea}
//               />
//             </div>

//             <div style={styles.fieldGroup}>
//               <label style={styles.label}>Shelf Location *</label>
//               <select value={selectedShelf} onChange={(e) => setSelectedShelf(e.target.value)} required style={styles.select}>
//                 <option value="">-- Select Shelf --</option>
//                 {shelves.map((shelf) => (
//                   <option key={getShelfId(shelf)} value={getShelfId(shelf)}>
//                     {getShelfDisplayName(shelf)}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div style={styles.fieldGroup}>
//               <label style={styles.label}>Product Image</label>
//               <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} style={styles.fileInput} />
//             </div>

//             <div style={styles.submitContainer}>
//               <button type="submit" disabled={loading} style={styles.submitButton}>
//                 {loading ? '⏳ Adding...' : '➕ Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// const FormField = ({ label, type = 'text', value, onChange, required = false, step }) => (
//   <div style={styles.fieldGroup}>
//     <label style={styles.label}>{label}{required && <span style={styles.required}> *</span>}</label>
//     <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required={required} step={step} style={styles.input} />
//   </div>
// );

// const styles = {
//   container: {
//     backgroundColor: '#f5f6fa',
//     padding: '20px',
//     marginLeft: '250px',
//     minHeight: '85vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
//     fontFamily: "'Poppins', sans-serif",
//   },
//   card: {
//     width: '90%',
//     maxWidth: '950px',
//     backgroundColor: '#ffffff',
//     borderRadius: '14px',
//     boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
//     padding: '25px 30px',
//     transition: 'transform 0.2s ease',
//   },
//   title: {
//     color: '#2c3e50',
//     fontSize: '26px',
//     fontWeight: '700',
//     textAlign: 'center',
//     marginBottom: '10px',
//   },
//   userInfo: {
//     color: '#6c757d',
//     fontSize: '15px',
//     textAlign: 'center',
//     marginBottom: '15px',
//   },
//   formGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
//     gap: '15px',
//     marginBottom: '15px',
//   },
//   fieldGroup: { marginBottom: '15px' },
//   label: { display: 'block', fontWeight: '600', marginBottom: '6px', color: '#495057' },
//   required: { color: '#dc3545' },
//   input: {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '8px',
//     border: '1px solid #ced4da',
//     fontSize: '14px',
//   },
//   textarea: {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '8px',
//     border: '1px solid #ced4da',
//     fontSize: '14px',
//     minHeight: '70px',
//     resize: 'vertical',
//   },
//   select: {
//     width: '100%',
//     padding: '10px',
//     borderRadius: '8px',
//     border: '1px solid #ced4da',
//     fontSize: '14px',
//   },
//   fileInput: { width: '100%', maxWidth: '400px', fontSize: '14px' },
//   submitContainer: { textAlign: 'center', marginTop: '25px' },
//   submitButton: {
//     backgroundColor: '#007bff',
//     color: '#fff',
//     padding: '12px 30px',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '15px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'background-color 0.2s ease',
//   },
//   successAlert: {
//     backgroundColor: '#d4edda',
//     color: '#155724',
//     padding: '12px',
//     borderRadius: '6px',
//     marginBottom: '15px',
//     border: '1px solid #c3e6cb',
//     textAlign: 'center',
//   },
//   errorAlert: {
//     backgroundColor: '#f8d7da',
//     color: '#721c24',
//     padding: '12px',
//     borderRadius: '6px',
//     marginBottom: '15px',
//     border: '1px solid #f5c6cb',
//     textAlign: 'center',
//   },
// };

// export default AddProduct;

// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     productCode: '',
//     productName: '',
//     productDescription: '',
//     price: '',
//     latestPurchasePrice: '',
//     sellingPrice: '',
//     category: '',
//     productCompany: '',
//     productUnit: '',
//     stockQuantity: '',
//   });
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [shelves, setShelves] = useState([]);
//   const [selectedShelf, setSelectedShelf] = useState('');
//   const [loading, setLoading] = useState(false);

//   const role = localStorage.getItem('role');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchShelves = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/shelves/list-shelves');
//         if (!response.ok) throw new Error('Failed to fetch shelves');
//         const data = await response.json();
//         setShelves(data);
//       } catch (err) {
//         setError('Could not load shelves. Please try again later.');
//       }
//     };
//     fetchShelves();
//   }, []);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     if (!selectedShelf) {
//       setError('Please select a shelf.');
//       setLoading(false);
//       return;
//     }

//     if (!formData.productCode || !formData.productName || !formData.price) {
//       setError('Please fill in all required fields.');
//       setLoading(false);
//       return;
//     }

//     const shelfId = parseInt(selectedShelf);
//     if (isNaN(shelfId)) {
//       setError('Invalid shelf selection.');
//       setLoading(false);
//       return;
//     }

//     const formDataToSend = new FormData();
    
//     if (userId) {
//       formDataToSend.append('userId', userId);
//     }

//     Object.keys(formData).forEach(key => {
//       const value = formData[key];
//       let finalValue;
      
//       if (value || value === 0) {
//         if (key.includes('Price') || key === 'price') {
//           finalValue = parseFloat(value) || 0;
//         } else if (key === 'stockQuantity') {
//           finalValue = parseInt(value) || 0;
//         } else {
//           finalValue = value;
//         }
//       } else {
//         if (key.includes('Price') || key === 'price') {
//           finalValue = 0;
//         } else if (key === 'stockQuantity') {
//           finalValue = 0;
//         } else {
//           finalValue = '';
//         }
//       }
      
//       formDataToSend.append(key, finalValue);
//     });

//     formDataToSend.append('shelfId', shelfId);
//     if (image) formDataToSend.append('image', image);

//     try {
//       const response = await fetch('http://localhost:8080/api/product/add/product', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Request failed');
//       }

//       await response.json();
//       setSuccess('✅ Product added successfully!');
      
//       setFormData({
//         productCode: '', productName: '', productDescription: '', 
//         latestPurchasePrice: '', sellingPrice: '', category: '', productCompany: '',
//         productUnit: '', stockQuantity: '',
//       });
//       setImage(null);
//       setSelectedShelf('');
      
//     } catch (err) {
//       setError(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getShelfDisplayName = (shelf) => {
//     if (shelf.shelfName && shelf.locationDescription) {
//       return `${shelf.shelfName} - ${shelf.locationDescription}`;
//     }
//     return shelf.shelfName || shelf.locationDescription || `Shelf ${shelf.id || 'Unknown'}`;
//   };

//   const getShelfId = (shelf) => shelf.id || shelf.shelfId;

//   const clearForm = () => {
//     setFormData({
//       productCode: '', productName: '', productDescription: '', 
//       latestPurchasePrice: '', sellingPrice: '', category: '', productCompany: '',
//       productUnit: '', stockQuantity: '',
//     });
//     setImage(null);
//     setSelectedShelf('');
//     setError(null);
//     setSuccess(null);
//   };

//   return (
//     <>
//       <Navigation />
//       <div style={styles.container}>
//         <div style={styles.card}>
//           {/* Compact Header */}
//           <div style={styles.header}>
//             <h1 style={styles.title}>➕ Add New Product</h1>
//             {/* <div style={styles.userBadge}>
//               <span style={styles.roleBadge}>{role}</span>
//               <span style={styles.userId}>ID: {userId}</span>
//             </div> */}
//           </div>

//           {/* Alerts */}
//           {success && (
//             <div style={styles.successAlert}>
//               <span>✅</span>
//               {success}
//               <button onClick={() => setSuccess(null)} style={styles.closeBtn}>×</button>
//             </div>
//           )}

//           {error && (
//             <div style={styles.errorAlert}>
//               <span>⚠️</span>
//               {error}
//               <button onClick={() => setError(null)} style={styles.closeBtn}>×</button>
//             </div>
//           )}

//           <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//             {/* Compact 3-Column Grid */}
//             <div style={styles.formGrid}>
//               <FormField label="Product Code *" value={formData.productCode} onChange={(v) => handleInputChange('productCode', v)} required disabled={loading} placeholder="PROD-001" />
//               <FormField label="Product Name *" value={formData.productName} onChange={(v) => handleInputChange('productName', v)} required disabled={loading} placeholder="Product name" />
//               <FormField label="Category" value={formData.category} onChange={(v) => handleInputChange('category', v)} disabled={loading} placeholder="Category" />
              
//               <FormField label="Company *" value={formData.productCompany} onChange={(v) => handleInputChange('productCompany', v)} required disabled={loading} placeholder="Manufacturer" />
//               <FormField label="Unit" value={formData.productUnit} onChange={(v) => handleInputChange('productUnit', v)} disabled={loading} placeholder="piece, kg" />
//               <FormField label="Stock Qty" type="number" value={formData.stockQuantity} onChange={(v) => handleInputChange('stockQuantity', v)} disabled={loading} min="0" placeholder="0" />
              
//               <FormField label="Purchase Price" type="number" step="0.01" value={formData.latestPurchasePrice} onChange={(v) => handleInputChange('latestPurchasePrice', v)} disabled={loading} min="0" placeholder="0.00" />
//               <FormField label="Selling Price" type="number" step="0.01" value={formData.sellingPrice} onChange={(v) => handleInputChange('sellingPrice', v)} disabled={loading} min="0" placeholder="0.00" />
//               {/* <FormField label="Price *" type="number" step="0.01" value={formData.price} onChange={(v) => handleInputChange('price', v)} required disabled={loading} min="0" placeholder="0.00" /> */}
//             </div>

//             {/* Compact Row for Description and Shelf */}
//             <div style={styles.compactRow}>
//               <div style={styles.compactField}>
//                 <label style={styles.label}>Description</label>
//                 <textarea
//                   value={formData.productDescription}
//                   onChange={(e) => handleInputChange('productDescription', e.target.value)}
//                   disabled={loading}
//                   placeholder="Product description..."
//                   style={styles.textarea}
//                 />
//               </div>
              
//               <div style={styles.compactField}>
//                 <label style={styles.label}>Shelf Location *</label>
//                 <select
//                   value={selectedShelf}
//                   onChange={(e) => setSelectedShelf(e.target.value)}
//                   required
//                   disabled={loading}
//                   style={styles.select}
//                 >
//                   <option value="">-- Select Shelf --</option>
//                   {shelves.map((shelf) => (
//                     <option key={getShelfId(shelf)} value={getShelfId(shelf)}>
//                       {getShelfDisplayName(shelf)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Compact Image Upload */}
//             <div style={styles.imageSection}>
//               <label style={styles.label}>Product Image</label>
//               <div style={styles.fileUpload}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   disabled={loading}
//                   style={styles.fileInput}
//                   id="image-upload"
//                 />
//                 <label htmlFor="image-upload" style={styles.fileLabel}>
//                   {image ? '📷 Change Image' : '📁 Choose Image'}
//                 </label>
//                 {image && <span style={styles.fileName}>{image.name}</span>}
//               </div>
//             </div>

//             {/* Compact Action Buttons */}
//             <div style={styles.actionBar}>
//               <button
//                 type="button"
//                 onClick={clearForm}
//                 disabled={loading}
//                 style={styles.clearBtn}
//               >
//                 🗑️ Clear
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   ...styles.submitBtn,
//                   opacity: loading ? 0.7 : 1,
//                 }}
//               >
//                 {loading ? '⏳ Adding...' : '➕ Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// const FormField = ({ label, type = 'text', value, onChange, placeholder, required = false, disabled = false, step, min }) => (
//   <div style={styles.fieldGroup}>
//     <label style={styles.label}>
//       {label}
//       {required && <span style={styles.required}>*</span>}
//     </label>
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       required={required}
//       disabled={disabled}
//       step={step}
//       min={min}
//       style={styles.input}
//     />
//   </div>
// );

// const styles = {
//   container: {
//     backgroundColor: '#f8f9fa',
//     marginLeft: '150px',
//      padding: '20px',
//     marginTop: '30px',
//     minHeight: '85vh',
//     minHeight: '100vh',
//     fontFamily: "'Inter', 'Segoe UI', sans-serif",
//   },
//   card: {
//     maxWidth: '1250px',
//     margin: '0 auto',
//     backgroundColor: 'white',
//       marginTop: '70px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//     padding: '30px',
//     height: '730px',
//     minHeight: 'auto',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//       marginTop: '10px',
//     marginBottom: '20px',
//     paddingBottom: '15px',
//     borderBottom: '2px solid #f1f3f4',
//   },
//   title: {
//     color: '#1a365d',
//     fontSize: '24px',
//     fontWeight: '700',
//     margin: 0,
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//   },
//   userBadge: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '10px',
//   },
//   roleBadge: {
//     backgroundColor: '#e3f2fd',
//     color: '#1976d2',
//     padding: '4px 12px',
//     borderRadius: '20px',
//     fontSize: '12px',
//     fontWeight: '600',
//   },
//   userId: {
//     color: '#666',
//     fontSize: '12px',
//     fontWeight: '500',
//   },
//   formGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '15px',
//     marginBottom: '20px',
//   },
//   compactRow: {
//     display: 'grid',
//     gridTemplateColumns: '2fr 1fr',
//     gap: '20px',
//     marginBottom: '20px',
//   },
//   compactField: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   fieldGroup: {
//     marginBottom: '0',
//   },
//   label: {
//     display: 'block',
//     fontWeight: '600',
//     marginBottom: '6px',
//     color: '#374151',
//     fontSize: '13px',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px',
//   },
//   required: {
//     color: '#dc3545',
//     marginLeft: '2px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid #d1d5db',
//     fontSize: '14px',
//     outline: 'none',
//     transition: 'all 0.2s ease',
//     backgroundColor: '#fafafa',
//   },
//   textarea: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid #d1d5db',
//     fontSize: '14px',
//     minHeight: '80px',
//     resize: 'vertical',
//     fontFamily: 'inherit',
//     outline: 'none',
//     transition: 'all 0.2s ease',
//     backgroundColor: '#fafafa',
//   },
//   select: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid #d1d5db',
//     fontSize: '14px',
//     outline: 'none',
//     transition: 'all 0.2s ease',
//     backgroundColor: '#fafafa',
//     cursor: 'pointer',
//   },
//   imageSection: {
//     marginBottom: '25px',
//   },
//   fileUpload: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     flexWrap: 'wrap',
//   },
//   fileInput: {
//     display: 'none',
//   },
//   fileLabel: {
//     backgroundColor: '#6b7280',
//     color: 'white',
//     padding: '8px 16px',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '13px',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//     border: 'none',
//   },
//   fileName: {
//     color: '#6b7280',
//     fontSize: '13px',
//     fontStyle: 'italic',
//   },
//   actionBar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '30px',
//     paddingTop: '20px',
//     borderTop: '1px solid #e5e7eb',
//   },
//   clearBtn: {
//     backgroundColor: '#6b7280',
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//   },
//   submitBtn: {
//     backgroundColor: '#007bff',
//     color: 'white',
//     padding: '12px 30px',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
//     transition: 'all 0.2s ease',
//     minWidth: '140px',
//   },
//   successAlert: {
//     backgroundColor: '#d1fae5',
//     color: '#065f46',
//     padding: '12px 16px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//     border: '1px solid #a7f3d0',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     fontSize: '14px',
//     fontWeight: '500',
//   },
//   errorAlert: {
//     backgroundColor: '#fee2e2',
//     color: '#991b1b',
//     padding: '12px 16px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//     border: '1px solid #fecaca',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     fontSize: '14px',
//     fontWeight: '500',
//   },
//   closeBtn: {
//     background: 'none',
//     border: 'none',
//     fontSize: '18px',
//     cursor: 'pointer',
//     color: 'inherit',
//     padding: '0',
//     width: '20px',
//     height: '20px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// };

// export default AddProduct;

// import React, { useState, useEffect } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     productCode: '',
//     productName: '',
//     productDescription: '',
//     price: '', // Added back for API requirement
//     latestPurchasePrice: '',
//     sellingPrice: '',
//     category: '',
//     productCompany: '',
//     productUnit: '',
//     stockQuantity: '',
//   });
//   const [image, setImage] = useState(null);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [shelves, setShelves] = useState([]);
//   const [selectedShelf, setSelectedShelf] = useState('');
//   const [loading, setLoading] = useState(false);

//   const role = localStorage.getItem('role');
//   const userId = localStorage.getItem('userId');

//   useEffect(() => {
//     const fetchShelves = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/shelves/list-shelves');
//         if (!response.ok) throw new Error('Failed to fetch shelves');
//         const data = await response.json();
//         setShelves(data);
//       } catch (err) {
//         setError('Could not load shelves. Please try again later.');
//       }
//     };
//     fetchShelves();
//   }, []);

//   // Auto-set price when selling price changes
//   useEffect(() => {
//     if (formData.sellingPrice) {
//       setFormData(prev => ({
//         ...prev,
//         price: formData.sellingPrice // Set price to match selling price
//       }));
//     }
//   }, [formData.sellingPrice]);

//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleFormSubmit = async (event) => {
//     event.preventDefault();
//     setError(null);
//     setSuccess(null);
//     setLoading(true);

//     if (!selectedShelf) {
//       setError('Please select a shelf.');
//       setLoading(false);
//       return;
//     }

//     if (!formData.productCode || !formData.productName || !formData.price) {
//       setError('Please fill in all required fields.');
//       setLoading(false);
//       return;
//     }

//     const shelfId = parseInt(selectedShelf);
//     if (isNaN(shelfId)) {
//       setError('Invalid shelf selection.');
//       setLoading(false);
//       return;
//     }

//     const formDataToSend = new FormData();
    
//     if (userId) {
//       formDataToSend.append('userId', userId);
//     }

//     Object.keys(formData).forEach(key => {
//       const value = formData[key];
//       let finalValue;
      
//       if (value || value === 0) {
//         if (key.includes('Price') || key === 'price') {
//           finalValue = parseFloat(value) || 0;
//         } else if (key === 'stockQuantity') {
//           finalValue = parseInt(value) || 0;
//         } else {
//           finalValue = value;
//         }
//       } else {
//         if (key.includes('Price') || key === 'price') {
//           finalValue = 0;
//         } else if (key === 'stockQuantity') {
//           finalValue = 0;
//         } else {
//           finalValue = '';
//         }
//       }
      
//       formDataToSend.append(key, finalValue);
//     });

//     formDataToSend.append('shelfId', shelfId);
//     if (image) formDataToSend.append('image', image);

//     try {
//       const response = await fetch('http://localhost:8080/api/product/add/product', {
//         method: 'POST',
//         body: formDataToSend,
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(errorText || 'Request failed');
//       }

//       await response.json();
//       setSuccess('✅ Product added successfully!');
      
//       setFormData({
//         productCode: '', productName: '', productDescription: '', 
//         price: '', // Reset price
//         latestPurchasePrice: '', sellingPrice: '', category: '', productCompany: '',
//         productUnit: '', stockQuantity: '',
//       });
//       setImage(null);
//       setSelectedShelf('');
      
//     } catch (err) {
//       setError(`Error: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getShelfDisplayName = (shelf) => {
//     if (shelf.shelfName && shelf.locationDescription) {
//       return `${shelf.shelfName} - ${shelf.locationDescription}`;
//     }
//     return shelf.shelfName || shelf.locationDescription || `Shelf ${shelf.id || 'Unknown'}`;
//   };

//   const getShelfId = (shelf) => shelf.id || shelf.shelfId;

//   const clearForm = () => {
//     setFormData({
//       productCode: '', productName: '', productDescription: '', 
//       price: '', // Reset price
//       latestPurchasePrice: '', sellingPrice: '', category: '', productCompany: '',
//       productUnit: '', stockQuantity: '',
//     });
//     setImage(null);
//     setSelectedShelf('');
//     setError(null);
//     setSuccess(null);
//   };

//   return (
//     <>
//       <Navigation />
//       <div style={styles.container}>
//         <div style={styles.card}>
//           {/* Compact Header */}
//           <div style={styles.header}>
//             <h1 style={styles.title}>➕ Add New Product</h1>
//           </div>

//           {/* Alerts */}
//           {success && (
//             <div style={styles.successAlert}>
//               <span>✅</span>
//               {success}
//               <button onClick={() => setSuccess(null)} style={styles.closeBtn}>×</button>
//             </div>
//           )}

//           {error && (
//             <div style={styles.errorAlert}>
//               <span>⚠️</span>
//               {error}
//               <button onClick={() => setError(null)} style={styles.closeBtn}>×</button>
//             </div>
//           )}

//           <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//             {/* Compact 3-Column Grid */}
//             <div style={styles.formGrid}>
//               <FormField label="Product Code *" value={formData.productCode} onChange={(v) => handleInputChange('productCode', v)} required disabled={loading} placeholder="PROD-001" />
//               <FormField label="Product Name *" value={formData.productName} onChange={(v) => handleInputChange('productName', v)} required disabled={loading} placeholder="Product name" />
//               <FormField label="Category" value={formData.category} onChange={(v) => handleInputChange('category', v)} disabled={loading} placeholder="Category" />
              
//               <FormField label="Company *" value={formData.productCompany} onChange={(v) => handleInputChange('productCompany', v)} required disabled={loading} placeholder="Manufacturer" />
//               <FormField label="Unit" value={formData.productUnit} onChange={(v) => handleInputChange('productUnit', v)} disabled={loading} placeholder="piece, kg" />
//               <FormField label="Stock Qty" type="number" value={formData.stockQuantity} onChange={(v) => handleInputChange('stockQuantity', v)} disabled={loading} min="0" placeholder="0" />
              
//               <FormField label="Purchase Price" type="number" step="0.01" value={formData.latestPurchasePrice} onChange={(v) => handleInputChange('latestPurchasePrice', v)} disabled={loading} min="0" placeholder="0.00" />
//               <FormField label="Selling Price *" type="number" step="0.01" value={formData.sellingPrice} onChange={(v) => handleInputChange('sellingPrice', v)} required disabled={loading} min="0" placeholder="0.00" />
              
//               {/* Hidden Price Field - Auto-filled from Selling Price */}
//               <div style={styles.hiddenField}>
//                 <FormField 
//                   label="Price (Auto)" 
//                   type="number" 
//                   step="0.01" 
//                   value={formData.price} 
//                   onChange={(v) => handleInputChange('price', v)} 
//                   required 
//                   disabled={true} 
//                   placeholder="Auto-filled" 
//                 />
//                 <div style={styles.autoFillNote}>
//                   ℹ️ Auto-filled from Selling Price
//                 </div>
//               </div>
//             </div>

//             {/* Compact Row for Description and Shelf */}
//             <div style={styles.compactRow}>
//               <div style={styles.compactField}>
//                 <label style={styles.label}>Description</label>
//                 <textarea
//                   value={formData.productDescription}
//                   onChange={(e) => handleInputChange('productDescription', e.target.value)}
//                   disabled={loading}
//                   placeholder="Product description..."
//                   style={styles.textarea}
//                 />
//               </div>
              
//               <div style={styles.compactField}>
//                 <label style={styles.label}>Shelf Location *</label>
//                 <select
//                   value={selectedShelf}
//                   onChange={(e) => setSelectedShelf(e.target.value)}
//                   required
//                   disabled={loading}
//                   style={styles.select}
//                 >
//                   <option value="">-- Select Shelf --</option>
//                   {shelves.map((shelf) => (
//                     <option key={getShelfId(shelf)} value={getShelfId(shelf)}>
//                       {getShelfDisplayName(shelf)}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* Compact Image Upload */}
//             <div style={styles.imageSection}>
//               <label style={styles.label}>Product Image</label>
//               <div style={styles.fileUpload}>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   disabled={loading}
//                   style={styles.fileInput}
//                   id="image-upload"
//                 />
//                 <label htmlFor="image-upload" style={styles.fileLabel}>
//                   {image ? '📷 Change Image' : '📁 Choose Image'}
//                 </label>
//                 {image && <span style={styles.fileName}>{image.name}</span>}
//               </div>
//             </div>

//             {/* Compact Action Buttons */}
//             <div style={styles.actionBar}>
//               <button
//                 type="button"
//                 onClick={clearForm}
//                 disabled={loading}
//                 style={styles.clearBtn}
//               >
//                 🗑️ Clear
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 style={{
//                   ...styles.submitBtn,
//                   opacity: loading ? 0.7 : 1,
//                 }}
//               >
//                 {loading ? '⏳ Adding...' : '➕ Add Product'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// const FormField = ({ label, type = 'text', value, onChange, placeholder, required = false, disabled = false, step, min }) => (
//   <div style={styles.fieldGroup}>
//     <label style={styles.label}>
//       {label}
//       {required && <span style={styles.required}>*</span>}
//     </label>
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       required={required}
//       disabled={disabled}
//       step={step}
//       min={min}
//       style={{
//         ...styles.input,
//         ...(disabled ? styles.disabledInput : {})
//       }}
//     />
//   </div>
// );

// const styles = {
//   container: {
//     backgroundColor: '#f8f9fa',
//     marginLeft: '150px',
//     padding: '20px',
//     marginTop: '0px',
//      marginBottom: '20px',
//     minHeight: '85vh',
//     fontFamily: "'Inter', 'Segoe UI', sans-serif",
//   },
//   card: {
//     maxWidth: '1250px',
//     margin: '0 auto',
//     backgroundColor: 'white',
//     marginTop: '70px',
//     borderRadius: '12px',
//     boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
//     padding: '30px',
//     height: '730px',
//     minHeight: 'auto',
//   },
//   header: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '10px',
//     marginBottom: '20px',
//     paddingBottom: '15px',
//     borderBottom: '2px solid #f1f3f4',
//   },
//   title: {
//     color: '#1a365d',
//     fontSize: '24px',
//     fontWeight: '700',
//     margin: 0,
//     background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//   },
//   formGrid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(3, 1fr)',
//     gap: '15px',
//     marginBottom: '20px',
//   },
//   compactRow: {
//     display: 'grid',
//     gridTemplateColumns: '2fr 1fr',
//     gap: '20px',
//     marginBottom: '20px',
//   },
//   compactField: {
//     display: 'flex',
//     flexDirection: 'column',
//   },
//   fieldGroup: {
//     marginBottom: '0',
//   },
//   label: {
//     display: 'block',
//     fontWeight: '600',
//     marginBottom: '6px',
//     color: '#374151',
//     fontSize: '13px',
//     textTransform: 'uppercase',
//     letterSpacing: '0.5px',
//   },
//   required: {
//     color: '#dc3545',
//     marginLeft: '2px',
//   },
//   input: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid #d1d5db',
//     fontSize: '14px',
//     outline: 'none',
//     transition: 'all 0.2s ease',
//     backgroundColor: '#fafafa',
//   },
//   disabledInput: {
//     backgroundColor: '#e9ecef',
//     color: '#6c757d',
//     cursor: 'not-allowed',
//   },
//   textarea: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid #d1d5db',
//     fontSize: '14px',
//     minHeight: '80px',
//     resize: 'vertical',
//     fontFamily: 'inherit',
//     outline: 'none',
//     transition: 'all 0.2s ease',
//     backgroundColor: '#fafafa',
//   },
//   select: {
//     width: '100%',
//     padding: '10px 12px',
//     borderRadius: '8px',
//     border: '1px solid #d1d5db',
//     fontSize: '14px',
//     outline: 'none',
//     transition: 'all 0.2s ease',
//     backgroundColor: '#fafafa',
//     cursor: 'pointer',
//   },
//   imageSection: {
//     marginBottom: '25px',
//   },
//   fileUpload: {
//     display: 'flex',
//     alignItems: 'center',
//     gap: '12px',
//     flexWrap: 'wrap',
//   },
//   fileInput: {
//     display: 'none',
//   },
//   fileLabel: {
//     backgroundColor: '#6b7280',
//     color: 'white',
//     padding: '8px 16px',
//     borderRadius: '6px',
//     cursor: 'pointer',
//     fontSize: '13px',
//     fontWeight: '500',
//     transition: 'all 0.2s ease',
//     border: 'none',
//   },
//   fileName: {
//     color: '#6b7280',
//     fontSize: '13px',
//     fontStyle: 'italic',
//   },
//   actionBar: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginTop: '30px',
//     paddingTop: '20px',
//     borderTop: '1px solid #e5e7eb',
//   },
//   clearBtn: {
//     backgroundColor: '#6b7280',
//     color: 'white',
//     padding: '10px 20px',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     transition: 'all 0.2s ease',
//   },
//   submitBtn: {
//     backgroundColor: '#007bff',
//     color: 'white',
//     padding: '12px 30px',
//     border: 'none',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     cursor: 'pointer',
//     boxShadow: '0 2px 8px rgba(0,123,255,0.3)',
//     transition: 'all 0.2s ease',
//     minWidth: '140px',
//   },
//   successAlert: {
//     backgroundColor: '#d1fae5',
//     color: '#065f46',
//     padding: '12px 16px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//     border: '1px solid #a7f3d0',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     fontSize: '14px',
//     fontWeight: '500',
//   },
//   errorAlert: {
//     backgroundColor: '#fee2e2',
//     color: '#991b1b',
//     padding: '12px 16px',
//     borderRadius: '8px',
//     marginBottom: '20px',
//     border: '1px solid #fecaca',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     fontSize: '14px',
//     fontWeight: '500',
//   },
//   closeBtn: {
//     background: 'none',
//     border: 'none',
//     fontSize: '18px',
//     cursor: 'pointer',
//     color: 'inherit',
//     padding: '0',
//     width: '20px',
//     height: '20px',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   hiddenField: {
//     position: 'relative',
//   },
//   autoFillNote: {
//     fontSize: '10px',
//     color: '#6c757d',
//     fontStyle: 'italic',
//     marginTop: '2px',
//   },
// };

// export default AddProduct;
