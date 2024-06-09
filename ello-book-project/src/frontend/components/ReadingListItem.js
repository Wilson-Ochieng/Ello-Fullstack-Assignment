import React from 'react';
import { ListItem, ListItemText, Button } from '@mui/material';

const ReadingListItem = ({ book, onRemove }) => {
  return (
    <ListItem>
      <ListItemText
        primary={book.title}
        secondary={book.author}
      />
      <Button variant="contained" color="secondary" onClick={() => onRemove(book.id)}>
        Remove
      </Button>
    </ListItem>
  );
};

export default ReadingListItem;
