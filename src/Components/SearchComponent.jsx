import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, IconButton, List, ListItem, Typography, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const SearchComponent = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                searchItems();
                setShowResults(true);
            } else {
                setSearchResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
        // eslint-disable-next-line
    }, [searchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const searchItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/search?term=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching items:', error);
        }
    };

    const handleItemClick = (postId) => {
        setShowResults(false);
        setSearchTerm('');
        navigate(`/post/${postId}`);
    };

    return (
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', width: '100%' }}>
            <Box ref={searchRef} sx={{ width: '100%', maxWidth: '400px' }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
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
                {showResults && searchResults.length > 0 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '100%',
                            maxWidth: '400px',
                            maxHeight: '400px',
                            overflowY: 'auto',
                            backgroundColor: 'background.paper',
                            borderRadius: '15px',
                            boxShadow: 3,
                            zIndex: 1000,
                            mt: 1,
                        }}
                    >
                        <List>
                            {searchResults.map((item) => (
                                <ListItem
                                    key={item.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'action.hover',
                                        },
                                        cursor: 'pointer',
                                        flexDirection: 'column',
                                        alignItems: 'flex-start',
                                    }}
                                    onClick={() => handleItemClick(item.id)}
                                >
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        {item.title}
                                    </Typography>
                                    <Typography 
                                        variant="body2" 
                                        color="text.secondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {item.content}
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default SearchComponent;