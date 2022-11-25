import * as React from "react";
import { useState, useEffect, Fragment } from "react";
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
import AppTemplate from "../../templates/AppTemplate";
import { Place as PlaceType } from "../../../typings";
import { Review as ReviewType } from "../../../typings";
import { useParams } from "react-router-dom";
import { useHttpRequest } from "../../Utils/httpRequest-hook";

export const Place: React.FC = () => {
  const params = useParams()
  const [loadedPlace, setLoadedPlace] = useState<PlaceType>()
  const { sendRequest } = useHttpRequest();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const msg = `You are about to delete this place.
              Once you delete the place, you are not able to restore....
              If you are good, click the button below.`;
  const btnMsg = "Delete this place";
  
  useEffect(() => {
    const getPlaceById = async () => {
      const place = await sendRequest(`/api/places/${params.pid}`, "GET");
      setLoadedPlace(place)
    }

    getPlaceById();
  }, [params.pid])

  return (
    <AppTemplate>
      {loadedPlace && (
        <Fragment>
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
          image={loadedPlace.picture}
          alt="place image"
          sx={{paddingTop: '10rem'}}
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
          <Typography variant="h3">{loadedPlace.name}</Typography>
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
              <Button>
                <FiEdit size={20} />
              </Button>
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "20px" }}>
              {loadedPlace.address}
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
              {loadedPlace.description}
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="h4" sx={{ textAlign: "left", my: "40px" }}>
          Last reviews
        </Typography>
        <Grid container rowSpacing={6} columnSpacing={{ xs: 6, sm: 2, md: 3 }}>
          {loadedPlace.reviews?.map((review: ReviewType) => {
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
        </Fragment>
          )}
    </AppTemplate>
  );
};