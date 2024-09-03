import React from "react";
import "./ChatJoinBtn.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const ChatJoinBtn = () => {
  return (
    <button className="chat-join-btn">
      문의하기 <ReactSVG src={svgCollection.send} className="chat-join-icon" />
    </button>
  );
};

export default ChatJoinBtn;
