// ChatArea.js
import React, { useState, useEffect, useRef } from "react";
import ChatHistory from "./ChatHistory";
import SettingsNav from "./Navigations/SettingsNav";
import { useSelector, useDispatch } from "react-redux";
import loading from "../assets/images/loading.gif";

import {
  addMessage,
  fetchResponse,
  fetchSummaryResponse,
  handleNewChat,
} from "../features/message/messageSlice";

function ChatArea() {
  const [newMessage, setNewMessage] = useState("");
  const inputRef = useRef(null);

  const dispatch = useDispatch();

  // Get the isLoading state from the Redux store
  const isLoading = useSelector((state) => state.message.isLoading);
  const historyId = useSelector((state) => state.history.selectedHistory);
  const messageLength = useSelector((state) => state.message.messages.length);

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      // Check if the message contains a YouTube video URL
      const youtubeUrlRegex =
        /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
      if (youtubeUrlRegex.test(newMessage)) {
        // Extract the YouTube video URL from the message
        const youtubeUrl = newMessage.match(youtubeUrlRegex)[0];
        // Dispatch an action to handle the YouTube video URL
        dispatch(handleNewChat({ text: youtubeUrl, sender: "mine" }));
        dispatch(fetchSummaryResponse(youtubeUrl));
      } else {
        // If the message does not contain a YouTube video URL, dispatch a regular message
        dispatch(addMessage({ text: newMessage, sender: "mine" }));
        dispatch(fetchResponse({ newMessage, historyId }));
      }
      setNewMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const calculateRows = () => {
    const lines = newMessage.split("\n").length;
    const baseRows = 1;
    const maxRows = 5;
    return Math.min(Math.max(baseRows, lines), maxRows);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "/" && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <SettingsNav />
      <div className="chat-area">
        <ChatHistory />
        <div className="message-box">
          <textarea
            ref={inputRef}
            className="text-input"
            placeholder={
              messageLength === 0
                ? "Enter Youtube Video Link"
                : "Ask Your Question"
            }
            value={newMessage}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
            rows={calculateRows()}
          />
          <button className="send-btn" onClick={handleSendMessage}>
            {isLoading ? (
              <img className="loading" src={loading} alt="Loading..." />
            ) : (
              <i className="fa fa-send-o"></i>
            )}
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatArea;
