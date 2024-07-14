import React from 'react'
import Navigation from '../navigation/Navigation'

const AManageCustomer = () => {
  return (
    <><Navigation />
    <div className='main'>
    <h1>Admin Manage Customer</h1>
    <table class="customer-table">
    <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Action</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>John Doe</td>
            <td>johndoe@example.com</td>
            <td>123-456-7890</td>
            <td>123 Main St, Anytown, USA</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="update-btn">Update</button>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>Jane Smith</td>
            <td>janesmith@example.com</td>
            <td>987-654-3210</td>
            <td>456 Oak Ave, Anycity, USA</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
                <button class="update-btn">Update</button>
            </td>
        </tr>
        {/* <!-- Add more rows as needed --> */}
    </tbody>
</table>

<button class="add-btn">Add Customer</button>

      </div></>
  )
}

export default AManageCustomer
