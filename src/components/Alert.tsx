import React, { useEffect, useRef } from "react";
import { Alert as MuiAlert, Box } from "@mui/material";
import { useAppContext } from "../context/AppContext";

const Alert: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const timeoutId = useRef<number>();

  useEffect(() => {
    if (!state.alert) {
      return;
    }
    timeoutId.current = window.setTimeout(() => {
      window.clearTimeout(timeoutId.current);
      dispatch({
        type: "alert",
        payload: null,
      });
    }, state.alert.duration || 7000);
  }, [state.alert]);

  if (!state.alert) {
    return null;
  }

  return (
    <Box
      sx={{
        position: "absolute",
        top: 0,
        right: 0,
        pr: 2,
        pt: 2,
        zIndex: 1200,
        minWidth: "400px",
      }}
    >
      <MuiAlert
        severity={state.alert.type}
        onClose={() => dispatch({ type: "alert", payload: null })}
      >
        {state.alert.message}
      </MuiAlert>
    </Box>
  );
};

export default Alert;
