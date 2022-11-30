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
import { HiPaperAirplane } from "react-icons/hi";
import { MdFavoriteBorder } from "react-icons/md";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import AppTemplate from "../../templates/AppTemplate";
import { Place as PlaceType } from "../../../typings";
import { Review as ReviewType } from "../../../typings";
import { useNavigate, useParams } from "react-router-dom";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";
import ActionButton from "../../components/ActionButton";
import { useAppContext } from "../../context/AppContext";

export const Place: React.FC = () => {
  const params = useParams();
  const { state } = useAppContext();
  const [loadedPlace, setLoadedPlace] = useState<PlaceType>();
  const { sendRequest } = useHttpRequest();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isNameEdit, setIsNameEdit] = useState<boolean>(false);
  const [isAddressEdit, setIsAddressEdit] = useState<boolean>(false);
  const [isDescriptionEdit, setIsDescriptionEdit] = useState<boolean>(false);
  const [inputPlaceName, setInputPlaceName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [location, setLocation] = useState({});
  const [isUserIdMatches, setIsUserIdMatches] = useState<boolean>(false);
  const navigate = useNavigate();

  const msg = `You are about to delete this place.
              Once you delete the place, you are not able to restore....
              If you are good, click the button below.`;
  const btnMsg = "Delete this place";

  useEffect(() => {
    const getPlaceById = async () => {
      const place = await sendRequest(`/api/places/${params.pid}`, "GET");
      setLoadedPlace(place);
      setInputPlaceName(place.name);
      setInputAddress(place.address);
      setInputDescription(place.description);
      setLocation(place.location);
      console.log("test", place);
      //compare userID from place and user ID logged in
      if (place.user.id === state?.loggedUser?.id) {
        setIsUserIdMatches(true);
      }
    };

    getPlaceById();
  }, [params.pid]);

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

  return (
    <AppTemplate>
      {loadedPlace ? (
        <Fragment>
          <ConfirmationModal
            open={open}
            handleClose={handleClose}
            msg={msg}
            btnMsg={btnMsg}
            clickEvent={deletePlaceHandler}
          />
          <Container>
            <CardMedia
              component="img"
              height="600"
              image={loadedPlace.picture}
              alt="place image"
              sx={{ paddingTop: "10rem" }}
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
            <Typography variant="h4" sx={{ textAlign: "left", my: "40px" }}>
              Last reviews
            </Typography>
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
                        <Box>
                          <Avatar sx={{ margin: "10px auto" }} />
                        </Box>
                        <Typography>User Name</Typography>
                        <Rating
                          name="read-only"
                          value={review.stars}
                          readOnly
                        />
                        <Typography variant="body2" color="text.secondary">
                          {review.content}
                        </Typography>
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
                  Delete
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
