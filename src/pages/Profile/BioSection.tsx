import { Grid } from "@mui/material";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import EditButton from "./EditButton";
import ProfilePicture from "./ProfilePicture";
import { useAppContext } from "../../context/AppContext";

const BioSection: React.FC = () => {
  const { state, dispatch } = useAppContext();

  return (
    <Grid container sx={{ mb: 4 }}>
      <Grid
        item
        xs={12}
        lg={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ProfilePicture />
      </Grid>
      <Grid item xs={12} lg={4}>
        <ProfileInfo />
      </Grid>
    </Grid>
  );
};

export default BioSection;
