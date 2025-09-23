// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const fetchProducts = async (query = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
//       console.log('Fetched products:', response.data); // Log data to inspect structure
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };
  
//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts(searchInput);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [searchInput]);
  
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//     fetchProducts(value); // Fetch products based on the search input
//   };
  
//   const location = useLocation();
//   useEffect(()=>{
//     if(location.pathname === '/'){
//       localStorage.removeItem('role');
//       localStorage.removeItem('customerId');
//       localStorage.removeItem('vendorId');
//     }
//   },[location]);

//   return (
//     <>
//       <nav className="navbar navbar-expand-sm navbar-dark bg-dark" style={{position:"fixed"}}>
//         <div className="container-fluid">
//           <img src='image1a.jpg' style={{height:"50px",width:"60px",borderRadius:"25px"}}/>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="mynavbar">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//               </li>
//               {/* Add more nav items as needed */}
//             </ul>
//             <form className="d-flex">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="Search products"
//                 value={searchInput}
//                 onChange={handleSearch}
//                 style={{width:"250px",marginLeft:"350px"}}
//               />
//               <Link to={'/login'}><button type='submit'name='submit' style={{backgroundColor:"white",borderRadius:"6px",marginLeft:"20px",color:"black"}}>Login</button></Link>
//             </form>
//           </div>
//         </div>
//       </nav>
      

//       <div className="content py-3 py-md-5 bg-light"><marquee behavior="scroll" direction="left">Scrolling text!</marquee>

//       <h4 className="mb-4" style={{textAlign:"center",marginTop:"30px",position:"fixed"}}>ZANZIBAR WEDDING CLOTHING HUB AND DECORATION CENTER</h4>
//       <h4 className="mb-4" style={{marginLeft:"40px",marginTop:"30px",position:"fixed"}}>Our Products</h4>
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
         
//             </div>
//           </div>
//           <div className="product-container">
//             <div className="row">
//               {filteredProducts.map((product) => (
//                 <div className="col-md-3 d-flex justify-content-center" key={product.productId}>
//                   <div className="product-card">
//                     <div className="product-card-img">
//                       <label className="stock bg-success">In Stock</label>
//                       <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
//                     </div>
//                     <div className="product-card-body">
//                       <p className="product-brand">{product.brand}</p>
//                       <h5 className="product-name">
//                         <a href="#">{product.productName}</a>
//                       </h5>
//                       <div>
//                         <span className="selling-price">Tsh {product.price.toLocaleString()}</span>
//                         <span className="original-price">{product.originalPrice}</span>
//                       </div>
//                       <div>
//                         <span className="prduct-company">{product.vendorCompany}</span>
//                         <a href="#">{product.productCompany}</a>
                        
//                       </div>
//                       <div className="mt-2">
//                         <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustAdvertise;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const fetchProducts = async (query = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
//       console.log('Fetched products:', response.data); // Log data to inspect structure
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };
  
//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts(searchInput);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [searchInput]);
  
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//     fetchProducts(value); // Fetch products based on the search input
//   };
  
//   const location = useLocation();
//   useEffect(()=>{
//     if(location.pathname === '/'){
//       localStorage.removeItem('role');
//       localStorage.removeItem('customerId');
//       localStorage.removeItem('vendorId');
//     }
//   },[location]);

//   return (
//     <>
//       <style>
//         {`
//           body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background-color: #f8f9fa;
//           }
          
//           .custom-navbar {
//             background: linear-gradient(135deg, #2c3e50 0%, #4a6491 100%) !important;
//             box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
//             position: fixed;
//             width: 100%;
//             z-index: 1000;
//           }
          
//           .custom-marquee {
//             background: linear-gradient(90deg, #ff7e5f, #feb47b);
//             color: white;
//             padding: 10px 0;
//             font-weight: bold;
//             font-size: 18px;
//             margin-top: 76px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
          
//           .page-title {
//             text-align: center;
//             margin-top: 30px;
//             color: #2c3e50;
//             font-weight: 700;
//             text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
//             padding-top: 20px;
//           }
          
//           .product-container {
//             padding: 20px 0;
//           }
          
//           .product-card {
//             background: white;
//             border-radius: 12px;
//             overflow: hidden;
//             transition: transform 0.3s ease, box-shadow 0.3s ease;
//             margin-bottom: 25px;
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//             border: none;
//           }
          
//           .product-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
//           }
          
//           .product-card-img {
//             position: relative;
//             height: 220px;
//             overflow: hidden;
//             background: #f7f7f7;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//           }
          
//           .product-card-img img {
//             max-height: 100%;
//             width: auto;
//             max-width: 100%;
//             object-fit: contain;
//             transition: transform 0.5s ease;
//           }
          
//           .product-card:hover .product-card-img img {
//             transform: scale(1.05);
//           }
          
//           .stock {
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             padding: 5px 12px;
//             border-radius: 20px;
//             font-weight: 600;
//             font-size: 12px;
//             z-index: 1;
//           }
          
//           .product-card-body {
//             padding: 20px;
//           }
          
//           .product-brand {
//             color: #6c757d;
//             font-size: 14px;
//             margin-bottom: 5px;
//           }
          
//           .product-name a {
//             color: #2c3e50;
//             font-weight: 600;
//             text-decoration: none;
//             transition: color 0.2s;
//           }
          
//           .product-name a:hover {
//             color: #ff7e5f;
//           }
          
//           .selling-price {
//             font-weight: 700;
//             font-size: 18px;
//             color: #2c3e50;
//           }
          
//           .original-price {
//             text-decoration: line-through;
//             color: #6c757d;
//             margin-left: 10px;
//             font-size: 14px;
//           }
          
//           .prduct-company {
//             display: block;
//             color: #6c757d;
//             font-size: 14px;
//             margin-top: 8px;
//           }
          
//           .btn1 {
//             background: linear-gradient(135deg, #ff7e5f 0%, #feb47b 100%);
//             color: white;
//             border-radius: 50%;
//             width: 40px;
//             height: 40px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border: none;
//             transition: all 0.3s ease;
//           }
          
//           .btn1:hover {
//             transform: scale(1.1);
//             box-shadow: 0 5px 15px rgba(255, 126, 95, 0.4);
//           }
          
//           .search-box {
//             border-radius: 25px;
//             padding: 10px 20px;
//             border: 2px solid rgba(255, 255, 255, 0.2);
//             background: rgba(255, 255, 255, 0.1);
//             color: white;
//           }
          
//           .search-box::placeholder {
//             color: rgba(255, 255, 255, 0.7);
//           }
          
//           .search-box:focus {
//             background: rgba(255, 255, 255, 0.2);
//             border-color: rgba(255, 255, 255, 0.4);
//             box-shadow: none;
//             color: white;
//           }
          
//           .login-btn {
//             background: white;
//             color: #2c3e50;
//             border: none;
//             border-radius: 25px;
//             padding: 10px 25px;
//             font-weight: 600;
//             transition: all 0.3s ease;
//           }
          
//           .login-btn:hover {
//             background: #ff7e5f;
//             color: white;
//             transform: translateY(-2px);
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
//           }
          
//           @media (max-width: 768px) {
//             .custom-marquee {
//               margin-top: 66px;
//               font-size: 14px;
//             }
            
//             .page-title {
//               font-size: 22px;
//             }
//           }
//         `}
//       </style>
      
//       <nav className="navbar navbar-expand-sm navbar-dark custom-navbar">
//         <div className="container-fluid">
//           <img src='image1a.jpg' style={{height:"50px",width:"60px",borderRadius:"25px"}} alt="Logo"/>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="mynavbar">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//               </li>
//               {/* Add more nav items as needed */}
//             </ul>
//             <form className="d-flex">
//               <input
//                 className="form-control me-2 search-box"
//                 type="text"
//                 placeholder="Search products"
//                 value={searchInput}
//                 onChange={handleSearch}
//                 style={{width:"250px",marginLeft:"350px"}}
//               />
//               <Link to={'/login'}><button type='submit' name='submit' className="login-btn">Login</button></Link>
//             </form>
//           </div>
//         </div>
//       </nav>
      
//       <marquee className="custom-marquee" behavior="scroll" direction="left">
//         🎉 Special Offer: Get 20% off on all Plumbing Materials in this season! Visit our store for more details. 🎉
//       </marquee>

//       <div className="content py-3 py-md-5 bg-light">
//         <h2 className="page-title">ZANZIBAR PLUMBING MAKETING SHOP CENTER</h2>
//         <h4 className="mb-4" style={{marginLeft:"40px", marginTop: "2px",paddingTop: "3px", color: "#2c3e50"}}>Our Products</h4>
        
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//             </div>
//           </div>
//           <div className="product-container">
//             <div className="row">
//               {filteredProducts.map((product) => (
//                 <div className="col-md-3 d-flex justify-content-center" key={product.productId}>
//                   <div className="product-card">
//                     <div className="product-card-img">
//                       <label className="stock bg-success">In Stock</label>
//                       <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
//                     </div>
//                     <div className="product-card-body">
//                       <p className="product-brand">{product.brand}</p>
//                       <h5 className="product-name">
//                         <a href="#">{product.productName}</a>
//                       </h5>
//                       <div>
//                         <span className="selling-price">Tsh {product.price.toLocaleString()}</span>
//                         <span className="original-price">{product.originalPrice}</span>
//                       </div>
//                       <div>
//                         <span className="prduct-company">{product.vendorCompany}</span>
//                         <a href="#">{product.productCompany}</a>
//                       </div>
//                       <div className="mt-2">
//                         <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustAdvertise;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const fetchProducts = async (query = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
//       console.log('Fetched products:', response.data); // Log data to inspect structure
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };
  
//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts(searchInput);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [searchInput]);
  
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//     fetchProducts(value); // Fetch products based on the search input
//   };
  
//   const location = useLocation();
//   useEffect(()=>{
//     if(location.pathname === '/'){
//       localStorage.removeItem('role');
//       localStorage.removeItem('customerId');
//       localStorage.removeItem('vendorId');
//     }
//   },[location]);

//   return (
//     <>
//       <style>
//         {`
//           body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background-color: #f8f9fa;
//           }
          
//           .custom-navbar {
//             background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%) !important;
//             box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
//             position: fixed;
//             width: 100%;
//             z-index: 1000;
//           }
          
//           .custom-marquee {
//             background: linear-gradient(to right, #ff7e5f, #feb47b);
//             color: white;
//             padding: 10px 0;
//             font-weight: bold;
//             font-size: 18px;
//             margin-top: 76px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
          
//           .page-title {
//             text-align: center;
//             margin-top: 30px;
//             color: #2c3e50;
//             font-weight: 700;
//             text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
//             padding: 15px;
//             background: linear-gradient(to right, #6a11cb, #2575fc);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//           }
          
//           .product-container {
//             padding: 20px 0;
//           }
          
//           .product-card {
//             background: white;
//             border-radius: 12px;
//             overflow: hidden;
//             transition: transform 0.3s, box-shadow 0.3s;
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//             margin-bottom: 25px;
//             height: 50%;
//           }
          
//           .product-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
//           }
          
//           .product-card-img {
//             position: relative;
//             height: 200px;
//             overflow: hidden;
//           }
          
//           .product-card-img img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//             transition: transform 0.5s;
//           }
          
//           .product-card:hover .product-card-img img {
//             transform: scale(1.05);
//           }
          
//           .stock {
//             position: absolute;
//             top: 10px;
//             right: 10px;
//             padding: 5px 10px;
//             border-radius: 20px;
//             font-size: 12px;
//             font-weight: bold;
//           }
          
//           .product-card-body {
//             padding: 15px;
//           }
          
//           .product-brand {
//             color: #6c757d;
//             font-size: 14px;
//             margin-bottom: 5px;
//           }
          
//           .product-name a {
//             color: #2c3e50;
//             font-weight: 600;
//             text-decoration: none;
//             transition: color 0.3s;
//           }
          
//           .product-name a:hover {
//             color: #2575fc;
//           }
          
//           .selling-price {
//             font-weight: bold;
//             color: #2c3e50;
//             font-size: 18px;
//           }
          
//           .original-price {
//             text-decoration: line-through;
//             color: #6c757d;
//             margin-left: 10px;
//             font-size: 14px;
//           }
          
//           .prduct-company {
//             display: block;
//             color: #6c757d;
//             font-size: 14px;
//             margin-top: 5px;
//           }
          
//           .btn1 {
//             background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
//             color: white;
//             border: none;
//             border-radius: 50%;
//             width: 36px;
//             height: 36px;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: all 0.3s;
//           }
          
//           .btn1:hover {
//             transform: scale(1.1);
//             color: white;
//           }
          
//           .search-box {
//             border-radius: 20px;
//             border: 1px solid rgba(255, 255, 255, 0.3);
//             background: rgba(255, 255, 255, 0.2);
//             color: white;
//           }
          
//           .search-box::placeholder {
//             color: rgba(255, 255, 255, 0.8);
//           }
          
//           .search-box:focus {
//             background: rgba(255, 255, 255, 0.3);
//             color: white;
//             box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
//           }
          
//           .login-btn {
//             background: white;
//             border: none;
//             border-radius: 20px;
//             padding: 6px 20px;
//             color: #6a11cb;
//             font-weight: 600;
//             transition: all 0.3s;
//           }
          
//           .login-btn:hover {
//             background: #f8f9fa;
//             transform: translateY(-2px);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }
          
//           @media (max-width: 768px) {
//             .custom-marquee {
//               margin-top: 66px;
//               font-size: 14px;
//             }
            
//             .page-title {
//               font-size: 24px;
//             }
//           }
//         `}
//       </style>
      
//       <nav className="navbar navbar-expand-sm navbar-dark custom-navbar">
//         <div className="container-fluid">
//           <img src='image1a.jpg' style={{height:"50px",width:"60px",borderRadius:"25px"}} alt="Logo"/>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="mynavbar">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//               </li>
//               {/* Add more nav items as needed */}
//             </ul>
//             <form className="d-flex">
//               <input
//                 className="form-control me-2 search-box"
//                 type="text"
//                 placeholder="Search products"
//                 value={searchInput}
//                 onChange={handleSearch}
//                 style={{width:"250px",marginLeft:"350px"}}
//               />
//               <Link to={'/login'}><button type='submit' name='submit' className="login-btn">Login</button></Link>
//             </form>
//           </div>
//         </div>
//       </nav>
      
//       <marquee className="custom-marquee" behavior="scroll" direction="left">
//         🎉 Special Offer! Get 20% off on all wedding decorations this season. Visit our store for more details! 🎉
//       </marquee>
//        <h4 className="mb-4" style={{marginLeft:"40px", marginTop:"30px", color:"#2c3e50",}}>Our Products</h4>
//       <div className="content py-3 py-md-5 bg-light">
//         <h2 className="page-title"style={{marginBottom:"1px"}}>ZANZIBAR PLUMBING MAKETING SHOP CENTER</h2>
 
        
//         <div className="container" style={{marginLeft:"200px"}}>
//           <div className="row">
//             <div className="col-md-12">
//             </div>
//           </div>
//           <div className="product-container">
//             <div className="row">
//               {filteredProducts.map((product) => (
//                 <div className="col-md-3 d-flex justify-content-center" key={product.productId}>
//                   <div className="product-card">
//                     <div className="product-card-img">
//                       <label className="stock bg-success">In Stock</label>
//                       <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
//                     </div>
//                     <div className="product-card-body">
//                       <p className="product-brand">{product.brand}</p>
//                       <h5 className="product-name">
//                         <a href="#">{product.productName}</a>
//                       </h5>
//                       <div>
//                         <span className="selling-price">Tsh {product.price.toLocaleString()}</span>
//                         <span className="original-price">{product.originalPrice}</span>
//                       </div>
//                       <div>
//                         <span className="prduct-company">{product.vendorCompany}</span>
//                         <a href="#">{product.productCompany}</a>
                        
//                       </div>
//                       <div className="mt-2">
//                         <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustAdvertise;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const fetchProducts = async (query = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
//       console.log('Fetched products:', response.data);
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };
  
//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts(searchInput);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [searchInput]);
  
//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//     fetchProducts(value);
//   };
  
//   const location = useLocation();
//   useEffect(()=>{
//     if(location.pathname === '/'){
//       localStorage.removeItem('role');
//       localStorage.removeItem('customerId');
//       localStorage.removeItem('vendorId');
//     }
//   },[location]);

//   return (
//     <>
//       <style>
//         {`
//           body {
//             font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//             background-color: #f8f9fa;
//           }
          
//           .custom-navbar {
//             background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%) !important;
//             box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
//             position: fixed;
//             width: 100%;
//             z-index: 1000;
//           }
          
//           .custom-marquee {
//             background: linear-gradient(to right, #ff7e5f, #feb47b);
//             color: white;
//             padding: 10px 0;
//             font-weight: bold;
//             font-size: 18px;
//             margin-top: 76px;
//             box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//           }
          
//           .page-title {
//             text-align: center;
//             margin-top: 30px;
//             color: #2c3e50;
//             font-weight: 700;
//             text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
//             padding: 15px;
//             background: linear-gradient(to right, #6a11cb, #2575fc);
//             -webkit-background-clip: text;
//             -webkit-text-fill-color: transparent;
//           }
          
//           .product-container {
//             padding: 20px 0;
//           }
          
//           .product-card {
//             background: white;
//             border-radius: 12px;
//             overflow: hidden;
//             transition: transform 0.3s, box-shadow 0.3s;
//             box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
//             margin-bottom: 25px;
//             height: auto; /* Changed from 50% to auto for better control */
//           }
          
//           .product-card:hover {
//             transform: translateY(-5px);
//             box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
//           }
          
//           .product-card-img {
//             position: relative;
//             height: 160px; /* Reduced from 200px */
//             overflow: hidden;
//           }
          
//           .product-card-img img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//             transition: transform 0.5s;
//           }
          
//           .product-card:hover .product-card-img img {
//             transform: scale(1.05);
//           }
          
//           .stock {
//             position: absolute;
//             top: 8px; /* Slightly adjusted */
//             right: 8px; /* Slightly adjusted */
//             padding: 4px 8px; /* Reduced padding */
//             border-radius: 20px;
//             font-size: 11px; /* Slightly smaller font */
//             font-weight: bold;
//           }
          
//           .product-card-body {
//             padding: 8px; /* Reduced from 15px */
//           }
          
//           .product-brand {
//             color: #6c757d;
//             font-size: 13px; /* Slightly smaller */
//             margin-bottom: 4px; /* Reduced margin */
//           }
          
//           .product-name a {
//             color: #2c3e50;
//             font-weight: 600;
//             text-decoration: none;
//             transition: color 0.3s;
//             font-size: 15px; /* Added fixed size */
//             line-height: 1.3; /* Added line height */
//             display: -webkit-box;
//             -webkit-line-clamp: 2; /* Limit to 2 lines */
//             -webkit-box-orient: vertical;
//             overflow: hidden;
//           }
          
//           .product-name a:hover {
//             color: #2575fc;
//           }
          
//           .selling-price {
//             font-weight: bold;
//             color: #2c3e50;
//             font-size: 16px; /* Reduced from 18px */
//           }
          
//           .original-price {
//             text-decoration: line-through;
//             color: #6c757d;
//             margin-left: 8px; /* Reduced margin */
//             font-size: 13px; /* Reduced from 14px */
//           }
          
//           .prduct-company {
//             display: block;
//             color: #6c757d;
//             font-size: 12px; /* Reduced from 14px */
//             margin-top: 4px; /* Reduced margin */
//           }
          
//           .btn1 {
//             background: linear-gradient(135deg, #6a11cb 0%, #2575fc 100%);
//             color: white;
//             border: none;
//             border-radius: 50%;
//             width: 32px; /* Slightly smaller */
//             height: 32px; /* Slightly smaller */
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             transition: all 0.3s;
//             font-size: 14px; /* Adjusted icon size */
//           }
          
//           .btn1:hover {
//             transform: scale(1.1);
//             color: white;
//           }
          
//           .search-box {
//             border-radius: 20px;
//             border: 1px solid rgba(255, 255, 255, 0.3);
//             background: rgba(255, 255, 255, 0.2);
//             color: white;
//           }
          
//           .search-box::placeholder {
//             color: rgba(255, 255, 255, 0.8);
//           }
          
//           .search-box:focus {
//             background: rgba(255, 255, 255, 0.3);
//             color: white;
//             box-shadow: 0 0 0 0.2rem rgba(255, 255, 255, 0.25);
//           }
          
//           .login-btn {
//             background: white;
//             border: none;
//             border-radius: 20px;
//             padding: 6px 20px;
//             color: #6a11cb;
//             font-weight: 600;
//             transition: all 0.3s;
//           }
          
//           .login-btn:hover {
//             background: #f8f9fa;
//             transform: translateY(-2px);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }
          
//           @media (max-width: 768px) {
//             .custom-marquee {
//               margin-top: 66px;
//               font-size: 14px;
//             }
            
//             .page-title {
//               font-size: 24px;
//             }
            
//             .product-card-img {
//               height: 140px; /* Adjusted for mobile */
//             }
//           }
//         `}
//       </style>
      
//       <nav className="navbar navbar-expand-sm navbar-dark custom-navbar">
//         <div className="container-fluid">
//           <img src='water.jpg' style={{height:"50px",width:"60px",borderRadius:"25px"}} alt="Logo"/>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="mynavbar">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//               </li>
//             </ul>
//             <form className="d-flex">
//               <input
//                 className="form-control me-2 search-box"
//                 type="text"
//                 placeholder="Search products"
//                 value={searchInput}
//                 onChange={handleSearch}
//                 style={{width:"250px",marginLeft:"350px"}}
//               />
//               <Link to={'/login'}><button type='submit' name='submit' className="login-btn">Login</button></Link>
//             </form>
//           </div>
//         </div>
//       </nav>
      
//       <marquee className="custom-marquee" behavior="scroll" direction="left">
//         🎉 Special Offer! Get 20% off on all wedding decorations this season. Visit our store for more details! 🎉
//       </marquee>
      
//       <h4 className="mb-4" style={{marginLeft:"40px", marginTop:"30px", color:"#2c3e50"}}>Our Products</h4>
      
//       <div className="content py-3 py-md-5 bg-light">
//         <h2 className="page-title" style={{marginBottom:"1px"}}>ZANZIBAR PLUMBING MAKETING SHOP CENTER</h2>
        
//         <div className="container" style={{marginLeft:"200px"}}>
//           <div className="row">
//             <div className="col-md-12">
//             </div>
//           </div>
//           <div className="product-container">
//             <div className="row">
//               {filteredProducts.map((product) => (
//                 <div className="col-md-3 d-flex justify-content-center" key={product.productId}>
//                   <div className="product-card">
//                     <div className="product-card-img">
//                       <label className="stock bg-success">In Stock</label>
//                       <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
//                     </div>
//                     <div className="product-card-body">
//                       <p className="product-brand">{product.brand}</p>
//                       <h5 className="product-name">
//                         <a href="#">{product.productName}</a>
//                       </h5>
//                       <div>
//                         <span className="selling-price">Tsh {product.price.toLocaleString()}</span>
//                         <span className="original-price">{product.originalPrice}</span>
//                       </div>
//                       <div>
//                         <span className="prduct-company">{product.vendorCompany}</span>
//                         <a href="#">{product.productCompany}</a>
//                       </div>
//                       <div className="mt-2">
//                         <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustAdvertise;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Fetch products
//   const fetchProducts = async (query = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts(searchInput);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [searchInput]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//     fetchProducts(value);
//   };

//   // Clear session storage on home route
//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname === '/') {
//       localStorage.removeItem('role');
//       localStorage.removeItem('customerId');
//       localStorage.removeItem('vendorId');
//     }
//   }, [location]);

//   return (
//     <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-sm navbar-dark" 
//         style={{
//           background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//           position: "fixed",
//           width: "100%",
//           zIndex: 1000,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//         }}>
//         <div className="container-fluid">
//           <img src='water.jpg' alt="Logo" style={{ height: "50px", width: "60px", borderRadius: "25px" }} />
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="mynavbar">
//             <form className="d-flex ms-auto">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="🔍 Search products..."
//                 value={searchInput}
//                 onChange={handleSearch}
//                 style={{
//                   borderRadius: "25px",
//                   width: "280px",
//                   border: "1px solid #ddd",
//                   padding: "8px 15px"
//                 }}
//               />
//               <Link to={'/login'}>
//                 <button type="button" className="btn"
//                   style={{
//                     background: "#fff",
//                     color: "#6a11cb",
//                     borderRadius: "25px",
//                     fontWeight: "600",
//                     padding: "6px 20px"
//                   }}>
//                   Login
//                 </button>
//               </Link>
//             </form>
//           </div>
//         </div>
//       </nav>

//       {/* Announcement Bar */}
//       <div style={{
//         marginTop: "70px",
//         background: "linear-gradient(to right, #ff7e5f, #feb47b)",
//         color: "white",
//         padding: "10px",
//         textAlign: "center",
//         fontWeight: "600"
//       }}>
//         🎉 Special Offer! Get 20% off on all wedding decorations this season. 🎉
//       </div>

//       {/* Page Title */}
//       <h2 style={{
//         margin: "30px auto 10px",
//         textAlign: "center",
//         fontSize: "28px",
//         fontWeight: "700",
//         background: "linear-gradient(to right, #6a11cb, #2575fc)",
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent"
//       }}>
//         ZANZIBAR PLUMBING MARKETING SHOP CENTER
//       </h2>

//       {/* Products Section */}
//       <div style={{ padding: "20px 50px" }}>
//         <h4 style={{ marginBottom: "20px", color: "#2c3e50" }}>Our Products</h4>
        
//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//           gap: "25px"
//         }}>
//           {filteredProducts.map((product) => (
//             <div key={product.productId}
//               style={{
//                 background: "white",
//                 borderRadius: "16px",
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//                 overflow: "hidden",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-6px)";
//                 e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
//               }}
//             >
//               {/* Product Image */}
//               <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
//                 <span style={{
//                   position: "absolute", top: "10px", right: "10px",
//                   background: "green", color: "white",
//                   padding: "4px 10px", borderRadius: "12px",
//                   fontSize: "12px", fontWeight: "600"
//                 }}>
//                   In Stock
//                 </span>
//                 <img src={`data:image/jpeg;base64,${product.image}`} 
//                   alt={product.productName}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//               </div>

//               {/* Product Info */}
//               <div style={{ padding: "15px" }}>
//                 <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "5px" }}>
//                   {product.brand}
//                 </p>
//                 <h5 style={{
//                   fontSize: "16px",
//                   fontWeight: "600",
//                   color: "#2c3e50",
//                   marginBottom: "10px",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {product.productName}
//                 </h5>

//                 <div>
//                   <span style={{ fontWeight: "bold", color: "#2c3e50", fontSize: "16px" }}>
//                     Tsh {product.price?.toLocaleString()}
//                   </span>
//                   {product.originalPrice && (
//                     <span style={{ marginLeft: "8px", color: "#6c757d", textDecoration: "line-through", fontSize: "13px" }}>
//                       {product.originalPrice}
//                     </span>
//                   )}
//                 </div>

//                 <p style={{ marginTop: "6px", fontSize: "13px", color: "#6c757d" }}>
//                   {product.vendorCompany}
//                 </p>

//                 <div style={{ marginTop: "12px" }}>
//                   <button className="btn" style={{
//                     background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "50%",
//                     width: "36px",
//                     height: "36px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "14px"
//                   }}>
//                     <i className="fa fa-heart"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredProducts.length === 0 && (
//             <div style={{
//               gridColumn: "1 / -1",
//               textAlign: "center",
//               padding: "40px",
//               color: "#78909c"
//             }}>
//               <div style={{ fontSize: "60px", marginBottom: "15px" }}>🛍️</div>
//               <h3 style={{ marginBottom: "10px", color: "#546e7a" }}>No products found</h3>
//               <p>Try adjusting your search or check back later.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustAdvertise;
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Fetch products
//   const fetchProducts = async (query = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts(searchInput);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [searchInput]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//     fetchProducts(value);
//   };

//   // Clear session storage on home route
//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname === '/') {
//       localStorage.removeItem('role');
//       localStorage.removeItem('customerId');
//       localStorage.removeItem('vendorId');
//     }
//   }, [location]);

//   return (
//     <div style={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-sm navbar-dark"
//         style={{
//           background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//           position: "fixed",
//           width: "100%",
//           zIndex: 1000,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//         }}>
//         <div className="container-fluid">
//           <img src='water.jpg' alt="Logo" style={{ height: "50px",  marginTop:"10px", width: "60px", borderRadius: "25px" }} />
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="mynavbar">
//             <form className="d-flex ms-auto">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="🔍 Search products..."
//                 value={searchInput}
//                 onChange={handleSearch}
//                 style={{
//                   borderRadius: "25px",
//                   width: "280px",
//                   border: "1px solid #ddd",
//                   padding: "8px 15px",
//                   marginLeft:"1200px",
//                   marginTop:"10px"
//                 }}
//               />
//               <Link to={'/login'}>
//                 <button type="button" className="btn"
//                   style={{
//                     background: "#fff",
//                     color: "#6a11cb",
//                     borderRadius: "25px",
//                     fontWeight: "600",
//                     padding: "6px 20px",
//                     marginTop:"10px"
//                   }}>
//                   Login
//                 </button>
//               </Link>
//             </form>
//           </div>
//         </div>
//       </nav>

//       {/* Announcement Bar with Scrolling Effect */}
//       <div style={{
//         marginTop: "70px", // ✅ ensures it shows below navbar
//         background: "linear-gradient(to right, #ff7e5f, #feb47b)",
//         color: "white",
//         padding: "10px 0",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//         position: "relative",
//         fontWeight: "600",
//         boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//       }}>
//         <div style={{
//           display: "inline-block",
//           paddingLeft: "100%",
//           animation: "scroll-left 15s linear infinite"
//         }}>
//           🎉 Special Offer! Get 20% off on all wedding decorations this season. 🎉
//         </div>
//       </div>

//       {/* Keyframes for scrolling */}
//       <style>
//         {`
//           @keyframes scroll-left {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-100%); }
//           }
//         `}
//       </style>

//       {/* Page Title */}
//       <h2 style={{
//         margin: "30px auto 10px",
//         textAlign: "center",
//         fontSize: "28px",
//         fontWeight: "700",
//         overflowY:"hiden",
//         background: "linear-gradient(to right, #6a11cb, #2575fc)",
//         WebkitBackgroundClip: "text",
//         WebkitTextFillColor: "transparent"
//       }}>
//         ZANZIBAR PLUMBING MARKETING SHOP CENTER
//       </h2>

//       {/* Products Section */}
//       <div style={{ padding: "20px 50px" }}>
//         <h4 style={{ marginBottom: "20px", color: "#2c3e50" }}>Our Products</h4>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//           gap: "25px"
//         }}>
//           {filteredProducts.map((product) => (
//             <div key={product.productId}
//               style={{
//                 background: "white",
//                 borderRadius: "16px",
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//                 overflow: "hidden",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-6px)";
//                 e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
//               }}
//             >
//               {/* Product Image */}
//               <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
//                 <span style={{
//                   position: "absolute", top: "10px", right: "10px",
//                   background: "green", color: "white",
//                   padding: "4px 10px", borderRadius: "12px",
//                   fontSize: "12px", fontWeight: "600"
//                 }}>
//                   In Stock
//                 </span>
//                 <img src={`data:image/jpeg;base64,${product.image}`}
//                   alt={product.productName}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//               </div>

//               {/* Product Info */}
//               <div style={{ padding: "15px" }}>
//                 <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "5px" }}>
//                   {product.brand}
//                 </p>
//                 <h5 style={{
//                   fontSize: "16px",
//                   fontWeight: "600",
//                   color: "#2c3e50",
//                   marginBottom: "10px",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {product.productName}
//                 </h5>

//                 <div>
//                   <span style={{ fontWeight: "bold", color: "#2c3e50", fontSize: "16px" }}>
//                     Tsh {product.price?.toLocaleString()}
//                   </span>
//                   {product.originalPrice && (
//                     <span style={{ marginLeft: "8px", color: "#6c757d", textDecoration: "line-through", fontSize: "13px" }}>
//                       {product.originalPrice}
//                     </span>
//                   )}
//                 </div>

//                 <p style={{ marginTop: "6px", fontSize: "13px", color: "#6c757d" }}>
//                   {product.vendorCompany}
//                 </p>

//                 <div style={{ marginTop: "12px" }}>
//                   <button className="btn" style={{
//                     background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "50%",
//                     width: "36px",
//                     height: "36px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "14px"
//                   }}>
//                     <i className="fa fa-heart"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredProducts.length === 0 && (
//             <div style={{
//               gridColumn: "1 / -1",
//               textAlign: "center",
//               padding: "40px",
//               color: "#78909c"
//             }}>
//               <div style={{ fontSize: "60px", marginBottom: "15px" }}>🛍️</div>
//               <h3 style={{ marginBottom: "10px", color: "#546e7a" }}>No products found</h3>
//               <p>Try adjusting your search or check back later.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustAdvertise;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useLocation } from 'react-router-dom';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Fetch products
//   const fetchProducts = async (query = '') => {
//     try {
//       const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts(searchInput);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, [searchInput]);

//   const handleSearch = (e) => {
//     const value = e.target.value.toLowerCase();
//     setSearchInput(value);
//     fetchProducts(value);
//   };

//   // Clear session storage on home route
//   const location = useLocation();
//   useEffect(() => {
//     if (location.pathname === '/') {
//       localStorage.removeItem('role');
//       localStorage.removeItem('customerId');
//       localStorage.removeItem('vendorId');
//     }
//   }, [location]);

//   return (
//     <div style={{ backgroundColor: "#f5f7fa", height: "100vh", overflow: "hidden" }}>
//       {/* Navbar */}
//       <nav className="navbar navbar-expand-sm navbar-dark"
//         style={{
//           background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//           position: "fixed",
//           top: 0,
//           width: "100%",
//           zIndex: 1000,
//           boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
//         }}>
//         <div className="container-fluid">
//           <img src='water.jpg' alt="Logo" style={{ height: "50px", width: "60px", borderRadius: "25px" }} />
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div className="collapse navbar-collapse" id="mynavbar">
//             <form className="d-flex ms-auto">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="🔍 Search products..."
//                 value={searchInput}
//                 onChange={handleSearch}
//                 style={{
//                   borderRadius: "25px",
//                   width: "280px",
//                   border: "1px solid #ddd",
//                   padding: "8px 15px"
//                 }}
//               />
//               <Link to={'/login'}>
//                 <button type="button" className="btn"
//                   style={{
//                     background: "#fff",
//                     color: "#6a11cb",
//                     borderRadius: "25px",
//                     fontWeight: "600",
//                     padding: "6px 20px"
//                   }}>
//                   Login
//                 </button>
//               </Link>
//             </form>
//           </div>
//         </div>
//       </nav>

//       {/* Announcement Bar (fixed under navbar) */}
//       <div style={{
//         position: "fixed",
//         top: "70px", // right below navbar
//         left: 0,
//         right: 0,
//         background: "linear-gradient(to right, #ff7e5f, #feb47b)",
//         color: "white",
//         padding: "10px 0",
//         overflow: "hidden",
//         whiteSpace: "nowrap",
//         textAlign: "center",
//         fontWeight: "600",
//         zIndex: 999,
//         boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
//       }}>
//         <div style={{
//           display: "inline-block",
//           paddingLeft: "100%",
//           animation: "scroll-left 15s linear infinite"
//         }}>
//           🎉 Special Offer! Get 20% off on all wedding decorations this season. 🎉
//         </div>
//       </div>

//       {/* Keyframes for scrolling */}
//       <style>
//         {`
//           @keyframes scroll-left {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-100%); }
//           }
//         `}
//       </style>

//       {/* Scrollable Product Section */}
//       <div style={{
//         position: "absolute",
//         top: "120px", // navbar (70px) + announcement (50px)
//         left: 0,
//         right: 0,
//         bottom: 0,
//         overflowY: "auto",
//         padding: "20px 50px"
//       }}>
//         {/* Page Title */}
//         <h2 style={{
//           margin: "10px auto 20px",
//           textAlign: "center",
//           fontSize: "28px",
//           fontWeight: "700",
//           background: "linear-gradient(to right, #6a11cb, #2575fc)",
//           WebkitBackgroundClip: "text",
//           WebkitTextFillColor: "transparent"
//         }}>
//           ZANZIBAR PLUMBING MARKETING SHOP CENTER
//         </h2>

//         {/* Products Section */}
//         <h4 style={{ marginBottom: "20px", color: "#2c3e50" }}>Our Products</h4>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
//           gap: "25px"
//         }}>
//           {filteredProducts.map((product) => (
//             <div key={product.productId}
//               style={{
//                 background: "white",
//                 borderRadius: "16px",
//                 boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
//                 overflow: "hidden",
//                 transition: "transform 0.3s ease, box-shadow 0.3s ease"
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.transform = "translateY(-6px)";
//                 e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.transform = "translateY(0)";
//                 e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
//               }}
//             >
//               {/* Product Image */}
//               <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
//                 <span style={{
//                   position: "absolute", top: "10px", right: "10px",
//                   background: "green", color: "white",
//                   padding: "4px 10px", borderRadius: "12px",
//                   fontSize: "12px", fontWeight: "600"
//                 }}>
//                   In Stock
//                 </span>
//                 <img src={`data:image/jpeg;base64,${product.image}`}
//                   alt={product.productName}
//                   style={{ width: "100%", height: "100%", objectFit: "cover" }} />
//               </div>

//               {/* Product Info */}
//               <div style={{ padding: "15px" }}>
//                 <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "5px" }}>
//                   {product.brand}
//                 </p>
//                 <h5 style={{
//                   fontSize: "16px",
//                   fontWeight: "600",
//                   color: "#2c3e50",
//                   marginBottom: "10px",
//                   overflow: "hidden",
//                   textOverflow: "ellipsis",
//                   whiteSpace: "nowrap"
//                 }}>
//                   {product.productName}
//                 </h5>

//                 <div>
//                   <span style={{ fontWeight: "bold", color: "#2c3e50", fontSize: "16px" }}>
//                     Tsh {product.price?.toLocaleString()}
//                   </span>
//                   {product.originalPrice && (
//                     <span style={{ marginLeft: "8px", color: "#6c757d", textDecoration: "line-through", fontSize: "13px" }}>
//                       {product.originalPrice}
//                     </span>
//                   )}
//                 </div>

//                 <p style={{ marginTop: "6px", fontSize: "13px", color: "#6c757d" }}>
//                   {product.vendorCompany}
//                 </p>

//                 <div style={{ marginTop: "12px" }}>
//                   <button className="btn" style={{
//                     background: "linear-gradient(135deg, #6a11cb, #2575fc)",
//                     color: "white",
//                     border: "none",
//                     borderRadius: "50%",
//                     width: "36px",
//                     height: "36px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     fontSize: "14px"
//                   }}>
//                     <i className="fa fa-heart"></i>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}

//           {filteredProducts.length === 0 && (
//             <div style={{
//               gridColumn: "1 / -1",
//               textAlign: "center",
//               padding: "40px",
//               color: "#78909c"
//             }}>
//               <div style={{ fontSize: "60px", marginBottom: "15px" }}>🛍️</div>
//               <h3 style={{ marginBottom: "10px", color: "#546e7a" }}>No products found</h3>
//               <p>Try adjusting your search or check back later.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CustAdvertise;
import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

const CustAdvertise = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products
  const fetchProducts = async (query = '') => {
    try {
      const response = await axios.get(`http://localhost:8080/api/product/search?query=${query}`);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      fetchProducts(searchInput);
    }, 5000);
    return () => clearInterval(interval);
  }, [searchInput]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchInput(value);
    fetchProducts(value);
  };

  // Clear session storage on home route
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      localStorage.removeItem('role');
      localStorage.removeItem('customerId');
      localStorage.removeItem('vendorId');
    }
  }, [location]);

  return (
    <div style={{ backgroundColor: "#f5f7fa", height: "100vh", overflow: "hidden" }}>
      {/* Navbar */}
      <nav className="navbar navbar-expand-sm navbar-dark"
        style={{
          background: "linear-gradient(135deg, #6a11cb, #2575fc)",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 1000,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}>
        <div className="container-fluid">
          <img src='water.jpg' alt="Logo" style={{ height: "50px", width: "60px", borderRadius: "25px" }} />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mynavbar">
            <form className="d-flex ms-auto">
              <input
                className="form-control me-2"
                type="text"
                placeholder="🔍 Search products..."
                value={searchInput}
                onChange={handleSearch}
                style={{
                  borderRadius: "25px",
                  width: "280px",
                  border: "1px solid #ddd",
                  padding: "8px 15px",
                  marginLeft:"1290px"
                }}
              />
              <Link to={'/login'}>
                <button type="button" className="btn"
                  style={{
                    background: "#fff",
                    color: "#6a11cb",
                    borderRadius: "25px",
                    fontWeight: "600",
                    padding: "6px 20px"
                  }}>
                  Login
                </button>
              </Link>
            </form>
          </div>
        </div>
      </nav>

      {/* Announcement Bar (scrolls) */}
      <div style={{
        position: "fixed",
        top: "70px", // right below navbar
        left: 0,
        right: 0,
        background: "linear-gradient(to right, #ff7e5f, #feb47b)",
        color: "white",
        padding: "10px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textAlign: "center",
        fontWeight: "600",
        zIndex: 999,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}>
        <div style={{
          display: "inline-block",
          paddingLeft: "100%",
          color:"green",
          animation: "scroll-left 15s linear infinite"
        }}>
          🎉  ZANZIBAR PLUMBING MARKETING SHOP CENTER. 🎉
        </div>
      </div>

      {/* Keyframes for announcement scroll */}
      <style>
        {`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      {/* Scrollable Product Section */}
      <div style={{
        position: "absolute",
        top: "120px", // navbar (70px) + announcement (50px)
        left: 0,
        right: 0,
        bottom: 0,
        overflowY: "auto",
        padding: "20px 50px"
      }}>
        {/* Static Page Title */}
       {/* Fixed Page Title */}
{/* <h2 style={{
  position: "fixed",
  top: "115px",   // navbar (70px) + announcement (50px)
  left: "50%",
  marginTop:"15px",
  transform: "translateX(-50%)",
  zIndex: 998,
  fontSize: "28px",
  fontWeight: "700",
  background: "linear-gradient(to right, #f2f1f3ff, #2575fc)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  margin: 0,
  padding: "10px 0",
  textAlign: "center"
}}>
 
</h2> */}

{/* Fixed Subtitle */}
<h4 style={{
  position: "fixed",
  top: "120px",   // right under the main heading
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 998,
  margin: 0,
  padding: "5px 0",
  color: "#2c3e50",
  backgroundColor: "#f5f7fa"
}}>
  Our Products
</h4>


        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "25px"
        }}>
          {filteredProducts.map((product) => (
            <div key={product.productId}
              style={{
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                overflow: "hidden",
                transition: "transform 0.3s ease, box-shadow 0.3s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.08)";
              }}
            >
              {/* Product Image */}
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <span style={{
                  position: "absolute", top: "10px", right: "10px",
                  background: "green", color: "white",
                  padding: "4px 10px", borderRadius: "12px",
                  fontSize: "12px", fontWeight: "600"
                }}>
                  In Stock
                </span>
                <img src={`data:image/jpeg;base64,${product.image}`}
                  alt={product.productName}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>

              {/* Product Info */}
              <div style={{ padding: "15px" }}>
                <p style={{ fontSize: "13px", color: "#6c757d", marginBottom: "5px" }}>
                  {product.brand}
                </p>
                <h5 style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#2c3e50",
                  marginBottom: "10px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}>
                  {product.productName}
                </h5>

                <div>
                  <span style={{ fontWeight: "bold", color: "#2c3e50", fontSize: "16px" }}>
                    Tsh {product.price?.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span style={{ marginLeft: "8px", color: "#6c757d", textDecoration: "line-through", fontSize: "13px" }}>
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <p style={{ marginTop: "6px", fontSize: "13px", color: "#6c757d" }}>
                  {product.vendorCompany}
                </p>

                <div style={{ marginTop: "12px" }}>
                  <button className="btn" style={{
                    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px"
                  }}>
                    <i className="fa fa-heart"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredProducts.length === 0 && (
            <div style={{
              gridColumn: "1 / -1",
              textAlign: "center",
              padding: "40px",
              color: "#78909c"
            }}>
              <div style={{ fontSize: "60px", marginBottom: "15px" }}>🛍️</div>
              <h3 style={{ marginBottom: "10px", color: "#546e7a" }}>No products found</h3>
              <p>Try adjusting your search or check back later.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustAdvertise;

