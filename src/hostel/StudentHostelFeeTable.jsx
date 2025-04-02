// import React from 'react';
// import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';

// const StudentHostelFeeTable = ({ hostelFees = [], onEdit, onDelete }) => {
//   return (
//     <Table>
//       <TableHead>
//         <TableRow>
//           <TableCell>ID</TableCell>
//           <TableCell>Student ID</TableCell>
//           <TableCell>Fee Category ID</TableCell>
//           <TableCell>Amount</TableCell>
//           <TableCell>Due Date</TableCell>
//           <TableCell>Paid Rate</TableCell>
//           <TableCell>Status</TableCell>
//           <TableCell>Payment Method</TableCell>
//           <TableCell>Transaction ID</TableCell>
//           <TableCell>Created At</TableCell>
//           <TableCell>Updated At</TableCell>
//           <TableCell>Deleted ID</TableCell>
//           <TableCell>Actions</TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {(hostelFees ?? []).length > 0 ? (
//           hostelFees.map((fee) => (
//             <TableRow key={fee.id}>
//               <TableCell>{fee.id}</TableCell>
//               <TableCell>{fee.student_id}</TableCell>
//               <TableCell>{fee.fee_category_id}</TableCell>
//               <TableCell>{fee.amount}</TableCell>
//               <TableCell>{fee.due_date ? new Date(fee.due_date).toLocaleDateString() : '-'}</TableCell>
//               <TableCell>{fee.paid_rate}</TableCell>
//               <TableCell>{fee.status}</TableCell>
//               <TableCell>{fee.payment_method}</TableCell>
//               <TableCell>{fee.transaction_id}</TableCell>
//               <TableCell>{fee.created_at ? new Date(fee.created_at).toLocaleDateString() : '-'}</TableCell>
//               <TableCell>{fee.updated_at ? new Date(fee.updated_at).toLocaleDateString() : '-'}</TableCell>
//               <TableCell>{fee.deleted_id || '-'}</TableCell>
//               <TableCell>
//                 <IconButton color="primary" onClick={() => onEdit(fee)}>
//                   <Edit />
//                 </IconButton>
//                 <IconButton color="secondary" onClick={() => onDelete(fee.id)}>
//                   <Delete />
//                 </IconButton>
//               </TableCell>
//             </TableRow>
//           ))
//         ) : (
//           <TableRow>
//             <TableCell colSpan={13} align="center">No records found</TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// };

// export default StudentHostelFeeTable;
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentHostelFeeTable = ({ studentHostelFees = [], onEdit, onDelete }) => {
  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Returns in DD/MM/YYYY format
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="student hostel fee table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Student ID</strong></TableCell>
            <TableCell><strong>Fee Category</strong></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
            <TableCell><strong>Due Date</strong></TableCell>
            <TableCell><strong>Paid Rate</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Payment Method</strong></TableCell>
            <TableCell><strong>Transaction ID</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.isArray(studentHostelFees) && studentHostelFees.length > 0 ? (
            studentHostelFees.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.student_id}</TableCell>
                <TableCell>{record.fee_category_id}</TableCell>
                <TableCell>{record.amount}</TableCell>
                <TableCell>{formatDate(record.due_date)}</TableCell>
                <TableCell>{record.paid_rate || '—'}</TableCell>
                <TableCell>
                  <Chip 
                    label={record.status.charAt(0).toUpperCase() + record.status.slice(1)} 
                    color={record.status === 'Paid' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{record.payment_method || '—'}</TableCell>
                <TableCell>{record.transaction_id || '—'}</TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => onEdit(record)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => onDelete(record.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">No hostel fee records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentHostelFeeTable;