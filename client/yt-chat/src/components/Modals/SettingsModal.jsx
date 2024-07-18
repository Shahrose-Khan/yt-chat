import React from "react";
import { useState } from "react";

function SettingsModal() {
  const [key, setKey] = useState("");
  const [showKey, setShowKey] = useState(false);

  const handleKeyChange = (event) => {
    setKey(event.target.value);
  };

  const handleShowKey = () => {
    setShowKey(!showKey);
  };

  const handleSetKey = () => {
    // Logic to set the key
  };

  const handleClearKey = () => {
    setKey("");
  };

  const handleCancel = () => {
    // Logic to cancel the modal
  };

  return (
    <div>
      <h2>Settings</h2>
      <div className="divider"></div>

      <p>GPT-Key</p>
      <div className="input-wrapper">
        <input
          type={showKey ? "text" : "password"}
          value={key}
          onChange={handleKeyChange}
          placeholder="Enter Your GPT Key"
          className="gpt-key-input"
        />
        <i
          className={`fa ${
            showKey ? "fa-eye-slash green" : "fa-eye"
          } input-icon`}
          onClick={handleShowKey}
        ></i>
      </div>
      <div className="button-group">
        <button className="clear-key-button" onClick={handleClearKey}>
          Clear Key
        </button>
        <button className="set-key-button" onClick={handleSetKey}>
          Set Key
        </button>
      </div>
    </div>
  );
}

export default SettingsModal;
