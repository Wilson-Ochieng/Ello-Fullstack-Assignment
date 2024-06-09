import React from 'react';
import { List, ListItem, ListItemText, Button, ListItemAvatar, Avatar, Box,Typography } from '@mui/material';
const SearchResult = ({ books, onAdd,searchPerformed  }) => {
    
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
                {books.map((book, index) => (
                    <ListItem
                        key={index}
                        sx={{ backgroundColor: '#FFFFFF', mb: 1, borderRadius: 1 }}
                    >
                        <ListItemAvatar>
                          <Avatar src={`../assets/${book.coverPhotoURL}`} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={book.title}
                            secondary={`${book.author} - Reading Level: ${book.readingLevel}`}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onAdd(book)}
                            sx={{ ml: 2, borderColor: '#FABD33' }}
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