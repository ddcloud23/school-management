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
  MenuItem,
  TextareaAutosize
} from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditEmployeeLeave = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const isAddMode = !id;

  // Sample data - in a real app, this would come from an API
  const [employees, setEmployees] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([
    { id: 1, name: 'Annual Leave' },
    { id: 2, name: 'Sick Leave' },
    { id: 3, name: 'Maternity Leave' },
    { id: 4, name: 'Paternity Leave' },
    { id: 5, name: 'Unpaid Leave' }
  ]);

  // Form state
  const [formData, setFormData] = useState({
    id: '',
    employee_id: '',
    employeeName: '',
    leave_type_id: '',
    leaveType: '',
    start_date: '',
    end_date: '',
    reason: '',
    status: 'pending',
    applied_date: new Date().toISOString().split('T')[0],
    approved_by: null,
  });

  useEffect(() => {
    // Load employees from localStorage (simulating API)
    const storedEmployees = JSON.parse(localStorage.getItem("employees")) || [];
    setEmployees(storedEmployees);

    // If editing, populate form with existing data
    if (!isAddMode && location.state?.employeeLeave) {
      setFormData(location.state.employeeLeave);
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
    } else if (name === 'leave_type_id') {
      const selectedLeaveType = leaveTypes.find(lt => lt.id === parseInt(value));
      setFormData(prev => ({
        ...prev,
        [name]: parseInt(value),
        leaveType: selectedLeaveType ? selectedLeaveType.name : ''
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.employee_id || !formData.leave_type_id || !formData.start_date || 
        !formData.end_date || !formData.reason) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Generate a unique ID if adding a new record
    const leaveData = {
      ...formData,
      id: isAddMode ? Date.now().toString() : formData.id,
      applied_date: new Date().toISOString().split('T')[0]
    };

    // Save to localStorage
    const currentLeaves = JSON.parse(localStorage.getItem("employeeLeaves")) || [];
    
    if (isAddMode) {
      localStorage.setItem("employeeLeaves", JSON.stringify([...currentLeaves, leaveData]));
    } else {
      const updatedLeaves = currentLeaves.map(leave => 
        leave.id === leaveData.id ? leaveData : leave
      );
      localStorage.setItem("employeeLeaves", JSON.stringify(updatedLeaves));
    }

    navigate('/employee-leaves');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" className="mb-4">
                {isAddMode ? 'Apply for Leave' : 'Edit Leave Application'}
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
                    <FormControl fullWidth>
                      <InputLabel id="leave-type-select-label">Leave Type</InputLabel>
                      <Select
                        labelId="leave-type-select-label"
                        id="leave_type_id"
                        name="leave_type_id"
                        value={formData.leave_type_id}
                        label="Leave Type"
                        onChange={handleChange}
                        required
                      >
                        {leaveTypes.map(type => (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="Start Date"
                      type="date"
                      name="start_date"
                      value={formData.start_date}
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
                      label="End Date"
                      type="date"
                      name="end_date"
                      value={formData.end_date}
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required
                      inputProps={{
                        min: formData.start_date,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextareaAutosize
                      aria-label="reason"
                      name="reason"
                      placeholder="Reason for Leave"
                      value={formData.reason}
                      onChange={handleChange}
                      minRows={4}
                      style={{ width: '100%', padding: '10px' }}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} className="mt-3 d-flex justify-content-end">
                    <Button 
                      type="button" 
                      variant="outlined" 
                      color="secondary" 
                      onClick={() => navigate('/employee-leaves')}
                      className="me-2"
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="contained" color="primary">
                      {isAddMode ? 'Submit Leave Request' : 'Update Leave Request'}
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

export default AddEditEmployeeLeave;