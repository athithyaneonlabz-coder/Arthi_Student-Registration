import axios from "axios";
import { httpClient } from "./http-client";
import type { ApiErrorResponse, Student, StudentApiRecord, StudentFormValues } from "@/types/student";

function mapStudent(record: StudentApiRecord): Student {
  const id = record.id ?? record._id;

  if (!id) {
    throw new Error("Student record is missing an identifier.");
  }

  return {
    id,
    firstName: record.firstName ?? "",
    lastName: record.lastName ?? "",
    email: record.email ?? "",
    studentId: record.studentId ?? "",
    dateOfBirth: record.dateOfBirth ?? "",
    department: record.department ?? "",
    year: record.year ?? 1,
    status: record.status ?? "Active",
    createdAt: record.createdAt ?? "",
    updatedAt: record.updatedAt ?? ""
  };
}

function normalizeErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const response = error.response?.data as ApiErrorResponse | undefined;

    if (Array.isArray(response?.message)) {
      return response.message.join(" ");
    }

    if (typeof response?.message === "string") {
      return response.message;
    }

    if (typeof response?.error === "string") {
      return response.error;
    }

    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export const studentService = {
  async listStudents(): Promise<Student[]> {
    try {
      const response = await httpClient.get<StudentApiRecord[]>("/students");
      return response.data.map(mapStudent);
    } catch (error) {
      throw new Error(normalizeErrorMessage(error));
    }
  },

  async createStudent(payload: StudentFormValues): Promise<Student> {
    try {
      const response = await httpClient.post<StudentApiRecord>("/students", payload);
      return mapStudent(response.data);
    } catch (error) {
      throw new Error(normalizeErrorMessage(error));
    }
  },

  async updateStudent(id: string, payload: StudentFormValues): Promise<Student> {
    try {
      const response = await httpClient.patch<StudentApiRecord>(`/students/${id}`, payload);
      return mapStudent(response.data);
    } catch (error) {
      throw new Error(normalizeErrorMessage(error));
    }
  },

  async deleteStudent(id: string): Promise<void> {
    try {
      await httpClient.delete(`/students/${id}`);
    } catch (error) {
      throw new Error(normalizeErrorMessage(error));
    }
  },

  getFriendlyErrorMessage(error: unknown): string {
    return normalizeErrorMessage(error);
  }
};