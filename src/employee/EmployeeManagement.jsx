import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeTable from './Employeetable';
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  const handleEditEmployee = (employee) => {
    navigate(`/add-employee/${employee.id}`, { state: { employee } });
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const handleAddEmployee = () => {
    navigate('/add-employee');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Employee Management</h4>
              <Button variant="contained" color="primary" onClick={handleAddEmployee}>
                Add New Employee
              </Button>
            </div>
          </nav>

          <EmployeeTable 
            employees={employees} 
            onEdit={handleEditEmployee} 
            onDelete={handleDeleteEmployee} 
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeManagement;