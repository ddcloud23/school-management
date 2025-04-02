import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import OvertimeRecordsTable from './OvertimeRecordsTable';

const OvertimeRecordsPage = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("overtimeRecords")) || [];
    setRecords(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("overtimeRecords", JSON.stringify(records));
  }, [records]);
  
  const handleEditRecord = (record) => {
    navigate(`/edit-overtime-record/${record.id}`, { state: { record } });
  };
  
  const handleDeleteRecord = (id) => {
    setRecords(records.filter((record) => record.id !== id));
  };
  
  const handleAddRecord = () => {
    navigate('/add-overtime-record');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Overtime Records</h4>
              <Button variant="contained" color="primary" onClick={handleAddRecord}>
                Add New Record
              </Button>
            </div>
          </nav>
          
          <OvertimeRecordsTable
            records={records}
            onEdit={handleEditRecord}
            onDelete={handleDeleteRecord}
          />
        </div>
      </div>
    </div>
  );
};

export default OvertimeRecordsPage;