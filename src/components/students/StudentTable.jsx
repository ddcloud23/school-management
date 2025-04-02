// import React from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';

// const StudentTable = ({ students, onEdit, onDelete }) => {
//   return (
//     <TableContainer component={Paper}>
//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell>First Name</TableCell>
//             <TableCell>Last Name</TableCell>
//             <TableCell>Email</TableCell>
//             <TableCell>Phone</TableCell>
//             <TableCell>Admission Number</TableCell>
//             <TableCell>Roll Number</TableCell>
//             <TableCell>Joining Date</TableCell>
//             <TableCell>City</TableCell>
//             <TableCell>State</TableCell>
//             <TableCell>Country</TableCell>
//             <TableCell>Actions</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {students.map((student) => (
//             <TableRow key={student.id}>
//               <TableCell>{student.id}</TableCell>
//               <TableCell>{student.first_name}</TableCell>
//               <TableCell>{student.last_name}</TableCell>
//               <TableCell>{student.email}</TableCell>
//               <TableCell>{student.phone}</TableCell>
//               <TableCell>{student.admission_number}</TableCell>
//               <TableCell>{student.roll_number}</TableCell>
//               <TableCell>{student.joining_date}</TableCell>
//               <TableCell>{student.city}</TableCell>
//               <TableCell>{student.state}</TableCell>
//               <TableCell>{student.country}</TableCell>
//               <TableCell>
//                 <IconButton color="primary" onClick={() => onEdit(student)}>
//                   <Edit />
//                 </IconButton>
//                 <IconButton color="secondary" onClick={() => onDelete(student.id)}>
//                   <Delete />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default StudentTable;
import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="student table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell width="5%">#</TableCell>
            <TableCell width="15%">Student Name</TableCell>
            <TableCell width="15%">Admission No</TableCell>
            <TableCell width="15%">Roll No</TableCell>
            <TableCell width="15%">Email</TableCell>
            <TableCell width="15%">Phone</TableCell>
            <TableCell width="10%">Joining Date</TableCell>
            <TableCell width="10%" align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length > 0 ? (
            students.map((student, index) => (
              <TableRow key={student.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${student.first_name} ${student.last_name}`}</TableCell>
                <TableCell>{student.admission_number}</TableCell>
                <TableCell>{student.roll_number}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.phone}</TableCell>
                <TableCell>{student.joining_date}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(student)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(student.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">No students found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentTable;