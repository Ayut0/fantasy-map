import React from "react";
import { Avatar, Box, Button, Rating, Typography, Modal } from "@mui/material";
import { ImCross } from "react-icons/im";
import { Review } from "../../../typings";

interface ReviewProps {
  open: boolean;
  handleClose: () => void;
  clickEvent?: (event: any) => Promise<void>;
  review: Review | undefined;
}

export const ReviewModal: React.FC<ReviewProps> = ({
  open,
  handleClose,
  clickEvent,
  review,
}) => {
  return (
    <>
      {review && review.content && (
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                backgroundColor: "#FFFFFF",
                width: "400px",
                height: "400px",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                padding: "30px",
                boxShadow: 24,
                borderRadius: "4px",
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src={review?.user?.profilePicture}
                  sx={{ margin: "10px auto" }}
                />
                <Typography>{review?.user?.name}</Typography>
                <Rating name="read-only" value={review.stars} readOnly />
                <Typography
                  id="modal-modal-description"
                  sx={{
                    mt: 2,
                    textAlign: "left",
                    width: "90%",
                    hyphens: "auto",
                  }}
                >
                  {review.content}
                </Typography>
              </Box>
            </Box>
          </Modal>
        </div>
      )}
    </>
  );
};
