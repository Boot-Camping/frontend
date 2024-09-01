import React, { useState } from "react";
import "./DetailReviewPage.css";
import { svgCollection } from "../../constants/svgCollection";
import { ReactSVG } from "react-svg";
import replyWriterUtil from "../../utils/replyWriterUtil";

const svg = svgCollection;

const ReplyWriter = ({ reviewId, onReplySubmit }) => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [error, setError] = useState(null);

  const toggleInputVisible = () => {
    setIsInputVisible(!isInputVisible);
  };

  const submitReplyHandle = async () => {
    if (!replyContent.trim()) {
      setError("댓글 내용을 입력해 주세요.");
      return;
    }

    try {
      await replyWriterUtil(reviewId, replyContent);
      setReplyContent("");
      setIsInputVisible(false);

      if (onReplySubmit) {
        onReplySubmit(); // 댓글 작성 후 새로고침 호출
      }
    } catch (error) {
      setError("댓글 작성에 실패했습니다");
    }
  };

  return (
    <div className="reply-writer-box">
      <div className="reply-writer-title" onClick={toggleInputVisible}>
        <ReactSVG
          src={svg.pencilSolid}
          alt="리뷰작성"
          className="reply-writer-title-icon"
        />
        댓글 작성
      </div>

      {isInputVisible && (
        <div className="reply-input-box">
          <input
            type="text"
            className="reply-input-form"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <div className="reply-writer-btns">
            <button className="reply-complete-btn" onClick={submitReplyHandle}>
              <ReactSVG
                src={svg.pencilSquare}
                alt="작성완료"
                className="pencil-icon"
              />
              작성완료
            </button>

            <button
              className="reply-cancel-btn"
              onClick={() => setIsInputVisible(false)}
            >
              <ReactSVG src={svg.xMark} alt="취소" className="xMark-icon" />
              작성취소
            </button>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default ReplyWriter;
