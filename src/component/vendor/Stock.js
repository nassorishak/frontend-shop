import React, { useState, useEffect } from 'react';
import Navigation from '../navigation/Navigation';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
import { Link } from 'react-router-dom';


const Stock = () => {
  const [stocks, setStocks] = useState([]);
  const [error, setError] = useState(null);

  const [selectedStock, setSelectedStock] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch all stocks
  const fetchStocks = () => {
    fetch('http://localhost:8080/api/stocks/all-stocks')
      .then(res => res.json())
      .then(data => setStocks(data))
      .catch(err => setError('❌ ' + err.message));
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  // Delete stock
  const handleDelete = (id) => {
    if (!window.confirm('Are you sure you want to delete this stock?')) return;
    fetch(`http://localhost:8080/api/stocks/${id}`, { method: 'DELETE' })
      .then(res => { if (!res.ok) throw new Error(`Error: ${res.status}`); fetchStocks(); })
      .catch(err => setError('❌ Failed to delete stock: ' + err.message));
  };

  // Open modal
  const handleEditOpen = (stock) => {
    setSelectedStock({ ...stock }); // clone to avoid direct state mutation
    setIsModalOpen(true);
  };

  // Update stock
  const handleUpdate = () => {
    if (!selectedStock) return;

    const updatedStock = {
      ...selectedStock,
      currentStock: (parseInt(selectedStock.inStock) || 0) - (parseInt(selectedStock.outStock) || 0)
    };

    fetch(`http://localhost:8080/api/stocks/stocks/${selectedStock.stockId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStock)
    })
      .then(res => {
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        return res.json();
      })
      .then(() => {
        setIsModalOpen(false);
        setSelectedStock(null);
        fetchStocks();
      })
      .catch(err => setError('❌ Failed to update stock: ' + err.message));
  };

  const tableContainerStyle = {
    maxWidth: '1435px',
    margin: '20px auto',
    background: 'white',
    padding: '25px',
    borderRadius: '15px',marginLeft:"200px",
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    maxHeight: '450px',
    overflowY: 'auto',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    marginBottom: '15px'
  };

  return (
    <div style={{ background: '#f4f6f9', minHeight: '100vh' }}>
      <Navigation />

      <div style={{ padding: '20px' }}>
       <div> <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333', fontWeight: '600',marginTop:"50px" }}>
          📦 Stock List
        </h2>
         <Link to="/add-stock">
                  <input type="button" value="add-stock"style={{width:"100px",backgroundColor:"green",color:"white",borderRadius:"5px",marginLeft:"1490px"}}/>
                </Link></div>

        {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

        <div style={tableContainerStyle}>
          <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
            <thead style={{ position: 'sticky', top: 0, background: '#f0f0f0', zIndex: 10 }}>
              <tr>
                <th style={{ padding: '10px' }}>Product Name</th>
                <th style={{ padding: '10px' }}>In Stock</th>
                <th style={{ padding: '10px' }}>Out Stock</th>
                <th style={{ padding: '10px' }}>Current Stock</th>
                <th style={{ padding: '10px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map(stock => (
                <tr key={stock.stockId} style={{ borderBottom: '1px solid #ddd' }}>
                  <td style={{ padding: '8px' }}>{stock.product?.productName}</td>
                  <td style={{ padding: '8px' }}>{stock.inStock}</td>
                  <td style={{ padding: '8px' }}>{stock.outStock}</td>
                  <td style={{ padding: '8px' }}>{stock.currentStock}</td>
                  <td style={{ padding: '8px' }}>
                    <button
                      onClick={() => handleEditOpen(stock)}
                      style={{
                        marginRight: '5px',
                        borderRadius: '5px',
                        padding: '5px 10px',
                        backgroundColor: '#28a745',
                        color: 'white',
                        border: 'none',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(stock.stockId)}
                      style={{
                        borderRadius: '5px',
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {stocks.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '10px', textAlign: 'center', color: '#555' }}>
                    No stock available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Modal */}
        {isModalOpen && selectedStock && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{ background: 'white', padding: '25px', borderRadius: '15px', width: '400px' }}>
              <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Update Stock</h3>

              <label style={{ fontWeight: 'bold' }}>In Stock:</label>
              <input
                type="number"
                min="0"
                value={selectedStock.inStock}
                onChange={e =>
                  setSelectedStock({
                    ...selectedStock,
                    inStock: e.target.value,
                    currentStock: (parseInt(e.target.value) || 0) - (parseInt(selectedStock.outStock) || 0)
                  })
                }
                style={inputStyle}
              />

              <label style={{ fontWeight: 'bold' }}>Out Stock:</label>
              <input
                type="number"
                min="0"
                value={selectedStock.outStock}
                onChange={e =>
                  setSelectedStock({
                    ...selectedStock,
                    outStock: e.target.value,
                    currentStock: (parseInt(selectedStock.inStock) || 0) - (parseInt(e.target.value) || 0)
                  })
                }
                style={inputStyle}
              />

              <label style={{ fontWeight: 'bold' }}>Current Stock:</label>
              <input
                type="number"
                value={selectedStock.currentStock}
                readOnly
                style={{ ...inputStyle, backgroundColor: '#e9ecef' }}
              />

              <div style={{ textAlign: 'center' }}>
                <button
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    marginRight: '10px',
                    padding: '8px 15px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#6c757d',
                    color: 'white',
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  style={{
                    padding: '8px 15px',
                    borderRadius: '8px',
                    border: 'none',
                    backgroundColor: '#007bff',
                    color: 'white',
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Stock;
