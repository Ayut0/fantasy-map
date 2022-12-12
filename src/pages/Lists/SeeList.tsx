import * as React from "react";
import { Box, Card, Container, Grid, Typography } from "@mui/material";
import AppTemplate from "../../templates/AppTemplate";
import ActionButton from "../../components/ActionButton";
import { Link, useNavigate } from "react-router-dom";
import { ListCard as ListType } from "../../../typings";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import LoadingSpinner from "../../components/LoadingSpinner";

export const SeeList: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useAppContext();
  const { sendRequest, isLoading } = useHttpRequest();
  const [loadedList, setLoadedList] = React.useState<ListType[]>();
  const [loadedUser, setLoadedUser] = React.useState();
  const handleClickList = () => console.log("To edit list");

  useEffect(() => {
    const getUser = async () => {
      if (state.loggedUser?.id) {
        const fetchUser = await sendRequest("/api/users/profile", "GET");
        setLoadedUser(fetchUser);
        setLoadedList(fetchUser.lists);
      } else {
        navigate("/login");
      }
    };

    getUser();
  }, []);

  return (
    <AppTemplate>
      <>
        {isLoading && <LoadingSpinner loading={isLoading} />}
      </>
      <Container
        maxWidth={false}
        sx={{
          backgroundColor: "#F9F6F0",
          paddingTop: "10rem",
        }}
      >
        <Container maxWidth="md" sx={{ pt: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs={12} lg={6}>
              <Typography variant="h3">Your lists</Typography>
            </Grid>
            <Grid item xs={12} lg={6} sx={{ display: 'flex', justifyContent: 'right' }}>
              <ActionButton
                variant="outlined"
                onClick={() => navigate("/list/create")}
              >
                Add a new list
              </ActionButton>
            </Grid>
          </Grid>
        </Container>
        <Container maxWidth="md" sx={{ pt: 4 }} onClick={handleClickList}>
          {loadedList?.length === 0 && (
            <div>
              <span>No list added</span>
            </div>
          )}
          {loadedList?.map((list: ListType) => {
            return (
              <Card
                key={list.id}
                sx={{
                  padding: 3,
                  mb: 4,
                  "&:hover": { cursor: "pointer", backgroundColor: "#FAFAFA" },
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Link
                    to={`/lists/${list.id}`}
                  >
                    <Typography variant="h4">{list.name}</Typography>
                  </Link>
                  <Box>
                    <ActionButton
                      variant="text"
                      onClick={() => navigate(`/list/${list.id}`)}
                    >
                      Edit
                    </ActionButton>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  sx={{ fontSize: "1.1rem", textAlign: "left", pt: "20px" }}
                >
                  {list.description}
                </Typography>
              </Card>
            );
          })}
        </Container>
      </Container>
    </AppTemplate>
  );
};
