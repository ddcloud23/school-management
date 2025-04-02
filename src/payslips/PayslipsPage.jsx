import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import PayslipsTable from './PayslipsTable';

const PayslipsPage = () => {
  const [payslips, setPayslips] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("payslips")) || [];
    setPayslips(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("payslips", JSON.stringify(payslips));
  }, [payslips]);
  
  const handleEditPayslip = (payslip) => {
    navigate(`/edit-payslip/${payslip.id}`, { state: { payslip } });
  };
  
  const handleDeletePayslip = (id) => {
    setPayslips(payslips.filter((payslip) => payslip.id !== id));
  };
  
  const handleAddPayslip = () => {
    navigate('/add-payslip');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Payslips</h4>
              <Button variant="contained" color="primary" onClick={handleAddPayslip}>
                Add New Payslip
              </Button>
            </div>
          </nav>
          
          <PayslipsTable
            payslips={payslips}
            onEdit={handleEditPayslip}
            onDelete={handleDeletePayslip}
          />
        </div>
      </div>
    </div>
  );
};

export default PayslipsPage;