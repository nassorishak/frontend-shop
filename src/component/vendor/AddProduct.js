import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';

const AddProduct = () => {
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [price, setPrice] = useState(0.0);
    const [category, setCategory] = useState('');
    const [productCompany, setProductCompany] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    // Retrieve vendorId from local storage
    const vendorId = localStorage.getItem('customerId'); // Ensure this is correct

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Verify that vendorId is valid
        if (!vendorId) {
            setError('Vendor ID not found in local storage.');
            return;
        }

        const formData = new FormData();
        formData.append('vendorId', vendorId); // Include vendorId
        formData.append('productName', productName);
        formData.append('productDescription', productDescription);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('productCompany', productCompany);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:8080/api/product/add/product', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error.'}`);
            }

            const data = await response.json();
            alert('Product added successfully!');
            // Reset form after successful submission
            setProductName('');
            setProductDescription('');
            setPrice(0.0);
            setCategory('');
            setProductCompany('');
            setImage(null);
            setError(null);
        } catch (error) {
            setError(`Error: ${error.message}`);
            console.error('Error:', error);
        }
    };

    return (
      <>
        <Navigation />
        <div className="main" style={{ backgroundColor: "grey", padding: "20px" }}>
          <h1 className="heading" style={{ marginBottom: "40px", backgroundColor: "gray", padding: "10px" }}>
            Vendor Add Product
          </h1>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <div className="form-group">
                <label htmlFor="productName">Product Name:</label>
                <input
                  type="text"
                  id="productName"
                  name="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group" style={{ marginLeft: "20px" }}>
                <label htmlFor="productDescription">Product Description:</label>
                <input
                  type="text"
                  id="productDescription"
                  name="productDescription"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    setPrice(isNaN(value) ? 0 : value); // Prevent NaN
                  }}
                  required
                />
              </div>
              <div className="form-group" style={{ marginLeft: "20px" }}>
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>
            </div>
            <div className="form-row" style={{ marginBottom: '20px' }}>
              <div className="form-group">
                <label htmlFor="category">Category:</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
              <div className="form-group" style={{ marginLeft: "20px" }}>
                <label htmlFor="productCompany">Product Company:</label>
                <input
                  type="text"
                  id="productCompany"
                  name="productCompany"
                  value={productCompany}
                  onChange={(e) => setProductCompany(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="Submit" style={{ padding: "10px", backgroundColor: "white", color: "black" }} />
            </div>
          </form>
        </div>
      </>
    );
};

export default AddProduct;