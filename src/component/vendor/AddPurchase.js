// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Navigation from "../navigation/Navigation";

// const AddPurchase = () => {
//   const [products, setProducts] = useState([]);
//   const [formData, setFormData] = useState({
//     productId: "",
//     quantity: "",
//     purchasePrice: "",
//     sellingPrice: "",
//     supplier: "",
//     purchaseDate: "",
//     productCompany: "",
//     currentStock: "",
//   });
//   const [message, setMessage] = useState("");

//   // ✅ Fetch products
//   useEffect(() => {
//     axios
//       .get("http://localhost:8080/api/product/get/product")
//       .then((res) => setProducts(res.data))
//       .catch((err) => console.error("Error fetching products:", err));
//   }, []);

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // If product is selected, fetch all relevant product data
//     if (name === "productId") {
//       const selected = products.find(
//         (p) => p.productId === parseInt(value)
//       );
      
//       // Try to get supplier from different possible fields
//       const productSupplier = selected ? 
//         (selected.supplier || selected.productSupplier || selected.productCompany || "") : "";

//       setFormData({
//         ...formData,
//         productId: value,
//         sellingPrice: selected ? selected.sellingPrice || "" : "",
//         purchasePrice: selected ? selected.latestPurchasePrice || "" : "",
//         productCompany: selected ? selected.productCompany || "" : "",
//         currentStock: selected ? selected.stockQuantity || 0 : 0,
//         supplier: productSupplier, // Auto-fill supplier
//         // Keep existing quantity if user already entered something, otherwise reset
//         quantity: formData.quantity || "",
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Use the purchase price from form (user can override the auto-filled value)
//     const finalPurchasePrice = formData.purchasePrice || 
//       (products.find(p => p.productId === parseInt(formData.productId))?.latestPurchasePrice || 0);
    
//     // Use the selling price from form (user can override the auto-filled value)
//     const finalSellingPrice = formData.sellingPrice || 
//       (products.find(p => p.productId === parseInt(formData.productId))?.sellingPrice || 0);

//     const purchasePayload = {
//       product: { productId: parseInt(formData.productId) },
//       quantity: parseInt(formData.quantity),
//       purchasePrice: parseFloat(finalPurchasePrice),
//       sellingPrice: parseFloat(finalSellingPrice),
//       supplier: formData.supplier,
//       purchaseDate: formData.purchaseDate,
//     };
    
//     console.log("Payload to send:", purchasePayload);

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
//         sellingPrice: "",
//         supplier: "",
//         purchaseDate: "",
//         productCompany: "",
//         currentStock: "",
//       });
//     } catch (error) {
//       console.error("Full error details:", error);
//       if (error.response) {
//         setMessage(
//           `❌ Server error: ${error.response.status} - ${
//             error.response.data.message || "Check server logs"
//           }`
//         );
//       } else if (error.request) {
//         setMessage("❌ No response from server. Is it running?");
//       } else {
//         setMessage("❌ Request error: " + error.message);
//       }
//     }
//   };

//   // ✅ Get supplier options from products (unique suppliers)
//   const getSupplierOptions = () => {
//     const suppliers = new Set();
//     products.forEach(product => {
//       if (product.supplier) suppliers.add(product.supplier);
//       if (product.productSupplier) suppliers.add(product.productSupplier);
//       if (product.productCompany) suppliers.add(product.productCompany);
//     });
//     return Array.from(suppliers).sort();
//   };

//   const supplierOptions = getSupplierOptions();

//   return (
//     <div
//       style={{
//         height: "100vh",
//         width: "100vw",
//         display: "flex",
//         flexDirection: "column",
//         fontFamily: "Arial, sans-serif",
//         backgroundColor: "#f0f2f5",
//       }}
//     >
//       <Navigation />

//       <div
//         style={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           overflowY: "auto",
//           padding: "20px",
//         }}
//       >
//         <h2
//           style={{
//             marginBottom: "1px",
//             color: "#449ca6ff",
//             marginLeft: "1550px",
//           }}
//         >
//           ADD PURCHASE
//         </h2>

//         {message && (
//           <p
//             style={{
//               textAlign: "center",
//               color: message.startsWith("✅") ? "green" : "red",
//               fontWeight: "bold",
//               marginBottom: "20px",
//             }}
//           >
//             {message}
//           </p>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           style={{
//             width: "100%",
//             maxWidth: "800px",
//             backgroundColor: "#99ada6ff",
//             padding: "30px",
//             marginLeft: "220px",
//             borderRadius: "12px",
//             boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
//             display: "grid",
//             gap: "15px",
//           }}
//         >
//           {/* Product Dropdown */}
//           <label style={{ fontWeight: "bold" }}>Select Product</label>
//           <select
//             name="productId"
//             value={formData.productId}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "10px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//             }}
//           >
//             <option value="">-- Choose Product --</option>
//             {products.map((p) => (
//               <option key={p.productId} value={p.productId}>
//                 {p.productName} ({p.productCompany}) - Stock: {p.stockQuantity || 0}
//               </option>
//             ))}
//           </select>

//           {/* Product Company (Display only) */}
//           {formData.productCompany && (
//             <div>
//               <label style={{ fontWeight: "bold" }}>Product Company</label>
//               <div
//                 style={{
//                   padding: "10px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   backgroundColor: "#e9ecef",
//                   fontWeight: "bold",
//                   color: "#495057",
//                 }}
//               >
//                 {formData.productCompany}
//               </div>
//             </div>
//           )}

//           {/* Current Stock (Display only) */}
//           {formData.productId && (
//             <div>
//               <label style={{ fontWeight: "bold" }}>Current Stock</label>
//               <div
//                 style={{
//                   padding: "10px",
//                   borderRadius: "8px",
//                   border: "1px solid #ccc",
//                   backgroundColor: formData.currentStock > 0 ? "#d4edda" : "#f8d7da",
//                   fontWeight: "bold",
//                   color: formData.currentStock > 0 ? "#155724" : "#721c24",
//                 }}
//               >
//                 {formData.currentStock} units
//                 {formData.currentStock === 0 && (
//                   <span style={{ fontSize: "12px", marginLeft: "10px", fontStyle: "italic" }}>
//                     (Out of stock)
//                   </span>
//                 )}
//                 {formData.currentStock > 0 && formData.currentStock < 10 && (
//                   <span style={{ fontSize: "12px", marginLeft: "10px", fontStyle: "italic" }}>
//                     (Low stock)
//                   </span>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Purchase Price (Auto-filled from ViewProducts but editable) */}
//           <div>
//             <label style={{ fontWeight: "bold" }}>Purchase Price</label>
//             <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
//               Auto-filled from product's latest purchase price
//             </div>
//             <input
//               type="number"
//               step="0.01"
//               name="purchasePrice"
//               placeholder="Enter purchase price"
//               value={formData.purchasePrice}
//               onChange={handleChange}
//               required
//               style={{
//                 padding: "10px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//                 backgroundColor: formData.productId ? "#f8f9fa" : "white",
//               }}
//             />
//           </div>

//           {/* Selling Price (Auto-filled from ViewProducts but editable) */}
//           <div>
//             <label style={{ fontWeight: "bold" }}>Selling Price</label>
//             <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
//               Auto-filled from product's selling price
//             </div>
//             <input
//               type="number"
//               step="0.01"
//               name="sellingPrice"
//               placeholder="Enter selling price"
//               value={formData.sellingPrice}
//               onChange={handleChange}
//               required
//               style={{
//                 padding: "10px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//                 backgroundColor: formData.productId ? "#f8f9fa" : "white",
//               }}
//             />
//           </div>

//           {/* Purchase Quantity */}
//           <div>
//             <label style={{ fontWeight: "bold" }}>Purchase Quantity</label>
//             <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
//               Enter the quantity you want to purchase
//             </div>
//             <input
//               type="number"
//               name="quantity"
//               placeholder="Enter purchase quantity"
//               value={formData.quantity}
//               onChange={handleChange}
//               required
//               min="1"
//               style={{
//                 padding: "10px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//               }}
//             />
//           </div>

//           {/* Supplier (Auto-filled with dropdown of existing suppliers) */}
//           <div>
//             <label style={{ fontWeight: "bold" }}>Supplier</label>
//             <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
//               Auto-filled from product's supplier. You can select from existing suppliers or enter new one.
//             </div>
//             <input
//               list="supplierOptions"
//               type="text"
//               name="supplier"
//               placeholder="Enter supplier name"
//               value={formData.supplier}
//               onChange={handleChange}
//               required
//               style={{
//                 padding: "10px",
//                 borderRadius: "8px",
//                 border: "1px solid #ccc",
//                 backgroundColor: formData.productId ? "#f8f9fa" : "white",
//                 width: "100%",
//               }}
//             />
//             <datalist id="supplierOptions">
//               {supplierOptions.map((supplier, index) => (
//                 <option key={index} value={supplier} />
//               ))}
//             </datalist>
//             {formData.supplier && (
//               <div style={{ fontSize: "12px", color: "#28a745", marginTop: "5px" }}>
//                 ✓ Supplier auto-filled from product data
//               </div>
//             )}
//           </div>

//           {/* Purchase Date */}
//           <label style={{ fontWeight: "bold" }}>Purchase Date</label>
//           <input
//             type="date"
//             name="purchaseDate"
//             value={formData.purchaseDate}
//             onChange={handleChange}
//             required
//             style={{
//               padding: "10px",
//               borderRadius: "8px",
//               border: "1px solid #ccc",
//             }}
//           />

//           {/* Summary Section */}
//           {formData.productId && formData.quantity && formData.purchasePrice && (
//             <div
//               style={{
//                 padding: "15px",
//                 backgroundColor: "#e7f3ff",
//                 borderRadius: "8px",
//                 border: "2px solid #007bff",
//                 marginTop: "10px",
//               }}
//             >
//               <h4 style={{ margin: "0 0 10px 0", color: "#007bff" }}>Purchase Summary</h4>
//               <div style={{ fontSize: "14px" }}>
//                 <div><strong>Product:</strong> {products.find(p => p.productId === parseInt(formData.productId))?.productName}</div>
//                 <div><strong>Company:</strong> {formData.productCompany}</div>
//                 <div><strong>Supplier:</strong> {formData.supplier}</div>
//                 <div><strong>Quantity:</strong> {formData.quantity} units</div>
//                 <div><strong>Purchase Price:</strong> Tsh{parseFloat(formData.purchasePrice).toFixed(2)}/unit</div>
//                 <div><strong>Selling Price:</strong> Tsh{parseFloat(formData.sellingPrice).toFixed(2)}/unit</div>
//                 <div><strong>Total Cost:</strong> Tsh{(parseFloat(formData.quantity) * parseFloat(formData.purchasePrice)).toFixed(2)}</div>
//                 <div><strong>New Stock After Purchase:</strong> {(parseInt(formData.currentStock) + parseInt(formData.quantity))} units</div>
//               </div>
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             style={{
//               padding: "12px",
//               backgroundColor: "#7ca6b7ff",
//               color: "white",
//               fontWeight: "bold",
//               border: "none",
//               marginLeft: "290px",
//               width: "150px",
//               borderRadius: "8px",
//               cursor: "pointer",
//               transition: "0.3s",
//               marginTop: "10px",
//             }}
//             onMouseOver={(e) =>
//               (e.target.style.backgroundColor = "#218838")
//             }
//             onMouseOut={(e) => (e.target.style.backgroundColor = "#7ca6b7ff")}
//           >
//             Add Purchase
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddPurchase;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../navigation/Navigation";


const AddPurchase = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    quantity: "",
    purchasePrice: "",
    sellingPrice: "",
    supplier: "",
    purchaseDate: "",
    productCompany: "",
    currentStock: "",
  });
  const [message, setMessage] = useState("");

  // ✅ Fetch products
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/product/get/product")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // If product is selected, fetch all relevant product data
    if (name === "productId") {
      const selected = products.find(
        (p) => p.productId === parseInt(value)
      );
      
      // Try to get supplier from different possible fields
      const productSupplier = selected ? 
        (selected.supplier || selected.productSupplier || selected.productCompany || "") : "";

      setFormData({
        ...formData,
        productId: value,
        sellingPrice: selected ? selected.sellingPrice || "" : "",
        purchasePrice: selected ? selected.latestPurchasePrice || "" : "",
        productCompany: selected ? selected.productCompany || "" : "",
        currentStock: selected ? selected.stockQuantity || 0 : 0,
        supplier: productSupplier, // Auto-fill supplier
        // Keep existing quantity if user already entered something, otherwise reset
        quantity: formData.quantity || "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Use the purchase price from form (user can override the auto-filled value)
    const finalPurchasePrice = formData.purchasePrice || 
      (products.find(p => p.productId === parseInt(formData.productId))?.latestPurchasePrice || 0);
    
    // Use the selling price from form (user can override the auto-filled value)
    const finalSellingPrice = formData.sellingPrice || 
      (products.find(p => p.productId === parseInt(formData.productId))?.sellingPrice || 0);

    const purchasePayload = {
      product: { productId: parseInt(formData.productId) },
      quantity: parseInt(formData.quantity),
      purchasePrice: parseFloat(finalPurchasePrice),
      sellingPrice: parseFloat(finalSellingPrice),
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
        sellingPrice: "",
        supplier: "",
        purchaseDate: "",
        productCompany: "",
        currentStock: "",
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

  // ✅ Get supplier options from products (unique suppliers)
  const getSupplierOptions = () => {
    const suppliers = new Set();
    products.forEach(product => {
      if (product.supplier) suppliers.add(product.supplier);
      if (product.productSupplier) suppliers.add(product.productSupplier);
      if (product.productCompany) suppliers.add(product.productCompany);
    });
    return Array.from(suppliers).sort();
  };

  const supplierOptions = getSupplierOptions();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
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
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "20px",
          marginLeft:"60px",
          marginTop: "60px",
        }}
      >
        <h2
          style={{
            color: "#449ca6ff",
            marginBottom: "30px",
            textAlign: "center",
            width: "100%",
          }}
        >
          ADD PURCHASE
        </h2>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.startsWith("✅") ? "green" : "red",
              fontWeight: "bold",
              marginBottom: "20px",
              width: "100%",
            }}
          >
            {message}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "1200px",
            backgroundColor: "#99ada6ff",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Product Dropdown */}
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Select Product</label>
              <select
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              >
                <option value="">-- Choose Product --</option>
                {products.map((p) => (
                  <option key={p.productId} value={p.productId}>
                    {p.productName} ({p.productCompany}) - Stock: {p.stockQuantity || 0}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Company (Display only) */}
            {formData.productCompany && (
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Product Company</label>
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: "#e9ecef",
                    fontWeight: "bold",
                    color: "#495057",
                  }}
                >
                  {formData.productCompany}
                </div>
              </div>
            )}

            {/* Current Stock (Display only) */}
            {formData.productId && (
              <div>
                <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Current Stock</label>
                <div
                  style={{
                    padding: "10px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    backgroundColor: formData.currentStock > 0 ? "#d4edda" : "#f8d7da",
                    fontWeight: "bold",
                    color: formData.currentStock > 0 ? "#155724" : "#721c24",
                  }}
                >
                  {formData.currentStock} units
                  {formData.currentStock === 0 && (
                    <span style={{ fontSize: "12px", marginLeft: "10px", fontStyle: "italic" }}>
                      (Out of stock)
                    </span>
                  )}
                  {formData.currentStock > 0 && formData.currentStock < 10 && (
                    <span style={{ fontSize: "12px", marginLeft: "10px", fontStyle: "italic" }}>
                      (Low stock)
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Purchase Quantity */}
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Purchase Quantity</label>
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                Enter the quantity you want to purchase
              </div>
              <input
                type="number"
                name="quantity"
                placeholder="Enter purchase quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
              />
            </div>

            {/* Supplier (Auto-filled with dropdown of existing suppliers) */}
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Supplier</label>
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                Auto-filled from product's supplier
              </div>
              <input
                list="supplierOptions"
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
                  backgroundColor: formData.productId ? "#f8f9fa" : "white",
                  width: "100%",
                }}
              />
              <datalist id="supplierOptions">
                {supplierOptions.map((supplier, index) => (
                  <option key={index} value={supplier} />
                ))}
              </datalist>
              {formData.supplier && (
                <div style={{ fontSize: "12px", color: "#28a745", marginTop: "5px" }}>
                  ✓ Supplier auto-filled from product data
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {/* Purchase Price (Auto-filled from ViewProducts but editable) */}
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Purchase Price</label>
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                Auto-filled from product's latest purchase price
              </div>
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
                  backgroundColor: formData.productId ? "#f8f9fa" : "white",
                  width: "100%",
                }}
              />
            </div>

            {/* Selling Price (Auto-filled from ViewProducts but editable) */}
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Selling Price</label>
              <div style={{ fontSize: "12px", color: "#666", marginBottom: "5px" }}>
                Auto-filled from product's selling price
              </div>
              <input
                type="number"
                step="0.01"
                name="sellingPrice"
                placeholder="Enter selling price"
                value={formData.sellingPrice}
                onChange={handleChange}
                required
                style={{
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  backgroundColor: formData.productId ? "#f8f9fa" : "white",
                  width: "100%",
                }}
              />
            </div>

            {/* Purchase Date */}
            <div>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: "5px" }}>Purchase Date</label>
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
                  width: "100%",
                }}
              />
            </div>

            {/* Summary Section - Full Width */}
            {formData.productId && formData.quantity && formData.purchasePrice && (
              <div
                style={{
                  padding: "15px",
                  backgroundColor: "#e7f3ff",
                  borderRadius: "8px",
                  border: "2px solid #007bff",
                  marginTop: "10px",
                  gridColumn: "1 / -1", // Span both columns
                }}
              >
                <h4 style={{ margin: "0 0 10px 0", color: "#007bff" }}>Purchase Summary</h4>
                <div style={{ 
                  fontSize: "14px", 
                  display: "grid", 
                  gridTemplateColumns: "1fr 1fr", 
                  gap: "10px" 
                }}>
                  <div><strong>Product:</strong> {products.find(p => p.productId === parseInt(formData.productId))?.productName}</div>
                  <div><strong>Company:</strong> {formData.productCompany}</div>
                  <div><strong>Supplier:</strong> {formData.supplier}</div>
                  <div><strong>Quantity:</strong> {formData.quantity} units</div>
                  <div><strong>Purchase Price:</strong> Tsh{parseFloat(formData.purchasePrice).toFixed(2)}/unit</div>
                  <div><strong>Selling Price:</strong> Tsh{parseFloat(formData.sellingPrice).toFixed(2)}/unit</div>
                  <div><strong>Total Cost:</strong> Tsh{(parseFloat(formData.quantity) * parseFloat(formData.purchasePrice)).toFixed(2)}</div>
                  <div><strong>New Stock:</strong> {(parseInt(formData.currentStock) + parseInt(formData.quantity))} units</div>
                </div>
              </div>
            )}

            {/* Submit Button - Full Width */}
            <div style={{ gridColumn: "1 / -1", textAlign: "left", marginTop: "20px" }}>
              <button
                type="submit"
                style={{
                  padding: "12px 40px",
                  backgroundColor: "#7ca6b7ff",
                  color: "white",
                  fontWeight: "bold",
                  width:"200px",
                  border: "none",
                  borderRadius: "8px",
                  
                  cursor: "pointer",
                  transition: "0.3s",
                  fontSize: "16px",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#218838")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#7ca6b7ff")}
              >
                Add Purchase
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPurchase;

