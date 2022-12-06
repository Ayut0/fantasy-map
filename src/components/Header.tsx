import * as React from "react";
import { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdSearch } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useHttpRequest } from "../Utils/httpRequest-hook";
import { useAppContext } from "../context/AppContext";

export const Header: React.FC = () => {
  const { sendRequest } = useHttpRequest();
  const { dispatch, state } = useAppContext();
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();
  const handleClickLogout: React.MouseEventHandler = () => {
    sendRequest("/api/users/signout", "POST").then(() => {
      dispatch({ type: "logout" });
      navigate("/");
    });
  };

  const handleInputChange: React.ChangeEventHandler = (event: any) => {
    setSearchVal(event.target.value);
  };

  const handleKeyUp: React.KeyboardEventHandler = (event) => {
    if (event.code === "Enter") {
      dispatch({ type: "search", payload: searchVal });
      navigate("/result");
    }
  };

  return (
    <Container maxWidth="lg">
      <AppBar position="fixed" sx={{ py: 1.5 }}>
        <Toolbar>
          <Grid container spacing={2}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                alignItems: "flex-end",
              }}
            >
              <Box component="div">
                <Link
                  style={{ textDecoration: "none", color: "#FFFFFF" }}
                  to="/"
                >
                  <Typography variant="h4" component="div" sx={{ pr: 4 }}>
                    Fantasy map
                  </Typography>
                </Link>
              </Box>
              <Box component="div">
                <TextField
                  onChange={handleInputChange}
                  onKeyUp={handleKeyUp}
                  id="outlined-basic"
                  placeholder="Search"
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 8,
                  }}
                  value={searchVal}
                  InputProps={{
                    endAdornment: (
                      <MdSearch
                        style={{
                          color: "#232946",
                          paddingTop: 3,
                          paddingRight: 3,
                        }}
                        size="40px"
                      />
                    ),
                  }}
                />
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "right",
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 1 }}>
                {!state.loggedUser ? (
                  <>
                    <Link to="/login" style={{ color: "#fff" }}>
                      Login
                    </Link>
                    <Link to="/signup" style={{ color: "#fff" }}>
                      Register
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/profile" style={{ color: "#fff", textDecoration: "none" }}>Welcome, {state.loggedUser.name}</Link>
                    <Button
                      color="inherit"
                      variant="outlined"
                      size="small"
                      onClick={handleClickLogout}
                      sx={{ lineHeight: "1rem" }}
                    >
                      Logout
                    </Button>
                  </>
                )}
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Container>
  );
};
