import { useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { put } from "../utils/api";

const useCashCharge = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [errorMessage, setErrorMessage] = useState("");

  const chargeCash = async (selectPrice, clickCancelHandle, onSuccess) => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      const requestBody = {
        cash: selectPrice,
      };
      await put(`user/chargeCash/${userId}`, requestBody, customHeaders);
      clickCancelHandle();
      onSuccess();
      return true;
    } catch (error) {
      setErrorMessage(error.message);
      return false;
    }
  };

  return { chargeCash, errorMessage };
};

export default useCashCharge;
