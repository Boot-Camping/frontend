import React, { useState } from "react";
import { svgCollection } from "../constants/svgCollection";
import { ReactSVG } from "react-svg";
import { getUserIdFromToken } from "../utils/getUserIdFromToken";
import useMyReview from "../hooks/useMyReview";
import useUpdateMyReview from "../hooks/useUpdateMyReview";
import ReviewReply from "../components/review-reply-page/ReviewReply";
import "../components/my-review-page/MyReviewPage.css";

const svg = svgCollection;

const MyReviewPage = () => {
  const { userId, accessToken } = getUserIdFromToken();
  const { myReviews, loading, error } = useMyReview(userId, accessToken);
  const updateReview = useUpdateMyReview;

  const [visibleReplies, setVisibleReplies] = useState({});
  const [editMode, setEditMode] = useState(null); // 수정 중인 리뷰 ID 저장
  const [editedContent, setEditedContent] = useState(""); // 수정된 내용 저장

  const toggleReply = (index) => {
    setVisibleReplies((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const clickEditHandle = (reviewId, newContent) => {
    console.log("수정하려는 리뷰:", reviewId);

    setEditMode(reviewId);
    setEditedContent(newContent);
  };

  const clickSaveHandle = async (reviewId) => {
    console.log("저장하려는 리뷰:", reviewId);
    const content = editedContent;
    try {
      await updateReview(userId, accessToken, reviewId, content);
      setEditMode(null);
    } catch (error) {
      console.error("리뷰 수정에 실패했습니다🥲", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="review">
      <div className="review-title">리뷰</div>
      {myReviews.map((myReview, index) => (
        <div key={index} className="review-box">
          <div className="review-upper-box">
            <img className="review-img" src={myReview.reviewImage} alt="" />

            <div className="review-upper-right">
              <div className="review-upper-writer">
                <div className="review-date">작성일: {myReview.createdAt}</div>
              </div>
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
                  <button className="review-delete-btn">삭제</button>
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
