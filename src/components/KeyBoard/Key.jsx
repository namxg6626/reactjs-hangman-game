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

// input = lísten();
// string orig = "java"
// s= "_______"

// int index = answer.indexOf(input);
// String newS = s.substring(0, index) + input + s.substring(index + 1, s.length());
// s = newS;

// tvAns.setText(s);
/*
  string original = "javascript";
  string[] newString = original.split("");
  for (int i = 0; i < ori.length();i++)
    if (newString[i] == input)
      s[i] = input;
  
  
  
*/
