// import React, { useState } from "react";
// import Navigation from "../navigation/Navigation";
// import bcrypt from "bcryptjs";

// const AddVendors = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstName: "",
//     lastName: "",
//     role: "VENDOR",
//     vendorType: "",
//     address: "",
//     vendorCompany: "",
//   });

//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setError("");
//   };

//   // Validation function
//   const isFormValid = () => {
//     return (
//       formData.email &&
//       formData.password &&
//       formData.confirmPassword &&
//       formData.firstName &&
//       formData.lastName &&
//       formData.password === formData.confirmPassword &&
//       formData.vendorType &&
//       formData.address &&
//       formData.vendorCompany
//     );
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!isFormValid()) {
//       setError("Please fill out all fields correctly and make sure passwords match.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Encrypt password before sending to backend
//       const hashedPassword = await bcrypt.hash(formData.password, 10);
//       const payload = { ...formData, password: hashedPassword };

//       const response = await fetch("http://localhost:8080/api/vendor/add/vendor", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (response.ok) {
//         alert("Vendor registered successfully!");
//         setFormData({
//           email: "",
//           password: "",
//           confirmPassword: "",
//           firstName: "",
//           lastName: "",
//           role: "VENDOR",
//           vendorType: "",
//           address: "",
//           vendorCompany: "",
//         });
//       } else {
//         throw new Error("Registration failed, please try again.");
//       }
//     } catch (error) {
//       console.error("Error registering vendor:", error);
//       alert("Failed to register vendor: " + error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Inline CSS styling
//   const styles = {
//     container: {
//       backgroundColor: "floralwhite",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       height: "100vh",
//       paddingTop: "70px",
//     },
//     formBox: {
//       backgroundColor: "white",
//       padding: "30px 40px",
//       borderRadius: "15px",
//       boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//       width: "420px",
//       textAlign: "center",
//     },
//     image: {
//       width: "90px",
//       height: "90px",
//       borderRadius: "15px",
//       marginBottom: "10px",
//     },
//     title: {
//       fontSize: "22px",
//       fontWeight: "bold",
//       marginBottom: "20px",
//       color: "darkslategray",
//     },
//     formGroup: {
//       marginBottom: "15px",
//       display: "flex",
//       flexDirection: "column",
//       alignItems: "center",
//     },
//     input: {
//       width: "100%",
//       padding: "10px",
//       borderRadius: "8px",
//       border: "1px solid lightgray",
//       outline: "none",
//       fontSize: "14px",
//     },
//     select: {
//       width: "100%",
//       padding: "10px",
//       borderRadius: "8px",
//       border: "1px solid lightgray",
//       outline: "none",
//       fontSize: "14px",
//     },
//     button: {
//       width: "100%",
//       padding: "10px",
//       backgroundColor: "palegreen",
//       border: "none",
//       borderRadius: "8px",
//       fontSize: "16px",
//       fontWeight: "bold",
//       cursor: "pointer",
//       color: "black",
//       transition: "0.3s",
//     },
//     buttonHover: {
//       backgroundColor: "#7ed957",
//     },
//     error: {
//       color: "red",
//       fontSize: "13px",
//       marginBottom: "10px",
//     },
//   };

//   return (
//     <>
//       <Navigation />
//       <div style={styles.container}>
//         <div style={styles.formBox}>
//           <img src="image1a.jpg" alt="Vendor" style={styles.image} />
//           <h2 style={styles.title}>Vendor Registration</h2>

//           <form onSubmit={handleSubmit}>
//             {error && <div style={styles.error}>{error}</div>}

//             <div style={styles.formGroup}>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 value={formData.email}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <input
//                 type="password"
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <input
//                 type="text"
//                 name="firstName"
//                 placeholder="First Name"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <input
//                 type="text"
//                 name="lastName"
//                 placeholder="Last Name"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <select
//                 name="vendorType"
//                 value={formData.vendorType}
//                 onChange={handleChange}
//                 style={styles.select}
//                 required
//               >
//                 <option value="">Select Vendor Type</option>
//                 <option value="Supplier">Supplier</option>
//                 <option value="Distributor">Distributor</option>
//                 <option value="Manufacturer">Manufacturer</option>
//               </select>
//             </div>

//             <div style={styles.formGroup}>
//               <input
//                 type="text"
//                 name="address"
//                 placeholder="Address"
//                 value={formData.address}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <input
//                 type="text"
//                 name="vendorCompany"
//                 placeholder="Vendor Company"
//                 value={formData.vendorCompany}
//                 onChange={handleChange}
//                 style={styles.input}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <button
//                 type="submit"
//                 style={styles.button}
//                 onMouseOver={(e) => (e.target.style.backgroundColor = "#7ed957")}
//                 onMouseOut={(e) => (e.target.style.backgroundColor = "palegreen")}
//                 disabled={loading}
//               >
//                 {loading ? "Registering..." : "Register"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddVendors;
import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import bcrypt from "bcryptjs";

const AddVendors = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    role: "VENDOR",
    vendorType: "",
    address: "",
    vendorCompany: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.firstName &&
      formData.lastName &&
      formData.password === formData.confirmPassword &&
      formData.vendorType &&
      formData.address &&
      formData.vendorCompany
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setError(
        "Please fill out all fields correctly and make sure passwords match."
      );
      return;
    }

    setLoading(true);
    try {
      const hashedPassword = await bcrypt.hash(formData.password, 10);
      const payload = { ...formData, password: hashedPassword };

      const response = await fetch(
        "http://localhost:8080/api/vendor/add/vendor",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Vendor registered successfully!");
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          firstName: "",
          lastName: "",
          role: "VENDOR",
          vendorType: "",
          address: "",
          vendorCompany: "",
        });
      } else {
        throw new Error("Registration failed, please try again.");
      }
    } catch (error) {
      console.error("Error registering vendor:", error);
      alert("Failed to register vendor: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    container: {
      backgroundColor: "floralwhite",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      paddingTop: "70px",
    },
    formBox: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "15px",
      boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
      width: "850px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    image: {
      width: "90px",
      height: "90px",
      borderRadius: "15px",
      marginBottom: "15px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "25px",
      color: "darkslategray",
    },
    formRow: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      gap: "20px",
    },
    formGroup: {
      flex: 1,
      marginBottom: "20px",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid lightgray",
      outline: "none",
      fontSize: "14px",
    },
    select: {
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid lightgray",
      outline: "none",
      fontSize: "14px",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "palegreen",
      border: "none",
      borderRadius: "8px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
      color: "black",
      transition: "0.3s",
    },
    error: {
      color: "red",
      fontSize: "13px",
      marginBottom: "10px",
      textAlign: "center",
    },
  };

  return (
    <>
      <Navigation />
      <div style={styles.container}>
        <div style={styles.formBox}>
          <img src="image1a.jpg" alt="Vendor" style={styles.image} />
          <h2 style={styles.title}>Vendor Registration</h2>

          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {error && <div style={styles.error}>{error}</div>}

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>

              <div style={styles.formGroup}>
                <select
                  name="vendorType"
                  value={formData.vendorType}
                  onChange={handleChange}
                  style={styles.select}
                  required
                >
                  <option value="">Select Vendor Type</option>
                  <option value="Supplier">Supplier</option>
                  <option value="Distributor">Distributor</option>
                  <option value="Manufacturer">Manufacturer</option>
                </select>
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="vendorCompany"
                  placeholder="Vendor Company"
                  value={formData.vendorCompany}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
              <div style={styles.formGroup}>
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  style={styles.input}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              style={styles.button}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#7ed957")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "palegreen")}
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddVendors;
