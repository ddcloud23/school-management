import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import ItemOrderTable from './ItemOrderTable';

const ItemOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  
  const handleEditOrder = (order) => {
    navigate(`/edit-order/${order.id}`, { state: { order } });
  };
  
  const handleDeleteOrder = (id) => {
    setOrders(orders.filter((order) => order.id !== id));
  };
  
  const handleAddOrder = () => {
    navigate('/add-order');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Item Order </h4>
              <Button variant="contained" color="primary" onClick={handleAddOrder}>
                Add New Order
              </Button>
            </div>
          </nav>
          
          <ItemOrderTable
            orders={orders}
            onEdit={handleEditOrder}
            onDelete={handleDeleteOrder}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemOrderPage;

