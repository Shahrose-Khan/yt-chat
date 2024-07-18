import React from "react";

function AboutModal() {
  return (
    <div>
      <h2>About Us</h2>
      <div className="divider"></div>

      <p>
        This is a YouTube chat application that allows users to chat with
        youtube video transcript and in real-time. Feel free to explore the
        application and start chatting!
      </p>
      <h3>Contact Information</h3>
      <p>If you have any questions or feedback, please let us know.</p>

      <p>
        <i className="fa fa-envelope"></i> example@example.com
      </p>

      <p>
        <i className="fa fa-phone"></i> 123-456-7890
      </p>
      <span className="version">v2.0.2</span>
    </div>
  );
}

export default AboutModal;
