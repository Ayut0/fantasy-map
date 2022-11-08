import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";

interface Category {
  id: number;
  name: string;
}

export const CategoryCard: React.FC = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  return (
    <Grid
      container
      rowSpacing={6}
      columnSpacing={{ xs: 6, sm: 2, md: 3 }}
    >
      {categories.map((category:any) => {
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
                <img src={category.picture}/>
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
