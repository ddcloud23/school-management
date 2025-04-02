import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const CategoriesTable = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Science", description: "All science-related subjects" },
    { id: 2, name: "Arts", description: "Arts and humanities" },
    { id: 3, name: "Commerce", description: "Commerce and business studies" },
    { id: 4, name: "Sports", description: "Sports and physical education" }
  ]);

  const [open, setOpen] = useState(false);
  const [menuEle, setMenuEle] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

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
    setCategories(categories.filter((item) => item.id !== deleteId));
    setOpen(false);
    setDeleteId(null);
  };

  const handleAddCategory = () => {
    setFormOpen(true);
    setNewCategory({ name: "", description: "" });
    setEditingId(null);
  };

  const handleSaveCategory = () => {
    if (!newCategory.name || !newCategory.description) return;
    if (editingId !== null) {
      setCategories(
        categories.map((c) =>
          c.id === editingId ? { ...c, name: newCategory.name, description: newCategory.description } : c
        )
      );
    } else {
      const newEntry = {
        id: categories.length + 1,
        name: newCategory.name,
        description: newCategory.description,
      };
      setCategories([...categories, newEntry]);
    }
    setFormOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "name", headerName: "Category Name", flex: 1 },
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
            <MenuItem onClick={() => { setFormOpen(true); setNewCategory(params.row); setEditingId(params.row.id); }}>Edit</MenuItem>
            <MenuItem onClick={() => handleClickOpen(params.row.id)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={categories} columns={columns} pageSize={5} checkboxSelection autoHeight />
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <ErrorOutlineIcon sx={{ color: "#ffcc00", fontSize: 50 }} />
          </Box>
          <p>Are you sure you want to delete this category?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>{editingId ? "Edit Category" : "Add New Category"}</DialogTitle>
        <DialogContent>
          <TextField fullWidth margin="dense" label="Category Name" value={newCategory.name} onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })} />
          <TextField fullWidth margin="dense" label="Description" multiline rows={3} value={newCategory.description} onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveCategory} color="primary" variant="contained">{editingId ? "Update" : "Save"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CategoriesTable;