import React from "react";
import "../detail-page/ReviewPage.css";
import { mockReviewData } from "../../constants/mockReviewData";
import { svgCollection } from "../../constants/svgCollection";
import { ReactSVG } from "react-svg";

import ReadMore from "./ReadMore";

const svg = svgCollection;

const getMockReviewData = (id) => {
  return mockReviewData.find((info) => info.id === id);
};

const {
  loginId: reviewId,
  reviewCreatedAt: reviewDate,
  reviewImage: reviewImg,
  reviewContent: reviewContent,
  reviewTag: reviewTag,
  replyCount: replyCount,
  reviewReply: reviewReply,
} = getMockReviewData("reviewData");

const ReviewPage = () => {
  return (
    <>
      <div className="review">
        <div className="review-title">리뷰</div>

        <div className="review-box">
          <div className="review-upper-box">
            <img className="review-img" src={reviewImg} alt="" />

            <div className="review-upper-right">
              <div className="review-upper-writer">
                <div className="review-id">{reviewId}</div>
                <div className="review-date">작성일: {reviewDate}</div>
              </div>

              <div className="review-upper-tag">
                {reviewTag.map((tag, index) => (
                  <div key={index} className="review-tag">
                    {tag}
                  </div>
                ))}
              </div>

              <div className="review-edit-box">
                <div className="review-edit">수정</div>
                <div className="review-delete">삭제</div>
              </div>
            </div>
          </div>

          <div className="review-content">{reviewContent}</div>

          <div className="review-reply-box">
            <ReactSVG src={svg.letter} className="review-letter-img" />
            <div className="review-reply-count">댓글 {replyCount}개</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
