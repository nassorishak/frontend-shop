import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const AdminDashboard = () => {
    const [countOrder, setCountOrder] = useState(0);
    const [acceptedOrder, setAcceptedOrder] = useState(0);
    const [canceledOrder, setCanceledOrder] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    const userId  = parseInt(localStorage.getItem('customerId'))
    useEffect(() => {
        axios.get('http://localhost:8080/api/orders/get/orders')
          .then((response) => {
            const orders = response.data;
            const filteredOrders = orders.filter((order) => order.customer.userId === userId);
            const total_order = filteredOrders.length;
            setCountOrder(total_order);
          })
      }, [userId])

    return (
        <>
            <Navigation />
            <div className="main">
                <h2 className="text-center mb-4" style={{marginTop:"15px"}}>Admin Dashboard</h2>
                <div className="card-container">
                    <div className="card border-primary">
                        <i className="fa fa-user"></i>
                        <h3>{countOrder}</h3>
                        <p>Orders</p>
                    </div>

                    <div className="card border-success">
                        <i className="fa fa-check"></i>
                        <h3>{}</h3>
                        <p>Accepted Orders</p>
                    </div>

                    <div className="card border-danger">
                        <i className="fa fa-times"></i>
                        <h3>{}</h3>
                        <p>Canceled Orders</p>
                    </div>

                    <div className="card border-warning">
                        <i className="fa fa-dollar-sign"></i>
                        <h3>{}</h3>
                        <p>Total Payment</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
