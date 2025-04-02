import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Grid } from "@mui/material";

const AddEditStudentHostelFee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const isEditing = !!id;

  const emptyFeeRecord = {
    student_id: '',
    fee_category_id: '',
    amount: '',
    due_date: '',
    paid_rate: '',
    status: 'Unpaid',
    payment_method: '',
    transaction_id: ''
  };

  const [feeRecord, setFeeRecord] = useState(emptyFeeRecord);
  const [feeCategories, setFeeCategories] = useState([
    { id: 1, name: 'Hostel Rent' },
    { id: 2, name: 'Mess Fees' },
    { id: 3, name: 'Maintenance' }
  ]);

  useEffect(() => {
    if (isEditing && location.state?.feeRecord) {
      setFeeRecord(location.state.feeRecord);
    }
  }, [isEditing, location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeeRecord({
      ...feeRecord,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const feeRecords = JSON.parse(localStorage.getItem("studentHostelFees")) || [];
    const currentTime = new Date().toISOString();

    if (isEditing) {
      const updatedFees = feeRecords.map(record => 
        record.id === parseInt(id) ? { 
          ...feeRecord, 
          updated_at: currentTime 
        } : record
      );
      localStorage.setItem("studentHostelFees", JSON.stringify(updatedFees));
    } else {
      const newRecord = {
        ...feeRecord,
        id: feeRecords.length > 0 ? Math.max(...feeRecords.map(record => record.id)) + 1 : 1,
        created_at: currentTime,
        updated_at: currentTime
      };
      localStorage.setItem("studentHostelFees", JSON.stringify([...feeRecords, newRecord]));
    }

    navigate('/student-hostel-fee');
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container">
              <h4 className="text-primary">{isEditing ? 'Edit Hostel Fee Record' : 'Add Hostel Fee Record'}</h4>
            </div>
          </nav>

          <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Student ID"
                  name="student_id"
                  value={feeRecord.student_id}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Fee Category</InputLabel>
                  <Select
                    name="fee_category_id"
                    value={feeRecord.fee_category_id}
                    onChange={handleChange}
                    label="Fee Category"
                    required
                  >
                    {feeCategories.map(category => (
                      <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Amount"
                  name="amount"
                  type="number"
                  value={feeRecord.amount}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Due Date"
                  name="due_date"
                  type="date"
                  value={feeRecord.due_date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Paid Rate"
                  name="paid_rate"
                  type="number"
                  value={feeRecord.paid_rate}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select
                    name="status"
                    value={feeRecord.status}
                    onChange={handleChange}
                    label="Status"
                    required
                  >
                    <MenuItem value="Paid">Paid</MenuItem>
                    <MenuItem value="Unpaid">Unpaid</MenuItem>
                    <MenuItem value="Pending">Pending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Payment Method"
                  name="payment_method"
                  value={feeRecord.payment_method}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Transaction ID"
                  name="transaction_id"
                  value={feeRecord.transaction_id}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <div className="d-flex justify-content-end mt-4">
              <Button 
                variant="outlined" 
                color="secondary" 
                className="me-2"
                onClick={() => navigate('/student-hostel-fee')}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                {isEditing ? 'Update' : 'Save'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEditStudentHostelFee;