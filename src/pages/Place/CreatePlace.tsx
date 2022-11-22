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
import AppTemplate from "../../templates/AppTemplate";

export const CreatePlace: React.FC = () => {
  const [uploadImg, setUploadImg] = useState("");
  const [inputPlaceName, setInputPlaceName] = useState("");
  const [inputAddress, setInputAddress] = useState("");
  const [inputDescription, setInputDescription] = useState("");

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    console.log("place info has been sent to server");
  };

  return (
    <AppTemplate>
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
          onChange={(event) => setInputPlaceName(event.target.value)}
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
              },
              onChange: (address: any) => {
                setInputAddress(address.label);
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
          onChange={(event) => setInputDescription(event.target.value)}
        />

        {inputPlaceName && inputAddress ? (
          <Button
            variant="contained"
            type="submit"
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
        ) : (
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
        )}
      </Container>
    </AppTemplate>
  );
};
