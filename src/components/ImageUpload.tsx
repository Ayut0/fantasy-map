import { Box, Button, Typography } from "@mui/material";
import AddPhotoAlternateRoundedIcon from "@mui/icons-material/AddPhotoAlternateRounded";
import React, { Fragment, useEffect, useRef, useState } from "react";

const ImageUpload = ({
  file,
  setFile,
  previewUrl,
  setPreviewUrl,
  instructions,
  width,
}: any) => {
  const filePickerRef = useRef<HTMLInputElement>(null);
  // const [file, setFile] = useState(undefined);
  // const [previewUrl, setPreviewUrl] = useState<string>();

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
      // console.log(event.target.files);
      pickedImage = event.target.files[0];
      // console.log(pickedImage);
      setFile(pickedImage);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current?.click();
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {previewUrl && (
        <img src={previewUrl} alt="preview" style={{ width: "200px" }}></img>
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
          mb: 1,
          pt: 2,
          pb: 2,
          fontSize: { sm: "13px", lg: 20 },
          backgroundColor: "#2CA58D",
          width: width ? width : { sm: "70%", lg: "100%" },
        }}
        onClick={pickImageHandler}
      >
        Upload File
        <AddPhotoAlternateRoundedIcon sx={{ pl: 1, pb: "4px" }} />
      </Button>
      {instructions && (
        <Typography variant="body2" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
          {instructions}
        </Typography>
      )}
    </Box>
  );
};

export default ImageUpload;
