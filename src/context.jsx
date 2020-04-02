import React, { Component } from "react";
import {
  defaultQuestions,
  getFirebaseQuestions,
  getFirebaseLeaderBoard
} from "./questions";

let questions = defaultQuestions;

const AppContext = React.createContext();

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      question: this.getQuestion(0), // index of questions
      answer: this.getAnswer(0),
      wrongAnswers: 0,
      wrongKeys: [], // array of keyCode transformed to character
      hiddenText: this.toHiddenText(this.getAnswer(0)),
      loading: true
    };
    this.toHiddenText = this.toHiddenText.bind(this);
  }

  componentDidMount() {
    getFirebaseQuestions()
      .then(result => {
        questions = Object.entries(result).map(question => {
          return { [question[0]]: question[1] };
        });
        this.resetGame();
      })
      .catch(err => {
        console.log("can't connect to firebase database!!!");
      });
  }

  toHiddenText(strSrc, from = null) {
    const regex = /[\S]/g;
    if (from) {
      const strTemp = strSrc.slice(0, from);
      const hiddenText = strSrc.slice(from).replace(regex, "_");
      return strTemp + hiddenText;
    }
    return strSrc.replace(regex, "_");
  }

  showCharacters = (...characters) => {
    return new Promise(resolve => {
      console.log(characters);

      const { answer, hiddenText } = this.state;
      const answerLowerCase = answer.toLowerCase();

      const characterIndexes = answerLowerCase.split("").map((char, id) => {
        if (characters.includes(char)) return id;
      });

      const result = hiddenText
        .split("")
        .map((char, id) => {
          if (characterIndexes.includes(id)) return answer[id];
          return char;
        })
        .join("");
      this.setState(
        {
          hiddenText: result
        },
        resolve
      );
    });
  };

  getQuestion(index) {
    return Object.keys(questions[index]).toString();
  }

  getAnswer(index) {
    return Object.values(questions[index]).toString();
  }

  // public
  nextQuestion = () => {
    return new Promise(resolve => {
      let { questionIndex: newQuestionIndex } = this.state;
      newQuestionIndex += 1;
      if (newQuestionIndex >= questions.length) {
        alert("You Wont!!!!!!");
        this.resetGame().then(nothing => resolve());
        return;
      }
      this.setState(
        {
          questionIndex: newQuestionIndex,
          question: this.getQuestion(newQuestionIndex),
          answer: this.getAnswer(newQuestionIndex),
          hiddenText: this.toHiddenText(this.getAnswer(newQuestionIndex)),
          wrongKeys: []
        },
        resolve
      );
    });
  };

  // public
  increaseWrongAnswers = wrongKey => {
    return new Promise(resolve => {
      const { wrongAnswers } = this.state;
      if (wrongAnswers === 5) {
        this.setState(
          {
            wrongAnswers: 6
          },
          () => {
            alert("You Lose!!!!");
            this.resetGame().then(nothing => resolve());
          }
        );
        return;
      }
      this.setState(
        {
          wrongAnswers: wrongAnswers === 6 ? 6 : wrongAnswers + 1,
          wrongKeys: [...this.state.wrongKeys, wrongKey]
        },
        resolve
      );
    });
  };

  resetGame = (callback = null) => {
    return new Promise(resolve => {
      this.setState(
        {
          questionIndex: 0,
          question: this.getQuestion(0), // index of questions
          answer: this.getAnswer(0),
          wrongAnswers: 0,
          hiddenText: this.toHiddenText(this.getAnswer(0)),
          wrongKeys: [], // array of keyCode transformed to character
          loading: false
        },
        resolve
      );
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          increaseWrongAnswers: this.increaseWrongAnswers,
          nextQuestion: this.nextQuestion,
          toHiddenText: this.toHiddenText.bind(this),
          showCharacters: this.showCharacters
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

const ContextConsumer = AppContext.Consumer;

function withConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <ContextConsumer>
        {value => <Component {...props} context={value}></Component>}
      </ContextConsumer>
    );
  };
}

export { ContextProvider, ContextConsumer, AppContext, withConsumer };
