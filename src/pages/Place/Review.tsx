import React, { useState } from "react";
import AppTemplate from "../../templates/AppTemplate";
import { Button, Box, Container, Rating, TextField, Typography } from "@mui/material";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useNavigate, useParams } from "react-router-dom";

export const Review: React.FC = () => {
  const { sendRequest } = useHttpRequest();
  const navigate = useNavigate();
  const params = useParams();
  const [stars, setStars] = useState<number | null>(0);
  const [feedback, setFeedback] = useState<string | null>("");

  const reviews = {
    content: feedback,
    stars: stars,
    placeId: params.pid
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (stars === 0) {
      alert("Plase rate this place!")
    } else {
      const sendReview = async () => {
        const response = await sendRequest("/api/reviews", "POST", reviews);
        navigate(`/place/${params.pid}`);
      };
      sendReview();
    }
  }

  return (
    <>
      <AppTemplate>
        <Container
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#F9F6F0",
            height: "100vh",
            textAlign: "center"
          }}
          maxWidth="md"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" sx={{ padding: 3 }}>
            Write your review
          </Typography>
          <Box sx={{ padding: 2 }}>
            <Typography pb={2}>How do you rate this place?*</Typography>
            <Rating
              name="simple-controlled"
              value={stars}
              onChange={(event, newValue) => {
                setStars(newValue);
              }}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <TextField
              multiline
              label="Give your feedback"
              rows={4}
              sx={{ my: "1rem", width: "100%", backgroundColor: "#FFFFFF" }}
              onChange={(event) => {
                setFeedback(event.target.value);
              }}
            />
          </Box>
          <Box sx={{ padding: 2 }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                padding: 1,
                backgroundColor: "#2CA58D",
                color: "#FFFFFF",
                width: "200px",
              }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </AppTemplate>
    </>
  );
}