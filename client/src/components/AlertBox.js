import { Alert, Snackbar } from "@mui/material";
import React from "react";

const AlertBox = ({ open, handleClose, type, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBox;
