import React from 'react'
import Navigation from '../navigation/Navigation'


const AManageOrder = () => {
  return (
    <><Navigation />
    <div className='main'>
    <h1>Admin ManageOrder Page</h1>
    <table class="order-table">
    <thead>
        <tr>
            <th>Order ID</th>
            <th>Order Name</th>
            <th>Total Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Quantity</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Order A</td>
            <td>$200.00</td>
            <td>2024-07-09</td>
            <td>Processing</td>
            <td>2</td>
            <td>
                <button class="action-btn">Edit</button>
                <button class="action-btn">Delete</button>
                <button class="action-btn">Update Status</button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Order B</td>
            <td>$150.00</td>
            <td>2024-07-08</td>
            <td>Shipped</td>
            <td>1</td>
            <td>
                <button class="action-btn">Edit</button>
                <button class="action-btn">Delete</button>
                <button class="action-btn">Update Status</button>
            </td>
        </tr>
        {/* <!-- Add more rows as needed --> */}
    </tbody>
</table>

      </div></>
  )
}

export default AManageOrder
