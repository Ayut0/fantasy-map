import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import { FavoriteList } from "../../../typings";

type Data = {
  favorites: FavoriteList[];
};


const DUMMY_PLACES = [
  {
    id: '1',
    name: "Mauricios Wine Shop",
    description: "Absolutely the best!!",
    image:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",

    userId: 1,
    rating: 3,
  },
  {
    id: '2',
    name: "Mauricios Wine Shop",
    description: "Absolutely the best!!",
    image:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",

    userId: 1,
    rating: 5,
  },
  {
    id:'3',
    name: "Mauricios Wine Shop",
    description: "Absolutely the best!!",
    image:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",

    userId: 1,
    rating: 1,
  },
];
const UsersFavorite: React.FC = () => {

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
          Your reviews
        </Typography>
        <Link
          to={""}
          style={{
            textDecoration: "none",
            color: "#025B67",
            textAlign: "end",
            fontSize: "1.5rem",
          }}
        >
          See more list
          <ArrowForwardIosIcon fontSize="small" />
          <ArrowForwardIosIcon fontSize="small" />
        </Link>
      </Box>
      <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '2rem', alignItems: 'center', justifyContent: 'center'}}>
        {DUMMY_PLACES.map((place) => (
          <Card key={place.id} sx={{ display: "flex", mb: 8, width:{lg: '65%'} }}>
            <CardActionArea sx={{display:'flex', justifyContent: 'initial'}}>
            <CardMedia component="img" image={place.image} alt={place.name} sx={{ width: "40%" }} />
            <CardContent sx={{textAlign: 'initial'}}>
              <Typography variant="h6">{place.name}</Typography>
              <Typography variant="subtitle1">{place.description}</Typography>
              <Rating name="read-only" value={place.rating} readOnly />
            </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Grid>
  );
};

export default UsersFavorite;
