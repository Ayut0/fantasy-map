import { Grid } from "@mui/material";
import React from "react";
import ProfileInfo from "./ProfileInfo";
import EditButton from "./EditButton";
import ProfilePicture from "./ProfilePicture";

interface Props {
  profileData: any;
}

const BioSection: React.FC<Props> = ({ profileData }) => {
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        lg={4}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <ProfilePicture picture={profileData?.profilePicture} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <ProfileInfo
          name={profileData?.name}
          location={profileData?.location}
          description={profileData?.description}
        />
      </Grid>
      <Grid item xs={12} lg={4} sx={{ width: { xs: "50%", md: "30%" } }}>
        <EditButton />
      </Grid>
    </Grid>
  );
};

export default BioSection;
