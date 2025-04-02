import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import ReportsTable from './ReportsTable';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("reports")) || [];
    setReports(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("reports", JSON.stringify(reports));
  }, [reports]);
  
  const handleEditReport = (report) => {
    navigate(`/edit-report/${report.id}`, { state: { report } });
  };
  
  const handleDeleteReport = (id) => {
    setReports(reports.filter((report) => report.id !== id));
  };
  
  const handleAddReport = () => {
    navigate('/add-report');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Reports </h4>
              <Button variant="contained" color="primary" onClick={handleAddReport}>
                Add New Report
              </Button>
            </div>
          </nav>
          
          <ReportsTable
            reports={reports}
            onEdit={handleEditReport}
            onDelete={handleDeleteReport}
          />
        </div>
      </div>
    </div>
  );
};

export default Reports;
