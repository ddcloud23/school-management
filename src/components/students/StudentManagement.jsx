// import React, { useEffect, useState } from 'react';
// import Sidebar from '../sidebar/Sidebar';
// import "bootstrap/dist/css/bootstrap.min.css";
// import StudentTable from './StudentTable';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

// const StudentManagement = () => {
//   const [students, setStudents] = useState([]);
//   const [newStudent, setNewStudent] = useState({
//     first_name: '',
//     last_name: '',
//     email: '',
//     phone: '',
//     admission_number: '',
//     roll_number: '',
//     joining_date: '',
//     city: '',
//     state: '',
//     country: ''
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [isDialogOpen, setDialogOpen] = useState(false);

//   useEffect(() => {
//     const storedData = JSON.parse(localStorage.getItem("students")) || [];
//     setStudents(storedData);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("students", JSON.stringify(students));
//   }, [students]);

//   const handleSaveStudent = () => {
//     if (!newStudent.first_name || !newStudent.last_name || !newStudent.email) return;

//     const currentTime = new Date().toISOString();

//     if (editingId !== null) {
//       setStudents(
//         students.map((s) =>
//           s.id === editingId ? { ...s, ...newStudent, updated_at: currentTime } : s
//         )
//       );
//     } else {
//       const newEntry = {
//         id: students.length + 1,
//         ...newStudent,
//         created_at: currentTime,
//         updated_at: currentTime,
//       };
//       setStudents([...students, newEntry]);
//     }

//     setNewStudent({ first_name: '', last_name: '', email: '', phone: '', admission_number: '', roll_number: '', joining_date: '', city: '', state: '', country: '' });
//     setEditingId(null);
//     setDialogOpen(false);
//   };

//   const handleEditStudent = (student) => {
//     setNewStudent(student);
//     setEditingId(student.id);
//     setDialogOpen(true);
//   };

//   const handleDeleteStudent = (id) => {
//     setStudents(students.filter((s) => s.id !== id));
//   };

//   return (
//     <div className="container-fluid">
//       <div className="main d-flex">
//         <Sidebar />
//         <div className="content w-100 p-4">
//           <nav className="navbar border-bottom mb-4">
//             <div className="container d-flex justify-content-between align-items-center">
//               <h4 className="text-primary">Student Management</h4>
//               <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
//                 Add New Student
//               </Button>
//             </div>
//           </nav>

//           <StudentTable students={students} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />

//           <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
//             <DialogTitle>{editingId ? "Edit Student" : "Add New Student"}</DialogTitle>
//             <DialogContent>
//               <TextField fullWidth margin="dense" label="First Name" value={newStudent.first_name} onChange={(e) => setNewStudent({ ...newStudent, first_name: e.target.value })} />
//               <TextField fullWidth margin="dense" label="Last Name" value={newStudent.last_name} onChange={(e) => setNewStudent({ ...newStudent, last_name: e.target.value })} />
//               <TextField fullWidth margin="dense" label="Email" value={newStudent.email} onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })} />
//               <TextField fullWidth margin="dense" label="Phone" value={newStudent.phone} onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })} />
//               <TextField fullWidth margin="dense" label="Admission Number" value={newStudent.admission_number} onChange={(e) => setNewStudent({ ...newStudent, admission_number: e.target.value })} />
//               <TextField fullWidth margin="dense" label="Roll Number" value={newStudent.roll_number} onChange={(e) => setNewStudent({ ...newStudent, roll_number: e.target.value })} />
//               <TextField fullWidth margin="dense" label="Joining Date" type="date" value={newStudent.joining_date} onChange={(e) => setNewStudent({ ...newStudent, joining_date: e.target.value })} />
//               <TextField fullWidth margin="dense" label="City" value={newStudent.city} onChange={(e) => setNewStudent({ ...newStudent, city: e.target.value })} />
//               <TextField fullWidth margin="dense" label="State" value={newStudent.state} onChange={(e) => setNewStudent({ ...newStudent, state: e.target.value })} />
//               <TextField fullWidth margin="dense" label="Country" value={newStudent.country} onChange={(e) => setNewStudent({ ...newStudent, country: e.target.value })} />
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
//               <Button onClick={handleSaveStudent} color="primary" variant="contained">
//                 {editingId ? "Update" : "Save"}
//               </Button>
//             </DialogActions>
//           </Dialog>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentManagement;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import StudentTable from './StudentTable';
import { Button } from "@mui/material";

const StudentManagement = () => {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleEditStudent = (student) => {
    navigate(`/add-student/${student.id}`, { state: { student } });
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleAddStudent = () => {
    navigate('/add-student');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Student Management</h4>
              <Button variant="contained" color="primary" onClick={handleAddStudent}>
                Add New Student
              </Button>
            </div>
          </nav>

          <StudentTable students={students} onEdit={handleEditStudent} onDelete={handleDeleteStudent} />
        </div>
      </div>
    </div>
  );
};

export default StudentManagement;