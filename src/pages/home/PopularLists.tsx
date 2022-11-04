import React from "react";
import { PopularListCard } from "./PopularListCard";
import Typography from "@mui/material/Typography";

export const PopularLists: React.FC = () => {
  return (
    <>
      <Typography variant="h2" align="left" sx={{ mt: 10, mb: 8 }}>
        Popular lists
      </Typography>
      <PopularListCard />
    </>
  );
};
