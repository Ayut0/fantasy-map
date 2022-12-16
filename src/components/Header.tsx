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
  Hidden,
  IconButton,
} from "@mui/material";
import { MdSearch, MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useHttpRequest } from "../Utils/httpRequest-hook";
import { useAppContext } from "../context/AppContext";
import MobileMenu from "./MobileMenu";

export const Header: React.FC = () => {
  const { sendRequest } = useHttpRequest();
  const { dispatch, state } = useAppContext();
  const [searchVal, setSearchVal] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
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
      <AppBar position="fixed">
        <Toolbar>
          <Grid container spacing={2} sx={{height: {xs: "100px"}}}>
            <Grid
              item
              xs={12}
              lg={8}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              {state.loggedUser && (
                <Box>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    onClick={() => setIsMenuOpen((prevValue) => !prevValue)}
                  >
                    <MdMenu />
                  </IconButton>
                </Box>
              )}
              <Box component="img" alt="logo" src="/images/logo1.png" sx={{height: '90px', width: '90px'}} />
              <Box component="div">
                <Link
                  style={{ textDecoration: "none", color: "#f0f1f7" }}
                  to="/"
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{ pr: 4, fontSize: { xs: "24px", md: "32px" } }}
                  >
                    Fantasy map
                  </Typography>
                </Link>
              </Box>
              <Hidden smDown>
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
              </Hidden>
            </Grid>
            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                justifyContent: {xs: "flex-end", md: "right"},
                alignItems: "center",
              }}
            >
              <Box sx={{ display: "flex" ,gap: 1 }}>
                {!state.loggedUser ? (
                  <>
                    <Link to="/login" style={{ color: "#f0f1f7" }}>
                      Login
                    </Link>
                    <Link to="/signup" style={{ color: "#f0f1f7" }}>
                      Register
                    </Link>
                  </>
                 ) : (
                  <>
                    <Hidden smDown>
                      <Link
                        to="/profile"
                        style={{ color: "#f0f1f7", textDecoration: "none" }}
                      >
                        Welcome, <span style={{ textDecoration: 'underline' }}>{state.loggedUser.name}</span>
                      </Link>
                      <Button
                        color="inherit"
                        variant="outlined"
                        size="small"
                        onClick={handleClickLogout}
                        sx={{ lineHeight: "1rem" }}
                      >
                        Logout
                      </Button>
                    </Hidden>
                    <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
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
