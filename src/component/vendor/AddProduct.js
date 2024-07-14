import React from 'react'
import Navigation from '../navigation/Navigation'

const AddProduct = () => {
  return (
    <><Navigation />
    <div className='main'>
          <h1 className='heading'>Add AddProduct</h1>
          <form action="/submit" method="post">
            <div class="form-row">
                <div class="form-group">
                    <label for="productId">Product ID:</label>
                    <input type="number" id="productId" name="productId" required/>
                </div>
                <div class="form-group">
                    <label for="vendorId">Vendor ID:</label>
                    <input type="text" id="vendorId" name="vendorId" required/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="productName">Product Name:</label>
                    <input type="text" id="productName" name="productName" required/>
                </div>
                <div class="form-group">
                    <label for="productDescription">Product Description:</label>
                    <input type="text" id="productDescription" name="productDescription"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" step="0.01" required/>
                </div>
                <div class="form-group">
                    <label for="image">Image URL:</label>
                    <input type="url" id="image" name="image"/>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="category">Category:</label>
                    <input type="text" id="category" name="category"/>
                </div>
                <div class="form-group">
                    <label for="orderId">Order ID:</label>
                    <input type="text" id="orderId" name="orderId"/>
                </div>
            </div>
            <div class="form-group">
                <input type="submit" value="Submit"/>
            </div>
        </form>


      </div></>
  )
}

export default AddProduct
