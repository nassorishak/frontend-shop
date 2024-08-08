import React, { useState } from 'react';
import Navigation from '../navigation/Navigation';

const VChangeInformation = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch(`/api/login/${email}`, {
        method: 'GET', // Use appropriate method; this is just an example.
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the successful response
        setMessage(`Success: ${JSON.stringify(data)}`);
      } else {
        const errorMessage = await response.text();
        setMessage(`Error: ${errorMessage}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <>
      <Navigation />
      <div className='main'>
        <h2>Change Vendor Information</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit">Submit</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </>
  );
};

export default VChangeInformation;
