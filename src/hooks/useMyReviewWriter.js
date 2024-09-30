import { useState } from "react";
import { post } from "../utils/api";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { reviewTag } from "../constants/reviewTag";

export const useMyReviewWriter = (campId, navigate) => {
  const { userId, accessToken } = getUserIdFromToken();

  const [reviewGrade, setReviewGrade] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // selectedTag -> label 추출해서 -> 문자열로 변환
  const reviewTagsString = selectedTags
    .map((tagId) => reviewTag.find((tag) => tag.id === tagId)?.label)
    .filter(Boolean); // null 또는 undefined 필터링

  const gradeChangeHandle = (rating) => {
    setReviewGrade(rating);
  };

  const toggleTagHandle = (tag) => {
    if (selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  const reviewSubmit = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    };

    // 리뷰 요청 데이터 -> JSON 변환
    const reviewRequest = JSON.stringify({
      content: reviewContent,
      grade: reviewGrade,
      tags: reviewTagsString,
      imageUrls: [],
    });

    const formData = new FormData();
    formData.append("reviewRequest", reviewRequest);
    reviewImages.forEach((image) => {
      formData.append("reviewImages", image);
    });

    const params = {
      campId: campId,
      userId: userId,
    };

    const queryString = new URLSearchParams(params).toString();

    // post 요청
    try {
      const response = await post(
        `reviews?${queryString}`,
        formData,
        customHeaders
      );
      setMyReviews((prevReviews) => [...prevReviews, response.data]);
      setIsModalOpen(true);
    } catch (error) {
      setError("리뷰 제출 에러 발생 🥲");
      console.error("리뷰 제출 에러 발생 🥲:", error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/mypage/myreview");
  };

  return {
    reviewGrade,
    reviewContent,
    reviewImages,
    selectedTags,
    error,
    isModalOpen,
    gradeChangeHandle,
    setReviewContent,
    setReviewImages,
    toggleTagHandle,
    reviewSubmit,
    openModal,
    closeModal,
  };
};
