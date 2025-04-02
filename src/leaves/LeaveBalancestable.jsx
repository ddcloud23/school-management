import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LeaveBalancesTable = ({ leaveBalances, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="leave balances table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Leave Type ID</strong></TableCell>
            <TableCell><strong>Total Leaves</strong></TableCell>
            <TableCell><strong>Used Leaves</strong></TableCell>
            <TableCell><strong>Remaining Leaves</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Deleted At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {leaveBalances.length > 0 ? (
            leaveBalances.map((lb) => (
              <TableRow key={lb.id}>
                <TableCell>{lb.employeeId}</TableCell>
                <TableCell>{lb.leaveTypeId}</TableCell>
                <TableCell>{lb.totalLeaves}</TableCell>
                <TableCell>{lb.usedLeaves}</TableCell>
                <TableCell>{lb.remainingLeaves}</TableCell>
                <TableCell>{lb.createdAt}</TableCell>
                <TableCell>{lb.updatedAt}</TableCell>
                <TableCell>{lb.deletedAt}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(lb)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(lb.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">No records found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveBalancesTable;
