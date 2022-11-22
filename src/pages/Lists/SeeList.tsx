import * as React from "react";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import AppTemplate from "../../templates/AppTemplate";

export const SeeList: React.FC = () => {
  const handleClickList = () => console.log("To edit list");
  const lists = [
    {
      name: "Best basketball courts",
      description: "Find here the best basketball courts in Vancouver",
      picture:
        "https://www.ctvnews.ca/content/dam/ctvnews/en/images/2020/12/3/basketball-court-1-5216003-1629825004731.jpg",
      userId: 2,
      categoryId: 1,
      deleted: false,
    },
    {
      name: "Best places to buy wine",
      description: "Come and see!",
      picture: "https://ychef.files.bbci.co.uk/976x549/p0cwcj6m.jpg",
      userId: 1,
      categoryId: 7,
      deleted: false,
    },
    {
      name: "Best places to buy wine",
      description: "Come and see!",
      picture: "https://ychef.files.bbci.co.uk/976x549/p0cwcj6m.jpg",
      userId: 1,
      categoryId: 7,
      deleted: false,
    },
    {
      name: "Best places to buy wine",
      description: "Come and see!",
      picture: "https://ychef.files.bbci.co.uk/976x549/p0cwcj6m.jpg",
      userId: 1,
      categoryId: 7,
      deleted: false,
    },
    {
      name: "Best places to buy wine",
      description: "Come and see!",
      picture: "https://ychef.files.bbci.co.uk/976x549/p0cwcj6m.jpg",
      userId: 1,
      categoryId: 7,
      deleted: false,
    },
  ];

  return (
    <AppTemplate>
      <Container maxWidth="lg" sx={{backgroundColor: "#F9F6F0", paddingTop: '10rem'}}>
        <Grid container pt="150px" alignItems="center">
          <Grid item xs={4}>
            <Typography variant="h3">Your lists</Typography>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            <Button>Add a new list</Button>
          </Grid>
        </Grid>
        <Container maxWidth="md" sx={{ pt: 3 }} onClick={handleClickList}>
          {lists.map((list: any) => {
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
                  <Typography variant="h4">{list.name}</Typography>
                  <Typography variant="body2" >
                    5 places
                  </Typography>
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
