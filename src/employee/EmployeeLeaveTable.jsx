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

const EmployeeLeaveTable = ({ employeeLeaves, onEdit, onDelete }) => {
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'pending':
      default:
        return 'warning';
    }
  };

  // Function to format date (replacing date-fns format)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Returns in DD/MM/YYYY format
  };

  // Function to calculate days between two dates
  const calculateDays = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end days
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee leave table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Employee</strong></TableCell>
            <TableCell><strong>Leave Type</strong></TableCell>
            <TableCell><strong>Start Date</strong></TableCell>
            <TableCell><strong>End Date</strong></TableCell>
            <TableCell><strong>Days</strong></TableCell>
            <TableCell><strong>Applied On</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employeeLeaves.length > 0 ? (
            employeeLeaves.map((leave) => (
              <TableRow key={leave.id}>
                <TableCell>{leave.employeeName}</TableCell>
                <TableCell>{leave.leaveType}</TableCell>
                <TableCell>{formatDate(leave.start_date)}</TableCell>
                <TableCell>{formatDate(leave.end_date)}</TableCell>
                <TableCell>{calculateDays(leave.start_date, leave.end_date)}</TableCell>
                <TableCell>{formatDate(leave.applied_date)}</TableCell>
                <TableCell>
                  <Chip 
                    label={leave.status.charAt(0).toUpperCase() + leave.status.slice(1)} 
                    color={getStatusColor(leave.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton 
                    color="primary" 
                    onClick={() => onEdit(leave)}
                    disabled={leave.status !== 'pending'}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    color="error" 
                    onClick={() => onDelete(leave.id)}
                    disabled={leave.status !== 'pending'}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">No leave applications found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeLeaveTable;