import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VendorBlocker = () => {
  const [vendorId, setVendorId] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  const blockVendor = async (vendorId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/vendor/block/${vendorId}`);
      if (response.status === 200) {
        setIsBlocked(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unblockVendor = async (vendorId) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/vendor/unblock/${vendorId}`);
      if (response.status === 200) {
        setIsBlocked(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBlockToggle = () => {
    if (isBlocked) {
      unblockVendor(vendorId);
    } else {
      blockVendor(vendorId);
    }
  };

  return (
    <div>
      <input type="number" value={vendorId} onChange={(e) => setVendorId(e.target.value)} />
      <button onClick={handleBlockToggle}>
        {isBlocked ? 'Unblock' : 'Block'}
      </button>
      <p>Vendor {vendorId} is {isBlocked ? 'blocked' : 'unblocked'}</p>
    </div>
  );
};

export default VendorBlocker;