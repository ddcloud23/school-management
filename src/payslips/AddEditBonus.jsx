import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button } from '@mui/material';
import Sidebar from '../components/sidebar/Sidebar';

const AddEditBonus = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bonus, setBonus] = useState({
    id: '',
    employee_id: '',
    bonus_date: '',
    bonus_amount: '',
    reason: '',
    created_at: '',
    updated_at: '',
    deleted_at: ''
  });

  useEffect(() => {
    if (location.state?.bonus) {
      setBonus(location.state.bonus);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setBonus({ ...bonus, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("bonuses")) || [];
    if (bonus.id) {
      const updatedData = storedData.map((b) => (b.id === bonus.id ? bonus : b));
      localStorage.setItem("bonuses", JSON.stringify(updatedData));
    } else {
      bonus.id = Date.now();
      localStorage.setItem("bonuses", JSON.stringify([...storedData, bonus]));
    }
    navigate('/bonuses');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <h4 className='text-primary'>{bonus.id ? 'Edit' : 'Add'} Bonus</h4>
          <form onSubmit={handleSubmit} className="row g-3">
            {Object.keys(bonus).map((key) => (
              <div className="col-md-6" key={key}>
                <TextField
                  fullWidth
                  label={key.replace(/_/g, ' ').toUpperCase()}
                  name={key}
                  value={bonus[key]}
                  onChange={handleChange}
                  className="mb-3"
                />
              </div>
            ))}
            <div className="d-flex justify-content-end">
              <Button type="submit" variant="contained" color="primary" className="me-2">Save</Button>
              <Button variant="outlined" color="secondary" onClick={() => navigate('/bonuses')}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditBonus;
