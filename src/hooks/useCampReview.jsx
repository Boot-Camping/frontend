import { useEffect, useState } from "react";
import { get } from "../utils/Api";

const useCampReview = (campId) => {
  const [campReviews, setCampReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampReview = async () => {
      try {
        const response = await get(`review/camp/${campId}`);
        console.log("캠핑장 정보 가져오기 성공:", response);
        setCampReviews(response);
        setLoading(false);
      } catch (error) {
        console.error("캠핑장 정보 가져오기 실패:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchCampReview();
  }, [campId]);

  return { campReviews, loading, error };
};

export default useCampReview;
