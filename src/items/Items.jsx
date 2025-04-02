// Items.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import ItemsTable from './Itemstable';
const Items = () => {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Load items from localStorage (simulating API)
    const storedData = JSON.parse(localStorage.getItem("items")) || [];
    setItems(storedData);
  }, []);
  
  useEffect(() => {
    // Save changes to localStorage
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  
  const handleEditItem = (item) => {
    navigate(`/edit-item/${item.id}`, { state: { item } });
  };
  
  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  
  const handleAddItem = () => {
    navigate('/add-item');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Items </h4>
              <Button variant="contained" color="primary" onClick={handleAddItem}>
                Add New Item
              </Button>
            </div>
          </nav>
          
          <ItemsTable
            items={items}
            onEdit={handleEditItem}
            onDelete={handleDeleteItem}
          />
        </div>
      </div>
    </div>
  );
};

export default Items;