"use client";

import { Controller, type Control, type FieldErrors, type UseFormRegister } from "react-hook-form";
import { Box, MenuItem, TextField } from "@mui/material";
import type { StudentFormValues, StudentStatus, StudentYear } from "@/types/student";

type StudentFormProps = {
  register: UseFormRegister<StudentFormValues>;
  control: Control<StudentFormValues>;
  errors: FieldErrors<StudentFormValues>;
};

const yearOptions: StudentYear[] = [1, 2, 3, 4];
const statusOptions: StudentStatus[] = ["Active", "Inactive"];

export function StudentForm({ register, control, errors }: StudentFormProps) {
  return (
    <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" } }}>
      <Box>
        <TextField
          label="First Name"
          {...register("firstName", { required: "First name is required" })}
          error={Boolean(errors.firstName)}
          helperText={errors.firstName?.message}
        />
      </Box>

      <Box>
        <TextField
          label="Last Name"
          {...register("lastName", { required: "Last name is required" })}
          error={Boolean(errors.lastName)}
          helperText={errors.lastName?.message}
        />
      </Box>

      <Box sx={{ gridColumn: { xs: "auto", sm: "1 / -1" } }}>
        <TextField
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address"
            }
          })}
          error={Boolean(errors.email)}
          helperText={errors.email?.message}
        />
      </Box>

      <Box>
        <TextField
          label="Student ID"
          {...register("studentId", { required: "Student ID is required" })}
          error={Boolean(errors.studentId)}
          helperText={errors.studentId?.message}
        />
      </Box>

      <Box>
        <TextField
          label="Date of Birth"
          type="date"
          slotProps={{ inputLabel: { shrink: true } }}
          {...register("dateOfBirth", { required: "Date of birth is required" })}
          error={Boolean(errors.dateOfBirth)}
          helperText={errors.dateOfBirth?.message}
        />
      </Box>

      <Box>
        <TextField
          label="Department"
          {...register("department", { required: "Department is required" })}
          error={Boolean(errors.department)}
          helperText={errors.department?.message}
        />
      </Box>

      <Box>
        <Controller
          name="year"
          control={control}
          rules={{
            required: "Year is required",
            min: { value: 1, message: "Year must be between 1 and 4" },
            max: { value: 4, message: "Year must be between 1 and 4" }
          }}
          render={({ field }) => (
            <TextField
              select
              label="Year"
              value={field.value}
              onChange={(event) => field.onChange(Number(event.target.value) as StudentYear)}
              error={Boolean(errors.year)}
              helperText={errors.year?.message}
            >
              {yearOptions.map((yearOption) => (
                <MenuItem key={yearOption} value={yearOption}>
                  Year {yearOption}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>

      <Box>
        <Controller
          name="status"
          control={control}
          rules={{ required: "Status is required" }}
          render={({ field }) => (
            <TextField
              select
              label="Status"
              value={field.value}
              onChange={(event) => field.onChange(event.target.value as StudentStatus)}
              error={Boolean(errors.status)}
              helperText={errors.status?.message}
            >
              {statusOptions.map((statusOption) => (
                <MenuItem key={statusOption} value={statusOption}>
                  {statusOption}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </Box>
    </Box>
  );
}
