import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, TextField, Button, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const AnnouncementsTable = ({ announcements, setAnnouncements }) => {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAnnouncement, setNewAnnouncement] = useState({ to: "", subject: "", message: "", created_at: "", updated_at: "" });

  useEffect(() => {
    localStorage.setItem("announcements", JSON.stringify(announcements));
  }, [announcements]);

  const handleMenuClick = (event, announcement) => {
    setSelectedAnnouncement(announcement);
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
    setSelectedAnnouncement(null);
  };

  const handleDeleteConfirmation = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDelete = () => {
    setAnnouncements(announcements.filter((item) => item.id !== selectedAnnouncement.id));
    setDeleteDialogOpen(false);
  };

  const handleEdit = () => {
    if (selectedAnnouncement) {
      setNewAnnouncement({ ...selectedAnnouncement });
      setEditingId(selectedAnnouncement.id);
      setFormOpen(true);
      handleMenuClose();
    }
  };

  const handleSaveAnnouncement = () => {
    if (!newAnnouncement.to || !newAnnouncement.subject || !newAnnouncement.message) return;
    const currentDate = new Date().toISOString().split("T")[0];

    if (editingId !== null) {
      // Ensure the announcement updates correctly
      setAnnouncements(
        announcements.map((a) =>
          a.id === editingId ? { ...a, ...newAnnouncement, updated_at: currentDate } : a
        )
      );
    } else {
      // Adding a new announcement
      const newEntry = {
        id: announcements.length + 1,
        ...newAnnouncement,
        created_at: currentDate,
        updated_at: currentDate,
      };
      setAnnouncements([...announcements, newEntry]);
    }

    setFormOpen(false);
    setNewAnnouncement({ to: "", subject: "", message: "", created_at: "", updated_at: "" });
    setEditingId(null);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "to", headerName: "To", flex: 1 },
    { field: "subject", headerName: "Subject", flex: 1 },
    { field: "message", headerName: "Message", flex: 2 },
    { field: "created_at", headerName: "Created At", flex: 1, valueGetter: (params) => params.value.split("T")[0] },
    { field: "updated_at", headerName: "Updated At", flex: 1, valueGetter: (params) => params.value.split("T")[0] },
    {
      field: "action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton onClick={(event) => handleMenuClick(event, params.row)}>
            <MoreVertIcon />
          </IconButton>
          <Menu 
            anchorEl={menuAnchorEl} 
            open={Boolean(menuAnchorEl) && selectedAnnouncement?.id === params.row.id} 
            onClose={handleMenuClose}
            PaperProps={{ style: { width: "150px" } }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDeleteConfirmation}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <Box sx={{ padding: 2 }}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid 
          rows={announcements} 
          columns={columns} 
          pageSize={5} 
          checkboxSelection 
          autoHeight 
        />
      </Box>

      {/* Dialog for Add/Edit Announcement */}
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <DialogTitle>{editingId ? "Edit Announcement" : "Add New Announcement"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="To"
            value={newAnnouncement.to}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, to: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Subject"
            value={newAnnouncement.subject}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, subject: e.target.value })}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Message"
            multiline
            rows={3}
            value={newAnnouncement.message}
            onChange={(e) => setNewAnnouncement({ ...newAnnouncement, message: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFormOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleSaveAnnouncement} color="primary" variant="contained">
            {editingId ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Announcement</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this announcement?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">Delete</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AnnouncementsTable;
