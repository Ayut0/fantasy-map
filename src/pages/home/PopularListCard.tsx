import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import {Avatar, Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import { Buttons } from "./Buttons";

export const PopularListCard: React.FC = () => {
  const [popularLists, setPopularLists] = useState([]);
  useEffect(() => {
    axios.get("/api/lists/popular").then((res) => {
      setPopularLists(res.data);
    });
  }, []);

  return (
    <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {popularLists.map((list:any) => {
        return (
          <Grid key={list.id} item xs={4}>
            <Card
              sx={{
                width: "335px",
                height: "461px",
                borderRadius: "4px",
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" sx={{ pb: 1 }}>
                  {list.name}
                </Typography>
                <CardMedia
                  component="img"
                  height="194"
                  image={list.picture}
                  alt="List image"
                />
                <Box sx={{ p: 2, height: "50px" }}>
                  <Typography color="text.secondary">
                    {list.description}
                  </Typography>
                </Box>
                <Buttons />
                <Grid container pt={3} sx={{ alignItems: "center" }}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={3}>
                    <Avatar src={list.user.profilePicture} alt="profile icon" />
                  </Grid>
                  <Grid item xs={8}>
                    <Typography sx={{ display: "inline" }}>
                      {list.user.name}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
