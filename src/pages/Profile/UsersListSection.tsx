import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListSection from "./ListSection";
import { ListCard as ListCardType } from "../../../typings"

interface Props {
  lists: ListCardType[];
}

const UsersListSection: React.FC<Props> = ({ lists = [] }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "2rem",
        }}
      >
        <Typography component="h3" variant="h4" sx={{ color: "#232946", fontSize: "2rem" }}>
          Your lists
        </Typography>
        <Link
          to={"/list/see"}
          style={{
            textDecoration: "none",
            color: "#025B67",
            textAlign: "end",
            fontSize: "1.25rem",
          }}
        >
          See more list
          <ArrowForwardIosIcon fontSize="small" sx={{fontSize: "1rem"}} />
          <ArrowForwardIosIcon fontSize="small" sx={{fontSize: "1rem"}}/>
        </Link>
      </Box>
      <ListSection lists={lists} />
    </Box>
  );
};

export default UsersListSection;
