import React, { useEffect, useState } from 'react'
import Navigation from '../navigation/Navigation'
import axios from 'axios';

const AdminDashboar = () => {
  const [countOrder, setCountOrder] = useState(0);

  useEffect(()=>{
    axios.get('http://localhost:8080/api/orders/count')
    .then((response)=>{
        setCountOrder(response.data);
    })
 } )

  const [acceptedOrder, setAcceptedOrder] = useState(0);
   
  useEffect(()=>{
    axios.get("http://localhost:8080/api/orders/count")
    .then((response)=>{
      setAcceptedOrder(response.data);
    })
  
  })

   const [cenceledOrder, setCenceledOrder] = useState(0);

    useEffect(()=>{
      axios.get('http://localhost:8080/api/orders/count')
      .then((response)=>{
        setCenceledOrder(response.data)
      })
    })

     const [totalPayment, setTotalPayment] = useState(0);
      
     useEffect(()=>{
      axios.get('http://localhost:8080/api/orders/count')
      .then((response)=>{
        setTotalPayment(response.data);
      })
     })
  return (
    <><Navigation />
    <div className='main'>
        <p>AdminDashboard</p>
        
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
      <p>total payment</p>
    </div>
  </div>
</div>
      </div></>
  )
}

export default AdminDashboar
