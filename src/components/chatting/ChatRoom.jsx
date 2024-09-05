import React, { useEffect, useRef, useState } from "react";
import "./ChatRoom.css";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { post } from "../../utils/api";
import EmptyContent from "../common/EmptyContent";

const ChatRoom = ({
  setJoin,
  currentId,
  chatName,
  createdBy,
  joinedBy,
  error,
  setError,
  errorMessage,
  setErrorMessage,
}) => {
  const { accessToken, userId } = getUserIdFromToken();
  const socket = useRef(null);
  const [chatStart, setChatStart] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const outHandle = () => {
    setJoin(false);
    setError(false);
    setErrorMessage("");
    if (socket.current) {
      socket.current.close();
    }
  };

  const chatJoinHandle = async () => {
    const customHeaders = {
      Authorization: accessToken,
    };

    try {
      const response = await post(
        `chatRooms/join/${currentId}/user/${userId}`,
        {},
        customHeaders
      );
      console.log(response);
    } catch (error) {
      setError(true);
      setErrorMessage(error.message);
    }
  };

  const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

  useEffect(() => {
    chatJoinHandle();

    socket.current = new WebSocket(
      `ws://43.203.54.145:8080/chat?userId=${userId}&chatId=${currentId}`
    );

    socket.current.onopen = () => {
      console.log("웹소켓 연결 성공");
      setChatStart(true);
    };

    socket.current.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, messageData]);
      console.log("받은 메시지: ", messageData);
    };

    socket.current.onerror = (error) => {
      console.error("웹소켓 오류: ", error);
      setError(true);
      setErrorMessage("Message: 웹소켓 연결 오류");
    };

    return () => {
      if (socket.current) {
        socket.current.close();
        console.log("웹소켓 연결 종료");
      }
    };
  }, [currentId]);

  const sendMessageHandle = (event) => {
    event.preventDefault();

    if (message.trim()) {
      const payload = JSON.stringify({
        chatRoomId: currentId,
        content: message,
      });

      socket.current.send(payload);
      setMessage("");
    }
  };

  const formatIme = (sentAt) => {
    const date = new Date(
      sentAt[0],
      sentAt[1] - 1,
      sentAt[2],
      sentAt[3],
      sentAt[4]
    );
    return `${date.getHours()}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;
  };

  const groupMessagesByDate = () => {
    const groupedMessages = {};
    messages.forEach((msg) => {
      const dateKey = `${msg.sentAt[0]}-${msg.sentAt[1]}-${msg.sentAt[2]}`;
      if (!groupedMessages[dateKey]) {
        groupedMessages[dateKey] = [];
      }
      groupedMessages[dateKey].push(msg);
    });
    return groupedMessages;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <div className="chat-room-wrap">
      <div className="chat-room-title-wrap">
        <div className="chat-room-title">
          <ReactSVG
            src={svgCollection.prev}
            className="chat-room-prev"
            onClick={outHandle}
          />
          <div>{chatName}</div>
        </div>

        {errorMessage && (
          <EmptyContent errorMessage={errorMessage} error={error} />
        )}
      </div>

      {chatStart && (
        <div className="chat-room-open">
          {Object.keys(groupedMessages).map((dateKey) => (
            <div className="chat-message-wrap" key={dateKey}>
              <div className="chat-message-date">
                {dateKey
                  .replace(/-(\d{1,2})$/, "월 $1일")
                  .replace(/-(?=\d)/g, "년 ")}
              </div>
              <div className="chat-messages">
                {groupedMessages[dateKey].map((msg, index) => (
                  <div
                    key={`message${index + 1}`}
                    className={`chat-message ${
                      msg.senderLoginId === createdBy
                        ? ""
                        : "chat-message-right"
                    }`}
                  >
                    <div className="chat-message-writer">
                      {msg.senderLoginId === createdBy ? createdBy : joinedBy}
                    </div>
                    <div className="chat-message-content">{msg.content}</div>
                    <div className="chat-message-time">
                      {formatIme(msg.sentAt)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="chat-send-wrap">
            <form className="chat-input-wrap" onSubmit={sendMessageHandle}>
              <input
                type="text"
                className="chat-input"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="메시지를 입력하세요"
              />
              <button className="chat-send-btn">전송</button>
            </form>
            <button className="chat-finish-btn" onClick={outHandle}>
              채팅 종료
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
