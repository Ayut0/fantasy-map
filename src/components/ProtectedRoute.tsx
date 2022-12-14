import React from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

interface Props {
  children?: JSX.Element | JSX.Element[];
  element?: JSX.Element | JSX.Element[];
}

const ProtectedRoute: React.FC<Props> = ({ children, element }) => {
  const { state } = useAppContext();

  if (state.loggedUser) {
    return <>{children || element}</>;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
