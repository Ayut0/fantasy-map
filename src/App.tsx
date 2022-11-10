import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { Header } from "./components/Header";
import { Hero } from "./pages/Home/Hero";
import { PopularLists } from "./pages/Home/PopularLists";
import { Categories } from "./pages/Home/Categories";
import { Footer } from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Lists from "./pages/Lists/Lists";
import { Place } from "./pages/Place/Place";

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
        <Hero />
        <Container maxWidth="lg"> 
        <PopularLists />
        <Categories/>
        </Container>
        <Routes>
          <Route path="/lists" element={<Lists />} />
          <Route path="/place" element={<Place/>}/>
          <Route path="/profile" />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
