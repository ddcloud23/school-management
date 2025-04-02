import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import LeaveTypesTable from './LeaveTypesTable';

const LeaveTypesManagement = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load leave types from localStorage (simulating API)
    const storedData = JSON.parse(localStorage.getItem("leaveTypes")) || [];
    setLeaveTypes(storedData);
  }, []);
  
  useEffect(() => {
    // Save changes to localStorage
    localStorage.setItem("leaveTypes", JSON.stringify(leaveTypes));
  }, [leaveTypes]);
  
  const handleEditLeaveType = (leaveType) => {
    navigate(`/add-leave-type/${leaveType.id}`, { state: { leaveType } });
  };
  
  const handleDeleteLeaveType = (id) => {
    setLeaveTypes(leaveTypes.filter((lt) => lt.id !== id));
  };
  
  const handleAddLeaveType = () => {
    navigate('/add-leave-type');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Leave Types Management</h4>
              <Button variant="contained" color="primary" onClick={handleAddLeaveType}>
                Add New Leave Type
              </Button>
            </div>
          </nav>
          
          <LeaveTypesTable
            leaveTypes={leaveTypes}
            onEdit={handleEditLeaveType}
            onDelete={handleDeleteLeaveType}
          />
        </div>
      </div>
    </div>
  );
};

export default LeaveTypesManagement;
