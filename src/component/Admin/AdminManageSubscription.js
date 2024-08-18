import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminManageSubscription = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/subscriptions')
      .then(response => {
        setSubscriptions(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Admin View Subscription</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Vendor ID</th>
              <th>Subscription Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Service Type</th>
              <th>Service Name</th>
              <th>Blocked</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map(subscription => (
              <tr key={subscription.vendorId}>
                <td>{subscription.vendorId}</td>
                <td>{subscription.subscriptionType}</td>
                <td>{subscription.startDate}</td>
                <td>{subscription.endDate}</td>
                <td>{subscription.serviceType}</td>
                <td>{subscription.serviceName}</td>
                <td>{subscription.blocked ? 'Yes' : 'No'}</td>
                <td>
                  <button className="btn btn-primary">Edit</button>
                  <button className="btn btn-danger">Delete</button>
                  <button className="btn btn-success">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminManageSubscription;