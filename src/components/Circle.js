import React from "react";
import styles from "./Circle.module.css";

const Circle = (props) => {
  return (
    <div
      className={`${styles.circle} ${props.active ? styles.active : ""}`}
      onClick={props.click}
    >
      {props.id}
    </div>
  );
};
export default Circle;
