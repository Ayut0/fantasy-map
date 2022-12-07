import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Rating,
} from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import { ListCard as ListCardType } from '../../../typings';

const ListCard: React.FC<ListCardType> = ({ id, name, description, picture, averageStars }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: .5
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.1 }}
    >
      <Card sx={{ display: "flex", mb: 8 }}>
        <Link to={`/place/${id}`}>
        <Box sx={{ display: "flex" }}>
        <CardMedia
          component="img"
          sx={{ width: "30%" }}
          image={picture}
          alt="description"
        ></CardMedia>
          <CardContent sx={{ display: "1 0 auto", textAlign: 'initial' }}>
            <Typography variant="h6" sx={{fontWeight: 'bold'}}>{name}</Typography>
            <Typography variant="subtitle1">{description}</Typography>
            <Rating name="read-only" value={averageStars} readOnly sx={{paddingTop: '52px'}} />
          </CardContent>
        </Box>
        </Link>
      </Card>
    </motion.div>
  );
};

export default ListCard;
