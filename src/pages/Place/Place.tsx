import React from "react";
import { SeePlace } from "./SeePlace";
import { CreatePlace } from "./CreatePlace";
import { ConfirmationModal } from "../../components/ConfirmationModal";

export const Place: React.FC = () => {
  return(
    <>
    <CreatePlace/>
    <SeePlace/>
    </>
  );
}