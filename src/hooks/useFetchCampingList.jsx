import { useState, useEffect } from "react";
import { get } from "../utils/Api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useFetchCampingList = () => {
  const [campingPlaces, setCampingPlaces] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchCampingPlaces = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };
      try {
        const response = await get("camp", customHeaders);
        setCampingPlaces(response.content); // 응답 데이터의 'content' 사용
      } catch (err) {
        setError(err.message);
      }
    };

    fetchCampingPlaces();
  }, [accessToken]);

  return { campingPlaces, error };
};
export default useFetchCampingList;
