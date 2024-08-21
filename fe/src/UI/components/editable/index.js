import React, { useState } from "react";

import "./style.css";

export const Editable = ({
  state,
  defaultValue,
  onSubmit,
  editClass,
  placeholder,
  text,
  displayClass,
  buttonText,
  closeButton,
}) => {
  const [isEditable, setIsEditable] = useState(state || false);
  const [inputText, setInputText] = useState(defaultValue || "");

  const submission = (e) => {
    e.preventDefault();
    if (inputText && onSubmit) {
      setInputText("");
      onSubmit?.(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className="editable">
      {isEditable ? (
        <form
          className={`editable_edit ${editClass || ""}`}
          onSubmit={submission}
        >
          <input
            type="text"
            className="text-editable-input"
            value={inputText}
            placeholder={placeholder || text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className="editable_edit_footer">
            <button type="submit">{buttonText || "Add"}</button>
            {closeButton}
          </div>
        </form>
      ) : (
        <p
          className={`editable_display ${displayClass || ""}`}
          onClick={() => setIsEditable(true)}
        >
          {text}
        </p>
      )}
    </div>
  );
};
