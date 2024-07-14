import React from 'react'
import Navigation from '../navigation/Navigation'

const AViewOrder = () => {
  return (
    <><Navigation />
    <div className='main'>
    <h1>Admin ViewOrder</h1>
    <table class="order-table">
    <thead>
        <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Status</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>Product A</td>
            <td>2</td>
            <td>$200.00</td>
            <td>Processing</td>
            <td>2024-07-09</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>Product B</td>
            <td>1</td>
            <td>$100.00</td>
            <td>Shipped</td>
            <td>2024-07-08</td>
        </tr>
        {/* <!-- Add more rows as needed --> */}
    </tbody>
</table>
      </div></>
  )
}

export default AViewOrder
