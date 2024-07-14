import React from 'react'
import Navigation from '../navigation/Navigation'

const MakeOrder = () => {
  return (
    <><Navigation /><div className='main'>
          <h1>Customer MakeOrder Page</h1>
          <form action="/submit" method="post">
            <div class="form-row">
                <div class="form-group">
                    <label for="orderId">Order ID:</label>
                    <input type="number" id="orderId" name="orderId" required/>
                </div>
                <div class="form-group">
                    <label for="name">Order Name:</label>
                    <input type="text" id="name" name="name" required/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="totalAmount">Total Amount:</label>
                    <input type="number" id="totalAmount" name="totalAmount" step="0.01" required/>
                </div>
                <div class="form-group">
                    <label for="date">Date:</label>
                    <input type="date" id="date" name="date" required/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="status">Status:</label>
                    <input type="text" id="status" name="status"/>
                </div>
                <div class="form-group">
                    <label for="quantity">Quantity:</label>
                    <input type="text" id="quantity" name="quantity"/>
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Submit"/>
            </div>
        </form>
 

      </div></>
  )
}

export default MakeOrder
