import React, { useState, useEffect } from "react";
import Sidebar from "../sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import AnnouncementsTable from "./AnnouncementsTable";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState({ to: "", subject: "", message: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("announcements")) || [];
    setAnnouncements(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("announcements", JSON.stringify(announcements));
  }, [announcements]);

  const handleAddAnnouncement = () => {
    setNewAnnouncement({ to: "", subject: "", message: "" }); // Reset form
    setEditingId(null);
    setDialogOpen(true);
  };

  const handleSaveAnnouncement = () => {
    if (!newAnnouncement.to || !newAnnouncement.subject || !newAnnouncement.message) return;

    const currentDate = new Date().toISOString().split("T")[0];

    if (editingId !== null) {
      // Edit existing announcement
      setAnnouncements((prev) =>
        prev.map((a) =>
          a.id === editingId ? { ...a, ...newAnnouncement, updated_at: currentDate } : a
        )
      );
    } else {
      // Add new announcement
      const newEntry = {
        id: announcements.length + 1,
        ...newAnnouncement,
        created_at: currentDate,
        updated_at: currentDate,
      };
      setAnnouncements([...announcements, newEntry]);
    }

    setNewAnnouncement({ to: "", subject: "", message: "" });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditAnnouncement = (announcement) => {
    setNewAnnouncement({ ...announcement });
    setEditingId(announcement.id);
    setDialogOpen(true);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Announcements</h4>
              <Button variant="contained" color="primary" onClick={handleAddAnnouncement}>
                Add New Announcement
              </Button>
            </div>
          </nav>

          <AnnouncementsTable
            announcements={announcements}
            onEdit={handleEditAnnouncement}
            onDelete={handleDeleteAnnouncement}
          />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
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
              <Button onClick={() => setDialogOpen(false)} color="secondary">
                Cancel
              </Button>
              <Button onClick={handleSaveAnnouncement} color="primary" variant="contained">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Announcements;
