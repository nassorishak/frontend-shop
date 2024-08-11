import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const AdminDashboard = () => {
    const [countOrder, setCountOrder] = useState(0);
    const [acceptedOrder, setAcceptedOrder] = useState(0);
    const [canceledOrder, setCanceledOrder] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [orderCountResponse, acceptedOrderResponse, canceledOrderResponse, totalPaymentResponse] = await Promise.all([
                    axios.get('http://localhost:8080/api/orders/count'),
                    axios.get('http://localhost:8080/api/orders/accepted/count'),
                    axios.get('http://localhost:8080/api/orders/canceled/count'),
                    axios.get('http://localhost:8080/api/orders/payment/total')
                ]);

                // Assuming responses contain the counts directly. Adjust if needed.
                setCountOrder(orderCountResponse.data);
                setAcceptedOrder(acceptedOrderResponse.data);
                setCanceledOrder(canceledOrderResponse.data);
                setTotalPayment(totalPaymentResponse.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <Navigation />
            <div className="main">
                <h2 className="text-center mb-4">Admin Dashboard</h2>
                <div className="card-container">
                    <div className="card border-primary">
                        <i className="fa fa-user"></i>
                        <h3>{countOrder}</h3>
                        <p>Orders</p>
                    </div>

                    <div className="card border-success">
                        <i className="fa fa-check"></i>
                        <h3>{acceptedOrder}</h3>
                        <p>Accepted Orders</p>
                    </div>

                    <div className="card border-danger">
                        <i className="fa fa-times"></i>
                        <h3>{canceledOrder}</h3>
                        <p>Canceled Orders</p>
                    </div>

                    <div className="card border-warning">
                        <i className="fa fa-dollar-sign"></i>
                        <h3>{totalPayment}</h3>
                        <p>Total Payment</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
