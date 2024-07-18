import React, { useState, useEffect } from "react";

import Modal from "../Modals/Modal";
import SettingsModal from "../Modals/SettingsModal";
import ShortcutsModal from "../Modals/ShortcutsModal";
import AboutModal from "../Modals/AboutModal";

function SettingsNav() {
  const [isAboutModalOpen, setAboutModalOpen] = useState(false);
  const [isShortcutsModalOpen, setShortcutsModalOpen] = useState(false);
  const [isSettingsModalOpen, setSettingsModalOpen] = useState(false);

  useEffect(() => {
    if (isAboutModalOpen || isShortcutsModalOpen || isSettingsModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isAboutModalOpen, isShortcutsModalOpen, isSettingsModalOpen]);

  const handleAboutClick = () => {
    setAboutModalOpen(true);
  };

  const handleShortcutsClick = () => {
    setShortcutsModalOpen(true);
  };

  const handleSettingsClick = () => {
    setSettingsModalOpen(true);
  };

  const handleCloseModal = () => {
    setAboutModalOpen(false);
    setShortcutsModalOpen(false);
    setSettingsModalOpen(false);
  };
  return (
    <>
      <div className="nav-icons">
        <div className="nav-icon" onClick={handleSettingsClick}>
          <i className="fa fa-cog"></i>
          <span className="tooltip-text">Settings</span>
        </div>

        <div className="nav-icon" onClick={handleShortcutsClick}>
          <i className="fa fa-keyboard-o"></i>
          <span className="tooltip-text">Shortcuts</span>
        </div>
        <div className="nav-icon" onClick={handleAboutClick}>
          <i className="fa fa-info"></i>
          <span className="tooltip-text">About Us</span>
        </div>
      </div>
      <Modal isOpen={isSettingsModalOpen} onClose={handleCloseModal}>
        <SettingsModal />
      </Modal>
      <Modal isOpen={isShortcutsModalOpen} onClose={handleCloseModal}>
        <ShortcutsModal />
      </Modal>
      <Modal isOpen={isAboutModalOpen} onClose={handleCloseModal}>
        <AboutModal />
      </Modal>
    </>
  );
}

export default SettingsNav;
