// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   // Function to fetch all products
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/product/get/product'); // Update with your API URL
//       setProducts(response.data);
//       setFilteredProducts(response.data); // Init filtered list to all products
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   // Effect to fetch the products initially and set up polling
//   useEffect(() => {
//     fetchProducts(); // Fetch products initially

//     // Set up polling to fetch products every 5 seconds
//     const interval = setInterval(() => {
//       fetchProducts();
//     }, 5000);

//     // Clear the interval if the component unmounts
//     return () => clearInterval(interval);
//   }, []);

//   // Function to handle search input
//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     if (value) {
//       const filtered = products.filter(product => 
//         product.productName.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products); // Reset to original if input is cleared
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Logo</a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="mynavbar">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Link</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Link</a>
//               </li>
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Link</a>
//               </li>
//             </ul>
//             <form className="d-flex">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="Search"
//                 value={searchInput}
//                 onChange={handleSearch} // Changed to handleSearch directly
//               />
//             </form>
//           </div>
//         </div>
//       </nav>

//       <div className="content py-3 py-md-5 bg-light">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="mb-4">Our Products</h4>
//             </div>
//             {filteredProducts.map((product) => (
//               <div className="col-md-3" key={product.productId}>
//                 <div className="product-card">
//                   <div className="product-card-img">
//                     <label className="stock bg-success">In Stock</label>
//                     <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
//                   </div>
//                   <div className="product-card-body">
//                     <p className="product-brand">{product.brand}</p>
//                     <h5 className="product-name">
//                       <a href="#">{product.productName}</a>
//                     </h5>
//                     <div>
//                       <span className="selling-price">{product.price}</span>
//                       <span className="original-price">{product.originalPrice}</span>
//                     </div>
//                     <div className="mt-2">
//                       <a href="#" className="btn btn1">Add To Cart</a>
//                       <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
//                       <a href="#" className="btn btn1">View</a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustAdvertise;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';


// const CustAdvertise = () => {
//   const [products, setProducts] = useState([]);
//   const [searchInput, setSearchInput] = useState('');
//   const [filteredProducts, setFilteredProducts] = useState([]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/product/get/product');
//       setProducts(response.data);
//       setFilteredProducts(response.data);
//     } catch (error) {
//       console.error("Error fetching products", error);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(() => {
//       fetchProducts();
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleSearch = (e) => {
//     const value = e.target.value;
//     setSearchInput(value);
//     if (value) {
//       const filtered = products.filter(product =>
//         product.productName.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//     } else {
//       setFilteredProducts(products);
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
//         <div className="container-fluid">
//           <a className="navbar-brand" href="#">Logo</a>
//           <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="mynavbar">
//             <ul className="navbar-nav me-auto">
//               <li className="nav-item">
//                 <a className="nav-link" href="#">Link</a>
//               </li>
//               {/* Add more nav items as needed */}
//             </ul>
//             <form className="d-flex">
//               <input
//                 className="form-control me-2"
//                 type="text"
//                 placeholder="Search"
//                 value={searchInput}
//                 onChange={handleSearch}
//               />
//             </form>
//           </div>
//         </div>
//       </nav>

//       <div className="content py-3 py-md-5 bg-light">
//         <div className="container">
//           <div className="row">
//             <div className="col-md-12">
//               <h4 className="mb-4">Our Products</h4>
//             </div>
//           </div>
//           <div className="product-container"> {/* Added scrollable container */}
//             <div className="row">
//               {filteredProducts.map((product) => (
//                 <div className="col-md-3" key={product.productId}>
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
//                         <span className="selling-price">{product.price}</span>
//                         <span className="original-price">{product.originalPrice}</span>
//                       </div>
//                       <div className="mt-2">
//                         <a href="#" className="btn btn1">Add To Cart</a>
//                         <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
//                         <a href="#" className="btn btn1">View</a>
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


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CustAdvertise = () => {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/product/get/product');
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    const interval = setInterval(() => {
      fetchProducts();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    if (value) {
      const filtered = products.filter(product =>
        product.productName.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="container-fluid">
          <img src='image1a.jpg' style={{height:"50px",width:"60px",borderRadius:"25px"}}/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mynavbar">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
              </li>
              {/* Add more nav items as needed */}
            </ul>
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="text"
                placeholder="Search products"
                value={searchInput}
                onChange={handleSearch}
                style={{width:"250px",marginLeft:"350px"}}
              />
              <Link to={'/login'}><button type='submit'name='submit' style={{backgroundColor:"green",borderRadius:"6px",marginLeft:"20px"}}>Login</button></Link>
            </form>
          </div>
        </div>
      </nav>
      

      <div className="content py-3 py-md-5 bg-light">
      <h4 className="mb-4" style={{textAlign:"center"}}>ZANZIBAR CHLOTHING HUB AND DECORATION CENTER</h4>
      <h4 className="mb-4" style={{textAlign:"center"}}>Our Products</h4>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
         
            </div>
          </div>
          <div className="product-container">
            <div className="row">
              {filteredProducts.map((product) => (
                <div className="col-md-3 d-flex justify-content-center" key={product.productId}>
                  <div className="product-card">
                    <div className="product-card-img">
                      <label className="stock bg-success">In Stock</label>
                      <img src={`data:image/jpeg;base64,${product.image}`} alt={product.productName} />
                    </div>
                    <div className="product-card-body">
                      <p className="product-brand">{product.brand}</p>
                      <h5 className="product-name">
                        <a href="#">{product.productName}</a>
                      </h5>
                      <div>
                        <span className="selling-price">{product.price}</span>
                        <span className="original-price">{product.originalPrice}</span>
                      </div>
                      <div className="mt-2">
                        <a href="#" className="btn btn1"><i className="fa fa-heart"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustAdvertise;