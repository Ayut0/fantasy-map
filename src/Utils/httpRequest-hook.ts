import axios from "axios";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const FORCE_AUTH_EXCEPTION = "/api/users/jwt";

export const useHttpRequest = () => {
  const [error, setError] = useState<boolean | null>(false);
  const navigate = useNavigate();

  const errorHandler = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      // redirect to login when response is 401 Unauthorized and is not one of
      if (
        err.response?.status === 401 &&
        !(err.request?.responseURL || "").endsWith(FORCE_AUTH_EXCEPTION)
      ) {
        navigate("/login");
      }

      return err.message;
    } else {
      console.log("Unexpected error", err);
      setError(true);
      return "We are having an unpredictable error";
    }
  };

  const sendRequest = useCallback(
    async (url: string, method: Method, body: unknown = null) => {
      if (method === "GET") {
        try {
          const response = await axios.get(url);
          console.log(response);
          const responseData = await response.data;
          console.log("response status", response.status);
          return responseData;
        } catch (err) {
          errorHandler(err);
        }
      } else if (method === "POST") {
        try {
          const response = await axios.post(url, body);
          return response.data;
          console.log(response);
          console.log("response status", response.status);
        } catch (err) {
          errorHandler(err);
        }
      } else if (method === "PUT") {
        try {
          const response = await axios.put(url, body);
          console.log(response);
          console.log("response status", response.status);
        } catch (err) {
          errorHandler(err);
        }
      } else if (method === "DELETE") {
        try {
          const response = await axios.delete(url);
          console.log(response);
          console.log("response status", response.status);
        } catch (err) {
          errorHandler(err);
        }
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { error, sendRequest, clearError };
};
