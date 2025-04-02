import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const PayrollTransactionsTable = ({ transactions, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="payroll transactions table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Payroll ID</strong></TableCell>
            <TableCell><strong>Transaction Date</strong></TableCell>
            <TableCell><strong>Payment Method</strong></TableCell>
            <TableCell><strong>Transaction Reference</strong></TableCell>
            <TableCell><strong>Amount</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Deleted At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.employeeId}</TableCell>
                <TableCell>{transaction.payrollId}</TableCell>
                <TableCell>{transaction.transactionDate}</TableCell>
                <TableCell>{transaction.paymentMethod}</TableCell>
                <TableCell>{transaction.transactionReference}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.createdAt}</TableCell>
                <TableCell>{transaction.updatedAt}</TableCell>
                <TableCell>{transaction.deletedAt}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(transaction)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(transaction.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={11} align="center">No payroll transactions found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PayrollTransactionsTable;
