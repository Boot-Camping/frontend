import React from "react";
import { mockReviewData } from "../../constants/mockReviewData";
import "./ReviewPage.css";
import { get } from "../../utils/Api";

const ReviewReply = () => {
  return (
    <div>
      {mockReviewData.map((review, index) => (
        <div key={index} className="reply-box">
          <div className="reply-upper-box">
            <div className="reply-writer-box">
              <div className="reply-id">{review.replyId}</div>
              <div className="reply-date">{review.replyCreatedAt}</div>
            </div>

            <div className="reply-edit-btns">
              <button className="reply-edit-btn">수정</button>
              <button className="reply-delete-btn">삭제</button>
            </div>
          </div>

          <div className="reply-content">{review.replyContent}</div>
        </div>
      ))}
    </div>
  );
};

export default ReviewReply;
