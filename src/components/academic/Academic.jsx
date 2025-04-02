import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from 'recharts';

const Academic = () => {
  const [academicYears, setAcademicYears] = useState([]);
  const [newAcademicYear, setNewAcademicYear] = useState({ year: '', description: '', startDate: '', endDate: '' });
  const [editingId, setEditingId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchAcademicYears();
  }, []);

  const fetchAcademicYears = () => {
    try {
      const storedData = JSON.parse(localStorage.getItem('academicYears')) || [];
      setAcademicYears(storedData);
    } catch (error) {
      console.error('Error fetching academic years:', error);
    }
  };

  const handleOpenDialog = () => {
    setEditingId(null);
    setNewAcademicYear({ year: '', description: '', startDate: '', endDate: '' });
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAcademicYear(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    if (!newAcademicYear.year || !newAcademicYear.startDate || !newAcademicYear.endDate) {
      alert("Please fill all required fields.");
      return;
    }

    if (editingId) {
      const updatedYears = academicYears.map(item => 
        item.id === editingId ? { ...item, ...newAcademicYear } : item
      );
      setAcademicYears(updatedYears);
      localStorage.setItem('academicYears', JSON.stringify(updatedYears));
    } else {
      const updatedYears = [
        ...academicYears, 
        { id: Date.now(), value: Math.floor(Math.random() * 100) + 10, ...newAcademicYear }
      ];
      setAcademicYears(updatedYears);
      localStorage.setItem('academicYears', JSON.stringify(updatedYears));
    }

    setOpen(false);
  };

  const handleEditAcademicYear = (id, year, description, startDate, endDate) => {
    setEditingId(id);
    setNewAcademicYear({ year, description, startDate, endDate });
    setOpen(true);
  };

  const handleDeleteAcademicYear = (id) => {
    const updatedYears = academicYears.filter(item => item.id !== id);
    setAcademicYears(updatedYears);
    localStorage.setItem('academicYears', JSON.stringify(updatedYears));
  };

  // 📊 Pie Chart Data - Assign dynamic values to avoid repetition
  const pieData = academicYears.map(item => ({
    name: item.year,
    value: item.value || Math.floor(Math.random() * 100) + 10, // Ensure non-zero values
  }));

  // 📈 Area Chart Data - Use meaningful values
  const areaChartData = academicYears.map((item, index) => ({
    year: item.year,
    count: index + 1, // To show progression dynamically
  }));

  const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container-fluid">
      <div className="main">
        <Sidebar />
        <div className="content">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Academic Years</h4>
              <button className="btn btn-primary" onClick={handleOpenDialog}>Add New Academic Year</button>
            </div>
          </nav>

          <div className="row mb-4">
            <div className="col-md-6">
            <ResponsiveContainer width="100%" height={300}>
  <AreaChart data={areaChartData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="year" />
    <YAxis />
    <Tooltip />
    <Area type="natural" dataKey="count" stroke="#8884d8" fill="#8884d8" />
  </AreaChart>
</ResponsiveContainer>

            </div>
            <div className="col-md-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <Dialog open={open} onClose={handleCloseDialog}>
            <DialogTitle>{editingId ? 'Edit Academic Year' : 'Add New Academic Year'}</DialogTitle>
            <DialogContent>
              <TextField label="Year" name="year" value={newAcademicYear.year} onChange={handleChange} fullWidth margin="dense" />
              <TextField label="Description" name="description" value={newAcademicYear.description} onChange={handleChange} fullWidth margin="dense" />
              <TextField label="Start Date" name="startDate" type="date" value={newAcademicYear.startDate} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
              <TextField label="End Date" name="endDate" type="date" value={newAcademicYear.endDate} onChange={handleChange} fullWidth margin="dense" InputLabelProps={{ shrink: true }} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
              <Button onClick={handleSave} color="primary">Save</Button>
            </DialogActions>
          </Dialog>

          <div className="col-md-12 mt-4">
            <div className="table-container p-3 bg-white rounded shadow-sm">
              <table className="table table-striped">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Academic Year</th>
                    <th>Description</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {academicYears.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.year}</td>
                      <td>{item.description}</td>
                      <td>{item.startDate}</td>
                      <td>{item.endDate}</td>
                      <td>
                        <button className="btn btn-sm btn-warning me-2" onClick={() => handleEditAcademicYear(item.id, item.year, item.description, item.startDate, item.endDate)}>Edit</button>
                        <button className="btn btn-sm btn-danger" onClick={() => handleDeleteAcademicYear(item.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Academic;
