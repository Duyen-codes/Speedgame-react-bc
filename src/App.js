import react, { Component } from "react";
import styles from "./App.module.css";

import Button from "./components/Button";
import Circle from "./components/Circle";

class App extends Component {
  state = {
    score: 0,
  };
  render() {
    return (
      <div className={styles.App}>
        <div>
          <h1>Speedgame</h1>
          <p>Your score: {this.state.score}</p>
        </div>

        <div className={styles.circles}>
          <Circle />
          <Circle />
          <Circle />
          <Circle />
        </div>

        <div className={styles.buttons}>
          <Button>Start game</Button>
          <Button>End game</Button>
        </div>
      </div>
    );
  }
}

export default App;
