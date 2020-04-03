import React, { Component } from "react";
import { withConsumer } from "../../context";
import Key from "./Key";

class KeyBoard extends Component {
  constructor(props) {
    super(props);
    for (let prop in this.props.context) this[prop] = this.props.context[prop];

    const { answer } = this.props.context;
    this.state = {
      question: this.getContextQuestion(),
      answer: this.getContextAnswer(),
      hiddenText: this.toHiddenText(answer)
    };

    this.getContextAnswer = this.getContextAnswer.bind(this);
    this.getContextQuestion = this.getContextQuestion.bind(this);
    this.detectKeyUp = this.detectKeyUp.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const { loading } = props.context;

    if (!loading) {
      return {
        question: props.context.question,
        answer: props.context.answer,
        hiddenText: props.context.hiddenText
      };
    }
    return null;
  }

  detectKeyUp(e) {
    let key = e.key.toLowerCase();
    const { isLose } = this.props.context;

    // detect only numeric alphabet key, which is consist only 1 char
    if (/^[\w\W]{1}$/.test(key)) this.processKeyUp(key);
    if (isLose && key === "enter") this.resetGame();
  }

  // public
  processKeyUp = key => {
    let { answer } = this.state;
    answer = answer.toLowerCase();

    if (answer.includes(key))
      (async () => {
        // better than create a new promise for showCharacters
        await this.showCharacters(key);
        this.setState(
          {
            hiddenText: this.getContextHiddenText()
          },
          () => {
            let { hiddenText } = this.state;
            if (hiddenText.toLowerCase() === answer)
              this.nextQuestion().then(nothing => this.refreshState());
          }
        );
      })();
    else this.increaseWrongAnswers(key).then(nothing => this.refreshState());
  };

  getContextQuestion() {
    return this.props.context.question;
  }

  getContextAnswer() {
    return this.props.context.answer;
  }

  getContextHiddenText() {
    return this.props.context.hiddenText;
  }

  refreshState = () => {
    this.setState({
      question: this.getContextQuestion(),
      answer: this.getContextAnswer(),
      hiddenText: this.getContextHiddenText()
    });
  };

  render() {
    const { question, hiddenText, answer } = this.state;
    const { wrongKeys, loading, isLose } = this.props.context;
    !loading && window.addEventListener("keyup", this.detectKeyUp);

    return (
      <div className="virtual-keyboard">
        <div className="question-block">
          {loading ? (
            <>
              <p className="question">Đợi một chút...</p>
              <p className="answer">Please wait a second...</p>
            </>
          ) : (
            <>
              <p className="question">{question + " ?"}</p>
              <p className="answer">{isLose ? answer : hiddenText}</p>
            </>
          )}
        </div>
        {!loading && (
          <div className="keyboard">
            {!isLose ? (
              "qwertyuiopasdfghjkl;zxcvbnm,.".split("").map((key, id) => {
                if (wrongKeys.includes(key))
                  return (
                    <Key
                      key={id}
                      character={key}
                      isWrong={true}
                      processKeyUp={this.processKeyUp.bind(this, key)}
                    />
                  );
                return (
                  <Key
                    key={id}
                    character={key}
                    isWrong={false}
                    processKeyUp={this.processKeyUp.bind(this, key)}
                  />
                );
              })
            ) : (
              <Key
                character={"RESET"}
                isWrong={false}
                processKeyUp={this.resetGame}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withConsumer(KeyBoard);
