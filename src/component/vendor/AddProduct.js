// import React, { useState } from 'react';
// import Navigation from '../navigation/Navigation';

// const AddProduct = () => {
//     const [productName, setProductName] = useState('');
//     const [productDescription, setProductDescription] = useState('');
//     const [price, setPrice] = useState(0.0);
//     const [category, setCategory] = useState('');
//     const [productCompany, setProductCompany] = useState('');
//     const [image, setImage] = useState(null);
//     const [error, setError] = useState(null);

//     // Retrieve vendorId from local storage
//     const vendorId = localStorage.getItem('customerId'); // Ensure this is correct

//     const handleFormSubmit = async (event) => {
//         event.preventDefault();

//         // Verify that vendorId is valid
//         if (!vendorId) {
//             setError('Vendor ID not found in local storage.');
//             return;
//         }

//         const formData = new FormData();
//         formData.append('vendorId', vendorId); // Include vendorId
//         formData.append('productName', productName);
//         formData.append('productDescription', productDescription);
//         formData.append('price', price);
//         formData.append('category', category);
//         formData.append('productCompany', productCompany);
//         formData.append('image', image);

//         try {
//             const response = await fetch('http://localhost:8080/api/product/add/product', {
//                 method: 'POST',
//                 body: formData,
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error.'}`);
//             }

//             const data = await response.json();
//             alert('Product added successfully!');
//             // Reset form after successful submission
//             setProductName('');
//             setProductDescription('');
//             setPrice(0.0);
//             setCategory('');
//             setProductCompany('');
//             setImage(null);
//             setError(null);
//         } catch (error) {
//             setError(`Error: ${error.message}`);
//             console.error('Error:', error);
//         }
//     };

//     return (
//       <>
//         <Navigation />
//         <div className="main" style={{ backgroundColor:"white", padding: "20px",marginBottom: "150px",marginLeft:"10px",marginRight:"50px" }}>
//           <h1 className="heading" style={{ marginBottom: "40px",marginTop:"50px", backgroundColor: "gred", padding: "10px" }}>
//             Vendor Add Product
//           </h1>
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//           <form onSubmit={handleFormSubmit} encType="multipart/form-data">
//             <div className="form-row" style={{ marginBottom: '20px' }}>
//               <div className="form-group">
//                 <label htmlFor="productName">Product Name:</label>
//                 <input
//                   type="text"
//                   id="productName"
//                   name="productName"
//                   value={productName}
//                   onChange={(e) => setProductName(e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="form-group" style={{ marginLeft: "20px" }}>
//                 <label htmlFor="productDescription">Product Description:</label>
//                 <input
//                   type="text"
//                   id="productDescription"
//                   name="productDescription"
//                   value={productDescription}
//                   onChange={(e) => setProductDescription(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div className="form-row" style={{ marginBottom: '20px' }}>
//               <div className="form-group">
//                 <label htmlFor="price">Price:</label>
//                 <input
//                   type="number"
//                   id="price"
//                   name="price"
//                   step="0.01"
//                   min="0"
//                   value={price}
//                   onChange={(e) => {
//                     const value = e.target.valueAsNumber;
//                     setPrice(isNaN(value) ? 0 : value); // Prevent NaN
//                   }}
//                   required
//                 />
//               </div>
//               <div className="form-group" style={{ marginLeft: "20px" }}>
//                 <label htmlFor="image">Image:</label>
//                 <input
//                   type="file"
//                   id="image"
//                   name="image"
//                   onChange={(e) => setImage(e.target.files[0])}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="form-row" style={{ marginBottom: '20px' }}>
//               <div className="form-group">
//                 <label htmlFor="category">Category:</label>
//                 <input
//                   type="text"
//                   id="category"
//                   name="category"
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                 />
//               </div>
//               <div className="form-group" style={{ marginLeft: "20px" }}>
//                 <label htmlFor="productCompany">Product Company:</label>
//                 <input
//                   type="text"
//                   id="productCompany"
//                   name="productCompany"
//                   value={productCompany}
//                   onChange={(e) => setProductCompany(e.target.value)}
//                   required
//                 />
//               </div>
//             </div>
//             <div className="form-group">
//               <input type="submit" value="Submit" style={{ padding: "10px", backgroundColor: "white", color: "black",width:"100px",marginLeft:"510px",
//                 marginTop:"20px",height:"50px"
//                }} />
//             </div>
//           </form>
//         </div>
//       </>
//     );
// };

// export default AddProduct;

import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';

const AddProduct = () => {
  const [productCode, setProductCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [productCompany, setProductCompany] = useState('');
  const [productUnit, setProductUnit] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  // Retrieve vendorId from local storage
  const vendorId = localStorage.getItem('customerId'); // Ensure this is correct

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!vendorId) {
      setError('Vendor ID not found in local storage.');
      return;
    }

    const formData = new FormData();
    formData.append('userId', vendorId); // Link to User entity
    formData.append('productCode', productCode);
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('productCompany', productCompany);
    formData.append('productUnit', productUnit);
    formData.append('stockQuantity', stockQuantity);
    formData.append('image', image);

    try {
      const response = await fetch('http://localhost:8080/api/product/add/product', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Unknown error.');
      }

      alert('Product added successfully!');
      setProductCode('');
      setProductName('');
      setProductDescription('');
      setPrice('');
      setCategory('');
      setProductCompany('');
      setProductUnit('');
      setStockQuantity('');
      setImage(null);
      setError(null);
    } catch (err) {
      setError(`Error: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <>
      <Navigation />
      <div className="main" style={{ backgroundColor: "white", padding: "0px", marginBottom: "240px", marginLeft: "10px", marginRight: "50px" }}>
        <h1 className="heading" style={{ marginBottom: "40px", marginTop: "50px", backgroundColor: "whitesmoke", padding: "10px",color:"green"}}>
          ADD PRODUCTS
        </h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="form-row" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label htmlFor="productCode">Product Code:</label>
              <input type="text" id="productCode" value={productCode} onChange={(e) => setProductCode(e.target.value)} required />
            </div>
            <div className="form-group" style={{ marginLeft: "20px" }}>
              <label htmlFor="productName">Product Name:</label>
              <input type="text" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} required />
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label htmlFor="productDescription">Product Description:</label>
              <input type="text" id="productDescription" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginLeft: "20px" }}>
              <label htmlFor="price">Price:</label>
              <input type="number" id="price" step="0.01" min="0" value={price} onChange={(e) => setPrice(Number(e.target.value) || 0)} required />
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input type="text" id="category" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginLeft: "20px" }}>
              <label htmlFor="productCompany">Product Company:</label>
              <input type="text" id="productCompany" value={productCompany} onChange={(e) => setProductCompany(e.target.value)} required />
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label htmlFor="productUnit">Product Unit:</label>
              <input type="text" id="productUnit" value={productUnit} onChange={(e) => setProductUnit(e.target.value)} />
            </div>
            <div className="form-group" style={{ marginLeft: "20px" }}>
              <label htmlFor="stockQuantity">Stock Quantity:</label>
              <input type="number" id="stockQuantity" min="0" value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value) || 0)} />
            </div>
          </div>

          <div className="form-row" style={{ marginBottom: '20px' }}>
            <div className="form-group">
              <label htmlFor="image">Image:</label>
              <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Submit" style={{ padding: "10px",marginBottom:"50px", backgroundColor: "grey", color: "black", width: "100px", marginLeft: "510px", marginTop: "20px", height: "50px" }} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
