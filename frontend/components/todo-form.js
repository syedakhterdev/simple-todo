import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  Checkbox,
} from "@material-ui/core";

export default function FormDialog({ todo, onSubmit }) {
  const [open, setOpen] = useState(false);
  const [isCompleted, setIsCompleted] = useState(
    !todo ? false : todo.isCompleted
  );
  const [text, setText] = useState(!todo ? "" : todo.text);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsCompleted(false);
    setText("");
  };
  return (
    <div style={{ margin: "auto" }}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {!todo ? `Add New Todo` : `Update Todo`}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h4
            style={{
              margin: "auto",
            }}
          >
            {!todo ? `Add New Todo` : `Update`}
          </h4>
        </DialogTitle>
        <DialogContent
          style={{
            width: "300px",
          }}
        >
          <Grid container direction="row">
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Todo"
                value={text}
                placeholder="What needs to be done?"
                onChange={(e) => setText(e.target.value)}
              />
            </Grid>
          </Grid>
          Completed:
          <Checkbox
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button
            onClick={() => {
              onSubmit(text, isCompleted);
              handleClose();
            }}
            color="primary"
          >
            {!todo ? "Submit" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
