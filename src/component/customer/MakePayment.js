
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

// Modal Component
const Modal = ({ isOpen, onClose, paymentDetails }) => {
    if (!isOpen) return null;

    const { amount, date } = paymentDetails;

    return (
        <div style={modalStyles.overlay}>
            <div style={modalStyles.modal}>
                <h2>Payment Details</h2>
                <p><strong>Date:</strong> {date}</p>
                <p><strong>Day:</strong> {new Date(date).toLocaleString('en-us', { weekday: 'long' })}</p>
                <p><strong>Amount Paid:</strong> Tsh{amount}</p>
                <p>Your payment has been successfully completed.</p>
                <button onClick={onClose} style={modalStyles.closeButton}>Close</button>
            </div>
        </div>
    );
};

const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
        width: '300px',
        textAlign: 'center',
    },
    closeButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

// Main Component
const MakePayment = () => {
    const [amount, setAmount] = useState('');
    const [controlNumber, setControlNumber] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [paymentDetails, setPaymentDetails] = useState({});
    const { orderId } = useParams();

    useEffect(() => {
        console.log("Order ID:", orderId); // Debugging line
    }, [orderId]);

    const handlePayment = async () => {
        try {
            if (!amount || amount <= 0) {
                setErrorMessage("Please enter a valid payment amount.");
                return;
            }
            if (!controlNumber) {
                setErrorMessage("Please enter a valid control number.");
                return;
            }

            const paymentRequest = {
                amount: parseFloat(amount),
            };

            const url = `http://localhost:8080/api/payments/orders/${orderId}/payment/${controlNumber}`;
            const response = await axios.post(url, paymentRequest);

            if (response.status === 200) {
                setPaymentStatus("Payment completed successfully.");
                setErrorMessage(null);

                // Set payment details for modal
                const paymentDate = new Date().toISOString(); // Current date and time
                setPaymentDetails({
                    amount: amount,
                    date: paymentDate,
                });
                setModalOpen(true); // Open modal
            }
        } catch (error) {
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        setErrorMessage("Invalid payment amount.");
                        break;
                    case 404:
                        setErrorMessage("Order not found.");
                        break;
                    case 409:
                        setErrorMessage("Payment already completed.");
                        break;
                    default:
                        setErrorMessage("Your payment is not valid processing the payment fail.");
                }
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: 'grey', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: "500px" }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Make Payment</h2>
            {paymentStatus && <div style={{ color: 'green', margin: '10px 0', textAlign: 'center', fontWeight: 'bold' }}>{paymentStatus}</div>}
            {errorMessage && <div style={{ color: 'red', margin: '10px 0', textAlign: 'center', fontWeight: 'bold' }}>{errorMessage}</div>}

            <div>
                <label>Control Number:</label>
                <input
                    type="text"
                    value={controlNumber}
                    onChange={(e) => setControlNumber(e.target.value)}
                    placeholder="Enter control number"
                    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>

            <div>
                <label>Payment Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter payment amount"
                    style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
                />
            </div>

            <button onClick={handlePayment} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}>Submit Payment</button>

            <Modal 
                isOpen={isModalOpen} 
                onClose={() => setModalOpen(false)} 
                paymentDetails={paymentDetails}
            />
        </div>
    );
};

export default MakePayment;
