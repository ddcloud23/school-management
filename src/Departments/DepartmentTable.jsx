import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DepartmentsTable = () => {
  const [departments, setDepartments] = useState([
    { id: 1, name: "Science", description: "Handles scientific subjects" },
    { id: 2, name: "Mathematics", description: "Focuses on mathematical education" },
    { id: 3, name: "English", description: "English language and literature" },
    { id: 4, name: "Administration", description: "School administrative department" }
  ]);
  
  const [open, setOpen] = useState(false);
  const [menuEle, setMenuEle] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newDepartment, setNewDepartment] = useState({ name: "", description: "" });

  const handleMenuClick = (event, id) => {
    setDeleteId(id);
    setMenuEle(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuEle(null);
    setDeleteId(null);
  };

  const handleClickOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    setDepartments(departments.filter((item) => item.id !== deleteId));
    setOpen(false);
    setDeleteId(null);
  };

  const handleAddDepartment = () => {
    setFormOpen(true);
    setNewDepartment({ name: "", description: "" });
    setEditingId(null);
  };

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
    setFormOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Department Name", flex: 1 },
    { field: "description", headerName: "Description", flex: 2 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu anchorEl={menuEle} open={Boolean(menuEle) && deleteId === params.row.id} onClose={handleMenuClose}>
            <MenuItem onClick={() => { setFormOpen(true); setNewDepartment(params.row); setEditingId(params.row.id); }}>Edit</MenuItem>
            <MenuItem onClick={() => handleClickOpen(params.row.id)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={departments} columns={columns} pageSize={5} checkboxSelection autoHeight />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <ErrorOutlineIcon sx={{ color: "#ffcc00", fontSize: 50 }} />
          </Box>
          <p>Are you sure you want to delete this department?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>{editingId ? "Edit Department" : "Add New Department"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Department Name" value={newDepartment.name} onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })} />
          <TextField fullWidth margin="dense" label="Description" multiline rows={3} value={newDepartment.description} onChange={(e) => setNewDepartment({ ...newDepartment, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveDepartment} color="primary" variant="contained">{editingId ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DepartmentsTable;