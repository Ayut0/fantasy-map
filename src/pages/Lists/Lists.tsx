import { motion } from "framer-motion";
import GoogleMapReact from "google-map-react";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import ListCard from "./ListCard";


interface Location {
  lat: number;
  lng: number;
}

type places = {
  name: string;
  address: string;
  description: string;
  picture: string;
  categoryId: number;
  location: Location;
  userId: number;
}[];

interface MapProps {
  center: {
    lat: number,
    lng: number
  };
  zoom : number
}

export interface Marker {
  index: number
  location: Location;
  name: string;
}

const DUMMY_PLACES: places = [
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    location: {
      lat: 49.2809671,
      lng: -123.120904,
    },
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    location: {
      lat: 49.267116,
      lng: -123.1029741,
    },
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    location: {
      lat: 49.2619946,
      lng: -123.1460319,
    },
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    location: {
      lat: 49.3104181,
      lng: -123.0770581,
    },
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    location: {
      lat: 49.2695769,
      lng: -123.1048286,
    },
    userId: 1,
  },
];

const Lists: React.FC = () => {
  const initialProps:MapProps = {
    center: {
      lat: 49.2809671,
    lng: -123.120904,
    },
    zoom: 16
  }

  const markers: Marker[] = DUMMY_PLACES.map(
    (place, index) => ({
      index: index,
      location: place.location,
      name: place.name,
    })
  );
  console.log(markers);

  markers.forEach((place) => {
    console.log(place.location.lat, place.location.lng)
  });

  const handleApiLoaded = (map: any, maps: any): void => {
    //Create the markers
    const bounds = new maps.LatLngBounds();
    markers.forEach((place) => {
      console.log(place.location.lat, place.location.lng)
      const marker = new maps.Marker({
        position: {lat: place.location.lat, lng:place.location.lng },
        map: map,
      });
      bounds.extend(marker.position);
    });
    //Prevent the map and pins from overflowing
    map.fitBounds(bounds);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ backgroundColor: "#F9F6F0" }}
    >
      <Box sx={{ width: "50%" }}>
        <Typography variant="h2" fontFamily="Merriweather">
          User&#39;s Lists
        </Typography>
        <Typography variant="h4" fontFamily="Merriweather">
          Hope you like it...
        </Typography>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box>
            {DUMMY_PLACES.map((place, index) => {
              return (
                <ListCard
                  key={index}
                  name={place.name}
                  address={place.address}
                  description={place.description}
                  picture={place.picture}
                  categoryId={place.categoryId}
                  userId={place.userId}
                />
              );
            })}
          </Box>
        </motion.div>
      </Box>
      <Box sx={{ gridRow: "1", width: "45%", height: "100vh" }}>
        {/* I think I should create a new component just for a google map. pass lat and lng as props. */}
        <GoogleMapReact
          bootstrapURLKeys={{
            key: `${process.env.REACT_APP_GOOGLE_MAP}`,
            libraries: ["visualization"],
          }}
          defaultCenter={initialProps.center}
          defaultZoom={initialProps.zoom}
          onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps)}
          yesIWantToUseGoogleMapApiInternals
        >
        </GoogleMapReact>
      </Box>
    </Stack>
  );
};

export default Lists;
