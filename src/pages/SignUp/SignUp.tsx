import React from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <Stack>
      <Box>
        <Link to={"/login"} style={{ textDecoration: 'none' }}>
          <Typography>Login</Typography>
        </Link>
        <Typography>Sign out</Typography>
      </Box>
    </Stack>
  );
};

export default SignUp;
