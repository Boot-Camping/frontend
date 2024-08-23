import React from "react";
import "./ReviewPage.css";
import useReviewReplies from "../../hooks/useReviewRepies";

const ReviewReply = ({ reviewId }) => {
  const { replies, loading, error } = useReviewReplies(reviewId);
  console.log("reviewId:", reviewId);

  if (loading) {
    return <div>Loading replies...</div>;
  }

  if (error) {
    return <div>댓글 가져오기 실패: {error.message}</div>;
  }

  return (
    <div>
      {replies.map((reply, index) => (
        <div key={index} className="reply-box">
          <div className="reply-upper-box">
            <div className="reply-writer-box">
              <div className="reply-id">{reply.userLoginId}</div>
              <div className="reply-date">{reply.createdAt}</div>
            </div>

            <div className="reply-edit-btns">
              <button className="reply-edit-btn">수정</button>
              <button className="reply-delete-btn">삭제</button>
            </div>
          </div>

          <div className="reply-content">{reply.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewReply;
