import React, { useState } from "react";

const Shelf = () => {
  const [shelfName, setShelfName] = useState("");
  const [locationDescription, setLocationDescription] = useState("");
  const [warehouseSection, setWarehouseSection] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!shelfName || !locationDescription) {
      setMessage("Shelf name and location are required.");
      return;
    }

    const newShelf = {
      shelfName,
      locationDescription,
      warehouseSection,
    };

    try {
      const response = await fetch("http://localhost:8080/api/shelves/add/shelves", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newShelf),
      });

      if (!response.ok) {
        throw new Error("Failed to add shelf");
      }

      setMessage("✅ Shelf added successfully!");
      // Reset form
      setShelfName("");
      setLocationDescription("");
      setWarehouseSection("");
    } catch (error) {
      console.error("Error adding shelf:", error);
      setMessage("❌ Failed to add shelf.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "50px auto",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        backgroundColor: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Shelf</h2>

      {message && (
        <p style={{ color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Shelf Name:</label>
          <input
            type="text"
            value={shelfName}
            onChange={(e) => setShelfName(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Location Description:</label>
          <input
            type="text"
            value={locationDescription}
            onChange={(e) => setLocationDescription(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
            placeholder="e.g., Aisle 2 - Row 3"
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Warehouse Section (optional):</label>
          <input
            type="text"
            value={warehouseSection}
            onChange={(e) => setWarehouseSection(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            border: "none",
            borderRadius: "8px",
          }}
        >
          Add Shelf
        </button>
      </form>
    </div>
  );
};

export default Shelf;
