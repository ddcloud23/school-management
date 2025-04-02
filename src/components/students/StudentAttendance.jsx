import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import "bootstrap/dist/css/bootstrap.min.css";
import StudentAttendanceTable from './StudentAttendanceTable';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const StudentAttendance = () => {
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [newAttendance, setNewAttendance] = useState({ student_id: '', date: '', status: '', created_at: '', updated_at: '' });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("studentAttendance")) || [];
    setStudentAttendance(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem("studentAttendance", JSON.stringify(studentAttendance));
  }, [studentAttendance]);

  const handleSaveAttendance = () => {
    if (!newAttendance.student_id || !newAttendance.date || !newAttendance.status) return;

    const currentTime = new Date().toISOString();

    if (editingId !== null) {
      setStudentAttendance(
        studentAttendance.map((s) =>
          s.id === editingId ? { ...s, ...newAttendance, updated_at: currentTime } : s
        )
      );
    } else {
      const newEntry = {
        id: studentAttendance.length + 1,
        ...newAttendance,
        created_at: currentTime,
        updated_at: currentTime,
      };
      setStudentAttendance([...studentAttendance, newEntry]);
    }

    setNewAttendance({ student_id: '', date: '', status: '', created_at: '', updated_at: '' });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditAttendance = (attendance) => {
    setNewAttendance(attendance);
    setEditingId(attendance.id);
    setDialogOpen(true);
  };

  const handleDeleteAttendance = (id) => {
    setStudentAttendance(studentAttendance.filter((s) => s.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Student Attendance</h4>
              <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add New Attendance
              </Button>
            </div>
          </nav>

          <StudentAttendanceTable studentAttendance={studentAttendance} onEdit={handleEditAttendance} onDelete={handleDeleteAttendance} />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingId ? "Edit Attendance" : "Add New Attendance"}</DialogTitle>
            <DialogContent>
              <TextField fullWidth margin="dense" label="Student ID" value={newAttendance.student_id} onChange={(e) => setNewAttendance({ ...newAttendance, student_id: e.target.value })} />
              <TextField fullWidth margin="dense" label="Date" type="date" value={newAttendance.date} onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })} />
              <TextField fullWidth margin="dense" label="Status" value={newAttendance.status} onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value })} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSaveAttendance} color="primary" variant="contained">
                {editingId ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;