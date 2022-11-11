import * as React from "react";
import { useState } from "react";
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
import { ConfirmationModal } from "../../components/ConfirmationModal";

interface Places {
  name: string;
  address: string;
  description: string;
  picture: string;
  categoryId: number;
  userId: number;
}

const dummyPlaces: Places = {
  name: "Kitsilano Beach Basketball Courts",
  address: "1499 Arbutus St, Vancouver, BC V6J 5N2",
  description: "Public court in front of the ocean",
  picture: "https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg",
  categoryId: 1,
  userId: 2,
};

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const msg = `You are about to delete this place.
              Once you delete the place, you are not able to restore....
              If you are good, click the button below.`;
  const btnMsg = "Delete this place";
  
  return (
    <>
      <ConfirmationModal
        open={open}
        handleClose={handleClose}
        msg={msg}
        btnMsg={btnMsg}
      />
      <Container>
        <CardMedia
          component="img"
          height="600"
          image={dummyPlaces.picture}
          alt="place image"
        />
        <Box sx={{ display: "flex", justifyContent: "right", mt: "30px" }}>
          <Button>
            <MdFavoriteBorder size={20} />
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#2CA58D", borderRadius: "20px" }}
          >
            Get direction
          </Button>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">{dummyPlaces.name}</Typography>
          <Button>
            <FiEdit size={32} />
          </Button>
        </Box>
        <Grid container className="wrap__address__description">
          <Grid item xs={6} sx={{ textAlign: "left", my: 6 }}>
            <Typography variant="h4" mb="15px">
              <HiPaperAirplane
                size={20}
                style={{ transform: "rotate(55deg)" }}
              />
              Address
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              {dummyPlaces.address}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "left", my: 6 }}>
            <Typography variant="h4" mb="15px">
              Description
              <Button>
                <FiEdit size={20} />
              </Button>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              {dummyPlaces.description}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" sx={{ textAlign: "left", my: "40px" }}>
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
                  }}
                >
                  <CardContent sx={{ textOverflow: "ellipsis" }}>
                    <Box>
                      <Avatar sx={{ margin: "10px auto" }} />
                    </Box>
                    <Typography>User Name</Typography>
                    <Rating name="read-only" value={review.stars} readOnly />
                    <Typography variant="body2" color="text.secondary">
                      {review.content}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "right", mt: "20px" }}>
          <Button sx={{ color: "red" }} onClick={handleOpen}>
            Delete
            <RiDeleteBin6Line />
          </Button>
        </Box>
      </Container>
    </>
  );
};
