"use client";

import { Box, CircularProgress, Typography } from "@mui/material";

export function LoadingSpinner() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", py: 8, gap: 2 }}>
      <CircularProgress />
      <Typography variant="body2" color="text.secondary">
        Loading students...
      </Typography>
    </Box>
  );
}