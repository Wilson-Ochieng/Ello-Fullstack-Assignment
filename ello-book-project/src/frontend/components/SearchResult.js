import React from 'react';
import { List, ListItem, ListItemText, Button, ListItemAvatar, Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const SearchResult = ({ books, onAdd, searchPerformed }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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
                {books.map((book, index) => (
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
                                    sx={{ fontSize: isMobile ? 14 : 16, ml: isMobile ? 1 : 0, }}
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
                                mt: isMobile ? 2 : 0,
                                ml: isMobile ? 0 : 2,
                                width: isMobile ? '150px' : '150px',
                                height: isMobile ? '40px' : '30px', 
                                padding: isMobile ? '8px 16px' : '6px 12px', 
                                alignContent:'center',
                                fontSize: isMobile ? '1.2rem' : '0.5rem',
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
