import React, { useState } from "react";
import "./ReviewPage.css";
import { svgCollection } from "../../constants/svgCollection";
import { ReactSVG } from "react-svg";
import { post } from "../../utils/api";

const svg = svgCollection;

const ReplyWriter = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);

  const toggleInputVisible = () => {
    setIsInputVisible(!isInputVisible);
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
          <input type="text" className="reply-input-form" />
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
      )}
    </div>
  );
};

export default ReplyWriter;
<div className="reply-writer-title">댓글 작성</div>;
