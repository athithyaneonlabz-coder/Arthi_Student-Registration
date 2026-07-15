"use client";

import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography
} from "@mui/material";
import type { Student } from "@/types/student";
import { formatYear, getStatusColor } from "@/utils/student-formatters";

type StudentTableProps = {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (student: Student) => void;
};

export function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {
  return (
    <TableContainer component={Paper} elevation={0} sx={{ border: 1, borderColor: "divider" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Student ID</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id} hover>
              <TableCell>{student.firstName}</TableCell>
              <TableCell>{student.lastName}</TableCell>
              <TableCell>
                <Stack spacing={0.5}>
                  <Typography variant="body2">{student.email}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {student.firstName} {student.lastName}
                  </Typography>
                </Stack>
              </TableCell>
              <TableCell>{student.studentId}</TableCell>
              <TableCell>{student.department}</TableCell>
              <TableCell>{formatYear(student.year)}</TableCell>
              <TableCell>
                <Chip
                  label={student.status}
                  color={getStatusColor(student.status)}
                  size="small"
                  variant={student.status === "Active" ? "filled" : "outlined"}
                />
              </TableCell>
              <TableCell align="right">
                <Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>
                  <Button variant="outlined" onClick={() => onEdit(student)}>
                    Edit
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => onDelete(student)}>
                    Delete
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
