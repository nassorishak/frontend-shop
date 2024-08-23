// import React, { useState } from 'react';
// import axios from 'axios';
// import Navigation from '../navigation/Navigation';

// const MakePayment = () => {
//   const [controlNumber, setControlNumber] = useState('');
//   const [amount, setAmount] = useState(0);
//   const [paymentResponse, setPaymentResponse] = useState(null);
//   const [error, setError] = useState(null);

//   const handleControlNumberChange = (event) => {
//     setControlNumber(event.target.value);
//   };

//   const handleAmountChange = (event) => {
//     setAmount(event.target.value);
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     makePayment();
//   };

//   const makePayment = async () => {
//     try {
//       const paymentRequest = {
//         amount: amount,
//       };
//       const response = await axios.post(`http://localhost:8080/api/payments/payment/${controlNumber}`, paymentRequest);
//       setPaymentResponse(response.data);
//     } catch (error) {
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         console.error(error.response.data);
//         console.error(error.response.status);
//         console.error(error.response.headers);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error(error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         console.error('Error', error.message);
//       }
//       setError(error.message);
//     }
//   };

//   return (
//     <>
//       <Navigation />
//       <div className='main'>
//         <div>
//           <h1 style={{ marginTop: "15px" }}>Make Payment</h1>
//           <form onSubmit={handleSubmit} style={{ marginLeft: "120px", width: "700px" }}>
//             <label>
//               Control Number
//               <input type="text" value={controlNumber} onChange={handleControlNumberChange} placeholder='enter the control number' />
//             </label>
//             <br /> <br />
//             <label>
//               Amount:
//               <input type="number" value={amount} onChange={handleAmountChange} placeholder='enter payment amount' />
//             </label>
//             <br />
//             <button type="submit" style={{ marginLeft: "220px", width: "150px", marginTop: "15px", backgroundColor: "gray", color: "black", borderRadius: "5px" }}>Make Payment</button>
//           </form>
//           {paymentResponse && (
//             <p style={{ marginLeft: "205px" }}>
//               Dear customer Customer you are successful make Payment<br />If you need resete click the button bellow<br /><br /><br/>{paymentResponse.transactionId}
//               <button type="submit" style={{ marginLeft: "135px", width: "150px", marginTop: "15px", backgroundColor: "gray", color: "black" }}>Generate reccete</button>
//             </p>
//           )}
//           {error && <p style={{ color: 'red' }}>{error}</p>}
//         </div>
//       </div>
//     </>
//   );
// };

// export default MakePayment;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MakePayment = () => {
    const [amount, setAmount] = useState('');
    const [controlNumber, setControlNumber] = useState('');
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const {orderId} = useParams();

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
                amount: parseFloat(amount)
            };

            const url = `http://localhost:8080/api/payments/orders/${orderId}/payment/${controlNumber}`;
            const response = await axios.post(url, paymentRequest);

            if (response.status === 200) {
                setPaymentStatus("Payment completed successfully.");
                setErrorMessage(null);
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
                        setErrorMessage("An error occurred while processing the payment.");
                }
            } else {
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
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
        </div>
    );
};

export default MakePayment;
