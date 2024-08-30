import { put } from "../utils/api";

const useUpdateMyReview = async (
  userId,
  accessToken,
  reviewId,
  updatedData,
  reviewImages = []
) => {
  const customHeaders = {
    Authorization: `${accessToken}`,
  };

  const formData = new FormData();
  formData.append("reviewId", reviewId);

  // JSON 형태의 리뷰 데이터 추가
  formData.append("reviewRequest", JSON.stringify(updatedData));

  // 이미지 파일 추가
  reviewImages.forEach((image) => {
    formData.append("reviewImages", image);
  });

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
    return response;
  } catch (error) {
    console.error("리뷰 업데이트에 실패했습니다🥲", error);
    throw error;
  }
};

export default useUpdateMyReview;
