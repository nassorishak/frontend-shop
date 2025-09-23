
// import React, { useEffect, useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ViewProducts = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/product/get/product')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         setError(error.message);
//       });
//   }, []);

//   const handleUpdateOpen = (item) => {
//     setSelectedProduct(item);
//     setIsModalOpen(true);
//   };

//   const handleUpdate = (updatedProduct) => {
//     updatedProduct.productId = selectedProduct.productId;

//     axios.put(`http://localhost:8080/api/product/update/${updatedProduct.productId}`, updatedProduct)
//       .then(() => {
//         const updatedData = data.map(product =>
//           product.productId === updatedProduct.productId ? updatedProduct : product
//         );
//         setData(updatedData);
//         setIsModalOpen(false);
//         setSelectedProduct(null);
//       })
//       .catch((error) => {
//         console.error('Update error:', error);
//       });
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleDeleteConfirmation = (item) => {
//     if (window.confirm(`Are you sure you want to delete ${item.productName}?`)) {
//       axios.delete(`http://localhost:8080/api/product/delete/${item.productId}`)
//         .then(() => {
//           setData(data.filter((product) => product.productId !== item.productId));
//         })
//         .catch((error) => {
//           console.error('Delete error:', error);
//         });
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedProduct(prevState => ({
//           ...prevState,
//           image: reader.result.split(',')[1] // Store just the base64 string part
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <Navigation />
//       <div className="main" style={{marginBottom: "250px", padding: "10px",marginRight:"100px"}}>
//         <h1 style={{ textAlign: "center", backgroundColor: "black", width: "100%", marginTop: "1px", padding: "10px",color:"whitesmoke",borderRadius:"15px" }}>
//           Vendor View Product
//         </h1>
//         {error ? (
//           <p>Error: {error}</p>
//         ) : (
//           <div style={{ 
//             overflowX: 'auto',
//             height: '500px', // Fixed height for scroll container
//             overflowY: 'auto', // Enable vertical scrolling
//             marginTop: '20px',
//           }}>
//             <table style={{ 
//               width: '100%', 
//               borderCollapse: 'collapse',
//               tableLayout: 'fixed'
//             }}>
//               <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
//                 <tr style={{ background: '#f0f0f0' }}>
//                   <th style={{ width: '80px', padding: '8px' }}>ProductId</th>
//                   <th style={{ width: '100px', padding: '8px' }}>Product Code</th>
//                   <th style={{ width: '120px', padding: '8px' }}>Product Image</th>
//                   <th style={{ width: '120px', padding: '8px' }}>Product Name</th>
//                   <th style={{ width: '150px', padding: '8px' }}>Product Description</th>
//                   <th style={{ width: '80px', padding: '8px' }}>Price</th>
//                   <th style={{ width: '100px', padding: '8px' }}>Category</th>
//                   <th style={{ width: '120px', padding: '8px' }}>Product Company</th>
//                   <th style={{ width: '100px', padding: '8px' }}>Product Unit</th>
//                   <th style={{ width: '100px', padding: '8px' }}>Stock Quantity</th>
//                   <th style={{ width: '80px', padding: '8px' }}>Action</th>
//                   <th style={{ width: '80px', padding: '8px' }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item) => (
//                   <tr key={item.productId} style={{ borderBottom: '1px solid #ddd',borderRadius:"15px" }}>
//                     <td style={{ padding: '8px' }}>{item.productId}</td>
//                     <td style={{ padding: '8px' }}>{item.productCode || 'N/A'}</td>
//                     <td style={{ padding: '8px' }}>
//                       {item.image ? (
//                         <img src={`data:image/png;base64,${item.image}`} alt="product" style={{ width: '90px', height: 'auto' }} />
//                       ) : 'No Image'}
//                     </td>
//                     <td style={{ padding: '8px' }}>{item.productName}</td>
//                     <td style={{ padding: '8px' }}>{item.productDescription}</td>
//                     <td style={{ padding: '8px' }}>{item.price}</td>
//                     <td style={{ padding: '8px' }}>{item.category}</td>
//                     <td style={{ padding: '8px' }}>{item.productCompany}</td>
//                     <td style={{ padding: '8px' }}>{item.productUnit || 'N/A'}</td>
//                     <td style={{ padding: '8px' }}>{item.stockQuantity != null ? item.stockQuantity : 'N/A'}</td>
//                     <td style={{ padding: '8px' }}>
//                       <button className="edit-btn" onClick={() => handleUpdateOpen(item)} style={{borderRadius:"5px"}}>Update</button>
//                     </td>
//                     <td style={{ padding: '8px' }}>
//                       <button className="edit-btn" style={{ backgroundColor: "red", borderRadius: "5px" }} onClick={() => handleDeleteConfirmation(item)}>Delete</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//         {data.length === 0 && !error ? <p>No products found</p> : null}
//       </div>

//       {isModalOpen && (
//         <div className="modal-overlay">
//           <div className="modal-content" style={{ backgroundColor: "white" }}>
//             <h2 style={{ backgroundColor: "white" }}>Update Product</h2>
//             <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedProduct); }} style={{ backgroundColor: "white" }}>
//               <div>
//                 <label>Product Code</label>
//                 <input type="text" value={selectedProduct?.productCode || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productCode: e.target.value })} />
//               </div>
//               <div>
//                 <label>Product Name</label>
//                 <input type="text" value={selectedProduct?.productName || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })} required />
//               </div>
//               <div>
//                 <label>Product Description</label>
//                 <textarea value={selectedProduct?.productDescription || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })} required />
//               </div>
//               <div>
//                 <label>Price</label>
//                 <input type="number" value={selectedProduct?.price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })} required />
//               </div>
//               <div>
//                 <label>Category</label>
//                 <input type="text" value={selectedProduct?.category || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} required />
//               </div>
//               <div>
//                 <label>Product Company</label>
//                 <input type="text" value={selectedProduct?.productCompany || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productCompany: e.target.value })} />
//               </div>
//               <div>
//                 <label>Product Unit</label>
//                 <input type="text" value={selectedProduct?.productUnit || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productUnit: e.target.value })} />
//               </div>
//               <div>
//                 <label>Stock Quantity</label>
//                 <input type="number" value={selectedProduct?.stockQuantity || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, stockQuantity: Number(e.target.value) })} />
//               </div>
//               <div>
//                 <label>Image</label>
//                 <input type="file" accept="image/*" onChange={handleImageUpload} />
//                 {selectedProduct?.image && (
//                   <img src={`data:image/png;base64,${selectedProduct.image}`} alt="product" style={{ width: '90px', height: 'auto', marginTop: '10px' }} />
//                 )}
//               </div>
//               <div style={{ color:"green", marginLeft:"140px" }}> 
//                 <button type="button" onClick={handleCloseModal} style={{ backgroundColor:"green", borderRadius:"5px" }}>Cancel</button>
//                 <button type="submit" style={{ backgroundColor:"red", marginLeft:"30px", borderRadius:"5px" }}>Update</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewProducts;
// import React, { useEffect, useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const ViewProducts = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:8080/api/product/get/product')
//       .then((response) => setData(response.data))
//       .catch((error) => setError(error.message));
//   }, []);

//   const handleUpdateOpen = (item) => {
//     setSelectedProduct(item);
//     setIsModalOpen(true);
//   };

//   const handleUpdate = (updatedProduct) => {
//     updatedProduct.productId = selectedProduct.productId;
//     axios.put(`http://localhost:8080/api/product/update/${updatedProduct.productId}`, updatedProduct)
//       .then(() => {
//         const updatedData = data.map(product =>
//           product.productId === updatedProduct.productId ? updatedProduct : product
//         );
//         setData(updatedData);
//         setIsModalOpen(false);
//         setSelectedProduct(null);
//       })
//       .catch((error) => console.error('Update error:', error));
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleDeleteConfirmation = (item) => {
//     if (window.confirm(`Are you sure you want to delete ${item.productName}?`)) {
//       axios.delete(`http://localhost:8080/api/product/delete/${item.productId}`)
//         .then(() => setData(data.filter((p) => p.productId !== item.productId)))
//         .catch((error) => console.error('Delete error:', error));
//     }
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedProduct(prev => ({
//           ...prev,
//           image: reader.result.split(',')[1]
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <Navigation />
//       <div style={{ marginBottom: "80px", padding: "20px", backgroundColor: "#9fa5aaff",width:"1450px",marginLeft:"230px" }}>
//         <h1 style={{
//           textAlign: "center",
//           backgroundColor: "#2c3e50",
//           color: "white",
//           padding: "12px",
//           marginTop:"30px",
//           borderRadius: "10px",
//           marginBottom: "0px"
//         }}>
//           Vendor Product List
//         </h1>

//         {error ? (
//           <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>
//         ) : (
//           <div style={{
//             overflowX: 'auto',
//             maxHeight: '500px',
//             border: "1px solid #ddd",
//             borderRadius: "10px",
//             boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
//           }}>
//             <table style={{
//               width: '100%',
//               borderCollapse: 'collapse',
//               tableLayout: 'fixed',
//               fontFamily: "Arial, sans-serif",
//               fontSize: "14px"
//             }}>
//               <thead style={{ position: "sticky", top: 0, zIndex: 1,color:"red",overflowY:"-moz-hidden-unscrollable" }}>
//                 <tr style={{ background: "#d0d3d6ff", color: "black" ,overflowY:"-moz-hidden-unscrollable"}}>
//                   <th style={{ padding: "10px", width: "60px" }}>ID</th>
//                   <th style={{ padding: "10px", width: "100px" }}>Code</th>
//                   <th style={{ padding: "10px", width: "120px" }}>Image</th>
//                   <th style={{ padding: "10px", width: "150px" }}>Name</th>
//                   <th style={{ padding: "10px", width: "200px" }}>Description</th>
//                   <th style={{ padding: "10px", width: "80px" }}>Price</th>
//                   <th style={{ padding: "10px", width: "120px" }}>Category</th>
//                   <th style={{ padding: "10px", width: "120px" }}>Company</th>
//                   <th style={{ padding: "10px", width: "100px" }}>Unit</th>
//                   <th style={{ padding: "10px", width: "100px" }}>Stock</th>
//                   <th style={{ padding: "10px", width: "80px" }}>Update</th>
//                   <th style={{ padding: "10px", width: "80px" }}>Delete</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.map((item, index) => (
//                   <tr key={item.productId} style={{
//                     borderBottom: "1px solid #eee",
//                     backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white"
//                   }}>
//                     <td style={{ padding: "8px", textAlign: "center" }}>{item.productId}</td>
//                     <td style={{ padding: "8px", wordWrap: "break-word" }}>{item.productCode || 'N/A'}</td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>
//                       {item.image ? (
//                         <img src={`data:image/png;base64,${item.image}`} alt="product"
//                           style={{ width: "70px", height: "auto", borderRadius: "6px" }} />
//                       ) : <span style={{ color: "gray" }}>No Image</span>}
//                     </td>
//                     <td style={{ padding: "8px" }}>{item.productName}</td>
//                     <td style={{ padding: "8px", wordWrap: "break-word" }}>{item.productDescription}</td>
//                     <td style={{ padding: "8px" }}>{item.price}</td>
//                     <td style={{ padding: "8px" }}>{item.category}</td>
//                     <td style={{ padding: "8px" }}>{item.productCompany}</td>
//                     <td style={{ padding: "8px" }}>{item.productUnit || 'N/A'}</td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>{item.stockQuantity ?? 'N/A'}</td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>
//                       <button onClick={() => handleUpdateOpen(item)} style={{
//                         backgroundColor: "#27ae60",
//                         color: "white",
//                         border: "none",
//                         padding: "6px 12px",
//                         borderRadius: "6px",
//                         cursor: "pointer"
//                       }}>
//                         Update
//                       </button>
//                     </td>
//                     <td style={{ padding: "8px", textAlign: "center" }}>
//                       <button onClick={() => handleDeleteConfirmation(item)} style={{
//                         backgroundColor: "#e74c3c",
//                         color: "white",
//                         border: "none",
//                         padding: "6px 12px",
//                         borderRadius: "6px",
//                         cursor: "pointer"
//                       }}>
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {data.length === 0 && !error ? (
//           <p style={{ textAlign: "center", marginTop: "20px" }}>No products found</p>
//         ) : null}
//       </div>

//       {isModalOpen && (
//         <div style={{
//           position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
//           backgroundColor: "rgba(0,0,0,0.5)",
//           display: "flex", justifyContent: "center", alignItems: "center"
//         }}>
//           <div style={{
//             backgroundColor: "white",
//             padding: "20px",
//             borderRadius: "10px",
//             width: "400px",
//             maxHeight: "90vh",
//             overflowY: "auto",
//             boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
//           }}>
//             <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Update Product</h2>
//             <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedProduct); }}>
//               {[
//                 { label: "Code", field: "productCode" },
//                 { label: "Name", field: "productName", required: true },
//                 { label: "Description", field: "productDescription", textarea: true, required: true },
//                 { label: "Price", field: "price", type: "number", required: true },
//                 { label: "Category", field: "category", required: true },
//                 { label: "Company", field: "productCompany" },
//                 { label: "Unit", field: "productUnit" },
//                 { label: "Stock", field: "stockQuantity", type: "number" }
//               ].map(({ label, field, type = "text", textarea, required }, i) => (
//                 <div key={i} style={{ marginBottom: "10px" }}>
//                   <label>{label}</label>
//                   {textarea ? (
//                     <textarea
//                       value={selectedProduct?.[field] || ""}
//                       onChange={(e) => setSelectedProduct({ ...selectedProduct, [field]: e.target.value })}
//                       required={required}
//                       style={{ width: "100%", padding: "6px", borderRadius: "5px" }}
//                     />
//                   ) : (
//                     <input
//                       type={type}
//                       value={selectedProduct?.[field] || ""}
//                       onChange={(e) => setSelectedProduct({
//                         ...selectedProduct,
//                         [field]: type === "number" ? Number(e.target.value) : e.target.value
//                       })}
//                       required={required}
//                       style={{ width: "100%", padding: "6px", borderRadius: "5px" }}
//                     />
//                   )}
//                 </div>
//               ))}

//               <div style={{ marginBottom: "10px" }}>
//                 <label>Image</label>
//                 <input type="file" accept="image/*" onChange={handleImageUpload} />
//                 {selectedProduct?.image && (
//                   <img src={`data:image/png;base64,${selectedProduct.image}`} alt="product"
//                     style={{ width: "90px", marginTop: "10px", borderRadius: "6px" }} />
//                 )}
//               </div>

//               <div style={{ textAlign: "center", marginTop: "15px" }}>
//                 <button type="button" onClick={handleCloseModal} style={{
//                   backgroundColor: "#7f8c8d",
//                   color: "white",
//                   border: "none",
//                   padding: "6px 12px",
//                   borderRadius: "6px",
//                   marginRight: "10px"
//                 }}>
//                   Cancel
//                 </button>
//                 <button type="submit" style={{
//                   backgroundColor: "#2980b9",
//                   color: "white",
//                   border: "none",
//                   padding: "6px 12px",
//                   borderRadius: "6px"
//                 }}>
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewProducts;
// import React, { useEffect, useState } from "react";
// import Navigation from "../navigation/Navigation";
// import axios from "axios";

// const ViewProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/product/get/product")
//       .then((response) => {
//         // ✅ Map products with auto inStock/outOfStock calculation
//         const updatedProducts = response.data.map((product) => ({
//           ...product,
//           inStock: product.stockQuantity > 0 ? product.stockQuantity : 0,
//           outOfStock: product.stockQuantity === 0 ? "Yes" : "No",
//         }));
//         setProducts(updatedProducts);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError("Failed to fetch products");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div>
//       <Navigation />
//       <h2
//         style={{
//           textAlign: "center",
//           marginBottom: "20px",
//           color: "#2c3e50",
//           fontWeight: "600",
//           marginTop: "200px",
//           fontSize: "28px",
//           borderBottom: "2px solid #eaeaea",
//           paddingBottom: "10px",
//         }}
//       >
//         Product List
//       </h2>
//       <div style={{ overflowX: "auto" }}>
//         <table
//           style={{
//             width: "85%",
//             borderCollapse: "collapse",
//             marginLeft:"250px",
//             textAlign: "center",
//           }}
//         >
//           <thead>
//             <tr style={{ backgroundColor: "#f8f9fa" }}>
//               <th style={thStyle}>Product ID</th>
//               <th style={thStyle}>Product Code</th>
//               <th style={thStyle}>Name</th>
//               <th style={thStyle}>Description</th>
//               <th style={thStyle}>Price</th>
//               <th style={thStyle}>Company</th>
//               <th style={thStyle}>Unit</th>
//               <th style={thStyle}>Stock Quantity</th>
//               <th style={thStyle}>In Stock</th>
//               <th style={thStyle}>Out of Stock</th>
//               <th style={thStyle}>Category</th>
//               <th style={thStyle}>Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product) => (
//               <tr key={product.productId}>
//                 <td style={tdStyle}>{product.productId}</td>
//                 <td style={tdStyle}>{product.productCode}</td>
//                 <td style={tdStyle}>{product.productName}</td>
//                 <td style={tdStyle}>{product.productDescription}</td>
//                 <td style={tdStyle}>${product.price}</td>
//                 <td style={tdStyle}>{product.productCompany}</td>
//                 <td style={tdStyle}>{product.productUnit}</td>
//                 <td style={tdStyle}>{product.stockQuantity}</td>
//                 <td style={tdStyle}>{product.inStock}</td>
//                 <td style={tdStyle}>
//                   {product.outOfStock === "Yes" ? (
//                     <span style={{ color: "red", fontWeight: "bold" }}>
//                       Out of Stock
//                     </span>
//                   ) : (
//                     <span style={{ color: "green", fontWeight: "bold" }}>
//                       In Stock
//                     </span>
//                   )}
//                 </td>
//                 <td style={tdStyle}>{product.category}</td>
//                 <td style={tdStyle}>
//                   {product.image ? (
//                     <img
//                       src={`data:image/jpeg;base64,${product.image}`}
//                       alt={product.productName}
//                       style={{ width: "70px", height: "70px", borderRadius: "8px" }}
//                     />
//                   ) : (
//                     "No Image"
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// // ✅ Shared styles for table cells
// const thStyle = {
//   border: "1px solid #ddd",
//   padding: "10px",
//   fontWeight: "600",
//   color: "#2c3e50",
// };

// const tdStyle = {
//   border: "1px solid #ddd",
//   padding: "8px",
// };

// export default ViewProducts;
// import React, { useEffect, useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import axios from 'axios';

// const ViewProducts = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Fetch all products
//   const fetchProducts = () => {
//     axios.get('http://localhost:8080/api/product/get/product')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((err) => {
//         setError(err.message);
//       });
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Open update modal
//   const handleUpdateOpen = (item) => {
//     setSelectedProduct(item);
//     setIsModalOpen(true);
//   };

//   // Close update modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   // Handle product update
//   const handleUpdate = (updatedProduct) => {
//     axios.put(`http://localhost:8080/api/product/update/${updatedProduct.productId}`, updatedProduct)
//       .then((res) => {
//         setData(data.map(p => p.productId === updatedProduct.productId ? res.data : p));
//         handleCloseModal();
//       })
//       .catch((err) => {
//         console.error('Update error:', err);
//         alert('Failed to update product.');
//       });
//   };

//   // Handle product delete
//   const handleDeleteConfirmation = (item) => {
//     if (window.confirm(`Are you sure you want to delete ${item.productName}?`)) {
//       axios.delete(`http://localhost:8080/api/product/delete/${item.productId}`)
//         .then(() => {
//           setData(data.filter((p) => p.productId !== item.productId));
//         })
//         .catch((err) => {
//           console.error('Delete error:', err);
//           alert('Failed to delete product. Make sure the product exists.');
//         });
//     }
//   };

//   // Handle image upload in modal
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedProduct(prev => ({ ...prev, image: reader.result.split(',')[1] }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <>
//       <Navigation />
//       <div className="main" style={{ marginBottom: "250px", padding: "10px", marginRight: "100px" }}>
//         <h1 style={{
//           textAlign: "center",
//           backgroundColor: "black",
//           width: "100%",
//           marginTop: "1px",
//           padding: "10px",
//           color: "whitesmoke",
//           borderRadius: "15px"
//         }}>
//           Vendor View Product
//         </h1>

//         {error && <p style={{ color: 'red' }}>Error: {error}</p>}

//         <div style={{ overflowX: 'auto', height: '500px', overflowY: 'auto', marginTop: '20px' }}>
//           <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
//             <thead style={{ position: 'sticky', top: 0, background: '#f0f0f0', zIndex: 1 }}>
//               <tr>
//                 <th>ProductId</th>
//                 <th>Product Code</th>
//                 <th>Product Image</th>
//                 <th>Product Name</th>
//                 <th>Product Description</th>
//                 <th>Price</th>
//                 <th>Category</th>
//                 <th>Product Company</th>
//                 <th>Product Unit</th>
//                 <th>Stock Quantity</th>
//                 <th>Update</th>
//                 <th>Delete</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((item) => (
//                 <tr key={item.productId} style={{ borderBottom: '1px solid #ddd' }}>
//                   <td>{item.productId}</td>
//                   <td>{item.productCode || 'N/A'}</td>
//                   <td>
//                     {item.image ? <img src={`data:image/png;base64,${item.image}`} alt="product" style={{ width: '90px' }} /> : 'No Image'}
//                   </td>
//                   <td>{item.productName}</td>
//                   <td>{item.productDescription}</td>
//                   <td>{item.price}</td>
//                   <td>{item.category}</td>
//                   <td>{item.productCompany}</td>
//                   <td>{item.productUnit || 'N/A'}</td>
//                   <td>{item.stockQuantity != null ? item.stockQuantity : 'N/A'}</td>
//                   <td>
//                     <button onClick={() => handleUpdateOpen(item)} style={{ borderRadius: "5px" }}>Update</button>
//                   </td>
//                   <td>
//                     <button onClick={() => handleDeleteConfirmation(item)} style={{ backgroundColor: "red", borderRadius: "5px" }}>Delete</button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//         {data.length === 0 && !error && <p>No products found</p>}
//       </div>

//       {/* Update Modal */}
//       {isModalOpen && selectedProduct && (
//         <div className="modal-overlay">
//           <div className="modal-content" style={{ backgroundColor: "white" }}>
//             <h2>Update Product</h2>
//             <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedProduct); }}>
//               <div>
//                 <label>Product Code</label>
//                 <input type="text" value={selectedProduct.productCode || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productCode: e.target.value })} />
//               </div>
//               <div>
//                 <label>Product Name</label>
//                 <input type="text" value={selectedProduct.productName || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })} required />
//               </div>
//               <div>
//                 <label>Product Description</label>
//                 <textarea value={selectedProduct.productDescription || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })} required />
//               </div>
//               <div>
//                 <label>Price</label>
//                 <input type="number" value={selectedProduct.price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })} required />
//               </div>
//               <div>
//                 <label>Category</label>
//                 <input type="text" value={selectedProduct.category || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} required />
//               </div>
//               <div>
//                 <label>Product Company</label>
//                 <input type="text" value={selectedProduct.productCompany || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productCompany: e.target.value })} />
//               </div>
//               <div>
//                 <label>Product Unit</label>
//                 <input type="text" value={selectedProduct.productUnit || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productUnit: e.target.value })} />
//               </div>
//               <div>
//                 <label>Stock Quantity</label>
//                 <input type="number" value={selectedProduct.stockQuantity || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, stockQuantity: Number(e.target.value) })} />
//               </div>
//               <div>
//                 <label>Image</label>
//                 <input type="file" accept="image/*" onChange={handleImageUpload} />
//                 {selectedProduct.image && <img src={`data:image/png;base64,${selectedProduct.image}`} alt="product" style={{ width: '90px', marginTop: '10px' }} />}
//               </div>
//               <div style={{ marginTop: '10px' }}>
//                 <button type="button" onClick={handleCloseModal} style={{ backgroundColor: "green", borderRadius: "5px" }}>Cancel</button>
//                 <button type="submit" style={{ marginLeft: '10px', backgroundColor: "red", borderRadius: "5px" }}>Update</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ViewProducts;

// import React, { useEffect, useState } from "react";
// import Navigation from "../navigation/Navigation";
// import axios from "axios";

// const ViewProducts = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState("");
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Fetch all products
//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         "http://localhost:8080/api/product/get/product"
//       );
//       setData(response.data);
//       setError("");
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError("Failed to fetch products. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Open update modal
//   const handleUpdateOpen = (item) => {
//     setSelectedProduct(item);
//     setIsModalOpen(true);
//   };

//   // Close modal
//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedProduct(null);
//   };

//   // Handle update
//   const handleUpdate = async (updatedProduct) => {
//     try {
//       const res = await axios.put(
//         `http://localhost:8080/api/product/update/${updatedProduct.productId}`,
//         updatedProduct
//       );
//       setData(
//         data.map((p) =>
//           p.productId === updatedProduct.productId ? res.data : p
//         )
//       );
//       handleCloseModal();
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Failed to update product. Try again later.");
//     }
//   };

//   // Handle delete
//   const handleDelete = async (item) => {
//     if (window.confirm(`Are you sure you want to delete ${item.productName}?`)) {
//       try {
//         await axios.delete(
//           `http://localhost:8080/api/product/delete/${item.productId}`
//         );
//         setData(data.filter((p) => p.productId !== item.productId));
//       } catch (err) {
//         console.error("Delete error:", err);
//         alert("Failed to delete product. Try again later.");
//       }
//     }
//   };

//   // Image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setSelectedProduct((prev) => ({
//           ...prev,
//           image: reader.result.split(",")[1],
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   if (loading) {
//     return (
//       <div
//         style={{
//           padding: "20px",
//           fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//           minHeight: "100vh",
//           backgroundColor: "#f8f9fa",
//         }}
//       >
//         <Navigation />
//         <div style={{ textAlign: "center", marginTop: "50px" }}>
//           <div
//             style={{
//               display: "inline-block",
//               width: "50px",
//               height: "50px",
//               border: "5px solid #f3f3f3",
//               borderTop: "5px solid #3498db",
//               borderRadius: "50%",
//               animation: "spin 1s linear infinite",
//               marginBottom: "20px",
//             }}
//           ></div>
//           <p style={{ color: "#6c757d", fontSize: "18px" }}>
//             Loading products...
//           </p>
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
//     <div
//       style={{
//         padding: "20px",
//         fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//         minHeight: "100vh",
//         backgroundColor: "#f8f9fa",
//       }}
//     >
//       <Navigation />

//       <div style={{ maxWidth: "1390px", margin: "0 auto", marginLeft: "230px" }}>
//         <h2
//           style={{
//             textAlign: "center",
//             marginBottom: "20px",
//             color: "#2c3e50",
//             fontWeight: "600",
//             marginTop: "60px",
//             fontSize: "28px",
//             paddingBottom: "10px",
//             borderBottom: "2px solid #eaeaea",
//           }}
//         >
//           Vendor View Products
//         </h2>

//         {error && (
//           <div
//             style={{
//               color: "#721c24",
//               backgroundColor: "#f8d7da",
//               border: "1px solid #f5c6cb",
//               padding: "12px",
//               borderRadius: "6px",
//               marginBottom: "20px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//             }}
//           >
//             <span>{error}</span>
//             <button
//               onClick={() => setError("")}
//               style={{
//                 background: "none",
//                 border: "none",
//                 color: "#721c24",
//                 fontSize: "18px",
//                 cursor: "pointer",
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Products Table */}
//         <div
//           style={{
//             backgroundColor: "white",
//             borderRadius: "10px",
//             overflow: "hidden",
//             boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
//             border: "1px solid #e0e0e0",
//             marginBottom: "20px",
//           }}
//         >
//           <div style={{ maxHeight: "500px", overflowY: "auto" }}>
//             <table
//               style={{
//                 width: "100%",
//                 borderCollapse: "collapse",
//                 minWidth: "1000px",
//               }}
//             >
//               <thead>
//                 <tr
//                   style={{
//                     backgroundColor: "#f8f9fa",
//                     position: "sticky",
//                     top: 0,
//                     zIndex: 10,
//                   }}
//                 >
//                   {[
//                     "ProductId",
//                     "Code",
//                     "Image",
//                     "Name",
//                     "Description",
//                     "Price",
//                     "Category",
//                     "Company",
//                     "Unit",
//                     "Stock",
//                     "Actions",
//                   ].map((header, idx) => (
//                     <th
//                       key={idx}
//                       style={{
//                         padding: "12px",
//                         borderBottom: "2px solid #dee2e6",
//                         textAlign: "center",
//                         fontWeight: "600",
//                         color: "#2c3e50",
//                       }}
//                     >
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {data.length > 0 ? (
//                   data.map((item, index) => (
//                     <tr
//                       key={item.productId}
//                       style={{
//                         borderBottom: "1px solid #eaeaea",
//                         backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9",
//                       }}
//                     >
//                       <td style={{ padding: "12px", textAlign: "center" }}>
//                         {item.productId}
//                       </td>
//                       <td style={{ padding: "12px", textAlign: "center" }}>
//                         {item.productCode || "N/A"}
//                       </td>
//                       <td style={{ padding: "12px", textAlign: "center" }}>
//                         {item.image ? (
//                           <img
//                             src={`data:image/png;base64,${item.image}`}
//                             alt="product"
//                             style={{ width: "70px", borderRadius: "6px" }}
//                           />
//                         ) : (
//                           "No Image"
//                         )}
//                       </td>
//                       <td style={{ padding: "12px" }}>{item.productName}</td>
//                       <td style={{ padding: "12px" }}>
//                         {item.productDescription}
//                       </td>
//                       <td style={{ padding: "12px" }}>{item.price}</td>
//                       <td style={{ padding: "12px" }}>{item.category}</td>
//                       <td style={{ padding: "12px" }}>{item.productCompany}</td>
//                       <td style={{ padding: "12px" }}>
//                         {item.productUnit || "N/A"}
//                       </td>
//                       <td style={{ padding: "12px", textAlign: "center" }}>
//                         {item.stockQuantity != null ? item.stockQuantity : "N/A"}
//                       </td>
//                       <td style={{ padding: "12px", textAlign: "center" }}>
//                         <button
//                           onClick={() => handleUpdateOpen(item)}
//                           style={{
//                             marginRight: "8px",
//                             padding: "6px 12px",
//                             backgroundColor: "#3498db",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Update
//                         </button>
//                         <button
//                           onClick={() => handleDelete(item)}
//                           style={{
//                             padding: "6px 12px",
//                             backgroundColor: "#e74c3c",
//                             color: "white",
//                             border: "none",
//                             borderRadius: "4px",
//                             cursor: "pointer",
//                           }}
//                         >
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td
//                       colSpan="11"
//                       style={{ padding: "20px", textAlign: "center" }}
//                     >
//                       No products found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Update Modal */}
//       {isModalOpen && selectedProduct && (
//         <div
//           style={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "50%",
//             backgroundColor: "rgba(0,0,0,0.5)",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 9999,
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "white",
//               padding: "20px",
//               borderRadius: "10px",
//               width: "450px",
//               position: "relative",
//             }}
//           >
//             <h3 style={{ marginBottom: "15px", color: "#2c3e50" }}>
//               Update Product
//             </h3>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleUpdate(selectedProduct);
//               }}
//             >
//               {[
//                 { label: "Code", key: "productCode", type: "text" },
//                 { label: "Name", key: "productName", type: "text" },
//                 { label: "Description", key: "productDescription", type: "text" },
//                 { label: "Price", key: "price", type: "number" },
//                 { label: "Category", key: "category", type: "text" },
//                 { label: "Company", key: "productCompany", type: "text" },
//                 { label: "Unit", key: "productUnit", type: "text" },
//                 { label: "Stock", key: "stockQuantity", type: "number" },
//               ].map((field, idx) => (
//                 <div key={idx} style={{ marginBottom: "10px" }}>
//                   <label
//                     style={{ fontWeight: "500", display: "block", marginBottom: "5px" }}
//                   >
//                     {field.label}
//                   </label>
//                   <input
//                     type={field.type}
//                     value={selectedProduct[field.key] || ""}
//                     onChange={(e) =>
//                       setSelectedProduct({
//                         ...selectedProduct,
//                         [field.key]:
//                           field.type === "number"
//                             ? Number(e.target.value)
//                             : e.target.value,
//                       })
//                     }
//                     style={{
//                       width: "100%",
//                       padding: "8px",
//                       borderRadius: "6px",
//                       border: "1px solid #ced4da",
//                     }}
//                   />
//                 </div>
//               ))}
//               <div style={{ marginBottom: "10px" }}>
//                 <label style={{ fontWeight: "500", display: "block" }}>
//                   Image
//                 </label>
//                 <input type="file" accept="image/*" onChange={handleImageUpload} />
//                 {selectedProduct.image && (
//                   <img
//                     src={`data:image/png;base64,${selectedProduct.image}`}
//                     alt="preview"
//                     style={{ width: "90px", marginTop: "10px" }}
//                   />
//                 )}
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   marginTop: "15px",
//                 }}
//               >
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   style={{
//                     marginRight: "10px",
//                     padding: "6px 12px",
//                     borderRadius: "4px",
//                     border: "1px solid #ced4da",
//                     backgroundColor: "#101011ff",
//                     color: "white",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   style={{
//                     padding: "6px 12px",
//                     borderRadius: "4px",
//                     border: "none",
//                     backgroundColor: "#27ae60",
//                     color: "white",
//                     cursor: "pointer",
//                   }}
//                 >
//                   Update
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ViewProducts;
import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const ViewProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({ name: '', category: '', company: '' });

  // Fetch all products
  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/product/get/product')
      .then((response) => setData(response.data))
      .catch((err) => setError(err.message));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleUpdateOpen = (item) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdate = (updatedProduct) => {
    axios.put(`http://localhost:8080/api/product/update/${updatedProduct.productId}`, updatedProduct)
      .then((res) => {
        setData(data.map(p => p.productId === updatedProduct.productId ? res.data : p));
        handleCloseModal();
      })
      .catch(() => alert('Failed to update product.'));
  };

  const handleDeleteConfirmation = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.productName}?`)) {
      axios.delete(`http://localhost:8080/api/product/delete/${item.productId}`)
        .then(() => setData(data.filter(p => p.productId !== item.productId)))
        .catch(() => alert('Failed to delete product.'));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedProduct(prev => ({ ...prev, image: reader.result.split(',')[1] }));
      reader.readAsDataURL(file);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  const clearFilters = () => setFilter({ name: '', category: '', company: '' });

  // Filtered products
  const filteredProducts = data.filter(p =>
    (filter.name === '' || p.productName.toLowerCase().includes(filter.name.toLowerCase())) &&
    (filter.category === '' || (p.category || '').toLowerCase().includes(filter.category.toLowerCase())) &&
    (filter.company === '' || (p.productCompany || '').toLowerCase().includes(filter.company.toLowerCase()))
  );

  return (
    <>
      <Navigation />
      <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#f8f9fa",marginLeft:"250px",width:"85%" }}>
        <h1 style={{ textAlign: "center", overflowY: "hidden",backgroundColor: "#e2e6e9ff", color: "black", padding: "12px", borderRadius: "12px", marginBottom: "10px",marginTop:"20px" }}>
          PRODUCTS LIST
        </h1>

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
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Product Name</label>
            <input type="text" name="name" value={filter.name} onChange={handleFilterChange} placeholder="Search by name"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Category</label>
            <input type="text" name="category" value={filter.category} onChange={handleFilterChange} placeholder="Search by category"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
          </div>
          <div>
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Company</label>
            <input type="text" name="company" value={filter.company} onChange={handleFilterChange} placeholder="Search by company"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
          </div>
          <div>
            <button onClick={clearFilters} style={{ padding: "10px 15px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%" }}>Clear Filters</button>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
              <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PID</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PCode</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PImage</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PName</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PDescription</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PPrice</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PCategory</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PCompany</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PUnit</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>NOStock</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? filteredProducts.map((item, index) => (
                  <tr key={item.productId} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #eaeaea" }}>
                    <td style={{ padding: "8px" }}>{item.productId}</td>
                    <td style={{ padding: "8px" }}>{item.productCode || 'N/A'}</td>
                    <td style={{ padding: "8px" }}>{item.image ? <img src={`data:image/png;base64,${item.image}`} alt="product" style={{ width: '70px' }} /> : 'No Image'}</td>
                    <td style={{ padding: "8px" }}>{item.productName}</td>
                    <td style={{ padding: "8px" }}>{item.productDescription}</td>
                    <td style={{ padding: "8px" }}>{item.price}</td>
                    <td style={{ padding: "8px" }}>{item.category}</td>
                    <td style={{ padding: "8px" }}>{item.productCompany}</td>
                    <td style={{ padding: "8px" }}>{item.productUnit || 'N/A'}</td>
                    <td style={{ padding: "8px" }}>{item.stockQuantity != null ? item.stockQuantity : 'N/A'}</td>
                    <td style={{ padding: "8px", display: "flex", gap: "8px" }}>
                      <button onClick={() => handleUpdateOpen(item)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>Update</button>
                      <button onClick={() => handleDeleteConfirmation(item)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="11" style={{ textAlign: "center", padding: "20px" }}>No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Modal (Styled) */}
       {/* Update Modal (Fully Styled) */}
{isModalOpen && selectedProduct && (
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
      <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#2c3e50" }}>Update Product</h2>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdate(selectedProduct); }}>
        
        {/* Product Code */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Product Code</label>
          <input type="text" value={selectedProduct.productCode || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productCode: e.target.value })} required style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
        </div>

        {/* Product Name */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Product Name</label>
          <input type="text" value={selectedProduct.productName || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })} required style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
        </div>

        {/* Description */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Description</label>
          <textarea value={selectedProduct.productDescription || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da", resize: "vertical" }} />
        </div>

        {/* Price */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Price</label>
          <input type="number" value={selectedProduct.price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: e.target.value })} required style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
        </div>

        {/* Category */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Category</label>
          <input type="text" value={selectedProduct.category || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
        </div>

        {/* Company */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Company</label>
          <input type="text" value={selectedProduct.productCompany || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productCompany: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
        </div>

        {/* Unit */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Unit</label>
          <input type="text" value={selectedProduct.productUnit || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productUnit: e.target.value })} style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
        </div>

        {/* Image Upload */}
        <div style={{ marginBottom: "12px" }}>
          <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
          {selectedProduct.image && <img src={`data:image/png;base64,${selectedProduct.image}`} alt="preview" style={{ width: '100px', marginTop: '10px', borderRadius: '6px' }} />}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
          <button type="button" onClick={handleCloseModal} style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #6c757d", backgroundColor: "#6c757d", color: "white", cursor: "pointer" }}>Cancel</button>
          <button type="submit" style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" }}>Update</button>
        </div>
      </form>
    </div>
  </div>
)}


      </div>
    </>
  );
};

export default ViewProducts;
