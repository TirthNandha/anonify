import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, IconButton, Menu, MenuItem, Link } from '@mui/material';
import PostAddIcon from '@mui/icons-material/PostAdd';
import '../styles/Header.css';
import Button from '@mui/material/Button';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Add your sign-out logic here
    console.log('Signed out');
    handleProfileMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <header className="header" style={{position: 'sticky', top: 0, zIndex:100}}>
      <div className="header-content">
        <div className="app-name">anonify</div>
        <div className="search-field">
          <TextField
            variant="outlined"
            placeholder="Search..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                paddingRight: '10px',
              },
            }}
          />
        </div>
        <div className="newPost">
          <Link color="inherit" underline="none" href="/Newpost">
            <PostAddIcon fontSize="medium" />
          </Link>
        </div>
        <div className='Login'>
          <Link href='Signin'>
            <Button variant="outlined">Log In</Button>
            
          </Link>
          </div>
        <div className="profile">
          <IconButton onClick={handleProfileMenuOpen} color="inherit">
            <PersonIcon fontSize="medium" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
          </Menu>
        </div>
      </div>
    </header>
  );
};

export default Header;
