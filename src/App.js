import React, { Component } from "react";
import styles from "./App.module.css";

import Button from "./components/Button";
import Circle from "./components/Circle";
import Popup from "./components/Popup";
import Footer from "./components/Footer";

import startMusic from "./assets/sounds/sound-track.mp3";
import stopMusic from "./assets/sounds/gameover.mp3";
import click from "./assets/sounds/pen-clicking.mp3";

let clickSound = new Audio(click);
let startSound = new Audio(startMusic);
let stopSound = new Audio(stopMusic);

// generate a random integer
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
    isLevelSet: false,
    topScore: localStorage.getItem("topScore"),
  };

  timer = null;

  levelHandler(level) {
    // Change level state is set
    this.setState({ isLevelSet: true });
    switch (level) {
      case "easy":
        this.setState({ circles: [0, 0, 0] });
        break;
      case "medium":
        this.setState({ circles: [0, 0, 0, 0] });
        break;
      case "hard":
        this.setState({ circles: [0, 0, 0, 0, 0, 0] });
        break;
      default:
        return null;
    }
  }

  clickPlay = () => {
    if (clickSound.paused) {
      clickSound.play();
    } else {
      // set playback of audio to 0 second, which makes it start from the beginning
      clickSound.currentTime = 0;
    }
  };

  // CIRCLE CLICK
  circleClickHandler = (i) => {
    this.clickPlay();
    if (this.state.current !== i) {
      // this.stopGameHandler(); stop game right away when user misclick
      this.setState({ rounds: this.state.rounds + 1 });
      // return; // because if we don't return anything, it will continue infinitely
    } else {
      this.setState({
        score: this.state.score + 10,
        rounds: this.state.rounds - 1,
      });
    }
  };

  roundHandler = () => {
    if (this.state.rounds >= 5) {
      // if player miss more than 5 rounds, game stops
      this.stopGameHandler();
      return;
    }

    let randnum;

    do {
      randnum = getRndInteger(0, this.state.circles.length - 1);
    } while (randnum === this.state.current); // compare newly generated random number with the current one
    this.setState({
      current: randnum,
      pace: this.state.pace * 0.95,
      rounds: this.state.rounds + 1,
    });
    // set timer that waits 1000msc/1second to run this.roundHandler function
    this.timer = setTimeout(this.roundHandler, this.state.pace);
  };

  startGameHandler = () => {
    startSound.play();
    startSound.loop = true;
    this.roundHandler();
    this.setState({ gameOn: true });
  };

  stopGameHandler = () => {
    startSound.pause();
    stopSound.play();
    clearTimeout(this.timer);
    this.setState({ showGameOver: true, gameOn: false }); // show modal
    this.setTopScore();
  };

  closeModalHandler = () => {
    window.location.reload();
    // this.setState({
    //   score: 0,
    //   current: -1,
    //   showGameOver: false,
    //   pace: 1500,
    //   rounds: 0,
    //   gameOn: false,
    //   circles: [],
    //   isLevelSet: false,
    // });
  };

  changeLevelHandler = () => {
    this.setState({
      score: 0,
      current: -1,
      showGameOver: false,
      pace: 1500,
      rounds: 0,
      gameOn: false,
      circles: [],
      isLevelSet: false,
    });
  };

  setTopScore = () => {
    if (this.state.score > this.state.topScore) {
      this.setState({ topScore: this.state.score });
      localStorage.setItem("topScore", this.state.score);
    }
  };

  render() {
    let message = "";
    if (this.state.score <= 50) {
      message = "Better luck next time!";
    } else if (this.state.score > 50 && this.state.score <= 100) {
      message = "Very good!";
    } else {
      message = "Great job!";
    }
    return (
      <div className={styles.App}>
        <div>
          <h1>Speedgame</h1>
          {/* Render score para after start button clicks */}
          {this.state.gameOn && <h2>Your score: {this.state.score}</h2>}
        </div>

        {/* hide level buttons after level chosen  */}
        {!this.state.isLevelSet && (
          <div>
            <h2>Choose game level</h2>
            <Button click={() => this.levelHandler("easy")}>Easy</Button>
            <Button click={() => this.levelHandler("medium")}>Medium</Button>
            <Button click={() => this.levelHandler("hard")}>Hard</Button>
          </div>
        )}

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

        {/* Show start and end button after game level chosen  */}
        {this.state.isLevelSet && (
          <div className={styles.buttons}>
            {!this.state.gameOn && [
              <Button click={this.startGameHandler}>Start</Button>,
              <Button click={this.changeLevelHandler}>Change level</Button>,
            ]}

            {this.state.gameOn && (
              <Button click={this.stopGameHandler}>End</Button>
            )}
          </div>
        )}

        {this.state.showGameOver && (
          <Popup
            score={this.state.score}
            topScore={this.state.topScore}
            onClick={this.closeModalHandler}
            message={message}
          />
        )}

        <Footer />
      </div>
    );
  }
}

export default App;
