import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/mulish';
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

const theme = createTheme({
  typography: {
    fontFamily: 'Mulish, Arial',
  },
  palette: {
    primary: {
      main: '#5ACCCC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#CFFAFA',
    },
    background: {
      default: '#F5F5F5',
    },
    text: {
      primary: '#335C6E',
      secondary: '#4AA088',
    },
    action: {
      active: '#F76434',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
