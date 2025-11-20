// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Navigation from '../navigation/Navigation';
// import { Modal, Button, Form } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Link } from 'react-router-dom';


// const ManageVendors = () => {
//     const [users, setUsers] = useState([]);
//     const [selectedUser, setSelectedUser] = useState(null);
//     const [formData, setFormData] = useState({
//         userId: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         password: '',
//         confirmPassword: '', // Added confirmPassword
//         role: 'VENDOR', // Static role
//         vendorType: '', // New field
//         address: '', // New field
//         vendorCompany: '', // New field
//         status: 'Active' // Default status
//     });

//     const handleBlock = async (userId) => {
//         try {
//             await axios.put(`http://localhost:8080/api/vendor/block/${userId}`);
//             setUsers(users.map(user => 
//                 user.userId === userId ? { ...user, status: 'Blocked' } : user
//             ));
//         } catch (error) {
//             console.error('Error blocking user:', error);
//         }
//     };

//     const handleUnblock = async (userId) => {
//         try {
//             await axios.put(`http://localhost:8080/api/vendor/unblock/${userId}`);
//             setUsers(users.map(user => 
//                 user.userId === userId ? { ...user, status: 'Active' } : user
//             ));
//         } catch (error) {
//             console.error('Error unblocking user:', error);
//         }
//     };

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/api/vendor/get/vendors');
//             setUsers(response.data);
//         } catch (error) {
//             console.error('Error fetching users:', error);
//         }
//     };

//     const handleDelete = async (userId) => {
//         try {
//             await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
//             setUsers(users.filter(user => user.userId !== userId)); // Update the state locally
//         } catch (error) {
//             console.error('Error deleting user:', error);
//         }
//     };

//     const handleEdit = (user) => {
//         setSelectedUser(user);
//         setFormData({
//             userId: user.userId || '',
//             email: user.email || '',
//             firstName: user.firstName || '',
//             lastName: user.lastName || '',
//             password: user.password || '',
//             confirmPassword: '',
//             role: user.role || 'VENDOR',
//             vendorType: user.vendorType || '',
//             address: user.address || '',
//             vendorCompany: user.vendorCompany || '',
//             status: user.status || 'Active'
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleUpdateSubmit = async (e) => {
//         e.preventDefault();

//         const { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany } = formData;

//         const requiredFields = { email, firstName, lastName, password, confirmPassword, vendorType, address, vendorCompany };

//         for (let field in requiredFields) {
//             if (!requiredFields[field]) {
//                 alert(`${field} is required.`);
//                 return;
//             }
//         }

//         if (password !== confirmPassword) {
//             alert("Passwords do not match.");
//             return;
//         }

//         try {
//             await axios.put(`http://localhost:8080/api/users/update/${formData.userId}`, {
//                 email,
//                 firstName,
//                 lastName,
//                 password,
//                 role: formData.role,
//                 vendorType,
//                 address,
//                 vendorCompany,
//                 status: formData.status
//             });
//             setSelectedUser(null);
//             fetchUsers();
//             setFormData({
//                 userId: '',
//                 email: '',
//                 firstName: '',
//                 lastName: '',
//                 password: '',
//                 confirmPassword: '',
//                 role: 'VENDOR',
//                 vendorType: '',
//                 address: '',
//                 vendorCompany: '',
//                 status: 'Active'
//             });
//         } catch (error) {
//             console.error('Error updating user:', error);
//             alert('Error updating user: ' + error.message);
//         }
//     };

//     return (
//         <>
//             <Navigation />
//             <div className='main' style={{ backgroundColor: "grey", height: "455px", overflowY: "scroll",marginLeft:"10px",marginBottom:"250px" }}>
//                 <div style={{ display: "flex", flexDirection: "row" }}>
//                     <h2 style={{ textAlign: "center", marginTop: "15px", marginLeft: "200px" }}>MANAGE VENDORS</h2>
//                     <Link to={'/add-vendors'}>
//                         <button type='submit' name='submit' className="custom-button" style={{width:"200px",marginTop:"15px",float:"right",backgroundColor:"white",color:"black", borderRadius:"5px"}}>MANAGE VENDER Vendors</button>
//                     </Link>
//                       <Link to={'/registerform'}>
//                         <button type='submit' name='submit' className="custom-button" style={{width:"113px",marginTop:"15px",float:"right",backgroundColor:"white",color:"black", borderRadius:"5px"}}>ADD USERS</button>
//                     </Link>
//                 </div>
//                 <table className="table table-bordered" style={{ width: "1000px", marginLeft:"12px", margin: "auto", backgroundColor: "white" }}>
//                     <thead>
//                         <tr>
//                             <th>First Name</th>
//                             <th>Last Name</th>
//                             <th>Email</th>
//                             <th>Vendor Type</th>
//                             <th>Address</th>
//                             <th style={{width:"300px"}}>Company</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {users.map(user => (
//                             <tr key={user.userId}>
//                                 <td>{user.firstName}</td>
//                                 <td>{user.lastName}</td>
//                                 <td>{user.email}</td>
//                                 <td>{user.vendorType || 'N/A'}</td>
//                                 <td>{user.address || 'N/A'}</td>
//                                 <td>{user.vendorCompany || 'N/A'}</td>
//                                 <td>{user.status || 'Active'}</td>
//                                 <td style={{ display: "flex", justifyContent: "space-around",marginRight:"85px" }}>
//                                     <Button className="custom-button" onClick={() => handleEdit(user)} style={{backgroundColor:"green"}}>Edit</Button>
//                                     <Button className="custom-button-danger" onClick={() => handleDelete(user.userId)} style={{backgroundColor:"red"}}>Delete</Button>
//                                     <Button className="custom-button-warning" onClick={() => handleBlock(user.userId)} style={{backgroundColor:"black"}}>Block</Button>
//                                     <Button className="custom-button-success" onClick={() => handleUnblock(user.userId)}style={{width:"75px"}}>Active</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>

//                 <Modal
//                     show={!!selectedUser}
//                     onHide={() => setSelectedUser(null)}
//                     centered
//                 >
//                     <Modal.Header closeButton>
//                         <Modal.Title>Edit User</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body style={{ width: "450px", marginRight: "2000px" }}>
//                         <Form onSubmit={handleUpdateSubmit}>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Email</Form.Label>
//                                 <Form.Control
//                                     type="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     placeholder="Email"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>First Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="firstName"
//                                     value={formData.firstName}
//                                     onChange={handleInputChange}
//                                     placeholder="First Name"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Last Name</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="lastName"
//                                     value={formData.lastName}
//                                     onChange={handleInputChange}
//                                     placeholder="Last Name"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     placeholder="Password"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Confirm Password</Form.Label>
//                                 <Form.Control
//                                     type="password"
//                                     name="confirmPassword"
//                                     value={formData.confirmPassword}
//                                     onChange={handleInputChange}
//                                     placeholder="Confirm Password"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Vendor Type</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="vendorType"
//                                     value={formData.vendorType}
//                                     onChange={handleInputChange}
//                                     placeholder="Vendor Type"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Address</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="address"
//                                     value={formData.address}
//                                     onChange={handleInputChange}
//                                     placeholder="Address"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Vendor Company</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="vendorCompany"
//                                     value={formData.vendorCompany}
//                                     onChange={handleInputChange}
//                                     placeholder="Vendor Company"
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group className="mb-3">
//                                 <Form.Label>Status</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     name="status"
//                                     value={formData.status}
//                                     onChange={handleInputChange}
//                                     placeholder="Status"
//                                     readOnly
//                                 />
//                             </Form.Group>
//                             <Modal.Footer>
//                                 <Button className="custom-button" type="submit">
//                                     Update User
//                                 </Button>
//                                 <Button className="custom-button-danger" onClick={() => setSelectedUser(null)}>
//                                     Cancel
//                                 </Button>
//                             </Modal.Footer>
//                         </Form>
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         </>
//     );
// };

// export default ManageVendors;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../navigation/Navigation';
import { Modal, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const ManageVendors = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    userId: '',
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    role: 'VENDOR',
    vendorType: '',
    address: '',
    vendorCompany: '',
    status: 'Active',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/vendor/get/vendors');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/users/delete/${userId}`);
      setUsers(users.filter((user) => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleBlock = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/vendor/block/${userId}`);
      setUsers(users.map((u) => (u.userId === userId ? { ...u, status: 'Blocked' } : u)));
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblock = async (userId) => {
    try {
      await axios.put(`http://localhost:8080/api/vendor/unblock/${userId}`);
      setUsers(users.map((u) => (u.userId === userId ? { ...u, status: 'Active' } : u)));
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      userId: user.userId || '',
      email: user.email || '',
      firstName: user.name || '',
      password: user.password || '',
      confirmPassword: '',
      role: user.role || 'VENDOR',
      vendorType: user.vendorType || '',
      address: user.address || '',
      vendorCompany: user.vendorCompany || '',
      status: user.status || 'Active',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const {
      email,
      name,
      password,
      confirmPassword,
      vendorType,
      address,
      vendorCompany,
    } = formData;

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      await axios.put(`http://localhost:8080/api/users/update/${formData.userId}`, {
        email,
        name,
        password,
        role: formData.role,
        vendorType,
        address,
        vendorCompany,
        status: formData.status,
      });
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  
  return (
    <>
      <Navigation />
      <div style={styles.main}>
        <div style={styles.headerRow}>
          <h2 style={styles.title}>VENDORS LIST</h2>
          <div>
            <Link to="/add-vendors">
              <button style={{ ...styles.btn, backgroundColor: '#776f6fff', color: '#f7e9e9ff',marginTop:"20px",marginRight:"30px",marginLeft:"500px",width:"150px" }}>
                MANAGE VENDOR
              </button>
            </Link>
            <Link to="/registerform">
              <button style={{ ...styles.btn, backgroundColor: '#007bff', color: 'white' }}>
                ADD USER
              </button>
            </Link>
          </div>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead style={styles.thead}>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Vendor Type</th>
                <th>Address</th>
                <th>Company</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.userId} style={styles.row}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.vendorType || 'N/A'}</td>
                  <td>{user.address || 'N/A'}</td>
                  <td>{user.vendorCompany || 'N/A'}</td>
                  <td style={{ color: user.status === 'Blocked' ? 'red' : 'green', fontWeight: 'bold' }}>
                    {user.status || 'Active'}
                  </td>
                  <td style={styles.actions}>
                    <button style={{ ...styles.actionBtn, backgroundColor: '#28a745' }} onClick={() => handleEdit(user)}>
                      Edit
                    </button>
                    <button style={{ ...styles.actionBtn, backgroundColor: '#dc3545' }} onClick={() => handleDelete(user.userId)}>
                      Delete
                    </button>
                    <button style={{ ...styles.actionBtn, backgroundColor: '#343a40' }} onClick={() => handleBlock(user.userId)}>
                      Block
                    </button>
                    <button style={{ ...styles.actionBtn, backgroundColor: '#17a2b8',marginRight:"190px"}} onClick={() => handleUnblock(user.userId)}>
                      Active
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal show={!!selectedUser} onHide={() => setSelectedUser(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Vendor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleUpdateSubmit}>
              {[
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'name', name: 'name', type: 'text' },

                { label: 'Password', name: 'password', type: 'password' },
                { label: 'Confirm Password', name: 'confirmPassword', type: 'password' },
                { label: 'Vendor Type', name: 'vendorType', type: 'text' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'Vendor Company', name: 'vendorCompany', type: 'text' },
              ].map((f, i) => (
                <Form.Group className="mb-3" key={i}>
                  <Form.Label>{f.label}</Form.Label>
                  <Form.Control
                    type={f.type}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleInputChange}
                    placeholder={f.label}
                    required
                  />
                </Form.Group>
              ))}
              <Modal.Footer>
                <Button style={{ backgroundColor: '#28a745', border: 'none' }} type="submit">
                  Update
                </Button>
                <Button style={{ backgroundColor: '#dc3545', border: 'none' }} onClick={() => setSelectedUser(null)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

// 💅 Internal CSS styles
const styles = {
  main: {
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    padding: '20px',
    marginLeft:"220px",
    width:"1650px",
  },
  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    padding: '15px 25px',
    borderRadius: '10px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  title: {
    fontWeight: 'bold',
    color: '#a28686ff',
    marginTop:"20px",
    letterSpacing: '1px',
  },
  btn: {
    padding: '8px 15px',
    marginLeft: '10px',
    borderRadius: '8px',
    border: 'none',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: '0.3s',
  },
  tableContainer: {
    overflowX: 'auto',
    borderRadius: '10px',
    backgroundColor: '#fff',
    padding: '15px',
    boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'center',
  },
  thead: {
    backgroundColor: '#007bff',
    color: 'black',
  },
  row: {
    transition: '0.3s',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  actionBtn: {
    border: 'none',
    color: 'white',
    borderRadius: '6px',
    padding: '5px 10px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: '0.3s',
  },
};

export default ManageVendors;


