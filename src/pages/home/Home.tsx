import React from "react";
import { Hero } from "./Hero";
import { PopularLists } from "./PopularLists";
import { Categories } from "./Categories";
import { Container } from "@mui/material";

export const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Container maxWidth="lg">
        <PopularLists />
        <Categories />
      </Container>
    </>
  );
}