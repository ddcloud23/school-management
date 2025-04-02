import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditPayrollTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [transaction, setTransaction] = useState({
    id: '',
    employeeId: '',
    payrollId: '',
    transactionDate: '',
    paymentMethod: '',
    transactionReference: '',
    amount: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: ''
  });

  useEffect(() => {
    if (location.state?.transaction) {
      setTransaction(location.state.transaction);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("payrollTransactions")) || [];
    if (transaction.id) {
      const updatedData = storedData.map((t) => (t.id === transaction.id ? transaction : t));
      localStorage.setItem("payrollTransactions", JSON.stringify(updatedData));
    } else {
      transaction.id = Date.now();
      localStorage.setItem("payrollTransactions", JSON.stringify([...storedData, transaction]));
    }
    navigate('/payroll-transactions');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h4 className='text-primary'>{transaction.id ? 'Edit' : 'Add'} Payroll Transaction</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-6">
              <TextField fullWidth label="ID" name="id" value={transaction.id} onChange={handleChange} className="mb-3" disabled />
            </div>
            <div className="col-md-6">
              <TextField fullWidth label="Employee ID" name="employeeId" value={transaction.employeeId} onChange={handleChange} className="mb-3" />
            </div>
            <div className="col-md-6">
              <TextField fullWidth label="Payroll ID" name="payrollId" value={transaction.payrollId} onChange={handleChange} className="mb-3" />
            </div>
            <div className="col-md-6">
              <TextField fullWidth type="datetime-local" label="Transaction Date" name="transactionDate" value={transaction.transactionDate} onChange={handleChange} className="mb-3" InputLabelProps={{ shrink: true }} />
            </div>
            <div className="col-md-6">
              <TextField select fullWidth label="Payment Method" name="paymentMethod" value={transaction.paymentMethod} onChange={handleChange} className="mb-3">
                <MenuItem value="Bank Transfer">Bank Transfer</MenuItem>
                <MenuItem value="Cheque">Cheque</MenuItem>
                <MenuItem value="Cash">Cash</MenuItem>
              </TextField>
            </div>
            <div className="col-md-6">
              <TextField fullWidth label="Transaction Reference" name="transactionReference" value={transaction.transactionReference} onChange={handleChange} className="mb-3" />
            </div>
            <div className="col-md-6">
              <TextField fullWidth label="Amount" name="amount" value={transaction.amount} onChange={handleChange} className="mb-3" />
            </div>
            <div className="col-12 text-end">
              <Button type="submit" variant="contained" color="primary" size="medium" className="me-2">Save</Button>
              <Button variant="outlined" color="secondary" size="medium" onClick={() => navigate('/payroll-transactions')}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditPayrollTransaction;
