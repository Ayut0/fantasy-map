import React, { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import AppTemplate from "../../templates/AppTemplate";
import { FaSadTear } from "react-icons/fa";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import ActionButton from "../../components/ActionButton";
import { Link, useNavigate, useParams } from "react-router-dom";

export const Result: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const [getResult, setGetResult] = useState([]);
  const { sendRequest } = useHttpRequest();

  useEffect(() => {
      const getRequiredLists = async () => {
        const response = await sendRequest(
          `/api/lists/search?query=${state.searchVal}`,
          "GET"
        );
        setGetResult(response);
      };
       if (state.searchVal) {
         getRequiredLists();
       }
  }, [state.searchVal]);

  useEffect(() => {
    const getRequiredLists = async () => {
      const response = await sendRequest(
        `/api/lists/category/${state.selectedCategory}`,
        "GET"
      );
       if (state.selectedCategory) {
         setGetResult(response);
       }
    };
    getRequiredLists();
  }, [state.selectedCategory]);

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
        <Typography variant="h3" pb={5} sx={{textAlign: "center"}}>
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
                      <ActionButton
                        variant="contained"
                        type="submit"
                        sx={{
                          backgroundColor: "#2CA58D",
                        }}
                      >
                        <Link
                          to={`/lists/${list.id}`}
                          style={{ textDecoration: "none", color: "#EEEEEE" }}
                        >
                          View List
                        </Link>
                      </ActionButton>
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
              sx={{ color: "error.main", height: "100vh", textAlign: "center" }}
            >
              No list available...
              <FaSadTear />
            </Typography>
        )}
      </Container>
    </AppTemplate>
  );
};
