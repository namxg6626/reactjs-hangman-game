import React, { Component } from "react";

const AppContext = React.createContext();

class ContextProvider extends Component {
  state = {
    wrongAnswers: 0,
    whichWrongKey: [], // keyCode array
    pass: 0
  };

  handleKeyUp = e => {
    console.log("hello from keyup");
    console.log(String.fromCharCode(e.keyCode || e.which));
  };

  render() {
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          handleKeyUp: this.handleKeyUp
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
