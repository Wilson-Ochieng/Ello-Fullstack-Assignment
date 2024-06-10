import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, ListItemAvatar, Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
        <Box mt={2} sx={{ px: isMobile ? 2 : 4 }}>
            <List>
                {booksWithImages.map((book, index) => (
                    <ListItem
                        key={index}
                        sx={{
                            backgroundColor: '#FFFFFF',
                            mb: 1,
                            borderRadius: 1,
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            alignItems: isMobile ? 'flex-start' : 'center',
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar
                                src={book.image}
                                variant="square"
                                sx={{
                                    width: isMobile ? 60 : 50,
                                    height: isMobile ? 60 : 50,
                                    ml: isMobile ? 1 : 0,
                                    borderRadius: 1,
                                }}
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography
                                    variant="body2"
                                    sx={{ fontSize: isMobile ? 14 : 16 , ml: isMobile ? 1 : 0, }}
                                >
                                    {book.title}
                                </Typography>
                            }
                            secondary={
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                    sx={{
                                        fontSize: isMobile ? 12 : 14,
                                        ml: isMobile ? 1 : 0,
                                       
                                    }}
                                >
                                    {`${book.author} - Reading Level: ${book.readingLevel}`}
                                </Typography>
                            }
                            sx={{ mt: isMobile ? 1 : 0 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            onClick={() => onAdd(book)}
                            sx={{
                                ml: isMobile ? 1 : 2,
                                mt: isMobile ? 1 : 0,
                                fontSize: isMobile ? 10 : 12,
                                padding: isMobile ? '2px 6px' : '2px 6px',
                                alignSelf: isMobile ? 'flex-start' : 'center',
                            }}
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
