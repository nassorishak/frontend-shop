// // import React, { useEffect, useState } from 'react';
// // import Navigation from '../navigation/Navigation';
// // import axios from 'axios';

// // const VendorDashboard = () => {
// //   const [stocks, setStocks] = useState([]);

// //   useEffect(() => {
// //     // Fetch stocks
// //     axios.get('http://localhost:8080/api/stocks/all-stocks')
// //       .then((res) => setStocks(res.data))
// //       .catch((err) => console.error('Error fetching stocks:', err));
// //   }, []);

// //   return (
// //     <div style={{ 
// //       display: 'flex', 
// //       flexDirection: 'column', 
// //       minHeight: '100vh',
// //       backgroundColor: '#f5f7fa'
// //     }}>
// //       <Navigation />
      
// //       <div style={{
// //         flex: 1,
// //         padding: '20px',
// //         marginTop: '70px',
// //         width:"1400px",
// //         marginLeft: '250px',
// //         overflow: 'hidden'
// //       }}>
// //         <h2 style={{ 
// //           margin: '20px 0 30px 0', 
// //           textAlign: 'center', 
// //           fontWeight: '600', 
// //           color: '#2c3e50',
// //           fontSize: '28px'
// //         }}>
// //           📦 Stock Overview
// //         </h2>

// //         <div style={{
// //           height: 'calc(100vh - 180px)',
// //           overflowY: 'auto',
// //           padding: '10px 20px 80px 20px',
// //           margin: '0 -20px'
// //         }}>
// //           <div style={{
// //             display: 'grid',
// //             gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
// //             gap: '25px',
// //             justifyItems: 'center'
// //           }}>
// //             {stocks.map((stock, index) => (
// //               <div
// //                 key={stock.stockId}
// //                 style={{
// //                   borderRadius: "18px",
// //                   padding: "25px",
// //                   boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
// //                   textAlign: "center",
// //                   width: "100%",
// //                   maxWidth: "320px",
// //                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
// //                   background: index % 2 === 0 
// //                     ? "linear-gradient(135deg, #e3f2fd, #bbdefb)" 
// //                     : "linear-gradient(135deg, #ffebee, #ffcdd2)",
// //                   cursor: 'pointer',
// //                   position: 'relative',
// //                   overflow: 'hidden'
// //                 }}
// //                 onMouseEnter={(e) => {
// //                   e.currentTarget.style.transform = "translateY(-8px)";
// //                   e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
// //                 }}
// //                 onMouseLeave={(e) => {
// //                   e.currentTarget.style.transform = "translateY(0)";
// //                   e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
// //                 }}
// //               >
// //                 <div style={{
// //                   position: 'absolute',
// //                   top: '0',
// //                   left: '0',
// //                   right: '0',
// //                   height: '6px',
// //                   background: index % 2 === 0 ? '#2196f3' : '#f44336'
// //                 }}></div>
                
// //                 <h3 style={{ 
// //                   color: "#263238", 
// //                   fontSize: "20px", 
// //                   margin: "15px 0",
// //                   fontWeight: '600'
// //                 }}>
// //                   {stock.product?.productName || 'Unknown Product'}
// //                 </h3>
                
// //                 <div style={{
// //                   display: 'flex',
// //                   justifyContent: 'space-between',
// //                   margin: '15px 0'
// //                 }}>
// //                   <div style={{ textAlign: 'center' }}>
// //                     <div style={{
// //                       padding: '8px',
// //                       borderRadius: '12px',
// //                       backgroundColor: 'rgba(33, 150, 243, 0.1)',
// //                       display: 'inline-block',
// //                       marginBottom: '8px'
// //                     }}>
// //                       <span style={{ fontSize: '24px', color: '#2196f3' }}>📥</span>
// //                     </div>
// //                     <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>
// //                       In Stock
// //                     </p>
// //                     <p style={{ fontSize: "18px", color: "#2196f3", fontWeight: 'bold', margin: 0 }}>
// //                       {stock.inStock}
// //                     </p>
// //                   </div>
                  
// //                   <div style={{ textAlign: 'center' }}>
// //                     <div style={{
// //                       padding: '8px',
// //                       borderRadius: '12px',
// //                       backgroundColor: 'rgba(244, 67, 54, 0.1)',
// //                       display: 'inline-block',
// //                       marginBottom: '8px'
// //                     }}>
// //                       <span style={{ fontSize: '24px', color: '#f44336' }}>📤</span>
// //                     </div>
// //                     <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>
// //                       Out Stock
// //                     </p>
// //                     <p style={{ fontSize: "18px", color: "#f44336", fontWeight: 'bold', margin: 0 }}>
// //                       {stock.outStock}
// //                     </p>
// //                   </div>
// //                 </div>
                
// //                 <div style={{
// //                   marginTop: '20px',
// //                   padding: '12px',
// //                   borderRadius: '12px',
// //                   backgroundColor: 'rgba(38, 50, 56, 0.05)'
// //                 }}>
// //                   <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>
// //                     Current Stock
// //                   </p>
// //                   <p style={{ fontSize: "22px", color: "#263238", fontWeight: 'bold', margin: 0 }}>
// //                     {stock.currentStock}
// //                   </p>
// //                 </div>
// //               </div>
// //             ))}
            
// //             {stocks.length === 0 && (
// //               <div style={{ 
// //                 gridColumn: '1 / -1', 
// //                 textAlign: 'center', 
// //                 padding: '40px',
// //                 color: '#78909c'
// //               }}>
// //                 <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
// //                 <h3 style={{ color: '#546e7a', marginBottom: '10px' }}>No stock data available</h3>
// //                 <p>Stocks will appear here once they are added to the system</p>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default VendorDashboard;

// import React, { useEffect, useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import axios from 'axios';

// const VendorDashboard = () => {
//   const [stocks, setStocks] = useState([]);
//   const [productStocks, setProductStocks] = useState({});

//   useEffect(() => {
//     // Fetch stocks
//     axios.get('http://localhost:8080/api/stocks/all-stocks')
//       .then((res) => {
//         setStocks(res.data);
        
//         // Aggregate stocks by product name
//         const aggregatedStocks = {};
//         res.data.forEach(stock => {
//           const productName = stock.product?.productName || 'Unknown Product';
          
//           if (!aggregatedStocks[productName]) {
//             aggregatedStocks[productName] = {
//               productName: productName,
//               inStock: 0,
//               outStock: 0,
//               currentStock: 0
//             };
//           }
          
//           aggregatedStocks[productName].inStock += stock.inStock || 0;
//           aggregatedStocks[productName].outStock += stock.outStock || 0;
//           aggregatedStocks[productName].currentStock += stock.currentStock || 0;
//         });
        
//         setProductStocks(aggregatedStocks);
//       })
//       .catch((err) => console.error('Error fetching stocks:', err));
//   }, []);

//   const productStockArray = Object.values(productStocks);

//   return (
//     <div style={{ 
//       display: 'flex', 
//       flexDirection: 'column', 
//       minHeight: '100vh',
//       backgroundColor: '#f5f7fa'
//     }}>
//       <Navigation />
      
//       <div style={{
//         flex: 1,
//         padding: '20px',
//         marginTop: '70px',
//         width: "1400px",
//         marginLeft: '250px',
//         overflow: 'hidden'
//       }}>
//         <h2 style={{ 
//           margin: '20px 0 30px 0', 
//           textAlign: 'center', 
//           fontWeight: '600', 
//           color: '#2c3e50',
//           fontSize: '28px'
//         }}>
//           📦 Stock Overview
//         </h2>

//         <div style={{
//           height: 'calc(100vh - 180px)',
//           overflowY: 'auto',
//           padding: '10px 20px 80px 20px',
//           margin: '0 -20px'
//         }}>
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
//             gap: '25px',
//             justifyItems: 'center'
//           }}>
//             {productStockArray.map((product, index) => (
//               <div
//                 key={product.productName}
//                 style={{
//                   borderRadius: "18px",
//                   padding: "25px",
//                   boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
//                   textAlign: "center",
//                   width: "100%",
//                   maxWidth: "320px",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   background: index % 2 === 0 
//                     ? "linear-gradient(135deg, #e3f2fd, #bbdefb)" 
//                     : "linear-gradient(135deg, #ffebee, #ffcdd2)",
//                   cursor: 'pointer',
//                   position: 'relative',
//                   overflow: 'hidden'
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "translateY(-8px)";
//                   e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "translateY(0)";
//                   e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
//                 }}
//               >
//                 <div style={{
//                   position: 'absolute',
//                   top: '0',
//                   left: '0',
//                   right: '0',
//                   height: '6px',
//                   background: index % 2 === 0 ? '#2196f3' : '#f44336'
//                 }}></div>
                
//                 <h3 style={{ 
//                   color: "#263238", 
//                   fontSize: "20px", 
//                   margin: "15px 0",
//                   fontWeight: '600'
//                 }}>
//                   {product.productName}
//                 </h3>
                
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   margin: '15px 0'
//                 }}>
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{
//                       padding: '8px',
//                       borderRadius: '12px',
//                       backgroundColor: 'rgba(33, 150, 243, 0.1)',
//                       display: 'inline-block',
//                       marginBottom: '8px'
//                     }}>
//                       <span style={{ fontSize: '24px', color: '#2196f3' }}>📥</span>
//                     </div>
//                     <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>
//                       In Stock
//                     </p>
//                     <p style={{ fontSize: "18px", color: "#2196f3", fontWeight: 'bold', margin: 0 }}>
//                       {product.inStock}
//                     </p>
//                   </div>
                  
//                   <div style={{ textAlign: 'center' }}>
//                     <div style={{
//                       padding: '8px',
//                       borderRadius: '12px',
//                       backgroundColor: 'rgba(244, 67, 54, 0.1)',
//                       display: 'inline-block',
//                       marginBottom: '8px'
//                     }}>
//                       <span style={{ fontSize: '24px', color: '#f44336' }}>📤</span>
//                     </div>
//                     <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>
//                       Out Stock
//                     </p>
//                     <p style={{ fontSize: "18px", color: "#f44336", fontWeight: 'bold', margin: 0 }}>
//                       {product.outStock}
//                     </p>
//                   </div>
//                 </div>
                
//                 <div style={{
//                   marginTop: '20px',
//                   padding: '12px',
//                   borderRadius: '12px',
//                   backgroundColor: 'rgba(38, 50, 56, 0.05)'
//                 }}>
//                   <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>
//                     Current Stock
//                   </p>
//                   <p style={{ fontSize: "22px", color: "#263238", fontWeight: 'bold', margin: 0 }}>
//                     {product.currentStock}
//                   </p>
//                 </div>
//               </div>
//             ))}
            
//             {productStockArray.length === 0 && (
//               <div style={{ 
//                 gridColumn: '1 / -1', 
//                 textAlign: 'center', 
//                 padding: '40px',
//                 color: '#78909c'
//               }}>
//                 <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
//                 <h3 style={{ color: '#546e7a', marginBottom: '10px' }}>No stock data available</h3>
//                 <p>Stocks will appear here once they are added to the system</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDashboard;


import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const VendorDashboard = () => {
  const [stocks, setStocks] = useState([]);
  const [productStocks, setProductStocks] = useState({});

  useEffect(() => {
    axios.get('http://localhost:8080/api/stocks/all-stocks')
      .then((res) => {
        const data = res.data;

        // Aggregate stocks by product name
        const aggregatedStocks = {};
        data.forEach(stock => {
          const productName = stock.product?.productName || 'Unknown Product';

          if (!aggregatedStocks[productName]) {
            aggregatedStocks[productName] = {
              productName: productName,
              inStock: 0,
              outStock: 0,
              currentStock: 0
            };
          }

          aggregatedStocks[productName].inStock += stock.inStock || 0;
          aggregatedStocks[productName].outStock += stock.outStock || 0;
          aggregatedStocks[productName].currentStock =
            aggregatedStocks[productName].inStock - aggregatedStocks[productName].outStock;
        });

        setStocks(data);
        setProductStocks(aggregatedStocks);
      })
      .catch((err) => console.error('Error fetching stocks:', err));
  }, []);

  const productStockArray = Object.values(productStocks);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f7fa' }}>
      <Navigation />
      <div style={{ flex: 1, padding: '20px', marginTop: '20px', width: "1400px", marginLeft: '250px', overflow: 'hidden' }}>
        <h2 style={{ margin: '20px 0 30px 0', textAlign: 'center',backgroundColor:"blanchedalmond", fontWeight: '600', color: '#2c3e50', fontSize: '28px',width:"1300px" }}>
          📦 Stock Overview
        </h2>

        <div style={{ height: 'calc(100vh - 180px)', overflowY: 'auto', padding: '10px 20px 80px 20px', margin: '0 -20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px', justifyItems: 'center' }}>
            {productStockArray.map((product, index) => (
              <div
                key={product.productName}
                style={{
                  borderRadius: "18px",
                  padding: "25px",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
                  textAlign: "center",
                  width: "100%",
                  maxWidth: "320px",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  background: index % 2 === 0 ? "linear-gradient(135deg, #e3f2fd, #bbdefb)" : "linear-gradient(135deg, #ffebee, #ffcdd2)",
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 15px 30px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.08)";
                }}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '6px', background: index % 2 === 0 ? '#2196f3' : '#f44336' }}></div>
                <h3 style={{ color: "#263238", fontSize: "20px", margin: "15px 0", fontWeight: '600' }}>{product.productName}</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: 'rgba(33, 150, 243, 0.1)', display: 'inline-block', marginBottom: '8px' }}>
                      <span style={{ fontSize: '24px', color: '#2196f3' }}>📥</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>In Stock</p>
                    <p style={{ fontSize: "18px", color: "#2196f3", fontWeight: 'bold', margin: 0 }}>{product.inStock}</p>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ padding: '8px', borderRadius: '12px', backgroundColor: 'rgba(244, 67, 54, 0.1)', display: 'inline-block', marginBottom: '8px' }}>
                      <span style={{ fontSize: '24px', color: '#f44336' }}>📤</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>Out Stock</p>
                    <p style={{ fontSize: "18px", color: "#f44336", fontWeight: 'bold', margin: 0 }}>{product.outStock}</p>
                  </div>
                </div>

                <div style={{ marginTop: '20px', padding: '12px', borderRadius: '12px', backgroundColor: 'rgba(38, 50, 56, 0.05)' }}>
                  <p style={{ fontSize: "14px", color: "#37474f", margin: '5px 0' }}>Current Stock</p>
                  <p style={{ fontSize: "22px", color: "#263238", fontWeight: 'bold', margin: 0 }}>{product.currentStock}</p>
                </div>
              </div>
            ))}

            {productStockArray.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#78909c' }}>
                <div style={{ fontSize: '60px', marginBottom: '20px' }}>📦</div>
                <h3 style={{ color: '#546e7a', marginBottom: '10px' }}>No stock data available</h3>
                <p>Stocks will appear here once they are added to the system</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;
