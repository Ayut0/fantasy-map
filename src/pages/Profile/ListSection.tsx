import { CardActionArea, CardContent, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  lists: any[] | undefined;
}

const ListSection: React.FC<Props> = ({ lists = [] }) => {
  const navigate = useNavigate();

  const handleCardClick = (listId: number) => {
    navigate(`/list/${listId}`);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        rowGap: "2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!lists.length && (
        <Typography variant="body1">You dont have any List yet</Typography>
      )}
      {lists.slice(0, 3).map((list, index) => (
        <Card
          key={index}
          sx={{ width: "65%" }}
          onClick={() => handleCardClick(list.id)}
        >
          <CardActionArea sx={{ padding: {xs: "8px", lg: "1.5rem"} }}>
            <CardContent sx={{ textAlign: "initial" }}>
              <Typography variant="h5" component="h5" sx={{fontWeight: "bold"}}>
                {list.name}
              </Typography>
              <Typography>{list.description}</Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </Box>
  );
};

export default ListSection;
