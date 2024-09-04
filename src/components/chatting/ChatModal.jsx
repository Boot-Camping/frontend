import React, { useState } from "react";
import "./ChatModal.css";
import { createPortal } from "react-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";

const ChatModal = ({ isOpen, animating, onClose }) => {
  const [join, setJoin] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const joinHandle = (id) => {
    setCurrentId(id);
    setJoin(true);
  };

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
          {!join ? (
            <ChatList
              isOpen={isOpen}
              setJoin={setJoin}
              joinHandle={joinHandle}
              error={error}
              setError={setError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          ) : (
            <ChatRoom
              setJoin={setJoin}
              currentId={currentId}
              error={error}
              setError={setError}
              errorMessage={errorMessage}
              setErrorMessage={setErrorMessage}
            />
          )}
        </div>,
        document.getElementById("modal-root")
      )}
    </>
  );
};

export default ChatModal;
