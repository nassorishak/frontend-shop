// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navigation from "../navigation/Navigation"; // adjust if needed

// const AddPurchase = () => {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     productId: "",
//     quantity: "",
//     purchasePrice: "",
//     supplier: "",
//     purchaseDate: "",
//   });
//   const [message, setMessage] = useState("");

//   // ✅ Fetch products for dropdown - CORRECTED ENDPOINT
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/product/get/product") // Fixed endpoint
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   // ✅ Handle change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // ✅ Handle submit - Enhanced error handling
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const purchasePayload = {
//       product: { productId: parseInt(formData.productId) },
//       quantity: parseInt(formData.quantity),
//       purchasePrice: parseFloat(formData.purchasePrice),
//       supplier: formData.supplier,
//       purchaseDate: formData.purchaseDate,
//     };
//     console.log('Payload to send:', purchasePayload);
//     try {
//       await axios.post(
//         "http://localhost:8080/api/purchases/add-purchase",
//         purchasePayload
//       );
//       setMessage("✅ Purchase added successfully!");
//       setFormData({
//         productId: "",
//         quantity: "",
//         purchasePrice: "",
//         supplier: "",
//         purchaseDate: "",
//       });
//     } catch (error) {
//       console.error("Full error details:", error);
//       if (error.response) {
//         // The server responded with an error status
//         console.error("Server response data:", error.response.data);
//         console.error("Server response status:", error.response.status);
//         setMessage(`❌ Server error: ${error.response.status} - ${error.response.data.message || 'Check server logs'}`);
//       } else if (error.request) {
//         // The request was made but no response was received
//         console.error("No response received:", error.request);
//         setMessage("❌ No response from server. Is it running?");
//       } else {
//         // Something happened in setting up the request
//         console.error("Request setup error:", error.message);
//         setMessage("❌ Request error: " + error.message);
//       }
//     }
//   };

//   return (
//     <div style={{ padding: "30px", fontFamily: "Arial, sans-serif" }}>
//       <Navigation />
//       <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
//         Add New Purchase
//       </h2>

//       {message && (
//         <p
//           style={{
//             textAlign: "center",
//             color: message.startsWith("✅") ? "green" : "red",
//             fontWeight: "bold",
//           }}
//         >
//           {message}
//         </p>
//       )}

//       <form
//         onSubmit={handleSubmit}
//         style={{
//           maxWidth: "1100px",
//           margin: "0 auto",
//           backgroundColor: "#f9f9f9",
//           padding: "25px",
//           marginLeft: "360px",
//           borderRadius: "12px",
//           width: "1100px",
//           boxShadow: "0 4px 8px rgba(182, 182, 181, 1)",
//           display: "grid",
//           gap: "15px",
//         }}
//       >
//         {/* Product Dropdown */}
//         <label style={{ fontWeight: "bold" }}>Select Product</label>
//         <select
//           name="productId"
//           value={formData.productId}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         >
//           <option value="">-- Choose Product --</option>
//           {products.map((p) => (
//             <option key={p.productId} value={p.productId}>
//               {p.productName} ({p.productCompany})
//             </option>
//           ))}
//         </select>

//         {/* Quantity */}
//         <label style={{ fontWeight: "bold" }}>Quantity</label>
//         <input
//           type="number"
//           name="quantity"
//           placeholder="Enter quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />

//         {/* Purchase Price */}
//         <label style={{ fontWeight: "bold" }}>Purchase Price</label>
//         <input
//           type="number"
//           step="0.01"
//           name="purchasePrice"
//           placeholder="Enter purchase price"
//           value={formData.purchasePrice}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />

//         {/* Supplier */}
//         <label style={{ fontWeight: "bold" }}>Supplier</label>
//         <input
//           type="text"
//           name="supplier"
//           placeholder="Enter supplier name"
//           value={formData.supplier}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />

//         {/* Purchase Date */}
//         <label style={{ fontWeight: "bold" }}>Purchase Date</label>
//         <input
//           type="date"
//           name="purchaseDate"
//           value={formData.purchaseDate}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "10px",
//             borderRadius: "8px",
//             border: "1px solid #ccc",
//           }}
//         />

//         {/* Submit button */}
//         <button
//           type="submit"
//           style={{
//             padding: "12px",
//             backgroundColor: "#28a745",
//             color: "white",
//             fontWeight: "bold",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             transition: "0.3s",
//           }}
//           onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
//           onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
//         >
//           Add Purchase
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddPurchase;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../navigation/Navigation"; // adjust if needed

const AddPurchase = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    purchasePrice: "",
    supplier: "",
    purchaseDate: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Fetch products for dropdown
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product/get/product") // Fixed endpoint
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const purchasePayload = {
      product: { productId: parseInt(formData.productId) },
      quantity: parseInt(formData.quantity),
      purchasePrice: parseFloat(formData.purchasePrice),
      supplier: formData.supplier,
      purchaseDate: formData.purchaseDate,
    };
    console.log("Payload to send:", purchasePayload);

    try {
      await axios.post(
        "http://localhost:8080/api/purchases/add-purchase",
        purchasePayload
      );
      setMessage("✅ Purchase added successfully!");
      setFormData({
        productId: "",
        quantity: "",
        purchasePrice: "",
        supplier: "",
        purchaseDate: "",
      });
    } catch (error) {
      console.error("Full error details:", error);
      if (error.response) {
        setMessage(
          `❌ Server error: ${error.response.status} - ${
            error.response.data.message || "Check server logs"
          }`
        );
      } else if (error.request) {
        setMessage("❌ No response from server. Is it running?");
      } else {
        setMessage("❌ Request error: " + error.message);
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh", // full screen height
        width: "100vw", // full screen width
        display: "flex",
        flexDirection: "column",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Navigation />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflowY: "auto",
          padding: "20px",
        }}
      >
        <h2 style={{ marginBottom: "1px", color: "#449ca6ff",marginLeft:"1550px" }}>
          ADD PURCHASE
        </h2>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.startsWith("✅") ? "green" : "red",
              fontWeight: "bold",
              marginBottom: "20px",
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "800px", // keeps it centered and not too wide
            backgroundColor: "#99ada6ff",
            padding: "30px",
            marginLeft:"220px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "grid",
            gap: "15px",
          }}
        >
          {/* Product Dropdown */}
          <label style={{ fontWeight: "bold" }}>Select Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">-- Choose Product --</option>
            {products.map((p) => (
              <option key={p.productId} value={p.productId}>
                {p.productName} ({p.productCompany})
              </option>
            ))}
          </select>

          {/* Quantity */}
          <label style={{ fontWeight: "bold" }}>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {/* Purchase Price */}
          <label style={{ fontWeight: "bold" }}>Purchase Price</label>
          <input
            type="number"
            step="0.01"
            name="purchasePrice"
            placeholder="Enter purchase price"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {/* Supplier */}
          <label style={{ fontWeight: "bold" }}>Supplier</label>
          <input
            type="text"
            name="supplier"
            placeholder="Enter supplier name"
            value={formData.supplier}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {/* Purchase Date */}
          <label style={{ fontWeight: "bold" }}>Purchase Date</label>
          <input
            type="date"
            name="purchaseDate"
            value={formData.purchaseDate}
            onChange={handleChange}
            required
            style={{
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          {/* Submit button */}
          <button
            type="submit"
            style={{
              padding: "12px",
              backgroundColor: "#7ca6b7ff",
              color: "white",
              fontWeight: "bold",
              border: "none",
              marginLeft:"290px",
              width:"150px",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.target.style.backgroundColor = "#218838")
            }
            onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
          >
            Add Purchase
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPurchase;
