import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import LeaveBalancesTable from './LeaveBalancestable';
const LeaveBalancesPage = () => {
  const [leaveBalances, setLeaveBalances] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("leaveBalances")) || [];
    setLeaveBalances(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("leaveBalances", JSON.stringify(leaveBalances));
  }, [leaveBalances]);
  
  const handleEdit = (leaveBalance) => {
    navigate(`/edit-leave-balance/${leaveBalance.id}`, { state: { leaveBalance } });
  };
  
  const handleDelete = (id) => {
    setLeaveBalances(leaveBalances.filter((lb) => lb.id !== id));
  };
  
  const handleAdd = () => {
    navigate('/add-leave-balance');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Leave Balance </h4>
              <Button variant="contained" color="primary" onClick={handleAdd}>
                Add Leave Balance
              </Button>
            </div>
          </nav>
          
          <LeaveBalancesTable
            leaveBalances={leaveBalances}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveBalancesPage;
