import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditLeaveBalance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [leaveBalance, setLeaveBalance] = useState({
    employeeId: '',
    leaveTypeId: '',
    totalLeaves: '',
    usedLeaves: '',
    remainingLeaves: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: ''
  });

  useEffect(() => {
    if (location.state?.leaveBalance) {
      setLeaveBalance(location.state.leaveBalance);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setLeaveBalance({ ...leaveBalance, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("leaveBalances")) || [];
    if (leaveBalance.id) {
      const updatedData = storedData.map((lb) => (lb.id === leaveBalance.id ? leaveBalance : lb));
      localStorage.setItem("leaveBalances", JSON.stringify(updatedData));
    } else {
      leaveBalance.id = Date.now();
      localStorage.setItem("leaveBalances", JSON.stringify([...storedData, leaveBalance]));
    }
    navigate('/leave-balances');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h3>{leaveBalance.id ? 'Edit' : 'Add'} Leave Balance</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            {Object.keys(leaveBalance).map((key) => (
              <div className="col-md-6" key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  name={key}
                  value={leaveBalance[key]}
                  onChange={handleChange}
                  className="mb-3"
                />
              </div>
            ))}
            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/leave-balances')}>Cancel</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditLeaveBalance;
