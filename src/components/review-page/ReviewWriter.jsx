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
  console.log(reviewData);

  const [reviewGrade, setReviewGrade] = useState(0);
  const [reviewContent, setReviewContent] = useState("");
  const [reviewTags, setReviewTags] = useState([]);
  const [reviewImages, setReviewImages] = useState([]);
  const [error, setError] = useState(null);
  const { userId, accessToken } = getUserIdFromToken();
  const [selectedTags, setSelectedTags] = useState([]);

  //selectedTag -> label 추출해서 -> 문자열로 변환
  const reviewTagsString = selectedTags
    .map((tagId) => reviewTag.find((tag) => tag.id === tagId)?.label)
    .filter(Boolean) //null 또는 undefined 필터링
    .join(",");

  const reviewSubmit = async () => {
    const reviewData = {
      grade: reviewGrade,
      reviewContent: reviewContent,
      reviewTag: reviewTagsString,
      reviewImage: reviewImages.join(","),
    };
    console.log("제출하려는 리뷰:", reviewData);
    try {
      const response = await post(`reviews`, reviewData, {
        Authorization: `Bearer ${accessToken}`,
      });
    } catch (error) {
      setError("리뷰제출 에러 발생 🥲");
      console.error("리뷰제출 에러 발생 🥲:", error);
      if (error.response) {
        console.error("서버 응답 상태 코드:", error.response.status);
        console.error("서버 응답 데이터:", error.response.data);
      } else {
        console.error("요청 오류:", error.message);
      }
    }
  };

  const upperTags = reviewTag.slice(0, 3);
  const lowerTags = reviewTag.slice(3, 6);

  const gradeChangeHandle = (rating) => {
    setReviewGrade(rating);
    console.log("선택된 별점:", rating);
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
          {upperTags.map((tag) => (
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
                className={`tag-label good ${
                  selectedTags.includes(tag.id) ? "selected" : ""
                }`}
              >
                {tag.label}
              </label>
            </div>
          ))}
        </div>

        <div className="tag-group">
          {lowerTags.map((tag) => (
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
                className={`tag-label bad ${
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
