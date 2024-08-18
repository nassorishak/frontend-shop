import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';

const VendorSubscription = () => {
    const [subId, setSubId] = useState(0);
    const [subscriptionType, setSubscriptionType] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [vendorId, setVendorId] = useState(0);
    const [blocked, setBlocked] = useState(false);
    const [userId, setUserId] = useState(0);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        // Get values from local storage
        const storedVendorId = localStorage.getItem('customerId');
        const storedUserId = localStorage.getItem('customerId');

        if (storedVendorId) {
            setVendorId(parseInt(storedVendorId));
        }

        if (storedUserId) {
            setUserId(parseInt(storedUserId));
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const subscription = {
            subId,
            subscriptionType,
            startDate,
            endDate,
            serviceType,
            serviceName,
            vendorId,
            blocked,
            vendor: {
                userId
            }
        };

        try {
            const response = await axios.post('http://localhost:8080/subscriptions/calculate-amount', subscription);
            if (response.status === 200) {
                setSuccessMessage('Subscription successfully created!');
                setErrorMessage('');
            }
        } catch (error) {
            console.error("Error creating subscription:", error);
            setErrorMessage('Failed to create subscription. Please try again.');
            setSuccessMessage('');
        }
    };

    return (
        <>

            <Navigation />
            <div  className='main'>
            <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', height: "1100px" }}>
                <div style={{ marginTop: "0px", fontWeight: 'bold',position:"fixed " }}>VENDOR SUBSCRIPTION</div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', marginTop: "20px" }}>
                    <label style={{ marginBottom: '5px' }}>Subscription Type:</label>
                    <input
                        type="text"
                        value={subscriptionType}
                        onChange={(e) => setSubscriptionType(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <label style={{ marginBottom: '5px' }}>Start Date:</label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <label style={{ marginBottom: '5px' }}>End Date:</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <label style={{ marginBottom: '5px' }}>Service Type:</label>
                    <input
                        type="text"
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <label style={{ marginBottom: '5px' }}>Service Name:</label>
                    <input
                        type="text"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        required
                        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <label style={{ marginBottom: '5px' }}>Vendor ID:</label>
                    <input
                        type="number"
                        value={vendorId}
                        onChange={(e) => setVendorId(Number(e.target.value))}
                        required
                        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <label style={{ marginBottom: '5px' }}>Blocked:</label>
                    <input
                        type="checkbox"
                        checked={blocked}
                        onChange={(e) => setBlocked(e.target.checked)}
                        style={{ marginBottom: '10px' }}
                    />

                    <label style={{ marginBottom: '5px' }}>User ID:</label>
                    <input
                        type="number"
                        value={userId}
                        onChange={(e) => setUserId(Number(e.target.value))}
                        required
                        style={{ padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />

                    <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer', width: "170px", marginTop: '10px' }}>
                        Submit Subscription
                    </button>
                </form>

                {successMessage && <p style={{ color: 'green', marginTop: '10px' }}>{successMessage}</p>}
                {errorMessage && <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>}
            </div>
            </div>
        </>
    );
};

export default VendorSubscription;
