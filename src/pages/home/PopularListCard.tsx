import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Buttons } from "./Buttons";

interface PopularLists {
  id: number;
  name: string;
  userId: number;
  description: string;
  picture: string;
  userName: string;
  userIcon: string;
}

const popularListsDummy: PopularLists[] = [
  //delete this variable once real data available
  {
    id: 1,
    name: "San diego",
    userId: 3,
    description: "Place you must visit in San diego",
    picture: "https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg",
    userName: "Yuto Y",
    userIcon: "https://",
  },
  {
    id: 2,
    name: "Wine place",
    userId: 1,
    description: "Fancy wine places only",
    picture:
      "https://winecountrytable.com/wp-content/uploads/2017/07/2017-6-14-Domaine-Carneros-Napa-Wineries-Wine-and-Cheese-Pairing-Blog-Size-0861.jpg",
    userName: "Megumi-san",
    userIcon: "https://",
  },
  {
    id: 3,
    name: "Brazilian restaurant",
    userId: 5,
    description: "Restaurant lists less than $30",
    picture: "https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg",
    userName: "Mausan",
    userIcon: "https://",
  },
  {
    id: 4,
    name: "Treats for dogs",
    userId: 10,
    description: "Zoey's favorite",
    picture: "https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg",
    userName: "Arthur",
    userIcon: "https://",
  },
  {
    id: 5,
    name: "Onakasuita",
    userId: 2,
    description: "Costco",
    picture: "https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg",
    userName: "Nicolas Meza",
    userIcon: "https://",
  },
  {
    id: 6,
    name: "Ramen",
    userId: 4,
    description: "Rich tonkotsu ramen in Vancouver",
    picture: "https://kitsfest.com/wp-content/uploads/2013/05/brempong-sm.jpg",
    userName: "Kento Honda",
    userIcon: "https://",
  },
];

export const PopularListCard: React.FC = () => {
  return (
    <Grid container rowSpacing={6} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      {popularListsDummy.map((list) => {
        return (
          <Grid key={list.id} item xs={4}>
            <Card sx={{
               width: "335px", 
               height: "461px",
               borderRadius: "4px" }}>
              <CardContent>
                <Typography variant="h4" component="div">
                  {list.name}
                </Typography>
                <CardMedia
                  component="img"
                  height="194"
                  image="https://images.unsplash.com/photo-1505245208761-ba872912fac0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
                  alt="List image"
                />
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {list.description}
                </Typography>
                <Buttons />
                <br />
                <img src="#" alt="profile icon" />
                <Typography sx={{display: "inline"}}>{list.userName}</Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};
