import React, { useState, useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const BookSearch = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  let searchTimeout;

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    searchTimeout = setTimeout(() => {
      if (value.trim() !== '') {
        onSearch(value);
      } else {
        onClear();
      }
    }, 500);
  };

  return (
    <Box 
      display="flex" 
      alignItems="center" 
      gap={2} 
      mt={2} 
      flexDirection={isMobile ? 'column' : 'row'} 
      sx={{ px: isMobile ? 2 : 4 }}
    >
      <TextField
        label="Search for books"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        fullWidth={isMobile}
        sx={{ backgroundColor: '#FFFFFF', width: isMobile ? '100%' : '800px' }}
      />
    </Box>
  );
};

export default BookSearch;
