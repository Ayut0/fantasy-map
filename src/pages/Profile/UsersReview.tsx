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
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { Link } from "react-router-dom";
import { Review } from "../../../typings";

interface Props {
  profileData: any;
}

const UsersReview: React.FC<Props> = ({ profileData }) => {
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
      {profileData?.reviews && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            rowGap: { sm: "2rem", lg: "6rem" },
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!profileData?.reviews?.length && (
            <Typography variant="body1">
              You dont have any review yet
            </Typography>
          )}
          {profileData.reviews.map((review: any) => (
            <Card key={review.id} sx={{ width: { lg: "65%" } }}>
              <CardActionArea
                sx={{ display: "flex", justifyContent: "initial" }}
              >
                <CardMedia
                  component="img"
                  image={review.place.picture}
                  alt={review.place.name}
                  sx={{ width: "40%" }}
                />
                <CardContent sx={{ padding: "40px", textAlign: "initial" }}>
                  <Typography variant="h6">{review.place.name}</Typography>
                  <Rating name="read-only" value={review.stars} readOnly />
                  <Typography variant="subtitle1">{review.content}</Typography>
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
