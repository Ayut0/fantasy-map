import { Box, Card, CardActionArea, CardContent, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import React from "react";
import { Link } from "react-router-dom";
import { Review } from "../../../typings";

type Data = {
  reviews: Review[]
}

const DUMMY_REVIEWS = [
  {
    id: '1',
    name: "Mauricios Wine Shop",
    content: "It's good but there is a room to improve their service."
  },
  
  {
    id: '2',
    name: "Mauricios Wine Shop",
    content: "It's good but there is a room to improve their service."
  },
  {
    id: '3',
    name: "Mauricios Wine Shop",
    content: "It's good but there is a room to improve their service."
  },

]

const UsersReview: React.FC = () => {
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
      <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: {sm: '2rem', lg: '6rem'}, alignItems: 'center', justifyContent: 'center'}}>
        {DUMMY_REVIEWS.map((review) => (
        <Card key={review.id} sx={{ width:{lg: '65%'} }}>
          <CardActionArea>
            <CardContent sx={{padding: '40px' ,textAlign: 'initial'}}>
            <Typography variant="h6">{review.name}</Typography>
              <Typography variant="subtitle1">{review.content}</Typography>
            </CardContent>
          </CardActionArea>
          </Card>
        ))}
      </Box>
    </Grid>
  );
};

export default UsersReview;
