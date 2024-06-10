import React from 'react';
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
              key={`${book.title}-${index}`} // Ensure unique key
              sx={{ backgroundColor: '#FFFFFF', mb: 1, borderRadius: 1, flexDirection: isMobile ? 'column' : 'row' }}
            >
              <ListItemAvatar>
                <Avatar
                  src={book.image || getRandomImage()}
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
