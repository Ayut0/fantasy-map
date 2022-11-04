import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const Hero: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('images/lake_ppl.jpg')",
          backgroundSize: "cover",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" sx={{fontWeight: "bold"}}>Create your own map</Typography>
      </Box>
    </>
  );
};
