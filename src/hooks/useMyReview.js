import { useEffect, useState } from "react";
import { get } from "../utils/api";

const useMyReview = (userId, accessToken) => {
  const [myReviews, setMyReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMyReviews = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    setLoading(true);
    setError(null); // 이전 에러 상태 초기화

    try {
      const response = await get(`reviews/user/${userId}`, customHeaders);
      setMyReviews(response);
    } catch (error) {
      console.error("나의 리뷰를 불러오는데 실패했습니다🥲", error);

      if (error.response && error.response.data) {
        setError(
          new Error(
            `서버 오류: ${
              error.response.data.message ||
              "나의 리뷰를 불러오는데 실패했습니다🥲"
            }`
          )
        );
      } else {
        setError(new Error("나의 리뷰를 불러오는데 실패했습니다🥲"));
      }
    } finally {
      setLoading(false);
    }
  };

  return { myReviews, loading, error, setMyReviews, fetchMyReviews };
};

export default useMyReview;
