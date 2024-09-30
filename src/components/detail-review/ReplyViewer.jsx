import React from "react";
import "./DetailReviewPage.css";
import useReplyViewer from "../../hooks/useReplyViewer";
import { formatDate } from "../../utils/formatDate";
import ReplyWriter from "./ReplyWriter";

const ReplyViewer = ({ reviewId }) => {
  const { replies, loading, error, deleteReplies, refreshReplies } =
    useReplyViewer(reviewId);

  if (loading) {
    return <div>Loading replies...</div>;
  }

  if (error) {
    return <div>댓글 가져오기 실패: {error.message}</div>;
  }

  const deleteRepliesHandle = async (replyId) => {
    try {
      await deleteReplies(replyId);
      console.log(`Reply with ID ${replyId} deleted successfully`);
    } catch (error) {
      console.error("댓글 삭제에 실패했습니다:", error);
    }
  };

  return (
    <div>
      {replies.map((reply, index) => (
        <div key={reply.replyId || index} className="reply-box">
          <div className="reply-upper-box">
            <div className="reply-writer-box">
              <div className="reply-id">{reply.userLoginId}</div>
              <div className="reply-date">{formatDate(reply.createdAt)}</div>
            </div>

            <div className="reply-edit-btns">
              <button
                className="reply-delete-btn"
                onClick={() => deleteRepliesHandle(reply.id)}
              >
                삭제
              </button>
            </div>
          </div>
          <div className="reply-content">{reply.comment}</div>
        </div>
      ))}
      <ReplyWriter reviewId={reviewId} onReplySubmit={refreshReplies} />
    </div>
  );
};

export default ReplyViewer;
