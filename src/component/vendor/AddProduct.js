import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';

const AddProduct = () => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('productName', productName);
    formData.append('productDescription', productDescription);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    fetch('http://localhost:8080/api/product/add/product', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          alert('Vendor registered successfully!');
          throw new Error(`HTTP error! status: ${response.status}`);
          
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setProductName('');
        setProductDescription('');
        setPrice(0.0);
        setCategory('');
        setImage(null);
      })
      .catch((error) => {
        setError(error.message);
        console.error('Error:', error);
      });
  };

  return (
    <>
      <Navigation />
      <div className="main" style={{backgroundColor:"grey"}}>
        <h1 className="heading" style={{marginTop:"9px",marginBottom:"40px",backgroundColor:"gray",width:"1039px"}}>Vendor Add Product</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="form-row">
            <div className="form-group"style={{marginLeft:"10px"}}>
              <label htmlFor="productName">Product Name:</label>
              <input
                type="text"
                id="productName"
                name="productName"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                required
              />
            </div>
            <div className="form-group"style={{marginLeft:"10px"}}>
              <label htmlFor="productDescription">Product Description:</label>
              <input
                type="text"
                id="productDescription"
                name="productDescription"
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
              />
            </div>
          </div>
          <div className="form-row" style={{marginLeft:"10px"}}>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                step="0.01"
                value={price}
                onChange={(event) => setPrice(event.target.valueAsNumber)}
                required
              />
            </div>
            <div className="form-group"style={{marginLeft:"10px"}}>
              <label htmlFor="image">Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={(event) => setImage(event.target.files[0])}
              />
            </div>
          </div>
          <div className="form-row"style={{marginLeft:"10px"}}>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <input
                type="text"
                id="category"
                name="category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group"style={{marginLeft:"450px",width:"100px",marginTop:"40px"}}>
            <input type="submit" value="Submit" style={{paddingBottom:"33px",backgroundColor:"white",color:"black"}} />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;