import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, ListItemAvatar, Avatar, Box, Typography } from '@mui/material';
import image1 from '../assets/image1.webp';
import image2 from '../assets/image2.webp';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.webp';
import image5 from '../assets/image5.webp';
import image6 from '../assets/image6.webp';
import image7 from '../assets/image7.webp';
import image8 from '../assets/image8.webp';
import image9 from '../assets/image9.webp';
import image10 from '../assets/image10.webp';


const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];




const SearchResult = ({ books, onAdd, searchPerformed }) => {
    const [booksWithImages, setBooksWithImages] = useState([]);

    useEffect(() => {
        const booksWithRandomImages = books.map(book => ({
            ...book,
            image: getRandomImage()
        }));
        setBooksWithImages(booksWithRandomImages);
    }, [books]);

    if (searchPerformed && books.length === 0) {
        return (
            <Box mt={2}>
                <Typography variant="body1">No book found.</Typography>
            </Box>
        );
    }

    return (
        <Box mt={2}>
            <List>
                {booksWithImages.map((book, index) => (
                    <ListItem
                        key={index}
                        sx={{ backgroundColor: '#FFFFFF', mb: 1, borderRadius: 1 }}
                    >
                        <ListItemAvatar>
                            <Avatar src={book.image}
                                variant="square"
                                sx={{ width: 50, height: 50, borderRadius: 1 }}

                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={book.title}
                            secondary={`${book.author} - Reading Level: ${book.readingLevel}`}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onAdd(book)}
                            sx={{ ml: 2, borderColor: '#FABD33', fontSize: 12, padding: '4px 8px' }}
                        >
                            Add to Reading List
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SearchResult;