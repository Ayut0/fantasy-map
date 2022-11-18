import React, { useState } from "react";
import {
  Button,
  Box,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ImageUpload from "../../components/ImageUpload";

export const CreatePlace: React.FC = () => {
  const [isPlaceNameFilledOut, setIsPlaceNameFilledOut] = useState(false);
  const [isAddressFilledOut, setIsAddressFilledOut] = useState(false);

  const isPlaceNameValid = (placeName:string) => {
   if (placeName.length >= 1) {
      setIsPlaceNameFilledOut(!isPlaceNameFilledOut);
   } else {
      setIsPlaceNameFilledOut(isPlaceNameFilledOut);
   }
  }

  const isAddressValid = (addressName: string) => {
    if (addressName.length >= 1) {
      console.log(addressName);
      setIsAddressFilledOut(!isAddressFilledOut);
    } else {
      setIsAddressFilledOut(isAddressFilledOut);
    }
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log("place info has been sent to server");
  };

  return (
    <>
      <Container
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "150px",
        }}
        maxWidth="md"
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" sx={{ mb: "10px" }}>
          Create your own place!
        </Typography>
        <ImageUpload />
        <TextField
          label="Place name"
          required
          sx={{ my: "1rem", width: "70%" }}
          onChange={(event) => isPlaceNameValid(event.target.value)}
        />
        <Box sx={{ width: "70%" }}>
          <GooglePlacesAutocomplete
            apiKey={process.env.REACT_APP_KEY_GOOGLE_PLACES}
            selectProps={{
              placeholder: "Address *",
              styles: {
                input: (provided: any) => ({
                  ...provided,
                }),
                option: (provided: any) => ({
                  ...provided,
                  textAlign: "left",
                }),
                // onChange: (event:any)=>{isAddressValid(event.target.value)},
                onChange: (event: any) => {
                  console.log(event.target.value);
                },
              },
            }}
          />
        </Box>
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          sx={{ my: "1rem", width: "70%" }}
        />
        {/* If name & address value.lengh >= 1
        render nomal Button
        else render disabled button*/}
        {isPlaceNameFilledOut && isAddressFilledOut ? (
          <Box>both OK</Box>
        ) : (
          <Box>both are NOT ok</Box>
        )}
        <Button
          variant="contained"
          type="submit"
          disabled
          sx={{
            backgroundColor: "#2CA58D",
            color: "#FFFFFF",
            width: "200px",
            display: "block",
            py: "15px",
            margin: "30px auto",
          }}
        >
          Register
        </Button>
      </Container>
    </>
  );
};
