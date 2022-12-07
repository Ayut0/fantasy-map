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
  TextField,
  Typography,
} from "@mui/material";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";
import { HiPaperAirplane } from "react-icons/hi";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import AppTemplate from "../../templates/AppTemplate";
import { Place as PlaceType } from "../../../typings";
import { Review as ReviewType } from "../../../typings";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import ActionButton from "../../components/ActionButton";
import { useAppContext } from "../../context/AppContext";
import LoadingSpinner from "../../components/LoadingSpinner";

export const Place: React.FC = () => {
  const params = useParams();
  const { state } = useAppContext();
  const [loadedPlace, setLoadedPlace] = useState<PlaceType>();
  const { sendRequest, isLoading } = useHttpRequest();
  const [open, setOpen] = useState(false);
  const [openReview, setOpenReview] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpenReview = (id: number) => {
    setOpenReview(true);
    setIdToBeDeleted(id);
  };
  const handleClose = () => setOpen(false);
  const handleCloseReview = () => setOpenReview(false);
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [isAddressEdit, setIsAddressEdit] = useState<boolean>(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState<boolean>(false);
  const [inputPlaceName, setInputPlaceName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [location, setLocation] = useState({});
  const [isUserIdMatches, setIsUserIdMatches] = useState<boolean>(false);
  const [idToBeDeleted, setIdToBeDeleted] = useState<number>();
  const [isFetchData, setIsFetchData] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const navigate = useNavigate();

  const msgPlace = `You are about to delete this place.
              Once you delete the place, you are not able to restore....
              If you are good, click the button below.`;
  const btnMsgPlace = "Delete this place";
  const msgReview = `You are about to delete this review.
              Once you delete the review, you are not able to restore....
              If you are good, click the button below.`;
  const btnMsgReview = "Delete this review";

  useEffect(() => {
    const getPlaceById = async () => {
      const place = await sendRequest(`/api/places/${params.pid}`, "GET");
      setLoadedPlace(place);
      console.log(place);
      setInputPlaceName(place.name);
      setInputAddress(place.address);
      setInputDescription(place.description);
      setLocation(place.location);
      setIsFavorite(place.favorite);
      console.log("test", place);
      //compare userID from place and user ID logged in
      if (place.user.id === state?.loggedUser?.id) {
        setIsUserIdMatches(true);
      }
      setIsFetchData(false);
    };
    if (isFetchData) {
      getPlaceById();
    }
  }, [params.pid, isFetchData]);

  const updatePlaceHandler = async (event: any) => {
    event.preventDefault();
    try {
      const updatedPlaceData = {
        name: inputPlaceName,
        address: inputAddress,
        location: location,
        description: inputDescription,
        picture: loadedPlace?.picture,
      };

      await sendRequest(`/api/places/${params.pid}`, "PUT", updatedPlaceData);
      navigate(0)
    } catch (err) {
      console.log(err);
    }
  };

  const deletePlaceHandler = async (event: any) => {
    event.preventDefault();
    try {
      await sendRequest(`/api/places/${params.pid}`, "DELETE");

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteReviewHandler = async (event: any) => {
    event.preventDefault();
    try {
      await sendRequest(`/api/reviews/${idToBeDeleted}`, "DELETE");
      setOpenReview(false);
      setIsFetchData(true);
    } catch (err) {
      console.log(err);
    }
  };

  const switchFavorite = async () => {
    setIsFavorite(!isFavorite);
    try {
      await sendRequest(`/api/favorites/${params.pid}`, "PUT");
    } catch (err) {
      console.log(err);
    }
  };

  const handleGetDirection = async () => {
    const place = await sendRequest(`/api/places/${params.pid}`, "GET");
    setLoadedPlace(place);
    window.open(
      `https://maps.google.com/?q=${place.location.lat},${place.location.lng}`,
      "_blank"
    );
  };

  return (
    <AppTemplate>
      <>
        {isLoading && <LoadingSpinner loading={true} /> }
      </>
      {loadedPlace ? (
        <Fragment>
          <ConfirmationModal
            open={open}
            handleClose={handleClose}
            msg={msgPlace}
            btnMsg={btnMsgPlace}
            clickEvent={deletePlaceHandler}
            isWarning={true}
          />
          <ConfirmationModal
            open={openReview}
            handleClose={handleCloseReview}
            msg={msgReview}
            btnMsg={btnMsgReview}
            clickEvent={deleteReviewHandler}
            isWarning={true}
          />
          <Container sx={{ pb: 5 }}>
            <CardMedia
              component="img"
              height="600"
              image={loadedPlace.picture}
              alt="place image"
              sx={{ paddingTop: "10rem" }}
            />
            <Box sx={{ display: "flex", justifyContent: "right", mt: "30px" }}>
              <Button onClick={switchFavorite}>
                {isFavorite ? (
                  <MdFavorite size={20} />
                ) : (
                  <MdFavoriteBorder size={20} />
                )}
              </Button>
              <ActionButton
                variant="contained"
                type="submit"
                onClick={handleGetDirection}
                sx={{
                  backgroundColor: "#2CA58D",
                }}
              >
                Get direction<FiExternalLink />
              </ActionButton>
            </Box>
            <Box sx={{ display: "flex" }}>
              {isNameEdit ? (
                <Box component="form" onSubmit={updatePlaceHandler}>
                  <TextField
                    margin="normal"
                    defaultValue={loadedPlace.name}
                    onChange={(event) => setInputPlaceName(event.target.value)}
                  />
                </Box>
              ) : (
                <Typography variant="h3">{loadedPlace.name}</Typography>
              )}
              {isUserIdMatches && (
                <Button onClick={() => setIsNameEdit(!isNameEdit)}>
                  <FiEdit size={32} />
                </Button>
              )}
            </Box>
            <Grid container className="wrap__address__description">
              <Grid item xs={6} sx={{ textAlign: "left", my: 6 }}>
                <Typography variant="h4" mb="15px">
                  <HiPaperAirplane
                    size={20}
                    style={{ transform: "rotate(55deg)" }}
                  />
                  Address
                  {isUserIdMatches && (
                    <Button onClick={() => setIsAddressEdit(!isAddressEdit)}>
                      <FiEdit size={20} />
                    </Button>
                  )}
                </Typography>
                {isAddressEdit ? (
                  <Box component="form" onSubmit={updatePlaceHandler}>
                    <GooglePlacesAutocomplete
                      apiKey={process.env.REACT_APP_KEY_GOOGLE_PLACES}
                      selectProps={{
                        defaultInputValue: inputAddress,
                        placeholder: "Address *",
                        styles: {
                          input: (provided: any) => ({
                            ...provided,
                          }),
                          option: (provided: any) => ({
                            ...provided,
                            textAlign: "left",
                          }),
                        },
                        onChange: async (address: any) => {
                          setInputAddress(address.label);
                          const results = await geocodeByAddress(address.label);
                          const latLng = await getLatLng(results[0]);
                          const lat = latLng.lat;
                          const lng = latLng.lng;
                          setLocation({ lat: lat, lng: lng });
                        },
                      }}
                    />
                  </Box>
                ) : (
                  <Typography variant="body1" sx={{ fontSize: "20px" }}>
                    {loadedPlace.address}
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "left", my: 6 }}>
                <Typography variant="h4" mb="15px">
                  Description
                  {isDescriptionEdit ? (
                    <Box component="form" onSubmit={updatePlaceHandler}>
                      <TextField
                        margin="normal"
                        rows={4}
                        defaultValue={loadedPlace.description}
                        value={inputDescription}
                        onChange={(event) =>
                          setInputDescription(event?.target.value)
                        }
                      />
                    </Box>
                  ) : (
                    <Typography variant="body1" sx={{ fontSize: "20px" }}>
                      {loadedPlace.description}
                    </Typography>
                  )}
                  {isUserIdMatches && (
                    <Button
                      onClick={() => setIsDescriptionEdit(!isDescriptionEdit)}
                    >
                      <FiEdit size={20} />
                    </Button>
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid container sx={{ alignItems: "center" }}>
              <Grid item xs={9}>
                <Typography variant="h4" sx={{ textAlign: "left", my: "40px" }}>
                  Last reviews
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <ActionButton
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#2CA58D",
                  }}
                >
                  <Link
                    to={`/place/${params.pid}/review`}
                    style={{ textDecoration: "none", color: "#EEEEEE" }}
                  >
                    Add a new review
                  </Link>
                </ActionButton>
              </Grid>
            </Grid>
            {loadedPlace.reviews?.length === 0 && (
              <Typography variant="h5" sx={{ textAlign: "left", mb: "200px" }}>
                No review given yet :)
              </Typography>
            )}
            <Grid
              container
              rowSpacing={6}
              columnSpacing={{ xs: 6, sm: 2, md: 3 }}
            >
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
                        {state?.loggedUser?.id === review.user.id && (
                          <Box
                            sx={{ display: "flex", justifyContent: "right" }}
                          >
                            <Box
                              sx={{
                                "&:hover": {
                                  cursor: "pointer",
                                  color: "red",
                                },
                              }}
                              onClick={() => handleOpenReview(review.id)}
                            >
                              <RiDeleteBin6Line />
                            </Box>
                          </Box>
                        )}
                        <Box>
                          <Avatar sx={{ margin: "10px auto" }} />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography>{review.user.name}</Typography>
                          <Rating
                            name="read-only"
                            value={review.stars}
                            readOnly
                          />
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ textAlign: "center" }}
                          >
                            {review.content}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
            {isUserIdMatches && (
              <Box
                sx={{ display: "flex", justifyContent: "right", mt: "20px" }}
              >
                <Button sx={{ color: "red" }} onClick={handleOpen}>
                  Delete Place
                  <RiDeleteBin6Line />
                </Button>
              </Box>
            )}
          </Container>
        </Fragment>
      ) : (
        <Box sx={{ position: "absolute", top: "50%", left: "50%" }}>
          <span>Oh... could not find your place...</span>
          <ActionButton
            variant="outlined"
            onClick={() => navigate("/place/create")}
          >
            Create a new one?
          </ActionButton>
        </Box>
      )}
    </AppTemplate>
  );
};
