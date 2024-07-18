import React, { useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "./Messages/Message"; // Import Message component
import MetaMessage from "./Messages/MetaMessage"; // Import MetaMessage component

function ChatHistory() {
  const messages = useSelector((state) => state.message.messages);
  const chatHistoryRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  // Scroll to the bottom of the chat history whenever messages change
  useEffect(() => {
    if (isAtBottom) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = chatHistoryRef.current;
    setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 50);
    console.log(scrollTop, clientHeight, scrollHeight);
  };

  const handleGoToBottom = () => {
    chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    setIsAtBottom(true);
  };

  return (
    <div className="chat-history" ref={chatHistoryRef} onScroll={handleScroll}>
      {messages.map((message, index) =>
        message.metadata ? (
          <MetaMessage key={index} message={message} />
        ) : (
          <Message key={index} message={message} />
        )
      )}

      {!isAtBottom && (
        <div className="nav-icon btn-goto-bottom" onClick={handleGoToBottom}>
          <i className="fa fa-arrow-down"></i>
          <span className="tooltip-text tooltip-right">Goto Bottom</span>
        </div>
      )}
    </div>
  );
}

export default ChatHistory;
