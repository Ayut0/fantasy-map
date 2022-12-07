import React, { useEffect, useRef, useState } from "react";
import ImageUpload from "../../components/ImageUpload";
import { useAppContext } from "../../context/AppContext";
import axios from "axios";
import { useHttpRequest } from "../../Utils/httpRequest-hook";

const ProfilePicture: React.FC = () => {
  const [previewUrl, setPreviewUrl] = useState("");
  const { state, dispatch } = useAppContext();
  const firstExecution = useRef(true);

  const { sendRequest } = useHttpRequest();

  useEffect(() => {
    if (firstExecution.current && state.profileData) {
      setPreviewUrl(
        state.profileData.profilePicture || "images/no-profile-pic.jpeg"
      );
      firstExecution.current = false;
    }
  }, [state.profileData]);

  const uploadImage = async (file: File) => {
    console.log("something should happen!");
    const formData = new FormData();
    formData.append("filetoupload", file);
    const uploadResponse = await axios.post("/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const newProfileData = {
      name: state.profileData.name,
      profilePicture: uploadResponse.data,
      location: state.profileData.location,
      description: state.profileData.description,
    };

    await sendRequest("/api/users/profile", "PUT", newProfileData);

    dispatch({
      type: "setProfileData",
      payload: {
        ...state.profileData,
        ...newProfileData,
        file,
      },
    });

    alert("Profile updated!");
  };

  const setFile = (file: File) => {
    console.log("I am right here!");
    uploadImage(file);
  };

  return (
    <ImageUpload
      file={state.profileData?.file}
      setFile={setFile}
      previewUrl={previewUrl}
      setPreviewUrl={setPreviewUrl}
      width="unset"
    />
  );
};

export default ProfilePicture;
