import React from "react";
import "./ChatIcon.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";

const ChatIcon = ({ toggleChat }) => {
  return (
    <div className="chat-icon" onClick={toggleChat}>
      <ReactSVG src={svgCollection.chat} />
    </div>
  );
};

export default ChatIcon;
