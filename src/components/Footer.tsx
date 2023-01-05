import React from "react";
import Typography from "@mui/material/Typography";
import { Container, Grid, Box } from "@mui/material";
import GithubLinks from "./GithubLinks";

export const Footer: React.FC = () => {
  return (
    <Box sx={{
      backgroundColor: "#232946",
      color: '#FFF',
      py: 3,
    }}>
      <Container component="footer">
        <Grid container>
          <Grid item xs={4}>
            <TheBox>
              <Box component="img" alt="logo" src="/images/logo1.png" sx={{height: '110px', width: '110px'}} />
            </TheBox>
          </Grid>
          <Grid item xs={4} sx={{ display: 'flex' }}>
            <TheBox>
              <Typography variant="h6" textAlign="center" sx={{ mb: 1 }}>
                Fantasy map  
              </Typography>
              <Typography variant="body1" textAlign="center">
                CICCC Web Development Final Project
              </Typography>
              <Typography variant="body1" textAlign="center">
                Vancouver, BC
              </Typography>
            </TheBox>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: 'right' }}>
            <TheBox>
              <Typography variant="body1">Made with ❤️ by:</Typography>
              <GithubLinks />
            </TheBox>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const TheBox = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        justifyContent: 'center',
      }}
    >
      {children}
    </Box>
  )
}