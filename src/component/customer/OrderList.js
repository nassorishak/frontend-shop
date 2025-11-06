

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from "../navigation/Navigation";

const OrderList = () => {
  const [products, setProducts] = useState([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  // Order form state
  const [productId, setProductId] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [orderType, setOrderType] = useState('STANDARD');
  const [size, setSize] = useState('MEDIUM');
  const [preferredNetwork, setPreferredNetwork] = useState('tigo');

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (orderSuccess) {
      const timer = setTimeout(() => {
        setOrderSuccess(null);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [orderSuccess]);

  const fetchProducts = () => {
    axios.get('http://localhost:8080/api/stocks/all-stocks')
      .then((res) => {
        console.log('Stock data received:', res.data);
        
        const productsWithStock = res.data.map(stock => ({
          id: stock.stockId,
          productId: stock.product?.productId,
          productName: stock.product?.productName || 'Unknown Product',
          currentStock: stock.currentStock || 0,
          inStock: stock.inStock || 0,
          outStock: stock.outStock || 0,
          sellingPrice: stock.sellingPrice || 0,
          latestPurchasePrice: stock.latestPurchasePrice || 0,
          status: stock.status || 'Unknown',
          product: stock.product
        }));
        
        console.log('Mapped products:', productsWithStock);
        setProducts(productsWithStock);
        if (productsWithStock.length > 0) {
          setProductId(productsWithStock[0].id);
        }
      })
      .catch((err) => {
        console.error('Error fetching stocks:', err);
        setProducts([]);
      });
  };

  const validateForm = () => {
    if (!customerEmail.includes('@') || !customerEmail.includes('.')) {
      alert('Please enter a valid email address');
      return false;
    }
    
    const cleanPhone = customerPhone.replace(/\s+/g, '').replace(/[-()]/g, '');
    const phoneRegex = /^(\+?255|0)?[67]\d{8}$/;
    
    if (!phoneRegex.test(cleanPhone)) {
      alert('Please enter a valid Tanzanian phone number starting with 6 or 7\n\nExamples:\n+255777595761\n0777595761\n255777595761');
      return false;
    }
    
    if (customerName.trim().length < 2) {
      alert('Please enter a valid customer name');
      return false;
    }
    
    const quantityNum = parseInt(quantity);
    if (isNaN(quantityNum) || quantityNum < 1) {
      alert('Please enter a valid quantity (at least 1)');
      return false;
    }
    
    const selectedProduct = products.find(p => p.id == productId);
    if (!selectedProduct) {
      alert('Please select a product');
      return false;
    }
    
    if (quantityNum > selectedProduct.currentStock) {
      alert(`Insufficient stock! Only ${selectedProduct.currentStock} items available.`);
      return false;
    }
    
    return true;
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const selectedProduct = products.find(p => p.id == productId);
      const actualProductId = selectedProduct?.productId || selectedProduct?.product?.productId;
      
      if (!actualProductId) {
        alert('Error: Could not find product ID');
        setLoading(false);
        return;
      }

      // Clean phone number for backend
      const cleanPhone = customerPhone.replace(/\s+/g, '').replace(/[-()]/g, '');
      
      // Format phone number properly
      let formattedPhone = cleanPhone;
      if (cleanPhone.startsWith('0')) {
        formattedPhone = '255' + cleanPhone.substring(1);
      } else if (cleanPhone.startsWith('+255')) {
        formattedPhone = cleanPhone.substring(1);
      }

      // Prepare order data
      const orderData = {
        productId: parseInt(actualProductId),
        customerEmail: customerEmail.trim(),
        customerPhone: formattedPhone,
        customerName: customerName.trim(),
        quantity: quantity.toString(),
        orderType: orderType,
        size: size,
        preferredNetwork: preferredNetwork
      };

      console.log('📤 Sending order data:', orderData);

      // Send JSON request
      const response = await axios.post('http://localhost:8080/api/orders/create', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000
      });

      console.log('✅ Order created successfully:', response.data);
      
      setOrderSuccess(response.data);
      setShowOrderDetails(true);
      resetForm();
      setShowOrderForm(false);
      fetchProducts();
      
    } catch (error) {
      console.error('❌ Full error details:', error);
      console.error('📊 Error response data:', error.response?.data);
      console.error('🔢 Error status:', error.response?.status);
      
      let errorMessage = 'Unknown error occurred';
      
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      } else if (error.request) {
        errorMessage = 'No response received from server. Check if backend is running.';
      } else {
        errorMessage = error.message;
      }

      alert(`Failed to create order:\n\n${errorMessage}\n\nStatus: ${error.response?.status || 'No response'}`);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setCustomerEmail('');
    setCustomerPhone('');
    setCustomerName('');
    setQuantity('');
    setOrderType('STANDARD');
    setSize('MEDIUM');
    setPreferredNetwork('tigo');
  };

  const selectedProduct = products.find(p => p.id == productId);
  const totalAmount = selectedProduct ? selectedProduct.sellingPrice * parseInt(quantity || 0) : 0;
  const availableStock = selectedProduct ? selectedProduct.currentStock : 0;

  const getNetworkDisplayName = (network) => {
    switch (network) {
      case 'tigo': return 'Tigo Pesa';
      case 'mpesa': return 'M-Pesa';
      case 'airtel': return 'Airtel Money';
      case 'halopesa': return 'Halotel Pesa';
      default: return 'Mobile Money';
    }
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value.replace(/\D/g, '');
    
    if (cleaned.length <= 3) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    } else if (cleaned.length <= 9) {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
    } else {
      return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setCustomerPhone(formatted);
  };

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    setQuantity(value);
    
    if (selectedProduct && value) {
      const quantityNum = parseInt(value);
      if (!isNaN(quantityNum) && quantityNum > selectedProduct.currentStock) {
        console.log(`Warning: Quantity (${quantityNum}) exceeds available stock (${selectedProduct.currentStock})`);
      }
    }
  };

  const getStockStatusColor = (currentStock, requestedQuantity = 0) => {
    if (currentStock === 0) return '#dc3545';
    if (requestedQuantity > currentStock) return '#ffc107';
    if (currentStock < 10) return '#fd7e14';
    return '#28a745';
  };

  const getStockStatusMessage = (currentStock, requestedQuantity = 0) => {
    if (currentStock === 0) return 'Out of Stock';
    if (requestedQuantity > currentStock) return 'Insufficient Stock';
    if (currentStock < 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
    }}>
      <Navigation />
      
      <div style={{ 
        padding: '30px 20px',
        maxWidth: '1500px',
        marginLeft: "230px",
        marginRight: "250px",
        margin: '0 auto'
      }}>
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '30px',
          width: "1420px",
          padding: '25px 30px',
          marginLeft: "137px",
          marginTop: "22px",
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          borderRadius: '5px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <h1 style={{ 
              margin: 0, 
              fontSize: '32px', 
              marginLeft: "0px",
              fontWeight: '700',
              textShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              🛒 Order Management
            </h1>
            <p style={{ 
              margin: '8px 0 0 0', 
              fontSize: '16px',
              opacity: 0.9
            }}>
              Create new orders and generate control numbers for payment
            </p>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '20px',
            position: 'relative',
            zIndex: 2
          }}>
            <span style={{ 
              padding: '10px 20px', 
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white', 
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: '600',
              border: '1px solid rgba(255,255,255,0.3)'
            }}>
              📦 {products.length} Products Available
            </span>
            <button
              onClick={() => setShowOrderForm(true)}
              style={{
                padding: '14px 28px',
                background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '600',
                width: "200px",
                height: "75px",
                fontSize: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 6px 20px rgba(76, 175, 80, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(76, 175, 80, 0.3)';
              }}
            >
              <span style={{ fontSize: '18px' }}>📋</span>
              Create New Order
            </button>
          </div>
          
          {/* Background decoration */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
            borderRadius: '50%'
          }}></div>
        </div>

        {/* Order Details Page - This will appear after successful order creation */}
        {showOrderDetails && orderSuccess && (
          <div style={{
            background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
            padding: '40px',
            borderRadius: '20px',
            marginBottom: '30px',
            border: '3px solid #28a745',
            boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
            animation: 'slideInUp 0.5s ease-out',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              marginBottom: '30px'
            }}>
              <h2 style={{ 
                margin: 0, 
                color: '#2c3e50', 
                fontSize: '32px',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                📄 Order Details
              </h2>
              <button
                onClick={() => setShowOrderDetails(false)}
                style={{
                  background: 'linear-gradient(135deg, #dc3545 0%, #c82333 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(220, 53, 69, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(220, 53, 69, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(220, 53, 69, 0.3)';
                }}
              >
                Close Details
              </button>
            </div>

            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '25px',
              marginBottom: '30px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                padding: '25px',
                borderRadius: '15px',
                borderLeft: '5px solid #2196f3'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#1976d2', fontSize: '20px' }}>Order Information</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div><strong>Order ID:</strong> <span style={{ fontWeight: '600' }}>{orderSuccess.orderId}</span></div>
                  <div><strong>Control Number:</strong> <span style={{ fontWeight: '700', color: '#d32f2f', fontSize: '18px' }}>{orderSuccess.controlNumber}</span></div>
                  <div><strong>Status:</strong> <span style={{ 
                    background: '#d4edda', 
                    padding: '4px 12px', 
                    borderRadius: '20px',
                    color: '#155724',
                    fontWeight: '600',
                    fontSize: '14px'
                  }}>{orderSuccess.status}</span></div>
                  <div><strong>Order Date:</strong> {new Date().toLocaleDateString()}</div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%)',
                padding: '25px',
                borderRadius: '15px',
                borderLeft: '5px solid #4caf50'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#2e7d32', fontSize: '20px' }}>Product Information</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div><strong>Product:</strong> {orderSuccess.product?.productName}</div>
                  <div><strong>Quantity:</strong> {orderSuccess.quantity}</div>
                  <div><strong>Unit Price:</strong> Tsh {orderSuccess.product?.sellingPrice || orderSuccess.totalAmount / orderSuccess.quantity}</div>
                  <div><strong>Order Type:</strong> {orderSuccess.orderType || 'STANDARD'}</div>
                  <div><strong>Size:</strong> {orderSuccess.size || 'MEDIUM'}</div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%)',
                padding: '25px',
                borderRadius: '15px',
                borderLeft: '5px solid #ff9800'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#ef6c00', fontSize: '20px' }}>Customer Information</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div><strong>Name:</strong> {orderSuccess.customerName}</div>
                  <div><strong>Email:</strong> {orderSuccess.customerEmail}</div>
                  <div><strong>Phone:</strong> {orderSuccess.customerPhone}</div>
                  <div><strong>Payment Network:</strong> {getNetworkDisplayName(orderSuccess.preferredNetwork || 'tigo')}</div>
                </div>
              </div>

              <div style={{
                background: 'linear-gradient(135deg, #fce4ec 0%, #f8bbd9 100%)',
                padding: '25px',
                borderRadius: '15px',
                borderLeft: '5px solid #e91e63'
              }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#c2185b', fontSize: '20px' }}>Payment Summary</h3>
                <div style={{ display: 'grid', gap: '12px' }}>
                  <div><strong>Subtotal:</strong> Tsh {orderSuccess.totalAmount}</div>
                  <div><strong>Tax:</strong> Tsh 0</div>
                  <div><strong>Shipping:</strong> Tsh 0</div>
                  <div style={{ 
                    fontSize: '24px', 
                    fontWeight: '700', 
                    color: '#28a745',
                    borderTop: '2px solid #e9ecef',
                    paddingTop: '10px',
                    marginTop: '5px'
                  }}>
                    <strong>Total Amount:</strong> Tsh {orderSuccess.totalAmount}
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              background: 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)',
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid #ffc107',
              textAlign: 'center'
            }}>
              <h4 style={{ margin: '0 0 15px 0', color: '#856404', fontSize: '18px' }}>📧 Payment Instructions</h4>
              <p style={{ margin: '0', color: '#856404', fontSize: '16px' }}>
                Please check your email at <strong>{orderSuccess.customerEmail}</strong> for complete payment instructions. 
                Use the control number <strong>{orderSuccess.controlNumber}</strong> when making your payment via {getNetworkDisplayName(orderSuccess.preferredNetwork || 'tigo')}.
              </p>
            </div>
          </div>
        )}

        {/* Order Success Message (Temporary) */}
        {orderSuccess && !showOrderDetails && (
          <div style={{
            background: 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)',
            color: '#155724',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '30px',
            border: '2px solid #b1dfbb',
            boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
            animation: 'slideInUp 0.5s ease-out',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '25px',
              position: 'relative',
              zIndex: 2
            }}>
              <div style={{ 
                fontSize: '60px',
                animation: 'bounce 2s infinite'
              }}>🎉</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ 
                  margin: '0 0 20px 0', 
                  fontSize: '26px',
                  fontWeight: '700'
                }}>
                  Order Created Successfully!
                </h3>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
                  gap: '20px',
                  marginBottom: '25px'
                }}>
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '12px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #28a745'
                  }}>
                    <strong>Order ID:</strong><br/>
                    <span style={{ fontWeight: '600' }}>{orderSuccess.orderId}</span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '12px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #ffc107'
                  }}>
                    <strong>Control Number:</strong><br/>
                    <span style={{ 
                      fontWeight: '700',
                      color: '#856404',
                      fontSize: '16px'
                    }}>
                      {orderSuccess.controlNumber}
                    </span>
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '12px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #17a2b8'
                  }}>
                    <strong>Product:</strong><br/>
                    {orderSuccess.product?.productName}
                  </div>
                  <div style={{
                    background: 'rgba(255,255,255,0.6)',
                    padding: '12px',
                    borderRadius: '8px',
                    borderLeft: '4px solid #6f42c1'
                  }}>
                    <strong>Total Amount:</strong><br/>
                    <span style={{ fontWeight: '600' }}>Tsh {orderSuccess.totalAmount}</span>
                  </div>
                </div>
                <div style={{ 
                  padding: '15px',
                  background: 'rgba(255,255,255,0.7)',
                  borderRadius: '10px',
                  borderLeft: '4px solid #28a745',
                  fontSize: '15px'
                }}>
                  📧 Check your email (<strong>{orderSuccess.customerEmail}</strong>) for payment instructions and order confirmation.
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '15px', 
              marginTop: '25px',
              position: 'relative',
              zIndex: 2
            }}>
              <button 
                onClick={() => setShowOrderDetails(true)}
                style={{
                  background: 'linear-gradient(135deg, #28a745 0%, #218838 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 3px 10px rgba(40, 167, 69, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(40, 167, 69, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 3px 10px rgba(40, 167, 69, 0.3)';
                }}
              >
                View Full Order Details
              </button>
              <button 
                onClick={() => {
                  setOrderSuccess(null);
                  setShowOrderForm(false);
                }}
                style={{
                  background: 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)',
                  color: 'white',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 5px 15px rgba(108, 117, 125, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                Close
              </button>
            </div>
            
            {/* Background pattern */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '100px',
              opacity: 0.1,
              zIndex: 1
            }}>✅</div>
          </div>
        )}

        {/* Order Form Modal */}
        {showOrderForm && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-in',
            padding: '20px'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
              padding: '35px',
              borderRadius: '20px',
              maxWidth: '700px',
              width: '100%',
              maxHeight: '95vh',
              overflow: 'auto',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              border: '1px solid rgba(255,255,255,0.2)'
            }}>
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowOrderForm(false);
                  resetForm();
                }}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0,0,0,0.1)',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#6c757d',
                  padding: '8px',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.3s ease',
                  zIndex: 10
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#dc3545';
                  e.target.style.color = 'white';
                  e.target.style.transform = 'rotate(90deg)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.1)';
                  e.target.style.color = '#6c757d';
                  e.target.style.transform = 'rotate(0deg)';
                }}
              >
                ✕
              </button>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '30px',
                paddingBottom: '20px',
                borderBottom: '2px solid #e9ecef'
              }}>
                <h2 style={{ 
                  margin: 0, 
                  color: '#2c3e50', 
                  fontSize: '28px',
                  fontWeight: '700',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}>
                  📋 Create New Order
                </h2>
              </div>

              <form onSubmit={handleCreateOrder}>
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr', 
                  gap: '25px',
                  marginBottom: '25px'
                }}>
                  {/* Left Column */}
                  <div>
                    {/* Product Selection */}
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        📦 Product *
                      </label>
                      <select
                        value={productId}
                        onChange={(e) => setProductId(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'white',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                        }}
                      >
                        <option value="">Select a product</option>
                        {products.map(product => (
                          <option key={product.id} value={product.id}>
                            {product.productName} - Stock: {product.currentStock} - Tsh {product.sellingPrice}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Order Details */}
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        🔢 Quantity Needed *
                      </label>
                      <input
                        type="number"
                        value={quantity}
                        onChange={handleQuantityChange}
                        required
                        min="1"
                        max={availableStock}
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: `2px solid ${getStockStatusColor(availableStock, parseInt(quantity || 0))}`,
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          backgroundColor: availableStock === 0 ? '#f8d7da' : 'white',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        placeholder="Enter quantity needed"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = getStockStatusColor(availableStock, parseInt(quantity || 0));
                          e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                        }}
                        disabled={availableStock === 0}
                      />
                      {selectedProduct && (
                        <div style={{ 
                          marginTop: '8px', 
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: '600',
                          color: getStockStatusColor(availableStock, parseInt(quantity || 0)),
                          padding: '8px 12px',
                          background: 'rgba(0,0,0,0.03)',
                          borderRadius: '6px'
                        }}>
                          📊 Available: {availableStock} items • 
                          Status: {getStockStatusMessage(availableStock, parseInt(quantity || 0))}
                          {availableStock === 0 && ' • Product unavailable'}
                          {availableStock > 0 && parseInt(quantity || 0) > availableStock && ' • Reduce quantity'}
                        </div>
                      )}
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        🏷️ Order Type
                      </label>
                      <select
                        value={orderType}
                        onChange={(e) => setOrderType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                       <option value="DELIVERY">Delivery</option>
                        <option value="PICKUP">Pickup</option>
                        <option value="OTHER">Other</option>
                      </select>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        📏 Size
                      </label>
                      <select
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <option value="SMALL">Small</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LARGE">Large</option>
                        <option value="XL">Extra Large</option>
                      </select>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div>
                    {/* Customer Information */}
                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        👤 Customer Name *
                      </label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        placeholder="Enter customer full name"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        📧 Customer Email *
                      </label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        required
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        placeholder="customer@example.com"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                        }}
                      />
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        📞 Customer Phone *
                      </label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={handlePhoneChange}
                        required
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                        placeholder="255 777 595 761"
                        onFocus={(e) => {
                          e.target.style.borderColor = '#667eea';
                          e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = '#e9ecef';
                          e.target.style.boxShadow = '0 2px 5px rgba(0,0,0,0.05)';
                        }}
                      />
                      <small style={{ 
                        color: '#6c757d', 
                        marginTop: '8px', 
                        display: 'block',
                        fontSize: '13px'
                      }}>
                        Format: 255777595761, 0777595761, or +255777595761
                      </small>
                    </div>

                    <div style={{ marginBottom: '25px' }}>
                      <label style={{ 
                        display: 'block', 
                        marginBottom: '10px', 
                        fontWeight: '600', 
                        color: '#495057',
                        fontSize: '15px'
                      }}>
                        💰 Preferred Payment Network
                      </label>
                      <select
                        value={preferredNetwork}
                        onChange={(e) => setPreferredNetwork(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '14px',
                          border: '2px solid #e9ecef',
                          borderRadius: '10px',
                          fontSize: '15px',
                          transition: 'all 0.3s ease',
                          boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
                        }}
                      >
                        <option value="tigo">Tigo Pesa</option>
                        <option value="mpesa">M-Pesa</option>
                        <option value="airtel">Airtel Money</option>
                        <option value="halopesa">Halotel Pesa</option>
                      </select>
                      <small style={{ 
                        color: '#6c757d', 
                        marginTop: '8px', 
                        display: 'block',
                        fontSize: '13px'
                      }}>
                        Selected: {getNetworkDisplayName(preferredNetwork)}
                      </small>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                {selectedProduct && quantity && (
                  <div style={{
                    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                    padding: '25px',
                    borderRadius: '12px',
                    marginBottom: '30px',
                    border: `2px solid ${getStockStatusColor(availableStock, parseInt(quantity))}`,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                    position: 'relative'
                  }}>
                    <h4 style={{ 
                      margin: '0 0 20px 0', 
                      color: '#495057', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '10px',
                      fontSize: '18px'
                    }}>
                      📊 Order Summary
                    </h4>
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', 
                      gap: '20px'
                    }}>
                      <div style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}>
                        <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>Product</div>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>{selectedProduct.productName}</div>
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}>
                        <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>Quantity</div>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>{quantity}</div>
                      </div>
                      <div style={{
                        background: 'white',
                        padding: '15px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                      }}>
                        <div style={{ fontSize: '12px', color: '#6c757d', marginBottom: '5px' }}>Unit Price</div>
                        <div style={{ fontWeight: '600', fontSize: '14px' }}>Tsh {selectedProduct.sellingPrice}</div>
                      </div>
                      <div style={{
                        background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                        padding: '15px',
                        borderRadius: '8px',
                        textAlign: 'center',
                        boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
                        color: 'white'
                      }}>
                        <div style={{ fontSize: '12px', opacity: 0.9, marginBottom: '5px' }}>Total Amount</div>
                        <div style={{ fontWeight: '700', fontSize: '18px' }}>Tsh {totalAmount}</div>
                      </div>
                    </div>
                    {parseInt(quantity) > availableStock && (
                      <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
                        border: '1px solid #f5c6cb',
                        borderRadius: '8px',
                        color: '#721c24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '18px' }}>⚠️</span>
                        <div>
                          <strong>Warning:</strong> Order quantity exceeds available stock!
                        </div>
                      </div>
                    )}
                    {availableStock === 0 && (
                      <div style={{
                        marginTop: '20px',
                        padding: '15px',
                        background: 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)',
                        border: '1px solid #f5c6cb',
                        borderRadius: '8px',
                        color: '#721c24',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                      }}>
                        <span style={{ fontSize: '18px' }}>❌</span>
                        <div>
                          <strong>Out of Stock:</strong> This product is currently unavailable.
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || availableStock === 0 || parseInt(quantity || 0) > availableStock}
                  style={{
                    width: '100%',
                    padding: '18px',
                    background: loading || availableStock === 0 || parseInt(quantity || 0) > availableStock 
                      ? 'linear-gradient(135deg, #6c757d 0%, #5a6268 100%)' 
                      : 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: loading || availableStock === 0 || parseInt(quantity || 0) > availableStock ? 'not-allowed' : 'pointer',
                    fontSize: '17px',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    boxShadow: loading || availableStock === 0 || parseInt(quantity || 0) > availableStock 
                      ? 'none' 
                      : '0 6px 20px rgba(40, 167, 69, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading && availableStock > 0 && !(parseInt(quantity || 0) > availableStock)) {
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(40, 167, 69, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading && availableStock > 0 && !(parseInt(quantity || 0) > availableStock)) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 6px 20px rgba(40, 167, 69, 0.3)';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <div style={{ 
                        width: '22px', 
                        height: '22px', 
                        border: '2px solid transparent',
                        borderTop: '2px solid white',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite'
                      }}></div>
                      Creating Order...
                    </>
                  ) : availableStock === 0 ? (
                    '❌ Product Out of Stock'
                  ) : parseInt(quantity || 0) > availableStock ? (
                    '⚠️ Reduce Quantity'
                  ) : (
                    <>
                      <span style={{ fontSize: '20px' }}>🛒</span>
                      Create Order & Generate Control Number
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Add CSS animations */}
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default OrderList;