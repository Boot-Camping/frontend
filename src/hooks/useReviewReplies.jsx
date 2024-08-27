import { useEffect, useState } from "react";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { get } from "../utils/Api";

const useReviewReplies = (reviewId) => {
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken } = getUserIdFromToken();

  useEffect(() => {
    const fetchReplies = async () => {
      const customHeaders = {
        Authorization: `Bearer ${accessToken}`,
      };

      try {
        console.log("요청하려는 reviewId:", reviewId);
        const response = await get(`reply/review/${reviewId}`, customHeaders);
        console.log("API 응답:", response);
        setReplies(response);
        setLoading(false);
      } catch (error) {}
    };

    fetchReplies();
  }, [reviewId]);

  return { replies, loading, error };
};

export default useReviewReplies;
