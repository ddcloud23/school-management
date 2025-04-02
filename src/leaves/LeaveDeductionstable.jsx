import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LeaveDeductionsTable = ({ leaveDeductions, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="leave deductions table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Leave Date</strong></TableCell>
            <TableCell><strong>Leave Type</strong></TableCell>
            <TableCell><strong>Deduction Amount</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveDeductions.length > 0 ? (
            leaveDeductions.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.employee_id}</TableCell>
                <TableCell>{record.leave_date}</TableCell>
                <TableCell>{record.leave_type}</TableCell>
                <TableCell>{record.deduction_amount}</TableCell>
                <TableCell>{record.created_at}</TableCell>
                <TableCell>{record.updated_at}</TableCell>
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
              <TableCell colSpan={7} align="center">No leave deductions found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default LeaveDeductionsTable;
