import type { StudentDocument, StudentStatus } from "../schemas/student.schema";

export interface Student {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  dateOfBirth: Date;
  department: string;
  year: 1 | 2 | 3 | 4;
  status: StudentStatus;
}

export type StudentEntity = StudentDocument;

export abstract class StudentRepository {
  abstract createStudent(student: Student): Promise<StudentEntity>;

  abstract findAll(): Promise<StudentEntity[]>;

  abstract findById(id: string): Promise<StudentEntity | null>;

  abstract updateStudent(id: string, student: Partial<Student>): Promise<StudentEntity | null>;

  abstract deleteStudent(id: string): Promise<StudentEntity | null>;

  abstract findByEmail(email: string): Promise<StudentEntity | null>;

  abstract findByStudentId(studentId: string): Promise<StudentEntity | null>;
}
