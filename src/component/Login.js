// // import { useLocation, useNavigate } from 'react-router-dom';
// // import React, { useEffect, useState } from 'react';
// // import axios from 'axios';
// // import { Link } from 'react-router-dom';

// // const Login = () => {
// //   const [email, setemail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');

// //   const navigate = useNavigate();



// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.get(`http://localhost:8080/api/users/login/${email}`);
// //       console.log(response.data.email);
// //       // Handle successful login here

// //       if(email === response.data.email && password === response.data.password){
// //         // alert("Ubaya Ubwela")

// //         if(response.data.role === "CUSTOMER"){
// //           localStorage.setItem("role", response.data.role );

// //           localStorage.setItem("customerId", response.data.userId);
// //           alert("Customer login successsfully");
// //           navigate('/customer-dashboard')
// //         }

// //         if(response.data.role === "VENDOR"){
// //           localStorage.setItem("role", response.data.role );
// //           localStorage.setItem("customerId", response.data.userId);

// //           alert("Hi VENDOR");
// //           navigate('/vendor-dashboard')
// //         }

// //         if(response.data.role === "ADMIN"){
// //           localStorage.setItem("role", response.data.role );
// //           alert("Hi Admin");
// //           navigate('/admin-dashboard')
// //         }

// //       }else{
// //         alert("Umekosea")
// //       }

// //     } catch (error) {
// //       setError('Invalid email or password');
// //     }
// //   }

// //   return (
// //     <div className="login-container" style={{backgroundColor:"white"}}>
// //       <div className="login-form">
// //                <h1 style={{textAlign:"center",width:"120px",marginLeft:"125px",color:"tan"}}>LOGIN</h1>
// //       <img src='pump.jpg' style={{width:"90px",height:"90px",borderRadius:"20px",marginTop:"0px",borderRadius:"50px",marginLeft:"140px"}}/>
// //         {/* <h1 style={{textAlign:"center",backgroundColor:"lightgrey",borderRadius:"100px",width:"120px",marginLeft:"130px"}}>Login</h1> */}
// //         <form onSubmit={handleSubmit}>
// //           <label>Email:</label>
// //           <input 
// //             type="email" 
// //             value={email}
// //             onChange={(e) => setemail(e.target.value)}
// //           />
// //           <br />
// //           <label>Password:</label>
// //           <input 
// //             type="password"
// //             value={password}
// //             onChange={(e) => setPassword(e.target.value)}
// //           />
// //           <br />
// //           <input  type="submit" value="Login" className='new' style={{width:"360px",backgroundColor:"lightgrey",color:"black",borderBlockColor:"black"}}/><br></br><br></br>
// //         </form>
// //         {error && <div className="error-message">{error}</div>}
// //         <Link to="/registerform">
// //           <input type="button" value="create account"style={{width:"360px",backgroundColor:"dackblack",borderRadius:"5px"}} /><br /><br />
// //         </Link>
      
      
        

// //       </div>
// //     </div>
// //   );
// // };

// // export default Login;



// // // import { useNavigate } from 'react-router-dom';
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { Link } from 'react-router-dom';

// // // const Login = () => {
// // //   const [email, setemail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [error, setError] = useState('');

// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const response = await axios.get(`http://localhost:8080/api/users/login/${email}`);
// // //       console.log(response.data.email);
// // //       // Handle successful login here

// // //       if(email === response.data.email && password === response.data.password){
// // //         // alert("Ubaya Ubwela")

// // //         if(response.data.role === "CUSTOMER"){
// // //           localStorage.setItem("role", response.data.role );
// // //           localStorage.setItem("customerId", response.data.userId);
// // //           alert("Hi Customer");
// // //           navigate('/customer-dashboard')
// // //         }

// // //         if(response.data.role === "VENDOR"){
// // //           const vendorResponse = await axios.get(`http://localhost:8080/api/vendors/${response.data.userId}`);
// // //           if(vendorResponse.data.blocked) {
// // //             setError('Your account is blocked. Please contact the administrator.');
// // //             return;
// // //           }
// // //           localStorage.setItem("role", response.data.role );
// // //           alert("Hi VENDOR");
// // //           navigate('/vendor-dashboard')
// // //         }

// // //         if(response.data.role === "ADMIN"){
// // //           localStorage.setItem("role", response.data.role );
// // //           alert("Hi Admin");
// // //           navigate('/admin-dashboard')
// // //         }

// // //       }else{
// // //         alert("Umekosea")
// // //       }

// // //     } catch (error) {
// // //       setError('Invalid email or password');
// // //     }
// // //   }

// // //   return (
// // //     <div className="login-container" style={{backgroundColor:"white"}}>
// // //       <div className="login-form">
// // //                <h1 style={{textAlign:"center",width:"120px",marginLeft:"125px",color:"tan"}}>LOGIN</h1>
// // //       <img src='images11.jpg' style={{width:"90px",height:"90px",borderRadius:"20px",marginTop:"0px",borderRadius:"50px",marginLeft:"140px"}}/>
// // //         {/* <h1 style={{textAlign:"center",backgroundColor:"lightgrey",borderRadius:"100px",width:"120px",marginLeft:"130px"}}>Login</h1> */}
// // //         <form onSubmit={handleSubmit}>
// // //           <label>Email:</label>
// // //           <input 
// // //             type="email" 
// // //             value={email}
// // //             onChange={(e) => setemail(e.target.value)}
// // //           />
// // //           <br />
// // //           <label>Password:</label>
// // //           <input 
// // //             type="password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //           />
// // //           <br />
// // //           <input  type="submit" value="Login" className='new' style={{width:"360px",backgroundColor:"lightgrey",color:"black",borderBlockColor:"black"}}/><br></br><br></br>
// // //         </form>
// // //         {error && <div className="error-message">{error}</div>}
// // //         <Link to="/registerform">
// // //           <input type="button" value="create account"style={{width:"360px",backgroundColor:"dackblack",borderRadius:"5px"}} /><br /><br />
// // //         </Link>
      
      
        

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// // // import { useNavigate } from 'react-router-dom';
// // // import React, { useEffect, useState } from 'react';
// // // import axios from 'axios';
// // // import { Link } from 'react-router-dom';

// // // const Login = () => {
// // //   const [email, setemail] = useState('');
// // //   const [password, setPassword] = useState('');
// // //   const [error, setError] = useState('');

// // //   const navigate = useNavigate();

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();

// // //     try {
// // //       const response = await axios.get(`http://localhost:8080/api/users/login/${email}`);
// // //       console.log(response.data.email);
// // //       // Handle successful login here

// // //       if(email === response.data.email && password === response.data.password){
// // //         // alert("Ubaya Ubwela")

// // //         if(response.data.role === "CUSTOMER"){
// // //           localStorage.setItem("role", response.data.role );
// // //           localStorage.setItem("customerId", response.data.userId);
// // //           alert("Hi Customer");
// // //           navigate('/customer-dashboard')
// // //         }

// // //         if(response.data.role === "VENDOR"){
// // //           const vendorResponse = await axios.get(`http://localhost:8080/api/vendors/${response.data.userId}`);
// // //           if(vendorResponse.data.status === 'BLOCKED') {
// // //             setError('Your account is blocked. Please contact the administrator.');
// // //             return;
// // //           }
// // //           localStorage.setItem("role", response.data.role );
// // //           alert("Hi VENDOR");
// // //           navigate('/vendor-dashboard')
// // //         }

// // //         if(response.data.role === "ADMIN"){
// // //           localStorage.setItem("role", response.data.role );
// // //           alert("Hi Admin");
// // //           navigate('/admin-dashboard')
// // //         }

// // //       }else{
// // //         alert("Umekosea")
// // //       }

// // //     } catch (error) {
// // //       setError('Invalid email or password');
// // //     }
// // //   }

// // //   return (
// // //     <div className="login-container" style={{backgroundColor:"white"}}>
// // //       <div className="login-form">
// // //                <h1 style={{textAlign:"center",width:"120px",marginLeft:"125px",color:"tan"}}>LOGIN</h1>
// // //       <img src='images11.jpg' style={{width:"90px",height:"90px",borderRadius:"20px",marginTop:"0px",borderRadius:"50px",marginLeft:"140px"}}/>
// // //         {/* <h1 style={{textAlign:"center",backgroundColor:"lightgrey",borderRadius:"100px",width:"120px",marginLeft:"130px"}}>Login</h1> */}
// // //         <form onSubmit={handleSubmit}>
// // //           <label>Email:</label>
// // //           <input 
// // //             type="email" 
// // //             value={email}
// // //             onChange={(e) => setemail(e.target.value)}
// // //           />
// // //           <br />
// // //           <label>Password:</label>
// // //           <input 
// // //             type="password"
// // //             value={password}
// // //             onChange={(e) => setPassword(e.target.value)}
// // //           />
// // //           <br />
// // //           <input  type="submit" value="Login" className='new' style={{width:"360px",backgroundColor:"lightgrey",color:"black",borderBlockColor:"black"}}/><br></br><br></br>
// // //         </form>
// // //         {error && <div className="error-message">{error}</div>}
// // //         <Link to="/registerform">
// // //           <input type="button" value="create account"style={{width:"360px",backgroundColor:"dackblack",borderRadius:"5px"}} /><br /><br />
// // //         </Link>
      
      
        

// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Login;

// import { useNavigate } from 'react-router-dom';
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Login = () => {
//   const [email, setemail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Use relative URL so that the proxy in package.json will forward to the backend
//       const response = await axios.get(`/api/users/login/${email}`);
//       console.log(response.data);

//       // Check if the response contains the user data
//       if (email === response.data.email && password === response.data.password) {
//         // Based on role, navigate to respective dashboard
//         if (response.data.role === "CUSTOMER") {
//           localStorage.setItem("role", response.data.role);
//           localStorage.setItem("customerId", response.data.userId);
//           alert("Customer login successfully");
//           navigate('/customer-dashboard');
//         } else if (response.data.role === "VENDOR") {
//           localStorage.setItem("role", response.data.role);
//           localStorage.setItem("customerId", response.data.userId);
//           alert("Hi VENDOR");
//           navigate('/vendor-dashboard');
//         } else if (response.data.role === "ADMIN") {
//           localStorage.setItem("role", response.data.role);
//           alert("Hi Admin");
//           navigate('/admin-dashboard');
//         }
//       } else {
//         alert("Invalid credentials");
//       }

//     } catch (error) {
//       console.error('Login error:', error);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setError('Invalid email or password');
//       } else if (error.request) {
//         // The request was made but no response was received
//         setError('Cannot connect to server. Please check your network and make sure the backend is running.');
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setError('An error occurred. Please try again.');
//       }
//     }
//   }

//   return (
//     <div className="login-container" style={{backgroundColor:"white"}}>
//       <div className="login-form">
//         <h1 style={{textAlign:"center",width:"120px",marginLeft:"125px",color:"tan"}}>LOGIN</h1>
//         <img src='pump.jpg' style={{width:"90px",height:"90px",borderRadius:"20px",marginTop:"0px",borderRadius:"50px",marginLeft:"140px"}} alt="Login" />
//         <form onSubmit={handleSubmit}>
//           <label>Email:</label>
//           <input 
//             type="email" 
//             value={email}
//             onChange={(e) => setemail(e.target.value)}
//           />
//           <br />
//           <label>Password:</label>
//           <input 
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <br />
//           <input type="submit" value="Login" className='new' style={{width:"360px",backgroundColor:"lightgrey",color:"black",borderBlockColor:"black"}}/><br></br><br></br>
//         </form>
//         {error && <div className="error-message">{error}</div>}
//         <Link to="/registerform">
//           <input type="button" value="create account" style={{width:"360px",backgroundColor:"dackblack",borderRadius:"5px"}} /><br /><br />
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Login;

import { useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/users/login', {
        email: email,
        password: password
      });
      
      console.log(response.data);
      
      // Handle successful login here
      if(response.data){
        const user = response.data;

        if(user.role === "CUSTOMER"){
          localStorage.setItem("role", user.role);
          localStorage.setItem("customerId", user.userId);
          alert("Customer login successfully");
          navigate('/customer-dashboard')
        }

        if(user.role === "VENDOR"){
          localStorage.setItem("role", user.role);
          localStorage.setItem("vendorId", user.userId);
          alert("Hi VENDOR");
          navigate('/vendor-dashboard')
        }

        if(user.role === "ADMIN"){
          localStorage.setItem("role", user.role);
          alert("Hi Admin");
          navigate('/admin-dashboard')
        }

      } else {
        alert("Invalid credentials")
      }

    } catch (error) {
      console.error('Login error:', error);
      if (error.code === 'ERR_NETWORK' || error.message.includes('Connection timed out')) {
        setError('Cannot connect to server. Please make sure the backend is running.');
      } else {
        setError('Invalid email or password');
      }
    }
  }

  return (
    <div className="login-container" style={{backgroundColor:"white"}}>
      <div className="login-form">
        <h1 style={{textAlign:"center",width:"120px",marginLeft:"125px",color:"tan"}}>LOGIN</h1>
        <img src='pump.jpg' style={{width:"90px",height:"90px",borderRadius:"20px",marginTop:"0px",borderRadius:"50px",marginLeft:"140px"}}/>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setemail(e.target.value)}
            autoComplete="off"
          />
          <br />
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"  // This prevents autofill
          />
          <br />
          <input 
            type="submit" 
            value="Login" 
            className='new' 
            style={{width:"360px",backgroundColor:"lightgrey",color:"black",borderBlockColor:"black"}}
          />
          <br></br><br></br>
        </form>
        {error && <div className="error-message">{error}</div>}
        <Link to="/registerform">
          <input type="button" value="create account" style={{width:"360px",backgroundColor:"dackblack",borderRadius:"5px"}} /><br /><br />
        </Link>
      </div>
    </div>
  );
};

export default Login;