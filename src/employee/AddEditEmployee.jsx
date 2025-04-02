import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, FormControlLabel, Switch, Radio, RadioGroup } from "@mui/material";

const AddEditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = !!id;
  
  const emptyEmployee = {
    department_id: '',
    department: '', // For display purposes
    designations_id: '',
    designation: '', // For display purposes
    employee_id: '',
    type: true, // true = full-time, false = part-time
    joining_date: '',
    first_name: '',
    last_name: '',
    email: '',
    dob: '',
    gender: 'Male',
    marital_status: false,
    phone: '',
    profile_photo_url: '',
    mobile_number: '',
    address_1: '',
    address_2: '',
    city: '',
    state_id: '',
    state: '', // For display purposes
    country_id: '',
    country: '', // For display purposes
    postal_code: '',
    blood_group: 'A+'
  };

  const [employee, setEmployee] = useState(emptyEmployee);
  const [departments, setDepartments] = useState([
    { id: 1, name: 'IT' },
    { id: 2, name: 'HR' },
    { id: 3, name: 'Finance' },
    { id: 4, name: 'Marketing' }
  ]);
  
  const [designations, setDesignations] = useState([
    { id: 1, name: 'Manager' },
    { id: 2, name: 'Developer' },
    { id: 3, name: 'Designer' },
    { id: 4, name: 'HR Specialist' }
  ]);
  
  const [countries, setCountries] = useState([
    { id: 1, name: 'United States' },
    { id: 2, name: 'Canada' },
    { id: 3, name: 'United Kingdom' }
  ]);
  
  const [states, setStates] = useState([
    { id: 1, country_id: 1, name: 'California' },
    { id: 2, country_id: 1, name: 'New York' },
    { id: 3, country_id: 2, name: 'Ontario' },
    { id: 4, country_id: 3, name: 'London' }
  ]);

  useEffect(() => {
    if (isEditing && location.state?.employee) {
      setEmployee(location.state.employee);
    }
  }, [isEditing, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value
    });
    
    // Update related display fields
    if (name === 'department_id') {
      const dept = departments.find(d => d.id === value);
      if (dept) setEmployee(prev => ({ ...prev, department: dept.name }));
    } else if (name === 'designations_id') {
      const desig = designations.find(d => d.id === value);
      if (desig) setEmployee(prev => ({ ...prev, designation: desig.name }));
    } else if (name === 'country_id') {
      const country = countries.find(c => c.id === value);
      if (country) setEmployee(prev => ({ ...prev, country: country.name }));
      // Reset state when country changes
      setEmployee(prev => ({ ...prev, state_id: '', state: '' }));
    } else if (name === 'state_id') {
      const state = states.find(s => s.id === value);
      if (state) setEmployee(prev => ({ ...prev, state: state.name }));
    }
  };

  const handleSwitchChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.checked
    });
  };

  const handleRadioChange = (e) => {
    setEmployee({
      ...employee,
      gender: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const currentTime = new Date().toISOString();
    
    if (isEditing) {
      const updatedEmployees = employees.map(emp => 
        emp.id === parseInt(id) ? { 
          ...employee, 
          updated_at: currentTime 
        } : emp
      );
      localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    } else {
      const newEmployee = {
        ...employee,
        id: employees.length > 0 ? Math.max(...employees.map(emp => emp.id)) + 1 : 1,
        created_at: currentTime,
        updated_at: currentTime
      };
      localStorage.setItem("employees", JSON.stringify([...employees, newEmployee]));
    }
    
    navigate('/employee-management');
  };

  // Filter states based on selected country
  const filteredStates = states.filter(state => 
    state.country_id === employee.country_id
  );

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container">
              <h4 className="text-primary">{isEditing ? 'Edit Employee' : 'Add Employee'}</h4>
            </div>
          </nav>

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3">Personal Information</h5>
                <div className="row mb-4">
                  <div className="col">
                    <TextField
                      fullWidth
                      label="First Name"
                      name="first_name"
                      value={employee.first_name}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">First Name</small>
                  </div>
                  <div className="col">
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="last_name"
                      value={employee.last_name}
                      onChange={handleChange}
                      required
                    />
                    <small className="text-muted">Last Name</small>
                  </div>
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Date of Birth"
                    name="dob"
                    type="date"
                    value={employee.dob}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>

                <div className="mb-4">
                  <label className="d-block mb-2">Gender</label>
                  <RadioGroup
                    row
                    name="gender"
                    value={employee.gender}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                  </RadioGroup>
                </div>

                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      name="blood_group"
                      value={employee.blood_group}
                      onChange={handleChange}
                      label="Blood Group"
                    >
                      <MenuItem value="A+">A+</MenuItem>
                      <MenuItem value="A-">A-</MenuItem>
                      <MenuItem value="B+">B+</MenuItem>
                      <MenuItem value="B-">B-</MenuItem>
                      <MenuItem value="AB+">AB+</MenuItem>
                      <MenuItem value="AB-">AB-</MenuItem>
                      <MenuItem value="O+">O+</MenuItem>
                      <MenuItem value="O-">O-</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={employee.marital_status}
                        onChange={handleSwitchChange}
                        name="marital_status"
                        color="primary"
                      />
                    }
                    label="Married"
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Profile Photo URL"
                    name="profile_photo_url"
                    value={employee.profile_photo_url}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="mb-3">Employment Details</h5>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Employee ID"
                    name="employee_id"
                    value={employee.employee_id}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      name="department_id"
                      value={employee.department_id}
                      onChange={handleChange}
                      label="Department"
                      required
                    >
                      {departments.map(dept => (
                        <MenuItem key={dept.id} value={dept.id}>{dept.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Designation</InputLabel>
                    <Select
                      name="designations_id"
                      value={employee.designations_id}
                      onChange={handleChange}
                      label="Designation"
                      required
                    >
                      {designations.map(desig => (
                        <MenuItem key={desig.id} value={desig.id}>{desig.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Joining Date"
                    name="joining_date"
                    type="date"
                    value={employee.joining_date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={employee.type}
                        onChange={handleSwitchChange}
                        name="type"
                        color="primary"
                      />
                    }
                    label={employee.type ? "Full-Time" : "Part-Time"}
                  />
                </div>
              </div>
            </div>

            <h5 className="mb-3 mt-4">Contact Information</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={employee.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={employee.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Mobile Number"
                    name="mobile_number"
                    value={employee.mobile_number}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Address Line 1"
                    name="address_1"
                    value={employee.address_1}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Address Line 2"
                    name="address_2"
                    value={employee.address_2}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-3">
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={employee.city}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Country</InputLabel>
                    <Select
                      name="country_id"
                      value={employee.country_id}
                      onChange={handleChange}
                      label="Country"
                    >
                      {countries.map(country => (
                        <MenuItem key={country.id} value={country.id}>{country.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>State</InputLabel>
                    <Select
                      name="state_id"
                      value={employee.state_id}
                      onChange={handleChange}
                      label="State"
                      disabled={!employee.country_id}
                    >
                      {filteredStates.map(state => (
                        <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postal_code"
                    value={employee.postal_code}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="outlined" 
                color="secondary" 
                className="me-2"
                onClick={() => navigate('/employee-management')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditEmployee;