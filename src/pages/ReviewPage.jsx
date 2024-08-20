import React, { useState } from "react";
import "../components/review-page/ReviewPage.css";
import { mockReviewData } from "../constants/mockReviewData";
import { svgCollection } from "../constants/svgCollection";
import { ReactSVG } from "react-svg";
import ReviewMoreBtn from "../components/review-page/ReviewMoreBtn";

const svg = svgCollection;

const ReviewPage = () => {
  const [visibleItems, setVisibleItems] = useState(2);
  const [isExpanded, setIsExpanded] = useState(false);

  const loadMore = () => {
    if (isExpanded) {
      setVisibleItems(2);
    } else {
      setVisibleItems(mockReviewData.length);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="review">
        <div className="review-title">리뷰</div>

        {mockReviewData.slice(0, visibleItems).map((review, index) => (
          <div key={index} className="review-box">
            <div className="review-upper-box">
              <img className="review-img" src={review.reviewImage} alt="" />

              <div className="review-upper-right">
                <div className="review-upper-writer">
                  <div className="review-id">{review.loginId}</div>
                  <div className="review-date">
                    작성일: {review.reviewCreatedAt}
                  </div>
                </div>

                <div className="review-upper-tag">
                  {review.reviewTag.map((tag, tagIndex) => (
                    <div key={tagIndex} className="review-tag">
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

            <div className="review-content">{review.reviewContent}</div>

            <div className="review-reply-box">
              <ReactSVG src={svg.letter} className="review-letter-img" />
              <div className="review-reply-count">
                댓글 {review.replyCount}개
              </div>
            </div>
          </div>
        ))}

        <ReviewMoreBtn onClick={loadMore} isExpanded={isExpanded} />
      </div>
    </>
  );
};

export default ReviewPage;
