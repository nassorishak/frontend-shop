// import React, { useState } from 'react';
// import Navigation from '../navigation/Navigation';
// import { useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';

// const MakeOrder = () => {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const customerId = localStorage.getItem("customerId");
//   const [order, setOrder] = useState({
//     date: "",
//     status: "pending",
//     quantity: 1,
//     size: "",
//     orderType: "",
//     controlNumber: "", 
//     customer: {
//       userId: parseInt(customerId)
//     },
//     product: {
//       productId: parseInt(productId)
//     }
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setOrder(prevOrder => ({
//       ...prevOrder,
//       [name]: value
//     }));
//   };

//   const generateControlNumber = () => {
//     const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
//     const randomPart = Math.floor(100 + Math.random() * 900); // Generate a random 3-digit number
//     return `IS-HAK-${datePart}${randomPart}`;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!order.date || !order.quantity || !order.size || !order.orderType) {
//       alert("Please fill all the fields.");
//       return;
//     }

//     const controlNumber = generateControlNumber();

//     const orderToSend = {
//       ...order,
//       quantity: parseInt(order.quantity),
//       controlNumber, // Add the generated controlNumber to the order
//       customer: { userId: parseInt(customerId) },
//       product: { productId: parseInt(productId) }
//     };

//     console.log("Order being sent:", orderToSend);

//     try {
//       const response = await axios.post('http://localhost:8080/api/orders/add/orders', orderToSend);
//       console.log(response.data);
//       alert("Inserted Successfully");

//       setOrder({
//         date: "",
//         status: "pending",
//         quantity: 1,
//         size: "",
//         orderType: "",
//         controlNumber: "",
//         customer: { userId: parseInt(customerId) },
//         product: { productId: parseInt(productId) }
//       });
//       navigate("/viewOrder");
//     } catch (error) {
//       console.error("Error adding order:", error);
//       alert("Error adding order: " + (error.response ? error.response.data : error.message));
//     }
//   };

//   return (
//     <div>
//       <Navigation />
//       <div className='main' style={{ backgroundColor: "whitesmoke" }}>
//         <h3 style={{ textAlign: "center", marginTop: "15px" }}>CUSTOMER MAKE ORDER {productId}</h3>
//         {/* <p>Product Id: {productId}, Customer Id: {customerId}</p> */}
//         <form onSubmit={handleSubmit} style={{ width: "400px", margin: "0 auto" }}>
//           {/* Input fields for order details */}
//           <div>
//             <label>Date:</label>
//             <input
//               type="date"
//               name="date"
//               value={order.date}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div>
//             <label>Order Type:</label>
//             <select 
//               id="orderType" 
//               name="orderType" 
//               value={order.orderType}
//               onChange={handleChange}
//             >
//               <option value="">Select Order Type</option>
//               <option value="delivery">Delivery</option>
//               <option value="nonDelivery">Non-Delivery</option>
//             </select>
//           </div>
//           <div>
//             <label>Quantity:</label>
//             <input
//               type="number"
//               name="quantity"
//               value={order.quantity}
//               onChange={handleChange}
//               min="1"
//               required
//             />
//           </div>
//           <div>
//             <label>Size:</label>
//             <input
//               type="text"
//               name="size"
//               value={order.size}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <button 
//             type="submit"
//             disabled={!order.date || !order.quantity || !order.size || !order.orderType} 
//             style={{ marginLeft: "140px", backgroundColor: "grey", color: "black", marginTop: "15px", width: "100px", borderRadius: "20px" }}
//           >
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default MakeOrder;
import React, { useState } from "react";
import Navigation from "../navigation/Navigation";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MakeOrder = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  const [order, setOrder] = useState({
    date: "",
    status: "pending",
    quantity: 1,
    size: "",
    orderType: "",
    controlNumber: "",
    customer: {
      userId: parseInt(customerId),
    },
    product: {
      productId: parseInt(productId),
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const generateControlNumber = () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(100 + Math.random() * 900);
    return `IS-HAK-${datePart}${randomPart}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!order.date || !order.quantity || !order.size || !order.orderType) {
      alert("Please fill all the fields.");
      return;
    }

    const controlNumber = generateControlNumber();

    const orderToSend = {
      ...order,
      quantity: parseInt(order.quantity),
      controlNumber,
      customer: { userId: parseInt(customerId) },
      product: { productId: parseInt(productId) },
    };

    try {
      await axios.post(
        "http://localhost:8080/api/orders/add/orders",
        orderToSend
      );
      alert("Inserted Successfully");

      setOrder({
        date: "",
        status: "pending",
        quantity: 1,
        size: "",
        orderType: "",
        controlNumber: "",
        customer: { userId: parseInt(customerId) },
        product: { productId: parseInt(productId) },
      });
      navigate("/viewOrder");
    } catch (error) {
      console.error("Error adding order:", error);
      alert(
        "Error adding order: " +
          (error.response ? error.response.data : error.message)
      );
    }
  };

  return (
    <div>
      <Navigation />
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #f0f4f7, #dbeafe)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <div
          style={{
            backgroundColor: "#dae5e7ff",
            padding: "30px",
            borderRadius: "15px",
            boxShadow: "0 8px 20px rgba(251, 246, 246, 0.1)",
            width: "100%",
            marginLeft:"150px",
            maxWidth: "750px",
          }}
        >
          <h2
            style={{
              textAlign: "center",
              marginBottom: "25px",
              color: "#1f2937",
              fontWeight: "600",
            }}
          >
            Make Order
          </h2>
          <form onSubmit={handleSubmit}>
            {/* Date */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Date:
              </label>
              <input
                type="date"
                name="date"
                value={order.date}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                }}
              />
            </div>

            {/* Order Type */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Order Type:
              </label>
              <select
                id="orderType"
                name="orderType"
                value={order.orderType}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                  backgroundColor: "white",
                }}
              >
                <option value="">Select Order Type</option>
                <option value="delivery">Delivery</option>
                <option value="nonDelivery">Non-Delivery</option>
              </select>
            </div>

            {/* Quantity */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Quantity:
              </label>
              <input
                type="number"
                name="quantity"
                value={order.quantity}
                onChange={handleChange}
                min="1"
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                }}
              />
            </div>

            {/* Size */}
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Size:
              </label>
              <input
                type="text"
                name="size"
                value={order.size}
                onChange={handleChange}
                required
                placeholder="Enter size (e.g. Small, Medium, Large)"
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #d1d5db",
                  outline: "none",
                }}
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={
                !order.date || !order.quantity || !order.size || !order.orderType
              }
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                backgroundColor:
                  !order.date || !order.quantity || !order.size || !order.orderType
                    ? "#9ca3af"
                    : "#2563eb",
                color: "white",
                fontWeight: "600",
                border: "none",
                cursor:
                  !order.date || !order.quantity || !order.size || !order.orderType
                    ? "not-allowed"
                    : "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Submit Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MakeOrder;
