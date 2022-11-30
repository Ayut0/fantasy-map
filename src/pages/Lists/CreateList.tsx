import {
  Box,
  Button,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import AppTemplate from "../../templates/AppTemplate";
import { useHttpRequest } from "../../Utils/httpRequest-hook";

// const places: string[] = [
//   "Los Angels",
//   "San Diego",
//   "San Francisco",
//   "Santa Barbara",
//   "Sacramento",
//   "Santa Clara",
//   "Malibu",
//   "Long beach",
// ];

const loadedPlaces: string[] = [
  "Paris",
  "Tokyo",
  "Rio de janeiro",
  "London",
  "Beijing",
  "Athene",
  "Sydney",
];

// const everyPlaces: string[] = [...places, ...loadedPlaces];

function getStyles(place: string, placeName: string[], theme: Theme) {
  return {
    fontWeight:
      placeName.indexOf(place) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const CreateList: React.FC = () => {
  const theme = useTheme();
  const [placeName, setPlaceName] = useState<any[]>(loadedPlaces);

  const lid = useParams<string>();
  const isExistedList: boolean = Object.values(lid).length ? true : false;
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const [isPlaceAdded, setIsPlaceAdded] = useState(false);
  const [addedPlace, setAddedPlace] = useState("");
  const [titleVal, setTitleVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const { error, sendRequest, clearError } = useHttpRequest();

  const handleChange = (event: SelectChangeEvent<typeof placeName>) => {
    const {
      target: { value },
    } = event;
    setPlaceName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const showDeleteModalHandler = (): void => {
    setShowConfirmationModal(true);
  };

  const closeDeleteModalHandler = (): void => {
    setShowConfirmationModal(false);
  };

  const handleSubmit = (): void => {
    // setTitleVal(title.value);
    alert("test");
  };

  const handleAddPlace = (event: any) => {
    setIsPlaceAdded(!isPlaceAdded);
  };

  const handleChangeNewPlace = (event: any) => {
    setAddedPlace(event.target.value);
    console.log(addedPlace);
  };

  const handleSavePlace = (event: any) => {
    setIsPlaceAdded(!isPlaceAdded);
    // places.push(addedPlace);
  };

  const handleChangetitle = (event: any) => {
    setTitleVal(event.target.value);
  };

  const handleChangeDescription = (event: any) => {
    setDescriptionVal(event.target.value);
    console.log(descriptionVal);
  };

  useEffect(() => {
    const getPlaces = async () => {
      const response = await sendRequest("/api/places", "GET");
      setPlaceName(response);
      console.log(response);
    };
    getPlaces();
  }, []);

  return (
    <AppTemplate>
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#F9F6F0",
          rowGap: "1.2rem",
          paddingTop: "10rem",
        }}
      >
        <Typography component="h3" variant="h3" sx={{ color: "#232946" }}>
          {isExistedList ? "Edit list" : "Create a new list"}
        </Typography>
        <FormControl
          fullWidth
          sx={{ rowGap: "1.2rem", textAlign: "initial", alignItems: "center" }}
          // onSubmit={handleSubmit}
        >
          <Box sx={{ width: "50%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
              onChange={handleChangetitle}
            />
          </Box>
          <Box sx={{ width: "50%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              autoComplete="description"
              multiline
              onChange={handleChangeDescription}
            />
          </Box>
          {isExistedList ? (
            <Fragment>
              <Box
                sx={{
                  width: "70%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <Typography variant="h6">
                  {loadedPlaces.length} places in this list
                </Typography>
                <ActionButton
                  variant="outlined"
                  sx={{
                    padding: ".3rem .1rem",
                    width: "20%",
                    fontSize: ".8rem",
                  }}
                >
                  <Link
                    to={""}
                    style={{ textDecoration: "none", color: "#232946" }}
                  >
                    Add a new place
                  </Link>
                </ActionButton>
              </Box>
              <Select
                multiple
                displayEmpty
                value=""
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Your places</em>;
                  }

                  return selected.join(", ");
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: "50%", marginTop: "1rem" }}
              >
                <MenuItem disabled value="">
                  <em>Your places</em>
                </MenuItem>
                {placeName.map((place: any) => (
                  <MenuItem key={place.id} value={place.id}>
                    {place.name}
                  </MenuItem>
                ))}
              </Select>
              <ActionButton
                variant="outlined"
                sx={{
                  mt: 3,
                  mb: 2,
                  pt: 2,
                  pb: 2,
                  fontSize: 20,
                  backgroundColor: "#FF7A7A",
                  width: "15%",
                  color: "#EEEEEE",
                  "&:hover": {
                    color: "#FF7A7A",
                  },
                }}
                onClick={showDeleteModalHandler}
              >
                Delete this list
              </ActionButton>
              {showConfirmationModal && (
                <ConfirmationModal
                  open={true}
                  handleClose={closeDeleteModalHandler}
                  msg={
                    "You are about to delete this list. Once you delete the list, you are not able to restore... If you are good, click the button below."
                  }
                  btnMsg={"Delete this list"}
                />
              )}
            </Fragment>
          ) : (
            <Fragment>
              <Select
                multiple
                displayEmpty
                value={placeName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Your places</em>;
                  }

                  return selected.join(", ");
                }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                sx={{ width: "50%", marginTop: "1rem" }}
              >
                <MenuItem disabled value="">
                  <em>Your places</em>
                </MenuItem>
                {placeName.map((place: any) => (
                  <MenuItem
                    key={place.id}
                    value={place.id}
                    style={getStyles(place, placeName, theme)}
                  >
                    {place.name}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="body1" sx={{ color: "#232946" }}>
                or
              </Typography>
              <Box
                sx={{
                  backgroundColor: "#FDFDFB",
                  width: "40%",
                  textAlign: "center",
                  height: "200px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  rowGap: "24px",
                }}
              >
                <>
                  <Typography
                    component="h4"
                    variant="h5"
                    sx={{ color: "#232946", width: "40%" }}
                  >
                    Click the button below to add a new place
                  </Typography>
                  <ActionButton
                    variant="outlined"
                    type="submit"
                    onClick={handleAddPlace}
                    sx={{
                      padding: ".7rem 1rem",
                      width: "60%",
                      fontSize: "1.1rem",
                    }}
                  >
                    <Link
                      to={"/place/create"}
                      style={{ textDecoration: "none", color: "#232946" }}
                    >
                      Add a new place
                    </Link>
                  </ActionButton>
                </>
              </Box>
            </Fragment>
          )}
          <ActionButton
            variant="outlined"
            type="submit"
            onClick={handleSubmit}
            sx={{
              mt: 3,
              mb: 2,
              pt: 2,
              pb: 2,
              fontSize: 20,
              backgroundColor: "#2CA58D",
              width: "10%",
              color: "#EEEEEE",
              "&:hover": {
                color: "#2CA58D",
              },
            }}
          >
            {isExistedList ? "Update List" : "Create"}
          </ActionButton>
        </FormControl>
      </Stack>
    </AppTemplate>
  );
};

export default CreateList;
