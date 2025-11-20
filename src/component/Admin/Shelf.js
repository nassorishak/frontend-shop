// import React, { useState, useEffect } from 'react';
// import Navigation from "../navigation/Navigation";
// import { width } from '@fortawesome/free-solid-svg-icons/fa0';

// const Shelf = () => {
//   const [shelves, setShelves] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
//   const [editingShelf, setEditingShelf] = useState(null);
//   const [shelfForm, setShelfForm] = useState({
//     shelfName: '',
//     locationDescription: ''
//   });

//   const API_BASE_URL = 'http://localhost:8080/api/shelves';

//   useEffect(() => {
//     const fetchShelves = async () => {
//       try {
//         const response = await fetch(`${API_BASE_URL}/list-shelves`);
//         const data = await response.json();
//         setShelves(data);
//       } catch (error) {
//         console.error('Error fetching shelves:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchShelves();
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setShelfForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleOpenDialog = (shelf = null) => {
//     if (shelf) {
//       setEditingShelf(shelf);
//       setShelfForm({
//         shelfName: shelf.shelfName,
//         locationDescription: shelf.locationDescription
//       });
//     } else {
//       setEditingShelf(null);
//       setShelfForm({ shelfName: '', locationDescription: '' });
//     }
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingShelf(null);
//   };

//   // Inline Styles
//   const styles = {
//     container: {
//       padding: "0rem",
//       fontFamily: "Poppins, sans-serif",
//       backgroundColor: "#f9fafb",
//       minHeight: "100vh",
//       marginLeft: "0px",
//       marginRight:"100px",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       background: "#fff",
//       padding: "1.5rem 2rem",
//       borderRadius: "16px",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       marginBottom: "2rem",
//     },
//     title: {
//       fontSize: "1.8rem",
//       fontWeight: "600",
//       color: "#2d3748",
//       marginTop:"40px",
//       marginLeft: "90px",
//     },
//     subtitle: {
//       color: "#718096",
//       fontSize: "0.95rem",
//       marginTop: "0.25rem",
//     },
//     button: {
//       border: "none",
//       borderRadius: "10px",
//       cursor: "pointer",
//       fontWeight: "500",
//       width:"150px",
//       marginTop:"50px",
//       padding: "0.6rem 1.4rem",
//       background: "linear-gradient(135deg, #667eea, #764ba2)",
//       color: "white",
//       transition: "0.3s",
//     },
//     tableContainer: {
//       background: "#fff",
//       borderRadius: "16px",
//       boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//       overflowX: "auto",
//     },
//     table: {
//       width: "86%",
//       borderCollapse: "collapse",
//       marginLeft: "240px",

//     },
//     th: {
//       background: "#f7fafc",
//       padding: "1rem",
//       textAlign: "center",
//       fontWeight: "600",
//       color: "#4a5568",
//       borderBottom: "2px solid #edf2f7",
//     },
//     td: {
//       padding: "1rem",
//       borderBottom: "1px solid #edf2f7",
//       verticalAlign: "middle",
//     },
//     actionBtn: {
//       border: "none",
//       borderRadius: "8px",
//       padding: "0.4rem 0.8rem",
//       fontSize: "0.9rem",
//       cursor: "pointer",
//       marginRight: "8px",
//     },
//     editBtn: {
//       background: "#ebf8ff",
//       color: "#3182ce",
//     },
//     deleteBtn: {
//       background: "#fff5f5",
//       color: "#e53e3e",
//     },
//     overlay: {
//       position: "fixed",
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       background: "rgba(0,0,0,0.5)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       zIndex: 1000,
//     },
//     modal: {
//       background: "#fff",
//       borderRadius: "16px",
//       width: "500px",
//       maxWidth: "90%",
//       padding: "1.5rem",
//       boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
//       animation: "fadeInUp 0.3s ease",
//     },
//     modalHeader: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "1rem",
//     },
//     modalTitle: {
//       fontSize: "1.3rem",
//       fontWeight: "600",
//       color: "#2d3748",
//     },
//     closeBtn: {
//       background: "none",
//       border: "none",
//       fontSize: "1.5rem",
//       color: "#718096",
//       cursor: "pointer",
//     },
//     input: {
//       width: "100%",
//       padding: "0.7rem",
//       border: "1px solid #cbd5e0",
//       borderRadius: "8px",
//       outline: "none",
//       fontSize: "0.95rem",
//       marginBottom: "1rem",
//     },
//     label: {
//       display: "block",
//       fontWeight: "500",
//       marginBottom: "0.3rem",
//       color: "#2d3748",
//     },
//     textarea: {
//       width: "100%",
//       padding: "0.7rem",
//       border: "1px solid #cbd5e0",
//       borderRadius: "8px",
//       outline: "none",
//       fontSize: "0.95rem",
//       marginBottom: "1rem",
//     },
//     modalFooter: {
//       display: "flex",
//       justifyContent: "flex-end",
//       gap: "10px",
//     },
//   };

//   if (loading) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "100px" }}>
//         <h3>Loading shelves...</h3>
//       </div>
//     );
//   }

//   return (
//     <div style={styles.container}>
//       <Navigation />
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.title}>Shelf Management</h1>
//       <p style={{ ...styles.subtitle, marginLeft: "220px" }}>
//          Manage your store shelves and their locations
//         </p>

//         </div>
//         <button style={styles.button} onClick={() => handleOpenDialog()}>
//           + Add Shelf
//         </button>
//       </div>

//       {/* Table */}
//       <div style={styles.tableContainer}>
//         <table style={styles.table}>
//           <thead>
//             <tr>
//               <th style={styles.th}>ID</th>
//               <th style={styles.th}>Shelf Name</th>
//               <th style={styles.th}>Location Description</th>
//               <th style={styles.th}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {shelves.length === 0 ? (
//               <tr>
//                 <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>
//                   No shelves found. Add one to get started.
//                 </td>
//               </tr>
//             ) : (
//               shelves.map((shelf) => (
//                 <tr key={shelf.shelfId}>
//                   <td style={styles.td}>#{shelf.shelfId}</td>
//                   <td style={styles.td}>{shelf.shelfName}</td>
//                   <td style={styles.td}>{shelf.locationDescription}</td>
//                   <td style={styles.td}>
//                     <button
//                       style={{ ...styles.actionBtn, ...styles.editBtn }}
//                       onClick={() => handleOpenDialog(shelf)}
//                     >
//                       ✏️ Edit
//                     </button>
//                     <button
//                       style={{ ...styles.actionBtn, ...styles.deleteBtn }}
//                       onClick={() => {
//                         setEditingShelf(shelf);
//                         setOpenDeleteDialog(true);
//                       }}
//                     >
//                       🗑️ Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Add/Edit Modal */}
//       {openDialog && (
//         <div style={styles.overlay}>
//           <div style={styles.modal}>
//             <div style={styles.modalHeader}>
//               <h2 style={styles.modalTitle}>
//                 {editingShelf ? "Edit Shelf" : "Add Shelf"}
//               </h2>
//               <button style={styles.closeBtn} onClick={handleCloseDialog}>
//                 ×
//               </button>
//             </div>
//             <div>
//               <label style={styles.label}>Shelf Name *</label>
//               <input
//                 type="text"
//                 name="shelfName"
//                 value={shelfForm.shelfName}
//                 onChange={handleInputChange}
//                 style={styles.input}
//                 placeholder="Enter shelf name"
//               />
//               <label style={styles.label}>Location Description</label>
//               <textarea
//                 name="locationDescription"
//                 value={shelfForm.locationDescription}
//                 onChange={handleInputChange}
//                 style={styles.textarea}
//                 placeholder="Describe the location"
//                 rows="4"
//               ></textarea>
//             </div>
//             <div style={styles.modalFooter}>
//               <button
//                 style={{ ...styles.button, background: "#edf2f7", color: "#4a5568" }}
//                 onClick={handleCloseDialog}
//               >
//                 Cancel
//               </button>
//               <button
//                 style={styles.button}
//                 onClick={() => {
//                   /* add save logic */
//                   handleCloseDialog();
//                 }}
//               >
//                 {editingShelf ? "Update Shelf" : "Create Shelf"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Shelf;
import React, { useState, useEffect } from "react";
import Navigation from "../navigation/Navigation";

const Shelf = () => {
  const [shelves, setShelves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [editingShelf, setEditingShelf] = useState(null);
  const [shelfForm, setShelfForm] = useState({
    shelfName: "",
    locationDescription: "",
  });

  // const API_BASE_URL = "http://localhost:8080/api/shelves";

  // // 🔹 Fetch shelves
  // const fetchShelves = async () => {
  //   try {
  //     const response = await fetch(`${API_BASE_URL}/list-shelves`);
  //     const data = await response.json();
  //     setShelves(data);
  //   } catch (error) {
  //     console.error("Error fetching shelves:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
// ✅ Correct - use relative URLs
const API_BASE_URL = "/api/shelves";

// 🔹 Fetch shelves
const fetchShelves = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/list-shelves`);
    const data = await response.json();
    setShelves(data);
  } catch (error) {
    console.error("Error fetching shelves:", error);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    fetchShelves();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShelfForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenDialog = (shelf = null) => {
    if (shelf) {
      setEditingShelf(shelf);
      setShelfForm({
        shelfName: shelf.shelfName,
        locationDescription: shelf.locationDescription,
      });
    } else {
      setEditingShelf(null);
      setShelfForm({ shelfName: "", locationDescription: "" });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingShelf(null);
  };

  // 🔹 Add or Update shelf
  const handleSaveShelf = async () => {
    try {
      const method = editingShelf ? "PUT" : "POST";
      const url = editingShelf
        ? `${API_BASE_URL}/update/${editingShelf.shelfId}`
        : `${API_BASE_URL}/add/shelves`;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shelfForm),
      });

      if (response.ok) {
        await fetchShelves(); // refresh list
        handleCloseDialog();
        alert(editingShelf ? "Shelf updated successfully!" : "Shelf added successfully!");
      } else {
        alert("Something went wrong while saving the shelf.");
      }
    } catch (error) {
      console.error("Error saving shelf:", error);
    }
  };

  // 🔹 Delete shelf
  const handleDeleteShelf = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete/${editingShelf.shelfId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchShelves();
        setOpenDeleteDialog(false);
        alert("Shelf deleted successfully!");
      } else {
        alert("Failed to delete shelf.");
      }
    } catch (error) {
      console.error("Error deleting shelf:", error);
    }
  };

  // 🔹 Styles
  const styles = {
    container: {
      padding: "0rem",
      fontFamily: "Poppins, sans-serif",
      backgroundColor: "#f9fafb",
      minHeight: "100vh",
      marginLeft: "0px",
      marginRight: "100px",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: "#fff",
      padding: "1.5rem 2rem",
      borderRadius: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      marginBottom: "2rem",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "600",
      color: "#2d3748",
      marginTop: "40px",
      marginLeft: "90px",
    },
    subtitle: {
      color: "#718096",
      fontSize: "0.95rem",
      marginTop: "0.25rem",
      marginLeft: "220px",
    },
    button: {
      border: "none",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "500",
      width: "150px",
      marginTop: "50px",
      padding: "0.6rem 1.4rem",
      background: "linear-gradient(135deg, #667eea, #764ba2)",
      color: "white",
      transition: "0.3s",
    },
    tableContainer: {
      background: "#fff",
      borderRadius: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      overflowX: "auto",
    },
    table: {
      width: "86%",
      borderCollapse: "collapse",
      marginLeft: "240px",
    },
    th: {
      background: "#f7fafc",
      padding: "1rem",
      textAlign: "center",
      fontWeight: "600",
      color: "#4a5568",
      borderBottom: "2px solid #edf2f7",
    },
    td: {
      padding: "1rem",
      borderBottom: "1px solid #edf2f7",
      verticalAlign: "middle",
    },
    actionBtn: {
      border: "none",
      borderRadius: "8px",
      padding: "0.4rem 0.8rem",
      fontSize: "0.9rem",
      cursor: "pointer",
      marginRight: "8px",
    },
    editBtn: {
      background: "#ebf8ff",
      color: "#3182ce",
    },
    deleteBtn: {
      background: "#fff5f5",
      color: "#e53e3e",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    },
    modal: {
      background: "#fff",
      borderRadius: "16px",
      width: "500px",
      maxWidth: "90%",
      padding: "1.5rem",
      boxShadow: "0 5px 25px rgba(0,0,0,0.15)",
    },
    modalHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    modalTitle: {
      fontSize: "1.3rem",
      fontWeight: "600",
      color: "#2d3748",
    },
    closeBtn: {
      background: "none",
      border: "none",
      fontSize: "1.5rem",
      color: "#718096",
      cursor: "pointer",
    },
    input: {
      width: "100%",
      padding: "0.7rem",
      border: "1px solid #cbd5e0",
      borderRadius: "8px",
      outline: "none",
      fontSize: "0.95rem",
      marginBottom: "1rem",
    },
    label: {
      display: "block",
      fontWeight: "500",
      marginBottom: "0.3rem",
      color: "#2d3748",
    },
    textarea: {
      width: "100%",
      padding: "0.7rem",
      border: "1px solid #cbd5e0",
      borderRadius: "8px",
      outline: "none",
      fontSize: "0.95rem",
      marginBottom: "1rem",
    },
    modalFooter: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "10px",
    },
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h3>Loading shelves...</h3>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navigation />

      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Shelf Management</h1>
          <p style={styles.subtitle}>
            Manage your store shelves and their locations
          </p>
        </div>
        <button style={styles.button} onClick={() => handleOpenDialog()}>
          + Add Shelf
        </button>
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Shelf Name</th>
              <th style={styles.th}>Location Description</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shelves.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", padding: "2rem" }}>
                  No shelves found. Add one to get started.
                </td>
              </tr>
            ) : (
              shelves.map((shelf) => (
                <tr key={shelf.shelfId}>
                  <td style={styles.td}>{shelf.shelfId}</td>
                  <td style={styles.td}>{shelf.shelfName}</td>
                  <td style={styles.td}>{shelf.locationDescription}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.actionBtn, ...styles.editBtn }}
                      onClick={() => handleOpenDialog(shelf)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={{ ...styles.actionBtn, ...styles.deleteBtn }}
                      onClick={() => {
                        setEditingShelf(shelf);
                        setOpenDeleteDialog(true);
                      }}
                    >
                      🗑️ Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {openDialog && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingShelf ? "Edit Shelf" : "Add Shelf"}
              </h2>
              <button style={styles.closeBtn} onClick={handleCloseDialog}>
                ×
              </button>
            </div>
            <div>
              <label style={styles.label}>Shelf Name *</label>
              <input
                type="text"
                name="shelfName"
                value={shelfForm.shelfName}
                onChange={handleInputChange}
                style={styles.input}
                placeholder="Enter shelf name"
              />
              <label style={styles.label}>Location Description</label>
              <textarea
                name="locationDescription"
                value={shelfForm.locationDescription}
                onChange={handleInputChange}
                style={styles.textarea}
                placeholder="Describe the location"
                rows="4"
              ></textarea>
            </div>
            <div style={styles.modalFooter}>
              <button
                style={{
                  ...styles.button,
                  background: "#edf2f7",
                  color: "#4a5568",
                }}
                onClick={handleCloseDialog}
              >
                Cancel
              </button>
              <button style={styles.button} onClick={handleSaveShelf}>
                {editingShelf ? "Update Shelf" : "Create Shelf"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {openDeleteDialog && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <h3>Are you sure you want to delete this shelf?</h3>
            <div style={styles.modalFooter}>
              <button
                style={{
                  ...styles.button,
                  background: "#edf2f7",
                  color: "#4a5568",
                }}
                onClick={() => setOpenDeleteDialog(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  ...styles.button,
                  background: "red",
                  color: "white",
                }}
                onClick={handleDeleteShelf}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shelf;
