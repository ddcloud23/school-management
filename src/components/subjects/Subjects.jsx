import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import SubjectsTable from './SubjectsTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const Subjects = () => {
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState({ name: "", code: "", createdAt: "", updatedAt: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects")) || [];
    setSubjects(storedSubjects);
  }, []);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleSaveSubject = () => {
    if (!newSubject.name || !newSubject.code) return;

    const currentTime = new Date().toISOString();

    if (editingId !== null) {
      setSubjects(
        subjects.map((s) =>
          s.id === editingId ? { ...s, name: newSubject.name, code: newSubject.code, updatedAt: currentTime } : s
        )
      );
    } else {
      const newEntry = {
        id: subjects.length + 1,
        name: newSubject.name,
        code: newSubject.code,
        createdAt: currentTime,
        updatedAt: currentTime,
      };
      setSubjects([...subjects, newEntry]);
    }
    setNewSubject({ name: "", code: "", createdAt: "", updatedAt: "" });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditSubject = (subject) => {
    setNewSubject(subject);
    setEditingId(subject.id);
    setDialogOpen(true);
  };

  const handleDeleteSubject = (id) => {
    setSubjects(subjects.filter((s) => s.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Subjects</h4>
              <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add New Subject
              </Button>
            </div>
          </nav>

          <SubjectsTable subjects={subjects} onEdit={handleEditSubject} onDelete={handleDeleteSubject} />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingId ? "Edit Subject" : "Add New Subject"}</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                margin="dense"
                label="Subject Name"
                variant="outlined"
                value={newSubject.name}
                onChange={(e) => setNewSubject({ ...newSubject, name: e.target.value })}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Subject Code"
                variant="outlined"
                value={newSubject.code}
                onChange={(e) => setNewSubject({ ...newSubject, code: e.target.value })}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSaveSubject} color="primary" variant="contained">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
