import React from "react";
import "./App.css";
import Container from "@mui/material/Container";
import { Header } from "./components/Header";
import { Hero } from "./pages/home/Hero";
import { PopularLists } from "./pages/home/PopularLists";
import { Categories } from "./pages/home/Categories";
import { Footer } from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Lists from "./pages/Lists/Lists";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

import { Place } from "./pages/Place/Place";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import CreateList from "./pages/Lists/CreateList";


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
  typography: {
    fontFamily: [
      'Merriweather',
      'serif'
    ].join(',')
  }
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
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list/create" element={<CreateList />} />
          <Route path="/list/:lid" element={<CreateList />} />
          <Route path="/place" element={<Place/>}/>
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
