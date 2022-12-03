import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import React, { useEffect, useState } from "react";
import AppTemplate from "../../templates/AppTemplate";
import BioSection from "./BioSection";
import UsersFavorite from "./UsersFavorite";
import UsersListSection from "./UsersListSection";
import UsersReview from "./UsersReview";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useAppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const { state } = useAppContext();
  const { sendRequest } = useHttpRequest();
  const [profileData, setProfileData] = useState<any>();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (state.loggedUser?.id) {
        setProfileData(await sendRequest("/api/users/profile", "GET"));
      } else {
        navigate("/login");
      }
    })();
  }, [state.loggedUser]);

  return (
    <AppTemplate>
      <Stack
        sx={{ width: "100%", backgroundColor: "#F9F6F0", paddingTop: "10rem" }}
      >
        <Grid
          container
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          rowSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item xs={12}>
            <BioSection profileData={profileData} />
          </Grid>
          <Grid item xs={12}>
            <UsersListSection profileData={profileData} />
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <UsersFavorite />
              <UsersReview profileData={profileData} />
            </Grid>
          </Grid>
        </Grid>
      </Stack>
    </AppTemplate>
  );
};

export default Profile;
