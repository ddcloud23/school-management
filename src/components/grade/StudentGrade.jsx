import React, { useEffect, useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import StudentGradeTable from "./StudentGradeTable";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

const StudentGrade = () => {
  const [grades, setGrades] = useState([]);
  const [newGrade, setNewGrade] = useState({ studentId: "", academicYear: "", grade: "" });
  const [editingId, setEditingId] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const storedGrades = JSON.parse(localStorage.getItem("studentGrades")) || [];
    setGrades(storedGrades);
  }, []);

  useEffect(() => {
    localStorage.setItem("studentGrades", JSON.stringify(grades));
  }, [grades]);

  const handleSaveGrade = () => {
    if (!newGrade.studentId || !newGrade.academicYear || !newGrade.grade) return;

    if (editingId !== null) {
      setGrades(
        grades.map((g) =>
          g.id === editingId ? { ...g, studentId: newGrade.studentId, academicYear: newGrade.academicYear, grade: newGrade.grade, updatedAt: new Date().toLocaleString() } : g
        )
      );
    } else {
      const newEntry = {
        id: grades.length + 1,
        studentId: newGrade.studentId,
        academicYear: newGrade.academicYear,
        grade: newGrade.grade,
        createdAt: new Date().toLocaleString(),
        updatedAt: new Date().toLocaleString(),
      };
      setGrades([...grades, newEntry]);
    }
    setNewGrade({ studentId: "", academicYear: "", grade: "" });
    setEditingId(null);
    setDialogOpen(false);
  };

  const handleEditGrade = (grade) => {
    setNewGrade(grade);
    setEditingId(grade.id);
    setDialogOpen(true);
  };

  const handleDeleteGrade = (id) => {
    setGrades(grades.filter((g) => g.id !== id));
  };

  return (
    <div className="container-fluid">
      <div className="main d-flex">
        <Sidebar />
        <div className="content w-100 p-4">
          <nav className="navbar border-bottom mb-4">
            <div className="container d-flex justify-content-between align-items-center">
              <h4 className="text-primary">Student Grades</h4>
              <Button variant="contained" color="primary" onClick={() => setDialogOpen(true)}>
                Add New Grade
              </Button>
            </div>
          </nav>

          <StudentGradeTable grades={grades} onEdit={handleEditGrade} onDelete={handleDeleteGrade} />

          <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle>{editingId ? "Edit Student Grade" : "Add New Student Grade"}</DialogTitle>
            <DialogContent>
              <TextField fullWidth margin="dense" label="Student ID" variant="outlined" value={newGrade.studentId} onChange={(e) => setNewGrade({ ...newGrade, studentId: e.target.value })} />
              <TextField fullWidth margin="dense" label="Academic Year" variant="outlined" value={newGrade.academicYear} onChange={(e) => setNewGrade({ ...newGrade, academicYear: e.target.value })} />
              <TextField fullWidth margin="dense" label="Grade" variant="outlined" value={newGrade.grade} onChange={(e) => setNewGrade({ ...newGrade, grade: e.target.value })} />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setDialogOpen(false)} color="secondary">Cancel</Button>
              <Button onClick={handleSaveGrade} color="primary" variant="contained">{editingId ? "Update" : "Save"}</Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default StudentGrade;
