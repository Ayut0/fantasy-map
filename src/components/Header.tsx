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
import { Link } from "react-router-dom";
import { useHttpRequest } from "../Utils/httpRequest-hook";
import { useAppContext } from "../context/AppContext";

interface Props {
  handleInputChange: (event: any)=>void
}

export const Header: React.FC<Props> = ({ handleInputChange }) => {

  const { sendRequest } = useHttpRequest();
  const { dispatch, state } = useAppContext();

  const handleClickLogout: React.MouseEventHandler = () => {
    sendRequest("/api/users/signout", "POST").then(() => {
      dispatch({ type: "logout" });
    });
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
                  id="outlined-basic"
                  placeholder="Search"
                  variant="outlined"
                  sx={{
                    backgroundColor: "white",
                    borderRadius: 8,
                  }}
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
                    <Button color="inherit" >
                      Login
                    </Button>
                    <Button color="inherit" >
                      Register
                    </Button>
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
