import React from "react";

const AllergiesTab = ({ allergies }) => {
  return (
    <div className="tab-content">
      <h3>Allergies</h3>
      {allergies.map((allergy, index) => (
        <div className="allergy-item" key={index}>
          <p>Allergen Name: {allergy.allergenName}</p>
          <p>Severity: {allergy.severity}</p>
        </div>
      ))}
    </div>
  );
};

export default AllergiesTab;
