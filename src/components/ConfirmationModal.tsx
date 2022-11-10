import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { ImCross } from "react-icons/im";

interface Props {
  open: boolean;
  handleClose: ()=>void;
  msg: string;
  btnMsg: string;
}

export const ConfirmationModal: React.FC<Props> = ({open, handleClose, msg, btnMsg}) => {
  const handleDelete = () => console.log("place deleted!");

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            backgroundColor: "#FFEFEF",
            width: "400px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "2px solid #FF7A7A",
            borderRadius: "10px",
            padding: "30px",
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "right",
              padding: "8px",
              "&:hover": {
                cursor: "pointer",
              },
            }}
          >
            <Button onClick={handleClose}>
              <ImCross />
            </Button>
          </Box>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            sx={{ color: "#FE2929" }}
          >
            Are you sure?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {msg}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={handleDelete}
              sx={{
                backgroundColor: "#FD3B59",
                color: "#FFFFFF",
                mt: "25px",
                "&:hover": {
                  backgroundColor: "#232946",
                },
              }}
            >
              {btnMsg}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
