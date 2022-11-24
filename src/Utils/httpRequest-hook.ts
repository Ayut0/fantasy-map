import axios from "axios";
import React, { useState, useCallback } from "react";

type Method = "GET" | "POST" | "PUT" | "DELETE";

export const useHttpRequest = () => {
  const [error, setError] = useState<boolean | null>(false);
  const errorHandler = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      console.log("error message", err.message);
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
