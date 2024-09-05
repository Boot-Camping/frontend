import React, { useEffect, useState } from "react";
import "./ChatModal.css";
import { createPortal } from "react-dom";
import { ReactSVG } from "react-svg";
import { svgCollection } from "../../constants/svgCollection";
import ChatList from "./ChatList";
import ChatRoom from "./ChatRoom";
import { useLocation } from "react-router-dom";

const ChatModal = ({ isOpen, animating, onClose }) => {
  const [join, setJoin] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const [chatName, setChatName] = useState("");
	const [createdBy, setCreatedBy] = useState("");
	const [joinedBy, setJoinedBy] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const location = useLocation();

  const joinHandle = (id, name, createdBy, joinedBy) => {
    setCurrentId(id);
    setChatName(name);
		setCreatedBy(createdBy);
		setJoinedBy(joinedBy);
    setJoin(true);
  };

  useEffect(() => {
    if (isOpen) {
      onClose;
    }
  }, [onClose, location.pathname, isOpen]);

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
              chatName={chatName}
							createdBy={createdBy}
							joinedBy={joinedBy}
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
