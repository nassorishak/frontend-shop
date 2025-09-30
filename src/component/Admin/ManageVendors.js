// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navigation from '../navigation/Navigation';
// import { Modal, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';

// const ManageVendors = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [formData, setFormData] = useState({
//         userId: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         password: '',
//         confirmPassword: '', // Added confirmPassword
//         role: 'VENDOR', // Static role
//         vendorType: '', // New field
//         address: '', // New field
//         vendorCompany: '' // New field
//     });
//     const handleBlock = async (userId) => {
//         try {
//             const response = await axios.put(`http://localhost:8080/api/vendor/block/${userId}`);
//             fetchUsers(); // Refresh the list
//         } catch (error) {
//             console.error('Error blocking user:', error);
//         }
//     };
    
//     const handleUnblock = async (userId) => {
//         try {
//             const response = await axios.put(`http://localhost:8080/api/vendor/unblock/${userId}`);
//             fetchUsers(); // Refresh the list
//         } catch (error) {
//             console.error('Error unblocking user:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/vendor/get/vendors');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleDelete = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
//             fetchUsers(); // Refresh the list
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleEdit = (user) => {
//         setSelectedUser(user);
//         setFormData({
//             userId: user.userId || '', // Ensure userId exists
//             email: user.email || '', // Ensure email exists
//             firstName: user.firstName || '', // Ensure first name exists
//             lastName: user.lastName || '', // Ensure last name exists
//             password: user.password || '',
//             confirmPassword: '', // Initialize as empty for editing
//             role: user.role || 'VENDOR', // Default to 'VENDOR'
//             vendorType: user.vendorType || '', // Ensure exists
//             address: user.address || '', // Ensure exists
//             vendorCompany: user.vendorCompany || '' // Ensure exists
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleUpdateSubmit = async (e) => {
//         e.preventDefault();

//         // Validation checks
//         const { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany } = formData;

//         const requiredFields = { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany };

//         // Check if all required fields exist
//         for (let field in requiredFields) {
//             if (!requiredFields[field]) {
//                 alert(`${field} is required.`);
//                 return;
//             }
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             alert("Passwords do not match.");
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:8080/api/users/update/${formData.userId}`, {
//                 email,
//                 firstName,
//                 lastName,
//                 password,
//                 role: formData.role, // Keep role as is
//                 vendorType,
//                 address,
//                 vendorCompany,
//             });
//             setSelectedUser(null);
//             fetchUsers(); // Refresh the list
//             // Reset form data after submission
//             setFormData({
//                 userId: '',
//                 email: '',
//                 firstName: '',
//                 lastName: '',
//                 password: '',
//                 confirmPassword: '',
//                 role: 'VENDOR',
//                 vendorType: '',
//                 address: '',
//                 vendorCompany: ''
//             });
//         } catch (error) {
//             console.error('Error updating user:', error);
//             alert('Error updating user: ' + error.message);
//         }
//     };

//     return (
//         <>
//             <Navigation />
//             <div className='main' style={{ backgroundColor: "grey", height: "455px", overflowY: "scroll" }}>
//                 <div style={{ display: "flex", flexDirection: "row" }}>
//                     <h2 style={{ textAlign: "center", marginTop: "15px", marginLeft: "200px" }}>MANAGE VENDORS</h2>
//                     <Link to={'/add-vendors'}>
//                         <button type='submit' name='submit' style={{ backgroundColor: "white", borderRadius: "6px", marginLeft: "300px", width: "120px", marginTop: "15px", color: "black" }}>Add Vendors</button>
//                     </Link>
//                 </div>
//                 <table className="table table-bordered" style={{ width: "1000px",marginLeft:"12px", margin: "auto", backgroundColor: "white" }}>
//                     <thead>
//                         <tr>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                             <th>Vendor Type</th>
//                             <th>Address</th>
//                             <th style={{width:"300px"}}>Company</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user.userId}>
//                                 <td>{user.firstName}</td>
//                                 <td>{user.lastName}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.vendorType || 'N/A'}</td> {/* Display Vendor Type */}
//                                 <td>{user.address || 'N/A'}</td> {/* Display Address */}
//                                 <td>{user.vendorCompany || 'N/A'}</td> {/* Display Company */}
//                                 <td style={{ display: "flex", justifyContent: "space-around",marginRight:"85px" }}>
//                                     <Button variant="primary" onClick={() => handleEdit(user)} style={{height:"35px",marginRight:"20px",width:"150px",paddingRight:"20px",paddingLeft:"20px"}}>Edit</Button>
//                                     <Button variant="danger" onClick={() => handleDelete(user.userId)} style={{height:"35px",width:"15ox",marginRight:"30px"}}>Delete</Button>
//                                     <Button variant="danger" onClick={() => handleUnblock(user.userId)} style={{height:"35px",marginRight:"50px",width:"80px"}}>UnBlock</Button>
//                                 </td>
                                
                                
                                
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Bootstrap Modal for editing user */}
//                 <Modal
//                     show={!!selectedUser}
//                     onHide={() => setSelectedUser(null)}
//                     centered
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Edit User</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body style={{ width: "450px", marginRight: "2000px" }}>
//                         <Form onSubmit={handleUpdateSubmit}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     placeholder="Email"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>First Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="firstName"
//                                     value={formData.firstName}
//                                     onChange={handleInputChange}
//                                     placeholder="First Name"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Last Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="lastName"
//                                     value={formData.lastName}
//                                     onChange={handleInputChange}
//                                     placeholder="Last Name"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     placeholder="Password"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Confirm Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="confirmPassword"
//                                     value={formData.confirmPassword}
//                                     onChange={handleInputChange}
//                                     placeholder="Confirm Password"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Vendor Type</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="vendorType"
//                                     value={formData.vendorType}
//                                     onChange={handleInputChange}
//                                     placeholder="Vendor Type"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Address</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleInputChange}
//                                     placeholder="Address"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Vendor Company</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="vendorCompany"
//                                     value={formData.vendorCompany}
//                                     onChange={handleInputChange}
//                                     placeholder="Vendor Company"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Button variant="success" type="submit" style={{ width: "160px", marginLeft: "130px", backgroundColor: "green" }}>Update Vendor</Button>
//                         </Form>
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         </>
//     );
// };

// export default ManageVendors;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navigation from '../navigation/Navigation';
// import { Modal, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';

// const ManageVendors = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [formData, setFormData] = useState({
//         userId: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         password: '',
//         confirmPassword: '', // Added confirmPassword
//         role: 'VENDOR', // Static role
//         vendorType: '', // New field
//         address: '', // New field
//         vendorCompany: '', // New field
//         status: 'Pending' // Default status
//     });

//     const handleBlock = async (userId) => {
//         try {
//             await axios.put(`http://localhost:8080/api/vendor/block/${userId}`);
//             fetchUsers(); // Refresh the list
//         } catch (error) {
//             console.error('Error blocking user:', error);
//         }
//     };

//     const handleUnblock = async (userId) => {
//         try {
//             await axios.put(`http://localhost:8080/api/vendor/unblock/${userId}`);
//             fetchUsers(); // Refresh the list
//         } catch (error) {
//             console.error('Error unblocking user:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/vendor/get/vendors');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleDelete = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
//             fetchUsers(); // Refresh the list
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleEdit = (user) => {
//         setSelectedUser(user);
//         setFormData({
//             userId: user.userId || '', // Ensure userId exists
//             email: user.email || '', // Ensure email exists
//             firstName: user.firstName || '', // Ensure first name exists
//             lastName: user.lastName || '', // Ensure last name exists
//             password: user.password || '',
//             confirmPassword: '', // Initialize as empty for editing
//             role: user.role || 'VENDOR', // Default to 'VENDOR'
//             vendorType: user.vendorType || '', // Ensure exists
//             address: user.address || '', // Ensure exists
//             vendorCompany: user.vendorCompany || '', // Ensure exists
//             status: user.status || 'Pending' // Set default status
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleUpdateSubmit = async (e) => {
//         e.preventDefault();

//         // Validation checks
//         const { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany } = formData;

//         const requiredFields = { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany };

//         // Check if all required fields exist
//         for (let field in requiredFields) {
//             if (!requiredFields[field]) {
//                 alert(`${field} is required.`);
//                 return;
//             }
//         }

//         // Check if passwords match
//         if (password !== confirmPassword) {
//             alert("Passwords do not match.");
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:8080/api/users/update/${formData.userId}`, {
//                 email,
//                 firstName,
//                 lastName,
//                 password,
//                 role: formData.role, // Keep role as is
//                 vendorType,
//                 address,
//                 vendorCompany,
//                 status: formData.status // Include status in the update
//             });
//             setSelectedUser(null);
//             fetchUsers(); // Refresh the list
//             // Reset form data after submission
//             setFormData({
//                 userId: '',
//                 email: '',
//                 firstName: '',
//                 lastName: '',
//                 password: '',
//                 confirmPassword: '',
//                 role: 'VENDOR',
//                 vendorType: '',
//                 address: '',
//                 vendorCompany: '',
//                 status: 'Pending' // Reset to default status
//             });
//         } catch (error) {
//             console.error('Error updating user:', error);
//             alert('Error updating user: ' + error.message);
//         }
//     };

//     return (
//         <>
//             <Navigation />
//             <div className='main' style={{ backgroundColor: "grey", height: "455px", overflowY: "scroll",marginLeft:"22px"}}>
//                 <div style={{ display: "flex", flexDirection: "row" }}>
//                     <h2 style={{ textAlign: "center", marginTop: "15px", marginLeft: "200px" }}>MANAGE VENDORS</h2>
//                     <Link to={'/add-vendors'}>
//                         <button type='submit' name='submit' className="custom-button" style={{float:"right",width:"120px",marginTop:"17px",borderRadius:"5px",backgroundColor:"white",color:"black"}}>Add Vendors</button>
//                     </Link>
//                 </div>
//                 <table className="table table-bordered" style={{ width: "1000px", marginLeft:"12px", margin: "auto", backgroundColor: "white" }}>
//                     <thead>
//                         <tr>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                             <th>Vendor Type</th>
//                             <th>Address</th>
//                             <th style={{width:"300px"}}>Company</th>
//                             <th>Status</th> {/* New status column */}
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user.userId}>
//                                 <td>{user.firstName}</td>
//                                 <td>{user.lastName}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.vendorType || 'N/A'}</td> {/* Display Vendor Type */}
//                                 <td>{user.address || 'N/A'}</td> {/* Display Address */}
//                                 <td>{user.vendorCompany || 'N/A'}</td> {/* Display Company */}
//                                 <td>{user.status || 'Pending'}</td> {/* Display Status */}
//                                 <td style={{ display: "flex", justifyContent: "space-around",marginRight:"85px" }}>
//                                     <Button className="custom-button" onClick={() => handleEdit(user)} style={{backgroundColor:"green",}}>Edit</Button>
//                                     <Button className="custom-button-danger" onClick={() => handleDelete(user.userId)} style={{backgroundColor:"red"}}>Delete</Button>
//                                     <Button className="custom-button-warning" onClick={() => handleBlock(user.userId)} style={{backgroundColor:"black",color:"white"}}>Block</Button>
//                                     <Button className="custom-button-success" onClick={() => handleUnblock(user.userId)} style={{width:"75px"}}>Unblock</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 {/* Bootstrap Modal for editing user */}
//                 <Modal
//                     show={!!selectedUser}
//                     onHide={() => setSelectedUser(null)}
//                     centered
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Edit User</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body style={{ width: "450px", marginRight: "2000px" }}>
//                         <Form onSubmit={handleUpdateSubmit}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     placeholder="Email"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>First Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="firstName"
//                                     value={formData.firstName}
//                                     onChange={handleInputChange}
//                                     placeholder="First Name"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Last Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="lastName"
//                                     value={formData.lastName}
//                                     onChange={handleInputChange}
//                                     placeholder="Last Name"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     placeholder="Password"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Confirm Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="confirmPassword"
//                                     value={formData.confirmPassword}
//                                     onChange={handleInputChange}
//                                     placeholder="Confirm Password"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Vendor Type</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="vendorType"
//                                     value={formData.vendorType}
//                                     onChange={handleInputChange}
//                                     placeholder="Vendor Type"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Address</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleInputChange}
//                                     placeholder="Address"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Vendor Company</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="vendorCompany"
//                                     value={formData.vendorCompany}
//                                     onChange={handleInputChange}
//                                     placeholder="Vendor Company"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Status</Form.Label>
//                                 <Form.Control
//                                     as="select"
//                                     name="status"
//                                     value={formData.status}
//                                     onChange={handleInputChange}
//                                     required
//                                 >
//                                     <option value="Pending">Pending</option>
//                                     <option value="Blocked">Blocked</option>
//                                     <option value="Unblocked">Unblocked</option>
//                                 </Form.Control>
//                             </Form.Group>
//                             <Button className="custom-button" type="submit">
//                                 Save Changes
//                             </Button>
//                         </Form>
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         </>
//     );
// };

// export default ManageVendors;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const ManageVendors = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '', // Added confirmPassword
        role: 'VENDOR', // Static role
        vendorType: '', // New field
        address: '', // New field
        vendorCompany: '', // New field
        status: 'Active' // Default status
    });

    const handleBlock = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/api/vendor/block/${userId}`);
            setUsers(users.map(user => 
                user.userId === userId ? { ...user, status: 'Blocked' } : user
            ));
        } catch (error) {
            console.error('Error blocking user:', error);
        }
    };

    const handleUnblock = async (userId) => {
        try {
            await axios.put(`http://localhost:8080/api/vendor/unblock/${userId}`);
            setUsers(users.map(user => 
                user.userId === userId ? { ...user, status: 'Active' } : user
            ));
        } catch (error) {
            console.error('Error unblocking user:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/vendor/get/vendors');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
            setUsers(users.filter(user => user.userId !== userId)); // Update the state locally
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            userId: user.userId || '',
            email: user.email || '',
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            password: user.password || '',
            confirmPassword: '',
            role: user.role || 'VENDOR',
            vendorType: user.vendorType || '',
            address: user.address || '',
            vendorCompany: user.vendorCompany || '',
            status: user.status || 'Active'
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();

        const { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany } = formData;

        const requiredFields = { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany };

        for (let field in requiredFields) {
            if (!requiredFields[field]) {
                alert(`${field} is required.`);
                return;
            }
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {
            await axios.put(`http://localhost:8080/api/users/update/${formData.userId}`, {
                email,
                firstName,
                lastName,
                password,
                role: formData.role,
                vendorType,
                address,
                vendorCompany,
                status: formData.status
            });
            setSelectedUser(null);
            fetchUsers();
            setFormData({
                userId: '',
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                confirmPassword: '',
                role: 'VENDOR',
                vendorType: '',
                address: '',
                vendorCompany: '',
                status: 'Active'
            });
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user: ' + error.message);
        }
    };

    return (
        <>
            <Navigation />
            <div className='main' style={{ backgroundColor: "grey", height: "455px", overflowY: "scroll",marginLeft:"10px",marginBottom:"250px" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <h2 style={{ textAlign: "center", marginTop: "15px", marginLeft: "200px" }}>MANAGE VENDORS</h2>
                    <Link to={'/add-vendors'}>
                        <button type='submit' name='submit' className="custom-button" style={{width:"113px",marginTop:"15px",float:"right",backgroundColor:"white",color:"black", borderRadius:"5px"}}>Add Vendors</button>
                    </Link>
                </div>
                <table className="table table-bordered" style={{ width: "1000px", marginLeft:"12px", margin: "auto", backgroundColor: "white" }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Vendor Type</th>
                            <th>Address</th>
                            <th style={{width:"300px"}}>Company</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.vendorType || 'N/A'}</td>
                                <td>{user.address || 'N/A'}</td>
                                <td>{user.vendorCompany || 'N/A'}</td>
                                <td>{user.status || 'Active'}</td>
                                <td style={{ display: "flex", justifyContent: "space-around",marginRight:"85px" }}>
                                    <Button className="custom-button" onClick={() => handleEdit(user)} style={{backgroundColor:"green"}}>Edit</Button>
                                    <Button className="custom-button-danger" onClick={() => handleDelete(user.userId)} style={{backgroundColor:"red"}}>Delete</Button>
                                    <Button className="custom-button-warning" onClick={() => handleBlock(user.userId)} style={{backgroundColor:"black"}}>Block</Button>
                                    <Button className="custom-button-success" onClick={() => handleUnblock(user.userId)}style={{width:"75px"}}>Active</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <Modal
                    show={!!selectedUser}
                    onHide={() => setSelectedUser(null)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ width: "450px", marginRight: "2000px" }}>
                        <Form onSubmit={handleUpdateSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    placeholder="First Name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    placeholder="Last Name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    placeholder="Password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    placeholder="Confirm Password"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vendor Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="vendorType"
                                    value={formData.vendorType}
                                    onChange={handleInputChange}
                                    placeholder="Vendor Type"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    placeholder="Address"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Vendor Company</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="vendorCompany"
                                    value={formData.vendorCompany}
                                    onChange={handleInputChange}
                                    placeholder="Vendor Company"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Status</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleInputChange}
                                    placeholder="Status"
                                    readOnly
                                />
                            </Form.Group>
                            <Modal.Footer>
                                <Button className="custom-button" type="submit">
                                    Update User
                                </Button>
                                <Button className="custom-button-danger" onClick={() => setSelectedUser(null)}>
                                    Cancel
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default ManageVendors;



