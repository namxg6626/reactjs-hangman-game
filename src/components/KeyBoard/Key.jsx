import React from "react";

export default function Key(props) {
  const { character, isWrong, processKeyUp } = props;
  return (
    <div className="key">
      <div
        className={`button ${isWrong ? "wrong-key" : ""}`}
        onClick={processKeyUp}
      >
        <span>{character}</span>
      </div>
    </div>
  );
}
