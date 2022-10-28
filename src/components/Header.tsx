import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import { MdSearch } from "react-icons/md";
import { Grid } from "@mui/material";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "white",
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "black",
  "& .MuiInputBase-input": {
    // padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "12ch",
      },
    },
  },
}));

export const Header: React.FC = () => {
  return (
    <Box>
      <AppBar position="static">
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
                <Typography variant="h4" component="div">
                  Fantasy map
                </Typography>
              </Box>
              <Box component="div">
                <Search
                  sx={{
                    borderRadius: 5,
                    height: 30,
                  }}
                >
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                  />
                  <MdSearch
                    style={{
                      color: "#232946",
                      paddingTop: 3,
                      paddingRight: 3,
                    }}
                    size="30px"
                  />
                </Search>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "right",
                  alignItems: "flex-end",
                }}
              >
                <Button color="inherit">Login</Button>
                <Button color="inherit">Register</Button>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
