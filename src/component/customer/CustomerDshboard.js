import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const CustomerDashboard = () => {
  const [countOrder, setCountOrder] = useState(0);
  const [acceptedOrder, setAcceptedOrder] = useState(0);
  const [canceledOrder, setCanceledOrder] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get customerId from localStorage
  const customerId = parseInt(localStorage.getItem('customerId'), 10);

  useEffect(() => {
    fetchOrders();
  }, [customerId]);

  const fetchOrders = () => {
    setLoading(true);
    axios.get('http://localhost:8080/api/orders/all')
      .then((response) => {
        const allOrders = response.data;
        
        if (!allOrders || allOrders.length === 0) {
          setCountOrder(0);
          setAcceptedOrder(0);
          setCanceledOrder(0);
          setTotalPayment(0);
          setLoading(false);
          return;
        }

        // Filter orders for this specific customer
        const userOrders = allOrders.filter(order => {
          if (order.customer && order.customer.userId === customerId) return true;
          if (order.customerId === customerId) return true;
          if (order.user && order.user.userId === customerId) return true;
          if (order.userId === customerId) return true;
          return false;
        });

        // Calculate statistics
        setCountOrder(userOrders.length);

        // Count completed orders
        const completedOrders = userOrders.filter(order => {
          const status = order.status ? order.status.toLowerCase() : '';
          return status === 'complete' || status === 'completed' || status === 'delivered';
        });
        setAcceptedOrder(completedOrders.length);

        // Count canceled orders
        const canceledOrders = userOrders.filter(order => {
          const status = order.status ? order.status.toLowerCase() : '';
          return status === 'canceled' || status === 'cancelled' || status === 'rejected';
        });
        setCanceledOrder(canceledOrders.length);

        // Calculate total payment
        const totalPaymentAmount = completedOrders.reduce((total, order) => {
          return total + (order.totalAmount || order.amount || 0);
        }, 0);
        setTotalPayment(totalPaymentAmount);
        
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  };

  return (
    <>
      <Navigation />
      <div style={{ 
        padding: "20px", 
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
        minHeight: "100vh", 
        backgroundColor: "#d8dbddff",
        marginLeft: "250px",
        width: "85%",
        marginTop: "20px"
      }}>
        <h1 style={{ 
          textAlign: "center", 
          overflowY: "hidden",
          backgroundColor: "#e2e6e9ff", 
          color: "black", 
          padding: "12px", 
          borderRadius: "12px", 
          marginBottom: "30px",
          marginTop: "20px"
        }}>
          CUSTOMER DASHBOARD
        </h1>

        {loading ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#6c757d'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '10px' }}>⏳</div>
            <h3>Loading orders...</h3>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            marginBottom: '30px'
          }}>
            {/* Total Orders Card */}
            <div style={{ 
              backgroundColor: '#fce4ec',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #e91e63'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 15px 0', color: '#e91e63' }}>📦</div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#333' }}>{countOrder}</h3>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#666' }}>Total Orders</p>
            </div>

            {/* Completed Orders Card */}
            <div style={{ 
              backgroundColor: '#e8f5e9',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #4caf50'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 15px 0', color: '#4caf50' }}>✅</div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#333' }}>{acceptedOrder}</h3>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#666' }}>Completed Orders</p>
            </div>

            {/* Canceled Orders Card */}
            <div style={{ 
              backgroundColor: '#fff3e0',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #ff9800'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 15px 0', color: '#ff9800' }}>❌</div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#333' }}>{canceledOrder}</h3>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#666' }}>Canceled Orders</p>
            </div>

            {/* Total Payment Card */}
            <div style={{ 
              backgroundColor: '#e3f2fd',
              padding: '25px',
              borderRadius: '12px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              borderLeft: '4px solid #2196f3'
            }}>
              <div style={{ fontSize: '36px', margin: '0 0 15px 0', color: '#2196f3' }}>💰</div>
              <h3 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#333' }}>Tsh {totalPayment.toLocaleString()}</h3>
              <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#666' }}>Total Payment</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CustomerDashboard;