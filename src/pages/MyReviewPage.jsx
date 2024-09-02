import React, { useState } from "react";

import { ReactSVG } from "react-svg";
import { svgCollection } from "../constants/svgCollection";
import "../components/my-review-page/MyReviewPage.css";

import useMyReview from "../hooks/useMyReview";
import updateMyReview from "../utils/updateMyReview";
import deleteMyReview from "../utils/deleteMyReview";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import { formatDate } from "../utils/formatDate";
import ReplyViewer from "../components/detail-review/ReplyViewer";

const svg = svgCollection;

const MyReviewPage = () => {
  const { userId, accessToken } = getUserIdFromToken();
  const { myReviews, loading, error, setMyReviews } = useMyReview(
    userId,
    accessToken
  );
  const updateReview = updateMyReview;
  const { deleteReview } = deleteMyReview();

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
      const updatedReview = await updateReview(
        userId,
        accessToken,
        reviewId,
        content
      );
      console.log("업데이트된 리뷰:", updatedReview);

      setMyReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId
            ? { ...review, content: editedContent }
            : review
        )
      );

      // 수정 모드 해제
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
    <div className="my-review">
      <div className="review-title">나의 리뷰</div>
      {myReviews.map((myReview, index) => (
        <div key={index} className="review-box">
          <div className="upper-box">
            <div className="my-review-camp-name">{myReview.campName}</div>
            <div className="review-date">
              작성일: {formatDate(myReview.createdAt)}
            </div>
          </div>
          <div className="middle-box">
            <img className="review-img" src={myReview.reviewImage} alt="" />
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
            </div>
          </div>
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
                  onClick={() => clickEditHandle(myReview.id, myReview.content)}
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

          {/* <div className="review-reply-box">
            <ReactSVG src={svg.letter} className="review-letter-icon" />
            <div className="reply-btn" onClick={() => toggleReply(index)}>
              댓글읽기
            </div>
            {visibleReplies[index] && <ReplyViewer reviewId={myReview.id} />}
          </div> */}
          <ReplyViewer reviewId={myReview.id} />
        </div>
      ))}
    </div>
  );
};

export default MyReviewPage;
