import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditPayslip = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [payslip, setPayslip] = useState({
    employeeId: '',
    salaryMonth: '',
    grossSalary: '',
    totalDeduction: '',
    paymentStatus: '',
    netSalary: '',
    processedDate: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: ''
  });

  useEffect(() => {
    if (location.state?.payslip) {
      setPayslip(location.state.payslip);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setPayslip({ ...payslip, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem('payslips')) || [];
    if (payslip.id) {
      const updatedData = storedData.map((p) => (p.id === payslip.id ? payslip : p));
      localStorage.setItem('payslips', JSON.stringify(updatedData));
    } else {
      payslip.id = Date.now();
      localStorage.setItem('payslips', JSON.stringify([...storedData, payslip]));
    }
    navigate('/payslips');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h3>{payslip.id ? 'Edit' : 'Add'} Payslip</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            {Object.keys(payslip).map((key) => (
              <div className="col-md-6" key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  name={key}
                  value={payslip[key]}
                  onChange={handleChange}
                  className="mb-3"
                />
              </div>
            ))}
            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/payslips')}>Cancel</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditPayslip;
