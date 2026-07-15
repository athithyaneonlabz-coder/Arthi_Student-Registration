"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography
} from "@mui/material";
import { useStudents } from "@/hooks/use-students";
import { SearchBar } from "@/components/search-bar";
import { LoadingSpinner } from "@/components/loading-spinner";
import { StudentTable } from "@/components/student-table";
import { StudentDialog } from "@/components/student-dialog";
import { DeleteDialog } from "@/components/delete-dialog";
import { useSnackbar } from "@/components/snackbar-provider";
import type { Student, StudentFormValues } from "@/types/student";

export function StudentDashboard() {
  const { students, isLoading, isSaving, loadError, createStudent, updateStudent, deleteStudent } = useStudents();
  const { showSnackbar } = useSnackbar();
  const [searchTerm, setSearchTerm] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"create" | "edit">("create");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);

  useEffect(() => {
    if (loadError) {
      showSnackbar(loadError, "error");
    }
  }, [loadError, showSnackbar]);

  const filteredStudents = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return students;
    }

    return students.filter((student) => {
      return [student.firstName, student.lastName, student.email, student.studentId]
        .join(" ")
        .toLowerCase()
        .includes(query);
    });
  }, [searchTerm, students]);

  const openCreateDialog = () => {
    setDialogMode("create");
    setSelectedStudent(null);
    setDialogOpen(true);
  };

  const openEditDialog = (student: Student) => {
    setDialogMode("edit");
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const closeStudentDialog = () => {
    if (!isSaving) {
      setDialogOpen(false);
      setSelectedStudent(null);
    }
  };

  const handleStudentSubmit = async (values: StudentFormValues) => {
    try {
      if (dialogMode === "create") {
        await createStudent(values);
        showSnackbar("Student created successfully.", "success");
      } else if (selectedStudent) {
        await updateStudent(selectedStudent.id, values);
        showSnackbar("Student updated successfully.", "success");
      }

      setDialogOpen(false);
      setSelectedStudent(null);
    } catch (error) {
      showSnackbar(error instanceof Error ? error.message : "An unexpected error occurred.", "error");
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await deleteStudent(deleteTarget.id);
      showSnackbar("Student deleted successfully.", "success");
      setDeleteTarget(null);
    } catch (error) {
      showSnackbar(error instanceof Error ? error.message : "An unexpected error occurred.", "error");
    }
  };

  const isEmpty = !isLoading && filteredStudents.length === 0;

  return (
    <Box sx={{ minHeight: "100vh", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Paper elevation={0} sx={{ p: { xs: 3, md: 4 }, border: 1, borderColor: "divider" }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                sx={{ justifyContent: "space-between", alignItems: { xs: "flex-start", sm: "center" } }}
              >
                <Box>
                  <Typography variant="overline" color="primary.main" sx={{ letterSpacing: 1.5 }}>
                    Student Registration CRUD System
                  </Typography>
                  <Typography variant="h3" component="h1" sx={{ mt: 0.5 }}>
                    Student Management
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mt: 1, maxWidth: 760 }}>
                    Create, review, update, and delete student records from one responsive dashboard.
                  </Typography>
                </Box>

                <Button variant="contained" onClick={openCreateDialog}>
                  Add Student
                </Button>
              </Stack>

              <SearchBar value={searchTerm} onChange={setSearchTerm} onClear={() => setSearchTerm("")} />
            </Stack>
          </Paper>

          {isLoading ? (
            <Paper elevation={0} sx={{ border: 1, borderColor: "divider" }}>
              <LoadingSpinner />
            </Paper>
          ) : isEmpty ? (
            <Paper elevation={0} sx={{ p: 6, textAlign: "center", border: 1, borderColor: "divider" }}>
              <Typography variant="h5" gutterBottom>
                No students found
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Add the first student record to get started.
              </Typography>
              <Button variant="contained" onClick={openCreateDialog}>
                Add Student
              </Button>
            </Paper>
          ) : (
            <StudentTable students={filteredStudents} onEdit={openEditDialog} onDelete={setDeleteTarget} />
          )}

          {loadError ? <Alert severity="error">{loadError}</Alert> : null}
        </Stack>
      </Container>

      <StudentDialog
        open={dialogOpen}
        mode={dialogMode}
        initialStudent={selectedStudent}
        isSaving={isSaving}
        onClose={closeStudentDialog}
        onSubmit={handleStudentSubmit}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        isDeleting={isSaving}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </Box>
  );
}
