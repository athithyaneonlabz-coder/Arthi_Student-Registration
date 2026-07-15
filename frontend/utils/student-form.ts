import type { Student, StudentFormValues } from "@/types/student";

export function getEmptyStudentFormValues(): StudentFormValues {
  return {
    firstName: "",
    lastName: "",
    email: "",
    studentId: "",
    dateOfBirth: "",
    department: "",
    year: 1,
    status: "Active"
  };
}

export function mapStudentToFormValues(student: Student): StudentFormValues {
  return {
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    studentId: student.studentId,
    dateOfBirth: student.dateOfBirth ? student.dateOfBirth.slice(0, 10) : "",
    department: student.department,
    year: student.year,
    status: student.status
  };
}