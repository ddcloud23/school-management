// InstituteManagement.js - Main container component
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import InstituteTable from './InstituteTable';
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";

const InstituteManagement = () => {
  const [institutes, setInstitutes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load institutes from localStorage (simulating API)
    const storedData = JSON.parse(localStorage.getItem("institutes")) || [];
    setInstitutes(storedData);
  }, []);
  
  useEffect(() => {
    // Save changes to localStorage
    localStorage.setItem("institutes", JSON.stringify(institutes));
  }, [institutes]);
  
  const handleEditInstitute = (institute) => {
    navigate(`/add-institute/${institute.id}`, { state: { institute } });
  };
  
  const handleDeleteInstitute = (id) => {
    setInstitutes(institutes.filter((i) => i.id !== id));
  };
  
  const handleAddInstitute = () => {
    navigate('/add-institute');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Institute Management</h4>
              <Button variant="contained" color="primary" onClick={handleAddInstitute}>
                Add New Institute
              </Button>
            </div>
          </nav>
          
          <InstituteTable
            institutes={institutes}
            onEdit={handleEditInstitute}
            onDelete={handleDeleteInstitute}
          />
        </div>
      </div>
    </div>
  );
};

export default InstituteManagement;

