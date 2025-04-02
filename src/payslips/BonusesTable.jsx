import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const BonusesTable = ({ bonuses, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="bonuses table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Employee ID</strong></TableCell>
            <TableCell><strong>Bonus Date</strong></TableCell>
            <TableCell><strong>Bonus Amount</strong></TableCell>
            <TableCell><strong>Reason</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bonuses.length > 0 ? (
            bonuses.map((bonus) => (
              <TableRow key={bonus.id}>
                <TableCell>{bonus.id}</TableCell>
                <TableCell>{bonus.employee_id}</TableCell>
                <TableCell>{bonus.bonus_date}</TableCell>
                <TableCell>{bonus.bonus_amount}</TableCell>
                <TableCell>{bonus.reason}</TableCell>
                <TableCell>{bonus.created_at}</TableCell>
                <TableCell>{bonus.updated_at}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(bonus)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(bonus.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} align="center">No bonuses found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BonusesTable;