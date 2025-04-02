import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import FeeCategoriesTable from './FeeCategoriesTable';

const FeeCategories = () => {
  const [feeCategories, setFeeCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load fee categories from localStorage (simulating API)
    const storedData = JSON.parse(localStorage.getItem("feeCategories")) || [];
    setFeeCategories(storedData);
  }, []);

  useEffect(() => {
    // Save changes to localStorage
    localStorage.setItem("feeCategories", JSON.stringify(feeCategories));
  }, [feeCategories]);

  const handleEditCategory = (category) => {
    navigate(`/edit-fee-category/${category.id}`, { state: { category } });
  };

  const handleDeleteCategory = (id) => {
    setFeeCategories(feeCategories.filter((category) => category.id !== id));
  };

  const handleAddCategory = () => {
    navigate('/add-fee-category');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Fee Categories </h4>
              <Button variant="contained" color="primary" onClick={handleAddCategory}>
                Add New Fee Category
              </Button>
            </div>
          </nav>

          <FeeCategoriesTable
            feeCategories={feeCategories}
            onEdit={handleEditCategory}
            onDelete={handleDeleteCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default FeeCategories;
