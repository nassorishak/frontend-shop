import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';



const VendorDashboard = () => {
     const [countOrder,setCountOrder] = useState(0);
     
     useEffect(()=>{
      axios.get('http://localhost:8080/api/vendor/count')
      .then(((Response)=>{
        setCountOrder(Response.data);
      }))
     })

     const [acceptedOrder, setAcceptedOrder] = useState(0);

      useEffect(()=>{
        axios.get('http://localhost:8080/api/vendor/count')
        .then((Response)=>{
          setAcceptedOrder(Response.data);
        })
      })

      const [cenceledOrder, setCenceledOrder] = useState(0);
       
       useEffect(()=>{
        axios.get('http://localhost:8080/api/vendor/count')
         .then((Response)=>{
          setCenceledOrder(Response.data);
         })
       })

        const [totalPayment, setTotalPayment] = useState(0);

         useEffect(()=>{
          axios.get('http://localhost:8080/api/vendor/count')
           .then((Response)=>{
            setTotalPayment(Response.data);
           })
         })
  return (
    <><Navigation />
    <div className='main'>
        <h1 style={{textAlign:"center",backgroundColor:"grey", width:"1019px",marginLeft:"10px",marginRight:"300px"}}>Vendor Dashboard</h1>
        <div class="row" style={{marginLeft:"5px"}}>
  <div class="column">
    <div class="card">
      <p><i class="fa fa-user"></i></p>
      <h3>{countOrder}</h3>
      <p>Order</p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <p><i class="fa fa-check"></i></p>
      <h3>{acceptedOrder}</h3>
      <p>accepted order</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <p><i class="fa fa-smile-o"></i></p>
      <h3>{cenceledOrder}</h3>
      <p>cenceled order</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <p><i class="fa fa-coffee"></i></p>
      <h3>{totalPayment}</h3>
      <p>totalPayment</p>
    </div>
  </div>
</div>
    </div></>
  );
};

export default VendorDashboard;
