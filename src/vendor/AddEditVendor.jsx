import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditVendor = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [vendor, setVendor] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    createdAt: '',
    updatedAt: ''
  });

  useEffect(() => {
    if (location.state?.vendor) {
      setVendor(location.state.vendor);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("vendors")) || [];
    if (vendor.id) {
      const updatedData = storedData.map((v) => (v.id === vendor.id ? vendor : v));
      localStorage.setItem("vendors", JSON.stringify(updatedData));
    } else {
      vendor.id = Date.now();
      vendor.createdAt = new Date().toISOString().split('T')[0];
      vendor.updatedAt = new Date().toISOString().split('T')[0];
      localStorage.setItem("vendors", JSON.stringify([...storedData, vendor]));
    }
    navigate('/vendors');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h3>{vendor.id ? 'Edit' : 'Add'} Vendor</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            {Object.keys(vendor).map((key) => (
              <div className="col-md-6" key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  name={key}
                  value={vendor[key]}
                  onChange={handleChange}
                  className="mb-3"
                />
              </div>
            ))}
            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/vendors')}>Cancel</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditVendor;
