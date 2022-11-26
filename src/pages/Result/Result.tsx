import React, { useState, useContext, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import AppTemplate from "../../templates/AppTemplate";
import { Buttons } from "../Home/Buttons";
import { FaSadTear } from "react-icons/fa";
import { useHttpRequest } from "../../Utils/httpRequest-hook";

export const Result: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const [getResult, setGetResult] = useState([]);
   const { error, sendRequest, clearError } = useHttpRequest();
  const dummyResultLists = [
    {
      id: 2,
      name: "Best places to buy wine",
      description: "Come and see!",
      picture: "https://ychef.files.bbci.co.uk/976x549/p0cwcj6m.jpg",
      user: {
        id: 1,
        name: "Megumi Akama",
        email: "megaka@outlook.com",
        profilePicture: "https://www.w3schools.com/howto/img_avatar.png",
        location: "Vancouver, BC",
        description: "Gimme somme wine!",
      },
    },
  ];

  useEffect(() => {
    const getRequiredLists = async () => {
      const response = await sendRequest(
        `/api/lists/search?query=${state.searchVal}`,
        "GET"
      );
      setGetResult(response);
      console.log(getResult);
    };
    getRequiredLists();
  }, [state.searchVal]);

  return (
    <AppTemplate>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#F9F6F0",
          paddingTop: "10rem",
          paddingBottom: "5rem",
          boxSizing: "border-box",
        }}
      >
        <Typography variant="h3" pb={5}>
          Search result
        </Typography>
        {getResult.length > 0 ? (
          <Grid
            container
            rowSpacing={6}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {getResult.map((list: any) => {
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
                      <Grid container pt={2} sx={{ alignItems: "center" }}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                          <Avatar
                            src={list.user.profilePicture}
                            alt="profile icon"
                          />
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
        ) : (
          <Typography
            variant="h4"
            sx={{ color: "error.main", height: "100vh" }}
          >
            No list available...
            <FaSadTear />
          </Typography>
        )}
      </Container>
    </AppTemplate>
  );
};