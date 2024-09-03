import React, { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatList from "./ChatList";

const Chatting = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [animating, setAnimating] = useState(false);

  const toggleChat = () => {
    if (isChatOpen) {
      setAnimating(true);
      setTimeout(() => {
        setIsChatOpen(false);
        setAnimating(false);
      }, 500);
    } else {
      setIsChatOpen(true);
    }
  };

  return (
    <>
      <ChatIcon toggleChat={toggleChat} />
      <ChatList
        isOpen={isChatOpen}
        animating={animating}
        onClose={toggleChat}
      />
    </>
  );
};

export default Chatting;
