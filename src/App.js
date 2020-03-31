import React from "react";
import "./App.scss";
import Header from "./components/Header";
import { useContext } from "react";
import { AppContext } from "./context";
import Hangman from "./components/Hangman";
import VirtualKeyBoard from "./components/VirtualKeyBoard";

class App extends React.Component {
  static contextType = AppContext;

  render() {
    console.log(this.context);
    return (
      <div className="app">
        <Header
          title="hang game"
          fb="https://fb.com/le.van.nam.192"
          github="https://github.com/namxg6626"
        />
        <Hangman />

        <VirtualKeyBoard />
      </div>
    );
  }
}

export default App;
