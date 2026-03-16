import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
         contained: {
          backgroundColor: "#673ab7",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#5e35b1",
          },
        },
       outlined: {
          color: "#5e35b1",           // text color
          borderColor: "#673ab7",     // border
          "&:hover": {
            backgroundColor: "#ede7f6", // small overlay on hover (10% opacity)
            borderColor: "#673ab7",
            color: "#673ab7",
          },
        },
      },
    },
  },
});

export default theme;