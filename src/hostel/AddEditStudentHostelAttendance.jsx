import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { TextField, Button, MenuItem } from '@mui/material';

const AddEditStudentHostelAttendance = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [record, setRecord] = useState({ studentId: '', date: '', status: 'present' });

  useEffect(() => {
    if (location.state?.record) {
      setRecord(location.state.record);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setRecord({ ...record, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("studentHostelAttendance")) || [];
    if (record.id) {
      const updatedData = storedData.map((item) => (item.id === record.id ? record : item));
      localStorage.setItem("studentHostelAttendance", JSON.stringify(updatedData));
    } else {
      record.id = Date.now();
      localStorage.setItem("studentHostelAttendance", JSON.stringify([...storedData, record]));
    }
    navigate('/student-hostel-attendance');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h3>{record.id ? 'Edit' : 'Add'} Student Hostel Attendance</h3>
          <form onSubmit={handleSubmit}>
            <TextField fullWidth label="Student ID" name="studentId" value={record.studentId} onChange={handleChange} required className="mb-3" />
            <TextField fullWidth type="date" label="Date" name="date" value={record.date} onChange={handleChange} required className="mb-3" />
            <TextField select fullWidth label="Status" name="status" value={record.status} onChange={handleChange} required className="mb-3">
              <MenuItem value="present">Present</MenuItem>
              <MenuItem value="absent">Absent</MenuItem>
              <MenuItem value="late">Late</MenuItem>
            </TextField>
            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/student-hostel-attendance')}>Cancel</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditStudentHostelAttendance;
