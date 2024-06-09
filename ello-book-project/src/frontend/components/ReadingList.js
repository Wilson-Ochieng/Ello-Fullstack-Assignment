import React from 'react';
import { List, ListItem, ListItemText, Button, ListItemAvatar, Avatar, Box } from '@mui/material';

const ReadingList = ({ readingList, onRemove }) => {
  return (
    <Box mt={2}>
      <List>
        {readingList.map((book, index) => (
          <ListItem
            key={index}
            sx={{ backgroundColor: '#FFFFFF', mb: 1, borderRadius: 1 }}
          >
            <ListItemAvatar>
              <Avatar src={`/assets/${book.coverPhotoURL}`} />
            </ListItemAvatar>
            <ListItemText
              primary={book.title}
              secondary={book.author}
            />
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onRemove(book.title)}
              sx={{ ml: 2 }}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ReadingList;
