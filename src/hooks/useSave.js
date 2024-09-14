import React, { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";

const useSave = () => {
  const { accessToken } = getUserIdFromToken();
  const [saveData, setSaveData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getSaveData = async () => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      const response = await get(`userprofile/wishlist`, customHeaders);
      setSaveData(response);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getSaveData();
  }, []);

  return { saveData, errorMessage, getSaveData };
};

export default useSave;
