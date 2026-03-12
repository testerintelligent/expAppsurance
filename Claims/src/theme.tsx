import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
         contained: {
          backgroundColor: "#004b50",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#00363a",
          },
        },
       outlined: {
          color: "#004b50",           // text color
          borderColor: "#004b50",     // border
          "&:hover": {
            backgroundColor: "#00363a10", // small overlay on hover (10% opacity)
            borderColor: "#00363a",
            color: "#00363a",
          },
        },
      },
    },
  },
});

export default theme;