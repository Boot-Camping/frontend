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
          `camps?pageNumber=${pageNumber}&pageSize=${pageSize}`,
          customHeaders
        );

        const sortedCampingPlaces = response.content.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setCampingPlaces(sortedCampingPlaces);
        setTotalPages(response.totalPages); // 전체 페이지 수 설정
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCampingPlaces();
  }, [accessToken, pageNumber, pageSize]);

  return { campingPlaces, error, totalPages };
};

export default useFetchCampingList;
