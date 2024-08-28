import { useState, useEffect } from "react";
import { get } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const useBookList = () => {
  const [book, setBook] = useState([]);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchCampingPlaces = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };
      try {
        const response = await get("camps/bookings", customHeaders);

        const sortedBookings = response.content.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        setBook(sortedBookings);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCampingPlaces();
  }, [accessToken]);

  return { book, error };
};
export default useBookList;
