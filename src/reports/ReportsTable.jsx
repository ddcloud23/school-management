import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReportsTable = ({ reports, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Date(dateString).toLocaleDateString('en-GB');
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="reports table">
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>Report Type</strong></TableCell>
            <TableCell><strong>Total Income</strong></TableCell>
            <TableCell><strong>Total Expense</strong></TableCell>
            <TableCell><strong>Net Profit</strong></TableCell>
            <TableCell><strong>Generated At</strong></TableCell>
            <TableCell><strong>Created At</strong></TableCell>
            <TableCell><strong>Updated At</strong></TableCell>
            <TableCell><strong>Actions</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>{report.id}</TableCell>
                <TableCell>{report.report_type}</TableCell>
                <TableCell>{report.total_income}</TableCell>
                <TableCell>{report.total_expense}</TableCell>
                <TableCell>{report.net_profit}</TableCell>
                <TableCell>{formatDate(report.generated_at)}</TableCell>
                <TableCell>{formatDate(report.created_at)}</TableCell>
                <TableCell>{formatDate(report.updated_at)}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => onEdit(report)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => onDelete(report.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} align="center">No reports found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReportsTable;
