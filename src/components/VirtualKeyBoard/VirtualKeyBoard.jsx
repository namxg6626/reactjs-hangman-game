import React, { Component } from "react";
import Key from "./Key";

export default class VirtualKeyBoard extends Component {
  state = {
    keys: [
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      ";",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m"
    ]
  };
  render() {
    return (
      <div className="virtual-keyboard">
        <div className="answer-characters">hello from answer characters</div>
        <div className="keyboard">
          {this.state.keys.map((key, id) => {
            return <Key key={id} character={key} />;
          })}
        </div>
      </div>
    );
  }
}
