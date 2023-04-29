import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    // mode: preferMode ? "dark" : "light",
    primary: {
      lighter: "#bbdefb", //blue[100]
      light: "#64b5f6", //blue[300]
      main: "#2196f3", // blue[500]
      dark: "#1565c0", //blue[800]
    },
    secondary: {
      main: "#B60766",
    },
    third: {
      main: "#C45211",
    },
    dark: {
      main: "#181F29",
      light: "#1B4667",
    },
    text: {
      primary: "#000",
    },
  },
});

const ThemeProvider = ({ children }) => {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
