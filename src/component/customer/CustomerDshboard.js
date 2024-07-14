import React from 'react'
import Navigation from '../navigation/Navigation'

const CustomerDshboard = () => {
  return (
    <><Navigation />
    <div className='main'>
        <p>CustomerDshboard</p>
        
        <div class="row" style={{marginLeft:"5px"}}>
  <div class="column">
    <div class="card">
      <p><i class="fa fa-user"></i></p>
      <h3>11+</h3>
      <p>Partners</p>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <p><i class="fa fa-check"></i></p>
      <h3>55+</h3>
      <p>Projects</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <p><i class="fa fa-smile-o"></i></p>
      <h3>100+</h3>
      <p>Happy Clients</p>
    </div>
  </div>
  
  <div class="column">
    <div class="card">
      <p><i class="fa fa-coffee"></i></p>
      <h3>100+</h3>
      <p>Meetings</p>
    </div>
  </div>
</div>
      </div></>
  )
}

export default CustomerDshboard
