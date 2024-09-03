import React, { useEffect, useState } from "react";
import "./ChatList.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import ChatInfo from "./ChatInfo";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { get } from "../../utils/api";
import EmptyContent from "../common/EmptyContent";
import { relativeDate } from "../../utils/relativeDate";

const ChatList = () => {
  const { accessToken } = getUserIdFromToken();
  const [chatListData, setChatListData] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const getChatListData = async () => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      const response = await get("chatRooms", customHeaders);
      const sortedData = response.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setChatListData(sortedData);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getChatListData();
  }, []);

  return (
    <div
      className={`chat-list-wrap`}
    >
      <div className="chat-list-title">채팅목록</div>

      <ChatInfo />

      {errorMessage && (
        <EmptyContent errorMessage={errorMessage} error={error} />
      )}

      {chatListData.map((data, index) => (
        <div className="chat-list" key={`chat-list${index + 1}`}>
          <div className="chat-user-wrap">
            <ReactSVG src={svgCollection.userImg} className="chat-user-img" />
            <div>{data.joinedBy === "admin" ? "부트캠핑" : data.joinedBy}</div>
          </div>
          <div className="chat-date">{relativeDate(data.createdAt)}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
