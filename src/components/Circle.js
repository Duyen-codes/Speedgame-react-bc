import React from "react";
import styles from "./Circle.module.css";

const Circle = (props) => {
  return (
    <div
      style={{ pointerEvents: props.disabled ? "auto" : "none" }}
      className={`${styles.circle} ${props.active ? styles.active : ""}`} // add .active class if circle has active props (in App.js)
      onClick={props.click}
    >
      {props.id}
    </div>
  );
};
export default Circle;
