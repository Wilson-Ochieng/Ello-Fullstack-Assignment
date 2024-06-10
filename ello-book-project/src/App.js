import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Typography,Box } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BookSearch from './frontend/components/BookSearch';
import SearchResult from './frontend/components/SearchResult';
import ReadingList from './frontend/components/ReadingList';


const GET_BOOKS = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`;

const App = () => {
  const { data, loading, error } = useQuery(GET_BOOKS);
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [readingList, setReadingList] = useState([]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;


  const handleSearch = (query) => {
    setSearchPerformed(true);
    const filteredBooks = data.books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredBooks);
  };

  const handleAddBook = (book) => {
    if (!readingList.find((b) => b.title === book.title)) {
      setReadingList([...readingList, book]);
      toast.success('Book added successfully');
    } else {
      toast.warn('Book is already in the reading list');
    }
  };

  const handleRemoveBook = (title) => {
    setReadingList(readingList.filter((book) => book.title !== title));
    toast.success('Book removed successfully');
  };
  const handleClearSearchResults = () => {
    setSearchResults([]); 
  };

  return (
    <Container>
       <Box display="flex" justifyContent="center" alignItems="center" mt={10} mb={2}>
        <Typography
          variant="h4"
          color="#335C6E"
          fontWeight="bold"
          fontFamily="Mulish"
          fontSize={28}
          gutterBottom
        >
          Ello Books
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box className="search-container">
        <BookSearch onSearch={handleSearch} onClear={handleClearSearchResults} />
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="center">
          <Box className="results-container" mr={2}>
            <SearchResult books={searchResults} onAdd={handleAddBook} searchPerformed={searchPerformed} />
          </Box>
          <Box className="reading-list-container" ml={2}>
            <Typography variant="h5" color="#335C6E" fontWeight="bold" gutterBottom>
              Reading List
            </Typography>
            <ReadingList readingList={readingList} onRemove={handleRemoveBook} />
          </Box>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default App;