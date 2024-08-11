import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [formData, setFormData] = useState({
        userId: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        role: ''
    });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/users/get/users');
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
            role: user.role
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
            setFormData({ userId: '', email: '', firstName: '', lastName: '', password: '', role: '' });
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <>
            <Navigation />
            <div className='main'style={{backgroundColor:"grey",height:"455px",overflowY:"scroll" }}>
                <h2 style={{textAlign:"center"}}>User Management</h2>
                <ul style={{border:"10px",width:"1000px",backgroundColor:"grey",display:"flex",flexDirection:"column"}}>
                    {users.map(user => (
                        <li key={user.userId}>
                            {user.firstName}{user.lastName}({user.email})
                            <div style={{display:'flex',flexDirection:"raw",backgroundColor:"white"}}>
                            <div>     <Button variant="primary" onClick={() => handleEdit(user)}  style={{border:"10px",width:"90px",marginLeft:"400px"}}>Edit</Button></div>
                            <div><Button variant="danger" onClick={() => handleDelete(user.userId)}style={{border:"10px",width:"90px",marginLeft:"200px"}}>Delete</Button></div>
                        </div>
                        </li>
                        
                    ))}
                </ul>

                {/* Bootstrap Modal for editing user */}
                <Modal
                    show={!!selectedUser}
                    onHide={() => setSelectedUser(null)}
                    centered
                    className="custom-modal" // Apply custom CSS class
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    placeholder="Role"
                                    required
                                />
                            </Form.Group>
                            <Button variant="success" type="submit">Update User</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </>
    );
};

export default UserManagement;
