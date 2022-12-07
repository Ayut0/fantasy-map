import { Box, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ImageUpload from "../../components/ImageUpload";
import AppTemplate from "../../templates/AppTemplate";

type Props = {
  name: string;
  location?: string;
  description: string;
  email: string;
  password: string;
};

const ProfileEdit: React.FC = () => {
  return (
    <AppTemplate>
      <Grid container sx={{ paddingTop: "10rem", height: "100vh" }}>
        <Grid item xs={12} lg={6}>
          <Box>
            <Typography
              component="h3"
              variant="h4"
              sx={{ color: "#232946", width: "50%" }}
            >
              Edit profile
            </Typography>
            <Box component="form">
              <TextField
                label="Name"
                autoComplete="a"
                defaultValue=""
                name="name"
                margin="normal"
                autoFocus
                fullWidth
                sx={{ width: "70%" }}
              />
              <TextField
                label="Location"
                margin="normal"
                defaultValue=""
                fullWidth
                sx={{ width: "70%" }}
              />
              <TextField
                label="Description"
                margin="normal"
                defaultValue=""
                fullWidth
                sx={{ width: "70%" }}
              />
              <TextField
                label="Password"
                type="password"
                id="password"
                margin="normal"
                defaultValue=""
                fullWidth
                sx={{ width: "70%" }}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box>
            <ImageUpload />
          </Box>
        </Grid>
      </Grid>
    </AppTemplate>
  );
};

export default ProfileEdit;
