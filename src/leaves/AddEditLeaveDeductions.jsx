import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditLeaveDeductions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [record, setRecord] = useState({
    employee_id: '',
    leave_date: '',
    leave_type: '',
    deduction_amount: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    if (location.state?.record) {
      setRecord(location.state.record);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("leaveDeductions")) || [];
    if (record.id) {
      const updatedData = storedData.map((r) => (r.id === record.id ? record : r));
      localStorage.setItem("leaveDeductions", JSON.stringify(updatedData));
    } else {
      record.id = Date.now();
      record.created_at = new Date().toISOString();
      record.updated_at = new Date().toISOString();
      localStorage.setItem("leaveDeductions", JSON.stringify([...storedData, record]));
    }
    navigate('/leave-deductions');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h3>{record.id ? 'Edit' : 'Add'} Leave Deduction</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            <TextField fullWidth label="Employee ID" name="employee_id" value={record.employee_id} onChange={handleChange} required className="mb-3" />
            <TextField fullWidth label="Leave Date" type="date" name="leave_date" value={record.leave_date} onChange={handleChange} required className="mb-3" />
            <TextField select fullWidth label="Leave Type" name="leave_type" value={record.leave_type} onChange={handleChange} required className="mb-3">
              <MenuItem value="Paid">Paid</MenuItem>
              <MenuItem value="Unpaid">Unpaid</MenuItem>
            </TextField>
            <TextField fullWidth label="Deduction Amount" name="deduction_amount" value={record.deduction_amount} onChange={handleChange} className="mb-3" />
            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/leave-deductions')}>Cancel</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditLeaveDeductions;
