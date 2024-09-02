import React from "react";
import "./ChatList.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { createPortal } from "react-dom";

const ChatList = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      {createPortal(
        <div className="chat-list-wrap">
          <ReactSVG
            src={svgCollection.xMark}
            className="chat-close-btn"
            onClick={onClose}
          />
          <div>채팅목록</div>
        </div>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ChatList;
