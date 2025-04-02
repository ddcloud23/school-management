import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

const AddEditCompliance = ({ open, handleClose, editData, setRecords }) => {
  const [formData, setFormData] = useState({
    id: '',
    employee_id: '',
    tax_year: '',
    tax_paid: '',
    public_provident_fun_p: '',
    insurance_paid: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    } else {
      setFormData({
        id: Date.now(),
        employee_id: '',
        tax_year: '',
        tax_paid: '',
        public_provident_fun_p: '',
        insurance_paid: '',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    setRecords(prevRecords => {
      if (editData) {
        return prevRecords.map(record => record.id === editData.id ? { ...formData, updated_at: new Date().toISOString() } : record);
      } else {
        return [...prevRecords, formData];
      }
    });
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>{editData ? 'Edit Compliance Record' : 'Add Compliance Record'}</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Employee ID" name="employee_id" fullWidth value={formData.employee_id} onChange={handleChange} required />
        <TextField margin="dense" label="Tax Year" name="tax_year" fullWidth value={formData.tax_year} onChange={handleChange} required />
        <TextField margin="dense" label="Tax Paid" name="tax_paid" fullWidth value={formData.tax_paid} onChange={handleChange} required />
        <TextField margin="dense" label="Public Provident Fund P" name="public_provident_fun_p" fullWidth value={formData.public_provident_fun_p} onChange={handleChange} />
        <TextField margin="dense" label="Insurance Paid" name="insurance_paid" fullWidth value={formData.insurance_paid} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEditCompliance;