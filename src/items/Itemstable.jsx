import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ItemsTable = ({ items, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="items table">
        <TableHead>
          <TableRow>
            <TableCell><strong>Product Code</strong></TableCell>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
            <TableCell><strong>Category</strong></TableCell>
            <TableCell><strong>Quantity</strong></TableCell>
            <TableCell><strong>Weight</strong></TableCell>
            <TableCell><strong>Height</strong></TableCell>
            <TableCell><strong>Width</strong></TableCell>
            <TableCell><strong>Depth</strong></TableCell>
            <TableCell><strong>Vendor ID</strong></TableCell>
            <TableCell><strong>Sub Category</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length > 0 ? (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.productCode}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.weight}</TableCell>
                <TableCell>{item.height}</TableCell>
                <TableCell>{item.width}</TableCell>
                <TableCell>{item.depth}</TableCell>
                <TableCell>{item.vendor_id}</TableCell>
                <TableCell>{item.sub_category}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(item.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={13} align="center">No items found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ItemsTable;