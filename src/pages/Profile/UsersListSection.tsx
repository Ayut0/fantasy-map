import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ListSection from "./ListSection";

interface Props {
  profileData: any;
}

const UsersListSection: React.FC<Props> = ({ profileData }) => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          marginBottom: "2rem",
        }}
      >
        <Typography component="h3" variant="h4" sx={{ color: "#232946" }}>
          Your lists
        </Typography>
        <Link
          to={"/list/see"}
          style={{
            textDecoration: "none",
            color: "#025B67",
            textAlign: "end",
            fontSize: "1.5rem",
          }}
        >
          See more list
          <ArrowForwardIosIcon fontSize="small" />
          <ArrowForwardIosIcon fontSize="small" />
        </Link>
      </Box>
      <ListSection lists={profileData?.lists} />
    </Box>
  );
};

export default UsersListSection;
