import React, { useEffect } from "react";
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

  const outHandle = () => {
    setJoin(false);
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

  useEffect(() => {
    chatJoinHandle();
  }, [currentId]);

  return (
    <div className="chat-room-wrap">
      <ReactSVG src={svgCollection.prev} className="chat-room-prev" onClick={outHandle} />

      {errorMessage && (
        <EmptyContent errorMessage={errorMessage}  />
      )}
    </div>
  );
};

export default ChatRoom;
