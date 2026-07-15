"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

type DeleteDialogProps = {
  open: boolean;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export function DeleteDialog({ open, isDeleting, onClose, onConfirm }: DeleteDialogProps) {
  return (
    <Dialog open={open} onClose={isDeleting ? undefined : onClose} fullWidth maxWidth="xs">
      <DialogTitle>Delete Student</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mt: 1 }}>
          Are you sure you want to delete this student?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={isDeleting}>
          Cancel
        </Button>
        <Button color="error" variant="contained" onClick={onConfirm} disabled={isDeleting}>
          {isDeleting ? "Deleting..." : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}