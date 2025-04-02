import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const InstituteTable = ({ institutes, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="institute table">
        <TableHead>
          <TableRow>
            <TableCell><strong>School Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Phone</strong></TableCell>
            <TableCell><strong>City</strong></TableCell>
            <TableCell><strong>Country</strong></TableCell>
            <TableCell><strong>Website</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {institutes.length > 0 ? (
            institutes.map((institute) => (
              <TableRow key={institute.id}>
                <TableCell>{institute.school_name}</TableCell>
                <TableCell>{institute.email}</TableCell>
                <TableCell>{institute.phone || institute.mobile_number}</TableCell>
                <TableCell>{institute.city}</TableCell>
                <TableCell>{institute.country_id}</TableCell>
                <TableCell>
                  {institute.website ? (
                    <a href={institute.website} target="_blank" rel="noopener noreferrer">
                      {institute.website}
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => onEdit(institute)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => onDelete(institute.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">No institutes found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InstituteTable;

