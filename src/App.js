import React, { useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function App() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [dialogText, setDialogText] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddImage = () => {
    setImages([...images, imageUrl]);
    setImageUrl("");
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Image
      </Button>

      <Grid container spacing={2}>
        <Grid item xs={4}>
          {/* Your 1-column content goes here */}
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Image ${index}`}
              style={{ width: "100%" }}
            />
          ))}
        </Grid>
        <Grid item xs={8}>
          {/* Large text box */}
          <TextField
            label="Start writing dialog:"
            fullWidth
            multiline
            rows={10}
            variant="outlined"
            value={dialogText}
            onChange={(e) => setDialogText(e.target.value)}
          />
        </Grid>
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            label="Image URL"
            fullWidth
            variant="outlined"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddImage} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;
