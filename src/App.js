import React, { Component } from "react";
import styles from "./App.module.css";

import Button from "./components/Button";
import Circle from "./components/Circle";
import Popup from "./components/Popup";

// import { circles } from "./circles";
import startMusic from "./assets/sounds/sound-track.mp3";
import stopMusic from "./assets/sounds/gameover.mp3";
import click from "./assets/sounds/pen-clicking.mp3";

let clickSound = new Audio(click);
let startSound = new Audio(startMusic);
let stopSound = new Audio(stopMusic);

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

class App extends Component {
  state = {
    score: 0,
    current: -1,
    showGameOver: false,
    pace: 1500,
    rounds: 0,
    gameOn: false,
    circles: [],
  };

  timer = null;

  levelHandler(level) {
    console.log("clicked", level);

    switch (level) {
      case "easy":
        this.setState({ circles: [0, 0, 0] });

        console.log("switch easy");
        break;
      case "medium":
        this.setState({ circles: [0, 0, 0, 0] });
        console.log("switch medium");
        break;
      case "hard":
        this.setState({ circles: [0, 0, 0, 0, 0] });
        break;
      default:
        return null;
    }
  }

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      clickSound.currentTime = 0;
    }
  };

  circleClickHandler = (i) => {
    this.clickPlay();
    if (this.state.current !== i) {
      this.stopHandler();
      return;
    }
    this.setState({
      score: this.state.score + 10,
      rounds: this.state.rounds - 1,
    });
  };

  nextCircle = () => {
    if (this.state.rounds >= 3) {
      this.stopHandler();
      return;
    }

    let nextActive;

    do {
      nextActive = getRndInteger(0, this.state.circles.length);
    } while (nextActive === this.state.current);
    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    this.timer = setTimeout(this.nextCircle, this.state.pace);
  };

  startHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.nextCircle();
    this.setState({ gameOn: true });
  };

  stopHandler = () => {
    startSound.pause();
    stopSound.play();
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gameOn: false });
  };

  closeHandler = () => {
    window.location.reload();
    this.setState({ showGameOver: false, score: 0, current: -1, rounds: 0 });
  };

  render() {
    let message = "";
    if (this.state.score <= 50) {
      message = "You can do better!";
    } else if (this.state.score > 50 && this.state.score <= 100) {
      message = "Well done";
    } else {
      message = "Great job!";
    }
    return (
      <div className={styles.App}>
        <div>
          <h1>Speedgame</h1>
          <p>Your score: {this.state.score}</p>
        </div>

        <div>
          <h2>Choose game level</h2>
          <button onClick={() => this.levelHandler("easy")}>Easy</button>
          <button onClick={() => this.levelHandler("medium")}>Medium</button>
          <button onClick={() => this.levelHandler("hard")}>Hard</button>
        </div>
        <div className={styles.circles}>
          {this.state.circles.map((_, index) => (
            <Circle
              key={index}
              id={index}
              click={() => this.circleClickHandler(index)}
              active={this.state.current === index}
              disabled={this.state.gameOn}
            />
          ))}
        </div>

        <div className={styles.buttons}>
          {!this.state.gameOn && (
            <Button click={this.startHandler}>Start</Button>
          )}
          {this.state.gameOn && <Button click={this.stopHandler}>End</Button>}
        </div>

        {this.state.showGameOver && (
          <Popup
            score={this.state.score}
            onClick={this.closeHandler}
            message={message}
          />
        )}
      </div>
    );
  }
}

export default App;
