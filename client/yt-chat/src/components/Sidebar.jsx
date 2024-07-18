// Sidebar.js
import React from "react";
import Branding from "./Branding";
import History from "./History";
import ProfileButton from "./ProfileButton";

function Sidebar() {
  return (
    <div className="sidebar">
      <Branding />
      <History />
      <ProfileButton />
    </div>
  );
}

export default Sidebar;
