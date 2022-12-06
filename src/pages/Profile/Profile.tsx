import { Grid, Container, Box } from "@mui/material";
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
  const { state, dispatch } = useAppContext();
  const { sendRequest } = useHttpRequest();
  const [reviews, setReviews] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [lists, setLists] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (state.loggedUser?.id) {
        const dbUser = await sendRequest("/api/users/profile", "GET");
        const profileData = {
          name: dbUser.name,
          email: dbUser.email,
          password: dbUser.password,
          profilePicture: dbUser.profilePicture,
          location: dbUser.location,
          description: dbUser.description,
        };
        dispatch({
          type: "setProfileData",
          payload: profileData,
        });
        setFavorites(dbUser.favoritePlaces);
        setReviews(dbUser.reviews);
        setLists(dbUser.lists);
      } else {
        navigate("/login");
      }
    })();
  }, [state.loggedUser]);

  return (
    <AppTemplate>
      <Box sx={{ backgroundColor: "#F9F6F0", paddingTop: "10rem" }}>
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12}>
              <BioSection />
            </Grid>
            <Grid item xs={12}>
              <UsersListSection lists={lists} />
            </Grid>
            <Grid item xs={12}>
              <Grid container sx={{ my: 4 }}>
                <UsersFavorite favorites={favorites} />
                <UsersReview reviews={reviews} />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </AppTemplate>
  );
};

export default Profile;
