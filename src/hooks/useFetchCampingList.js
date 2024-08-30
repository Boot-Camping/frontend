import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useFetchCampingList = () => {
  const [campingPlaces, setCampingPlaces] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchCampingPlaces = async () => {
      const customHeaders = {
        Authorization: `${accessToken}`,
      };
      try {
        const response = await get("camps", customHeaders);

        const sortedCampingPlaces = response.content.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setCampingPlaces(sortedCampingPlaces);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCampingPlaces();
  }, [accessToken]);

  return { campingPlaces, error };
};
export default useFetchCampingList;
