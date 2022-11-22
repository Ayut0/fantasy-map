import React from "react";
import ActionButton from "../../components/ActionButton";
import { Link } from "react-router-dom";

export const Buttons: React.FC = () => {
  return (
    <ActionButton
      variant="contained"
      sx={{
        padding: ".5rem .8rem",
        width: "65%",
        fontSize: "1.1rem",
        backgroundColor: "#2CA58D",
        borderRadius: "50px"
      }}
    >
      <Link style={{ textDecoration: "none", color: "#FFFFFF" }} to="/lists">
        {/* Replace link to actual list later */}
        View List
      </Link>
    </ActionButton>
  );
};
