import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PayslipTable = ({ payslips, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="payslips table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Salary Month</strong></TableCell>
            <TableCell><strong>Gross Salary</strong></TableCell>
            <TableCell><strong>Total Deduction</strong></TableCell>
            <TableCell><strong>Payment Status</strong></TableCell>
            <TableCell><strong>Net Salary</strong></TableCell>
            <TableCell><strong>Processed Date</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {payslips.length > 0 ? (
            payslips.map((payslip) => (
              <TableRow key={payslip.id}>
                <TableCell>{payslip.employeeId}</TableCell>
                <TableCell>{payslip.salaryMonth}</TableCell>
                <TableCell>{payslip.grossSalary}</TableCell>
                <TableCell>{payslip.totalDeduction}</TableCell>
                <TableCell>{payslip.paymentStatus}</TableCell>
                <TableCell>{payslip.netSalary}</TableCell>
                <TableCell>{payslip.processedDate}</TableCell>
                <TableCell>{payslip.createdAt}</TableCell>
                <TableCell>{payslip.updatedAt}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(payslip)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(payslip.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">No payslips found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PayslipTable;
