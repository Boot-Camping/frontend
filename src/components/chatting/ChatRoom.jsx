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
      `${WEBSOCKET_URL}/chat?userId=${userId}&chatId=${currentId}`
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

  const sendMessageHandle = () => {
    if (message.trim()) {
      const payload = JSON.stringify({
        chatRoomId: currentId,
        content: message,
      });

      socket.current.send(payload);
      setMessage("");
    }
  };

  return (
    <div className="chat-room-wrap">
      <ReactSVG
        src={svgCollection.prev}
        className="chat-room-prev"
        onClick={outHandle}
      />

      {errorMessage && <EmptyContent errorMessage={errorMessage} error={error} />}

      {chatStart && (
        <div className="chat-room-open">
          <div className="chat-message-wrap">
            {messages.map((msg, index) => (
              <div key={`message${index + 1}`}>{msg.content}</div>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="메시지를 입력하세요"
          />
          <button onClick={sendMessageHandle}>전송</button>
          <button onClick={outHandle}>채팅 종료</button>
        </div>
      )}
    </div>
  );
};

export default ChatRoom;
