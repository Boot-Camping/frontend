import React, { useState } from "react";
import { svgCollection } from "../constants/svgCollection";
import { ReactSVG } from "react-svg";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";

import useMyReview from "../hooks/useMyReview";
import useUpdateMyReview from "../hooks/useUpdateMyReview";
import useDeleteMyReview from "../hooks/useDeleteMyReview";

import ReviewReply from "../components/review-reply-page/ReviewReply";
import "../components/my-review-page/MyReviewPage.css";

const svg = svgCollection;

const MyReviewPage = () => {
  const { userId, accessToken } = getUserIdFromToken();
  const { myReviews, loading, error, setMyReviews } = useMyReview(
    userId,
    accessToken
  );
  const updateReview = useUpdateMyReview;
  const { deleteReview } = useDeleteMyReview();

  const [visibleReplies, setVisibleReplies] = useState({});
  const [editMode, setEditMode] = useState(null); // 수정 중인 리뷰 ID 저장
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용 저장

  const toggleReply = (index) => {
    setVisibleReplies((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const clickEditHandle = (reviewId, newContent) => {
    setEditMode(reviewId);
    setEditedContent(newContent);
  };

  const clickSaveHandle = async (reviewId) => {
    const content = editedContent;
    try {
      await updateReview(userId, accessToken, reviewId, content);
      setEditMode(null);
    } catch (error) {
      console.error("리뷰 수정에 실패했습니다🥲", error);
    }
  };

  const clickDeleteHandle = async (reviewId) => {
    try {
      await deleteReview(userId, accessToken, reviewId);
      setMyReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.log("리뷰 삭제에 실패했습니다🥲", error);
    }
  };

  return (
    <div className="review">
      <div className="review-title">나의 리뷰</div>
      {myReviews.map((myReview, index) => (
        <div key={index} className="review-box">
          <img className="review-img" src={myReview.reviewImage} alt="" />

          <div className="review-upper">
            <div className="review-date">작성일: {myReview.createdAt}</div>
          </div>

          <div className="review-edit-box">
            {editMode === myReview.id ? (
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="review-edit-content"
              />
            ) : (
              <div className="review-content">{myReview.content}</div>
            )}
            <div className="review-edit-btns">
              {editMode === myReview.id ? (
                <>
                  <button
                    className="review-save-btn"
                    onClick={() => clickSaveHandle(myReview.id)}
                  >
                    저장
                  </button>
                  <button
                    className="review-cancel-btn"
                    onClick={() => setEditMode(null)}
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="review-edit-btn"
                    onClick={() =>
                      clickEditHandle(myReview.id, myReview.content)
                    }
                  >
                    수정
                  </button>
                  <button
                    className="review-delete-btn"
                    onClick={() => clickDeleteHandle(myReview.id)}
                  >
                    삭제
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="review-reply-box">
            <ReactSVG src={svg.letter} className="review-letter-icon" />
            <div
              className="review-reply-count"
              onClick={() => toggleReply(index)}
            >
              댓글 {myReview.replyCount}개
            </div>
          </div>

          {visibleReplies[index] && <ReviewReply reviewId={myReview.id} />}
        </div>
      ))}
    </div>
  );
};

export default MyReviewPage;
