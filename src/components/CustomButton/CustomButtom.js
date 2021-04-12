import React from "react";
import "./CustomButton.css";

const CustomButton = (props) => {
  return (
    <button style={{ ...props.styles, background: props.color }} onClick={props.onClickDo} className="custom__button">
      {props.title}
    </button>
  );
};

export default CustomButton;
