import React from "react";
import ActionButton from "../../components/ActionButton";
import { Link } from "react-router-dom";

type idProps = {
  listId?: number
}

export const Buttons: React.FC<idProps> = ({listId}) => {
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
      <Link style={{ textDecoration: "none", color: "#FFFFFF" }} to={`/lists/${listId}`}>
        
        View List
      </Link>
    </ActionButton>
  );
};
