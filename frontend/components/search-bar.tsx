"use client";

import { Button, Stack, TextField } from "@mui/material";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
};

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={1.5}
      sx={{ alignItems: { xs: "stretch", sm: "center" } }}
    >
      <TextField
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search by First Name, Last Name, Email, or Student ID"
        label="Search students"
        fullWidth
      />
      <Button variant="outlined" onClick={onClear} disabled={!value} sx={{ minWidth: 120 }}>
        Clear
      </Button>
    </Stack>
  );
}