import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import SubjectFacultiesTable from './SubjectFacultiesTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const SubjectsFaculties = () => {
  const [subjectFaculties, setSubjectFaculties] = useState([]);
  const [newFaculty, setNewFaculty] = useState({ wmp_id: '', sub_id: '', class_allocated: '' });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("subjectFaculties")) || [];
    setSubjectFaculties(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("subjectFaculties", JSON.stringify(subjectFaculties));
  }, [subjectFaculties]);

  const handleSaveFaculty = () => {
    if (!newFaculty.wmp_id || !newFaculty.sub_id || !newFaculty.class_allocated) return;

    const currentTime = new Date().toISOString();

    if (editingId !== null) {
      setSubjectFaculties((prevFaculties) =>
        prevFaculties.map((faculty) =>
          faculty.id === editingId
            ? { ...faculty, ...newFaculty, updated_at: currentTime }
            : faculty
        )
      );
    } else {
      const newEntry = {
        id: subjectFaculties.length + 1,
        ...newFaculty,
        created_at: currentTime,
        updated_at: currentTime,
      };
      setSubjectFaculties((prevFaculties) => [...prevFaculties, newEntry]);
    }

    setNewFaculty({ wmp_id: '', sub_id: '', class_allocated: '' });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditFaculty = (faculty) => {
    setNewFaculty({ wmp_id: faculty.wmp_id, sub_id: faculty.sub_id, class_allocated: faculty.class_allocated });
    setEditingId(faculty.id);
    setDialogOpen(true);
  };

  const handleDeleteFaculty = (id) => {
    setSubjectFaculties((prevFaculties) => prevFaculties.filter((faculty) => faculty.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Subject Faculties</h4>
              <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add New Faculty
              </Button>
            </div>
          </nav>

          {/* Pass setSubjectFaculties to update table dynamically */}
          <SubjectFacultiesTable
            subjectFaculties={subjectFaculties}
            setSubjectFaculties={setSubjectFaculties}
            onEdit={handleEditFaculty}
            onDelete={handleDeleteFaculty}
          />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingId ? "Edit Faculty" : "Add New Faculty"}</DialogTitle>
            <DialogContent>
              <TextField fullWidth margin="dense" label="WMP ID" value={newFaculty.wmp_id} onChange={(e) => setNewFaculty({ ...newFaculty, wmp_id: e.target.value })} />
              <TextField fullWidth margin="dense" label="Subject ID" value={newFaculty.sub_id} onChange={(e) => setNewFaculty({ ...newFaculty, sub_id: e.target.value })} />
              <TextField fullWidth margin="dense" label="Class Allocated" value={newFaculty.class_allocated} onChange={(e) => setNewFaculty({ ...newFaculty, class_allocated: e.target.value })} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSaveFaculty} color="primary" variant="contained">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default SubjectsFaculties;
