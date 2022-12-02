import { Box, Typography } from "@mui/material";
import React from "react";
import NearMeIcon from "@mui/icons-material/NearMe";

interface Props {
  name: string | undefined;
  location: string | undefined;
  description: string | undefined;
}

const ProfileInfo: React.FC<Props> = ({ name, location, description }) => {
  return (
    <Box sx={{ textAlign: { lg: "left" } }}>
      <Typography component="h3" variant="h4" mt={8} sx={{ color: "#232946" }}>
        {name}
      </Typography>
      <Box
        sx={{
          width: { sm: "70%" },
          textAlign: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: { sm: "center", lg: "flex-start" },
        }}
      >
        <NearMeIcon />
        <Typography component="span" variant="h6" sx={{ color: "#232946" }}>
          {location || "Set your location"}
        </Typography>
      </Box>
      <Typography component="span" variant="h6" sx={{ color: "#232946" }}>
        {description || "Write your description"}
      </Typography>
    </Box>
  );
};

export default ProfileInfo;
