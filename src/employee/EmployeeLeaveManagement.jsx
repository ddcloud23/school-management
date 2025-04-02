import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeLeaveTable from './EmployeeLeaveTable';
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";

const EmployeeLeaveManagement = () => {
  const [employeeLeaves, setEmployeeLeaves] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employeeLeaves")) || [];
    setEmployeeLeaves(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("employeeLeaves", JSON.stringify(employeeLeaves));
  }, [employeeLeaves]);

  const handleEditEmployeeLeave = (employeeLeave) => {
    navigate(`/add-employee-leave/${employeeLeave.id}`, { state: { employeeLeave } });
  };

  const handleDeleteEmployeeLeave = (id) => {
    setEmployeeLeaves(employeeLeaves.filter((e) => e.id !== id));
  };

  const handleAddEmployeeLeave = () => {
    navigate('/add-employee-leave');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Employee Leave Management</h4>
              <Button variant="contained" color="primary" onClick={handleAddEmployeeLeave}>
                Apply for Leave
              </Button>
            </div>
          </nav>

          <EmployeeLeaveTable
            employeeLeaves={employeeLeaves}
            onEdit={handleEditEmployeeLeave}
            onDelete={handleDeleteEmployeeLeave}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLeaveManagement;