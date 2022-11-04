import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

interface Category {
  id: number;
  name: string;
}

const categoriesDummy: Category[] = [
  //delete this variable once real data available
  { id: 1, name: "Shopping" },
  { id: 2, name: "Restaurant" },
  { id: 3, name: "Beauty & Spas" },
  { id: 4, name: "Nature" },
  { id: 5, name: "Cafe" },
  { id: 6, name: "Hotel" },
  { id: 7, name: "Sports" },
  { id: 8, name: "Nightlife" },
];

export const CategoryCard: React.FC = () => {
  // useEffect(() => {
  //   axios.get("http://localhost:3000/test").then((res) => {
  //     console.log(res.data);
  //   });
  // }, []);

  return (
    <Grid
      container
      rowSpacing={6}
      columnSpacing={{ xs: 6, sm: 2, md: 3 }}
    >
      {categoriesDummy.map((category) => {
        return (
          <Grid key={category.id} item xs={3}>
            <Card
              sx={{
                width: "250px",
                height: "250px",
                borderRadius: "4px",
                display:"flex", 
                alignItems:"center",
                justifyContent:"center",
              }}
            >
              <CardContent>
                <Typography variant="h4" component="div">
                  {category.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
