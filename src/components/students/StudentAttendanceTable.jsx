import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const StudentAttendanceTable = ({ studentAttendance, setStudentAttendance }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAttendance, setNewAttendance] = useState({ student_id: "", date: "", status: "", created_at: "", updated_at: "" });

  useEffect(() => {
    localStorage.setItem("studentAttendance", JSON.stringify(studentAttendance));
  }, [studentAttendance]);

  const handleMenuClick = (event, id) => {
    setDeleteId(id);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setDeleteId(null);
  };

  const handleDelete = () => {
    setStudentAttendance(studentAttendance.filter((item) => item.id !== deleteId));
    handleMenuClose();
  };

  const handleSaveAttendance = () => {
    if (!newAttendance.student_id || !newAttendance.date || !newAttendance.status) return;
    const currentDate = new Date().toISOString().split("T")[0];
    
    if (editingId !== null) {
      setStudentAttendance(
        studentAttendance.map((s) =>
          s.id === editingId ? { ...s, ...newAttendance, updated_at: currentDate } : s
        )
      );
    } else {
      const newEntry = {
        id: studentAttendance.length + 1,
        ...newAttendance,
        created_at: currentDate,
        updated_at: currentDate,
      };
      setStudentAttendance([...studentAttendance, newEntry]);
    }
    setFormOpen(false);
    setNewAttendance({ student_id: "", date: "", status: "", created_at: "", updated_at: "" });
    setEditingId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "student_id", headerName: "Student ID", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <span
          style={{
            backgroundColor: params.value.toLowerCase() === "active" ? "green" : "red",
            color: "white",
            padding: "5px 10px",
            borderRadius: "5px",
            display: "inline-block",
          }}
        >
          {params.value}
        </span>
      ),
    },
    { field: "created_at", headerName: "Created At", flex: 1, valueGetter: (params) => params.value.split("T")[0] },
    { field: "updated_at", headerName: "Updated At", flex: 1, valueGetter: (params) => params.value.split("T")[0] },
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
                setNewAttendance(params.row); 
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
          rows={studentAttendance} 
          columns={columns} 
          pageSize={5} 
          checkboxSelection 
          autoHeight 
        />
      </Box>
    </Box>
  );
};

export default StudentAttendanceTable;