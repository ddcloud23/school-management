import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import EmployeeAttendanceTable from './EmployeeAttendanceTable';
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";

const EmployeeAttendanceManagement = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("employeeAttendance")) || [];
    setAttendanceRecords(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("employeeAttendance", JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  const handleEditAttendance = (attendance) => {
    navigate(`/add-attendance/${attendance.id}`, { state: { attendance } });
  };

  const handleDeleteAttendance = (id) => {
    setAttendanceRecords(attendanceRecords.filter((record) => record.id !== id));
  };

  const handleAddAttendance = () => {
    navigate('/add-attendance');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Employee Attendance </h4>
              <Button variant="contained" color="primary" onClick={handleAddAttendance}>
                Add Attendance Record
              </Button>
            </div>
          </nav>

          <EmployeeAttendanceTable
            attendanceRecords={attendanceRecords}
            onEdit={handleEditAttendance}
            onDelete={handleDeleteAttendance}
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeAttendanceManagement;