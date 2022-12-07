import React, { useState } from "react";
import { Hero } from "./Hero";
import { PopularLists } from "./PopularLists";
import { Categories } from "./Categories";
import { Container } from "@mui/material";
import AppTemplate from "../../templates/AppTemplate";

export const Home: React.FC = () => {
  return (
    <AppTemplate>
      <Hero />
      <Container maxWidth="lg">
        <PopularLists />
        <Categories />
      </Container>
    </AppTemplate>
  );
};
