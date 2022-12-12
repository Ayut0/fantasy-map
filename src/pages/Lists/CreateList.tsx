import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Container,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ActionButton from "../../components/ActionButton";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import ImageUpload from "../../components/ImageUpload";
import AppTemplate from "../../templates/AppTemplate";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useAppContext } from "../../context/AppContext";
import CreateListDeleteSection from "./CreateListDeleteSection";
import { Place as UserPlaceType } from "../../../typings";
import { Category as CategoryType } from "../../../typings";
import { List as ListType } from "../../../typings";
import LoadingSpinner from "../../components/LoadingSpinner";
import { PlaceInList } from "../../../typings";

let modalMsg: string;
const CreateList: React.FC = () => {
  const params = useParams<string>();

  const [userPlaces, setUserPlaces] = useState<UserPlaceType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const [isPlaceAdded, setIsPlaceAdded] = useState(false);
  // const [addedPlace, setAddedPlace] = useState("");
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
  const [list, setList] = useState<ListType>();
  const [open, setOpen] = useState<boolean>(false);

  const { sendRequest, isLoading } = useHttpRequest();

  const { state, dispatch } = useAppContext();
  const navigate = useNavigate();

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleSubmit = async () => {
    const data = {
      name: titleVal,
      description: descriptionVal,
      categoryId: categoryVal,
      placeIds: placesVal,
    };

    // validate
    const titleErrMsg = !titleVal && "Title is mandatory";
    const descErrMsg = !descriptionVal && "Description is mandatory";
    const catErrMsg = !categoryVal && "Category is mandatory";
    setTitleError(titleErrMsg);
    setDescriptionError(descErrMsg);
    setCategoryError(catErrMsg);

    // stop execution if any error is found
    if (titleErrMsg || descErrMsg || catErrMsg) {
      return;
    }

    let picture = list ? previewUrl : "images/no-list-pic.jpeg";
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

    const url = list ? `/api/lists/${list.id}` : "/api/lists";
    const method = list ? "PUT" : "POST";

    const listsResponse = await sendRequest(url, method, {
      ...data,
      picture,
    });

    if (listsResponse.status === 200) {
      setOpen(true);
      modalMsg = "List is successfully created";
      dispatch({
        type: "alert",
        payload: {
          type: "success",
          message: `List successfully created`,
        },
      });
      dispatch({
        type: "list",
        payload: null,
      });
    } else if (listsResponse.status === 204) {
      setOpen(true);
      modalMsg = "List is successfully updated";
      dispatch({
        type: "alert",
        payload: {
          type: "success",
          message: `List successfully updated`,
        },
      });
      dispatch({
        type: "list",
        payload: null,
      });
    } else {
      dispatch({
        type: "alert",
        payload: {
          type: "error",
          message: "Oh... something went wrong",
        },
      });
    }

    await timeout(3000);
    setOpen(false);
    navigate(`/lists/${list?.id}`);
  };

  const handleAddPlace = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsPlaceAdded(!isPlaceAdded);
    dispatch({
      type: "list",
      payload: {
        title: titleVal,
        description: descriptionVal,
        category: categoryVal,
        places: placesVal,
        file,
        previewUrl,
      },
    });
    console.log(state);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleVal(event.target.value);
  };

  const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescriptionVal(event.target.value);
  };

  useEffect(() => {
    const getUserPlaces = async () => {
      const userPlaces = await sendRequest("/api/places", "GET");
      setUserPlaces(userPlaces);
    };

    const getCategories = async () => {
      const categories = await sendRequest("/api/categories", "GET");
      setCategories(categories);
    };

    getUserPlaces();
    getCategories();
  }, []);

  useEffect(() => {
    const fetchList = async () => {
      const dbList = await sendRequest(`/api/lists/${params.lid}`, "GET");
      if (!dbList) {
        navigate("/");
        return;
      }
      setList(dbList);
      setTitleVal(dbList.name);
      setDescriptionVal(dbList.description);
      setPreviewUrl(dbList.picture);
      setCategoryVal(dbList.categoryId);
      setPlacesVal(dbList.places.map((p: PlaceInList) => p.id));
    };
    const keepInputVal = async () => {
      const dbList = await sendRequest(`/api/lists/${params.lid}`, "GET");
      setList(dbList);
      if (state.list){
      setTitleVal(state.list.title);
      setDescriptionVal(state.list.description);
      setPreviewUrl(state.list.previewUrl);
      setFile(state.list.file);
      setCategoryVal(state.list.category);
      setPlacesVal(state.list.places.map((p: number) => p));
      dispatch({
        type: "list",
        payload: null,
      });
      }
    };
    if (state.list) {
      keepInputVal();
      return;
    } else if (params.lid) {
      fetchList();
    }
  }, [params.lid]);

  useEffect(() => {
    if (
      params.lid &&
      state.loggedUser &&
      list &&
      state.loggedUser.id !== list.userId
    ) {
      navigate("/");
    }
  }, [list, state.loggedUser]);

  return (
    <AppTemplate>
      <>
        {isLoading && <LoadingSpinner loading={isLoading} />}
      </>
      <ConfirmationModal
        open={open}
        msg={modalMsg}
        btnMsg={""}
        isWarning={false}
        handleClose={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Stack
        sx={{
          width: "100%",
          backgroundColor: "#F9F6F0",
          rowGap: "1.2rem",
          paddingTop: "10rem",
        }}
      >
        <Container maxWidth="md">
          <Typography
            component="h3"
            variant="h3"
            textAlign="center"
            sx={{ color: "#232946", mb: 2 }}
          >
            {list ? "Edit list" : "Create a new list"}
          </Typography>
          <ImageUpload
            file={file}
            setFile={setFile}
            previewUrl={previewUrl}
            setPreviewUrl={setPreviewUrl}
            instructions="Select a image that represents what is your list about"
          />
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
              id="title"
              name="title"
              label="Title"
              autoComplete="title"
              autoFocus
              onChange={handleChangeTitle}
              value={titleVal}
              error={!!titleError}
            />
            {titleError && <FormHelperText>{titleError}</FormHelperText>}
          </FormControl>
          <FormControl fullWidth>
            <TextField
              margin="normal"
              required
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
          </FormControl>
          <FormControl fullWidth>
            <Select
              required
              value={categoryVal}
              onChange={(e) => setCategoryVal(e.target.value as number)}
              id="categories-select"
              error={!!categoryError}
              sx={{ mb: 1, mt: 2 }}
            >
              <MenuItem disabled value={-1}>
                Select a category
              </MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
            {categoryError && <FormHelperText>{categoryError}</FormHelperText>}
          </FormControl>
          <Card sx={{ mt: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Adding places to your list
              </Typography>
              <Typography variant="body2">
                You can select one of the places you created before:
              </Typography>
              <FormControl fullWidth>
                <Select
                  multiple
                  value={placesVal}
                  onChange={(e) => {
                    setPlacesVal(e.target.value as number[]);
                    console.log(e.target.value);
                  }}
                  id="places-select"
                  sx={{ mb: 1, mt: 2 }}
                >
                  {userPlaces?.map((place) => (
                    <MenuItem key={place.id} value={place.id}>
                      {place.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body2" sx={{ color: "#232946" }}>
                or you can click on the button below to add a new place
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <ActionButton
                  variant="contained"
                  type="submit"
                  onClick={handleAddPlace}
                  sx={{
                    backgroundColor: "#2CA58D",
                  }}
                >
                  <Link
                    to={"/place/create"}
                    style={{ textDecoration: "none", color: "#EEEEEE" }}
                  >
                    Add a new place
                  </Link>
                </ActionButton>
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ display: "flex", justifyContent: "right" }}>
            {params.lid && <CreateListDeleteSection listId={params.lid} />}
            <ActionButton
              variant="outlined"
              type="submit"
              onClick={handleSubmit}
              sx={{
                my: 2,
                p: 2,
                fontSize: 18,
                backgroundColor: "#2CA58D",
                color: "#EEEEEE",
                "&:hover": {
                  color: "#2CA58D",
                },
              }}
            >
              {list ? "Update List" : "Create list"}
            </ActionButton>
          </Box>
        </Container>
      </Stack>
    </AppTemplate>
  );
};

export default CreateList;
