import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const handleBackgroundClick = (e) => {
    onClose();
  };

  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content" onClick={handleContentClick}>
        <span className="close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
