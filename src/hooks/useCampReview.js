import { useEffect, useState } from "react";
import { get } from "../utils/api";

const useCampReview = (campId) => {
  const [campReviews, setCampReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampReview = async () => {
      try {
        const response = await get(`reviews/camp/${campId}`);
        setCampReviews(response);
      } catch (err) {
        setError(new Error("리뷰를 불러오는데 실패했습니다."));
      } finally {
        setLoading(false);
      }
    };

    fetchCampReview();
  }, [campId]);

  return { campReviews, loading, error };
};

export default useCampReview;
