import Grid from "@mui/material/Grid";
import React from "react";
import { Link } from "react-router-dom";
import ActionButton from "../../components/ActionButton";

const EditButton: React.FC = () => {
  return (
    <Grid
      container
      sx={{ justifyContent: { xs: "center" }, alignItems: { xs: "center" } }}
    >
      <Grid
        item
        xs={12}
        sx={{ marginTop: { md: "10rem" }, marginBottom: ".7rem" }}
      >
        <ActionButton
          variant="outlined"
          sx={{ padding: ".7rem 1rem", width: "65%", fontSize: "1.1rem" }}
        >
          <Link
            style={{ textDecoration: "none", color: "#232946" }}
            to="/profile/edit"
          >
            Edit profile
          </Link>
        </ActionButton>
      </Grid>
      <Grid item xs={8} sx={{ textAlign: "end" }}>
        <Link
          to={""}
          style={{ textDecoration: "none", color: "#025B67", textAlign: "end" }}
        >
          Delete account
        </Link>
      </Grid>
    </Grid>
  );
};

export default EditButton;
