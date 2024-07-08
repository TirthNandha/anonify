import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import '../styles/NewPost.css';
import Header from './Header';
import {useAuth} from '../AuthContext'
import axios from 'axios';
import {DataContext} from "../DataContext"

const NewPost = ( ) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const {isLoggedIn} = useAuth();
  const {college, department, passoutYear, username} = useContext(DataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/newpost", { title, content, category, username, college, department, passoutYear });
      alert("New Post added successfully!!");
      setTitle('');
      setContent('');
      setCategory('');
    } catch (error) {
      console.error("Error adding new post:", error);
      alert("Failed to add new post. Please try again later.");
    }
  };

  return (
    <div>
    <Header />
    {!isLoggedIn?
      <h3 style={{color: 'red', textAlign: 'center'}}>Please signin to add post.</h3>:null}
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
          <MenuItem value="General">General</MenuItem>
          <MenuItem value="Admission">Admission</MenuItem>
          <MenuItem value="Placements">Placements</MenuItem>
          <MenuItem value="Culture">Culture</MenuItem>
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
        color="grey" 
        className="new-post-button"
      >
        Submit
      </Button>
    </Box>
    </div>
    
  );
};

export default NewPost;
