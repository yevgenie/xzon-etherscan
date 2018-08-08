import * as React from "react";
import "./SubmitButton.css";

export const SubmitButton = (props: {
  label: string;
  onClick: () => any;
  disabled?: boolean;
  style?: any;
}) => {
  const style = {
    ...props.style
  }
  if (props.disabled) {
    style.backgroundColor = '#bdc3c7';
  }
  return (
    <button
      disabled={props.disabled}
      className="submitButton"
      style={style}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
