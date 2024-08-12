import React, { useEffect, useState } from 'react';
import Navigation from '../navigation/Navigation';
import axios from 'axios';

const VendorDashboard = () => {
    const [countOrder, setCountOrder] = useState(0);
    const [acceptedOrder, setAcceptedOrder] = useState(0);
    const [canceledOrder, setCanceledOrder] = useState(0);
    const [totalPayment, setTotalPayment] = useState(0);

    useEffect(() => {
        axios.get('http://localhost:8080/api/vendor/count')
            .then((response) => {
                setCountOrder(response.data);
                setAcceptedOrder(response.data);
                setCanceledOrder(response.data);
                setTotalPayment(response.data);
            });
    }, []);

    return (
        <>
            <Navigation />
            <div className='main'>
                <h1 style={{ textAlign: "center", backgroundColor: "grey", width: "100%", margin: "0 auto", padding: "10px" }}>Vendor Dashboard</h1>
                <div className="card-row">
                    <div className="card">
                        <p><i className="fa fa-user"></i></p>
                        <h3>{countOrder}</h3>
                        <p>Order</p>
                    </div>
                    <div className="card">
                        <p><i className="fa fa-check"></i></p>
                        <h3>{acceptedOrder}</h3>
                        <p>Accepted Order</p>
                    </div>
                    <div className="card">
                        <p><i className="fa fa-smile-o"></i></p>
                        <h3>{canceledOrder}</h3>
                        <p>Canceled Order</p>
                    </div>
                    <div className="card">
                        <p><i className="fa fa-coffee"></i></p>
                        <h3>{totalPayment}</h3>
                        <p>Total Payment</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VendorDashboard;
