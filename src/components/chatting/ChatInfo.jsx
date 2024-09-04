import React from "react";
import "./ChatInfo.css";
import logoImg from "../../assets/image/camping.png";
import ChatCreate from "./ChatCreate";

const ChatInfo = ({ setJoin, joinHandle, getChatListData }) => {
  return (
    <div className="chat-info-wrap">
      <div className="chat-info">
        <div className="chat-admin-icon">
          <img src={logoImg} />
        </div>
        <ul>
          <li>
            안녕하세요! <span>부트캠핑</span>입니다
          </li>
          <li>궁금하신 점이 있으시면 문의해 주세요</li>
        </ul>
      </div>
      <ChatCreate
        setJoin={setJoin}
        joinHandle={joinHandle}
        getChatListData={getChatListData}
      />
    </div>
  );
};

export default ChatInfo;
