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

interface Props {
  favorites: any[] | undefined;
}

const UsersFavorite: React.FC<Props> = ({ favorites = [] }) => {
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          rowGap: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {favorites.map((place) => (
          <Card
            key={place.id}
            sx={{ display: "flex", mb: 8, width: { lg: "65%" } }}
          >
            <CardActionArea sx={{ display: "flex", justifyContent: "initial" }}>
              <CardMedia
                component="img"
                image={place.picture}
                alt={place.name}
                sx={{ width: "40%" }}
              />
              <CardContent sx={{ textAlign: "initial" }}>
                <Typography variant="h6">{place.name}</Typography>
                <Typography variant="subtitle1">{place.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Grid>
  );
};

export default UsersFavorite;
