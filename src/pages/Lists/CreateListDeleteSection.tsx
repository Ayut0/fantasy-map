import React, { useState } from "react";
import ActionButton from "../../components/ActionButton";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { useHttpRequest } from "../../Utils/httpRequest-hook";
import { useNavigate } from "react-router-dom";

interface Props {
  listId: string;
}

const CreateListDeleteSection: React.FC<Props> = ({ listId }) => {
  const [showModal, setShowModal] = useState(false);

  const { sendRequest } = useHttpRequest();
  const navigate = useNavigate();

  const handleDelete = async () => {
    await sendRequest(`/api/lists/${listId}`, "DELETE");
    navigate("/");
  };

  return (
    <>
      <ActionButton
        variant="outlined"
        sx={{
          my: 2,
          mr: 1,
          p: 2,
          fontSize: 20,
          backgroundColor: "#FF7A7A",
          color: "#EEEEEE",
          "&:hover": {
            color: "#FF7A7A",
          },
        }}
        onClick={() => setShowModal(true)}
      >
        Delete this list
      </ActionButton>
      {showModal && (
        <ConfirmationModal
          open={true}
          handleClose={() => setShowModal(false)}
          msg={
            "You are about to delete this list. Once you delete the list, you are not able to restore... If you are good, click the button below."
          }
          btnMsg={"Delete this list"}
          clickEvent={handleDelete}
        />
      )}
    </>
  );
};

export default CreateListDeleteSection;
