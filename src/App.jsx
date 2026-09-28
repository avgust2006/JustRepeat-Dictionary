import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import Login from './components/Login.jsx';
import Home from './components/Home.jsx';
import DictWorkWindow from './components/DictWorkWindow.jsx';
import tokens from './theme/tokens.js';

const theme = createTheme({
  breakpoints: tokens.breakpoints,
  palette: {
    primary: {
      main: tokens.colors.primary.main,
      dark: tokens.colors.primary.dark,
      light: tokens.colors.primary.light,
      contrastText: tokens.colors.primary.contrastText,
    },
    secondary: {
      main: tokens.colors.accent.main,
      light: tokens.colors.accent.sandLight,
      contrastText: tokens.colors.accent.contrastText,
    },
    background: {
      default: tokens.colors.background.default,
      paper: tokens.colors.background.paper,
    },
    text: {
      primary: tokens.colors.text.primary,
      secondary: tokens.colors.text.secondary,
    },
  },
  typography: {
    fontFamily: tokens.typography.fontFamily,
    h1: { fontWeight: tokens.typography.weights.extraBold, letterSpacing: tokens.typography.letterSpacings.tight },
    h2: { fontWeight: tokens.typography.weights.extraBold, letterSpacing: tokens.typography.letterSpacings.tight },
    h3: { fontWeight: tokens.typography.weights.bold, letterSpacing: '-0.03em' },
    h4: { fontWeight: tokens.typography.weights.bold, letterSpacing: '-0.02em' },
    h5: { fontWeight: tokens.typography.weights.semibold },
    h6: { fontWeight: tokens.typography.weights.semibold },
    body1: { lineHeight: tokens.typography.lineHeights.relaxed },
    body2: { lineHeight: tokens.typography.lineHeights.normal },
  },
  shape: { borderRadius: tokens.radii.cardLg },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: tokens.colors.background.bodyGradient,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: tokens.radii.md,
          textTransform: 'none',
          fontWeight: tokens.typography.weights.bold,
          boxShadow: 'none',
          letterSpacing: '0.01em',
          minHeight: tokens.interactive.minTouchTarget,
          '&:focus-visible': {
            outline: tokens.interactive.focusVisibleOutline,
            outlineOffset: tokens.interactive.focusVisibleOffset,
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: tokens.interactive.focusVisibleOutline,
            outlineOffset: tokens.interactive.focusVisibleOffset,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          border: `1px solid ${tokens.colors.border.subtle}`,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: tokens.shadows.card,
          border: `1px solid ${tokens.colors.border.subtle}`,
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
          <Route path="/dict-work-window/:title" element={<DictWorkWindow />} />
          <Route path="/dict-work-window" element={<DictWorkWindow />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Analytics />
    </ThemeProvider>
  );
}

export default App;
