import React, { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { IconButton, Menu, MenuItem, Link, Button, Box } from '@mui/material';
import '../styles/Header.css';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import SearchComponent from './SearchComponent';
import Tooltip from '@mui/material/Tooltip';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    logout();
    navigate('/');
    handleProfileMenuClose();
  };

  const isMenuOpen = Boolean(anchorEl);

  return (
    <header className="header" style={{ position: 'sticky', top: 0, zIndex: 100 }}>
      <Box className="header-content" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box className="app-name" sx={{ flexShrink: 0 }}>
          <Link href='/' underline='none' color='inherit'>
            anonify
          </Link>
        </Box>

        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', maxWidth: '400px', margin: '0 16px' }}>
          <SearchComponent />
        </Box>

        {!isLoggedIn && (
            <Box className='Login' sx={{ marginRight: '16px' }}>
              <Link href='Signin'>
                <Button variant="outlined">Log In</Button>
              </Link>
            </Box>
          )}

        <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <Box className="newPost" sx={{ marginRight: '16px' }}>
            <Tooltip title="Create New Post" arrow>
              <IconButton
                component={Link}
                href="/Newpost"
                color="inherit"
              >
                <PostAddIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box className="profile">
            <Tooltip title="Profile" arrow>
              <IconButton onClick={handleProfileMenuOpen} color="inherit">
                <PersonIcon fontSize="medium" />
              </IconButton>
            </Tooltip>
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
              {isLoggedIn && <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>}
            </Menu>
          </Box>
        </Box>
      </Box>
    </header>
  );
};

export default Header;