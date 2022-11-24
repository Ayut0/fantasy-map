import React, {ReactEventHandler, useState} from "react";
import { Header } from "../components/Header";
import { useHttpRequest } from "../Utils/httpRequest-hook";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

const AppTemplate: React.FC<Props> = ({ children }) => {
  const [result, setResult] = useState([]);
  const [searchVal, setSearchVal] = useState("");

  const { error, sendRequest, clearError } = useHttpRequest();
  const handleInputChange: ReactEventHandler = (event: any) => {
    setSearchVal(event.target.value);
    const getRequiredLists = async () => {
      const response = await sendRequest(
        `/api/lists/search?query=${searchVal}`,
        "GET"
      );
      setResult(response);
      console.log(result);
    };
    getRequiredLists();
  };
  return (
    <>
      <Header handleInputChange={handleInputChange} />
      {children}
    </>
  );
};

export default AppTemplate;
