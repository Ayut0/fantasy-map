import { Grid } from "@mui/material";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import EditButton from "./EditButton";
import ProfilePicture from "./ProfilePicture";

const BioSection: React.FC = () => {
  return (
    <Grid container >
      <Grid item xs={12} lg={4} sx={{ display: 'flex' , justifyContent: 'center', alignItems: 'center'}}>
        <ProfilePicture />
      </Grid>
      <Grid item xs={12} lg={4} >
        <ProfileInfo />
      </Grid>
      <Grid item xs={12} lg={4} sx={{ width: { xs: '50%', md: '30%' }}}>
        <EditButton />
      </Grid>
    </Grid>
  );
};

export default BioSection;
