import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Login from './components/Login.js';
import Home from './components/Home.js';
import DictWorkWindow from './components/DictWorkWindow.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#123b4d',
      dark: '#0a2736',
      light: '#2d5b70',
      contrastText: '#f9f4ef',
    },
    secondary: {
      main: '#d7b585',
      light: '#f3e4ca',
      contrastText: '#123b4d',
    },
    background: {
      default: '#f5efe7',
      paper: '#fffdf9',
    },
    text: {
      primary: '#1d2f3c',
      secondary: '#4d6875',
    },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", sans-serif',
    h1: { fontWeight: 800, letterSpacing: '-0.04em' },
    h2: { fontWeight: 800, letterSpacing: '-0.04em' },
    h3: { fontWeight: 700, letterSpacing: '-0.03em' },
    h4: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.6 },
  },
  shape: { borderRadius: 20 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'radial-gradient(circle at top, rgba(215,181,133,0.26), transparent 30%), linear-gradient(180deg, #f7f3ed 0%, #f0eadf 100%)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: 'none',
          fontWeight: 700,
          boxShadow: 'none',
          letterSpacing: '0.01em',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: '1px solid rgba(18,59,77,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 20px 32px rgba(18, 59, 77, 0.08)',
          border: '1px solid rgba(18, 59, 77, 0.08)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/dict-work-window" element={<DictWorkWindow />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
