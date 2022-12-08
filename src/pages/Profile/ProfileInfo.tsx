import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import NearMeIcon from "@mui/icons-material/NearMe";
import { FiEdit } from "react-icons/fi";
import { useAppContext } from "../../context/AppContext";
import { useHttpRequest } from "../../Utils/httpRequest-hook";

const ProfileInfo: React.FC = () => {
  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const { state, dispatch } = useAppContext();

  const { sendRequest } = useHttpRequest();

  const updateFieldValue: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: "setProfileData",
      payload: {
        ...state.profileData,
        [name]: value,
      },
    });
  };

  const saveFieldValue = (field: string) => {
    sendRequest("/api/users/profile", "PUT", state.profileData);
    dispatch({
      type: "alert",
      payload: {
        type: "success",
        message: "Profile successfully updated",
      },
    });
    if (field === "name") setEditName(false);
    if (field === "location") setEditLocation(false);
    if (field === "description") setEditDescription(false);
  };

  return (
    <Box sx={{ textAlign: { lg: "left" }, display: {xs: "flex"}, flexDirection:{xs: "column"}, alignItems:{xs: "center"} }}>
      <Box>
        {!editName ? (
          <EditableField onEditClick={() => setEditName(!editName)}>
            <Typography component="h3" variant="h4" sx={{ color: "#232946" }}>
              {state.profileData?.name}
            </Typography>
          </EditableField>
        ) : (
          <TextField
            label="Name"
            name="name"
            autoFocus
            value={state.profileData?.name || ""}
            onChange={updateFieldValue}
            onBlur={(e) => saveFieldValue("name")}
            onKeyDown={(e) => e.key === "Enter" && saveFieldValue("name")}
          />
        )}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography component="span" variant="body1" sx={{ color: "#232946" }}>
          {state.profileData?.email}
        </Typography>
      </Box>

      <Box
        sx={{
          width: { sm: "70%" },
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: { sm: "center", lg: "flex-start" },
          mb: 1,
        }}
      >
        {!editLocation ? (
          <EditableField onEditClick={() => setEditLocation(!editLocation)}>
            <>
              <NearMeIcon fontSize="small" />
              <Typography
                component="span"
                variant="body1"
                sx={{ color: "#232946" }}
              >
                {state.profileData?.location || "Set your location"}
              </Typography>
            </>
          </EditableField>
        ) : (
          <TextField
            label="Location"
            name="location"
            autoFocus
            value={state.profileData?.location || ""}
            onChange={updateFieldValue}
            onBlur={() => saveFieldValue("location")}
            onKeyDown={(e) => e.key === "Enter" && saveFieldValue("location")}
          />
        )}
      </Box>

      <Box sx={{ mb: 1 }}>
        {!editDescription ? (
          <EditableField
            onEditClick={() => setEditDescription(!editDescription)}
          >
            <Typography
              component="span"
              variant="body1"
              sx={{ color: "#232946" }}
            >
              {state.profileData?.description || "Write your description"}
            </Typography>
          </EditableField>
        ) : (
          <TextField
            label="Description"
            name="description"
            autoFocus
            value={state.profileData?.description || ""}
            onChange={updateFieldValue}
            onBlur={() => saveFieldValue("description")}
            onKeyDown={(e) =>
              e.key === "Enter" && saveFieldValue("description")
            }
          />
        )}
      </Box>
    </Box>
  );
};

const EditableField: React.FC<{
  onEditClick: () => void;
  children: JSX.Element;
}> = ({ onEditClick, children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      {children}
      <Button onClick={onEditClick}>
        <FiEdit />
      </Button>
    </Box>
  );
};

export default ProfileInfo;
