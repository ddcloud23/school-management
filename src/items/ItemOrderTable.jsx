import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemOrderTable = ({ orders, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="item orders table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Item ID</strong></TableCell>
            <TableCell><strong>Vendor ID</strong></TableCell>
            <TableCell><strong>Quantity</strong></TableCell>
            <TableCell><strong>Ordered Date</strong></TableCell>
            <TableCell><strong>Delivery Date</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Deleted At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.itemid}</TableCell>
                <TableCell>{order.vendorid}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.ordereddate}</TableCell>
                <TableCell>{order.deliverydate}</TableCell>
                <TableCell>{order.createdat}</TableCell>
                <TableCell>{order.updatedat}</TableCell>
                <TableCell>{order.deletedat}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(order)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(order.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={10} align="center">No orders found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemOrderTable;
