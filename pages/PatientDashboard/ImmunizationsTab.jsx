// ImmunizationsTab.js
import React from "react";

const ImmunizationsTab = ({ immunizations }) => {
  return (
    <div className="tab-content">
      <h3>Immunizations</h3>
      <ul>
        {immunizations.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ImmunizationsTab;
