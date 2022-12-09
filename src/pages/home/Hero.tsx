import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          backgroundImage: "url('images/hero-image-min.jpeg')",
          backgroundSize: "cover",
          height: {xs: "80vh" , md: "100vh"},
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          filter: "grayscale(.2)"
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.1 }}
          animate={{ x: [5, 150, 5], y: -128 ,opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.5, 0.71, 1, 1.5] }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "40px", md: "96px" },
              color: "#f8f9fd",
              marginTop: { xs: "240px", md: "0" }
            }}
          >
            Create your own map
          </Typography>
        </motion.div>
      </Box>
    </>
  );
};
