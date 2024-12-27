import React from "react";
import "./Dashboard.css";

interface DeviceProps {
  icon: JSX.Element;
  name: string;
  initialState: boolean;
  onClick: () => void; // Nouvelle prop pour gérer le clic
  unit?: string;
}

const Device: React.FC<DeviceProps> = ({ icon, name, initialState, onClick, unit }) => {
  return (
    <div className="composant">
      {/* Icône du composant */}
      <span className="device" onClick={onClick}>
  {React.cloneElement(icon, { 
    color: 
      initialState || ["Gaz", "Température", "Humidity",].includes(name)
        ? "#FFD700" 
        : "#808080" 
  })}
</span>

      {/* État du composant */}
      <div className="device-status">
        <p>{name}</p>
        <p>
          {initialState
            ? name === "Port"
              ? ""
              : name === "Température" || name === "Gaz"
              ? "Active"
              : "Allumé"
            : name === "Port"
            ? ""
            : name === "Température" || name === "Gaz"
            ? ""
            : ""}
          {unit && `/ ${unit}`}
        </p>
      </div>
    </div>
  );
};

export default Device;
