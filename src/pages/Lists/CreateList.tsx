import axios from "axios";
import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
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
import ImageUpload from "../../components/ImageUpload";
import AppTemplate from "../../templates/AppTemplate";
import { useHttpRequest } from "../../Utils/httpRequest-hook";

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
  const lid = useParams<string>();

  const [userPlaces, setUserPlaces] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);

  // to be removed?
  const [isPlaceAdded, setIsPlaceAdded] = useState(false);
  const [addedPlace, setAddedPlace] = useState("");
  // to be removed?

  const [titleVal, setTitleVal] = useState("");
  const [descriptionVal, setDescriptionVal] = useState("");
  const [categoryVal, setCategoryVal] = useState(-1);
  const [placesVal, setPlacesVal] = useState<number[]>([]);
  const [file, setFile] = useState<File>();
  const [previewUrl, setPreviewUrl] = useState("");
  const [titleError, setTitleError] = useState<string | false>(false);
  const [descriptionError, setDescriptionError] = useState<string | false>(
    false
  );
  const [categoryError, setCategoryError] = useState<string | false>(false);

  const { error, sendRequest, clearError } = useHttpRequest();
  const [showConfirmationModal, setShowConfirmationModal] =
    useState<boolean>(false);
  const isExistedList: boolean = Object.values(lid).length ? true : false;

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    // setPlaceName(
    //   // On autofill we get a stringified value.
    //   typeof value === "string" ? value.split(",") : value
    // );
  };

  const showDeleteModalHandler = (): void => {
    setShowConfirmationModal(true);
  };

  const closeDeleteModalHandler = (): void => {
    setShowConfirmationModal(false);
  };

  const handleSubmit = async () => {
    const data = {
      name: titleVal,
      description: descriptionVal,
      categoryId: categoryVal,
      placeIds: placesVal,
    };

    console.log("list data", data);

    // validate
    setTitleError(!titleVal && "Title is mandatory");
    setDescriptionError(!descriptionVal && "Description is mandatory");
    setCategoryError(!categoryVal && "Category is mandatory");

    // stop execution if any error is found
    if (!!titleError || !!categoryError || !!descriptionError) {
      return;
    }

    let picture = "images/no-list-pic.jpeg";
    if (file) {
      const formData = new FormData();
      formData.append("filetoupload", file);
      const uploadResponse = await axios.post("/api/files/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      picture = uploadResponse.data;
    }

    const listsResponse = await sendRequest("/api/lists/", "POST", {
      ...data,
      picture,
    });

    alert(
      listsResponse
        ? "List successfully created!"
        : "Oh no! Something went wrong"
    );
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
    const getUserPlaces = async () => {
      const userPlaces = await sendRequest("/api/places", "GET");
      setUserPlaces(userPlaces);
      console.log(userPlaces);
    };

    const getCategories = async () => {
      const categories = await sendRequest("/api/categories", "GET");
      setCategories(categories);
    };

    getUserPlaces();
    getCategories();
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
          onSubmit={handleSubmit}
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
              value={titleVal}
              error={!!titleError}
            />
            {titleError && <FormHelperText>{titleError}</FormHelperText>}
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
              value={descriptionVal}
              error={!!descriptionError}
            />
            {descriptionError && (
              <FormHelperText>{descriptionError}</FormHelperText>
            )}
          </Box>
          <Box sx={{ width: "50%" }}>
            <FormControl fullWidth>
              <InputLabel htmlFor="categories-select">Category</InputLabel>
              <Select
                value={categoryVal}
                onChange={(e) => setCategoryVal(e.target.value as number)}
                fullWidth
                id="categories-select"
                error={!!categoryError}
              >
                <MenuItem disabled value={-1}>
                  <em>Select a category</em>
                </MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {categoryError && <FormHelperText>{categoryError}</FormHelperText>}
          </Box>
          <Box sx={{ width: "50%" }}>
            <ImageUpload
              file={file}
              setFile={setFile}
              previewUrl={previewUrl}
              setPreviewUrl={setPreviewUrl}
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
                {/* <Typography variant="h6">
                  {loadedPlaces.length} places in this list
                </Typography> */}
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
              <Box sx={{ width: "50%" }}>
                <FormControl fullWidth>
                  <InputLabel htmlFor="places-select">
                    Places in this list
                  </InputLabel>
                  <Select
                    multiple
                    value={placesVal}
                    onChange={(e) => setPlacesVal(e.target.value as number[])}
                    fullWidth
                    id="places-select"
                    placeholder="Select a place"
                  >
                    {userPlaces.map((place) => (
                      <MenuItem key={place.id} value={place.id}>
                        {place.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
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
