import { useEffect, useState } from "react";
import { get } from "../utils/api";

const useCampReview = (campId) => {
  const [campReviews, setCampReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCampReview = async () => {
      try {
        const response = await get(`review/camp/${campId}`);
        setCampReviews(response);
      } catch (error) {
        console.error("캠핑장 리뷰 가져오기 실패:", error);

        if (error.response && error.response.data) {
          setError(
            new Error(
              `서버 오류: ${
                error.response.data.message || "리뷰를 불러오는데 실패했습니다."
              }`
            )
          );
        } else {
          setError(
            new Error(
              "리뷰를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요."
            )
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCampReview();
  }, [campId]);

  return { campReviews, loading, error };
};

export default useCampReview;
