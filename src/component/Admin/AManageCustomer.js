import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ManageCustomer = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
        custAddress: '', // Added custAddress field
        phoneNo: ''      // Added phoneNo field
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/customer/get/customer');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
            fetchUsers(); // Refresh the list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setFormData({
            userId: user.userId,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            role: user.role,
            custAddress: user.custAddress, // Set custAddress
            phoneNo: user.phoneNo          // Set phoneNo
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
        try {
            await axios.put(`http://localhost:8080/api/users/update/${formData.userId}`, formData);
            setSelectedUser(null);
            fetchUsers(); // Refresh the list
            setFormData({ userId: '', email: '', firstName: '', lastName: '', password: '', role: '', custAddress: '', phoneNo: '' });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <>
            <Navigation />
            <div className='main' style={{ backgroundColor: "grey", height: "455px", overflowY: "scroll" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <h2 style={{ textAlign: "center", marginTop: "15px", marginLeft: "200px" }}>MANAGE CUSTOMERS</h2>
                    <Link to={'/registerform'}>
                        <button type='submit' name='submit' style={{ backgroundColor: "white", borderRadius: "6px", marginLeft: "300px", width: "120px", marginTop: "15px", color: "black" }}>
                            Add Customers
                        </button>
                    </Link>
                </div>
                <table className="table table-bordered" style={{ width: "1000px", margin: "auto", backgroundColor: "white" }}>
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Customer Address</th> {/* Added Customer Address column */}
                            <th>Phone Number</th>       {/* Added Phone Number column */}
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.userId}>
                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.custAddress}</td> {/* Display Customer Address */}
                                <td>{user.phoneNo}</td>      {/* Display Phone Number */}
                                <td style={{ display: "flex", justifyContent: "space-around" }}>
                                    <Button variant="primary" onClick={() => handleEdit(user)}>Edit</Button>
                                    <Button variant="danger" onClick={() => handleDelete(user.userId)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Bootstrap Modal for editing user */}
                <Modal
                    show={!!selectedUser}
                    onHide={() => setSelectedUser(null)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ width: "400px" }}>
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
                                <Form.Label>Role</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="role"
                                    readOnly
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    placeholder="Role"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Customer Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="custAddress"
                                    value={formData.custAddress}
                                    onChange={handleInputChange}
                                    placeholder="Customer Address"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phoneNo"
                                    value={formData.phoneNo}
                                    onChange={handleInputChange}
                                    placeholder="Phone Number"
                                    required
                                    maxLength={"10"}
                                />
                            </Form.Group>
                            <Button variant="success" type="submit" style={{ width: "130px", marginLeft: "130px", backgroundColor: "green" }}>Update</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default ManageCustomer;
