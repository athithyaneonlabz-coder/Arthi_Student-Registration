export type StudentStatus = "Active" | "Inactive";

export type StudentYear = 1 | 2 | 3 | 4;

export interface StudentFormValues {
  firstName: string;
  lastName: string;
  email: string;
  studentId: string;
  dateOfBirth: string;
  department: string;
  year: StudentYear;
  status: StudentStatus;
}

export interface Student extends StudentFormValues {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface StudentApiRecord extends Partial<StudentFormValues> {
  id?: string;
  _id?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}