import firebase from "firebase/app";
import "firebase/database";

const defaultQuestions = [
  { "Guess a programming language": "Javascript" },
  { "Guess a programming language": "COBOL" },
  { "By whom windows was invented": "Bill Gate" },
  { "Lorem ipsum dolor sit amet consectetur.": "Lorem ipsum dolor" },
];

const defaultLeaderBoard = [
  {
    "player 1": {
      time: 100,
      wrongs: 3,
    },
  },
];

// [question] : [answer]
// random from 0 to x: Math.trunc(Math.random() * x)

const firebaseConfig = {
  apiKey: "AIzaSyBadVzKWoEotsjKU3s7X6ir4iTLKkP8XUU",
  authDomain: "reactjs-26bd9.firebaseapp.com",
  databaseURL: "https://reactjs-26bd9.firebaseio.com",
  projectId: "reactjs-26bd9",
  storageBucket: "reactjs-26bd9.appspot.com",
  messagingSenderId: "950612912622",
  appId: "1:950612912622:web:08bd1c1a932a4e84c946ff",
  measurementId: "G-1F0J7ZBN17",
};
const app = firebase.initializeApp(firebaseConfig);

const hangmanDb = app.database().ref("hangman");

const hangmanQst = hangmanDb.child("questions");

const hangmanLeaderBoard = hangmanDb.child("leaderBoard");

const hangmanContributions = hangmanDb.child("contributions");

function uploadQuestion(questionObj) {
  return new Promise((resolve) => {
    const { question, answer, author } = questionObj;
    hangmanContributions
      .push(
        {
          question,
          answer,
          author,
        },
        (err) => {
          console.error(err);
        }
      )
      .then(resolve);
  });
}

function getFirebaseQuestions() {
  return new Promise((resolve) => {
    hangmanQst.on("value", (qst) => {
      let questions = [];
      if (qst.val()) {
        questions = qst.val();
        questions = Object.entries(questions).map((question) => {
          return { [question[0]]: question[1] };
        });
      } else questions = defaultQuestions;
      resolve(questions);
    });
  });
}

function getFirebaseLeaderBoard() {
  return new Promise((resolve) => {
    hangmanLeaderBoard.on("value", (result) => {
      let leaderBoard = [];
      if (result.val()) leaderBoard = result.val();
      else leaderBoard = defaultLeaderBoard;
      resolve(leaderBoard);
    });
  });
}

export {
  defaultQuestions,
  getFirebaseQuestions,
  getFirebaseLeaderBoard,
  uploadQuestion,
};
