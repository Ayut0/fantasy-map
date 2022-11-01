import React from "react";
import "./App.css";
import { Header } from "./components/Header";
import { Hero } from "./Hero";
import { Lists } from "./Lists";
import { Categories } from "./Categories";
import { Footer } from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: "#232946",
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      // dark: will be calculated from palette.secondary.main,
      contrastText: "#ffcc00",
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Hero/>
        <Lists/>
        <Categories/>
        <Footer/>
      </ThemeProvider>
    </div>
  );
}

export default App;
