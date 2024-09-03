import React from "react";
import "./ChatModal.css";
import { createPortal } from "react-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import ChatList from "./ChatList";

const ChatModal = ({ isOpen, animating, onClose }) => {
  return (
    <>
      {createPortal(
        <div
          className={`chat-modal ${isOpen ? "chat-open" : ""} ${
            animating ? "chat-close" : ""
          }`}
        >
          <ReactSVG
            src={svgCollection.xMark}
            className="chat-close-btn"
            onClick={onClose}
          />
          <ChatList />
        </div>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ChatModal;
