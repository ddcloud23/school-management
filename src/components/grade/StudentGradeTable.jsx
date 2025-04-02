import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const StudentGradeTable = ({ grades, onEdit, onDelete }) => {
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleMenuClick = (event, id) => {
    setDeleteId(id);
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
    setDeleteId(null);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setDeleteId(null);
  };

  const handleConfirmDelete = () => {
    onDelete(deleteId);
    handleCloseDeleteDialog();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "studentId", headerName: "Student ID", flex: 1 },
    { field: "academicYear", headerName: "Academic Year", flex: 1 },
    { field: "grade", headerName: "Grade", flex: 1 },
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
          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor) && deleteId === params.row.id} onClose={handleMenuClose}>
            <MenuItem onClick={() => { onEdit(params.row); handleMenuClose(); }}>Edit</MenuItem>
            <MenuItem onClick={() => handleOpenDeleteDialog(params.row.id)}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box>
      <DataGrid rows={grades} columns={columns} pageSize={5} checkboxSelection autoHeight />

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogContent>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <ErrorOutlineIcon sx={{ color: "#ffcc00", fontSize: 50 }} />
          </Box>
          <p>Are you sure you want to delete this grade?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StudentGradeTable;