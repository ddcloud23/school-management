import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import { Button, TextField, Container, Paper } from '@mui/material';

const AddEditFeeCategory = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const existingCategory = location.state?.category || null;

  const [category, setCategory] = useState({
    id: existingCategory ? existingCategory.id : Date.now(),
    name: existingCategory ? existingCategory.name : '',
    description: existingCategory ? existingCategory.description : '',
    created_at: existingCategory ? existingCategory.created_at : new Date().toISOString().split('T')[0],
    updated_at: new Date().toISOString().split('T')[0],
    deleted_at: existingCategory ? existingCategory.deleted_at : '',
  });

  useEffect(() => {
    if (existingCategory) {
      setCategory(existingCategory);
    }
  }, [existingCategory]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value, updated_at: new Date().toISOString().split('T')[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let feeCategories = JSON.parse(localStorage.getItem("feeCategories")) || [];

    if (existingCategory) {
      // Update existing category
      feeCategories = feeCategories.map(cat => (cat.id === category.id ? category : cat));
    } else {
      // Add new category
      feeCategories.push(category);
    }

    localStorage.setItem("feeCategories", JSON.stringify(feeCategories));
    navigate('/fee-categories');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <Container maxWidth="sm">
            <Paper elevation={3} className="p-4">
              <h4 className="mb-4 text-primary">
                {existingCategory ? "Edit Fee Category" : "Add New Fee Category"}
              </h4>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Category Name"
                  name="name"
                  value={category.name}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={category.description}
                  onChange={handleChange}
                  fullWidth
                  required
                  margin="normal"
                />
                <Button variant="contained" color="primary" type="submit" className="mt-3">
                  {existingCategory ? "Update Category" : "Add Category"}
                </Button>
                <Button variant="outlined" color="secondary" className="mt-3 ms-2" onClick={() => navigate('/fee-categories')}>
                  Cancel
                </Button>
              </form>
            </Paper>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default AddEditFeeCategory;
