import React from "react";

function Bio() {
  const userImage =
    "https://lh3.googleusercontent.com/a/AGNmyxYcQ6KItBABjbwdEf17Ru9T2GU7ZVeOUN0xgoDy=s96-c";
  return (
    <div className="bio-container">
      <h1>User Bio</h1>
      <img src={userImage} alt="Profile" className="profile-picture" />
      <div className="bio-text">
        <p className="bio-box">Text box 1</p>
        <p className="bio-box">Text box 2</p>
        <p className="bio-box">Text box 3</p>
      </div>
    </div>
  );
}

export default Bio;
