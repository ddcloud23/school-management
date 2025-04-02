import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from '../components/sidebar/Sidebar';
import { Button } from "@mui/material";
import PayrollTransactionsTable from './PayrollTransactionsTable';

const PayrollTransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("payrollTransactions")) || [];
    setTransactions(storedData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem("payrollTransactions", JSON.stringify(transactions));
  }, [transactions]);
  
  const handleEditTransaction = (transaction) => {
    navigate(`/edit-payroll-transaction/${transaction.id}`, { state: { transaction } });
  };
  
  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };
  
  const handleAddTransaction = () => {
    navigate('/add-payroll-transaction');
  };
  
  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Payroll Transactions</h4>
              <Button variant="contained" color="primary" onClick={handleAddTransaction}>
                Add New Transaction
              </Button>
            </div>
          </nav>
          
          <PayrollTransactionsTable
            transactions={transactions}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </div>
      </div>
    </div>
  );
};

export default PayrollTransactionsPage;
