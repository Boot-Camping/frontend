import React, { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatModal from "./ChatModal";
import { getUserIdFromToken } from "../../utils/getUserIdFromToken";
import { useNavigate } from "react-router-dom";

const Chatting = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  const toggleChat = () => {
    const { accessToken } = getUserIdFromToken();

    if (accessToken) {
      if (isChatOpen) {
        setAnimating(true);
        setTimeout(() => {
          setIsChatOpen(false);
          setAnimating(false);
        }, 500);
      } else {
        setIsChatOpen(true);
      }
    } else {
      navigate("/login");
			setIsChatOpen(false);
    }
  };

  return (
    <>
      <ChatIcon toggleChat={toggleChat} />
      <ChatModal
        isOpen={isChatOpen}
        animating={animating}
        onClose={toggleChat}
      />
    </>
  );
};

export default Chatting;
