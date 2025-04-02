import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import CategoriesTable from "./CategoriesTable";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedCategories = JSON.parse(localStorage.getItem("categories")) || [];
    setCategories(storedCategories);
  }, []);

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

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
    setNewCategory({ name: "", description: "" });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditCategory = (category) => {
    setNewCategory(category);
    setEditingId(category.id);
    setDialogOpen(true);
  };

  const handleDeleteCategory = (id) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Categories</h4>
              <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add New Category
              </Button>
            </div>
          </nav>

          <CategoriesTable categories={categories} onEdit={handleEditCategory} onDelete={handleDeleteCategory} />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingId ? "Edit Category" : "Add New Category"}</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Category Name"
                variant="outlined"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Description"
                variant="outlined"
                multiline
                rows={3}
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSaveCategory} color="primary" variant="contained">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Categories;
