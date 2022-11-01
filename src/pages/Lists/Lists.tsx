import { motion } from "framer-motion";
import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import ListCard from "./ListCard";

type places = {
  name: string;
  address: string;
  description: string;
  picture: string;
  categoryId: number;
  userId: number;
}[];

const DUMMY_PLACES: places = [
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    userId: 1,
  },
  {
    name: "Mauricios Wine Shop",
    address: "Vancouver, BC, Canada",
    description: "Absolutely the best!!",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    categoryId: 1,
    userId: 1,
  },
];

const Lists: React.FC = () => {
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
      <Box sx={{ gridRow: "1", width: "45%" }}>Map is supposed to be here</Box>
    </Stack>
  );
};

export default Lists;
