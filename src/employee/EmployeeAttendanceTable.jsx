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

const EmployeeAttendanceTable = ({ attendanceRecords, onEdit, onDelete }) => {
  // Function to get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'success';
      case 'absent':
        return 'error';
      case 'half-day':
        return 'warning';
      case 'late':
        return 'info';
      default:
        return 'default';
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Returns in DD/MM/YYYY format
  };

  // Function to format time
  const formatTime = (timeString) => {
    if (!timeString) return '—';
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Calculate work hours
  const calculateWorkHours = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return '—';
    
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    
    // Calculate difference in milliseconds
    const diffMs = end - start;
    
    // If negative or invalid, return "—"
    if (diffMs <= 0) return '—';
    
    // Convert to hours and minutes
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHrs}h ${diffMins}m`;
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee attendance table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Employee</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Check-in</strong></TableCell>
            <TableCell><strong>Check-out</strong></TableCell>
            <TableCell><strong>Work Hours</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employeeName}</TableCell>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>{formatTime(record.checkIn)}</TableCell>
                <TableCell>{formatTime(record.checkOut)}</TableCell>
                <TableCell>{calculateWorkHours(record.checkIn, record.checkOut)}</TableCell>
                <TableCell>
                  <Chip 
                    label={record.status.charAt(0).toUpperCase() + record.status.slice(1)} 
                    color={getStatusColor(record.status)}
                    size="small"
                  />
                </TableCell>
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
              <TableCell colSpan={7} align="center">No attendance records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeAttendanceTable;