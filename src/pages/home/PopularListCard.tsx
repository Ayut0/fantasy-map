import * as React from "react";
import { useState, useEffect } from "react";
import {Avatar, Box, Card, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import { Buttons } from "./Buttons";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { PopularList as PopularListType } from "../../../typings";

export const PopularListCard: React.FC = () => {
  const [popularLists, setPopularLists] = useState<PopularListType[]>([]);
  const { error, sendRequest, clearError } = useHttpRequest();
  useEffect(() => {
    const getPopularList = async () => {
      const response = await sendRequest("/api/lists/popular", "GET");
      setPopularLists(response);
      console.log(response);
    };
    getPopularList();
  }, []);

  return (
    <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {popularLists.map((list:PopularListType) => {
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
                <Buttons listId={list.id} />
                <Grid container pt={2} sx={{ alignItems: "center" }}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={5}>
                    <Avatar src={list.user.profilePicture} alt="profile icon" />
                  </Grid>
                  <Grid item xs={6}>
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
