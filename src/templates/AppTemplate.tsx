import React from "react";
import { Header } from "../components/Header";

interface Props {
  children: JSX.Element[] | JSX.Element | undefined;
}

const AppTemplate: React.FC<Props> = ({ children }) => {
  
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default AppTemplate;
