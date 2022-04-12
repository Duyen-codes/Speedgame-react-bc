import React from "react";
import styles from "./Circle.module.css";

const Circle = (props) => {
  return (
    <div className={styles.circle} onClick={props.onClick}>
      {props.id}
    </div>
  );
};
export default Circle;
