import React from 'react';
import { List, ListItem, ListItemText, Button, ListItemAvatar, Avatar, Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const ReadingList = ({ readingList, onRemove }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box mt={2}>
      {readingList.length === 0 ? (
        <Typography variant="body1" color="textSecondary">
          No books in the reading list. Add some books to get started!
        </Typography>
      ) : (
        <List>
          {readingList.map((book, index) => (
            <ListItem
              key={`${book.title}-${index}`}
              sx={{ backgroundColor: '#FFFFFF', mb: 1, borderRadius: 1, flexDirection: isMobile ? 'column' : 'row' }}
            >
              <ListItemAvatar>
                <Avatar
                  src={book.image}
                  variant="square"
                  sx={{ width: 50, height: 50, borderRadius: 1 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={book.title}
                secondary={book.author}
                sx={{ textAlign: isMobile ? 'center' : 'left' }}
              />
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => onRemove(book.title)}
                sx={{ mt: isMobile ? 2 : 0, ml: isMobile ? 0 : 2 }}
              >
                Remove
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default ReadingList;
