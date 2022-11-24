import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MdSearch } from "react-icons/md";
import { Grid } from "@mui/material";
import Container from "@mui/material/Container";
import { useHttpRequest } from "../Utils/httpRequest-hook";
import { useAppContext } from "../context/AppContext";

const handleInputChange = (event: any) => {
  console.log(event.target.value);
};

const handleClickLogin = (event: any) => {
  console.log("Login clicked");
};

const handleClickRegister = (event: any) => {
  console.log("Register clicked");
};

export const Header: React.FC = () => {
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
                <Typography variant="h4" component="div" sx={{ pr: 4 }}>
                  Fantasy map
                </Typography>
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
                    <Button color="inherit" onClick={handleClickLogin}>
                      Login
                    </Button>
                    <Button color="inherit" onClick={handleClickRegister}>
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
