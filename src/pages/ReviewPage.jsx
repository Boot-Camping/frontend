import React, { useEffect, useState } from "react";
import "../components/review-page/ReviewPage.css";
import ReviewMoreBtn from "../components/review-page/ReviewMoreBtn";
import ReviewReply from "../components/review-page/ReviewReply";
import ReplyWriter from "../components/review-page/ReplyWriter";
import { svgCollection } from "../constants/svgCollection";
import { ReactSVG } from "react-svg";
import { get } from "../utils/Api";

const svg = svgCollection;

const ReviewPage = () => {
  const [visibleReviews, setVisibleReviews] = useState(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visibleReplies, setVisibleReplies] = useState({});
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await get("review/camp/2");
        setReviews(response);
      } catch (error) {
        console.error("캠핑장 리뷰 정보 가져오기 실패:", error);
      }
    };
    fetchReviews();
  }, []);

  const loadMore = () => {
    if (isExpanded) {
      setVisibleReviews(1);
    } else {
      setVisibleReviews(reviews.length);
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
        {reviews.length > 0 ? (
          reviews.slice(0, visibleReviews).map((review, index) => (
            <div key={index} className="review-box">
              <div className="review-upper-box">
                <img
                  className="review-img"
                  src={review.reviewImages[0]} // 단일 이미지로 처리
                  alt=""
                />

                <div className="review-upper-right">
                  <div className="review-upper-writer">
                    <div className="review-id">{review.loginId}</div>
                    <div className="review-date">
                      작성일: {review.createdAt}
                    </div>
                  </div>

                  <div className="review-upper-tag">
                    {review.reviewTags.map((reviewTag, tagIndex) => (
                      <div key={tagIndex} className="review-tag">
                        {reviewTag}
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

              {review.reviewCount > 0 && (
                <div className="review-reply-box">
                  <ReactSVG src={svg.letter} className="review-letter-icon" />
                  <div
                    className="review-reply-count"
                    onClick={() => toggleReply(index)}
                  >
                    댓글 {review.reviewCount}개
                  </div>
                </div>
              )}

              {visibleReplies[index] && (
                <>
                  <ReviewReply />
                  <ReplyWriter />
                </>
              )}
            </div>
          ))
        ) : (
          <div>리뷰가 없습니다.</div>
        )}
        <ReviewMoreBtn onClick={loadMore} isExpanded={isExpanded} />
      </div>
    </>
  );
};

export default ReviewPage;
