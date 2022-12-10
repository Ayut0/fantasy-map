import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Backdrop } from "@mui/material";
import { loadavg } from "os";

interface LoadingProps {
    loading: boolean
}

const LoadingSpinner:React.FC<LoadingProps> = ({ loading }) => {
  return (
    <Backdrop open={loading} sx={{ color: "#fff" }}>
      <CircularProgress />
    </Backdrop>
  );
};

export default LoadingSpinner;
