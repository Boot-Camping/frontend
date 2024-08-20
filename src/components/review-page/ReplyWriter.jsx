import React from "react";
import "./ReviewPage.css";
import { svgCollection } from "../../constants/svgCollection";
import { ReactSVG } from "react-svg";

const svg = svgCollection;

const ReplyWriter = () => {
  return (
    <div className="reply-writer-box">
      <div className="reply-writer-upper">
        <div className="reply-writer-title">댓글 작성</div>
        <input type="text" className="reply-input-box" />
      </div>

      <div className="reply-writer-btns">
        <button className="reply-complete-btn">
          <ReactSVG
            src={svg.pencilSquare}
            alt="작성완료"
            className="pencil-icon"
          />
          작성완료
        </button>

        <button className="reply-cancle-btn">
          <ReactSVG src={svg.xMark} alt="취소" className="xMark-icon" />
          작성취소
        </button>
      </div>
    </div>
  );
};

export default ReplyWriter;
<div className="reply-writer-title">댓글 작성</div>;
