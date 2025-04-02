// AddEditItem.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Grid } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditItem = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [item, setItem] = useState({
    productCode: '',
    name: '',
    description: '',
    category: '',
    quantity: '',
    weight: '',
    height: '',
    width: '',
    depth: '',
    vendor_id: '',
    sub_category: '',
    type: ''
  });

  useEffect(() => {
    if (location.state?.item) {
      setItem(location.state.item);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("items")) || [];
    if (item.id) {
      const updatedData = storedData.map((i) => (i.id === item.id ? item : i));
      localStorage.setItem("items", JSON.stringify(updatedData));
    } else {
      item.id = Date.now();
      localStorage.setItem("items", JSON.stringify([...storedData, item]));
    }
    navigate('/items');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h4 className='text-primary'>{item.id ? 'Edit' : 'Add'} Item</h4>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {Object.keys(item).map((key) => (
                <Grid item xs={12} sm={6} key={key}>
                  <TextField
                    fullWidth
                    label={key.replace('_', ' ').toUpperCase()}
                    name={key}
                    value={item[key]}
                    onChange={handleChange}
                    className="mb-3"
                  />
                </Grid>
              ))}
            </Grid>
            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/items')}>Cancel</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditItem;