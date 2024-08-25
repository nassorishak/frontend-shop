import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const ViewSubscription = () => {
    const [subscriptions, setSubscriptions] = useState([]);
    const [selectedSubscription, setSelectedSubscription] = useState(null);
    const [formData, setFormData] = useState({
        vendorId: '',
        subscriptionType: '',
        startDate: '',
        endDate: '',
        serviceType: '',
        serviceName: '',
        amount: ''
    });

    useEffect(() => {
        fetchSubscriptions();
    }, []);

    const fetchSubscriptions = async () => {
        try {
            const response = await axios.get('http://localhost:8080/subscriptions/get/subscriptions');
            setSubscriptions(response.data);
        } catch (error) {
            console.error('Error fetching subscriptions:', error);
        }
    };

    const handleDelete = async (subId) => {
        try {
            await axios.delete(`http://localhost:8080/subscriptions/delete/${subId}`);
            fetchSubscriptions(); // Refresh the list
        } catch (error) {
            console.error('Error deleting subscription:', error);
        }
    };

    const handleEdit = (subscription) => {
        setSelectedSubscription(subscription);
        setFormData({
            vendorId: subscription.vendorId,
            subscriptionType: subscription.subscriptionType,
            startDate: subscription.startDate,
            endDate: subscription.endDate,
            serviceType: subscription.serviceType,
            serviceName: subscription.serviceName,
            amount: subscription.amount
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
            await axios.put(`http://localhost:8080/api/subscription/update/${formData.vendorId}`, formData);
            setSelectedSubscription(null);
            fetchSubscriptions(); // Refresh the list
            setFormData({ vendorId: '', subscriptionType: '', startDate: '', endDate: '', serviceType: '', serviceName: '', amount: '' });
        } catch (error) {
            console.error('Error updating subscription:', error);
        }
    };

    return (
        <>
            <Navigation />
            <div className='main' style={{ backgroundColor: "grey", height: "455px", overflowY: "scroll" }}>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <h2 style={{ textAlign: "center", marginTop: "15px", marginLeft: "20px" }}>VENDOR VIEW SUBSCRIPTIONS</h2>
                </div>
                
                <table className="table table-bordered" style={{ width: "1005px", margin: "auto", backgroundColor: "white", marginLeft: "3px" }}>
                    <thead>
                        <tr>
                            <th>Vendor ID</th>
                            <th style={{width:"300px"}}>Subscription Type</th>
                            <th style={{width:"600px"}}>Start Date</th>
                            <th style={{width:"600px"}}>End Date</th>
                            <th style={{width:"300px"}}>Service Type</th>
                            <th style={{width:"300px"}}>Service Name</th>
                            <th>Amount</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscriptions.map(subscription => (
                            <tr key={subscription.subId}> {/* Ensure the correct key is used */}
                                <td>{subscription.vendorId}</td>
                                <td>{subscription.subscriptionType}</td>
                                <td>{subscription.startDate}</td>
                                <td>{subscription.endDate}</td>
                                <td>{subscription.serviceType}</td>
                                <td>{subscription.serviceName}</td>
                                <td>{subscription.amount}</td>
                                <td>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                                        <Button variant="warning" onClick={() => handleEdit(subscription)}>
                                            Update
                                        </Button>
                                        <Button variant="danger" onClick={() => handleDelete(subscription.subId)}>
                                            Delete
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Bootstrap Modal for editing subscription */}
                <Modal
                    show={!!selectedSubscription}
                    onHide={() => setSelectedSubscription(null)}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Subscription</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ width: "400px" }}>
                        <Form onSubmit={handleUpdateSubmit}>
                            {/* Form fields */}
                            <Form.Group className="mb-3">
                                <Form.Label>Vendor ID</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="vendorId"
                                    value={formData.vendorId}
                                    onChange={handleInputChange}
                                    placeholder="Vendor ID"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Subscription Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="subscriptionType"
                                    value={formData.subscriptionType}
                                    onChange={handleInputChange}
                                    placeholder="Subscription Type"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Service Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serviceType"
                                    value={formData.serviceType}
                                    onChange={handleInputChange}
                                    placeholder="Service Type"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Service Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="serviceName"
                                    value={formData.serviceName}
                                    onChange={handleInputChange}
                                    placeholder="Service Name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Amount</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="Amount"
                                    required
                                    readOnly
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

export default ViewSubscription;
