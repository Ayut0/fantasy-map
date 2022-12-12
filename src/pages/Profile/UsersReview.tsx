import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import React from "react";
import { Link } from "react-router-dom";
import { Review as ReviewType } from "../../../typings";

interface Props {
  reviews: ReviewType[];
}

const UsersReview: React.FC<Props> = ({ reviews = [] }) => {
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
      </Box>
      {reviews && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: "2rem",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!reviews.length && (
            <Typography variant="body1">
              You don&#39;t have any review yet
            </Typography>
          )}
          {reviews.map((review: ReviewType) => (
            <Card key={review.id} sx={{ width: {xs: "85%", lg: "80%" } }}>
              <CardActionArea
                sx={{ display: "flex", justifyContent: "initial" }}
              >
                <CardMedia
                  component="img"
                  image={review.place.picture}
                  alt={review.place.name}
                  sx={{ width: "40%", height: "152px" }}
                />
                <CardContent sx={{ textAlign: "initial" }}>
                  <Typography variant="h6">{review.place.name}</Typography>
                  <Rating name="read-only" value={review.stars} readOnly />
                  <Typography
                    variant="subtitle1"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {review.content}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      )}
    </Grid>
  );
};

export default UsersReview;
