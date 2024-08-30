import { put } from "../utils/api";

const useUpdateMyReview = async (userId, accessToken, reviewId, content) => {
  const customHeaders = {
    Authorization: `${accessToken}`,
    "Content-Type": "multipart/form-data",
  };

  const reviewRequest = JSON.stringify({
    content: content,
  });

  const formData = new FormData();
  formData.append("reviewRequest", reviewRequest);

  const params = {
    userId: userId,
  };

  const queryString = new URLSearchParams(params).toString();

  try {
    const response = await put(
      `reviews/${reviewId}?${queryString}`,
      formData,
      customHeaders
    );
    console.log("리뷰 업데이트 성공!😃", response);
    console.log("전송한 데이터:", {
      reviewRequest: reviewRequest,
    });
    return response;
  } catch (error) {
    console.error("리뷰 업데이트에 실패했습니다🥲", error);
    throw error;
  }
};

export default useUpdateMyReview;
