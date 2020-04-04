import React, { Component } from "react";
import { defaultQuestions, getFirebaseQuestions } from "./questions";

let questions = defaultQuestions;

const AppContext = React.createContext();

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionIndex: 0,
      question: this.getQuestion(0),
      answer: this.getAnswer(0),
      wrongAnswers: 0,
      wrongKeys: [], // array of keyCode transformed to character
      hiddenText: this.toHiddenText(this.getAnswer(0)),
      loading: true,
      isLose: false,
    };
  }

  componentDidMount() {
    getFirebaseQuestions()
      .then((result) => {
        questions = result;
        this.resetGame();
      })
      .catch((err) => {
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

  showCharacters = (character) => {
    // chữ a
    return new Promise((resolve) => {
      const { answer, hiddenText } = this.state;
      const answerLowerCase = answer.toLowerCase();

      // lấy id của chữ a
      // for để láy id
      // nhưng mà cái mỗi lần cái l ns nbgje thì nó lại chạy for
      const characterIndexes = answerLowerCase.split("").map((char, id) => {
        if (char === character) return id;
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
          hiddenText: result,
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
    return new Promise((resolve) => {
      let { questionIndex: newQuestionIndex } = this.state;
      newQuestionIndex += 1;
      if (newQuestionIndex >= questions.length) {
        alert("You Won!!!!!!");
        this.resetGame().then(resolve);
      } else
        this.setState(
          {
            questionIndex: newQuestionIndex,
            question: this.getQuestion(newQuestionIndex),
            answer: this.getAnswer(newQuestionIndex),
            hiddenText: this.toHiddenText(this.getAnswer(newQuestionIndex)),
            wrongKeys: [],
          },
          resolve
        );
    });
  };

  // public
  increaseWrongAnswers = (wrongKey) => {
    return new Promise((resolve) => {
      const { wrongAnswers } = this.state;
      if (wrongAnswers === 5) {
        this.setState(
          {
            wrongAnswers: 6,
            isLose: true,
          },
          resolve
        );
      } else
        this.setState(
          {
            wrongAnswers: wrongAnswers === 6 ? 6 : wrongAnswers + 1,
            wrongKeys: [...this.state.wrongKeys, wrongKey],
          },
          resolve
        );
    });
  };

  resetGame = () => {
    return new Promise((resolve) => {
      this.setState(
        {
          questionIndex: 0,
          question: this.getQuestion(0),
          answer: this.getAnswer(0),
          wrongAnswers: 0,
          hiddenText: this.toHiddenText(this.getAnswer(0)),
          wrongKeys: [], // array of keyCode transformed to character
          loading: false,
          isLose: false,
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
          toHiddenText: this.toHiddenText,
          showCharacters: this.showCharacters,
          resetGame: this.resetGame,
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
        {(value) => <Component {...props} context={value}></Component>}
      </ContextConsumer>
    );
  };
}

export { ContextProvider, ContextConsumer, AppContext, withConsumer };
