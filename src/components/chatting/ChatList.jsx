import React, { useEffect, useState } from "react";
import "./ChatList.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import ChatInfo from "./ChatInfo";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { get } from "../../utils/api";
import EmptyContent from "../common/EmptyContent";
import { relativeDate } from "../../utils/relativeDate";

const ChatList = ({
  isOpen,
  setJoin,
  joinHandle,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) => {
  const { accessToken } = getUserIdFromToken();
  const [chatListData, setChatListData] = useState([]);

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
      setErrorMessage(errorMessage);
    }
  };

  useEffect(() => {
    if (isOpen) {
      getChatListData();
    }
  }, [isOpen, accessToken]);

  return (
    <div className="chat-list-wrap">
      <div className="chat-list-title-wrap">
        <div className="chat-list-title">채팅목록</div>

        <ChatInfo
          setJoin={setJoin}
          joinHandle={joinHandle}
          getChatListData={getChatListData}
        />
      </div>

      <div className="chat-lists">
        {chatListData.length > 0
          ? chatListData.map((data, index) => (
              <div
                className="chat-list"
                key={`chat-list${index + 1}`}
                onClick={() =>
                  joinHandle(data.id, data.name, data.createdBy, data.joinedBy)
                }
              >
                <div className="chat-user-wrap">
                  <ReactSVG
                    src={
                      data.joinedBy
                        ? svgCollection.users
                        : svgCollection.userImg
                    }
                    className={`chat-user-img ${
                      data.joinedBy ? "chat-users-img" : ""
                    }`}
                  />
                  <div className="chat-name-wrap">
                    <div>{data.name}</div>
                    <div className="chat-date">
                      {relativeDate(data.createdAt)}
                    </div>
                  </div>
                </div>

                <div className="chat-by">
                  <div>{data.createdBy}</div>
                  <div>{data.joinedBy}</div>
                </div>
              </div>
            ))
          : errorMessage && (
              <EmptyContent errorMessage={errorMessage} error={error} />
            )}
      </div>
    </div>
  );
};

export default ChatList;
