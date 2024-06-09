import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Typography } from '@mui/material';
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
      toast.success('Book Added successfully');
    } else {
      toast.warn('Book is already in the reading list');
    }
  };

  const handleRemoveBook = (title) => {
    setReadingList(readingList.filter((book) => book.title !== title));
    toast.success('Book  removed successfully');
  };

  return (
    <Container>
      <Typography variant="h4" color="#335C6E" fontWeight="bold" fontFamily="Mulish" fontSize={24} marginTop={10} marginBottom={5} gutterBottom>
        Book Assignment View
      </Typography>
      <BookSearch onSearch={handleSearch} />
      <SearchResult books={searchResults} onAdd={handleAddBook}  searchPerformed={searchPerformed} />
      <Typography variant="h5" color="#335C6E" fontWeight="bold" gutterBottom>
        Reading List
      </Typography>
      <ReadingList readingList={readingList} onRemove={handleRemoveBook} />
      <ToastContainer />
    </Container>
  );
};

export default App;