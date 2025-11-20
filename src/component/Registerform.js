// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     phoneNo: '',
//     custAddress: '',
//     role: 'CUSTOMER'
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setError('');
//   };

//   const isFormValid = () => {
//     return (
//       formData.email &&
//       formData.password &&
//       formData.firstName &&
//       formData.lastName &&
//       formData.phoneNo &&
//       formData.custAddress &&
//       formData.role
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       setError('Please fill out all fields correctly.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/users/add/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           role: formData.role
//         })
//       });

//       if (response.ok) {
//         alert('User registered successfully!');
//         setFormData({
//           email: '',
//           password: '',
//           firstName: '',
//           lastName: '',
//           phoneNo: '',
//           custAddress: '',
//           role: 'CUSTOMER'
//         });
//       } else {
//         throw new Error('Registration failed, please try again.');
//       }
//     } catch (error) {
//       console.error('Error registering user:', error);
//       alert('Failed to register user: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-form"  style={{height:"700px",width:"800px"}}>
//         <h2 style={{ color: 'green', textAlign: 'center' }}>USER REGISTRATION</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <div className="error">{error}</div>}

//           <div className="form-row">
//             <div className="form-group half-width">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Enter your email address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group half-width">
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group half-width">
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="Enter your first name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group half-width">
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Enter your last name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           {/* Role Selection */}
//           <div className="form-row">
//             <div className="form-group half-width">
//               <label style={{ color: 'green', fontWeight: 'bold' }}>Select Role</label>
//               <select
//                 name="role"
//                 value={formData.role}
//                 onChange={handleChange}
//                 required
//                 style={{
//                   width: '100%',
//                   padding: '10px',
//                   borderRadius: '8px',
//                   border: '1px solid #ccc',
//                   backgroundColor: '#f9f9f9'
//                 }}
//               >
//                 <option value="CUSTOMER">Customer</option>
//                 <option value="VENDOR">Vendor</option>
//                 <option value="ADMIN">Admin</option>
//               </select>
//             </div>
//           </div>

//           {/* Phone and Address */}
//           <div className="form-row">
//             <div className="form-group half-width">
//               <input
//                 type="text"
//                 name="phoneNo"
//                 placeholder="Enter your phone number"
//                 value={formData.phoneNo}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="form-group half-width">
//               <input
//                 type="text"
//                 name="custAddress"
//                 placeholder="Enter your address"
//                 value={formData.custAddress}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//           </div>

//           <div className="form-row">
//             <div className="form-group half-width">
//               <input
//                 type="submit"
//                 value={loading ? 'Registering...' : 'Register'}
//                 disabled={loading || !isFormValid()}
//                 style={{
//                   backgroundColor: 'green',
//                   color: 'white',
//                   padding: '12px',
//                   border: 'none',
//                   borderRadius: '8px',
//                   width: '100%',
//                   height:"40px",
//                   cursor: 'pointer'
//                 }}
//               />
//             </div>
//              <Link to={'/manage-vendors'}>
//                                     <button type='submit' name='submit' className="custom-button" style={{width:"90px",marginTop:"15px",float:"right",backgroundColor:"green",color:"white", borderRadius:"5px"}}>back</button>
//                                 </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;

// import { Link } from 'react-router-dom';
// import React, { useState } from 'react';

// const RegistrationForm = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     firstName: '',
//     lastName: '',
//     phone: '',
//     custAddress: '',
//     role: 'CUSTOMER'
//   });

//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setError('');
//   };

//   // Simple form validation
//   const isFormValid = () => {
//     return (
//       formData.email &&
//       formData.password &&
//       formData.firstName &&
//       formData.lastName &&
//       formData.phone &&
//       formData.custAddress &&
//       formData.role
//     );
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       setError('Please fill out all fields correctly.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/users/add/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           email: formData.email,
//           password: formData.password,
//           firstName: formData.firstName,
//           lastName: formData.lastName,
//           role: formData.role,
//           custAddress: formData.custAddress,
//           phone: formData.phone
//         })
//       });

//       if (response.ok) {
//         alert('User registered successfully!');
//         // Reset form
//         setFormData({
//           email: '',
//           password: '',
//           firstName: '',
//           lastName: '',
//           phone: '',
//           custAddress: '',
//           role: 'CUSTOMER'
//         });
//       } else {
//         const err = await response.text();
//         throw new Error(err || 'Registration failed, please try again.');
//       }
//     } catch (error) {
//       console.error('Error registering user:', error);
//       alert('Failed to register user: ' + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="register-container">
//       <div className="register-form" style={{ height: "700px", width: "800px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
//         <h2 style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>USER REGISTRATION</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <div className="error" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />

//           <input
//             type="text"
//             name="firstName"
//             placeholder="First Name"
//             value={formData.firstName}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />

//           <input
//             type="text"
//             name="lastName"
//             placeholder="Last Name"
//             value={formData.lastName}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={formData.phone}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />

//           <input
//             type="text"
//             name="custAddress"
//             placeholder="Address"
//             value={formData.custAddress}
//             onChange={handleChange}
//             required
//             style={inputStyle}
//           />

//           <label style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>Select Role</label>
//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             required
//             style={{ ...inputStyle, marginBottom: '20px' }}
//           >
//             <option value="CUSTOMER">Customer</option>
//             <option value="VENDOR">Vendor</option>
//             <option value="ADMIN">Admin</option>
//           </select>

//           <button
//             type="submit"
//             disabled={loading || !isFormValid()}
//             style={{
//               backgroundColor: 'green',
//               color: 'white',
//               padding: '12px',
//               border: 'none',
//               borderRadius: '8px',
//               width: '100%',
//               cursor: 'pointer',
//               marginBottom: '10px'
//             }}
//           >
//             {loading ? 'Registering...' : 'Register'}
//           </button>

//           <Link to={'/manage-vendors'}>
//             <button type="button" style={{ width: "90px", backgroundColor: "green", color: "white", borderRadius: "5px", marginTop: "10px" }}>
//               Back
//             </button>
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Inline style for input fields
// const inputStyle = {
//   width: '100%',
//   padding: '10px',
//   marginBottom: '10px',
//   borderRadius: '8px',
//   border: '1px solid #ccc'
// };

// export default RegistrationForm;
import { Link } from 'react-router-dom';
import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',      // <-- use name only
    phone: '',
    custAddress: '',
    role: 'CUSTOMER'
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  // Simple form validation
  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.name &&      // <-- check name
      formData.phone &&
      formData.custAddress &&
      formData.role
    );
  };

   const handleSubmit = async (e) => {
  e.preventDefault();

  if (!isFormValid()) {
    setError('Please fill out all fields correctly.');
    return;
  }

  setLoading(true);

  try {
    // Use relative URL - the proxy will handle it
    const response = await fetch('/api/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role,
        custAddress: formData.custAddress,
        phone: formData.phone
      })
    });

    if (response.ok) {
      const message = await response.text();
      alert('User registered successfully!');
      setFormData({
        email: '',
        password: '',
        name: '',
        phone: '',
        custAddress: '',
        role: 'CUSTOMER'
      });
    } else {
      const errorText = await response.text();
      throw new Error(errorText || 'Registration failed');
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error.message.includes('Failed to fetch')) {
      alert('Cannot connect to server. Please ensure:\n1. Spring Boot backend is running on localhost:8080\n2. Restart React development server after backend starts');
    } else {
      alert('Failed to register user: ' + error.message);
    }
  } finally {
    setLoading(false);
  }
};

  // // Handle form submit
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!isFormValid()) {
  //     setError('Please fill out all fields correctly.');
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     // const response = await fetch('http://localhost:8080/api/users/add/users', {
  //      const response = await fetch('http://localhost:8080/api/users/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({
  //         email: formData.email,
  //         password: formData.password,
  //         name: formData.name,    // <-- send name
  //         role: formData.role,
  //         custAddress: formData.custAddress,
  //         phone: formData.phone
  //       })
  //     });

  //     if (response.ok) {
  //       alert('User registered successfully!');
  //       // Reset form
  //       setFormData({
  //         email: '',
  //         password: '',
  //         name: '',
  //         phone: '',
  //         custAddress: '',
  //         role: 'CUSTOMER'
  //       });
  //     } else {
  //       const err = await response.text();
  //       throw new Error(err || 'Registration failed, please try again.');
  //     }
  //   } catch (error) {
  //     console.error('Error registering user:', error);
  //     alert('Failed to register user: ' + error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="register-container">
      <div className="register-form" style={{ height: "700px", width: "800px", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px" }}>
        <h2 style={{ color: 'green', textAlign: 'center', marginBottom: '20px' }}>USER REGISTRATION</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="error" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="text"
            name="custAddress"
            placeholder="Address"
            value={formData.custAddress}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <label style={{ color: 'green', fontWeight: 'bold', marginTop: '10px' }}>Select Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            style={{ ...inputStyle, marginBottom: '20px' }}
          >
            <option value="CUSTOMER">Customer</option>
            <option value="VENDOR">Vendor</option>
            <option value="ADMIN">Admin</option>
          </select>

          <button
            type="submit"
            disabled={loading || !isFormValid()}
            style={{
              backgroundColor: 'green',
              color: 'white',
              padding: '12px',
              border: 'none',
              borderRadius: '8px',
              width: '20%',
              cursor: 'pointer',
              marginBottom: '10px'
            }}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          <Link to={'/manage-vendors'}>
            <button type="button" style={{width: '20%', backgroundColor: "green",marginLeft:"350px", color: "white", borderRadius: "5px", marginTop: "10px",height:"50px" }}>
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

// Inline style for input fields
const inputStyle = {
  width: '100%',
  padding: '10px',
  marginBottom: '10px',
  borderRadius: '8px',
  border: '1px solid #ccc'
};

export default RegistrationForm;
