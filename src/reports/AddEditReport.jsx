import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField } from "@mui/material";

const AddEditReport = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = !!id;

  const emptyReport = {
    report_type: '',
    total_income: '',
    total_expense: '',
    net_profit: '',
    generated_at: '',
  };

  const [report, setReport] = useState(emptyReport);

  useEffect(() => {
    if (isEditing && location.state?.report) {
      setReport(location.state.report);
    }
  }, [isEditing, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReport({
      ...report,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reports = JSON.parse(localStorage.getItem("reports")) || [];
    const currentTime = new Date().toISOString();

    if (isEditing) {
      const updatedReports = reports.map(r => 
        r.id === parseInt(id) ? { 
          ...report, 
          updated_at: currentTime 
        } : r
      );
      localStorage.setItem("reports", JSON.stringify(updatedReports));
    } else {
      const newReport = {
        ...report,
        id: reports.length > 0 ? Math.max(...reports.map(r => r.id)) + 1 : 1,
        created_at: currentTime,
        updated_at: currentTime,
        generated_at: currentTime
      };
      localStorage.setItem("reports", JSON.stringify([...reports, newReport]));
    }

    navigate('/reports');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container">
              <h4 className="text-primary">{isEditing ? 'Edit Report' : 'Add Report'}</h4>
            </div>
          </nav>

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <div className="mb-4">
              <TextField fullWidth label="Report Type" name="report_type" value={report.report_type} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <TextField fullWidth label="Total Income" name="total_income" type="number" value={report.total_income} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <TextField fullWidth label="Total Expense" name="total_expense" type="number" value={report.total_expense} onChange={handleChange} required />
            </div>
            <div className="mb-4">
              <TextField fullWidth label="Net Profit" name="net_profit" type="number" value={report.net_profit} onChange={handleChange} required />
            </div>

            <div className="d-flex justify-content-end mt-4">
              <Button variant="outlined" color="secondary" onClick={() => navigate('/reports')}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">{isEditing ? 'Update' : 'Save'}</Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditReport;
