import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const userName = "Shahrose Khan";
  const userImage =
    "https://lh3.googleusercontent.com/a/AGNmyxYcQ6KItBABjbwdEf17Ru9T2GU7ZVeOUN0xgoDy=s96-c";

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="profile" onClick={handleClick}>
      <div className="user-profile">
        <div className="flex items-center">
          <img
            className="rounded-full w-10 h-10 mr-4"
            src={userImage}
            alt="User profile"
          />
          <div>{userName}</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileButton;
