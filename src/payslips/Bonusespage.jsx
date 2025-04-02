import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import BonusesTable from './BonusesTable';

const BonusesPage = () => {
  const [bonuses, setBonuses] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("bonuses")) || [];
    setBonuses(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("bonuses", JSON.stringify(bonuses));
  }, [bonuses]);
  
  const handleEditBonus = (bonus) => {
    navigate(`/edit-bonus/${bonus.id}`, { state: { bonus } });
  };
  
  const handleDeleteBonus = (id) => {
    setBonuses(bonuses.filter((bonus) => bonus.id !== id));
  };
  
  const handleAddBonus = () => {
    navigate('/add-bonus');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Bonuses</h4>
              <Button variant="contained" color="primary" onClick={handleAddBonus}>
                Add New Bonus
              </Button>
            </div>
          </nav>
          
          <BonusesTable
            bonuses={bonuses}
            onEdit={handleEditBonus}
            onDelete={handleDeleteBonus}
          />
        </div>
      </div>
    </div>
  );
};

export default BonusesPage;