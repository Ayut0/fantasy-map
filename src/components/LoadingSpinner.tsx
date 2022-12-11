import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop, Box } from "@mui/material";
import { motion } from "framer-motion"

interface LoadingProps {
    loading: boolean
}

const LoadingSpinner:React.FC<LoadingProps> = ({ loading }) => {
  return (
    <Backdrop open={loading} sx={{ color: "#fff" }}>
      <Box component="div" sx={{ display: "flex", flexDirection: "column", columnGap: "64px" }}>
      <motion.div
        initial={{ scale: .5 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: .5, repeat: Infinity }}
      >
      <Box component="img" alt="logo" src="/images/loading-spinner-logo.png" sx={{ height: '90px', width: '90px' }} />
      </motion.div>
      <CircularProgress size={80} thickness={4} />
      </Box>
    </Backdrop>
  );
};

export default LoadingSpinner;
