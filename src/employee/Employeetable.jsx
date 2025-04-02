import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="employee table">
        <TableHead>
          <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
            <TableCell width="5%">#</TableCell>
            <TableCell width="12%">Employee Name</TableCell>
            <TableCell width="10%">Department</TableCell>
            <TableCell width="10%">Designation</TableCell>
            <TableCell width="10%">Employee ID</TableCell>
            <TableCell width="12%">Email</TableCell>
            <TableCell width="10%">Phone</TableCell>
            <TableCell width="10%">Joining Date</TableCell>
            <TableCell width="10%">Type</TableCell>
            <TableCell width="11%" align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.length > 0 ? (
            employees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{`${employee.first_name} ${employee.last_name}`}</TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.employee_id}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile_number || employee.phone}</TableCell>
                <TableCell>{employee.joining_date}</TableCell>
                <TableCell>{employee.type ? "Full-time" : "Part-time"}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(employee)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(employee.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">No employees found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeTable;