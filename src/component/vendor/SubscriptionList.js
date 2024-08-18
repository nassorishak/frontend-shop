import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';

const SubscriptionList = () => {
  const [vendorId, setVendorId] = useState('');
  const [subscriptions, setSubscriptions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const response = await axios.get(`/api/vendor/subscriptions/${vendorId}`);
        setSubscriptions(response.data);
        setError(null);
      } catch (error) {
        setError(error.response.data);
      }
    };
    if (vendorId) {
      fetchSubscriptions();
    }
  }, [vendorId]);
 

  return (
    <>
    <Navigation/>
    <div className='main'>
    <div style={{width:"300px",marginLeft:"150px",marginTop:"20px"}}>
      <label>
        Vendor ID:
        <input type="text" value={vendorId} onChange={(event) => setVendorId(event.target.value)} />
      </label>
      <br />
      <h2>Subscriptions:</h2>
      <ul>
        {subscriptions.map((subscription) => (
          <li key={subscription.id}>{subscription.description}</li>
        ))}
      </ul>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
    </div>
    </>
  );
};

export default SubscriptionList;