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

        const sortedCampingPlaces = response.content.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setCampingPlaces(sortedCampingPlaces);
      } catch (error) {
        setError(err.message);
      }
    };

    fetchCampingPlaces();
  }, [accessToken]);

  return { campingPlaces, error };
};
export default useFetchCampingList;
