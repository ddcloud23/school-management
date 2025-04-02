import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import StudentHostelFeeTable from './StudentHostelFeeTable';

const StudentHostelFee = () => {
  const [fees, setFees] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load student hostel fee records from localStorage (simulating API)
    const storedData = JSON.parse(localStorage.getItem("studentHostelFees")) || [];
    setFees(storedData);
  }, []);
  
  useEffect(() => {
    // Save changes to localStorage
    localStorage.setItem("studentHostelFees", JSON.stringify(fees));
  }, [fees]);
  
  const handleEditFee = (fee) => {
    navigate(`/edit-student-hostel-fee/${fee.id}`, { state: { fee } });
  };
  
  const handleDeleteFee = (id) => {
    setFees(fees.filter((fee) => fee.id !== id));
  };
  
  const handleAddFee = () => {
    navigate('/add-student-hostel-fee');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Student Hostel Fee Management</h4>
              <Button variant="contained" color="primary" onClick={handleAddFee}>
                Add New Fee Record
              </Button>
            </div>
          </nav>
          
          <StudentHostelFeeTable
            fees={fees}
            onEdit={handleEditFee}
            onDelete={handleDeleteFee}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentHostelFee;
