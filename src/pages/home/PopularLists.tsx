import React, { useState } from "react";
import { PopularListCard } from "./PopularListCard";
import Typography from "@mui/material/Typography";
import { Box, Hidden, TextField } from "@mui/material";
import { motion } from "framer-motion";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";

export const PopularLists: React.FC = () => {
  const { dispatch } = useAppContext();
  const [searchVal, setSearchVal] = useState("");
  const navigate = useNavigate();

  const handleInputChange: React.ChangeEventHandler = (event: any) => {
    setSearchVal(event.target.value);
  };

  const handleKeyUp: React.KeyboardEventHandler = (event) => {
    if (event.code === "Enter") {
      dispatch({ type: "search", payload: searchVal });
      navigate("/result");
    }
  };

  return (
    <>
      <Hidden smUp>
        <Box component="div" sx={{textAlign: "center", paddingTop: "32px"}}>
          <TextField
            onChange={handleInputChange}
            onKeyUp={handleKeyUp}
            id="outlined-basic"
            placeholder="Search list"
            variant="outlined"
            sx={{
              backgroundColor: "white",
              borderRadius: 8,
            }}
            value={searchVal}
            InputProps={{
              endAdornment: (
                <MdSearch
                  style={{
                    color: "#232946",
                    paddingTop: 3,
                    paddingRight: 3,
                  }}
                  size="40px"
                />
              ),
            }}
          />
        </Box>
      </Hidden>
      <Box pb={3}>
        <Typography
          variant="h2"
          align="left"
          sx={{
            mt: 10,
            mb: 8,
            fontSize: "32px",
            color: "#282010",
          }}
        >
          Popular lists
        </Typography>
        <motion.section
          initial={{ opacity: 0, x: -200 }}
          transition={{ duration: 2 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <PopularListCard />
        </motion.section>
      </Box>
    </>
  );
};
