import React from 'react';
import { List, ListItem, ListItemText, Button, ListItemAvatar, Avatar, Box ,Typography} from '@mui/material';
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
              key={index}
              sx={{ backgroundColor: '#FFFFFF', mb: 1, borderRadius: 1 }}
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
      )}
    </Box>
  );
};

export default ReadingList;