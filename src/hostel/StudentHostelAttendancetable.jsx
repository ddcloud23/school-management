import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StudentHostelAttendanceTable = ({ attendanceRecords, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'success';
      case 'absent': return 'error';
      case 'late': return 'warning';
      default: return 'default';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="student hostel attendance table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Student ID</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {attendanceRecords.length > 0 ? (
            attendanceRecords.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.studentId}</TableCell>
                <TableCell>{formatDate(record.date)}</TableCell>
                <TableCell>
                  <Chip label={record.status.charAt(0).toUpperCase() + record.status.slice(1)} color={getStatusColor(record.status)} size="small" />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(record)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(record.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">No attendance records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default StudentHostelAttendanceTable;
