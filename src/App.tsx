import React from "react";
import "./App.css";
import { Header } from "./components/Header";
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
import { SeeList } from "./pages/Lists/SeeList";
import { CreatePlace } from "./pages/Place/CreatePlace";
import { Home } from "./pages/Home/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#232946",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },
  },
  typography: {
    fontFamily: ["Merriweather", "serif"].join(","),
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list/create" element={<CreateList />} />
          <Route path="/list/:lid" element={<CreateList />} />
          <Route path="/list/see" element={<SeeList />} />
          <Route path="/place" element={<Place />} />
          <Route path="/place/create" element={<CreatePlace />} />
          <Route path="/profile/" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
        </Routes>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
