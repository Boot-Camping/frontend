import React, { useState } from "react";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import "./ReviewWriter.css";
import { reviewTag } from "../../constants/reviewTag";
import ReviewImgUploader from "./ReviewImgUploader";
import StarRating from "./StarRating";

const svg = svgCollection;

const ReviewWriter = () => {
  const upperTags = reviewTag.slice(0, 3);
  const lowerTags = reviewTag.slice(3, 6);

  // 선택된 태그들을 관리하는 상태
  const [selectedTags, setSelectedTags] = useState([]);

  const ratingChangeHandle = (rating) => {
    console.log("선택된 별점:", rating);
  };

  // 태그 클릭 핸들러
  const toggleTagHandle = (tag) => {
    if (selectedTags.includes(tag.id)) {
      // 이미 선택된 태그면 선택 해제
      setSelectedTags(selectedTags.filter((t) => t !== tag.id));
    } else {
      // 선택되지 않은 태그면 선택
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

        <StarRating totalStars={5} ratingChangeHandle={ratingChangeHandle} />
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

      <input
        type="text"
        className="review-writer-content"
        placeholder="리뷰를 입력해 주세요."
      />

      <div className="img-input-box">
        <div className="img-input-title">이미지를 등록해주세요.</div>
        <ReviewImgUploader maxImages={5} />
      </div>

      <button className="review-regi-btn">리뷰 등록</button>
    </div>
  );
};

export default ReviewWriter;
