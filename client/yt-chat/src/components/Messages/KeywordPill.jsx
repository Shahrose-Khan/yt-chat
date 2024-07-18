import React from "react";

const KeywordPill = ({ value, color }) => (
  <div className="keyword-item">
    <span className="abc" style={{ color: "#545454" }}>
      &gt;&nbsp;
    </span>
    <span className="keyword-value">{value}</span>
  </div>
);

export default KeywordPill;
