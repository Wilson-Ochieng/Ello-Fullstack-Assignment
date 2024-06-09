import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const BookSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if(query.trim() !== ''){
      onSearch(query);

    }
   
  };

  return (
    <Box display="flex" alignItems="center" gap={2} mt={2}>
      <TextField
        label="Search for books"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ backgroundColor: '#FFFFFF', width: '800px' }} 
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        sx={{ height: '3rem' }} 
      >
        Search
      </Button>
    </Box>
  );
};

export default BookSearch;