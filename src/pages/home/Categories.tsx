import React from "react";
import { CategoryCard } from "./CategoryCard";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { motion } from "framer-motion";

export const Categories: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 2 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{once:true}}
      style={{marginBottom: "48px"}}
    >
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
          Category
        </Typography>
        <CategoryCard />
      </Box>
    </motion.section>
  );
};
