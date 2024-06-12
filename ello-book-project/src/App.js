import React, { useState,useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Container, Typography, Box, Card, CardContent } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import BookSearch from './frontend/components/BookSearch';
import SearchResult from './frontend/components/SearchResult';
import ReadingList from './frontend/components/ReadingList';
import image1 from '.././src/frontend/assets/image1.webp';
import image2 from '.././src/frontend/assets/image2.webp';
import image3 from '.././src/frontend/assets/image3.webp';
import image4 from '.././src/frontend/assets/image4.webp';
import image5 from '.././src/frontend/assets/image5.webp';
import image6 from '.././src/frontend/assets/image6.webp';
import image7 from '.././src/frontend/assets/image7.webp';
import image8 from '.././src/frontend/assets/image8.webp';
import image9 from '.././src/frontend/assets/image9.webp';
import image10 from '.././src/frontend/assets/image10.webp';

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

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
  const [booksWithImages, setBooksWithImages] = useState([]);

  useEffect(() => {
    if (data && data.books) {
      const booksWithRandomImages = data.books.map(book => ({
        ...book,
        image: getRandomImage()
      }));
      setBooksWithImages(booksWithRandomImages);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSearch = (query) => {
    setSearchPerformed(true);
    const filteredBooks = booksWithImages.filter((book) =>
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
    setSearchPerformed(false);
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
        <Box className="search-container" mb={4}>
          <BookSearch books={booksWithImages} onSearch={handleSearch} onClear={handleClearSearchResults} />
        </Box>
        {!searchPerformed && (
          <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
            <Typography
              variant="h5"
              color="#335C6E"
              fontWeight="bold"
              fontFamily="Mulish"
              fontSize={22}
              textAlign="center"
            >
              Welcome to Ello Books! Start by searching for your favorite books.
            </Typography>
          </Box>
        )}
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} justifyContent="center" alignItems="flex-start" gap={2}>
          {searchPerformed && (
            <Card className="results-container" sx={{ minWidth: 275, flex: 1 }}>
              <CardContent>
                <Typography variant="h5" color="#335C6E" fontWeight="bold" gutterBottom>
                  Search Results
                </Typography>
                <SearchResult books={searchResults} onAdd={handleAddBook} searchPerformed={searchPerformed} />
              </CardContent>
            </Card>
          )}
          <Card className="reading-list-container" sx={{ minWidth: 275, flex: 1 }}>
            <CardContent>
              <Typography variant="h5" color="#335C6E" fontWeight="bold" gutterBottom>
                Reading List
              </Typography>
              <ReadingList readingList={readingList} onRemove={handleRemoveBook} />
            </CardContent>
          </Card>
        </Box>
      </Box>
      <ToastContainer />
    </Container>
  );
};

export default App;