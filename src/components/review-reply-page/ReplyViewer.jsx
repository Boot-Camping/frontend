import React from "react";
import "./ReviewPage.css";
import useReplyViewer from "../../hooks/useReplyViewer";
import { formatDate } from "../../utils/formatDate";

const ReplyViewer = ({ reviewId }) => {
  const { replies, loading, error, deleteReply } = useReplyViewer(reviewId);

  if (loading) {
    return <div>Loading replies...</div>;
  }

  if (error) {
    return <div>댓글 가져오기 실패: {error.message}</div>;
  }

  const deleteReplyHandle = async (replyId) => {
    console.log("삭제하려는 댓글 id:", replyId);
    try {
      await deleteReply(replyId);
      console.log(`Reply with ID ${replyId} deleted successfully`);
    } catch (error) {
      console.error("댓글 삭제에 실패했습니다:", error);
    }
  };

  return (
    <div>
      {replies.map((reply) => (
        <div key={reply.replyId} className="reply-box">
          <div className="reply-upper-box">
            <div className="reply-writer-box">
              <div className="reply-id">{reply.userLoginId}</div>
              <div className="reply-date">{formatDate(reply.createdAt)}</div>
            </div>

            <div className="reply-edit-btns">
              <button
                className="reply-delete-btn"
                onClick={() => deleteReplyHandle(reply.id)}
              >
                삭제
              </button>
            </div>
          </div>

          <div className="reply-content">{reply.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default ReplyViewer;
