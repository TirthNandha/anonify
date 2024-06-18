import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import '../styles/Header.css'

const Header = () => {
    return (
    <header className="header">
      <div className="header-content">
        <div className="app-name">anonify</div>
        <div className="search-field">
          <TextField
            variant="outlined"
            placeholder="Search..."
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '50px',
                paddingRight: '10px',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </div>
        <div className="profile">
          <PersonIcon fontSize='medium' />
        </div>
      </div>
    </header>

    );
};

export default Header;