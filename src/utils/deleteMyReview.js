import { deleteRequest } from "./api";

const deleteMyReview = () => {
  const deleteReview = async (userId, accessToken, reviewId) => {
    const customHeaders = {
      Authorization: `${accessToken}`,
    };

    const params = {
      userId: userId,
    };

    const queryString = new URLSearchParams(params).toString();

    try {
      const response = await deleteRequest(
        `reviews/${reviewId}?${queryString}`,
        {},
        customHeaders
      );

      console.log("리뷰 삭제 성공!", response);
      return response;
    } catch (error) {
      console.error("리뷰 삭제에 실패했습니다🥲", error);
      throw error;
    }
  };

  return { deleteReview };
};

export default deleteMyReview;
