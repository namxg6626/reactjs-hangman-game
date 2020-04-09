import React, { Component } from "react";

const AppContext = React.createContext();

class ContextProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsList: [],
      questionIndex: 0,
      question: "",
      answer: "",
      wrongAnswers: 0,
      wrongKeys: [],
      hiddenText: "",
      loading: true,
      isLose: false,
    };
  }

  componentDidMount() {
    fetch("https://express-hangman.herokuapp.com/get-question")
      .then((result) => result.json())
      .then((json) => {
        const questionsList = json;
        const question = json[0].question;
        const answer = json[0].answer;
        const hiddenText = this.toHiddenText(answer);

        this.setState({
          questionsList,
          question,
          answer,
          hiddenText,
          loading: false,
        });
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

  showCharacters = (...character) => {
    return new Promise((resolve) => {
      const { answer, hiddenText } = this.state;
      const answerLowerCase = answer.toLowerCase();

      const characterIndexes = answerLowerCase.split("").map((char, id) => {
        if (character.includes(char)) return id;
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

  getQuestion = (index) => {
    return this.state.questionsList[index].question;
  };

  getAnswer = (index) => {
    return this.state.questionsList[index].answer;
  };

  // public
  nextQuestion = () => {
    return new Promise((resolve) => {
      let { questionIndex: newQuestionIndex, questionsList } = this.state;
      newQuestionIndex += 1;
      if (newQuestionIndex >= questionsList.length) {
        alert("You Won!!!!!!");
        this.TEST_resetGame().then(resolve);
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

  TEST_resetGame = async () => {
    const response = await fetch(
      "https://express-hangman.herokuapp.com/get-question"
    );
    const newQuestionsList = await response.json();
    const { question, answer } = newQuestionsList[0];

    this.setState(
      {
        questionsList: newQuestionsList,
        questionIndex: 0,
        question,
        answer,
        wrongAnswers: 0,
        hiddenText: this.toHiddenText(answer),
        wrongKeys: [], // array of keyCode transformed to character
        loading: false,
        isLose: false,
      },
      () => console.log(this.state)
    );
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
          resetGame: this.TEST_resetGame,
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
