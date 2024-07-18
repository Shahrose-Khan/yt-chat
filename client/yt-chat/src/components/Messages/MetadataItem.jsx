import React from "react";

const MetadataItem = ({ icon, value, color }) => (
  <div className="metadata-item card" style={{ color: color }}>
    <i className={`fa fa-${icon}`}></i>
    <span className="metadata-value">{value}</span>
  </div>
);

export default MetadataItem;
