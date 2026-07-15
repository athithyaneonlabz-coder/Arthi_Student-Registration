"use client";

import { useCallback, useEffect, useState } from "react";
import { studentService } from "@/services/student-service";
import type { Student, StudentFormValues } from "@/types/student";

export function useStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const refreshStudents = useCallback(async () => {
    setIsLoading(true);

    try {
      const nextStudents = await studentService.listStudents();
      setStudents(nextStudents);
      setLoadError(null);
    } catch (error) {
      setLoadError(studentService.getFriendlyErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshStudents();
  }, [refreshStudents]);

  const createStudent = useCallback(
    async (payload: StudentFormValues) => {
      setIsSaving(true);

      try {
        await studentService.createStudent(payload);
        await refreshStudents();
      } finally {
        setIsSaving(false);
      }
    },
    [refreshStudents]
  );

  const updateStudent = useCallback(
    async (id: string, payload: StudentFormValues) => {
      setIsSaving(true);

      try {
        await studentService.updateStudent(id, payload);
        await refreshStudents();
      } finally {
        setIsSaving(false);
      }
    },
    [refreshStudents]
  );

  const deleteStudent = useCallback(
    async (id: string) => {
      setIsSaving(true);

      try {
        await studentService.deleteStudent(id);
        await refreshStudents();
      } finally {
        setIsSaving(false);
      }
    },
    [refreshStudents]
  );

  return {
    students,
    isLoading,
    isSaving,
    loadError,
    refreshStudents,
    createStudent,
    updateStudent,
    deleteStudent
  };
}
