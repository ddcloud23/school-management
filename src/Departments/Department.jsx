import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import DepartmentsTable from "./DepartmentTable";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedDepartments = JSON.parse(localStorage.getItem("departments")) || [];
    setDepartments(storedDepartments);
  }, []);

  useEffect(() => {
    localStorage.setItem("departments", JSON.stringify(departments));
  }, [departments]);

  const handleSaveDepartment = () => {
    if (!newDepartment.name || !newDepartment.description) return;

    if (editingId !== null) {
      setDepartments(
        departments.map((d) =>
          d.id === editingId ? { ...d, name: newDepartment.name, description: newDepartment.description } : d
        )
      );
    } else {
      const newEntry = {
        id: departments.length + 1,
        name: newDepartment.name,
        description: newDepartment.description,
      };
      setDepartments([...departments, newEntry]);
    }
    setNewDepartment({ name: "", description: "" });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditDepartment = (department) => {
    setNewDepartment(department);
    setEditingId(department.id);
    setDialogOpen(true);
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Departments</h4>
              <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add New Department
              </Button>
            </div>
          </nav>

          <DepartmentsTable departments={departments} onEdit={handleEditDepartment} onDelete={handleDeleteDepartment} />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingId ? "Edit Department" : "Add New Department"}</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Department Name"
                variant="outlined"
                value={newDepartment.name}
                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={newDepartment.description}
                onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSaveDepartment} color="primary" variant="contained">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Department;
