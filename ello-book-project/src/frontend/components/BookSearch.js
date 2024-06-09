import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const BookSearch = ({ onSearch, onClear }) => {
  const [query, setQuery] = useState('');
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
    <Box display="flex" alignItems="center" gap={2} mt={2}>
      <TextField
        label="Search for books"
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        sx={{ backgroundColor: '#FFFFFF', width: '800px' }}
      />
    </Box>
  );
};

export default BookSearch;