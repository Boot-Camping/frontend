import { useState } from "react";
import { post } from "../utils/api";

const useLogin = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const postLogin = async (jsonData) => {
    try {
      const response = await post("user/login", jsonData);
      const accessToken =
        response.headers["authorization"] || response.headers["Authorization"];
      localStorage.setItem("accessToken", accessToken);
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      setError(true);
      return false;
    }
  };

  return { postLogin, errorMessage, error };
};

export default useLogin;
