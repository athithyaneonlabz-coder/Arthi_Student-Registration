"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Alert, Snackbar, type AlertColor } from "@mui/material";

type SnackbarContextValue = {
  showSnackbar: (message: string, severity?: AlertColor) => void;
};

const SnackbarContext = createContext<SnackbarContextValue | null>(null);

type SnackbarProviderProps = {
  children: ReactNode;
};

export function SnackbarProvider({ children }: SnackbarProviderProps) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<AlertColor>("success");

  const showSnackbar = useCallback((nextMessage: string, nextSeverity: AlertColor = "success") => {
    setMessage(nextMessage);
    setSeverity(nextSeverity);
    setOpen(true);
  }, []);

  const closeSnackbar = useCallback(() => {
    setOpen(false);
  }, []);

  const value = useMemo<SnackbarContextValue>(() => ({ showSnackbar }), [showSnackbar]);

  return (
    <SnackbarContext.Provider value={value}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4500}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={closeSnackbar} severity={severity} variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
}

export function useSnackbar() {
  const context = useContext(SnackbarContext);

  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider.");
  }

  return context;
}
