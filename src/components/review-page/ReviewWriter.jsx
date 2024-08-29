import React, { useState } from "react";
import { svgCollection } from "../../constants/svgCollection";
import "./ReviewWriter.css";
import { reviewTag } from "../../constants/reviewTag";
import ReviewImgUploader from "./ReviewImgUploader";
import StarRating from "./StarRating";
import { useLocation } from "react-router-dom";
import { post } from "../../utils/api";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";

const svg = svgCollection;

const ReviewWriter = () => {
  const location = useLocation();
  const reviewData = location.state?.reviewData;
  const campId = reviewData.campId;

  console.log(reviewData);

  const [reviewGrade, setReviewGrade] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewImages, setReviewImages] = useState([]);
  const [error, setError] = useState(null);
  const { userId, accessToken } = getUserIdFromToken();
  const [selectedTags, setSelectedTags] = useState([]);

  // selectedTag -> label 추출해서 -> 문자열로 변환
  const reviewTagsString = selectedTags
    .map((tagId) => reviewTag.find((tag) => tag.id === tagId)?.label)
    .filter(Boolean) // null 또는 undefined 필터링
    .join(",");

  const gradeChangeHandle = (rating) => {
    setReviewGrade(rating);
    console.log("선택된 별점:", rating);
  };

  const reviewSubmit = async () => {
    const customHeaders = {
      Authorization: `${accessToken}`,
      "Content-Type": "multipart/form-data",
    };

    const tagsArray = reviewTagsString.split(",");

    // 이미지의 이름 배열 생성
    const imageUrls = reviewImages.map((image) => image.name);

    // 리뷰 요청 데이터 -> JSON 변환
    const reviewRequest = JSON.stringify({
      content: reviewContent,
      grade: reviewGrade,
      tags: tagsArray,
      imageUrls: [],
    });

    const formData = new FormData();
    formData.append("reviewRequest", reviewRequest);

    reviewImages.forEach((image) => {
      formData.append("reviewImages", image);
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }

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
      console.log("리뷰 제출 성공! 😄:", response);
    } catch (error) {
      setError("리뷰 제출 에러 발생 🥲");
      console.error("리뷰 제출 에러 발생 🥲:", error);
      if (error.response) {
        console.error("서버 응답 상태 코드:", error.response.status);
        console.error("서버 응답 데이터:", error.response.data);
      } else {
        console.error("요청 오류:", error.message);
      }
    }
  };

  const toggleTagHandle = (tag) => {
    if (selectedTags.includes(tag.id)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag.id));
    } else {
      setSelectedTags([...selectedTags, tag.id]);
    }
  };

  return (
    <div>
      <div className="review-writer-title">리뷰 작성</div>
      <div className="review-question-box">
        <div className="review-question">
          해당 캠핑장에 대해 얼마나 만족하셨나요?
        </div>

        <StarRating totalStars={5} gradeChangeHandle={gradeChangeHandle} />
      </div>

      <div className="review-question-box">
        <div className="review-question">
          해당 캠핑장에 대해 리뷰를 남겨주세요.
        </div>

        <div className="tag-group">
          {reviewTag.map((tag) => (
            <div key={tag.id} className="tag-checkbox-wrapper">
              <input
                type="checkbox"
                id={`tag-${tag.id}`}
                className="tag-checkbox"
                checked={selectedTags.includes(tag.id)}
                onChange={() => toggleTagHandle(tag)}
              />
              <label
                htmlFor={`tag-${tag.id}`}
                className={`tag-label ${tag.className} ${
                  selectedTags.includes(tag.id) ? "selected" : ""
                }`}
              >
                {tag.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <textarea
        type="text"
        className="review-writer-content"
        placeholder="캠핑장에 대한 의견을 남겨주세요!"
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
      />

      <div className="img-input-box">
        <div className="img-input-title">이미지를 등록해주세요.</div>
        <ReviewImgUploader maxImages={5} setReviewImages={setReviewImages} />
      </div>

      <button className="review-regi-btn" onClick={reviewSubmit}>
        리뷰 등록
      </button>
    </div>
  );
};

export default ReviewWriter;
