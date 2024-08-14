import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ViewProducts = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/product/get/product')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handleUpdateOpen = (item) => {
    setSelectedProduct(item);
    setIsModalOpen(true);
  };

  const handleUpdate = (updatedProduct) => {
    updatedProduct.productId = selectedProduct.productId; 

    axios.put(`http://localhost:8080/api/product/update/${updatedProduct.productId}`, updatedProduct)
      .then((response) => {
        const updatedData = data.map(product =>
          product.productId === updatedProduct.productId ? updatedProduct : product
        );
        setData(updatedData);
        setIsModalOpen(false);
        setSelectedProduct(null);
      })
      .catch((error) => {
        console.error('Update error:', error);
      });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteConfirmation = (item) => {
    if (window.confirm(`Are you sure you want to delete ${item.productName}?`)) {
      axios.delete(`http://localhost:8080/api/product/delete/${item.productId}`)
        .then(() => {
          setData(data.filter((product) => product.productId !== item.productId));
        })
        .catch((error) => {
          console.error('Delete error:', error);
        });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProduct(prevState => ({
          ...prevState,
          image: reader.result.split(',')[1] // Store just the base64 string part
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navigation />
      <div className="main">
        <h1 style={{ textAlign: "center", backgroundColor: "GrayText",width:"1042px",marginTop:"10px" }}>Vendor View Product</h1>
        {error ? (
          <p>Error: {error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ProductId</th>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Price</th>
                <th>Category</th>
                <th>Action</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.productId}>
                  <td>{item.productId}</td>
                  <td>
                    <img src={`data:image/png;base64,${item.image}`} alt="product" style={{ width: '90px', height: 'auto' }} />
                  </td>
                  <td>{item.productName}</td>
                  <td>{item.productDescription}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleUpdateOpen(item)} style={{borderRadius:"5px"}}>Update</button>
                  </td>
                  <td>
                    <button className="edit-btn" style={{ backgroundColor: "red",borderRadius:"5px" }} onClick={() => handleDeleteConfirmation(item)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {data.length === 0 && !error ? (
          <p>No products found</p>
        ) : null}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content"style={{backgroundColor:"white"}}>
            <h2 style={{backgroundColor:"white"}}>Update Product</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(selectedProduct);
            }} style={{backgroundColor:"white"}}>
              <div>
                <label>Product Name</label>
                <input type="text" value={selectedProduct?.productName || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })} required />
              </div>
              <div>
                <label>Product Description</label>
                <textarea value={selectedProduct?.productDescription || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })} required />
              </div>
              <div>
                <label>Price</label>
                <input type="number" value={selectedProduct?.price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, price: Number(e.target.value) })} required />
              </div>
              <div>
                <label>Category</label>
                <input type="text" value={selectedProduct?.category || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })} required />
              </div>
              <div>
                <label>Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {selectedProduct?.image && (
                  <img src={`data:image/png;base64,${selectedProduct.image}`} alt="product" style={{ width: '90px', height: 'auto', marginTop: '10px' }} />
                )}
              </div>
                <div>
                <div style={{color:"green",marginLeft:"140px"}}> 
               <button type="button" onClick={handleCloseModal} style={{backgroundColor:"green",borderRadius:"5px"}}>Cancel</button>
              <button type="submit" style={{backgroundColor:"red",marginLeft:"30px",borderRadius:"5px"}}>Update</button>
              </div>
                </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewProducts;