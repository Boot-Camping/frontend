import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useBookList = () => {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampingPlaces = async () => {
      try {
        // 토큰과 userId를 가져옴
        const { accessToken } = getUserIdFromToken();

        // 만약 accessToken이 없다면, 요청을 보내지 않음
        if (!accessToken) {
          throw new Error("JWT 토큰이 없습니다.");
        }

        // 토큰을 API 요청에 포함시킴
        const response = await get("camps/bookings", accessToken);
        setBook(response.data);
      } catch (err) {
        setError(err);
        console.error("API 요청 실패:", err);
      }
    };

    fetchCampingPlaces();
  }, []);

  return { book, error };
};

export default useBookList;
