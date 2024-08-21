import React from "react";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import "./ReviewWriter.css";
import { reviewTag } from "../../constants/reviewTag";
import ReviewImgUploader from "./ReviewImgUploader";

const svg = svgCollection;

const ReviewWriter = () => {
  const upperTags = reviewTag.slice(0, 3);
  const lowerTags = reviewTag.slice(3, 6);

  return (
    <div>
      <div className="review-writer-title">리뷰 작성</div>
      <div className="review-question-box">
        <div className="review-question">
          해당 캠핑장에 대해 얼마나 만족하셨나요?
        </div>
        <div className="review-stars">
          <ReactSVG src={svg.stars} />
        </div>
      </div>

      <div className="review-question-box">
        <div className="review-question">
          해당 캠핑장에 대해 리뷰를 남겨주세요.
        </div>

        <div className="tag-group">
          {upperTags.map((tag) => (
            <div key={tag.id} className={tag.className}>
              {tag.label}
            </div>
          ))}
        </div>

        <div className="tag-group">
          {lowerTags.map((tag) => (
            <div key={tag.id} className={tag.className}>
              {tag.label}
            </div>
          ))}
        </div>
      </div>

      <input
        type="text"
        className="review-content"
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
