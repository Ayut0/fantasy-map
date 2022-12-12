import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FavoritePlace as FavoritePlaceType } from "../../../typings"

interface Props {
  favorites: FavoritePlaceType[] | undefined;
}


const UsersFavorite: React.FC<Props> = ({ favorites = [] }) => {
  const navigate = useNavigate();
  
  const handleCardClick = (id:number) => {
  navigate(`/place/${id}`)
  }
  return (
    <Grid item xs={12} lg={6}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "2rem",
        }}
      >
        <Typography component="h3" variant="h4" sx={{ color: "#232946" }}>
          Your favorites
        </Typography>
      </Box>
      {favorites && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
        >
          {!favorites.length && (
            <Typography variant="body1">
              You don&#39;t have any favorites yet
            </Typography>
          )}
        {favorites.map((place) => (
          <Card
            key={place.id}
            sx={{ display: "flex", width: {xs: "85%", lg: "80%" } }}
            onClick={() => handleCardClick(place.id)}
          >
            <CardActionArea sx={{ display: "flex", justifyContent: "initial" }}>
              <CardMedia
                component="img"
                image={place.picture}
                alt={place.name}
                sx={{ width: "40%", height: "152px" }}
              />
              <CardContent sx={{ textAlign: "initial" }}>
                <Typography variant="h6">{place.name}</Typography>
                <Typography variant="subtitle1">{place.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
      )}
    </Grid>
  );
};

export default UsersFavorite;
