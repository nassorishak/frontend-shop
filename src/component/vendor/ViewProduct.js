import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const ViewProducts = () => {
  const [data, setData] = useState([]);
  const [shelves, setShelves] = useState([]);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({ 
    name: '', 
    category: '', 
    company: '', 
    shelfLocation: '',
    productCode: ''
  });

  // // Fetch all products
  // const fetchProducts = () => {
  //   axios.get('http://localhost:8080/api/product/get/product')
  //     .then((response) => setData(response.data))
  //     .catch((err) => setError(err.message));
  // };
  const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/product/get/product');
    setData(response.data);
    setError(null);
  } catch (err) {
    setError('Failed to fetch products: ' + (err.response?.data?.message || err.message));
    console.error('Error fetching products:', err);
  }
};

  // Fetch all shelves
  const fetchShelves = () => {
    axios.get('http://localhost:8080/api/shelves/list-shelves')
      .then((response) => setShelves(response.data))
      .catch((err) => console.error('Error fetching shelves:', err));
  };

  useEffect(() => {
    fetchProducts();
    fetchShelves();
  }, []);

  const handleUpdateOpen = (item) => {
    setSelectedProduct({
      ...item,
      shelfId: item.shelf ? item.shelf.id : '', // Extract shelf ID for the dropdown
      userId: item.user ? item.user.userId : '' // Extract user ID for the dropdown
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleUpdate = (updatedProduct) => {
    // Prepare the data for update - handle shelf and user relationships properly
    const updateData = {
      ...updatedProduct,
      shelf: updatedProduct.shelfId ? { id: updatedProduct.shelfId } : null,
      user: updatedProduct.userId ? { userId: updatedProduct.userId } : null
    };

    // Remove temporary IDs from the payload
    delete updateData.shelfId;
    delete updateData.userId;

    axios.put(`http://localhost:8080/api/product/update/${updatedProduct.productId}`, updateData)
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

  const clearFilters = () => setFilter({ 
    name: '', 
    category: '', 
    company: '', 
    shelfLocation: '',
    productCode: ''
  });

  // Filtered products - includes all filter fields
  const filteredProducts = data.filter(p => {
    const shelfName = p.shelf ? p.shelf.shelfName : '';
    return (
      (filter.name === '' || p.productName.toLowerCase().includes(filter.name.toLowerCase())) &&
      (filter.category === '' || (p.category || '').toLowerCase().includes(filter.category.toLowerCase())) &&
      (filter.company === '' || (p.productCompany || '').toLowerCase().includes(filter.company.toLowerCase())) &&
      (filter.shelfLocation === '' || shelfName.toLowerCase().includes(filter.shelfLocation.toLowerCase())) &&
      (filter.productCode === '' || (p.productCode || '').toLowerCase().includes(filter.productCode.toLowerCase()))
    );
  });

  return (
    <>
      <Navigation />
      <div style={{ padding: "20px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", minHeight: "100vh", backgroundColor: "#d8dbddff",marginLeft:"250px",width:"85%",marginTop:"20px" }}>
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
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Product Code</label>
            <input type="text" name="productCode" value={filter.productCode} onChange={handleFilterChange} placeholder="Search by code"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
          </div>
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
            <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Shelf Location</label>
            <input type="text" name="shelfLocation" value={filter.shelfLocation} onChange={handleFilterChange} placeholder="Search by shelf"
              style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }} />
          </div>
          <div>
            <button onClick={clearFilters} style={{ padding: "10px 15px", backgroundColor: "#6c757d", color: "white", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%" }}>Clear Filters</button>
          </div>
        </div>

        {/* Products Table */}
        <div style={{ backgroundColor: "white", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 6px rgba(0,0,0,0.05)",height:"600px" }}>
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "1000px"}}>
              <thead style={{ backgroundColor: "#f8f9fa", position: "sticky", top: 0, zIndex: 10 }}>
                <tr>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PID</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PCode</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PImage</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PName</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PDescription</th>
                  {/* <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Price</th> */}
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Purchase Price</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Selling Price</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PCategory</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PCompany</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>PUnit</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Stock Qty</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Shelf Location</th>
                  <th style={{ padding: "10px", borderBottom: "2px solid #dee2e6" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? filteredProducts.map((item, index) => (
                  <tr key={item.productId} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9", borderBottom: "1px solid #eaeaea" }}>
                    <td style={{ padding: "8px" }}>{item.productId}</td>
                    <td style={{ padding: "8px" }}>{item.productCode || 'N/A'}</td>
                    <td style={{ padding: "8px" }}>
                      {item.image ? <img src={`data:image/png;base64,${item.image}`} alt="product" style={{ width: '70px' }} /> : 'No Image'}
                    </td>
                    <td style={{ padding: "8px" }}>{item.productName}</td>
                    <td style={{ padding: "8px" }}>{item.productDescription}</td>
                    {/* <td style={{ padding: "8px" }}>{item.price}</td> */}
                    <td style={{ padding: "8px" }}>{item.latestPurchasePrice || 'N/A'}</td>
                    <td style={{ padding: "8px" }}>{item.sellingPrice || 'N/A'}</td>
                    <td style={{ padding: "8px" }}>{item.category}</td>
                    <td style={{ padding: "8px" }}>{item.productCompany}</td>
                    <td style={{ padding: "8px" }}>{item.productUnit || 'N/A'}</td>
                    <td style={{ padding: "8px" }}>{item.stockQuantity != null ? item.stockQuantity : 'N/A'}</td>
                    <td style={{ padding: "8px" }}>
                      {item.shelf ? `${item.shelf.shelfName} - ${item.shelf.locationDescription}` : 'No Shelf Assigned'}
                    </td>
                    <td style={{ padding: "8px", display: "flex", gap: "8px" }}>
                      <button onClick={() => handleUpdateOpen(item)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}>Update</button>
                      <button onClick={() => handleDeleteConfirmation(item)} style={{ padding: "5px 10px", borderRadius: "5px", backgroundColor: "#dc3545", color: "white", border: "none", cursor: "pointer" }}>Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="14" style={{ textAlign: "center", padding: "20px" }}>No products found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Update Modal */}
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
                  <input
                    type="text"
                    value={selectedProduct.productCode || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productCode: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Product Name */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Product Name</label>
                  <input
                    type="text"
                    value={selectedProduct.productName || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productName: e.target.value })}
                    required
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Description */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Description</label>
                  <textarea
                    value={selectedProduct.productDescription || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productDescription: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da", resize: "vertical" }}
                  />
                </div>

                {/* Price */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedProduct.price || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, price: parseFloat(e.target.value) })}
                    required
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Latest Purchase Price */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Latest Purchase Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedProduct.latestPurchasePrice || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, latestPurchasePrice: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Selling Price
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Selling Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedProduct.sellingPrice || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, sellingPrice: parseFloat(e.target.value) })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div> */}

                {/* Category */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Category</label>
                  <input
                    type="text"
                    value={selectedProduct.category || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Company */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Company</label>
                  <input
                    type="text"
                    value={selectedProduct.productCompany || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productCompany: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Unit */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Unit</label>
                  <input
                    type="text"
                    value={selectedProduct.productUnit || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, productUnit: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Stock Quantity */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Stock Quantity</label>
                  <input
                    type="number"
                    value={selectedProduct.stockQuantity || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, stockQuantity: parseInt(e.target.value) })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  />
                </div>

                {/* Shelf Location */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Shelf Location</label>
                  <select
                    value={selectedProduct.shelfId || ''}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, shelfId: e.target.value })}
                    style={{ width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #ced4da" }}
                  >
                    <option value="">No Shelf Assigned</option>
                    {shelves.map((shelf) => (
                      <option key={shelf.id} value={shelf.id}>
                        {shelf.shelfName} - {shelf.locationDescription}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Image Upload */}
                <div style={{ marginBottom: "12px" }}>
                  <label style={{ display: "block", fontWeight: "500", marginBottom: "5px" }}>Image</label>
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                  {selectedProduct.image && (
                    <img
                      src={`data:image/png;base64,${selectedProduct.image}`}
                      alt="preview"
                      style={{ width: '100px', marginTop: '10px', borderRadius: '6px' }}
                    />
                  )}
                </div>

                {/* Buttons */}
                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    style={{ padding: "8px 16px", borderRadius: "6px", border: "1px solid #6c757d", backgroundColor: "#6c757d", color: "white", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#007bff", color: "white", cursor: "pointer" }}
                  >
                    Update
                  </button>
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