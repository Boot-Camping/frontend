import React from "react";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import "./ReviewWriter.css";

const svg = svgCollection;

const ReviewWriter = () => {
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
          해당 캠핑장에 대해 얼마나 만족하셨나요?
        </div>
        <div className="review-writer-tag">Review Tag</div>
      </div>

      <input type="text" className="review-content" />

      <div className="img-input-box">
        <div className="img-input-title">이미지를 등록해주세요.</div>
        <div className="img-selector"></div>
      </div>

      <button className="review-regi-btn">리뷰 등록</button>
    </div>
  );
};

export default ReviewWriter;
