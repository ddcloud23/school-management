
import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const DesignationTable = () => {
  const [designations, setDesignations] = useState([
    { id: 1, title: "Principal", description: "Head of the school" },
    { id: 2, title: "Vice Principal", description: "Assists the principal in administrative tasks" },
    { id: 3, title: "Teacher", description: "Responsible for educating students" },
    { id: 4, title: "Clerk", description: "Handles clerical and administrative work" }
  ]);
  
  const [open, setOpen] = useState(false);
  const [menuEle, setMenuEle] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newDesignation, setNewDesignation] = useState({ title: "", description: "" });

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
    setDesignations(designations.filter((item) => item.id !== deleteId));
    setOpen(false);
    setDeleteId(null);
  };

  const handleAddDesignation = () => {
    setFormOpen(true);
    setNewDesignation({ title: "", description: "" });
    setEditingId(null);
  };

  const handleSaveDesignation = () => {
    if (!newDesignation.title || !newDesignation.description) return;
    if (editingId !== null) {
      setDesignations(
        designations.map((d) =>
          d.id === editingId ? { ...d, title: newDesignation.title, description: newDesignation.description } : d
        )
      );
    } else {
      const newEntry = {
        id: designations.length + 1,
        title: newDesignation.title,
        description: newDesignation.description,
      };
      setDesignations([...designations, newEntry]);
    }
    setFormOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", flex: 1 },
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
            <MenuItem onClick={() => { setFormOpen(true); setNewDesignation(params.row); setEditingId(params.row.id); }}>Edit</MenuItem>
            <MenuItem onClick={() => handleClickOpen(params.row.id)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={designations} columns={columns} pageSize={5} checkboxSelection autoHeight />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <ErrorOutlineIcon sx={{ color: "#ffcc00", fontSize: 50 }} />
          </Box>
          <p>Are you sure you want to delete this designation?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>{editingId ? "Edit Designation" : "Add New Designation"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Title" value={newDesignation.title} onChange={(e) => setNewDesignation({ ...newDesignation, title: e.target.value })} />
          <TextField fullWidth margin="dense" label="Description" multiline rows={3} value={newDesignation.description} onChange={(e) => setNewDesignation({ ...newDesignation, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveDesignation} color="primary" variant="contained">{editingId ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DesignationTable;