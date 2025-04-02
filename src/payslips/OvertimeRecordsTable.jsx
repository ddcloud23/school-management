import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const OvertimeRecordsTable = ({ records, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="overtime records table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Overtime Hours</strong></TableCell>
            <TableCell><strong>Overtime Pay</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Deleted At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {records.length > 0 ? (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.id}</TableCell>
                <TableCell>{record.employeeId}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>{record.overtimeHours}</TableCell>
                <TableCell>{record.overtimePay}</TableCell>
                <TableCell>{record.createdAt}</TableCell>
                <TableCell>{record.updatedAt}</TableCell>
                <TableCell>{record.deletedAt}</TableCell>
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
              <TableCell colSpan={9} align="center">No overtime records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default OvertimeRecordsTable;
