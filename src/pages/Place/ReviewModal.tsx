import React from "react";
import { Avatar, Box, Button, Rating, Typography, Modal } from "@mui/material";
import { ImCross } from "react-icons/im";
import { Review } from "../../../typings";
import { useAppContext } from "../../context/AppContext";
import { useLocation } from "react-router-dom";

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
  const { state } = useAppContext();
  const location = useLocation();
  console.log(location)
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
                backgroundColor: "#FDFDFB",
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
                  src={location.pathname === "/profile"? state.profileData.profilePicture : review?.user?.profilePicture}
                  sx={{ margin: "10px auto", width: "80px", height: "80px" }}
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
