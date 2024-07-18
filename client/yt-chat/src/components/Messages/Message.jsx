// Message.js
import React from "react";
import avt1 from "../../assets/images/avt1.png"; // Import avt1 image
import avt2 from "../../assets/images/avt2.png";

function Message({ message }) {
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
        <div className="message-body">
          {message.text.split("\n").map((line, index, arr) => (
            <React.Fragment key={index}>
              {line}
              {index < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Message;
