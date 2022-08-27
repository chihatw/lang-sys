import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import App from './App';
import './index.css';

interface ExtendedTypographyOptions extends TypographyOptions {
  lato: React.CSSProperties;
  lato100: React.CSSProperties;
  lato700: React.CSSProperties;
  lato900: React.CSSProperties;
  notoSerifJP: React.CSSProperties;
  notoSerifJP300: React.CSSProperties;
  mPlusRounded: React.CSSProperties;
  mPlusRounded300: React.CSSProperties;
  mPlusRounded500: React.CSSProperties;
}

const theme = createTheme({
  palette: {
    primary: { main: '#52a2aa' },
  },
  typography: {
    lato: {
      color: '#555',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 400,
    },
    lato100: {
      color: '#555',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 100,
    },
    lato700: {
      color: '#555',
      fontFamily: 'Lato, sans-serif',
      fontWeight: 700,
    },
    lato900: {
      color: '#555',
      fontFamily: '"Lato',
      fontWeight: 900,
    },
    notoSerifJP: {
      color: '#555',
      fontFamily: '"Noto Serif JP", serif',
      fontWeight: 400,
    },
    notoSerifJP300: {
      color: '#555',
      fontFamily: '"Noto Serif JP", serif',
      fontWeight: 300,
    },
    mPlusRounded: {
      color: '#555',
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
      fontWeight: 400,
    },
    mPlusRounded300: {
      color: '#555',
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
      fontWeight: 300,
    },
    mPlusRounded500: {
      color: '#555',
      fontFamily: '"M PLUS Rounded 1c", sans-serif',
      fontWeight: 500,
    },
  } as ExtendedTypographyOptions,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
);
