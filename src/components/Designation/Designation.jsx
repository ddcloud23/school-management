// // import React, { useState } from 'react';
// // import Sidebar from '../sidebar/Sidebar';
// // // import './designation.css';

// // const Designation = () => {
// //   // Sample designations for a school management system
// //   const [designations, setDesignations] = useState([
// //     { id: 1, title: "Principal", description: "Oversees school operations and administration." },
// //     { id: 2, title: "Vice Principal", description: "Assists the principal in managing school activities." },
// //     { id: 3, title: "Teacher", description: "Responsible for student education and classroom management." },
// //     { id: 4, title: "Accountant", description: "Handles school finances and budget management." }
// //   ]);

// //   return (
// //     <div className="container-fluid">
// //       <div className="main">
// //         <Sidebar />  {/* Sidebar Component */}
// //         <div className="content">
// //           <nav className="navbar border-bottom mb-4">
// //             <div className="container d-flex justify-content-between align-items-center">
// //               <h4 className="text-primary">Designations</h4>
// //               <button className="btn btn-primary">Add New Designation</button>
// //             </div>
// //           </nav>

// //           <div className="row g-4">
// //             {designations.map((designation) => (
// //               <div className="col-md-6" key={designation.id}>
// //                 <div className="card shadow-sm">
// //                   <div className="card-body">
// //                     <h5 className="card-title">{designation.title}</h5>
// //                     <p className="card-text">{designation.description}</p>
// //                     <button className="btn btn-outline-primary btn-sm">Edit</button>
// //                     <button className="btn btn-outline-danger btn-sm ms-2">Delete</button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
          
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Designation;
// // import React, { useEffect, useState } from 'react';
// // import Sidebar from '../sidebar/Sidebar';
// // import axios from 'axios';
// // // import './designation.css';

// // const API_URL = "http://localhost/school-api/designations.php"; 

// // const Designation = () => {
// //   const [designations, setDesignations] = useState([]);
// //   const [newDesignation, setNewDesignation] = useState({ title: "", description: "" });
// //   const [editingId, setEditingId] = useState(null);

// //   useEffect(() => {
// //     fetchDesignations();
// //   }, []);

// //   const fetchDesignations = async () => {
// //     try {
// //       const response = await axios.get(API_URL);
// //       setDesignations(response.data);
// //     } catch (error) {
// //       console.error("Error fetching designations:", error);
// //     }
// //   };

// //   // Add new designation
// //   const handleAddDesignation = async () => {
// //     try {
// //       await axios.post(API_URL, newDesignation);
// //       fetchDesignations();
// //       setNewDesignation({ title: "", description: "" });
// //     } catch (error) {
// //       console.error("Error adding designation:", error);
// //     }
// //   };

// //   // Edit designation
// //   const handleEditDesignation = async (id, title, description) => {
// //     setEditingId(id);
// //     setNewDesignation({ title, description });
// //   };

// //   const handleUpdateDesignation = async () => {
// //     try {
// //       await axios.put(`${API_URL}?id=${editingId}`, newDesignation);
// //       fetchDesignations();
// //       setEditingId(null);
// //       setNewDesignation({ title: "", description: "" });
// //     } catch (error) {
// //       console.error("Error updating designation:", error);
// //     }
// //   };

// //   // Delete designation
// //   const handleDeleteDesignation = async (id) => {
// //     try {
// //       await axios.delete(`${API_URL}?id=${id}`);
// //       fetchDesignations();
// //     } catch (error) {
// //       console.error("Error deleting designation:", error);
// //     }
// //   };

// //   return (
// //     <div className="container-fluid">
// //       <div className="main">
// //         <Sidebar />
// //         <div className="content">
// //           <nav className="navbar border-bottom mb-4">
// //             <div className="container d-flex justify-content-between align-items-center">
// //               <h4 className="text-primary">Designations</h4>
// //               <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#designationModal">
// //                 Add New Designation
// //               </button>
// //             </div>
// //           </nav>

// //           <div className="row g-4">
// //             {designations.map((designation) => (
// //               <div className="col-md-6" key={designation.id}>
// //                 <div className="card shadow-sm">
// //                   <div className="card-body">
// //                     <h5 className="card-title">{designation.title}</h5>
// //                     <p className="card-text">{designation.description}</p>
// //                     <button
// //                       className="btn btn-outline-primary btn-sm"
// //                       onClick={() => handleEditDesignation(designation.id, designation.title, designation.description)}
// //                     >
// //                       Edit
// //                     </button>
// //                     <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => handleDeleteDesignation(designation.id)}>
// //                       Delete
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
          
// //           {/* Add/Edit Modal */}
// //           <div className="modal fade" id="designationModal" tabIndex="-1" aria-labelledby="designationModalLabel" aria-hidden="true">
// //             <div className="modal-dialog">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h5 className="modal-title" id="designationModalLabel">{editingId ? "Edit" : "Add"} Designation</h5>
// //                   <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
// //                 </div>
// //                 <div className="modal-body">
// //                   <input
// //                     type="text"
// //                     className="form-control mb-2"
// //                     placeholder="Designation Title"
// //                     value={newDesignation.title}
// //                     onChange={(e) => setNewDesignation({ ...newDesignation, title: e.target.value })}
// //                   />
// //                   <textarea
// //                     className="form-control"
// //                     placeholder="Description"
// //                     value={newDesignation.description}
// //                     onChange={(e) => setNewDesignation({ ...newDesignation, description: e.target.value })}
// //                   ></textarea>
// //                 </div>
// //                 <div className="modal-footer">
// //                   <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
// //                     Cancel
// //                   </button>
// //                   <button type="button" className="btn btn-primary" onClick={editingId ? handleUpdateDesignation : handleAddDesignation}>
// //                     {editingId ? "Update" : "Save"}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Designation;
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../sidebar/Sidebar';

// const Designation = () => {
//   const [designations, setDesignations] = useState([]);
//   const [newDesignation, setNewDesignation] = useState({ title: "", description: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [isFormVisible, setFormVisible] = useState(false);

//   useEffect(() => {
//     // Fetch stored designations (if any) from local storage
//     const storedDesignations = JSON.parse(localStorage.getItem("designations")) || [];
//     setDesignations(storedDesignations);
//   }, []);

//   useEffect(() => {
//     // Save designations to local storage whenever they change
//     localStorage.setItem("designations", JSON.stringify(designations));
//   }, [designations]);

//   // Add or Update Designation
//   const handleSaveDesignation = () => {
//     if (!newDesignation.title || !newDesignation.description) return;

//     if (editingId !== null) {
//       // Update existing designation
//       setDesignations(
//         designations.map((d) =>
//           d.id === editingId ? { ...d, title: newDesignation.title, description: newDesignation.description } : d
//         )
//       );
//     } else {
//       // Add new designation
//       const newEntry = {
//         id: designations.length + 1, // Temporary ID logic
//         title: newDesignation.title,
//         description: newDesignation.description,
//       };
//       setDesignations([...designations, newEntry]);
//     }

//     // Reset form
//     setNewDesignation({ title: "", description: "" });
//     setEditingId(null);
//     setFormVisible(false);
//   };

//   // Edit Designation
//   const handleEditDesignation = (designation) => {
//     setNewDesignation(designation);
//     setEditingId(designation.id);
//     setFormVisible(true);
//   };

//   // Delete Designation
//   const handleDeleteDesignation = (id) => {
//     setDesignations(designations.filter((d) => d.id !== id));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="main">
//         <Sidebar />
//         <div className="content">
//           <nav className="navbar border-bottom mb-4">
//             <div className="container d-flex justify-content-between align-items-center">
//               <h4 className="text-primary">Designations</h4>
//               <button className="btn btn-primary" onClick={() => setFormVisible(true)}>
//                 Add New Designation
//               </button>
//             </div>
//           </nav>

//           {isFormVisible && (
//             <div className="form">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Designation Title"
//                 value={newDesignation.title}
//                 onChange={(e) => setNewDesignation({ ...newDesignation, title: e.target.value })}
//               />
//               <textarea
//                 className="form-control"
//                 placeholder="Description"
//                 value={newDesignation.description}
//                 onChange={(e) => setNewDesignation({ ...newDesignation, description: e.target.value })}
//               />
//               <button className="btn btn-success" onClick={handleSaveDesignation}>
//                 {editingId ? "Update" : "Save"}
//               </button>
//               <button className="btn btn-secondary ms-2" onClick={() => setFormVisible(false)}>
//                 Cancel
//               </button>
//             </div>
//           )}

//           <div className="row g-4">
//             {designations.map((designation) => (
//               <div className="col-md-6" key={designation.id}>
//                 <div className="card shadow-sm">
//                   <div className="card-body">
//                     <h5 className="card-title">{designation.title}</h5>
//                     <p className="card-text">{designation.description}</p>
//                     <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditDesignation(designation)}>
//                       Edit
//                     </button>
//                     <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => handleDeleteDesignation(designation.id)}>
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default Designation;
// import React, { useEffect, useState } from 'react';
// import Sidebar from '../sidebar/Sidebar';
// import "bootstrap/dist/css/bootstrap.min.css";
// import DesignationTable from './DesignationTable';
// const Designation = () => {
//   const [designations, setDesignations] = useState([]);
//   const [newDesignation, setNewDesignation] = useState({ title: "", description: "" });
//   const [editingId, setEditingId] = useState(null);
//   const [isFormVisible, setFormVisible] = useState(false);

//   useEffect(() => {
//     const storedDesignations = JSON.parse(localStorage.getItem("designations")) || [];
//     setDesignations(storedDesignations);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("designations", JSON.stringify(designations));
//   }, [designations]);

//   const handleSaveDesignation = () => {
//     if (!newDesignation.title || !newDesignation.description) return;

//     if (editingId !== null) {
//       setDesignations(
//         designations.map((d) =>
//           d.id === editingId ? { ...d, title: newDesignation.title, description: newDesignation.description } : d
//         )
//       );
//     } else {
//       const newEntry = {
//         id: designations.length + 1,
//         title: newDesignation.title,
//         description: newDesignation.description,
//       };
//       setDesignations([...designations, newEntry]);
//     }
//     setNewDesignation({ title: "", description: "" });
//     setEditingId(null);
//     setFormVisible(false);
//   };

//   const handleEditDesignation = (designation) => {
//     setNewDesignation(designation);
//     setEditingId(designation.id);
//     setFormVisible(true);
//   };

//   const handleDeleteDesignation = (id) => {
//     setDesignations(designations.filter((d) => d.id !== id));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="main d-flex">
//         <Sidebar />
//         <div className="content w-100 p-4">
//           <nav className="navbar border-bottom mb-4">
//             <div className="container d-flex justify-content-between align-items-center">
//               <h4 className="text-primary">Designations</h4>
//               <button className="btn btn-primary" onClick={() => setFormVisible(true)}>Add New Designation</button>
//             </div>
//           </nav>

//           {isFormVisible && (
//             <div className="card p-3 mb-3">
//               <input
//                 type="text"
//                 className="form-control mb-2"
//                 placeholder="Designation Title"
//                 value={newDesignation.title}
//                 onChange={(e) => setNewDesignation({ ...newDesignation, title: e.target.value })}
//               />
//               <textarea
//                 className="form-control mb-2"
//                 placeholder="Description"
//                 value={newDesignation.description}
//                 onChange={(e) => setNewDesignation({ ...newDesignation, description: e.target.value })}
//               />
//               <button className="btn btn-success" onClick={handleSaveDesignation}>{editingId ? "Update" : "Save"}</button>
//               <button className="btn btn-secondary ms-2" onClick={() => setFormVisible(false)}>Cancel</button>
//             </div>
//           )}

//           <div className="table-responsive">
//             <table className="table table-bordered table-striped">
//               <thead className="table-primary">
//                 <tr>
//                   <th>ID</th>
//                   <th>Title</th>
//                   <th>Description</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {designations.length > 0 ? (
//                   designations.map((designation) => (
//                     <tr key={designation.id}>
//                       <td>{designation.id}</td>
//                       <td>{designation.title}</td>
//                       <td>{designation.description}</td>
//                       <td>
//                         <button className="btn btn-outline-primary btn-sm" onClick={() => handleEditDesignation(designation)}>Edit</button>
//                         <button className="btn btn-outline-danger btn-sm ms-2" onClick={() => handleDeleteDesignation(designation.id)}>Delete</button>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="4" className="text-center">No Designations Available</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Designation;
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import DesignationTable from './DesignationTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const Designation = () => {
  const [designations, setDesignations] = useState([]);
  const [newDesignation, setNewDesignation] = useState({ title: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedDesignations = JSON.parse(localStorage.getItem("designations")) || [];
    setDesignations(storedDesignations);
  }, []);

  useEffect(() => {
    localStorage.setItem("designations", JSON.stringify(designations));
  }, [designations]);

  const handleSaveDesignation = () => {
    if (!newDesignation.title || !newDesignation.description) return;

    if (editingId !== null) {
      setDesignations(
        designations.map((d) =>
          d.id === editingId ? { ...d, title: newDesignation.title, description: newDesignation.description } : d
        )
      );
    } else {
      const newEntry = {
        id: designations.length + 1,
        title: newDesignation.title,
        description: newDesignation.description,
      };
      setDesignations([...designations, newEntry]);
    }
    setNewDesignation({ title: "", description: "" });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditDesignation = (designation) => {
    setNewDesignation(designation);
    setEditingId(designation.id);
    setDialogOpen(true);
  };

  const handleDeleteDesignation = (id) => {
    setDesignations(designations.filter((d) => d.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Designations</h4>
              <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add New Designation
              </Button>
            </div>
          </nav>

          <DesignationTable designations={designations} onEdit={handleEditDesignation} onDelete={handleDeleteDesignation} />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingId ? "Edit Designation" : "Add New Designation"}</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Designation Title"
                variant="outlined"
                value={newDesignation.title}
                onChange={(e) => setNewDesignation({ ...newDesignation, title: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={newDesignation.description}
                onChange={(e) => setNewDesignation({ ...newDesignation, description: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSaveDesignation} color="primary" variant="contained">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Designation;