import axios from "axios";
import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type Method = "GET" | "POST" | "PUT" | "DELETE";

const FORCE_AUTH_EXCEPTION = "/api/users/jwt";

export const useHttpRequest = () => {
  const [error, setError] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate();

  function timeout(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

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
        setIsLoading(true)
        try {
          const response = await axios.get(url);
          const responseData = await response.data;

          await timeout(2000)
          setIsLoading(false)
          return responseData;
        } catch (err) {
          errorHandler(err);
          await timeout(2000)
          setIsLoading(false)
        }
      } else if (method === "POST") {
        setIsLoading(true)
        try {
          const response = await axios.post(url, body);

          await timeout(2000)
          setIsLoading(false)
          return response;
        } catch (err) {
          errorHandler(err);
          await timeout(2000)
          setIsLoading(false)
        }
      } else if (method === "PUT") {
        setIsLoading(true)
        try {
          const response = await axios.put(url, body);

          await timeout(2000)
          setIsLoading(false)
          return response;
        } catch (err) {
          errorHandler(err);

          await timeout(2000)
          setIsLoading(false)
        }
      } else if (method === "DELETE") {
        setIsLoading(true)
        try {
          const response = await axios.delete(url);

          await timeout(2000)
          setIsLoading(false)
          return response;
        } catch (err) {
          errorHandler(err);

          await timeout(2000)
          setIsLoading(false)
        }
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { error, sendRequest, clearError, isLoading };
};
