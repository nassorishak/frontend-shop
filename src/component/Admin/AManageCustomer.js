import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ManageCustomer = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('success');
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: '',
        custAddress: '',
        phoneNo: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const showAlertMessage = (message, variant = 'success') => {
        setAlertMessage(message);
        setAlertVariant(variant);
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:8080/api/customer/get/customer');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            showAlertMessage('Error fetching customers', 'danger');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (userId) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
                showAlertMessage('Customer deleted successfully');
                fetchUsers(); // Refresh the list
            } catch (error) {
                console.error('Error deleting user:', error);
                showAlertMessage('Error deleting customer', 'danger');
            }
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
            custAddress: user.custAddress,
            phoneNo: user.phoneNo
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
            // Try the customer-specific endpoint first
            await axios.put(`http://localhost:8080/api/customer/update/${formData.userId}`, formData);
            
            setSelectedUser(null);
            showAlertMessage('Customer updated successfully');
            fetchUsers(); // Refresh the list
            setFormData({ 
                userId: '', 
                email: '', 
                firstName: '', 
                lastName: '', 
                password: '', 
                role: '', 
                custAddress: '', 
                phoneNo: '' 
            });
        } catch (error) {
            console.error('Error updating customer:', error);
            
            // If the customer endpoint fails, try the general users endpoint
            try {
                await axios.put(`http://localhost:8080/api/users/update/${formData.userId}`, formData);
                
                setSelectedUser(null);
                showAlertMessage('Customer updated successfully');
                fetchUsers();
                setFormData({ 
                    userId: '', 
                    email: '', 
                    firstName: '', 
                    lastName: '', 
                    password: '', 
                    role: '', 
                    custAddress: '', 
                    phoneNo: '' 
                });
            } catch (secondError) {
                console.error('Error updating user:', secondError);
                showAlertMessage('Error updating customer. Please check the console for details.', 'danger');
            }
        }
    };

    return (
        <>
            <Navigation />
            <div className='main' style={{ backgroundColor: "grey", minHeight: "90vh", padding: '20px' }}>
                {/* Fixed Header Container */}
                <div style={{
                    position: 'fixed', 
                    top: 0, 
                    marginTop:"30px",
                    width:"1150px",
                    zIndex: 100, 
                    backgroundColor: 'grey', 
                    padding: '15px 0',
                    borderBottom: '2px solid #ccc'
                }}>
                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <h2 style={{ textAlign: "center", margin: 0, marginLeft: "200px" }}>MANAGE CUSTOMERS</h2>
                        <Link to={'/registerform'} style={{ marginRight: "200px" }}>
                            <button type='submit' name='submit' style={{ 
                                backgroundColor: "white", 
                                borderRadius: "6px", 
                                width: "160px", 
                                padding: "8px",
                                color: "black",
                                border: "1px solid #ccc",
                                fontWeight: "bold"
                            }}>
                                + Add Customers
                            </button>
                        </Link>
                    </div>
                    
                    {showAlert && (
                        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible style={{ 
                            maxWidth: '1000px', 
                            margin: '20px auto 0',
                            borderRadius: '5px'
                        }}>
                            {alertMessage}
                        </Alert>
                    )}
                </div>

                {loading ? (
                    <div className="text-center" style={{ padding: '50px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-2">Loading customers...</p>
                    </div>
                ) : (
                    <div style={{ 
                        marginTop: '10px', 
                        height: 'calc(120vh - 200px)', 
                        overflow: 'auto',
                        backgroundColor: 'white',
                        borderRadius: '5px',
                        padding: '10px'
                    }}>
                        <table className="table table-bordered" style={{ 
                            width: "100%", 
                            margin: "0 auto", 
                            marginTop:"70px",
                            backgroundColor: "white",
                            borderCollapse: 'collapse'
                        }}>
                            {/* Fixed Table Header */}
                            <thead style={{ 
                                position: 'sticky', 
                                top: 0, 
                                zIndex: 90, 
                                marginTop:"40px",
                                backgroundColor: '#343a40',
                                color: 'white'
                            }}>
                                <tr>
                                    <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>First Name</th>
                                    <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Last Name</th>
                                    <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Email</th>
                                    <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Customer Address</th>
                                    <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Phone Number</th>
                                    <th style={{ padding: '12px', border: '1px solid #dee2e6' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.length > 0 ? (
                                    users.map(user => (
                                        <tr key={user.userId}>
                                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.firstName}</td>
                                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.lastName}</td>
                                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.email}</td>
                                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.custAddress}</td>
                                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>{user.phoneNo}</td>
                                            <td style={{ padding: '12px', border: '1px solid #dee2e6' }}>
                                                <div style={{ display: "flex", justifyContent: "space-around" }}>
                                                    <Button 
                                                        variant="outline-primary" 
                                                        size="sm" 
                                                        onClick={() => handleEdit(user)}
                                                        style={{ padding: '5px 10px', fontSize: '14px' }}
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button 
                                                        variant="outline-danger" 
                                                        size="sm" 
                                                        onClick={() => handleDelete(user.userId)}
                                                        style={{ padding: '5px 10px', fontSize: '14px' }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center" style={{ padding: '20px', border: '1px solid #dee2e6' }}>
                                            No customers found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Bootstrap Modal for editing user */}
                <Modal
                    show={!!selectedUser}
                    onHide={() => setSelectedUser(null)}
                    centered
                    size="lg"
                >
                    <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa',height:"1px" }}>
                        <Modal.Title>Edit Customer</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleUpdateSubmit}>
                        <Modal.Body style={{ padding: '20px' }}>
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>First Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="First Name"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Last Name *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Last Name"
                                            required
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                            
                            <Form.Group className="mb-3">
                                <Form.Label>Email *</Form.Label>
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
                                <Form.Label>Password *</Form.Label>
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
                                <Form.Label>Customer Address *</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    name="custAddress"
                                    value={formData.custAddress}
                                    onChange={handleInputChange}
                                    placeholder="Customer Address"
                                    required
                                />
                            </Form.Group>
                            
                            <div className="row">
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone Number *</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="phoneNo"
                                            value={formData.phoneNo}
                                            onChange={handleInputChange}
                                            placeholder="Phone Number"
                                            required
                                            maxLength={10}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-md-6">
                                    <Form.Group className="mb-3">
                                        <Form.Label>Role</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="role"
                                            readOnly
                                            value={formData.role}
                                            placeholder="Role"
                                        />
                                    </Form.Group>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer style={{ backgroundColor: '#f8f9fa',width:"300px" }}>
                            <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" style={{width:"100px"}}>
                                Update
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </div>
        </>
    );
};

export default ManageCustomer;