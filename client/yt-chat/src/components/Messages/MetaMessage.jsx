// MetaMessage.js
import React from "react";
import avt1 from "../../assets/images/avt1.png"; // Import avt1 image
import avt2 from "../../assets/images/avt2.png";

import MetadataItem from "./MetadataItem";
import KeywordPill from "./KeywordPill";
import {
  capitalizeFirstLetter,
  formatDuration,
  formatDate,
  formatCount,
  truncateTitle,
} from "../../utils/helpers";
function MetaMessage({ message }) {
  const keywords = message.keywords
    .split(",")
    .map((keyword) => capitalizeFirstLetter(keyword.trim()));

  return (
    <div className={`message ${message.sender}`}>
      <div>
        <img
          className="avatar"
          src={message.sender === "mine" ? avt2 : avt1}
          alt="Avatar"
        />
      </div>
      <div className="message-text">
        <h4 className="sender">{message.sender === "mine" ? "You" : "Bot"}</h4>
        {message.metadata && (
          <>
            <div className="message-container">
              <div className="content-container">
                <div className="thumbnail-container">
                  <img
                    className="thumbnail"
                    src={message.metadata.thumbnail_url}
                    alt="Thumbnail"
                  />
                </div>
                <div className="metadata">
                  <h4 className="title">
                    {truncateTitle(message.metadata.title)}
                  </h4>
                  <MetadataItem
                    icon={"calendar"}
                    value={formatDate(message.metadata.publish_date)}
                    color="#1abc9c"
                  />
                  <MetadataItem
                    icon={"user-o"}
                    value={message.metadata.author}
                    color="#3498db"
                  />
                  <br />
                  <MetadataItem
                    icon={"eye"}
                    value={formatCount(message.metadata.view_count)}
                    color="#e67e22"
                  />
                  <MetadataItem
                    icon={"clock-o"}
                    value={formatDuration(message.metadata.length)}
                    color="#9b59b6"
                  />
                </div>
              </div>
              <div className="message-content">
                <span>{message.text}</span>
              </div>
            </div>
            <div className="keywords-container">
              {keywords.map((keyword, index) => (
                <KeywordPill key={index} value={keyword} color="#ff4d4d" />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MetaMessage;
