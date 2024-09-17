import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/api";

const usePaid = () => {
  const { accessToken } = getUserIdFromToken();
  const [paidData, setPaidData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const getPaidData = async () => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      const response = await get(`camps/bookings`, customHeaders);
      const sortedData = sortPaidDataByDate(response);
      setPaidData(sortedData);
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const sortPaidDataByDate = (data) => {
    return data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
  };

  useEffect(() => {
    getPaidData();
  }, [accessToken]);

  return { paidData, errorMessage, setErrorMessage, getPaidData };
};

export default usePaid;
