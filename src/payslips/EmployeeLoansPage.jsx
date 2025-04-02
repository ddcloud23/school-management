import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const EmployeeLoansPage = () => {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employeeLoans")) || [];
    setLoans(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("employeeLoans", JSON.stringify(loans));
  }, [loans]);
  
  const handleEditLoan = (loan) => {
    navigate(`/edit-employee-loan/${loan.id}`, { state: { loan } });
  };
  
  const handleDeleteLoan = (id) => {
    setLoans(loans.filter((loan) => loan.id !== id));
  };
  
  const handleAddLoan = () => {
    navigate('/add-employee-loan');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Employee Loans</h4>
              <Button variant="contained" color="primary" onClick={handleAddLoan}>
                Add New Loan
              </Button>
            </div>
          </nav>
          
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="employee loans table">
              <TableHead>
                <TableRow>
                  <TableCell><strong>ID</strong></TableCell>
                  <TableCell><strong>Employee ID</strong></TableCell>
                  <TableCell><strong>Loan Amount</strong></TableCell>
                  <TableCell><strong>Interest Rate</strong></TableCell>
                  <TableCell><strong>Monthly Installments</strong></TableCell>
                  <TableCell><strong>Remaining Balance</strong></TableCell>
                  <TableCell><strong>Start Date</strong></TableCell>
                  <TableCell><strong>End Date</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loans.length > 0 ? (
                  loans.map((loan) => (
                    <TableRow key={loan.id}>
                      <TableCell>{loan.id}</TableCell>
                      <TableCell>{loan.employee_id}</TableCell>
                      <TableCell>{loan.loan_amount}</TableCell>
                      <TableCell>{loan.interest_rate}</TableCell>
                      <TableCell>{loan.monthly_installments}</TableCell>
                      <TableCell>{loan.remaining_balance}</TableCell>
                      <TableCell>{loan.start_date}</TableCell>
                      <TableCell>{loan.end_date}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => handleEditLoan(loan)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleDeleteLoan(loan.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9} align="center">No employee loans found</TableCell>
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

export default EmployeeLoansPage;
