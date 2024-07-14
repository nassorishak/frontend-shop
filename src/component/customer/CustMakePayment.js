import React from 'react'
import Navigation from '../navigation/Navigation'

const CustMakePayment = () => {
  return (
    <><Navigation/>
    <div className='main'>
        <h1>Customer payment Page</h1>
        <form action="/submit" method="post">
            <div class="form-row">
                <div class="form-group">
                    <label for="paymentId">Payment ID:</label>
                    <input type="number" id="paymentId" name="paymentId" required/>
                </div>
                <div class="form-group">
                    <label for="amount">Amount:</label>
                    <input type="number" id="amount" name="amount" step="0.01" required/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="paymentMethod">Payment Method:</label>
                    <input type="text" id="paymentMethod" name="paymentMethod"/>
                </div>
                <div class="form-group">
                    <label for="status">Status:</label>
                    <input type="text" id="status" name="status"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="orderId">Order ID:</label>
                    <input type="number" id="orderId" name="orderId" required/>
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Submit"/>
            </div>
        </form>

      </div></>
  )
}

export default CustMakePayment
