import React from "react";
import { Button, Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { BsImageFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export const CreatePlace: React.FC = () => {
  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log("place info has been sent to server");
  };
  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "500px",
          margin: "0 auto",
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ position: "relative", mb: "30px" }}>
          <BsImageFill size={200} color="#ADA7A7" />
          <Button
            variant="contained"
            component="label"
            sx={{
              mb: "2rem",
              py: "5px",
              borderRadius: "50%",
              position: "absolute",
              top: "150px",
              right: "140px",
              height: "50px",
              width: "40px",
              "&:hover": {
                transform: "scale(0.8)",
                transition: ".3s",
              },
            }}
          >
            <FaPlus size={25} />
            <input type="file" hidden />
          </Button>
        </Box>
        <TextField label="Place name" required sx={{ my: "1rem" }} />
        <GooglePlacesAutocomplete 
          apiKey={process.env.REACT_APP_KEY_GOOGLE_PLACES}
          selectProps={{
            placeholder: 'Address *',
            styles: {
              option: (provided: any) => ({
                ...provided,
                textAlign: "left",
              }),
            },
          }}
        />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          sx={{ my: "1rem" }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "#2CA58D",
            color: "#FFFFFF",
            width: "200px",
            display: "block",
            margin: "30px auto",
          }}
        >
          Register
        </Button>
      </Box>
    </>
  );
};
