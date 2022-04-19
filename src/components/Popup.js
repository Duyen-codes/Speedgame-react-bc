import React from "react";
import styles from "./Popup.module.css";

const Popup = (props) => {
  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <button className={styles["close-modal-btn"]} onClick={props.onClick}>
          X
        </button>
        <p className="result">Your final score is: {props.score}</p>

        <p className="message">{props.message}</p>
      </div>
    </div>
  );
};

export default Popup;
