import React, { useState, useEffect } from 'react';
import { Table, thead, tr, th, tbody, td } from 'reactstrap';

const MonthlyReport = () => {
  const [orders, setOrders] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    fetch(`/api/reports/monthly-orders?month=${month}&year=${year}`)
      .then(response => response.json())
      .then(data => setOrders(data));
  }, [month, year]);

  return (
    <div>
      <h1>Monthly Report</h1>
      <Table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>Order Date</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.customer.name}</td>
              <td>{order.customer.email}</td>
              <td>{order.orderDate}</td>
              <td>{order.total}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MonthlyReport;