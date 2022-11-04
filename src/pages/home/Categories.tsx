import React from "react";
import { CategoryCard } from "./CategoryCard";
import Typography from "@mui/material/Typography";

export const Categories: React.FC = () => {
  return (
    <>
    <Typography variant="h2" align="left" sx={{ mt: 10, mb:8 }}>
      Category
    </Typography>
    <CategoryCard />
    </>
  );
};
