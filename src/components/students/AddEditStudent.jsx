import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

const AddEditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = !!id;
  
  const emptyStudent = {
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    mobile: '',
    admission_number: '',
    roll_number: '',
    joining_date: '',
    date_of_birth: '',
    gender: 'Male',
    blood_group: 'A+',
    nationality: 'United States',
    category: 'Regular',
    religion: 'Christianity',
    address: '',
    parent_name: '',
    parent_last_name: '',
    parent_relation: '',
    parent_occupation: '',
    parent_email: '',
    parent_phone: '',
    parent_mobile: '',
    parent_address: '',
  };

  const [student, setStudent] = useState(emptyStudent);
  const [sameAddress, setSameAddress] = useState(false);

  useEffect(() => {
    if (isEditing && location.state?.student) {
      setStudent(location.state.student);
    }
  }, [isEditing, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value
    });
  };

  const handleRadioChange = (e) => {
    setStudent({
      ...student,
      gender: e.target.value
    });
  };

  const handleCheckboxChange = (e) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setStudent({
        ...student,
        parent_address: student.address
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const students = JSON.parse(localStorage.getItem("students")) || [];
    const currentTime = new Date().toISOString();
    
    if (isEditing) {
      const updatedStudents = students.map(s => 
        s.id === parseInt(id) ? { ...student, updated_at: currentTime } : s
      );
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    } else {
      const newStudent = {
        ...student,
        id: students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1,
        created_at: currentTime,
        updated_at: currentTime
      };
      localStorage.setItem("students", JSON.stringify([...students, newStudent]));
    }
    
    navigate('/student-management');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container">
              <h4 className="text-primary">{isEditing ? 'Edit Student' : 'Add Student'}</h4>
            </div>
          </nav>

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <div className="row">
              <div className="col-md-6">
                <h5 className="mb-3">Student Name *</h5>
                <div className="row mb-4">
                  <div className="col">
                    <TextField
                      fullWidth
                      label="First Name"
                      name="first_name"
                      value={student.first_name}
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
                      value={student.last_name}
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
                    name="date_of_birth"
                    type="date"
                    value={student.date_of_birth}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="d-block mb-2">Gender</label>
                  <RadioGroup
                    row
                    name="gender"
                    value={student.gender}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                  </RadioGroup>
                </div>

                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Blood Group</InputLabel>
                    <Select
                      name="blood_group"
                      value={student.blood_group}
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
                  <TextField
                    fullWidth
                    label="Nationality"
                    name="nationality"
                    value={student.nationality}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      name="category"
                      value={student.category}
                      onChange={handleChange}
                      label="Category"
                    >
                      <MenuItem value="Regular">Regular</MenuItem>
                      <MenuItem value="Special">Special</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Religion</InputLabel>
                    <Select
                      name="religion"
                      value={student.religion}
                      onChange={handleChange}
                      label="Religion"
                    >
                      <MenuItem value="Christianity">Christianity</MenuItem>
                      <MenuItem value="Islam">Islam</MenuItem>
                      <MenuItem value="Hinduism">Hinduism</MenuItem>
                      <MenuItem value="Buddhism">Buddhism</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className="col-md-6">
                <h5 className="mb-3">Official Details</h5>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Admission No"
                    name="admission_number"
                    value={student.admission_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Joining Date"
                    name="joining_date"
                    type="date"
                    value={student.joining_date}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Roll No"
                    name="roll_number"
                    value={student.roll_number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <h5 className="mb-3 mt-5">Contact Details</h5>
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={student.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Phone"
                    name="phone"
                    value={student.phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <span>+1</span>,
                    }}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Mobile No"
                    name="mobile"
                    value={student.mobile}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <span>+1</span>,
                    }}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Student Address"
                    name="address"
                    value={student.address}
                    onChange={handleChange}
                    multiline
                    rows={2}
                  />
                  <small className="text-muted">Address Line 1</small>
                </div>
              </div>
            </div>

            <h5 className="mb-3 mt-4">Parent Details</h5>
            <div className="row">
              <div className="col-md-6">
                <div className="row mb-4">
                  <div className="col">
                    <TextField
                      fullWidth
                      label="First Name"
                      name="parent_name"
                      value={student.parent_name}
                      onChange={handleChange}
                    />
                    <small className="text-muted">First Name</small>
                  </div>
                  <div className="col">
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="parent_last_name"
                      value={student.parent_last_name}
                      onChange={handleChange}
                    />
                    <small className="text-muted">Last Name</small>
                  </div>
                </div>

                <div className="mb-4">
                  <FormControl fullWidth>
                    <InputLabel>Relation</InputLabel>
                    <Select
                      name="parent_relation"
                      value={student.parent_relation}
                      onChange={handleChange}
                      label="Relation"
                    >
                      <MenuItem value="">-Select-</MenuItem>
                      <MenuItem value="Father">Father</MenuItem>
                      <MenuItem value="Mother">Mother</MenuItem>
                      <MenuItem value="Guardian">Guardian</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Occupation"
                    name="parent_occupation"
                    value={student.parent_occupation}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="col-md-6">
                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Email"
                    name="parent_email"
                    type="email"
                    value={student.parent_email}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Phone"
                    name="parent_phone"
                    value={student.parent_phone}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <span>+1</span>,
                    }}
                  />
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Mobile No"
                    name="parent_mobile"
                    value={student.parent_mobile}
                    onChange={handleChange}
                    InputProps={{
                      startAdornment: <span>+1</span>,
                    }}
                  />
                </div>

                <div className="form-check mb-2">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={sameAddress}
                    onChange={handleCheckboxChange}
                    id="sameAddressCheck" 
                  />
                  <label className="form-check-label" htmlFor="sameAddressCheck">
                    Address same as Student Address
                  </label>
                </div>

                <div className="mb-4">
                  <TextField
                    fullWidth
                    label="Parent Address"
                    name="parent_address"
                    value={student.parent_address}
                    onChange={handleChange}
                    multiline
                    rows={2}
                    disabled={sameAddress}
                  />
                  <small className="text-muted">Address Line 1</small>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="outlined" 
                color="secondary" 
                className="me-2"
                onClick={() => navigate('/student-management')}
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

export default AddEditStudent;