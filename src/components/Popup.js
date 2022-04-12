import React from "react";
import styles from "./Popup.module.css";

const Popup = () => {
  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <button className={styles["close-modal-btn"]}>X close</button>
        <p className="result">Your final score is 0</p>
        <p className="message">You have done a great job</p>
      </div>
    </div>
  );
};

export default Popup;
