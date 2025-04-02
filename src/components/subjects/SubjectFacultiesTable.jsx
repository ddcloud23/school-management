import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SubjectFacultiesTable = () => {
  const [subjectFaculties, setSubjectFaculties] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newSubjectFaculty, setNewSubjectFaculty] = useState({ wmp_id: "", sub_id: "", class_allocated: "", createdAt: "", updatedAt: "" });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("subjectFaculties")) || [];
    setSubjectFaculties(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("subjectFaculties", JSON.stringify(subjectFaculties));
  }, [subjectFaculties]);

  const handleMenuClick = (event, id) => {
    setDeleteId(id);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setDeleteId(null);
  };

  const handleDelete = () => {
    setSubjectFaculties(subjectFaculties.filter((item) => item.id !== deleteId));
    handleMenuClose();
  };

  const handleSaveSubjectFaculty = () => {
    if (!newSubjectFaculty.wmp_id || !newSubjectFaculty.sub_id || !newSubjectFaculty.class_allocated) return;
    const currentDate = new Date().toISOString().split("T")[0]; // Only store date (no time)
    
    if (editingId !== null) {
      setSubjectFaculties(
        subjectFaculties.map((s) =>
          s.id === editingId ? { ...s, ...newSubjectFaculty, updatedAt: currentDate } : s
        )
      );
    }
    setFormOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "wmp_id", headerName: "WMP ID", flex: 1 },
    { field: "sub_id", headerName: "Subject ID", flex: 1 },
    { field: "class_allocated", headerName: "Class Allocated", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "updatedAt", headerName: "Updated At", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row.id)}>
            <MoreVertIcon />
          </IconButton>
          <Menu 
            anchorEl={menuAnchorEl} 
            open={Boolean(menuAnchorEl) && deleteId === params.row.id} 
            onClose={handleMenuClose}
            PaperProps={{ style: { width: "150px" } }}
          >
            <MenuItem
              onClick={() => { 
                setFormOpen(true); 
                setNewSubjectFaculty(params.row); 
                setEditingId(params.row.id); 
                handleMenuClose();
              }}
            >
              Edit
            </MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid 
          rows={subjectFaculties} 
          columns={columns} 
          pageSize={5} 
          checkboxSelection 
          autoHeight 
        />
      </Box>

      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>Edit Subject Faculty</DialogTitle>
        <DialogContent>
          <TextField 
            fullWidth 
            margin="dense" 
            label="WMP ID" 
            value={newSubjectFaculty.wmp_id} 
            onChange={(e) => setNewSubjectFaculty({ ...newSubjectFaculty, wmp_id: e.target.value })} 
          />
          <TextField 
            fullWidth 
            margin="dense" 
            label="Subject ID" 
            value={newSubjectFaculty.sub_id} 
            onChange={(e) => setNewSubjectFaculty({ ...newSubjectFaculty, sub_id: e.target.value })} 
          />
          <TextField 
            fullWidth 
            margin="dense" 
            label="Class Allocated" 
            value={newSubjectFaculty.class_allocated} 
            onChange={(e) => setNewSubjectFaculty({ ...newSubjectFaculty, class_allocated: e.target.value })} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)}>Cancel</Button>
          <Button onClick={handleSaveSubjectFaculty} color="primary" variant="contained">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SubjectFacultiesTable;