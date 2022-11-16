import { CardActionArea, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import React from "react";

type List = {
  name: string;
  description: string;
}[];

const DUMMY_LISTS: List = [
  {
    name: "Best liquor shop in Vancouver",
    description: "My favorite liquor shops :)",
  },
  {
    name: "Best liquor shop in Vancouver",
    description: "My favorite liquor shops :)",
  },
  {
    name: "Best liquor shop in Vancouver",
    description: "My favorite liquor shops :)",
  },
];

const ListSection: React.FC = () => {
  return (
    <Box sx={{display: 'flex', flexDirection: 'column', rowGap: '2rem', alignItems: 'center', justifyContent: 'center'}}>
      {DUMMY_LISTS.map((List, index) => (
        <Card key={index} sx={{width: '65%'}}>
          <CardActionArea sx={{padding: '1.5rem'}}>
            <CardContent sx={{textAlign: 'initial'}}>
              <Typography variant="h5" component="div">
                {List.name}
              </Typography>
              <Typography>{List.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default ListSection;
