import React from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const LeaveTypesTable = ({ leaveTypes, onEdit, onDelete }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Max Days</TableCell>
          <TableCell>Created At</TableCell>
          <TableCell>Updated At</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {leaveTypes.map((leaveType) => (
          <TableRow key={leaveType.id}>
            <TableCell>{leaveType.id}</TableCell>
            <TableCell>{leaveType.name}</TableCell>
            <TableCell>{leaveType.description}</TableCell>
            <TableCell>{leaveType.max_days}</TableCell>
            <TableCell>{new Date(leaveType.created_at).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(leaveType.updated_at).toLocaleDateString()}</TableCell>
            <TableCell>
              <IconButton color="primary" onClick={() => onEdit(leaveType)}>
                <Edit />
              </IconButton>
              <IconButton color="secondary" onClick={() => onDelete(leaveType.id)}>
                <Delete />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaveTypesTable;
