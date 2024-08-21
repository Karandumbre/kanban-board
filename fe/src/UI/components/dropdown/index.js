import React, { useState } from "react";
import { MoreHorizontal } from "react-feather";

import "./style.css";

export const Dropdown = ({ options, onClick, className }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleToggle = () => {
    setShowDropdown((prevValue) => !prevValue);
  };

  return (
    <>
      <MoreHorizontal onClick={handleToggle} />
      {showDropdown && (
        <div className={`dropdown custom-scroll ${className || ""}`}>
          {options.map((option) => {
            return <p onClick={() => onClick(option.data)}>{option.label}</p>;
          })}
        </div>
      )}
    </>
  );
};
