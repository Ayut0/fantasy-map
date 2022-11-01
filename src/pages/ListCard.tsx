import { motion, Variants } from "framer-motion";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";

type places = {
  name: string;
  address: string;
  description: string;
  picture: string;
  categoryId: number;
  userId: number;
};

const ListCard: React.FC<places> = ({ name, description, picture }) => {
  return (
    <Card sx={{ display: "flex", mb: 8 }}>
      <CardMedia
        component="img"
        sx={{ width: "35%" }}
        image={picture}
        alt="description"
      ></CardMedia>
      <Box sx={{ display: "flex" }}>
        <CardContent sx={{ display: "1 0 auto" }}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle1">{description}</Typography>
          <Rating name="read-only" value={1} readOnly />
        </CardContent>
      </Box>
    </Card>
  );
};

export default ListCard;
