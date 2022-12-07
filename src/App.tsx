import React, { useEffect, useState } from "react";
import "./App.css";
import { Footer } from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Route, Routes } from "react-router-dom";
import Lists from "./pages/Lists/Lists";

import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";

import { Place } from "./pages/Place/Place";
import { Review } from "./pages/Place/Review";
import Profile from "./pages/Profile/Profile";
import ProfileEdit from "./pages/Profile/ProfileEdit";
import CreateList from "./pages/Lists/CreateList";
import { SeeList } from "./pages/Lists/SeeList";
import { CreatePlace } from "./pages/Place/CreatePlace";
import { Home } from "./pages/Home/Home";
import { Result } from "./pages/Result/Result";
import { useAppContext } from "./context/AppContext";
import { useHttpRequest } from "./Utils/httpRequest-hook";
import Alert from "./components/Alert";

const theme = createTheme({
  palette: {
    primary: {
      main: "#232946",
    },
    secondary: {
      light: "#0066ff",
      main: "#F9F6F0",
      contrastText: "#ffcc00",
    },
  },
  typography: {
    fontFamily: ["Merriweather", "serif"].join(","),
  },
});

function App() {
  const { sendRequest } = useHttpRequest();
  const { dispatch } = useAppContext();
  const [fetchingDataFromToken, setFetchingDataFromToken] = useState(true);

  const fetchUserDataFromToken = async () => {
    const data = await sendRequest("/api/users/jwt", "GET");
    if (data) {
      dispatch({ type: "login", payload: data });
    }
    setFetchingDataFromToken(false);
  };

  useEffect(() => {
    fetchUserDataFromToken();
  }, []);

  return (
    <div className="App">
      {fetchingDataFromToken ? (
        "Loading..."
      ) : (
        <ThemeProvider theme={theme}>
            <Alert />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/lists/:lid"
                element={<ProtectedRoute element={<Lists />} />}
              />
              <Route
                path="/list/create"
                element={<ProtectedRoute element={<CreateList />} />}
              />
              <Route
                path="/list/:lid"
                element={<ProtectedRoute element={<CreateList />} />}
              />
              <Route
                path="/list/see"
                element={<ProtectedRoute element={<SeeList />} />}
              />
              <Route
                path="/place/:pid"
                element={<ProtectedRoute element={<Place />} />}
              />
              <Route
                path="/place/create"
                element={<ProtectedRoute element={<CreatePlace />} />}
              />
              <Route
                path="/place/:pid/review"
                element={<ProtectedRoute element={<Review />} />}
              />
              <Route
                path="/profile/"
                element={<ProtectedRoute element={<Profile />} />}
              />
              <Route
                path="/profile/edit"
                element={<ProtectedRoute element={<ProfileEdit />} />}
              />
              <Route path="/result" element={<Result />} />
            </Routes>
          <Footer />
        </ThemeProvider>
      )}
    </div>
  );
}

export default App;
