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
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner";
import { ListCard as ResultListCardType } from "../../../typings";

export const Result: React.FC = () => {
  const { state } = useAppContext();
  const [getResult, setGetResult] = useState<ResultListCardType[]>();
  const { sendRequest, isLoading } = useHttpRequest();

  useEffect(() => {
    const getRequiredLists = async () => {
      try {
        const response = await sendRequest(
          `/api/lists/search?query=${state.searchVal}`,
          "GET"
        );
        setGetResult(response);
      } catch (err) {
        console.log(err);
      }
    };
    if (state.searchVal) {
      getRequiredLists();
    }
  }, [state.searchVal]);

  useEffect(() => {
    const getRequiredLists = async () => {
      try {
        const response = await sendRequest(
          `/api/lists/category/${state.selectedCategory}`,
          "GET"
        );
        if (state.selectedCategory) {
          setGetResult(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getRequiredLists();
  }, [state.selectedCategory]);

  return (
    <AppTemplate>
      <>{isLoading && <LoadingSpinner loading={isLoading} />}</>
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: "#F9F6F0",
          height: "100vh",
          paddingTop: "10rem",
          paddingBottom: "5rem",
          boxSizing: "border-box",
          marginBottom: "64px",
        }}
      >
        <Box component="div" sx={{ textAlign: "center" }}>
          <Typography variant="h3" pb={5} sx={{ textAlign: "center" }}>
            Search result
          </Typography>
          {getResult !== undefined && (
            <Typography variant="h6" component="span">
              You got {getResult?.length}{" "}
              {getResult?.length > 1 ? "lists" : "list"}.
            </Typography>
          )}
        </Box>

        {getResult !== undefined && getResult.length > 0 ? (
          <Grid
            container
            pt={4}
            rowSpacing={6}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ xs: "center" }}
            alignItems={{ xs: "center", md: "flex-start"}}
          >
            {getResult.map((list: ResultListCardType) => {
              return (
                <Grid key={list.id} item xs={12} md={4}>
                  <Card
                    sx={{
                      width: { xs: "296px", md: "336px" },
                      height: { lg: "528px" },
                      borderRadius: "4px",
                      textAlign: "center"
                    }}
                  >
                    <CardContent>
                      <Box sx={{ height: { md: "56px", lg: "88px" }, pb: 1 }}>
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
                          style={{ textDecoration: "none", color: "#EEEEEE" }}
                        >
                          View List
                        </Link>
                      </ActionButton>
                      <Grid container pt={2} sx={{ alignItems: "center" }}>
                        <Grid item xs={1}></Grid>
                        <Grid item xs={5}>
                          <Avatar
                            src={list.user?.profilePicture}
                            alt="profile icon"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography sx={{ display: "inline" }}>
                            {list.user?.name}
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
            No list found...
            <FaSadTear />
          </Typography>
        )}
      </Container>
    </AppTemplate>
  );
};
