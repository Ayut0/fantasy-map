import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { HiPaperAirplane } from "react-icons/hi";
import { MdFavoriteBorder } from "react-icons/md";

const dummyPlaces: object[] =  [
        {
          name: 'Kitsilano Beach Basketball Courts',
          address: '1499 Arbutus St, Vancouver, BC V6J 5N2',
          description: 'Public court in front of the ocean',
          picture:
            'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          categoryId: 1,
          userId: 2,
        },
        {
          name: 'Chinatown craaazy court',
          address: '1200 Hastings St., Vancouver, BC 3M3 5N2',
          description: 'The craziest court in Chinatown',
          picture:
            'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          categoryId: 1,
          userId: 2,
        },
        {
          name: 'Costco Basketball Court',
          address: '1000 Main St, Vancouver, BC V66 5NN',
          description: 'You can play and then have some cheap hotdogs...',
          picture:
            'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          categoryId: 1,
          userId: 2,
        },
        {
          name: 'Eri Wine Store',
          address: '123 Sherbrooke, Vancouver, BC 3M3 Y67',
          description: 'Best wine store in town',
          picture:
            'https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg',
          categoryId: 7,
          userId: 1,
        },
      ];

const dummyReviews: object[] = [
  {
    content: "Definitely the best place to play in the neighbourhood!",
    stars: 5,
    userId: 3,
    placeId: 1,
  },
  {
    content: "I dont like basketball... what is the point..!?",
    stars: 2,
    userId: 1,
    placeId: 1,
  },
  {
    content:
      "I had so much wine, I dont remember, but probably it is nice place",
    stars: 5,
    userId: 3,
    placeId: 4,
  },
  {
    stars: 5,
    userId: 1,
    placeId: 4,
  },
  {
    stars: 5,
    userId: 2,
    placeId: 2,
  },
  {
    stars: 5,
    userId: 2,
    placeId: 3,
  },
];

export const SeePlace: React.FC = () => {
 
  return (
    <>
      <Container>
        <Box sx={{ display: "flex", justifyContent: "right" }}>
          <Button>
            <MdFavoriteBorder />
          </Button>
          <Button>Get direction</Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">Place name</Typography>
          <Button>
            <FiEdit />
          </Button>
        </Box>
        <Grid container className="wrap__address__description">
          <Grid item xs={6} sx={{ textAlign: "left", my: 6 }}>
            <Typography variant="h4">
              <HiPaperAirplane />
              Address
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              Detail address
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left", my: 6 }}>
            <Typography variant="h4">
              Description
              <Button>
                <FiEdit />
              </Button>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              Detail description
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" sx={{ textAlign: "left" }}>
          Last reviews
        </Typography>
        <Grid container rowSpacing={6} columnSpacing={{ xs: 6, sm: 2, md: 3 }}>
          {dummyReviews.map((review: any) => {
            return (
              <Grid key={1} item xs={3}>
                <Card
                  sx={{
                    width: "180px",
                    height: "210px",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        flexFlow: "column",
                        justifyContent: "space-around",
                      }}
                    >
                      <Avatar sx={{ margin: "0 auto" }} />
                      <Typography>User Name</Typography>
                      <Rating name="read-only" value={review.stars} readOnly />
                      <Typography>{review.content}</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{display: "flex", justifyContent: "right"}}>
          <Button>
            Delete
            <RiDeleteBin6Line />
          </Button>
        </Box>
      </Container>
    </>
  );
};
