import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import LeaveDeductionsTable from './LeaveDeductionstable';
const LeaveDeductionsPage = () => {
  const [leaveDeductions, setLeaveDeductions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("leaveDeductions")) || [];
    setLeaveDeductions(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("leaveDeductions", JSON.stringify(leaveDeductions));
  }, [leaveDeductions]);
  
  const handleEdit = (record) => {
    navigate(`/edit-leave-deduction/${record.id}`, { state: { record } });
  };
  
  const handleDelete = (id) => {
    setLeaveDeductions(leaveDeductions.filter((record) => record.id !== id));
  };
  
  const handleAdd = () => {
    navigate('/add-leave-deduction');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Leave Deductions </h4>
              <Button variant="contained" color="primary" onClick={handleAdd}>
                Add New Deduction
              </Button>
            </div>
          </nav>
          
          <LeaveDeductionsTable
            leaveDeductions={leaveDeductions}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveDeductionsPage;