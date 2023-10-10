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
import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [dialogText, setDialogText] = useState("");

  const callPaLMapi = async () => {
    const requestData = {
      prompt: {
        context:
          "You are a writer at a movie studio. I will give you a storyboard and you will help me complete the next two lines of dialog.",
        examples: [],
        messages: [
          {
            content: `Storyboard: ${imageUrl}\n${dialogText}:`,
          },
        ],
      },
      temperature: 0.9,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta2/models/chat-bison-001:generateMessage?key=${API_KEY}`,
      requestData,
      { headers },
    );
    setDialogText(response.data.candidates[0].content);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddImage = () => {
    setImages([...images, imageUrl]);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add Image
      </Button>
      <Button variant="contained" color="primary" onClick={callPaLMapi}>
        Generate Dialog!
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
