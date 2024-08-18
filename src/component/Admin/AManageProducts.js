import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddCustomers = () => {
  const [email, setemail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`http://localhost:8080/api/users/login/${email}`);
      console.log(response.data.email);
      // Handle successful login here

      if(email === response.data.email && password === response.data.password){
        // alert("Ubaya Ubwela")

        if(response.data.role === "CUSTOMER"){
          localStorage.setItem("role", response.data.role );

          localStorage.setItem("customerId", response.data.userId);
          alert("Hi Customer");
          navigate('/customer-dashboard')
        }

        if(response.data.role === "VENDOR"){
          localStorage.setItem("role", response.data.role );
          alert("Hi VENDOR");
          navigate('/vendor-dashboard')
        }

        if(response.data.role === "ADMIN"){
          localStorage.setItem("role", response.data.role );
          alert("Hi Admin");
          navigate('/admin-dashboard')
        }

      }else{
        alert("Umekosea")
      }

    } catch (error) {
      setError('Invalid email or password');
    }
  }

  return (
    <div className="login-container" style={{backgroundColor:"white"}}>
      <div className="login-form">
               <h1 style={{textAlign:"center",width:"120px",marginLeft:"125px",color:"tan"}}>LOGIN</h1>
      <img src='images11.jpg' style={{width:"90px",height:"90px",borderRadius:"20px",marginTop:"0px",borderRadius:"50px",marginLeft:"140px"}}/>
        {/* <h1 style={{textAlign:"center",backgroundColor:"lightgrey",borderRadius:"100px",width:"120px",marginLeft:"130px"}}>Login</h1> */}
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <br />
          <label>Password:</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input  type="submit" value="Login" className='new' style={{width:"360px",backgroundColor:"lightgrey",color:"black",borderBlockColor:"black"}}/><br></br><br></br>
        </form>
        {error && <div className="error-message">{error}</div>}
        <Link to="/registerform">
          <input type="button" value="create account"style={{width:"360px",backgroundColor:"dackblack",borderRadius:"5px"}} /><br /><br />
        </Link>
      
      
        

      </div>
    </div>
  );
};

export default AddCustomers;