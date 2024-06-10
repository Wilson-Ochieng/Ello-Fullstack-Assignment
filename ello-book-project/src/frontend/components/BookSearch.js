import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const BookSearch = ({ books, onSearch, onClear }) => {
  const [query, setQuery] = useState('');
  const [options, setOptions] = useState([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  let searchTimeout;

  useEffect(() => {
    if (query.trim() !== '') {
      const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(query.toLowerCase())
      );
      setOptions(filteredBooks);
    } else {
      setOptions([]);
    }
  }, [query, books]);

  const handleInputChange = (e, value) => {
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
      sx={{ px: isMobile ? 8 : 4 }}
    >
      <Autocomplete
        freeSolo
        options={options.map((option) => option.title)}
        onInputChange={handleInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for books"
            variant="outlined"
            fullWidth={isMobile}
            sx={{ backgroundColor: '#FFFFFF', width: isMobile ? '150px' : '800px' }}
          />
        )}
      />
    </Box>
  );
};

export default BookSearch;
