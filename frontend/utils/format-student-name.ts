import type { Student } from "@/types/student";

export function formatStudentName(student: Pick<Student, "firstName" | "lastName">) {
  return `${student.firstName} ${student.lastName}`.trim();
}