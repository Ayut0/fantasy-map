import { Button } from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import React, { Fragment, useEffect, useRef, useState } from "react";

const ImageUpload: React.FC = () => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState(undefined);
  const [previewUrl, setPreviewUrl] = useState<string>();

  useEffect(() => {
    if (!file) {
      return;
    }
    //Read and covert file into readable image url
    const fileReader: FileReader | null = new FileReader();

    fileReader.onload = () => {
      const res = fileReader?.result;
      if (res && typeof res === "string") {
        setPreviewUrl(res);
      }
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    //idk what the type of this guy....
    let pickedImage: any;

    if (event.target.files && event.target.files.length === 1) {
      console.log(event.target.files);
      pickedImage = event.target.files[0];
      console.log(pickedImage);
      setFile(pickedImage);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };
  return (
    <Fragment>
      {previewUrl && (
        <img
          src={previewUrl}
          alt="preview"
          style={{ height: "35%", width: "40%" }}
        ></img>
      )}
      <input
        type="file"
        ref={filePickerRef}
        hidden
        accept=".jpg, .png, .jpeg"
        onChange={pickHandler}
      />
      <Button
        variant="contained"
        component="label"
        sx={{
          mt: 3,
          mb: 2,
          pt: 2,
          pb: 2,
          fontSize: {sm: "13px", lg: 20},
          backgroundColor: "#2CA58D",
          width: {sm: "70%", lg: "30%"},
        }}
        onClick={pickImageHandler}
      >
        Upload File
        <AddPhotoAlternateRoundedIcon sx={{ paddingBottom: "4px" }} />
      </Button>
    </Fragment>
  );
};

export default ImageUpload;
