import React from "react";
import "./PasswordStrength.css";

const calculateStrength = (password) => {
  let strength = 0;

  if (password.length >= 6) strength++;
  if (password.match(/[A-Z]/) && password.match(/[a-z]/)) strength++;
  if (password.match(/\d/)) strength++;
  if (password.match(/[^A-Za-z0-9]/)) strength++;

  if (strength <= 1) return "weak";
  else if (strength === 2 || strength === 3) return "medium";
  else return "strong";
};

const getLabel = (strength) => {
  switch (strength) {
    case "weak":
      return "Weak";
    case "medium":
      return "Medium";
    case "strong":
      return "Strong";
    default:
      return "";
  }
};

const getColorClass = (strength) => {
  switch (strength) {
    case "weak":
      return "red";
    case "medium":
      return "orange";
    case "strong":
      return "green";
    default:
      return "";
  }
};

const PasswordStrength = ({ password }) => {
  const strength = calculateStrength(password);
  const label = getLabel(strength);
  const colorClass = getColorClass(strength);

  return (
    <div className="password-strength-container">
      {/* Bars */}
      <div className="password-strength-bars">
        <div className={`bar ${strength === "weak" ? "active red" : ""}`}></div>
        <div className={`bar ${strength === "medium" ? "active orange" : ""}`}></div>
        <div className={`bar ${strength === "strong" ? "active green" : ""}`}></div>
      </div>

      {/* Text label BELOW bars */}
      {password && (
        <div className={`strength-label ${colorClass}`}>
          Strength: {label}
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;
