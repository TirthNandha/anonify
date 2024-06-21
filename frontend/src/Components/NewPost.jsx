import React, { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import '../styles/NewPost.css';

const NewPost = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content, category });
    setTitle('');
    setContent('');
    setCategory('');
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit} 
      className="new-post-form"
    >
      <Typography variant="h5" className="new-post-title">
        Create New Post
      </Typography>
      <FormControl fullWidth required className="new-post-category">
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
        >
          <MenuItem value=""><em>None</em></MenuItem>
          <MenuItem value="Music">General</MenuItem>
          <MenuItem value="Technology">Admission</MenuItem>
          <MenuItem value="Science">Placements</MenuItem>
          <MenuItem value="Art">Culture</MenuItem>
          {/* Add more categories as needed */}
        </Select>
      </FormControl>
      <TextField
        label="Title"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        required
        className="new-post-input"
      />
      <TextField
        label="Content"
        variant="outlined"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        multiline
        rows={4}
        fullWidth
        required
        className="new-post-input"
      />
      
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        className="new-post-button"
      >
        Submit
      </Button>
    </Box>
  );
};

export default NewPost;
