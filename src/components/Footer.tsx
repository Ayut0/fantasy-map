import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Footer: React.FC = () => {
  return (
    <Box
    component="footer"
      sx={{
        backgroundColor: "#232946",
        height: "65px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mt: "100px"
      }}
    >
      <Typography sx={{ color: "#ffffff" }}>Copyrights...</Typography>
    </Box>
  );
}