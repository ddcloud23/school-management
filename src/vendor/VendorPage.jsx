import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import VendorTable from './VendorTable';

const VendorPage = () => {
  const [vendors, setVendors] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("vendors")) || [];
    setVendors(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("vendors", JSON.stringify(vendors));
  }, [vendors]);
  
  const handleEditVendor = (vendor) => {
    navigate(`/edit-vendor/${vendor.id}`, { state: { vendor } });
  };
  
  const handleDeleteVendor = (id) => {
    setVendors(vendors.filter((vendor) => vendor.id !== id));
  };
  
  const handleAddVendor = () => {
    navigate('/add-vendor');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Vendor </h4>
              <Button variant="contained" color="primary" onClick={handleAddVendor}>
                Add New Vendor
              </Button>
            </div>
          </nav>
          
          <VendorTable
            vendors={vendors}
            onEdit={handleEditVendor}
            onDelete={handleDeleteVendor}
          />
        </div>
      </div>
    </div>
  );
};

export default VendorPage;