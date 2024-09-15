import { useState } from "react";
import { deleteRequest } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useDeleteAccount = () => {
  const { accessToken } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);

  const deleteAccount = async (loginId, password) => {
    const customHeaders = {
      Authorization: accessToken,
    };

    const account = {
      loginId: loginId,
      password: password,
    };

    try {
      await deleteRequest("user/delete", account, customHeaders);
      setError(false);
      setErrorMessage("");
      return true;
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
      return false;
    }
  };

  return { deleteAccount, errorMessage, error, setError };
};

export default useDeleteAccount;
