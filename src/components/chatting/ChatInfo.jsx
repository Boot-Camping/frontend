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
          <li>캠퍼들끼리 자유롭게 정보와 팁을 나누는 공간입니다</li>
          <li>캠핑의 즐거움을 함께 나누세요!</li>
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
