import React, { useState } from "react";
import "../components/review-page/ReviewPage.css";
import { mockReviewData } from "../constants/mockReviewData";
import { svgCollection } from "../constants/svgCollection";
import { ReactSVG } from "react-svg";
import ReviewMoreBtn from "../components/review-page/ReviewMoreBtn";
import ReviewReply from "../components/review-page/ReviewReply";
import ReplyWriter from "../components/review-page/ReplyWriter";

const svg = svgCollection;

const ReviewPage = () => {
  const [visibleReviews, setvisibleReviews] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});

  const loadMore = () => {
    if (isExpanded) {
      setvisibleReviews(1);
    } else {
      setvisibleReviews(mockReviewData.length);
    }
    setIsExpanded(!isExpanded);
  };

  const toggleReply = (index) => {
    setVisibleReplies((prevVisibleReplies) => ({
      ...prevVisibleReplies,
      [index]: !prevVisibleReplies[index],
    }));
  };

  return (
    <>
      <div className="review">
        <div className="review-title">리뷰</div>
        {mockReviewData.slice(0, visibleReviews).map((review, index) => (
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
                  <button className="review-edit-btn">수정</button>
                  <button className="review-delete-btn">삭제</button>
                </div>
              </div>
            </div>

            <div className="review-content">{review.reviewContent}</div>

            <div className="review-reply-box">
              <ReactSVG src={svg.letter} className="review-letter-icon" />
              <div
                className="review-reply-count"
                onClick={() => toggleReply(index)}
              >
                댓글 {review.replyCount}개
              </div>
            </div>

            {visibleReplies[index] && <ReviewReply />}
            <ReplyWriter />
          </div>
        ))}

        <ReviewMoreBtn onClick={loadMore} isExpanded={isExpanded} />
      </div>
    </>
  );
};

export default ReviewPage;
