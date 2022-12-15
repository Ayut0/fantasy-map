import * as React from "react";
import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { PopularList as PopularListType } from "../../../typings";
import ActionButton from "../../components/ActionButton";
import { Link } from "react-router-dom";

export const PopularListCard: React.FC = () => {
  const [popularLists, setPopularLists] = useState<PopularListType[]>([]);
  const { sendRequest } = useHttpRequest();

  useEffect(() => {
    const getPopularList = async () => {
      const response = await sendRequest("/api/lists/popular", "GET");
      setPopularLists(response);
    };
    getPopularList();
  }, []);

  return (
    <Grid
      container
      rowSpacing={6}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
      direction={{ xs: "column", md: "row" }}
      justifyContent={{ xs: "center" }}
      alignItems={{ xs: "center", md: "flex-start" }}
    >
      {popularLists.map((list: PopularListType) => {
        return (
          <Grid key={list.id} item md={4} xs={12}>
            <Card
              sx={{
                width: { xs: "296px", md: "336px" },
                height: { lg: "528px" },
                borderRadius: "4px",
                textAlign: "center",
                backgroundColor: "#FDFDFB"
              }}
            >
              <CardContent>
                <Box sx={{ height: { md: "56px", lg: "88px" } }}>
                  <Typography
                    variant="h5"
                    component="h4"
                    sx={{
                      pb: { lg: "32px" },
                      fontWeight: "bold",
                      lineHeight: "1.6",
                      color: "#282010",
                    }}
                  >
                    {list.name}
                  </Typography>
                </Box>
                <CardMedia
                  component="img"
                  height="194"
                  image={list.picture}
                  alt="List image"
                  loading="lazy"
                />
                <Box sx={{ p: 2, height: "50px" }}>
                  <Typography
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "2",
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {list.description}
                  </Typography>
                </Box>
                <ActionButton
                  variant="contained"
                  type="submit"
                  sx={{
                    backgroundColor: "#2CA58D",
                    padding: { lg: "8px 24px" },
                  }}
                >
                  <Link
                    to={`/lists/${list.id}`}
                    style={{ textDecoration: "none", color: "#f0f1f7" }}
                  >
                    View List
                  </Link>
                </ActionButton>
                <Grid container pt={5} sx={{ alignItems: "center" }}>
                  <Grid item xs={1}></Grid>
                  <Grid item xs={5}>
                    <Avatar src={list.user.profilePicture} alt="profile icon" />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography sx={{ display: "inline", color: "#282010" }}>
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
