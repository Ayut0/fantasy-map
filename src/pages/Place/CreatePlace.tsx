import React, { useState } from "react";
import { Button, Box, Container, TextField, Typography } from "@mui/material";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ImageUpload from "../../components/ImageUpload";
import AppTemplate from "../../templates/AppTemplate";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useHttpRequest } from "../../Utils/httpRequest-hook";

export const CreatePlace: React.FC = () => {
  const { error, sendRequest, clearError } = useHttpRequest();

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [inputPlaceName, setInputPlaceName] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();

    try {
      const results = await geocodeByAddress(inputAddress);
      const latLng = await getLatLng(results[0]);
      const lat = latLng.lat;
      const lng = latLng.lng;
      
      // const fd = new FormData();
      // formData.append("name", inputPlaceName);
      // formData.append("address", inputAddress);
      // formData.append("description", inputDescription);
      // formData.append("latitude", lat.toString());
      // formData.append("longitude", lng.toString());
      // { file && fd.append('image', file) }
      // console.log(fd.get('image'))
      const formData = {
        name: inputPlaceName,
        address: inputAddress,
        description: inputDescription,
        location: {
          lat: lat,
          lng: lng,
        },
        picture: previewUrl
      };
      // formData.append("picture", uploadImg);
      console.log("place info has been sent to server");
      console.log(formData);

      //send image

      //send those info to a server
      await sendRequest(`/api/places`, "POST" ,formData);

    } catch (err) {
      console.log(err);
      return err;
    }
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
        <ImageUpload file={file} setFile={setFile} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} />
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
