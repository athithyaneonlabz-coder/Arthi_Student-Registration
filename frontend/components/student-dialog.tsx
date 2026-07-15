"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from "@mui/material";
import { StudentForm } from "@/components/student-form";
import { useSnackbar } from "@/components/snackbar-provider";
import { getEmptyStudentFormValues, mapStudentToFormValues } from "@/utils/student-form";
import type { Student, StudentFormValues } from "@/types/student";

type StudentDialogProps = {
  open: boolean;
  mode: "create" | "edit";
  initialStudent: Student | null;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (values: StudentFormValues) => Promise<void>;
};

export function StudentDialog({ open, mode, initialStudent, isSaving, onClose, onSubmit }: StudentDialogProps) {
  const { showSnackbar } = useSnackbar();
  const defaultValues = useMemo(() => getEmptyStudentFormValues(), []);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<StudentFormValues>({
    defaultValues
  });

  useEffect(() => {
    reset(initialStudent ? mapStudentToFormValues(initialStudent) : defaultValues);
  }, [defaultValues, initialStudent, reset]);

  const handleInvalidSubmit = () => {
    showSnackbar("Please fix the highlighted validation errors.", "error");
  };

  const submit = handleSubmit(async (values) => {
    await onSubmit(values);
  }, handleInvalidSubmit);

  return (
    <Dialog open={open} onClose={isSaving ? undefined : onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={submit} noValidate>
        <DialogTitle>{mode === "create" ? "Add Student" : "Edit Student"}</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ pt: 1 }}>
            <StudentForm register={register} control={control} errors={errors} />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSaving}>
            {isSaving ? "Saving..." : mode === "create" ? "Create Student" : "Update Student"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}