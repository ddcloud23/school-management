import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ComplianceRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("complianceRecords")) || [];
    setRecords(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("complianceRecords", JSON.stringify(records));
  }, [records]);
  
  const handleEditRecord = (record) => {
    navigate(`/edit-compliance-record/${record.id}`, { state: { record } });
  };
  
  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };
  
  const handleAddRecord = () => {
    navigate('/add-compliance-record');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Compliance Records</h4>
              <Button variant="contained" color="primary" onClick={handleAddRecord}>
                Add New Record
              </Button>
            </div>
          </nav>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="compliance records table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Employee ID</strong></TableCell>
                  <TableCell><strong>Tax Year</strong></TableCell>
                  <TableCell><strong>Tax Paid</strong></TableCell>
                  <TableCell><strong>Public Provident Fund P</strong></TableCell>
                  <TableCell><strong>Insurance Paid</strong></TableCell>
                  <TableCell><strong>Created At</strong></TableCell>
                  <TableCell><strong>Updated At</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.length > 0 ? (
                  records.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.id}</TableCell>
                      <TableCell>{record.employee_id}</TableCell>
                      <TableCell>{record.tax_year}</TableCell>
                      <TableCell>{record.tax_paid}</TableCell>
                      <TableCell>{record.public_provident_fun_p}</TableCell>
                      <TableCell>{record.insurance_paid}</TableCell>
                      <TableCell>{record.created_at}</TableCell>
                      <TableCell>{record.updated_at}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditRecord(record)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteRecord(record.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">No compliance records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ComplianceRecordsPage;
