import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditAttendance = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isAddMode = !id;

  // Get employees from localStorage
  const [employees, setEmployees] = useState([]);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    employee_id: '',
    employeeName: '',
    date: new Date().toISOString().split('T')[0],
    checkIn: '',
    checkOut: '',
    status: 'present',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  useEffect(() => {
    // Load employees from localStorage
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);

    // If editing, populate form with existing data
    if (!isAddMode && location.state?.attendance) {
      setFormData(location.state.attendance);
    }
  }, [isAddMode, id, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'employee_id') {
      const selectedEmployee = employees.find(emp => emp.id === value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        employeeName: selectedEmployee ? `${selectedEmployee.firstName} ${selectedEmployee.lastName}` : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    
    // Convert the time string to ISO format with the current date
    const timeDate = new Date(formData.date);
    const [hours, minutes] = value.split(':');
    timeDate.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0);
    
    setFormData(prev => ({
      ...prev,
      [name]: timeDate.toISOString()
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.employee_id || !formData.date || !formData.status) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create new record or update existing
    const attendanceData = {
      ...formData,
      id: isAddMode ? Date.now().toString() : formData.id,
      updated_at: new Date().toISOString()
    };

    if (isAddMode) {
      attendanceData.created_at = new Date().toISOString();
    }

    // Save to localStorage
    const currentRecords = JSON.parse(localStorage.getItem("employeeAttendance")) || [];
    
    if (isAddMode) {
      localStorage.setItem("employeeAttendance", JSON.stringify([...currentRecords, attendanceData]));
    } else {
      const updatedRecords = currentRecords.map(record => 
        record.id === attendanceData.id ? attendanceData : record
      );
      localStorage.setItem("employeeAttendance", JSON.stringify(updatedRecords));
    }

    navigate('/employee-attendance');
  };

  // Extract time from ISO string for display in time input
  const extractTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" className="mb-4">
                {isAddMode ? 'Add Attendance Record' : 'Edit Attendance Record'}
              </Typography>
              
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel id="employee-select-label">Employee</InputLabel>
                      <Select
                        labelId="employee-select-label"
                        id="employee_id"
                        name="employee_id"
                        value={formData.employee_id}
                        label="Employee"
                        onChange={handleChange}
                        required
                      >
                        {employees.map(employee => (
                          <MenuItem key={employee.id} value={employee.id}>
                            {`${employee.firstName} ${employee.lastName}`}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Date"
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Check-in Time"
                      type="time"
                      name="checkIn"
                      value={extractTime(formData.checkIn)}
                      onChange={handleTimeChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Check-out Time"
                      type="time"
                      name="checkOut"
                      value={extractTime(formData.checkOut)}
                      onChange={handleTimeChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="status-select-label">Status</InputLabel>
                      <Select
                        labelId="status-select-label"
                        id="status"
                        name="status"
                        value={formData.status}
                        label="Status"
                        onChange={handleChange}
                        required
                      >
                        <MenuItem value="present">Present</MenuItem>
                        <MenuItem value="absent">Absent</MenuItem>
                        <MenuItem value="half-day">Half Day</MenuItem>
                        <MenuItem value="late">Late</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} className="mt-3 d-flex justify-content-end">
                    <Button 
                      type="button" 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => navigate('/employee-attendance')}
                      className="me-2"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {isAddMode ? 'Add Record' : 'Update Record'}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddEditAttendance;