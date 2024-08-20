import React from "react";
import "./ReviewPage.css";

const ReviewReply = () => {
  return (
    <div className="reply-box">
      <div className="reply-upper-box">
        <div className="reply-writer-box">
          <div className="reply-id">Reply Id</div>
          <div className="reply-date">2024-08-20</div>
        </div>

        <div className="reply-edit-btns">
          <button className="reply-edit-btn">수정</button>
          <button className="reply-delete-btn">삭제</button>
        </div>
      </div>

      <div className="reply-content">
        비소식에 황급히 철수하셔서 아쉬웠어요 담에는 화창한 날씨에 제대로
        즐기고가세요~^^ 방문해 주셔서 감사합니다.
      </div>
    </div>
  );
};

export default ReviewReply;
