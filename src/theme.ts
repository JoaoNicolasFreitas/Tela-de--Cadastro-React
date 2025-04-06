import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#6e45e1',
      light: '#88d3ce',
      dark: '#5936b4',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#d4267d',
      light: '#ff6b6b',
      dark: '#a41e60',
      contrastText: '#ffffff'
    },
    background: {
      default: '#f5f7fa',
      paper: '#ffffff'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.2
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none'
          }
        },
        contained: {
          boxShadow: '0 3px 5px 2px rgba(110, 69, 225, .2)',
          '&:hover': {
            boxShadow: '0 4px 6px 3px rgba(110, 69, 225, .3)'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#6e45e1'
            }
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
}); 