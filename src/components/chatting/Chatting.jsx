import React, { useState } from "react";
import ChatIcon from "./ChatIcon";
import ChatList from "./ChatList";

const Chatting = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen((prev) => !prev);
  };

  return (
    <>
      <ChatIcon toggleChat={toggleChat} />
      <ChatList isOpen={isChatOpen} onClose={toggleChat} />
    </>
  );
};

export default Chatting;
