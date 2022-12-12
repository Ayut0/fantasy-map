import { motion } from "framer-motion";
import GoogleMapReact from "google-map-react";
import { Box, Container, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import ListCard from "./ListCard";
import AppTemplate from "../../templates/AppTemplate";
import { Link, useParams } from "react-router-dom";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { List as ListType } from "../../../typings";
import { MapCenter } from "../../../typings";
import { Marker } from "../../../typings";
import ActionButton from "../../components/ActionButton";
import { useAppContext } from "../../context/AppContext";
import LoadingSpinner from "../../components/LoadingSpinner";

const Lists: React.FC = () => {
  const params = useParams();
  const [loadedList, setLoadedList] = useState<ListType>();
  const { sendRequest, isLoading } = useHttpRequest();
  const { state } = useAppContext();

  useEffect(() => {
    const getListById = async () => {
      try {
        const list = await sendRequest(`/api/lists/${params.lid}`, "GET");
        setLoadedList(list);
      } catch (err) {
        console.log(err)
      }
    };

    getListById();
  }, [params.lid]);

  const initialProps: MapCenter = {
    center: {
      lat: loadedList?.places?.length
        ? Number(loadedList.places[0].location.lat)
        : 49.2809671,
      lng: loadedList?.places?.length
        ? Number(loadedList.places[0].location.lng)
        : -123.120904,
    },
    zoom: loadedList?.places?.length === 1 ? 6 : 12
  };

  //asl Mau somehow we got lat and lng as a string....
  const markers: Marker[] | undefined =
    loadedList &&
    loadedList.places.map((place, index) => ({
      index: index,
      location: place.location,
      name: place.name,
    }));

  const handleApiLoaded = (map: any, maps: any): void => {
    //Create the markers
    const bounds = new maps.LatLngBounds();
    const infoWindow = new maps.InfoWindow();
    markers &&
      markers.forEach((place) => {
        const marker = new maps.Marker({
          position: {
            lat: Number(place.location.lat),
            lng: Number(place.location.lng),
          },
          map: map,
          label: `${place.index + 1}`,
          title: place.name,
          tooltip: place.name,
        });

        marker.addListener("mouseover", () => {
          infoWindow.close();
          infoWindow.setContent(marker.getTitle());
          infoWindow.open(marker.getMap(), marker);
        });
        bounds.extend(marker.position);
      });
    //Prevent the map and pins from overflowing
    map.fitBounds(bounds);
  };

  return (
    <AppTemplate>
      <>
        {isLoading && <LoadingSpinner loading={isLoading} />}
      </>
      {loadedList?.places?.length ? (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{
            backgroundColor: "#F9F6F0",
            paddingTop: "104px",
            width:'100%'
          }}
        >
          <Box sx={{ width: "50%", height: "90vh", marginTop: "64px" }}>
            <Box sx={{ textAlign: "initial" }}>
              <Typography
                variant="h2"
                fontFamily="Merriweather"
                sx={{
                  fontSize: { lg: "48px", md: "32px" },
                  fontWeight: "bold",
                }}
              >
                {loadedList.name}
              </Typography>
              <Typography
                variant="h4"
                fontFamily="Merriweather"
                sx={{
                  paddingBottom: "32px",
                  fontSize: { lg: "28px", md: "24px" },
                }}
              >
                {loadedList.description}
              </Typography>
            </Box>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <Box>
                {loadedList.places.map((place) => {
                  return (
                    <ListCard
                      key={place.id}
                      id={place.id}
                      name={place.name}
                      description={place.description}
                      picture={place.picture}
                      averageStars={place.averageStars}
                    />
                  );
                })}
              </Box>
            </motion.div>
          </Box>
          <Box sx={{ gridRow: "1", width: "45%", height: "80vh" }}>
            {/* I think I should create a new component just for a google map. pass lat and lng as props. */}
            <GoogleMapReact
              bootstrapURLKeys={{
                key: `${process.env.REACT_APP_GOOGLE_MAP}`,
                libraries: ["visualization"],
              }}
              defaultCenter={initialProps.center}
              defaultZoom={initialProps.zoom}
              onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
              yesIWantToUseGoogleMapApiInternals
            ></GoogleMapReact>
          </Box>
        </Stack>
      ) : (
        <Container
          sx={{
            height: "100vh",
            pt: 30,
            textAlign: "center",
            backgroundColor: "#F9F6F0",
          }}
        >
          <Typography variant="h3" sx={{ pb: 3 }}>
            List Name: {loadedList?.name}
          </Typography>
          <Typography variant="h4" sx={{ pb: 3 }}>
            No place is registered in this list.
          </Typography>
          {loadedList?.userId === state?.loggedUser?.id && (
            <ActionButton
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: "#2CA58D",
              }}
            >
              <Link
                to={`/list/${loadedList?.id}`}
                style={{ textDecoration: "none", color: "#EEEEEE" }}
              >
                Edit List
              </Link>
            </ActionButton>
          )}
        </Container>
      )}
    </AppTemplate>
  );
};

export default Lists;
