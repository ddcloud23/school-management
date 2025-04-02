// StudentHostelAttendance.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import StudentHostelAttendanceTable from './StudentHostelAttendancetable';
const StudentHostelAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load student hostel attendance records from localStorage (simulating API)
    const storedData = JSON.parse(localStorage.getItem("studentHostelAttendance")) || [];
    setAttendance(storedData);
  }, []);
  
  useEffect(() => {
    // Save changes to localStorage
    localStorage.setItem("studentHostelAttendance", JSON.stringify(attendance));
  }, [attendance]);
  
  const handleEditAttendance = (record) => {
    navigate(`/edit-student-hostel-attendance/${record.id}`, { state: { record } });
  };
  
  const handleDeleteAttendance = (id) => {
    setAttendance(attendance.filter((record) => record.id !== id));
  };
  
  const handleAddAttendance = () => {
    navigate('/add-student-hostel-attendance');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Student Hostel Attendance Management</h4>
              <Button variant="contained" color="primary" onClick={handleAddAttendance}>
                Add New Attendance Record
              </Button>
            </div>
          </nav>
          
          <StudentHostelAttendanceTable
            attendanceRecords={attendance}
            onEdit={handleEditAttendance}
            onDelete={handleDeleteAttendance}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentHostelAttendance;
