import React, { useState } from "react";
import { Button, Box, Container, TextField, Typography } from "@mui/material";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ImageUpload from "../../components/ImageUpload";
import AppTemplate from "../../templates/AppTemplate";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ConfirmationModal } from "../../components/ConfirmationModal";

export const CreatePlace: React.FC = () => {
  const navigate = useNavigate();
  const { error, sendRequest, clearError } = useHttpRequest();
  const [open, setOpen] = useState<boolean>(false);

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState<string>();
  const [inputPlaceName, setInputPlaceName] = useState<string>("");
  const [inputAddress, setInputAddress] = useState<string>("");
  const [inputDescription, setInputDescription] = useState<string>("");

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit: React.FormEventHandler = async (e) => {
    e.preventDefault();


    try {
      const results = await geocodeByAddress(inputAddress);
      const latLng = await getLatLng(results[0]);
      const lat = latLng.lat;
      const lng = latLng.lng;

      //send image
      const fd = new FormData();
      {
        file && fd.append("filetoupload", file);
      }
      const res = await axios.post("/api/files/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const formData = {
        name: inputPlaceName,
        address: inputAddress,
        description: inputDescription,
        location: {
          lat: lat,
          lng: lng,
        },
        picture: res.data,
      };

      //send those info to a server
      const result = await sendRequest(`/api/places`, "POST", formData);
      {
        result.status === 201 ? (
          setOpen(true)
        ) : (
          <span>Oh... something went wrong</span>
        );
      }

      await timeout(3000);
      //lid is needed for redirect to the exact same list which the user is supposed to edit
      navigate("/list/create");
    } catch (err) {
      console.log(err);
      return err;
    }
  };

  return (
    <AppTemplate>
      <ConfirmationModal
        open={open}
        msg={"Place is successfully created"}
        btnMsg={""}
        isWarning={false}
        handleClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Container
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mt: "150px",
          height: "100vh",
        }}
        maxWidth="md"
        onSubmit={handleSubmit}
      >
        <Typography variant="h3" sx={{ mb: "10px" }}>
          Create your own place!
        </Typography>
        <ImageUpload
          file={file}
          setFile={setFile}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />
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
