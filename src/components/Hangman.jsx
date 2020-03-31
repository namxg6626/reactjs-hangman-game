import React from "react";
import { withConsumer } from "../context";
import imagesJson from "../imagesJson";

function Hangman(props) {
  const { wrongAnswers } = props.context;
  const { images } = imagesJson;
  console.log(wrongAnswers);

  return (
    <div className="hangman">
      <img src={images[wrongAnswers]} alt="Hang Man" title="Hang man" />
    </div>
  );
}

export default withConsumer(Hangman);
