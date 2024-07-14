import React from 'react'
import Navigation from '../navigation/Navigation'

const ViewOrder = () => {
  return (
    <><Navigation />
    <div className='main'>
    <h1>Customer ViewOrder Page</h1>
    <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Name</th>
                    <th>Total Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>Customer A</td>
                    <td>$100.00</td>
                    <td>2024-07-08</td>
                    <td>Processing</td>
                    <td>3</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Customer B</td>
                    <td>$150.50</td>
                    <td>2024-07-09</td>
                    <td>Shipped</td>
                    <td>5</td>
                </tr>
                {/* <!-- Add more rows as needed --> */}
            </tbody>
        </table>

      </div></>
  )
}

export default ViewOrder
