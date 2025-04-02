import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditOvertimeRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [record, setRecord] = useState({
    id: '',
    employeeId: '',
    date: '',
    overtimeHours: '',
    overtimePay: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: ''
  });

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
    const storedData = JSON.parse(localStorage.getItem("overtimeRecords")) || [];
    if (record.id) {
      const updatedData = storedData.map((r) => (r.id === record.id ? record : r));
      localStorage.setItem("overtimeRecords", JSON.stringify(updatedData));
    } else {
      record.id = Date.now();
      localStorage.setItem("overtimeRecords", JSON.stringify([...storedData, record]));
    }
    navigate('/overtime-records');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h4 className='text-primary'>{record.id ? 'Edit' : 'Add'} Overtime Record</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            {Object.keys(record).map((key) => (
              <div className="col-md-6" key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  name={key}
                  value={record[key]}
                  onChange={handleChange}
                  className="mb-3"
                />
              </div>
            ))}
            <div className="d-flex justify-content-end w-100">
              <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/overtime-records')}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditOvertimeRecord;
