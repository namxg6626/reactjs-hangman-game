import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Hangman from "./components/Hangman";
import KeyBoard from "./components/KeyBoard";

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header
          title="hangman game"
          fb="https://fb.com/le.van.nam.192"
          github="https://github.com/namxg6626"
        />
        <Hangman />
        <KeyBoard />
      </div>
    );
  }
}

export default App;
