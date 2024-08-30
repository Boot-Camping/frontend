import React, { useState } from "react";
import "../components/review-reply-page/ReviewPage.css";
import ReviewMoreBtn from "../components/review-reply-page/ReviewMoreBtn";
import ReviewReply from "../components/review-reply-page/ReviewReply";
import ReplyWriter from "../components/review-reply-page/ReplyWriter";
import { svgCollection } from "../constants/svgCollection";
import { ReactSVG } from "react-svg";
import useMyReview from "../hooks/useMyReview";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

const svg = svgCollection;

const MyReviewPage = () => {
  const { userId, accessToken } = getUserIdFromToken();
  const { myReviews, loading, error } = useMyReview(userId, accessToken);

  console.log("User ID:", userId);
  console.log("Access Token:", accessToken);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div> {error.message}</div>;
  }

  return (
    <div className="review">
      <div className="review-title">리뷰</div>
      {myReviews.map((myReview, index) => (
        <div key={index} className="review-box">
          <div className="review-upper-box">
            <img className="review-img" src={myReview.reviewImages} alt="" />
            <div className="review-upper-right">
              <div className="review-upper-writer">
                <div className="review-date">
                  작성일: {myReview.reviewCreatedAt}
                </div>
              </div>

              <div className="review-upper-tag">
                {myReview.reviewTags.map((tag, tagIndex) => (
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
          <div className="review-content">{myReview.reviewContent}</div>
          {/* <div className="review-reply-box">
            <ReactSVG src={svg.letter} className="review-letter-icon" />
            <div
              className="review-reply-count"
              onClick={() => toggleReply(index)}
            >
              댓글 {review.replyCount}개
            </div>
          </div>
          {visibleReplies[index] && <ReviewReply reviewId={review.id} />}
          <ReplyWriter /> */}
        </div>
      ))}
      {/* <ReviewMoreBtn onClick={loadMore} isExpanded={isExpanded} /> */}
    </div>
  );
};

export default MyReviewPage;
