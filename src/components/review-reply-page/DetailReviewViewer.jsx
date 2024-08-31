import React, { useState } from "react";
import "./ReviewPage.css";

import ReviewMoreBtn from "./ReviewMoreBtn";
import ReplyViewer from "./ReplyViewer";
import ReplyWriter from "./ReplyWriter";

import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { formatDate } from "../../utils/formatDate";

import useCampReview from "../../hooks/useCampReview";

const svg = svgCollection;

const DetailReviewViewer = ({ campId }) => {
  const [visibleReviews, setvisibleReviews] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});

  const { campReviews, loading, error } = useCampReview(campId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> {error.message}</div>;
  }

  const loadMore = () => {
    if (isExpanded) {
      setvisibleReviews(1);
    } else {
      setvisibleReviews(campReviews.length);
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
    <div className="review">
      <div className="review-title">리뷰</div>
      {campReviews.slice(0, visibleReviews).map((review, index) => (
        <div key={index} className="review-box">
          <div className="review-upper-box">
            <img className="review-img" src={review.reviewImages} alt="" />
            <div className="review-upper-right">
              <div className="review-upper-writer">
                <div className="review-id">{review.loginId}</div>
                <div className="review-date">
                  작성일: {formatDate(review.createdAt)}
                </div>
              </div>
              <div className="review-upper-tag">
                {review.reviewTags.map((tag, tagIndex) => (
                  <div key={tagIndex} className="review-tag">
                    {tag}
                  </div>
                ))}
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
          {visibleReplies[index] && <ReplyViewer reviewId={review.id} />}
          <ReplyWriter reviewId={review.id} />
        </div>
      ))}
      <ReviewMoreBtn onClick={loadMore} isExpanded={isExpanded} />
    </div>
  );
};

export default DetailReviewViewer;
