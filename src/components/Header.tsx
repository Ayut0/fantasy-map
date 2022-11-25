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
    });
  };

  const handleInputChange: React.ChangeEventHandler = (event: any) => {
    setSearchVal(event.target.value);
    // dispatch({ type: "search", payload: event.target.value });
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
                alignItems: "flex-end",
              }}
            >
              <Box>
                {/* Could be replaced by react-router-dom Link component */}
                {!state.loggedUser ? (
                  <>
                    <Button color="inherit">Login</Button>
                    <Button color="inherit">Register</Button>
                  </>
                ) : (
                  <>
                    <p>Welcome, {state.loggedUser.name}</p>
                    <Button color="inherit" onClick={handleClickLogout}>
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
