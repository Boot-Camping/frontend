import React, { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";

const useCash = () => {
  const { accessToken, userId } = getUserIdFromToken();
  const [cashData, setCashData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const getCashData = async () => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      const response = await get(
        `userprofile/cashTransaction/${userId}`,
        customHeaders
      );
      setCashData(response);
      setLoading(false);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getCashData();
  }, [accessToken, userId]);

  return { cashData, errorMessage, loading, getCashData };
};

export default useCash;
