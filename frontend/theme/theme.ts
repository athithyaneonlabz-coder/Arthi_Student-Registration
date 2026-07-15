import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#1d4ed8",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#f97316",
      contrastText: "#ffffff"
    },
    background: {
      default: "#f4f7fb",
      paper: "#ffffff"
    },
    text: {
      primary: "#102136",
      secondary: "#54657b"
    }
  },
  spacing: 8,
  shape: {
    borderRadius: 16
  },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Arial, sans-serif',
    h3: {
      fontWeight: 800,
      letterSpacing: "-0.03em"
    },
    h4: {
      fontWeight: 700,
      letterSpacing: "-0.02em"
    },
    button: {
      textTransform: "none",
      fontWeight: 700
    }
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none"
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        fullWidth: true
      }
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 20
        }
      }
    }
  }
});

export const theme = responsiveFontSizes(baseTheme);

export default theme;