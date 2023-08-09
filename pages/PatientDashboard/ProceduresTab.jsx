// ProceduresTab.js
import React from "react";

const ProceduresTab = ({ procedures }) => {
  return (
    <div className="tab-content">
      <h3>Procedures</h3>
      <ul>
        {procedures.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProceduresTab;
