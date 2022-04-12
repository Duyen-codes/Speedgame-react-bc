import react, { Component } from "react";
import styles from "./App.module.css";

import Button from "./components/Button";
import Circle from "./components/Circle";
import Popup from "./components/Popup";

import { circles } from "./circles";

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

class App extends Component {
  state = {
    score: 0,
    current: 0,
    showGameOver: false,
  };

  timer = "";

  circleClickHandler = (i) => {
    this.setState({ score: this.state.score + 1 });
  };

  nextCircle = () => {
    let nextActive;
    do {
      nextActive = getRndInteger(0, 3);
    } while (nextActive === this.state.current);
    this.setState({ current: nextActive });
    this.timer = setTimeout(this.nextCircle, 1000);
    console.log("nextActive: ", nextActive);
  };

  startHandler = () => {
    this.nextCircle();
    console.log("startHandler");
  };

  stopHandler = () => {
    console.log("stopHandler");
    clearTimeout(this.timer);
    this.setState({ showGameOver: true });
  };

  closeHandler = () => {
    this.setState({ showGameOver: false, score: 0, current: -1 });
  };

  render() {
    return (
      <div className={styles.App}>
        <div>
          <h1>Speedgame</h1>
          <p>Your score: {this.state.score}</p>
        </div>

        <div className={styles.circles}>
          {circles.map((_, index) => (
            <Circle
              key={index}
              id={index}
              click={() => this.circleClickHandler(index)}
              active={this.state.current === index}
            />
          ))}
        </div>

        <div className={styles.buttons}>
          <Button click={this.startHandler}>Start game</Button>
          <Button click={this.stopHandler}>End game</Button>
        </div>

        {this.state.showGameOver && (
          <Popup score={this.state.score} onClick={this.closeHandler} />
        )}
      </div>
    );
  }
}

export default App;
