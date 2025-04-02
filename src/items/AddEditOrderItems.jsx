import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditOrderItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState({
    itemId: '',
    vendorId: '',
    quantity: '',
    orderedDate: '',
    deliveryDate: '',
    createdAt: '',
    updatedAt: '',
    deletedAt: ''
  });

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("orders")) || [];
    if (order.id) {
      const updatedData = storedData.map((o) => (o.id === order.id ? order : o));
      localStorage.setItem("orders", JSON.stringify(updatedData));
    } else {
      order.id = Date.now();
      localStorage.setItem("orders", JSON.stringify([...storedData, order]));
    }
    navigate('/item-orders');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h3>{order.id ? 'Edit' : 'Add'} Order</h3>
          <form onSubmit={handleSubmit} className="row g-3">
            {Object.keys(order).map((key) => (
              <div className="col-md-6" key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/([A-Z])/g, ' $1').toUpperCase()}
                  name={key}
                  value={order[key]}
                  onChange={handleChange}
                  className="mb-3"
                />
              </div>
            ))}
            <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
            <Button variant="outlined" color="secondary" onClick={() => navigate('/item-orders')}>Cancel</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditOrderItems;
