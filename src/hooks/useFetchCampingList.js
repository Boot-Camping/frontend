import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useFetchCampingList = (pageNumber, pageSize) => {
  const [campingPlaces, setCampingPlaces] = useState([]);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchCampingPlaces = async () => {
      const customHeaders = {
        Authorization: `${accessToken}`,
      };
      try {
        const response = await get(
          `camps?page=${pageNumber}&size=${pageSize}`,
          customHeaders
        );

        const sortedCampingPlaces = response.content.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setCampingPlaces(sortedCampingPlaces);
        setTotalPages(response.totalPages);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCampingPlaces();
  }, [accessToken, pageNumber, pageSize]);

  return { campingPlaces, error, totalPages };
};

export default useFetchCampingList;
