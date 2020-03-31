import React from "react";

export default function Key(props) {
  const { character } = props;
  return (
    <div className="key">
      <div className="button">
        <span>{character}</span>
      </div>
    </div>
  );
}
